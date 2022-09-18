//url que se arma segun categoria elegida
let prodSeleccionadoId = localStorage.getItem("prodID")
let url_prod = PRODUCT_INFO_URL + prodSeleccionadoId + EXT_TYPE;
let url_comentarios = PRODUCT_INFO_COMMENTS_URL + prodSeleccionadoId + EXT_TYPE;
let prod = undefined;

function mostrarProducto(){
    console.log("pasa por mostrar producto"); //debug
    let contenidoImag="";    
    let contenidoHTML= "";
    contenidoHTML += `
        <div>
            <h2>${prod.name}</h2>
            <hr class="mb-4"/>
        </div>
        <div class="row">
            <div class="col-6">
                <h4 class="mb-1 fw-bold">Precio: </h4>
                <p class="mb-1">    ${prod.currency} ${prod.cost}</p>
                <h4 class="mb-1 fw-bold">Descripción: </h4>
                <p class="mb-1">    ${prod.description}</p>
                <h4 class="mb-1 fw-bold">Categoría: </h4>
                <p class="mb-1">    ${prod.category}</p>
                <h4 class="mb-1 fw-bold">Cantidad de vendidos: </h4>
                <p class="mb-1">    ${prod.soldCount}</p>
            </div > 
            <div class="col-6">
            <img src="${prod.images[0]}" class="img-thumbnail d-flex w-100 justify-content-between" alt="primera imagen ">
            </div>
        </div> 
        <div class="fila d-flex justify-content-between" id="fila-img">
           
        </div>
    `

    for (const imagen of prod.images) {
        contenidoImag += `
            <img src="${imagen}" class="img-thumbnail rounded col-3" alt="${prod.description}">
            `
    }
    
    document.getElementById("prod-info").innerHTML = contenidoHTML;
    document.getElementById("fila-img").innerHTML = contenidoImag;
}

function mostrarComentario(){
    let contenidoHTML= "";
    for (let i=0; i<coment.length; i++){
        
            contenidoHTML += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <p class="mb-1">${coment[i].user}</p>
                    <p class="mb-1">${coment[i].dateTime}
                        <span class="fa fa-star ${coment[i].score>0 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${coment[i].score>1 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${coment[i].score>2 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${coment[i].score>3 ? "checked" : ""}"></span>
                        <span class="fa fa-star ${coment[i].score>4 ? "checked" : ""}"></span>
                    </p>
                    <p class="mb-1">${coment[i].description}</p>
                                       
                </div>
            </div>
            `
        document.getElementById("prod-coment").innerHTML = contenidoHTML;
    };
};


//obtengo los productos que necesito del JSON
document.addEventListener("DOMContentLoaded", function(){ //funcion anonima
    getJSONData(url_prod).then(function(respuesta){ //respuesta es un objeto js
        if(respuesta.status ==="ok"){
            prod = respuesta.data;
            mostrarProducto();
        } else {
            alert("Ha ocurrido un error al obtener el producto seleccionado");
        }
    });

    getJSONData(url_comentarios).then(function(respuesta){ //respuesta es un objeto js
        if(respuesta.status ==="ok"){
            coment = respuesta.data;
            mostrarComentario();
        } else {
            alert("Ha ocurrido un error al obtener los comentarios"); 
        }
    });
});