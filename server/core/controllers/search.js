const logger = require("../../utility/logger");

exports.ping = (req, res) => {
    logger.info("In ES ping", res)
    res.status(200).send({message: "Elastic Server is up and running"})
}