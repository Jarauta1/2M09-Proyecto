const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});


signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function registrar() {
    let usuarioRegistrar = document.getElementById("usernameRegistro").value
    let passwordRegistrar = document.getElementById("passwordRegistro").value
    let passwordRegistroConfirmacion = document.getElementById("passwordRegistroConfirmacion").value



    if (passwordRegistrar.length < 6) {
        document.getElementById("falloRegistro").innerHTML = `<span>La contraseña tiene que tener al menos 6 carácteres</span>`
    } else {

        if (passwordRegistroConfirmacion !== passwordRegistrar) {
            document.getElementById("falloRegistro").innerHTML = `<span>La contraseña no coincide</span>`
        } else {

            let usuario = { username: usuarioRegistrar, password: passwordRegistrar }

            fetch("/usuarios/registro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(usuario),
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {

                    document.getElementById("falloRegistro").innerHTML = `<span>${data.mensaje}</span>`
                    localStorage.setItem("usuario", usuarioRegistrar)

                    if (data.registro == "si") {

                        location.href = '../loading.html';
                        /* setTimeout("entrarRegistro()", 2000); */
                    }

                });
        }
    }
}

/* function entrarRegistro() {

    location.href = '../registro.html';
} */

function entrar() {
    let usuarioRegistrar = document.getElementById("usernameEntrar").value
    let passwordRegistrar = document.getElementById("passwordEntrar").value

    let usuario = { username: usuarioRegistrar, password: passwordRegistrar }

    fetch("/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            document.getElementById("falloEntrar").innerHTML = `<span>${data.mensaje}</span>`

            if (data.entrar == "si") {
                localStorage.setItem("usuario", usuarioRegistrar)
                location.href = '../dashboard.html';
            }

        });

}