// @ts-nocheck
const staticData = {
    results: [],
};

async function callAPI(event) {
    try {
        const response = await fetch(
            `/.netlify/functions/search?query=${encodeURIComponent(
                event.currentTarget.query.value
            )}`
        );
        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            console.log(response.toString());
        }
        const data = await response.json();
        staticData.results = data.value;
        console.log(staticData.results);
    } catch (error) {
        // output to console log
        console.log(error.toString());
    }
}
