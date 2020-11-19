let usuario = localStorage.getItem("usuario")

let listadoUsuarios = ""
let i

function listado() {

    fetch("/listaUsuarios/")
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            for (i = 0; i < data.length; i++) {
                if (data[i].nombre !== usuario) {
                    listadoUsuarios += `
                    <tr>
                        <td class = "lalign"><strong>${data[i].nombre}</strong></td>
                        <td>${data[i].actividades}</td>
                        <td>${data[i].distancia}</td>
                        <td>${data[i].tiempo}</td>
                        <td><button onclick=amistad(${i})>Solicitud</button></td>
                    </tr>
                    `
                }
            }





        });

    document.getElementById("introducirUsuarios").innerHTML = listadoUsuarios
}