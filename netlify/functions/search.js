// @ts-nocheck
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    try {
        const API_KEY = process.env.SEARCH_API,
            API_HOST = "contextualwebsearch-websearch-v1.p.rapidapi.com",
            API_ENDPOINT =
                "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=",
            SEARCH_PARAMS =
                "&pageNumber=1&pageSize=50&autoCorrect=false&safeSearch=false",
            QUERY_STRING = event.queryStringParameters.query;

        fetch(API_ENDPOINT + QUERY_STRING + SEARCH_PARAMS, {
            method: "GET",
            headers: {
                "x-rapidapi-host": API_HOST,
                "x-rapidapi-key": API_KEY,
            },
        }).then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify(response.json()),
            };
        });
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};
