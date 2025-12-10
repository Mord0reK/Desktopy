function formularz()
{
    let liczbaGosci = document.getElementById("goscie").value;
    let czyPoprawiny = document.getElementById("poprawiny").checked;
    let koszt = liczbaGosci * 100;

    if (czyPoprawiny) {
        koszt *= 1.3;
    }

    document.getElementById("koszt").innerHTML = "<p>Koszt twojego wesela to " + koszt + " złotych</p>";
}