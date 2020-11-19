let descripcion
let distancia
let tiempo
let desnivel
let calorias
let media
let maxima
let fecha
let equipamiento

let username = localStorage.getItem("usuario")

function guardar() {
    descripcion = document.getElementById("descripcionData").value
    distancia = parseInt(document.getElementById("distancia").value)
    tiempo = parseInt(document.getElementById("tiempo").value)
    desnivel = parseInt(document.getElementById("desnivel").value)
    calorias = parseInt(document.getElementById("calorias").value)
    media = document.getElementById("media").value
    media = parseFloat(media)
    media = media.toFixed(2)
    media = parseFloat(media)
    maxima = document.getElementById("maxima").value
    maxima = parseFloat(maxima)
    maxima = maxima.toFixed(2)
    maxima = parseFloat(maxima)
    fecha = document.getElementById("fecha").value
    fecha = fecha.substring(0, 4)
    equipamiento = document.getElementById("equipamiento").value

    fetch("/introducirDatos/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, descripcion: descripcion, distancia: distancia, tiempo: tiempo, desnivel: desnivel, calorias: calorias, media: media, maxima: maxima, fecha: fecha, equipamiento: equipamiento }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {



        });
    console.log(descripcion, distancia, tiempo, desnivel, calorias, media, maxima, fecha, equipamiento)
}