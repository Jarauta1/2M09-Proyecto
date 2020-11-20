let mensaje = ""

let username = localStorage.getItem("usuario")
document.getElementById("tituloUsuario").innerHTML = username

function editar() {
    location.href = '../editarPerfil.html';
}

function usuarios() {
    let comprobacion = localStorage.getItem("solicitud")

    if (comprobacion == "si") {
        location.href = '../listaSolicitud.html'
    } else {
        location.href = '../listaUsuarios.html';
    }
}

function datos() {
    location.href = '../introducirDatos.html';
}

function salir() {
    location.href = '../index.html';
}

comprobarSolicitud()

function comprobarSolicitud() {
    fetch("/solicitudes/", {
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
            if (data.solicitud == "si" && username !== data.solicitante) {
                localStorage.setItem("solicitud", "si")
                localStorage.setItem("solicitante", data.solicitante)
                window.alert(`Tienes una solicitud de amistad de ${data.solicitante}`)
            }


        })

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


            setTimeout(function() {
                odometer.innerHTML = data.distancia;
            }, 500);

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


function actualizarGraficas() {

    let anyo = document.getElementById("selectAnyo").value
    let actividad = document.getElementById("selectActividad").value
    let actividad2 = document.getElementById("selectActividadAcumulado").value
    let actividadBarras = document.getElementById("selectActividadBarras").value

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
                }],
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

                    },
                    min: 0,
                    max: mayor
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



    fetch("/datos/graficasBarra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, actividad: actividadBarras }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {


            var mayor = Math.max(data.ene18, data.feb18, data.mar18, data.abr18, data.may18, data.jun18, data.jul18, data.ago18, data.sep18, data.oct18, data.nov18, data.dic18, data.ene19, data.feb19, data.mar19, data.abr19, data.may19, data.jun19, data.jul19, data.ago19, data.sep19, data.oct19, data.nov19, data.dic19, data.ene20, data.feb20, data.mar20, data.abr20, data.may20, data.jun20, data.jul20, data.ago20, data.sep20, data.oct20, data.nov20, data.dic20);

            var options = {
                series: [{
                    name: "2018",
                    data: [data.ene18, data.feb18, data.mar18, data.abr18, data.may18, data.jun18, data.jul18, data.ago18, data.sep18, data.oct18, data.nov18, data.dic18]
                }, {
                    name: "2019",
                    data: [data.ene19, data.feb19, data.mar19, data.abr19, data.may19, data.jun19, data.jul19, data.ago19, data.sep19, data.oct19, data.nov19, data.dic19]
                }, {
                    name: "2020",
                    data: [data.ene20, data.feb20, data.mar20, data.abr20, data.may20, data.jun20, data.jul20, data.ago20, data.sep20, data.oct20, data.nov20, data.dic20]
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
        })

    fetch("/datos/graficasAcumulado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, actividad: actividad2 }),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            var mayor2 = Math.max(data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18 + data.ago18 + data.sep18 + data.oct18 + data.nov18 + data.dic18, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19 + data.ago19 + data.sep19 + data.oct19 + data.nov19 + data.dic19, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20 + data.ago20 + data.sep20 + data.oct20 + data.nov20 + data.dic20);

            var options = {
                series: [{
                    name: "2018",
                    data: [data.ene18, data.ene18 + data.feb18, data.ene18 + data.feb18 + data.mar18, data.ene18 + data.feb18 + data.mar18 + data.abr18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18 + data.ago18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18 + data.ago18 + data.sep18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18 + data.ago18 + data.sep18 + data.oct18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18 + data.ago18 + data.sep18 + data.oct18 + data.nov18, data.ene18 + data.feb18 + data.mar18 + data.abr18 + data.may18 + data.jun18 + data.jul18 + data.ago18 + data.sep18 + data.oct18 + data.nov18 + data.dic18]
                }, {
                    name: "2019",
                    data: [data.ene19, data.ene19 + data.feb19, data.ene19 + data.feb19 + data.mar19, data.ene19 + data.feb19 + data.mar19 + data.abr19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19 + data.ago19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19 + data.ago19 + data.sep19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19 + data.ago19 + data.sep19 + data.oct19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19 + data.ago19 + data.sep19 + data.oct19 + data.nov19, data.ene19 + data.feb19 + data.mar19 + data.abr19 + data.may19 + data.jun19 + data.jul19 + data.ago19 + data.sep19 + data.oct19 + data.nov19 + data.dic19]
                }, {
                    name: "2020",
                    data: [data.ene20, data.ene20 + data.feb20, data.ene20 + data.feb20 + data.mar20, data.ene20 + data.feb20 + data.mar20 + data.abr20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20 + data.ago20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20 + data.ago20 + data.sep20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20 + data.ago20 + data.sep20 + data.oct20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20 + data.ago20 + data.sep20 + data.oct20 + data.nov20, data.ene20 + data.feb20 + data.mar20 + data.abr20 + data.may20 + data.jun20 + data.jul20 + data.ago20 + data.sep20 + data.oct20 + data.nov20 + data.dic20]
                }],
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

                    },
                    min: 0,
                    max: mayor2
                },
                legend: {
                    position: "top",
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart3"), options);
            chart.render();




        })
}

comprobarAmistad()

function comprobarAmistad() {
    fetch("/usuarios/usuario", {
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
            let hayAmigo = data.longitud
            let amigo = data.amigo

            if (hayAmigo > 0) {

                fetch("/datos/graficasAcumulado", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: username, actividad: "distancia" }),
                    })
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(data) {
                        let usu1ene = data.ene20
                        let usu1feb = data.feb20
                        let usu1mar = data.mar20
                        let usu1abr = data.abr20
                        let usu1may = data.may20
                        let usu1jun = data.jun20
                        let usu1jul = data.jul20
                        let usu1ago = data.ago20
                        let usu1sep = data.sep20
                        let usu1oct = data.oct20
                        let usu1nov = data.nov20
                        let usu1dic = data.dic20

                        fetch("/datos/graficasAcumulado", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ username: amigo, actividad: "distancia" }),
                            })
                            .then(function(res) {
                                return res.json();
                            })
                            .then(function(data) {

                                var alto = Math.max(usu1ene, usu1feb, usu1mar, usu1abr, usu1may, usu1jun, usu1jul, usu1ago, usu1sep, usu1oct, usu1nov, usu1dic, data.ene20, data.feb20, data.mar20, data.abr20, data.may20, data.jun20, data.jul20, data.ago20, data.sep20, data.oct20, data.nov20, data.dic20);
                                var options = {
                                    series: [{
                                        name: username,
                                        data: [usu1ene, usu1feb, usu1mar, usu1abr, usu1may, usu1jun, usu1jul, usu1ago, usu1sep, usu1oct, usu1nov, usu1dic]
                                    }, {
                                        name: amigo,
                                        data: [data.ene20, data.feb20, data.mar20, data.abr20, data.may20, data.jun20, data.jul20, data.ago20, data.sep20, data.oct20, data.nov20, data.dic20]
                                    }],
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

                                        },
                                        min: 0,
                                        max: alto
                                    },
                                    legend: {
                                        position: "top",
                                        horizontalAlign: 'right',
                                        floating: true,
                                        offsetY: -25,
                                        offsetX: -5
                                    }
                                };

                                var chart = new ApexCharts(document.querySelector("#divAmistad"), options);
                                chart.render();



                            })



                    })



            }

        })
}