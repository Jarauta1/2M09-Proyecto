const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");



router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username

    db.collection("users").find({ $and: [{ username: username }, { entrenamiento: { $elemMatch: { anyo: 2019 } } }] }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            let entrenamiento = datos[0].entrenamiento
            res.send(entrenamiento)
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