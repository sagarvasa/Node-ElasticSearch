const elasticsearch = require('@elastic/elasticsearch');
const elastic_config = require("../../config/elasticsearch")[process.env.NODE_ENV];
const mappings = require("../core/mappings")
const logger = require("./logger");
let client = {};
let es_utility = {};

const es_client = new elasticsearch.Client({
    node: elastic_config.host,
    requestTimeout: elastic_config.requestTimeout
})

client.ping = (res) => {
    return es_client.ping({}, { requestTimeout: elastic_config.requestTimeout })
}

es_utility.create_indices = async (indices, res) => {
    let { body } = await es_client.indices.exists(({ index: indices })).catch((err) => {
        logger.error(err.message, res);
        return Promise.reject({ message: "error occurred in checking existing" });
    })
    if (body == false) {
        //create index body
        let index_body = {
            settings: {
                index: {
                    number_of_shards: 1,
                    number_of_replicas: 2
                },
                analysis: mappings.analysis
            },
            mappings: {
                properties: mappings[indices] //mapping index name is depricated in ES 7 and hence not used
            }
        }

        await es_client.indices.create({
            index: indices,
            body: index_body
        }).catch((err) => {
            logger.error(err.message, res);
            return Promise.reject({ message: "error occurred in creating index" });
        })
        return Promise.resolve()
    } else {
        logger.info("index already exists", res);
        return Promise.resolve();
    }
}

es_utility.delete_indices = async (indices, res) => {
    return es_client.indices.delete({ index: indices, ignore_unavailable: true })
}

es_utility.purge_indices = async (indices, res) => {
    try {
        const { body } = await es_utility.delete_indices(indices, res);
        logger.info("index delete response " + JSON.stringify(body), res)
        if (body) {
            await es_utility.create_indices(indices, res);
        }
        return Promise.resolve()
    } catch (error) {
        logger.error(error.message, res);
        return Promise.reject({ message: "Error occured in purging" })
    }

}

es_utility.search = async (indices, body, res) => {
    return es_client.search({ index: indices, body: body })
}

es_utility.bulk_create = async (body, res) => {
    logger.info("bulk creating started", res)
    return es_client.bulk({ body: body, refresh: true })
}

module.exports = { client, es_utility }

