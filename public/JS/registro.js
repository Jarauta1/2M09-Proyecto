let usuario = localStorage.getItem("usuario")

document.getElementById("usuario").innerHTML = usuario

function perfil() {
    let nombre = document.getElementById("nombre").value
    let apellido = document.getElementById("nombre").value
    let altura = document.getElementById("nombre").value
    let edad = document.getElementById("nombre").value
    let peso = document.getElementById("nombre").value

    let perfil = { usuario: usuario, nombre: nombre, apellido: apellido, altura: altura, edad: edad, peso: peso }


    fetch("/usuarios/perfil", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(perfil),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            console.log(data)

            /* location.href = '../registro.html'; */


        });


}