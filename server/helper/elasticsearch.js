exports.get_search_query = (keyword) => {

    let must = [];

    must.push({
        "terms": {
            ["search_text"]: keyword.split(' ')
        }
    })
    const query = {
        "query": {
            "bool": {
                "must": must
            }
        }
    };

    return query;
}