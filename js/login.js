let btn = document.getElementById("ingresarBtn");

//si estoy en la pantalla de login o vuelvo a ella, entonces vacío el local storage
localStorage.clear();
btn.addEventListener("click", function(evento){
    let mail = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    
    evento.preventDefault(); 
    if (mail == "" || pass == "" ){
        alert("Hay campos sin completar");
    } else {
        //si tengo un user valido, entonces me guardo su nombre en el local storage
        localStorage.setItem("usuario", mail);
        location.href = "portada.html";
    }
})