const config = {
    development : {
        host: "http://localhost:9200",
        requestTimeout: 2000,
        min_keyword: 3
    },
    staging: {
        host: "https://es_staging_server.amazonaws.com",
        requestTimeout: 2000,
        min_keyword: 3
    },
    dev: {
        host: "https://es_dev_server.amazonaws.com",
        requestTimeout: 2000,
        min_keyword: 3
    },
    production: {
        host: "https://es_prod_server.amazonaws.com",
        requestTimeout: 2000,
        min_keyword: 3
    }
}

module.exports = config