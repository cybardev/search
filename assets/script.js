/**
 * State management
 */

// quote states
const quoteData = {
    quote_msg: "",
    quote_url: "",
    quote_author: "",
    showQuote: false,
    quoteFetch() {
        fetch("/.netlify/functions/quote")
            .then((res) => res.json())
            .then((data) => {
                this.quote_url = data.url;
                this.quote_msg = data.content;
                this.quote_author = data.originator.name;
                this.showQuote = true;
            })
            .catch((err) => console.log(err));
    },
};

// search states
const searchData = {
    results: [],
    showResults: false,
    searchFetch() {
        fetch(
            "/.netlify/functions/search?q=" +
            encodeURIComponent(
                document.getElementById("search-field").value
            )
        )
            .then((res) => res.json())
            .then((data) => {
                this.results = data.web.results;
                this.showResults = true;
            })
            .catch((err) => console.log(err));
    },
};
