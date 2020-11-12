const express = require("express");
const mongodb = require("mongodb");
const app = express();

let MongoClient = mongodb.MongoClient;

/* let menu = require("./menu") */

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let db;
MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if (err !== null) {
        console.log(err)
    } else {
        app.locals.db = client.db("BootDonald")
    }
})

/* app.use("/menu", menu) */

app.listen(3000);