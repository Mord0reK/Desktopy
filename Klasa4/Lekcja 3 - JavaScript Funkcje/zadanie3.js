function czyParzysta(liczba)
{
    if (liczba % 2 === 0)
    {
        return 1
    }
    else
    {
        return 0
    }
}

liczba = Number(prompt("Podaj liczbę: "))

if (czyParzysta(liczba) === 1)
{
    alert("Liczba jest parzysta.")
}
else
{
    alert("Liczba nie jest parzysta.")
}