"use strict";

const productosConDescuento = [];

for(let producto of productos){

    if(productosConDescuento.length == 4){
        break;
    }

    if(producto.descuento > 0){
        productosConDescuento.push(producto.id);
    }
}

const $contenedorProductos = document.querySelector(".contenedor-productos");
const $template = document.querySelector("template").content;
const $fragment = document.createDocumentFragment();

for(let i of productosConDescuento){

    let precioFinal = productos[i].precio - (productos[i].precio * productos[i].descuento / 100) 

    $template.querySelector("a").setAttribute("href", `productos.html#producto${i}`);
    $template.querySelector("img").setAttribute("src", productos[i].imagen);
    $template.querySelector("img").setAttribute("alt", productos[i].alt);
    $template.querySelector("h2").textContent = productos[i].nombre;
    $template.querySelector(".precio-base").textContent = "$ " + productos[i].precio;
    $template.querySelector(".descuento").textContent = `-${productos[i].descuento}%`;
    $template.querySelector(".precio-final").textContent = "$ " + precioFinal;

    if(productos[i].descuento === 0){
        $template.querySelector(".producto-descripcion p").classList.add("display-none");
    }else{
        $template.querySelector(".producto-descripcion p").classList.remove("display-none");
    }

    let $clon = document.importNode($template, true);
    $fragment.appendChild($clon);

}

$contenedorProductos.appendChild($fragment);
