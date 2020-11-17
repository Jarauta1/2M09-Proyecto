let usuario = localStorage.getItem("usuario")

document.getElementById("usuario").innerHTML = usuario


function mostrarTexto() {
    fetch("/editarPerfil/nombre", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data)

            document.getElementById("nombre").value = "Hola"

        });
}


function editarNombre() {
    let hola = document.getElementById("nombre").value
    console.log(hola)

    fetch("/editarPerfil/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, nombre: nombre }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data)


        });

}