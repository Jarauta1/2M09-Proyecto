const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.get("/", function(req, res) {
    let db = req.app.locals.db

    let usuarios = []
    let object = {}

    db.collection("users").find().toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {
            for (let i = 0; i < datos.length; i++) {
                object = {}
                object.nombre = datos[i].username
                object.actividades = datos[i].actividades
                object.distancia = datos[i].distancia
                object.tiempo = datos[i].tiempo

                usuarios.push(object)

                res.send(usuarios)

            }
        }
    })



})

module.exports = router