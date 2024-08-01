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

    $template.querySelector(".precio-final span").textContent = precioFinal;
    $template.querySelector(".precio-final span").setAttribute("id", `precio${producto.id}`);
    $template.querySelector(".stock").textContent = producto.stock;
    $template.querySelector("input").setAttribute("id", `input${producto.id}`);

    let $clon = document.importNode($template, true);
    $fragment.appendChild($clon);
});

$contenedorProductos.appendChild($fragment);

///////////////////////////////////////////////////////////////////////////////////////////

const $total = document.querySelector(".total span");
$total.textContent = 0;

const $comprarBtn = document.querySelector(".finalizar-compra");
const $calcularBtn = document.querySelector(".calcular-total");

let productosComprados = new Set();


for(let i = 0; i < productos.length; i++){
    document.getElementById(`input${i}`).addEventListener('input', () =>{
        const cantidad= parseInt(document.getElementById(`input${i}`).value);

        if(cantidad > 0){
            productosComprados.add(productos[i].id);
        }
        else if(cantidad == 0){
            productosComprados.delete(productos[i].id)
        }

        console.log(productosComprados);
    });
}


$calcularBtn.addEventListener('click', () => {

    let total = 0;

    productosComprados.forEach((id) => {
        const precio = parseInt(document.getElementById(`precio${id}`).textContent);
        const cantidad= parseInt(document.getElementById(`input${id}`).value);

        total += precio * cantidad;
    });

    $total.textContent = total;
})


