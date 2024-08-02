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

    $template.querySelector(".precio-final span").textContent = parseInt(precioFinal);
    $template.querySelector(".precio-final span").setAttribute("id", `precio${producto.id}`);
    $template.querySelector(".stock span").textContent = producto.stock;
    $template.querySelector(".stock span").setAttribute("id", `stock${producto.id}`)
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

let isCompraPermitida = false;

for(let i = 0; i < productos.length; i++){
    document.getElementById(`input${i}`).addEventListener('input', () =>{

        const cantidad= parseInt(document.getElementById(`input${i}`).value);
        const stock = parseInt(document.getElementById(`stock${i}`).textContent);

        if(cantidad < 0 || isNaN(cantidad)){
            document.getElementById(`input${i}`).value = 0;
            return;
        }

        if(cantidad > stock){
            isCompraPermitida = false;
        }

        else if(cantidad > 0 && cantidad <= stock){
            productosComprados.add(productos[i].id);
            isCompraPermitida = true;
        }
        else if(cantidad == 0){
            productosComprados.delete(productos[i].id)
        }

    });
}


$calcularBtn.addEventListener('click', () => {

    if(isCompraPermitida === false){
        return;
    }

    let total = 0;

    productosComprados.forEach((id) => {
        const precio = parseInt(document.getElementById(`precio${id}`).textContent);
        const cantidad= parseInt(document.getElementById(`input${id}`).value);
        const stock = parseInt(document.getElementById(`stock${id}`).textContent);

        productos[id].stock -= cantidad;
        document.getElementById(`stock${id}`).textContent = productos[id].stock;

        total += precio * cantidad;
    });

    $total.textContent = total;
})


