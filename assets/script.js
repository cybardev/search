// @ts-nocheck

const staticData = {
    results: [],
};

document.querySelector(".search-box")?.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const response = await fetch(
            `/.netlify/functions/search?query=${encodeURIComponent(
                e.currentTarget.searchInput.value
            )}`
        );
        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            console.log(response.toString());
        }
        const data = await response.json();
        console.log(data);
        staticData.results = data.value;
    } catch (error) {
        // output to console log
        console.log(error.toString());
    }
});
