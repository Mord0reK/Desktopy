// main.js - obsługa pobierania i wyświetlania struktury katalogowej

document.addEventListener('DOMContentLoaded', function() {
    const directoryStructure = document.getElementById('directory-structure');
    const loadingIndicator = document.getElementById('loading');

    // Funkcja do pobierania struktury katalogowej z API
    async function fetchDirectoryStructure() {
        try {
            const response = await fetch('/src/api.js');

            if (!response.ok) {
                throw new Error(`Błąd HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            loadingIndicator.textContent = 'Błąd podczas ładowania struktury katalogowej.';
            loadingIndicator.classList.add('error-message');
            return null;
        }
    }

    // Funkcja do renderowania struktury katalogowej jako drzewo
    function renderDirectoryTree(structure, parentElement) {
        const list = document.createElement('ul');

        for (const item of structure) {
            const listItem = document.createElement('li');

            if (item.type === 'directory') {
                const folderSpan = document.createElement('span');
                folderSpan.className = 'folder';
                folderSpan.textContent = item.name;

                folderSpan.addEventListener('click', function() {
                    this.classList.toggle('open');
                    const nestedList = this.nextElementSibling;
                    if (nestedList) {
                        nestedList.style.display = nestedList.style.display === 'none' ? 'block' : 'none';
                    }
                });

                listItem.appendChild(folderSpan);

                if (item.children && item.children.length > 0) {
                    renderDirectoryTree(item.children, listItem);
                }
            } else {
                const fileSpan = document.createElement('span');
                fileSpan.className = 'file';
                fileSpan.textContent = item.name;
                listItem.appendChild(fileSpan);
            }

            list.appendChild(listItem);
        }

        parentElement.appendChild(list);
    }

    // Funkcja inicjalizująca
    async function init() {
        const structure = await fetchDirectoryStructure();

        if (structure) {
            loadingIndicator.style.display = 'none';
            renderDirectoryTree(structure, directoryStructure);
        }
    }

    // Uruchomienie inicjalizacji
    init();
});
