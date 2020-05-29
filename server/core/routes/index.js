const controllers = require("../controllers");

const router = (app) => {

    app.route("/ping")
        .get((req, res) => {
            res.status(200).send({message: "Server is up and running"})
        })

    app.route("/elastic/ping")
        .get(controllers.search.ping)
}


module.exports = router;