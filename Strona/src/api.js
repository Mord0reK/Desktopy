// API do pobierania struktury katalogowej z bazy danych Cloudflare D1
export async function onRequest(context) {
  try {
    // Połączenie z bazą danych Cloudflare D1
    const { env } = context;

    // Zapytanie do bazy danych o strukturę katalogową
    const { results } = await env.DB.prepare(
      "SELECT * FROM directory_structure ORDER BY path"
    ).all();

    // Przetwarzanie wyników zapytania na hierarchiczną strukturę
    const structureTree = buildDirectoryTree(results);

    // Zwracanie odpowiedzi jako JSON
    return new Response(JSON.stringify(structureTree), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    // Obsługa błędów
    console.error("Błąd podczas pobierania struktury katalogowej:", error);
    return new Response(JSON.stringify({
      error: "Wystąpił błąd podczas pobierania struktury katalogowej",
      details: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

// Funkcja do budowania hierarchicznej struktury katalogów i plików
function buildDirectoryTree(results) {
  const tree = [];
  const map = {};

  // Inicjalizacja mapy ścieżek
  results.forEach(item => {
    map[item.path] = {
      name: item.name,
      type: item.type,
      path: item.path,
      children: item.type === 'directory' ? [] : null
    };
  });

  // Budowanie drzewa
  results.forEach(item => {
    const node = map[item.path];

    if (item.parent_path === null || item.parent_path === "") {
      // Element główny (bez rodzica)
      tree.push(node);
    } else {
      // Element z rodzicem
      if (map[item.parent_path]) {
        map[item.parent_path].children.push(node);
      }
    }
  });

  return tree;
}
