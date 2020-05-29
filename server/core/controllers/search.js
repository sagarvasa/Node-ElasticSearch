const logger = require("../../utility/logger");
const { client, es_utility } = require("../../utility/elasticsearch");
const es_helper = require("../../helper/elasticsearch");
const constants = require("../../utility/constants");
const es_config = require("../../../config/elasticsearch")[process.env.NODE_ENV];
const tweets_data = require("../../../seeder/tweets");
const user_data = require("../../../seeder/user");
require('array.prototype.flatmap').shim()

exports.ping = async (req, res) => {
    await client.ping(res)
        .catch((err) => {
            logger.error(JSON.stringify(err), res)
            return res.status(500).send({ message: "Elastic Server is down" });
        })
    res.status(200).send({ message: "Elastic Server is up and running" })
}

exports.refresh_index = async (req, res) => {
    let indices = req.body.indices;
    indices = indices.split(",");
    let parallel_promise = [];
    indices.forEach((index) => {
        parallel_promise.push(es_utility.purge_indices(index, res))
    })
    Promise.all(parallel_promise)
        .then((data) => {
            res.status(200).send({ message: "Index is re-created successfully" })
        })
        .catch((err) => {
            return res.status(500).send({ message: err.message });
        })
}

exports.insert_data = async (req, res) => {

    //_type is no longer needed in ES 7
    const t_payload = tweets_data.flatMap(tweet => [{ index: { _index: constants.tweet_index } }, tweet])
    const u_payload = user_data.flatMap(user => [{ index: { _index: constants.user_index } }, user])

    let t = es_utility.bulk_create(t_payload, res);
    let u = es_utility.bulk_create(u_payload, res);

    try {
        await t;
        await u;

    } catch (e) {
        logger.error(e.message, res);
        return res.status(500).send({ message: "Oops! something went wrong" })
    }

    res.status(200).send({ message: "successfully inserted" })

}

exports.search_data = async (req, res) => {
    let keyword = req.query.keyword;
    if (!keyword) {
        return res.status(200).send({ "message": "Please insert keyword" });
    } else if (keyword.length < es_config.min_keyword) {
        return res.status(200).send({ "message": `Please type ${es_config.min_keyword} characters or more` });
    } else {
        let parallel_promise = [];
        let tweet_promise = es_utility.search(constants.tweet_index, es_helper.get_search_query(keyword));
        let user_promise = es_utility.search(constants.user_index, es_helper.get_search_query(keyword))
        parallel_promise.push(tweet_promise);
        parallel_promise.push(user_promise);

        Promise.all(parallel_promise)
            .then(results => {
                let output = {
                    "tweets": [],
                    "user": []
                }
                if (Array.isArray(results)) {
                    results.forEach((result) => {
                        let { body } = result;
                        if (body.timed_out == false && body.hits.hits.length > 0)
                            output[body.hits.hits[0]._index] = body.hits.hits
                    })
                }
                return res.status(200).send(output);
            })
            .catch(error => {
                logger.error(error.message, res);
                return res.status(500).send({ message: "Oops! Something went wrong. Please try again after sometime" });
            });
    }
}