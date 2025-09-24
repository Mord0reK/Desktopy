function funt(cena)
{
    return cena * 0.2050
}

function euro(cena)
{
    return cena * 0.23
}

var cena = Number(prompt("Podaj cenę: "))
document.write("<h1>Cena w funtach: </h1>" + funt(cena).toFixed(2) + " GBP")
document.write("<h1>Cena w Euro: </h1>" + euro(cena).toFixed(2) + " €")