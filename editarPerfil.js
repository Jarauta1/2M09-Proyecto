router.put("/nombre", function(req, res) {
    let db = req.app.locals.db

    let username = req.body.username

    db.collection("users").updateOne({ username: username }, { $set: { nombre: nombre } }, function(err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: "Error:" + err })
        } else {

            db.collection("users").find({ username: username }).toArray(function(err, datos) {
                if (err !== null) {
                    console.log(err)
                    res.send({ mensaje: "Error:" + err })
                } else {

                    res.send({ nombre: datos[0], mensaje: "Editado correctamente" })


                }
            })


        }
    })
})