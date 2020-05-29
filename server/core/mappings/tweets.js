const tweets = {
    "tweet_id": {
        "type": "long"
    },
    "source_id": {
        "type": "integer"
    },
    "tags": {
        "type": "text",
        "copy_to": "search_text"
    },
    "message": {
        "type": "text",
    },
    "is_featured": {
        "type": "boolean"
    },
    "date": {
        "type": "date"
    },
    "rating": {
        "type": "double"
    },
    "user_email_domain": {
        "type": "keyword", // index: not_analyzed is not present in ES-7 and hence use "keyword". 
    },
    "search_text": {
        "type": "text",
        "fields": {
            "english": {
                "type": "text",
                "analyzer": "english"
            },
            "edgengram": {
                "type": "text",
                "analyzer": "edge_ngram_analyzer"
            },
            "ngram": {
                "type": "text",
                "analyzer": "ngram_analyzer"
            }
        }

    }
};

module.exports = tweets;