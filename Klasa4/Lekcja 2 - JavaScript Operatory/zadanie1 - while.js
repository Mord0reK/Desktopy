var liczba = Number(prompt("Podaj liczbę: "))
var ilosc = 0
var i = 0
while (i <= liczba)
{
    document.write(i + " ")
    if (i % 2 == 0)
    {
        ilosc++
    }
    i++
}
document.write("<br>")
document.write("<h1>Parzystych jest: " + ilosc + "</h1>")