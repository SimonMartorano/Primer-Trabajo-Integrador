"use strict";

const productos = [
    {
        nombre: "Coca Cola 2,25Lts.",
        precio: 3100,
        imagen: "/design/images/coca-cola-2.25lts.webp",
        alt: "Coca Cola 2,25 litros",
        descuento: 50,
        stock: 200,
    },
    
    {
        nombre: "Cerveza Imperial Stout lata 473 Ml.",
        precio: 1690,
        imagen: "/design/images/cerveza-imperial-stout-473ml.webp",
        alt: "Cerveza Imperial stout 473 mililitros",
        descuento: 0,
        stock: 100
    },

    {
        nombre: "Fideos tirabuzón Matarazzo 500g",
        precio: 1400,
        imagen: "/design/images/fideos-tirabuzon-matarazzo-500g.webp",
        alt: "Fideos tirabuzon Matarazzo 500 gramos",
        descuento: 0,
        stock: 70
    },

    {
        nombre: "Leche Larga Vida Liviana La Serenisima 1L",
        precio: 1840,
        imagen: "/design/images/leche-liviana-laserenisima-1L.webp",
        alt: "Leche larga vida liviana La Serenisima 1 litro",
        descuento: 10,
        stock: 80
    },

];

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
