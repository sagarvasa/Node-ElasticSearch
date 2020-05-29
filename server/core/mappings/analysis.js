const analysis = {
    "analyzer": {
        "edge_ngram_analyzer": {
            "filter": [
                "lowercase",
                "trim"
            ],
            "tokenizer": "ngram_tokenizer"
        },
        "ngram_analyzer": {
            "tokenizer": "ngram_tokenizer"
        }
    },
    "tokenizer": {
        "edge_ngram_tokenizer": {
            "type": "edge_ngram",
            "min_gram": 3,
            "max_gram": 7
        },
        "ngram_tokenizer": {
            "type": "ngram",
            "min_gram": 3,
            "max_gram": 4
        }
    }
};

module.exports = analysis