// @ts-nocheck

const staticData = {
    results: [],
};

document.querySelector(".search-box")?.addEventListener("submit", (e) => {
    e.preventDefault();
    staticData.results = fetch(
        `/.netlify/functions/search?query=${encodeURIComponent(
            e.currentTarget.searchInput.value
        )}`
    )
        .then((data) => data.json())
        .then(({ res }) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
        });
});
