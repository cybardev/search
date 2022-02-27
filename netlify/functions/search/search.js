const fetch = require("node-fetch");

const handler = async (event, context) => {
    try {
        const API_KEY = process.env.SEARCH_API,
            API_HOST = "contextualwebsearch-websearch-v1.p.rapidapi.com",
            API_ENDPOINT =
                "https://" + API_HOST + "/api/Search/WebSearchAPI?q=",
            SEARCH_PARAMS =
                "&pageNumber=1&pageSize=50&autoCorrect=false&safeSearch=false",
            QUERY_STRING = event.queryStringParameters.q;

        const response = await fetch(
            API_ENDPOINT + QUERY_STRING + SEARCH_PARAMS,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": API_HOST,
                    "x-rapidapi-key": API_KEY,
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
