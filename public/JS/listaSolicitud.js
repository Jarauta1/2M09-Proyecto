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

    let solicitante = usuario
    let solicitado = localStorage.getItem("usuario")

    fetch("/solicitudesAmistad/aceptar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ solicitado: solicitado, solicitante: solicitante }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data)
            localStorage.setItem("solicitud", "no")
            localStorage.setItem("solicitante", "nadie")
            window.alert(data.mensaje)
            location.href = '../dashboard.html';
        });
}

function rechazar() {


    let solicitante = usuario
    let solicitado = localStorage.getItem("usuario")

    fetch("/solicitudesAmistad/rechazar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ solicitado: solicitado, solicitante: solicitante }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data)
            localStorage.setItem("solicitud", "no")
            localStorage.setItem("solicitante", "nadie")
            window.alert(data.mensaje)
            location.href = '../dashboard.html';
        });
}