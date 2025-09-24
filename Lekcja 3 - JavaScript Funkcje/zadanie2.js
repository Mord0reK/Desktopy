function BMI(wzrost, waga)
{
    return waga / Math.pow(wzrost, 2)
}

function czyOdpowiednie(bmi)
{
    if (bmi >= 18.5 && bmi <=24.9)
    {
        return "odpowiednie."
    }
    else
    {
        return "nieodpowiednie."
    }
}

wzrost = Number(prompt("Podaj wzrost w m: "))
waga = Number(prompt("Podaj wagę w kg: "))

bmi = BMI(wzrost, waga)

document.write("<h1>BMI To: " + bmi.toFixed(2) + "</h1>")
document.write("<h1>Twoje BMI jest: " + czyOdpowiednie(bmi) + "</h1>")