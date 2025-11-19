function formularz()
{
    wynik = document.getElementById("wynik");
    wynik.innerHTML = "Imię: " + document.getElementById("imie").value + "<br>";
    wynik.innerHTML += "Nazwisko: " + document.getElementById("nazwisko").value + "<br>";
    wynik.innerHTML += "Klasa: " + document.getElementById("klasa").value;
    wynik.innerHTML += "<br>Liczba 1: " + czypierwsza(document.getElementById("liczba1").value);
    wynik.innerHTML += "<br>Liczba 2: " + dwojkowy(Number(document.getElementById("liczba2").value));
}

function czypierwsza(liczba)
{
    for (let i = 2; i < liczba; i++)
    {
        if (liczba % i === 0)
        {
            return "Nie jest pierwsza";
        }
    }
    return "Pierwsza";
}

function dwojkowy(liczba)
{
    var dwojkowa = liczba.toString(2);
    return dwojkowa;
}