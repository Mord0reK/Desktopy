function przenies_pi() {
  var header = document.getElementById("header");
  header.innerHTML = "<h1>Matematyka w JS</h1><img src='pi.webp' alt='PI' onmouseout='przywroc_pi()'>";
}

function przywroc_pi() {
  var header = document.getElementById("header");
  header.innerHTML = "<img src='pi.webp' alt='PI' onmouseover='przenies_pi()'><h1>Matematyka w JS</h1>";
}

function blizniacze_oblicz() {
  var liczba1 = Number(document.getElementById("blizniacze-1").value);
  var liczba2 = Number(document.getElementById("blizniacze-2").value);
  var wynik = document.getElementById("blizniacze-wynik");
  if (liczba1 - liczba2 == 2 || liczba1 - liczba2 == -2) {
    wynik.innerHTML = "Są bliźniacze";
  } else {
    wynik.innerHTML = "Nie są bliźniacze";
  }
}

function zaszyfruj_cezar() {
  var klucz = 3;
  var tekst = document.getElementById("szyfr-cezara-1").value;
  var wynik = "";
  for (var i = 0; i < tekst.length; i++) {
    wynik += String.fromCharCode(tekst[i].charCodeAt(0) + klucz);
  }
  document.getElementById("szyfr-cezara-wynik-zaszyfrowany").innerHTML = wynik;
}

function odszyfruj_cezar() {
  var klucz = 3;
  var tekst = document.getElementById("szyfr-cezara-1").value;
  var wynik = "";
  for (var i = 0; i < tekst.length; i++) {
    wynik += String.fromCharCode(tekst[i].charCodeAt(0) - klucz);
  }
  document.getElementById("szyfr-cezara-wynik-zaszyfrowany").innerHTML = wynik;
}

function oblicz_logarytm() {
  var podstawa = Number(document.getElementById("logarytm-1").value);
  var liczba = Number(document.getElementById("logarytm-2").value);
  var wynik = document.getElementById("logarytm-wynik");

  if (podstawa <= 0 || podstawa === 1 || liczba <= 0) {
    wynik.innerHTML = "Nieprawidłowe dane";
    return;
  }

  var wartosc = Math.log(liczba) / Math.log(podstawa);
  wynik.innerHTML = "log<sub>" + podstawa + "</sub> " + liczba + " = " + wartosc;
}
