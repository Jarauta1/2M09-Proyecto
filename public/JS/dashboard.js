let mensaje = ""

let username = localStorage.getItem("usuario")

function editar() {
    location.href = '../editarPerfil.html';
}


actualizarDatos()
actualizarGraficas()
    /* addDatos() */

function actualizarDatos() {

    /* let anyo = document.getElementById("selectAnyo").value
    let mes = document.getElementById("selectMes").value */

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

            document.getElementById("pesoIdeal").innerHTML = `${data.pesoMiller }-${data.pesoHamwi}`
            document.getElementById("PI").innerHTML = `${data.ppi}`
            document.getElementById("IMC").innerHTML = `${data.imc}`
            document.getElementById("imagenAvatar").innerHTML = `<img class="icon" src="${data.avatar}" height="70" />`
            document.getElementById("nombreUsuario").innerHTML = `${data.nombre} ${data.apellido}`
            document.getElementById("alturaUsuario").innerHTML = `${data.altura}`
            document.getElementById("pesoUsuario").innerHTML = `${data.peso}`
            document.getElementById("edadUsuario").innerHTML = `${data.edad}`

            document.getElementById("actividades").innerHTML = data.actividades
            document.getElementById("calorias").innerHTML = data.calorias
            document.getElementById("desnivel").innerHTML = data.desnivel
            document.getElementById("media").innerHTML = data.media
            document.getElementById("maxima").innerHTML = data.maxima
            document.getElementById("zapatilla1").innerHTML = data.asics
            document.getElementById("zapatilla2").innerHTML = data.mizuno
            document.getElementById("distancia").innerHTML = data.distancia

            let dias = data.dias
            dias = dias.toString()
            let diasIzq
            let diasDcha

            if (dias.length > 1) {
                diasIzq = dias.substring(0, 1)
                diasDcha = dias.substring(1, 2)

            } else {
                diasIzq = 0
                diasDcha = dias

            }

            document.getElementById("diasIzqArriba").innerHTML = diasIzq
            document.getElementById("diasIzqAbajo").innerHTML = diasIzq
            document.getElementById("diasDchaArriba").innerHTML = diasDcha
            document.getElementById("diasDchaAbajo").innerHTML = diasDcha

            let horas = data.horas
            horas = horas.toString()
            let horasIzq
            let horasDcha

            if (horas.length > 1) {
                horasIzq = horas.substring(0, 1)
                horasDcha = horas.substring(1, 2)

            } else {
                horasIzq = 0
                horasDcha = horas

            }

            document.getElementById("horasIzqArriba").innerHTML = horasIzq
            document.getElementById("horasIzqAbajo").innerHTML = horasIzq
            document.getElementById("horasDchaArriba").innerHTML = horasDcha
            document.getElementById("horasDchaAbajo").innerHTML = horasDcha

            let minutos = data.minutos
            minutos = minutos.toString()
            let minutosIzq
            let minutosDcha

            if (minutos.length > 1) {
                minutosIzq = minutos.substring(0, 1)
                minutosDcha = minutos.substring(1, 2)

            } else {
                minutosIzq = 0
                minutosDcha = minutos

            }

            document.getElementById("minutosIzqArriba").innerHTML = minutosIzq
            document.getElementById("minutosIzqAbajo").innerHTML = minutosIzq
            document.getElementById("minutosDchaArriba").innerHTML = minutosDcha
            document.getElementById("minutosDchaAbajo").innerHTML = minutosDcha

            let segundos = data.segundos
            segundos = segundos.toString()
            let segundosIzq
            let segundosDcha

            if (segundos.length > 1) {
                segundosIzq = segundos.substring(0, 1)
                segundosDcha = segundos.substring(1, 2)

            } else {
                segundosIzq = 0
                segundosDcha = segundos

            }

            document.getElementById("segundosIzqArriba").innerHTML = segundosIzq
            document.getElementById("segundosIzqAbajo").innerHTML = segundosIzq
            document.getElementById("segundosDchaArriba").innerHTML = segundosDcha
            document.getElementById("segundosDchaAbajo").innerHTML = segundosDcha


            /* document.getElementById("tiempo").innerHTML = `${data.dias} días ${data.horas} h:${data.minutos} min`
            document.getElementById("segundos").innerHTML = `:${data.segundos} seg` */
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

function actualizarGraficas() {

    let anyo = document.getElementById("selectAnyo").value
    let actividad = document.getElementById("selectActividad").value.toLowerCase()
        /* let mes = document.getElementById("selectMes").value */

    fetch("/datos/graficas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, anyo: anyo, actividad: actividad }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            var mayor = Math.max(data.ene, data.feb, data.mar, data.abr, data.may, data.jun, data.jul, data.ago, data.sep, data.oct, data.nov, data.dic);

            var options = {
                series: [{
                        name: anyo,
                        data: [data.ene, data.feb, data.mar, data.abr, data.may, data.jun, data.jul, data.ago, data.sep, data.oct, data.nov, data.dic]
                    }
                    /* , {
                        name: "2019",
                        data: [12, 3, 23, 75, 21, 45, 23, 86, 29, 42, 75, 4]
                    } */
                ],
                chart: {
                    height: 300,
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
                    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', "Ago", "Sep", "Oct", "Nov", "Dic"],
                    title: {
                        text: 'Mes'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Km'
                    },
                    min: 5,
                    max: mayor + 50
                },
                legend: {
                    position: "top",
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

        })
}

/* Barras */

var options = {
    series: [{
        name: '2018',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: '2019',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: '2020',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    chart: {
        type: 'bar',
        height: 300
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', "Ago", "Sep", "Oct", "Nov", "Dic"],
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function(val) {
                return "$ " + val + " thousands"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart2"), options);
chart.render();