let usuario = localStorage.getItem("usuario")

document.getElementById("usuario").innerHTML = usuario

function perfil() {
    let nombre = document.getElementById("nombre").value
    let apellido = document.getElementById("apellido").value
    let altura = document.getElementById("altura").value
    let edad = document.getElementById("edad").value
    let peso = document.getElementById("peso").value
    let sexo = document.getElementById("sexo").value

    let perfil = { usuario: usuario, nombre: nombre, apellido: apellido, altura: altura, edad: edad, peso: peso, sexo: sexo }


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



            location.href = '../dashboard.html';


        });


}