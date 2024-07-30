"use strict";

const $contenedorProductos = document.querySelector(".contenedor-productos");
const $template = document.querySelector("template").content;
const $fragment = document.createDocumentFragment();

productos.forEach((producto) => {

    let precioFinal = producto.precio;
    

    $template.querySelector("img").setAttribute("src", producto.imagen);
    $template.querySelector("img").setAttribute("alt", producto.alt);
    $template.querySelector("h2").textContent = producto.nombre;

    if(producto.descuento > 0){
        $template.querySelector(".precio-base").textContent = "$ " + producto.precio;
        $template.querySelector(".descuento").textContent = `-${producto.descuento}%`;
        precioFinal = producto.precio - (producto.precio * producto.descuento / 100); 
    }

    if(producto.descuento === 0){
        $template.querySelector(".producto-descripcion p").classList.add("display-none");
    }else{
        $template.querySelector(".producto-descripcion p").classList.remove("display-none");
    }

    $template.querySelector(".precio-final").textContent = "$ " + precioFinal;
    $template.querySelector(".stock").textContent = producto.stock;

    let $clon = document.importNode($template, true);
    $fragment.appendChild($clon);
});

$contenedorProductos.appendChild($fragment);
