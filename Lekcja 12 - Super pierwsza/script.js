function sprawdz()
{
    let liczbaStr = document.getElementById('liczba').value;
    let liczba = parseInt(liczbaStr);

    // Sprawdź czy liczba jest prawidłowa
    if (isNaN(liczba) || liczba < 2)
    {
        document.getElementById('wynik').innerHTML = 'Podaj liczbę naturalną większą od 1';
        return;
    }

    // Sprawdź czy liczba jest pierwsza
    let pierwsza = true;
    for (let i = 2; i <= Math.sqrt(liczba); i++)
    {
        if (liczba % i === 0)
        {
            pierwsza = false;
            break;
        }
    }

    // Oblicz sumę cyfr
    let suma = 0;
    for (let i = 0; i < liczbaStr.length; i++)
    {
        suma += parseInt(liczbaStr[i]);
    }

    // Sprawdź czy suma cyfr jest pierwsza
    let superPierwsza = true;
    if (suma < 2)
    {
        superPierwsza = false;
    }
    else
    {
        for (let i = 2; i <= Math.sqrt(suma); i++)
        {
            if (suma % i === 0)
            {
                superPierwsza = false;
                break;
            }
        }
    }

    if (pierwsza && superPierwsza)
    {
        document.getElementById('wynik').innerHTML = 'Liczba jest super pierwsza';
    }
    else
    {
        document.getElementById('wynik').innerHTML = 'Liczba nie jest pierwsza';
    }
}