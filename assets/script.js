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
        .then((res) => {
            let data = res.json();
            staticData.results = data.value;
        })
        .catch((err) => {
            console.log(err.toString());
        });
});
