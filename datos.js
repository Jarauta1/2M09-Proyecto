const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

let actividades = 0
let calorias = 0
let desnivel = 0
let media = 0
let maxima = 0
let asics = 0
let mizuno = 0
let distancia = 0
let tiempo = 0

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let anyo = parseInt(req.body.anyo)
    let mes = req.body.mes

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            let entrenamiento = datos[0].entrenamiento
            let contador = 0
            actividades = 0
            calorias = 0
            desnivel = 0
            media = 0
            maxima = 0
            asics = 0
            mizuno = 0
            distancia = 0
            tiempo = 0
            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].mes == "total") {
                    contador++
                    actividades += entrenamiento[i].actividades
                    calorias += entrenamiento[i].calorias / 1000
                    desnivel += entrenamiento[i].elevacion / 1000
                    media += entrenamiento[i].velocidadMedia
                    maxima += entrenamiento[i].velocidadMaxima
                    distancia += entrenamiento[i].distancia / 1000
                    tiempo += entrenamiento[i].tiempo
                }
                if (entrenamiento[i].zapatillas == "ASICS" && entrenamiento[i].mes !== "total") {
                    asics += entrenamiento[i].distancia / 1000
                }
                if (entrenamiento[i].zapatillas == "MIZUNO" && entrenamiento[i].mes !== "total") {
                    mizuno += entrenamiento[i].distancia / 1000
                }
            }

            calorias = parseFloat(calorias).toFixed(2)
            desnivel = parseFloat(desnivel).toFixed(2)
            media = media / contador
            maxima = maxima / contador
            media = parseFloat(media).toFixed(2)
            maxima = parseFloat(maxima).toFixed(2)
            asics = parseFloat(asics).toFixed(2)
            mizuno = parseFloat(mizuno).toFixed(2)
            distancia = parseFloat(distancia).toFixed(2)

            let segundos = tiempo % 60
            let segundosOperar = tiempo - segundos

            let minutosCalculo = segundosOperar / 60
            let minutos = minutosCalculo % 60
            let minutosOperar = minutosCalculo - minutos

            let horasCalculo = minutosOperar / 60
            let horas = horasCalculo % 24
            let horasOperar = horasCalculo - horas

            let diasCalculo = horasOperar / 24
            let dias = diasCalculo % 24

            let peso = parseFloat(datos[0].peso)
            let altura = parseFloat(datos[0].altura)
            let nombre = datos[0].nombre
            let apellido = datos[0].apellido
            let edad = parseInt(datos[0].edad)
            let sexo = datos[0].sexo

            let pesoMiller
            let pesoHamwi
            let ppi
            let imc
            let avatar

            let random = parseInt(Math.random() * (34 - 1) + 1);

            if (sexo == "hombre") {
                pesoMiller = 56.2 + (0.555 * (altura - 152.4))
                pesoMiller = parseFloat(pesoMiller).toFixed(0)
                pesoHamwi = 48 + (1.06 * (altura - 152.4))
                pesoHamwi = parseFloat(pesoHamwi).toFixed(0)
                avatar = `./Imagenes/avatar/h${random}.png`
            } else if (sexo == "mujer") {
                pesoMiller = 53.1 + (0.535 * (altura - 152.4))
                pesoMiller = parseFloat(pesoMiller).toFixed(0)
                pesoHamwi = 45.5 + (0.866 * (altura - 152.4))
                pesoHamwi = parseFloat(pesoHamwi).toFixed(0)
                avatar = `./Imagenes/avatar/m${random}.png`
            }

            ppi = (peso / ((parseFloat(pesoMiller) + parseFloat(pesoHamwi)) / 2)) * 100
            ppi = parseFloat(ppi).toFixed(1)

            imc = peso / ((altura / 100) * (altura / 100))
            imc = parseFloat(imc).toFixed(1)

            res.send({ avatar: avatar, pesoMiller: pesoMiller, pesoHamwi: pesoHamwi, ppi: ppi, imc: imc, nombre: nombre, apellido: apellido, altura: altura, peso: peso, edad: edad, actividades: actividades, calorias: calorias, desnivel: desnivel, media: media, maxima: maxima, asics: asics, mizuno: mizuno, distancia: distancia, segundos: segundos, minutos: minutos, horas: horas, dias: dias })
        }
    })



})

router.post("/graficas", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username
    let anyo = req.body.anyo
    let actividad = req.body.actividad
    let ene
    let feb
    let mar
    let abr
    let may
    let jun
    let jul
    let ago
    let sep
    let oct
    let nov
    let dic

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            let entrenamiento = datos[0].entrenamiento

            for (let i = 0; i < entrenamiento.length; i++) {
                if (entrenamiento[i].anyo == anyo) {
                    if (entrenamiento[i].mes == "enero") {
                        ene = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "febrero") {
                        feb = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "marzo") {
                        mar = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "abril") {
                        abr = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "mayo") {
                        may = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "junio") {
                        jun = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "julio") {
                        jul = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "agosto") {
                        ago = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "septiembre") {
                        sep = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "octubre") {
                        oct = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "noviembre") {
                        nov = entrenamiento[i][`${actividad}`]
                    } else if (entrenamiento[i].mes == "diciembre") {
                        dic = entrenamiento[i][`${actividad}`]
                    } else {
                        dic = 0
                    }


                }
            }

            res.send({ ene: ene, feb: feb, mar: mar, abr: abr, may: may, jun: jun, jul: jul, ago: ago, sep: sep, oct: oct, nov: nov, dic: dic })

        }
    })





})

router.put("/add", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username

    db.collection("users").update({ username: username }, { $push: { entrenamiento: { $each: [{ anyo: 2019, mes: "agosto" }], $position: 0 } } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            db.collection("users").find({ $and: [{ username: username }, { entrenamiento: { $elemMatch: { anyo: 2019 } } }] }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {
                    res.send(datos)
                }
            })
        }
    })



})




module.exports = router;