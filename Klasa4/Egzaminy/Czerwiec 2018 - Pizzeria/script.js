function oblicz()
{
    let ilosc = document.getElementById("ilosc").value;
    let czyZielonaGora = document.getElementById("zielonagora").checked;

    if (czyZielonaGora)
    {
        document.getElementById("wynik").innerHTML = "Dowieziemy twoją pizzę za darmo!";
    }
    else
    {
        if (ilosc === "")
        {
            document.getElementById("wynik").innerHTML = "Nie podano ilości";
        }
        else
        {
            document.getElementById("wynik").innerHTML = "Dowóz będzie Cię kosztował " + (ilosc * 2) + " złotych.";
        }
    }
}