var liczba = Number(prompt("Podaj liczbę:"));
var ilosc = 0

for (var i = 1; i <= liczba; i++)
{
    document.write(i + " ");
    if (i % 2 == 0) {
        ilosc++;
    }
}

document.write("<h1>Parzystych jest: " + ilosc + "</h1>")