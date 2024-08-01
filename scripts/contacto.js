"use strict";

const $nombre = document.getElementById("nombre");
const $apellido = document.getElementById("apellido");
const $email = document.getElementById("email");
const $telefono = document.getElementById("telefono");
const $mensaje = document.getElementById("mensaje");
const $botonEnviar = document.getElementById("boton-enviar");
const informacion = [];

$botonEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    informacion[0] = $nombre.value;
    informacion[1] = $apellido.value;
    informacion[2] = $email.value;
    informacion[3] = $telefono.value;
    informacion[4] = $mensaje.value;

    console.log(informacion[0], informacion[1], informacion[2], informacion[3], informacion[4]);

    let blob = new Blob([informacion], {type: "text/plain;charset=utf-8"});

    saveAs(blob, "contacto.txt");
})

