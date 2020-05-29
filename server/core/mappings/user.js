const users = {
    "user_id": {
        "type": "long"
    },
    "user_name": {
        "type": "text",
        "copy_to": "search_text"
    },
    "user_bio": {
        "type": "text"
    },
    "first_name": {
        "type": "text",
        "copy_to": "full_name"
    },
    "last_name": {
        "type": "text",
        "copy_to": "full_name"
    },
    "dob": {
        "type": "date"
    },
    "age": {
        "type": "integer"
    },
    "email": {
        "type": "text"
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

    },
    // "full_name": {
    //     "type": "multi_field",
    //     "fields": {
    //         "name": {
    //             "type": "text",
    //             "analyzer": "name"
    //         },
    //         "name_autocomplete": {
    //             "type": "custom",
    //             "tokenizer": "standard",
    //             "filter": ["lowercase", "autocomplete"]
    //         }
    //     }
    // }
};

module.exports = users;