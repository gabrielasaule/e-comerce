//se treae el valor del usuario para agregarlo a cada page
let usr = localStorage.getItem("usuario");

if (document.getElementById("user") != null) {
    document.getElementById("user").innerHTML = usr;
}
