// @ts-nocheck
document.querySelector(".search-box")?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href =
        "https://www.ecosia.org/search?q=" +
        encodeURIComponent(e.currentTarget.searchInput.value);
});
