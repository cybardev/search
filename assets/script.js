/**
 * Script to call API endpoint and store search results
 */
const staticData = {
    results: [],
    callSearchAPI: async (event) => {
        try {
            const response = await fetch(
                "/.netlify/functions/search?query=" +
                    encodeURIComponent(event.currentTarget.query.value)
            );
            if (!response.ok) {
                console.log(response.toString());
            }
            const data = await response.json();
            staticData.results = data.value;
            console.log(staticData.results);
        } catch (error) {
            console.log(error.toString());
        }
    },
};

async function callQuoteAPI() {
    try {
        const response = await fetch("/.netlify/functions/quote");
        if (!response.ok) {
            console.log(response.toString());
        }
        const data = await response.json();
        document.getElementById(
            "qotd"
        ).innerHTML = `<blockquote cite="${data.url}">${data.content}</blockquote><address>- ${data.originator.name}</address>`;
    } catch (error) {
        console.log(error.toString());
    }
}
callQuoteAPI();
