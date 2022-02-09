// @ts-nocheck
import fetch from "node-fetch";

export async function handler(event, context) {
    try {
        const API_KEY = process.env.SEARCH_API,
            API_HOST = "contextualwebsearch-websearch-v1.p.rapidapi.com",
            API_ENDPOINT =
                "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=",
            SEARCH_PARAMS =
                "&pageNumber=1&pageSize=50&autoCorrect=false&safeSearch=false",
            QUERY_STRING = event.queryStringParameters.query;

        let search_results;

        fetch(API_ENDPOINT + QUERY_STRING + SEARCH_PARAMS, {
            method: "GET",
            headers: {
                "x-rapidapi-host": API_HOST,
                "x-rapidapi-key": API_KEY,
            },
        })
            .then((response) => {
                search_results = response.json().value;
            })
            .catch((err) => console.log(err.toString()));

        console.log(search_results);

        return {
            statusCode: 200,
            body: JSON.stringify({
                res: search_results,
            }),
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
}
