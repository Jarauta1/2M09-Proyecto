const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username;

    let solicitud

    db.collection("users").find({ username: username }).toArray(function(err, arrayUsuario) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {
            if (arrayUsuario[0].peticionAmistad = "si") {
                solicitud = arrayUsuario[0].solicitud
            }

        }
    });
});

module.exports = router;