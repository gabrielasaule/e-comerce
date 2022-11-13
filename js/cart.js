let usuario = 25801;//localStorage.getItem("usuarioID")
let url_carrito = CART_INFO_URL + usuario + EXT_TYPE;
let subtotalCart = 0;
let totalCart = 0;
let costoEnvioCart = 0;
let comisionEnvio = 0.15;
let formaPagoText = "No ha seleccionado";
let pagoTarjeta = document.getElementById("credito");
let pagoTransferencia = document.getElementById("transferencia");
let txtAlerta = "";


function mostrarCarrito() {
    let contenidoHTML ="";
    
    for (const articulo of cart_user.articles) {
        let subtotal = articulo.count * articulo.unitCost;
        subtotalCart += subtotal;
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
                <span id="${"subtot"+ articulo.id}" >${subtotal}</span>
            </div>
            <hr class="mb-2" />
        </div>
        `
    }
    document.getElementById("contenidoCart").innerHTML = contenidoHTML;
    
}
function mostrarCostos (){
    
    costoEnvioCart = subtotalCart * comisionEnvio;
    document.getElementById("costoEnvio").innerHTML = costoEnvioCart;

    document.getElementById("costoTotal").innerHTML = costoEnvioCart + subtotalCart;

    document.getElementById("costoSubtotal").innerHTML = subtotalCart;
}

function actualizarSubtotal(articuloId){
    let cantidad = document.getElementById("cant"+ articuloId).value;
    let costoUnitario = document.getElementById("costoUnit" + articuloId).textContent;
    
    if(cantidad < 1) {
        cantidad = 1
        document.getElementById("cant"+ articuloId).value = cantidad;
    }
    document.getElementById("subtot" + articuloId).innerHTML = cantidad * costoUnitario;
    subtotalCart =cantidad * costoUnitario;
    mostrarCostos();
}



function chequearOpcionesPago(){
    return pagoTarjeta.checked || pagoTransferencia.checked;
}

function chequearDatosPago(){
    if ((pagoTarjeta.checked && (document.getElementById("nrotarj").value === "" || document.getElementById("codseguridad").value === "" || document.getElementById("vencimiento").value === "")) ||
     (pagoTransferencia.checked && document.getElementById("nroCuenta").value === "")){
        alert("Falta completar datos para el pago");
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(url_carrito).then(function(respuesta){
        if(respuesta.status ==="ok"){
            cart_user = respuesta.data;
            mostrarCarrito();
            mostrarCostos();
            document.getElementById("formaPagoTexto").innerHTML = formaPagoText;
        } else {
            alert("Ha ocurrido un error al obtener su carrito");
        }
    });

    document.getElementById("premradio").addEventListener("change", function(){
        comisionEnvio = 0.15;
        mostrarCostos();        
    })
    document.getElementById("expradio").addEventListener("change", function(){
        comisionEnvio = 0.07;
        mostrarCostos();        
    })
    document.getElementById("stanradio").addEventListener("change", function(){
        comisionEnvio = 0.05;
        mostrarCostos();        
    })

    pagoTarjeta.addEventListener("change", function(){
        if(pagoTarjeta.value){
            formaPagoText = "Tarjeta de crédito";
            document.getElementById("formaPagoTexto").innerHTML = formaPagoText;
            document.getElementById("nroCuenta").disabled = true;
            document.getElementById("nrotarj").disabled = false;
            document.getElementById("codseguridad").disabled = false;
            document.getElementById("vencimiento").disabled = false;
        }
        mostrarCostos();        
    })

    pagoTransferencia.addEventListener("change", function(){
        if(pagoTransferencia.value){
            formaPagoText = "Transferencia bancaria";
            document.getElementById("formaPagoTexto").innerHTML = formaPagoText;
            document.getElementById("nroCuenta").disabled = false;
            document.getElementById("nrotarj").disabled = true;
            document.getElementById("codseguridad").disabled = true;
            document.getElementById("vencimiento").disabled = true;
        }
        mostrarCostos();        
    })

    document.getElementById("formCart").addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();
        let formulario  = document.getElementById("formCart");
       
        if (formulario.checkValidity()) { //otra opcion if (formulario.checkValidity() && chequearOpcionesPago())
            if(chequearOpcionesPago() && chequearDatosPago()){
                document.getElementById("formaPagoTexto").classList.remove("alert-danger");
                formulario.submit();
                document.getElementById("container").innerHTML = `
                <div class="alert alert-success" role="alert"">
                    ¡Has comprado con éxito!
                </div>
                `
            } else {
                document.getElementById("formaPagoTexto").classList.add("alert-danger");
            }
        } else {
           
            formulario.classList.add("was-validated");

        }

    });


});

 


