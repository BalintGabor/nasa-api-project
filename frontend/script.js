const loadEvent = async function() {

    // Selectors
    const mediaContainerElement = document.getElementById("media-container");
    const articleTitleElement = document.getElementById("article-title");
    const articleExplanationElement = document.getElementById("article-explanation");

    // Fetch the today's data
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    const responseJson = await response.json();

    // Define the media content: image or video
    function imgOrIframe() {
        if (responseJson.media_type === "video") {
            return `<iframe id="media-file" src="${responseJson.url}">`;
        }
        return `<img id="media-file" src="${responseJson.hdurl}">`;
    }
    
    // Insert the media content, title and explanation
    mediaContainerElement.insertAdjacentHTML("beforeend", imgOrIframe());
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
        const mediaFileElement = document.getElementById("media-file");
        const articleContainerElement = document.getElementById("article-container");
        
        // New fetch
        let changedResponse = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + `${input}`);
        let changedResponseJson = await changedResponse.json();
        
        // Remove the old data
        mediaFileElement.remove();
        articleContainerElement.innerHTML = "";
        
        // Define the new media content: image or video
        function changedImgOrIframe() {
            if (changedResponseJson.media_type === "video") {
                return `<iframe id="media-file" src="${changedResponseJson.url}">`
            }
            return `<img id="media-file" src="${changedResponseJson.hdurl}">`;
        }

        // Get the new title and explanation
        let changedTitleAndExplanationElement = `
            <h2 id="article-title">${changedResponseJson.title}</h2>
            <p id="article-explanation">${changedResponseJson.explanation}</p>
        `;

        // Insert the new media content, title and explanation
        mediaContainerElement.insertAdjacentHTML("beforeend", changedImgOrIframe());
        articleContainerElement.insertAdjacentHTML("afterbegin", changedTitleAndExplanationElement);
    }
}

window.addEventListener("load", loadEvent);