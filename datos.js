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

            calorias = calorias.toFixed(2)
            desnivel = desnivel.toFixed(2)
            media = media / contador
            maxima = maxima / contador
            media = media.toFixed(2)
            maxima = maxima.toFixed(2)
            asics = asics.toFixed(2)
            mizuno = mizuno.toFixed(2)
            distancia = distancia.toFixed(2)

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


            res.send({ actividades: actividades, calorias: calorias, desnivel: desnivel, media: media, maxima: maxima, asics: asics, mizuno: mizuno, distancia: distancia, segundos: segundos, minutos: minutos, horas: horas, dias: dias })
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