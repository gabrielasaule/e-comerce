//url que se arma segun categoria elegida
let prodSeleccionadoId = localStorage.getItem("prodID")
let url_prod = PRODUCT_INFO_URL + prodSeleccionadoId + EXT_TYPE;
let url_comentarios = PRODUCT_INFO_COMMENTS_URL + prodSeleccionadoId + EXT_TYPE;
let prod = undefined;

function mostrarProducto(){
    let contenidoImag="";    
    let contenidoHTML= "";
    contenidoHTML += `
        <div>
            <h2>${prod.name}</h2>
            <hr class="mb-4"/>
        </div>
        <div class="row">
            <div class="col-6">
                <h5 class="mb-1 fw-bold">Precio: </h5>
                <p class="mb-1">    ${prod.currency} ${prod.cost}</p>
                <h5 class="mb-1 fw-bold">Descripción: </h5>
                <p class="mb-1">    ${prod.description}</p>
                <h5 class="mb-1 fw-bold">Categoría: </h5>
                <p class="mb-1">    ${prod.category}</p>
                <h5 class="mb-1 fw-bold">Cantidad de vendidos: </h5>
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

//muestro los productos relacionados 
function mostrarProdRelac(){
    let contenidoHTML ="";
    for (const prodRel of prod.relatedProducts) {
        contenidoHTML += `
            <div onclick="setProdID(${prodRel.id})" class="card" style="width: 18rem;">
                <img class="card-img-top" src="${prodRel.image}" alt="${prodRel.name}">
                <div class="card-body">
                    <p class="card-text">${prodRel.name}</p>
                </div>
            </div>
            `
    }
    
    document.getElementById("fila-relac").innerHTML = contenidoHTML;
}

//obtengo los productos que necesito del JSON
document.addEventListener("DOMContentLoaded", function(){ //funcion anonima
    getJSONData(url_prod).then(function(respuesta){ //respuesta es un objeto js
        if(respuesta.status ==="ok"){
            prod = respuesta.data;
            mostrarProducto();
            mostrarProdRelac();
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

//cuando cliqueo un producto, redirecciona al mismo
//la func es igual  que en products
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}