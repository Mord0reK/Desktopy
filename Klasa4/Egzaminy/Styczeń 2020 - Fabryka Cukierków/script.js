function funkcja()
{
    let ksztalt = document.getElementById("ksztalt").value

    switch(ksztalt)
    {
        case "1": wybrany = "cytryna"; break
        case "2": wybrany = "liść"; break
        case "3": wybrany = "banan"; break
        default: wybrany = "inny"; break
    }

    document.getElementById("zamowienie").innerHTML = `<p>Twoje zamówienie to cukierek ${wybrany}</p>`

    let czerwony = document.getElementById("R").value
    let zielony = document.getElementById("G").value
    let niebieski = document.getElementById("B").value
    
    document.getElementById("przycisk").style.backgroundColor = "rgb(" + czerwony + "," + zielony + "," + niebieski + ")"
}