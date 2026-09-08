document.write("<table>")

var ilosc = 0

document.write("<tr>")
while (ilosc <= 20)
{
    var losowa = Math.random()*100
    if (losowa >=50 && losowa <=100)
    {
        document.write("<td>")
        document.write(losowa.toFixed(1))
        ilosc++
        document.write("</td>")
    }
}
document.write("</tr>")

document.write("</table>")
