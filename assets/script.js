/**
 * Script to call API endpoint and store search results
 */

// data to be passed to Alpine components
const staticData = {
    results: [],
};

/**
 * Store or retrieve data from sessionStorage
 *
 * @param {String} mode "get" or "set"
 * @param {String} key name of the data to store or retrieve
 * @param {*} value data to store
 * @returns data stored or retrieved from sessionStorage, else error string
 */
function store(mode, key, value) {
    try {
        if (mode.toLowerCase() === "get") {
            return sessionStorage.getItem(key);
        } else if (mode.toLowerCase() === "set") {
            if (value !== undefined) {
                return sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                throw new Error("No value for key: " + key);
            }
        } else {
            throw new Error("Unknown mode of operation: " + mode);
        }
    } catch (err) {
        return err.toString();
    }
}

/**
 * Call the Web Search API endpoint and store search results
 *
 * @param {Event} event DOM event object
 */
async function callSearchAPI(event) {
    try {
        const query = encodeURIComponent(event.currentTarget.query.value),
            response = await fetch("/.netlify/functions/search?q=" + query);
        if (!response.ok) {
            console.log(response.toString());
        }
        const data = await response.json();
        console.log(store("set", "results", data.value));
        location.assign("../results.html");
    } catch (error) {
        console.log(error.toString());
    }
}

/**
 * Call the Quotes API endpoint and return HTML block to display quote
 *
 * @param {String} frameID ID of the DOM Object to display quote in
 */
async function callQuotesAPI(frameID) {
    try {
        let frame = document.getElementById(frameID);
        if (frame) {
            const response = await fetch("/.netlify/functions/quote");
            if (!response.ok) {
                console.log(response.toString());
            }
            const data = await response.json();
            frame.innerHTML = `<blockquote cite="${data.url}">
                                    ${data.content}
                                </blockquote>
                                <address>
                                    &ndash;&nbsp;&nbsp;${data.originator.name}
                                </address>`;
        }
    } catch (error) {
        console.log(error.toString());
    }
}

// display quote when homepage loads
if (["/", "/index.html"].includes(location.pathname)) {
    callQuotesAPI("qotd");
}

// store search results to variable when results page loads
if (["/results.html"].includes(location.pathname)) {
    staticData.results = store("get", "results");
}
