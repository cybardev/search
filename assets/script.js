// @ts-nocheck
const staticData = {
    results: [],
    callAPI: async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `/.netlify/functions/search?query=${encodeURIComponent(
                    event.currentTarget.searchInput.value
                )}`
            );
            if (!response.ok) {
                // NOT res.status >= 200 && res.status < 300
                console.log(response.toString());
            }
            const data = await response.json();
            this.results = data.value;
            console.log(this.results);
        } catch (error) {
            // output to console log
            console.log(error.toString());
        }
    },
};
