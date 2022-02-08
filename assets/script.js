// @ts-nocheck
function search(str) {
    let results;
    fetch(`/.netlify/functions/search?query=${str}`)
        .then((data) => data.json())
        .then(({ res }) => (results = res))
        .catch((err) => {
            console.error(err);
        });
    return results;
}

const staticData = {
    results: [],
};

document.querySelector(".search-box")?.addEventListener("submit", (e) => {
    e.preventDefault();
    staticData.results = search(
        encodeURIComponent(e.currentTarget.searchInput.value)
    );
});
