let mensaje = ""

let username = localStorage.getItem("usuario")
console.log(username)

let anyo
let mes

function editar() {
    location.href = '../editarPerfil.html';
}


actualizarDatos()
    /* addDatos() */

function actualizarDatos() {

    /* let anyo = document.getElementById("selectAnyo").value
    let mes = document.getElementById("selectMes").value */

    fetch("/datos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, anyo: anyo, mes: mes }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data)



            document.getElementById("actividades").innerHTML = data.actividades
            document.getElementById("calorias").innerHTML = data.calorias
            document.getElementById("desnivel").innerHTML = data.desnivel
            document.getElementById("media").innerHTML = data.media
            document.getElementById("maxima").innerHTML = data.maxima
            document.getElementById("zapatilla1").innerHTML = data.asics
            document.getElementById("zapatilla2").innerHTML = data.mizuno
            document.getElementById("tiempo").innerHTML = `${data.dias} días ${data.horas} h:${data.minutos} min`
            document.getElementById("segundos").innerHTML = `:${data.segundos} seg`

            /*  console.log(data.length, data[1].anyo, data[1].mes)

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
             } */

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

var options = {
    series: [{
        name: "2020",
        data: [0, 0, 0, 0, 94.16, 96.56, 32.14, 32.17, 40.35, 64.44, 8]
    }],
    chart: {
        height: 200,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
        enabled: true,
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        text: 'Distancia',
        align: 'left'
    },
    grid: {
        borderColor: '#e7e7e7',
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    markers: {
        size: 1
    },
    xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', "Ago", "Sep", "Oct", "Nov"],
        title: {
            text: 'Mes'
        }
    },
    yaxis: {
        title: {
            text: 'Km'
        },
        min: 5,
        max: 100
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();