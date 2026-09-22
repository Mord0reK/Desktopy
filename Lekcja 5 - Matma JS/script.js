function przenies_pi() {
  var pi = document.getElementById("header");
  pi.innerHTML = "<h1>Matematyka w JS</h1><img src='pi.webp' alt='PI' onmouseout='przywroc_pi()'>";
}

function przywroc_pi() {
  var pi = document.getElementById("header");
  pi.innerHTML = "<img src='pi.webp' alt='PI' onmouseover='przenies_pi()' ><h1>Matematyka w JS</h1>";
}
