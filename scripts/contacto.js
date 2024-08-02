"use strict";

const $form = document.querySelector("form");
const $nombre = document.getElementById("nombre");
const $apellido = document.getElementById("apellido");
const $email = document.getElementById("email");
const $telefono = document.getElementById("telefono");
const $mensaje = document.getElementById("mensaje");
const $botonEnviar = document.getElementById("boton-enviar");
const informacion = [];

$botonEnviar.addEventListener("click", (e) => {

    informacion[0] = $nombre.value;
    informacion[1] = $apellido.value;
    informacion[2] = $email.value;
    informacion[3] = $telefono.value;
    informacion[4] = $mensaje.value;

    for(let info of informacion){
        if(info === ""){
            return;
        }
    }

    let blob = new Blob([informacion], {type: "text/plain;charset=utf-8"});

    saveAs(blob, "contacto.txt");
})

