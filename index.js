const express = require("express");
const mongodb = require("mongodb");
const app = express();
const bcrypt = require("bcrypt");
const cifrarContrasenia = require("./cifrarContrasenia")


let usuarios = require("./usuarios")
let datos = require("./datos")
let editarPerfil = require("./editarPerfil")
let introducirDatos = require("./introducirDatos")
let listaUsuarios = require("./listaUsuarios")
let solicitudes = require("./solicitudes")
let solicitudesAmistad = require("./solicitudesAmistad")

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let db;
let MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db("runningPage");
    }
});

app.use("/usuarios", usuarios)
app.use("/datos", datos)
app.use("/editarPerfil", editarPerfil)
app.use("/introducirDatos", introducirDatos)
app.use("/listaUsuarios", listaUsuarios)
app.use("/solicitudes", solicitudes)
app.use("/solicitudesAmistad", solicitudesAmistad)

app.listen(3000);