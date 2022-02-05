// @ts-nocheck
document.querySelector(".search-box")?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href =
        "https://www.ecosia.org/search?q=" +
        encodeURIComponent(e.currentTarget.searchInput.value);
});

// Check that service workers are supported
if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
            function (registration) {
                console.log(
                    "service worker registration succeeded:",
                    registration
                );
            },
            function (error) {
                console.log("service worker registration failed:", error);
            }
        );
    });
} else {
    console.log("service workers are not supported.");
}
