let usuario = 25801;//localStorage.getItem("usuarioID")
let url_carrito = CART_INFO_URL + usuario + EXT_TYPE;


function mostrarCarrito() {
    let contenidoHTML ="";
    
    for (const articulo of cart_user.articles) {
        let subtotal = articulo.count * articulo.unitCost;
        contenidoHTML += `
        <div class="row">
            <img class="img-thumbnail col-2" src="${articulo.image}" alt="${articulo.name}">
            <p class="col-2">${articulo.name}</p>
            <div class="col-2" name="costoProducto">
                <span>${articulo.currency}</span>
                <span id="${"costoUnit"+ articulo.id}">${articulo.unitCost}</span>
            </div>
            <div class="col-1">
                <input type="number" class="form-control col-2" id="${"cant"+ articulo.id}" value="${articulo.count}" name="cant" oninput="actualizarSubtotal(${articulo.id})">
            </div>
            <div class="col-1">
            </div> 
            <div class="col-2">
                <span>${articulo.currency}</span>     
                <span id="${"subtot"+ articulo.id}">${subtotal}</span>
            </div>
            <hr class="mb-2" />
        </div>
        `
    }
    document.getElementById("contenidoCart").innerHTML = contenidoHTML;
}

function actualizarSubtotal(articuloId){
    let cantidad = document.getElementById("cant"+ articuloId).value;
    let costoUnitario = document.getElementById("costoUnit" + articuloId).textContent;
    
    if(cantidad < 1) {
        cantidad = 1
        document.getElementById("cant"+ articuloId).value = cantidad;
    }
    document.getElementById("subtot" + articuloId).innerHTML = cantidad * costoUnitario;
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(url_carrito).then(function(respuesta){
        if(respuesta.status ==="ok"){
            cart_user = respuesta.data;
            mostrarCarrito();
        } else {
            alert("Ha ocurrido un error al obtener su carrito");
        }
    });
});