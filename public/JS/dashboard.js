let mensaje = ""

let username = localStorage.getItem("usuario")
console.log(username)



actualizarDatos()
    /* addDatos() */

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
            console.log(data)
            console.log(data.length, data[1].anyo, data[1].mes)

            for (let i = 0; i < data.length; i++) {
                if (data[i].anyo == 2019 && data[i].mes == "total") {
                    console.log(data[i].calorias)
                    document.getElementById("calorias").innerHTML = data[i].calorias
                    document.getElementById("desnivel").innerHTML = (data[i].elevacion / 1000)
                    document.getElementById("distancia").innerHTML = `${(data[i].distancia / 1000)} Km`

                    let segundos = (data[i].tiempo % 60)
                    let segundosOperar = (data[i].tiempo - segundos)

                    let minutosCalculo = segundosOperar / 60
                    let minutos = minutosCalculo % 60
                    let minutosOperar = minutosCalculo - minutos

                    let horasCalculo = minutosOperar / 60
                    let horas = horasCalculo % 60
                    let horasOperar = horasCalculo - horas

                    let diasCalculo = horasOperar / 24
                    let dias = diasCalculo % 60

                    document.getElementById("tiempo").innerHTML = `${dias} d, ${horas} h, ${minutos} min y ${segundos} seg.`
                }
            }

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