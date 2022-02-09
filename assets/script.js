// @ts-nocheck

const staticData = {
    results: [],
};

document.querySelector(".search-box")?.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(
        `/.netlify/functions/search?query=${encodeURIComponent(
            e.currentTarget.searchInput.value
        )}`
    )
        .then((data) => data.json())
        .then(({ value }) => {
            staticData.results = value;
        })
        .catch((err) => {
            console.log(err.toString());
        });
});
