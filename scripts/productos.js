"use strict";

const $contenedorProductos = document.querySelector(".contenedor-productos");
const $template = document.querySelector("template").content;
const $fragment = document.createDocumentFragment();

productos.forEach((producto) => {

    let precioFinal = producto.precio;
    
    $template.querySelector(".producto").setAttribute("id", `producto${producto.id}`);
    $template.querySelector("img").setAttribute("src", producto.imagen);
    $template.querySelector("img").setAttribute("alt", producto.alt);
    $template.querySelector("h2").textContent = producto.nombre;

    $template.querySelector(".precio-base").textContent = "$ " + producto.precio;
    $template.querySelector(".descuento").textContent = `-${producto.descuento}%`;
    precioFinal = producto.precio - (producto.precio * producto.descuento / 100); 

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

const $finalizarCompra = document.querySelector(".finalizar-compra");

let productosComprados = new Set();

let errores = 0;


for(let i = 0; i < productos.length; i++){
    document.getElementById(`input${i}`).addEventListener('input', () =>{

        const cantidad= parseInt(document.getElementById(`input${i}`).value);
        const stock = parseInt(document.getElementById(`stock${i}`).textContent);

        if(validarProducto(i, stock, cantidad)){
            productosComprados.add(productos[i].id);
            let err = document.querySelector(`#producto${i} .mensaje-error`);
                if(err){
                    err.remove();
                    errores--;
                }  
        }else{
            productosComprados.delete(productos[i].id);
                if(!document.querySelector(`#producto${i} .mensaje-error`)){
                        añadirError("ingrese un número valido", i);
                        errores++;
                    }
            
        }


    });

}


$finalizarCompra.addEventListener('click', () => {

    if(errores > 0 || productosComprados.size == 0){
        return
    }

    let total = 0;

    productosComprados.forEach((id) => {

        const precio = parseInt(document.getElementById(`precio${id}`).textContent);
        const cantidad= parseInt(document.getElementById(`input${id}`).value);
        const stock = parseInt(document.getElementById(`stock${id}`).textContent);
        
        productos[id].stock -= cantidad;
        document.getElementById(`stock${id}`).textContent = productos[id].stock;

        total += precio * cantidad;

        document.getElementById(`input${id}`).value = 0;
       
    });

    $total.textContent = total;
});

function añadirError(mensaje, idProducto){

    const mensajeDeError = document.createElement("p");
    mensajeDeError.classList.add("mensaje-error");
    const textoMensaje = document.createTextNode(mensaje);
    mensajeDeError.appendChild(textoMensaje);
    document.querySelector(`#producto${idProducto} .producto-descripcion`).appendChild(mensajeDeError);
}

function validarProducto(id, stock, cantidad){

    if(stock < cantidad || cantidad < 0 || isNaN(cantidad)){
        return false;
    }

    return true;
}







