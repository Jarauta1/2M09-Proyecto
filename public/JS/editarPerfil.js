let usuario = localStorage.getItem("usuario")
document.getElementById("usuario").innerHTML = usuario

mostrarTexto()


function mostrarTexto() {
    fetch("/editarPerfil/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usuario }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById("editarNombre").value = data.nombre
            document.getElementById("editarApellido").value = data.apellido
            document.getElementById("editarEdad").value = data.edad
            document.getElementById("editarAltura").value = data.altura
            document.getElementById("editarPeso").value = data.peso
        });

}

function editarNombre() {

    let nombre = document.getElementById("editarNombre").value

    fetch("/editarPerfil/nombre", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usuario, nombre: nombre }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById("editarNombre").value = data.nombre
            window.alert(data.mensaje)

        });
}

function editarApellido() {

    let apellido = document.getElementById("editarApellido").value

    fetch("/editarPerfil/apellido", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usuario, apellido: apellido }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById("editarApellido").value = data.apellido
            window.alert(data.mensaje)
        });
}

function editarEdad() {

    let edad = document.getElementById("editarEdad").value

    fetch("/editarPerfil/edad", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usuario, edad: edad }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById("editarEdad").value = data.edad
            window.alert(data.mensaje)
        });
}

function editarAltura() {

    let altura = document.getElementById("editarAltura").value

    fetch("/editarPerfil/altura", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usuario, altura: altura }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById("editarAltura").value = data.altura
            window.alert(data.mensaje)
        });
}

function editarPeso() {

    let peso = document.getElementById("editarPeso").value

    fetch("/editarPerfil/peso", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usuario, peso: peso }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById("editarPeso").value = data.peso
            window.alert(data.mensaje)
        });
}

function perfil() {
    location.href = '../dashboard.html';
}