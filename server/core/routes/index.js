const controllers = require("../controllers");

const router = (app) => {

    app.route("/ping")
        .get((req, res) => {
            res.status(200).send({message: "Server is up and running"})
        })

    app.route("/elastic/ping")
        .get(controllers.search.ping)
    
    app.route("/refresh")
        .post(controllers.search.refresh_index)
    
    app.route("/insert")
        .post(controllers.search.insert_data)

    app.route("/search")
        .get(controllers.search.search_data)
}


module.exports = router;