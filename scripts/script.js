"use strict";

const $contenedorProductos = document.querySelector(".contenedor-productos");
const $template = document.querySelector("template").content;
const $fragment = document.createDocumentFragment();

for(let i = 0; i < 4; i++){

    let precioFinal = productos[i].precio - (productos[i].precio * productos[i].descuento / 100) 

    $template.querySelector("img").setAttribute("src", productos[i].imagen);
    $template.querySelector("img").setAttribute("alt", productos[i].alt);
    $template.querySelector("h2").textContent = productos[i].nombre;
    $template.querySelector(".precio-base").textContent = "$ " + productos[i].precio;
    $template.querySelector(".descuento").textContent = `-${productos[i].descuento}%`;
    $template.querySelector(".precio-final").textContent = "$ " + precioFinal;

    let $clon = document.importNode($template, true);
    $fragment.appendChild($clon);

}

$contenedorProductos.appendChild($fragment);
