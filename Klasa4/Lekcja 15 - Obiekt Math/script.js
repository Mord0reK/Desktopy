function funkcja_abs()
{
    let wartosc = document.getElementById('abs-wartosc').value
    wynik = Math.abs(wartosc)
    document.getElementById('abs-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_ceil()
{
    let wartosc = document.getElementById('ceil-wartosc').value
    wynik = Math.ceil(wartosc)
    document.getElementById('ceil-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_exp()
{
    let wartosc = document.getElementById('exp-wartosc').value
    wynik = Math.exp(wartosc)
    document.getElementById('exp-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_floor()
{
    let wartosc = document.getElementById('floor-wartosc').value
    wynik = Math.floor(wartosc)
    document.getElementById('floor-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_log()
{
    let wartosc = document.getElementById('log-wartosc').value
    wynik = Math.log(wartosc)
    document.getElementById('log-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_max()
{
    let wartosc1 = document.getElementById('max1').value
    let wartosc2 = document.getElementById('max2').value
    wynik = Math.max(wartosc1, wartosc2)
    document.getElementById('max-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_min()
{
    let wartosc1 = document.getElementById('min1').value
    let wartosc2 = document.getElementById('min2').value
    wynik = Math.min(wartosc1, wartosc2)
    document.getElementById('min-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_pow()
{
    let pow1 = document.getElementById('pow1').value
    let pow2 = document.getElementById('pow2').value
    wynik = Math.pow(pow1, pow2)
    document.getElementById('pow-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_round()
{
    let wartosc = document.getElementById('round-wartosc').value
    wynik = Math.round(wartosc)
    document.getElementById('round-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_sin()
{
    let wartosc = document.getElementById('sin-wartosc').value
    wynik = Math.sin(wartosc)
    document.getElementById('sin-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_cos()
{
    let wartosc = document.getElementById('cos-wartosc').value
    wynik = Math.cos(wartosc)
    document.getElementById('cos-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_tan()
{
    let wartosc = document.getElementById('tan-wartosc').value
    wynik = Math.tan(wartosc)
    document.getElementById('tan-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_sqrt()
{
    let wartosc = document.getElementById('sqrt-wartosc').value
    wynik = Math.sqrt(wartosc)
    document.getElementById('sqrt-wynik').innerHTML = "Wynik: " + wynik
}

function funkcja_random()
{
    wynik = Math.random()
    document.getElementById('random-wynik').innerHTML = "Wynik: " + wynik
}