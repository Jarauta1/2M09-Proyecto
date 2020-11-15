const express = require("express");
const router = express.Router();
const cifrarContrasenia = require("./cifrarContrasenia")
const bcrypt = require("bcrypt");

router.post("/registro", cifrarContrasenia, function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username;
    let password = req.body.password;

    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            if (datos.length > 0) {
                res.send({ mensaje: "Ese nombre de usuario ya esta ocupado" })
            } else {
                db.collection("users").insertOne({ username: username, password: password, amistad: "Ninguno", peticionAmistad: "No", zapatillas: "Ninguna", bicicleta: "Ninguna", entrenamiento: {}, }, function(err, datos) {
                    if (err !== null) {
                        res.send({ mensaje: "Error al registrar el usuario" })
                    } else {
                        res.send({ mensaje: "Usuario registrado correctamente" })

                    }
                });
            }

        }
    })

})

router.post("/login", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username;
    let password = req.body.password;

    db.collection("users").find({ username: username }).toArray(function(err, arrayUsuario) {
        if (err !== null) {
            res.send({ mensaje: "Ha habido un error" });
        } else {
            if (arrayUsuario.length > 0) {
                if (bcrypt.compareSync(password, arrayUsuario[0].password)) {
                    res.send({ mensaje: "Logueado correctamente" });
                } else {
                    res.send({ mensaje: "Contraseña incorrecta" });
                }
            } else {
                res.send({ mensaje: "El usuario no existe" });
            }
        }
    });
});

router.put("/perfil", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.usuario
    let nombre = req.body.nombre
    let apellido = req.body.apellido
    let altura = parseFloat(req.body.altura)
    let edad = parseFloat(req.body.edad)
    let peso = parseFloat(req.body.peso)

    let perfil = { nombre: nombre, apellido: apellido, altura: altura, edad: edad, peso: peso }


    db.collection("users").find({ username: username }).toArray(function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {


            db.collection("users").updateOne({ username: username }, { $set: perfil }, function(err, datos) {
                if (err !== null) {
                    res.send({ mensaje: "Error al registrar el usuario" })
                } else {
                    res.send({ mensaje: "Usuario registrado correctamente" })

                }
            });


        }
    })

})

module.exports = router;