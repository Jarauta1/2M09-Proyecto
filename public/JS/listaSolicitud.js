let usuario = localStorage.getItem("solicitante")


let listadoUsuarios = ""
let i
let datos

listado()

function volver() {
    location.href = '../dashboard.html';
}

function listado() {

    fetch("/solicitudesAmistad/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].username == usuario) {


                    listadoUsuarios += `
                    <tr>
                    <td class = "lalign"><strong>${data[i].username}</strong></td>
                    <td>${data[i].nombre}</td>
                    <td>${data[i].apellido}</td>
                    <td>${data[i].edad} años</td>
                    <td><button id="boton" onclick=aceptar(${i})>Aceptar</button></td>
                    <td><button id="boton" onclick=rechazar(${i})>Rechazar</button></td>
                    </tr>
                    `
                }
            }
            document.getElementById("introducirUsuarios").innerHTML = listadoUsuarios
        });
}


let indice2

function amistad(indice) {
    indice2 = indice
    let nombreSolicitado = datos[indice2].nombre
    for (i = 0; i < datos.length; i++) {
        if (datos[i].nombre === nombreSolicitado) {

            fetch("/listaUsuarios/peticion", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombreSolicitado: nombreSolicitado, nombreEnvia: usuario }),
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {

                });
        }
    }
}

let propio

function aceptar(indice) {
    for (i = 0; i < data.length; i++) {
        if (data[i].nombre === usuario) {
            propio = i
        }
    }
    data[indice2].amistad.push({ nombre: data[propio].nombre, apellido: data[propio].apellido })
    data[indice2].solicitud = "no"
    data[indice2].peticion = "no"
    data[propio].amistad.push({ nombre: data[indice2].nombre, apellido: data[indice2].apellido })
    data[propio].solicitud = "no"
    data[propio].peticion = "no"



}

function rechazar() {

    data[indice2].solicitud = "no"
    data[indice2].peticion = "no"
    for (i = 0; i < data.length; i++) {
        if (data[i].nombre === usuario) {
            let propio = i
        }
    }

    data[propio].solicitud = "no"
    data[propio].peticion = "no"

}