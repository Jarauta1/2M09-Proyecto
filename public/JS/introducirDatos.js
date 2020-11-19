let descripcion
let distancia
let tiempo
let desnivel
let calorias
let media
let maxima
let fecha
let anyo
let mes
let equipamiento

let username = localStorage.getItem("usuario")

function guardar() {
    descripcion = document.getElementById("descripcionData").value
    distancia = document.getElementById("distancia").value
    distancia = parseInt(distancia)
    tiempo = parseInt(document.getElementById("tiempo").value)
    desnivel = parseInt(document.getElementById("desnivel").value)
    calorias = parseInt(document.getElementById("calorias").value)
    media = document.getElementById("media").value
    media = parseFloat(media)
    media = media.toFixed(2)
    media = parseFloat(media)
    maxima = document.getElementById("maxima").value
    maxima = parseFloat(maxima)
    maxima = maxima.toFixed(2)
    maxima = parseFloat(maxima)
    fecha = document.getElementById("fecha").value
    anyo = fecha.substring(0, 4)
    anyo = parseInt(anyo)
    mes = fecha.substring(5, 7)
    mes = parseInt(mes)
    equipamiento = document.getElementById("equipamiento").value



    fetch("/introducirDatos/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, descripcion: descripcion, distancia: distancia, tiempo: tiempo, desnivel: desnivel, calorias: calorias, media: media, maxima: maxima, anyo: anyo, mes: mes, equipamiento: equipamiento }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            window.alert(`
                   ${data.mensaje}.
                   Descripcion: ${data.descripcion}
                   Distancia corrida: ${data.distancia} kilometros
                   Tiempo empleado: ${data.horas}:${data.minutos}:${data.segundos}
                   Desnivel subido: ${data.desnivel} metros
                   Calorías quemadas: ${data.calorias}
                   Velocidad media: ${data.media} m/s
                   Velocidad máxima alcanzada: ${data.maxima} m/s
                   Deportivas utilizadas: ${data.equipamiento}
                   `)
            location.href = '../dashboard.html';
        });


}