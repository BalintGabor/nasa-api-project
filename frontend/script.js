const loadEvent = async function() {

    // Selectors
    const mediaContainerElement = document.getElementById("media-container");
    const articleTitleElement = document.getElementById("article-title");
    const articleExplanationElement = document.getElementById("article-explanation");

    // Fetch the today's data
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    const responseJson = await response.json();

    // Define the media content: image or video
    const mediaContent = imgOrIframe();
    function imgOrIframe() {
        if (responseJson.media_type === "video") {
            return `<iframe src="${responseJson.url}">`;
        }
        return `<img src="${responseJson.hdurl}">`;
    }

    // Insert the media content, title and explanation
    mediaContainerElement.insertAdjacentHTML("beforeend", mediaContent);
    articleTitleElement.insertAdjacentHTML("beforeend", responseJson.title);
    articleExplanationElement.insertAdjacentHTML("beforeend", responseJson.explanation);

    // Button eventlistener
    const button = document.getElementById("search-button");
    button.addEventListener("click", clickSearch);
    async function clickSearch() {
        let input = document.getElementById("chosen-date").value;
        if (input) {
            newFetch(input);
        }
    }

    // New fetch for the chosen date's data
    async function newFetch(input) {

        // Selectors
        const mainContainerElement = document.getElementById("main-container");
        const articleContainerElement = document.getElementById("article-container");

        // New fetch
        let changedResponse = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + `${input}`);
        let changedResponseJson = await changedResponse.json();

        // Remove the old data
        mediaContainerElement.remove();
        articleTitleElement.remove();
        articleExplanationElement.remove();

        // Define the new media content: image or video
        const changedMediaContent = changedImgOrIframe ();
        function changedImgOrIframe() {
            if (changedResponseJson.media_type === "video") {
                return `
                <div id="media-container">
                    <iframe src="${changedResponseJson.url}">
                </div>`;
            }
            return `
            <div id="media-container">
                <img src="${changedResponseJson.hdurl}">
            </div>
            `;
        }

        // Get the new title and explanation
        let changedTitleAndExplanationElement = `
            <h2>${changedResponseJson.title}</h2>
            <p>${changedResponseJson.explanation}</p>
        `;

        // Insert the new media content, title and explanation
        mainContainerElement.insertAdjacentHTML("afterbegin", changedMediaContent);
        articleContainerElement.insertAdjacentHTML("afterbegin", changedTitleAndExplanationElement);
    }
}

window.addEventListener("load", loadEvent);