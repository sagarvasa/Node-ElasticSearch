# Node-ElasticSearch
A basic overview of node elasticsearch integration for searching

# Install ElasticSearch on mac with homebrew
https://www.elastic.co/guide/en/elasticsearch/reference/current/brew.html

# steps to start and configure server
1. Clone the repo in your workspace
2. install the dependancies using `npm install`
3. set up `.env` file at a root level
4. run command `npm start` to start the server
5. run your elastic search server and change configuration at config/elasticsearch.js if applicable


# APIs
1. to check if server is up
curl --location --request GET 'http://localhost:3000/ping'

2. to check if elastic server is up or not
curl --location --request GET 'http://localhost:3000/elastic/ping'

3. to refresh (delete if present + create) index
curl --location --request POST 'http://localhost:3000/refresh' \
--header 'Content-Type: application/json' \
--data-raw '{
	"indices": "tweets,user"
}'

4. to insert the data
curl --location --request POST 'http://localhost:3000/insert'

5. for searching
curl --location --request GET 'http://localhost:3000/search?keyword=sagar_vasa'

