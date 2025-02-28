const fetch = require("node-fetch");

const handler = async (event, context) => {
    try {
        const SEARCH_RESULTS = 20,
            API_KEY = process.env.SEARCH_API,
            API_HOST = "api.search.brave.com",
            API_ENDPOINT =
                "https://" + API_HOST + "/res/v1/web/search?q=",
            SEARCH_PARAMS =
                "&offset=0&count=" +
                SEARCH_RESULTS +
                "&spellcheck=0&safesearch=off",
            QUERY_STRING = event.queryStringParameters.q;

        const response = await fetch(
            API_ENDPOINT + QUERY_STRING + SEARCH_PARAMS,
            {
                method: "GET",
                headers: {
                    "X-Subscription-Token": API_KEY,
                },
            }
        );
        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText };
        }
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        // output to netlify function log
        console.log(error);
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        };
    }
};

module.exports = { handler };
