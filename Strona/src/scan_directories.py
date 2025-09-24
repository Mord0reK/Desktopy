#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Skrypt do skanowania struktury katalogowej projektu i zapisywania jej w bazie danych Cloudflare D1.
"""

import os
import sys
import json
import sqlite3
import requests
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Konfiguracja
CONFIG = {
    "project_root": os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "cloudflare_api_url": "https://api.cloudflare.com/client/v4/accounts/{account_id}/d1/database/{database_id}/query",
    "cloudflare_account_id": os.getenv('CF_ACCOUNT'),  # Zmień na właściwe ID konta Cloudflare
    "cloudflare_api_token": os.getenv('CF_ACCOUNT_API'),    # Zmień na właściwy token API Cloudflare
    "cloudflare_database_id": os.getenv('DB_ID'), # Zmień na właściwe ID bazy D1
    "db_path": os.path.join(os.path.dirname(os.path.abspath(__file__)), "directory_structure.db"),
    "ignore_dirs": [".git", "node_modules", "__pycache__", ".idea", ".vscode"],
    "ignore_files": [".DS_Store", "Thumbs.db", ".gitignore"],
    "ignore_extensions": [".pyc", ".pyo", ".pyd", ".class"]
}

def setup_database(db_path):
    """Tworzy lokalną bazę SQLite do tymczasowego przechowywania struktury katalogowej."""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Usunięcie istniejących tabel, jeśli istnieją
    cursor.execute("DROP TABLE IF EXISTS directory_structure")

    # Utworzenie tabeli do przechowywania struktury katalogowej
    cursor.execute("""
    CREATE TABLE directory_structure (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        path TEXT UNIQUE NOT NULL,
        parent_path TEXT,
        type TEXT NOT NULL,
        last_modified TIMESTAMP
    )
    """)

    conn.commit()
    return conn

def scan_directory(root_dir, db_conn, parent_path=""):
    """Skanuje katalogi rekurencyjnie i zapisuje strukturę do bazy danych."""
    cursor = db_conn.cursor()

    try:
        # Lista wszystkich elementów w katalogu
        entries = os.listdir(root_dir)

        for entry in entries:
            full_path = os.path.join(root_dir, entry)
            relative_path = os.path.relpath(full_path, CONFIG["project_root"])

            # Ignorowanie określonych katalogów i plików
            if (entry in CONFIG["ignore_dirs"] and os.path.isdir(full_path)) or \
               (entry in CONFIG["ignore_files"] and os.path.isfile(full_path)) or \
               (os.path.splitext(entry)[1] in CONFIG["ignore_extensions"]):
                continue

            # Pobranie czasu ostatniej modyfikacji
            last_modified = datetime.fromtimestamp(os.path.getmtime(full_path))

            if os.path.isdir(full_path):
                # Dodanie katalogu do bazy danych
                cursor.execute(
                    "INSERT INTO directory_structure (name, path, parent_path, type, last_modified) VALUES (?, ?, ?, ?, ?)",
                    (entry, relative_path, parent_path, "directory", last_modified)
                )
                db_conn.commit()

                # Rekurencyjne skanowanie podkatalogów
                scan_directory(full_path, db_conn, relative_path)
            else:
                # Dodanie pliku do bazy danych
                cursor.execute(
                    "INSERT INTO directory_structure (name, path, parent_path, type, last_modified) VALUES (?, ?, ?, ?, ?)",
                    (entry, relative_path, parent_path, "file", last_modified)
                )
                db_conn.commit()
    except Exception as e:
        print(f"Błąd podczas skanowania katalogu {root_dir}: {e}")

def upload_to_cloudflare_d1():
    """Eksportuje dane z lokalnej bazy SQLite do Cloudflare D1."""
    conn = sqlite3.connect(CONFIG["db_path"])
    cursor = conn.cursor()

    # Pobranie wszystkich rekordów z lokalnej bazy
    cursor.execute("SELECT name, path, parent_path, type, last_modified FROM directory_structure")
    records = cursor.fetchall()

    # Przygotowanie danych do wysłania do Cloudflare D1
    # Najpierw czyszczenie tabeli
    clear_sql = "DELETE FROM directory_structure"

    # Następnie wstawienie nowych danych
    insert_statements = []
    for record in records:
        name, path, parent_path, item_type, last_modified = record
        insert_statements.append(
            f"INSERT INTO directory_structure (name, path, parent_path, type, last_modified) VALUES ('{name}', '{path}', '{parent_path or ''}', '{item_type}', '{last_modified}')"
        )

    # Przygotowanie zapytania do API Cloudflare
    api_url = CONFIG["cloudflare_api_url"].format(
        account_id=CONFIG["cloudflare_account_id"],
        database_id=CONFIG["cloudflare_database_id"]
    )

    # Wykonanie czyszczenia tabeli
    clear_response = requests.post(
        api_url,
        headers={
            "Authorization": f"Bearer {CONFIG['cloudflare_api_token']}",
            "Content-Type": "application/json"
        },
        json={"sql": clear_sql}
    )

    if clear_response.status_code != 200:
        print(f"Błąd podczas czyszczenia tabeli: {clear_response.text}")
        return False

    # Wykonanie wstawienia nowych danych (w mniejszych partiach, aby uniknąć przekroczenia limitów)
    batch_size = 100
    for i in range(0, len(insert_statements), batch_size):
        batch = insert_statements[i:i+batch_size]
        batch_sql = "; ".join(batch)

        response = requests.post(
            api_url,
            headers={
                "Authorization": f"Bearer {CONFIG['cloudflare_api_token']}",
                "Content-Type": "application/json"
            },
            json={"sql": batch_sql}
        )

        if response.status_code != 200:
            print(f"Błąd podczas wstawiania danych (partia {i//batch_size + 1}): {response.text}")
            return False

    print("Dane zostały pomyślnie przesłane do Cloudflare D1")
    return True

def main():
    print("Rozpoczynanie skanowania struktury katalogowej projektu...")

    # Przygotowanie lokalnej bazy danych
    conn = setup_database(CONFIG["db_path"])

    # Skanowanie struktury projektu
    scan_directory(CONFIG["project_root"], conn)

    # Zamknięcie połączenia z lokalną bazą danych
    conn.close()

    print("Skanowanie zakończone. Przesyłanie danych do Cloudflare D1...")

    # Przesłanie danych do Cloudflare D1
    if upload_to_cloudflare_d1():
        print("Proces zakończony sukcesem.")
    else:
        print("Wystąpił błąd podczas przesyłania danych do Cloudflare D1.")

if __name__ == "__main__":
    main()
