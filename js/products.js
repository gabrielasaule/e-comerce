//por escalabilidad me creo variable ya que voy a usuarla varias veces-varias categorias
let listaProductos;
let ORDER_DESC_BY_PRICE = 1;
let ORDER_ASC_BY_PRICE = 2;
let ORDER_BY_VALUATIONS = 3;
let minPrice = undefined;
let maxPrice = undefined;
//url que se arma segun categoria elegida
let catSeleccionada = localStorage.getItem("catID");
let url_seleccionada = PRODUCTS_URL + catSeleccionada + EXT_TYPE;

console.log(catSeleccionada);

//funcion para mostrar la info de productos
function mostrarListaProductos(){
    let contenidoHTML= "";
    console.log(listaProductos.products[0]); //que estoy obteniendo
    let arrayProducts = listaProductos.products;
    for(let i = 0; i < arrayProducts.length; i++){
        let prodActual = arrayProducts[i];

        //cuando recorro mi lista voy filtrando el rango que necesito para mostrar en pantalla
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(prodActual.cost) >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && parseInt(prodActual.cost) <= maxPrice))){
        contenidoHTML += `
            <div  class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${prodActual.image}" alt="${prodActual.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${prodActual.name} - ${prodActual.currency} ${prodActual.cost}</h4>
                            <small class="text-muted">${prodActual.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${prodActual.description}</p>
                    </div>
                </div>
            </div>
            `
        }
    }
    //ver arriba
    //<div onclick="setProdID(${prodActual.id})" class="list-group-item list-group-item-action cursor-active">
    document.getElementById("contenidoProd").innerHTML = contenidoHTML;
    document.getElementById("tituloCat").innerHTML = "Verás aquí todos los productos de la categoria " + listaProductos.catName;
}

function ordenar(tipoFiltrado){
    let listaOrdenada = [];
    if (listaProductos.products != undefined){
        switch (tipoFiltrado){
            case ORDER_DESC_BY_PRICE:
                listaOrdenada = listaProductos.products.sort(function(a,b) {
                    return parseInt(b.cost)-parseInt(a.cost);
                });
            break;
            case ORDER_ASC_BY_PRICE:
                listaOrdenada = listaProductos.products.sort(function(a,b) {
                    return parseInt(a.cost)-parseInt(b.cost);
                });
            break;
            case ORDER_BY_VALUATIONS:
                listaOrdenada = listaProductos.products.sort(function(a,b) {
                    return parseInt(b.soldCount)-parseInt(a.soldCount);
                });
            break;
        }
        listaProductos.products = listaOrdenada;
        mostrarListaProductos();
    }
}

//obtengo los productos que necesito del JSON
document.addEventListener("DOMContentLoaded", function(){ //funcion anonima
    getJSONData(url_seleccionada).then(function(respuesta){ //respuesta es un objeto js
        if(respuesta.status ==="ok"){
            listaProductos = respuesta.data;
            mostrarListaProductos();
        } else {
            alert("Ha ocurrido un error al obtener los productos de la categoria");
        }
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenar(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenar(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortByVal").addEventListener("click", function(){
        ordenar(ORDER_BY_VALUATIONS);
    });
    //acciones para filtran por rango de precio
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //valores min y max de precios que se colocaron para filtrar
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }
        mostrarListaProductos();
    });

    //limpiar filtro de rangos
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        minPrice = undefined;
        maxPrice = undefined;

        mostrarListaProductos();
    });
})

