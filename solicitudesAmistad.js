const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.usuario;

    let usuarioSolicita


    db.collection("users").find().toArray(function(err, arrayUsuario) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {

            res.send(arrayUsuario)

        }
    });
});

module.exports = router;