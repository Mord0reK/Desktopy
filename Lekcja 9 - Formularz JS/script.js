function formularz()
{
    wynik = document.getElementById("wynik");
    wynik.innerHTML = "Imię: " + document.getElementById("imie").value + "<br>";
    wynik.innerHTML += "Nazwisko: " + document.getElementById("nazwisko").value + "<br>";
    wynik.innerHTML += "Klasa: " + document.getElementById("klasa").value;
}