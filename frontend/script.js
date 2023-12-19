const loadEvent = async function() {
    // Fetch the today's data
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    const responseJson = await response.json();
    console.log(responseJson)
}

window.addEventListener("load", loadEvent);