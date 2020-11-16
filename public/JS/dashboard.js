let mensaje = ""

let username = localStorage.getItem("usuario")
console.log(username)

let entrenamiento

actualizarDatos()
addDatos()

function actualizarDatos() {
    fetch("/datos/", {
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

            entrenamiento = data[0].entrenamiento
            console.log(entrenamiento)

        });
}

function addDatos() {
    fetch("/datos/add", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            entrenamiento = data[0].entrenamiento
            console.log(entrenamiento)

        });

}

/* document.getElementById("prueba").innerHTML = */