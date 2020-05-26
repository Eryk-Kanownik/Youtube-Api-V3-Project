const form = document.querySelector("form");
const grid = document.querySelector(".grid");

const apiKey = "key=AIzaSyCGkOgIs7oq0gE0utgcb-chCRsyUvUjAoc";
const baseUrl = "https://www.googleapis.com/youtube/v3";
const partSnippet = 'part=snippet'

const convertDataToQuery = ({q,maxResults,order}) => {
    return `maxResults=${maxResults}&q=${q}&order=${order}`
}

const doQuery= async (queryStr) => {
    let res = await axios.get(queryStr);
    return res.data;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let convertedQs = convertDataToQuery(getData());
    let fullUrl = `${baseUrl}/search?${convertedQs}&${apiKey}&${partSnippet}`
    let queryData = await doQuery(fullUrl);
    grid.innerHTML = ""
    queryData.items.map(elem => containerCreator(elem))
    
})

const getData = () => {
    return{
        q:document.querySelector("#searchField").value ? document.querySelector("#searchField").value : "",
        maxResults:document.querySelector("#quantity").value ? document.querySelector("#quantity").value : "10",
        order:document.querySelector("#order").value,
    }
}

const containerCreator = (data) => {
    let videoCard = document.createElement("div");
    videoCard.className = "video-card"
    videoCard.addEventListener('click',() => {
        console.log("hello")
        isModalActive = true;
        createModal(data.id.videoId,data.snippet.title,data.snippet.channelId,data.snippet.channelTitle)
    })
    let container = 
    `
        <div class='thumbnail'>
            <img src="${data.snippet.thumbnails.medium.url}">
        </div>
        <div class="info">
            <div class="title"><a href="https://www.youtube.com/watch?v=${data.id.videoId}" target="blank">${data.snippet.title}</a></div>
            <div class="channelName"><a href="https://www.youtube.com/channel/${data.snippet.channelId}" target="blank">${data.snippet.channelTitle}</a></div>
        </div>
    `
    videoCard.innerHTML = container;
    console.log(videoCard)
    grid.appendChild(videoCard);
}

const createModal = (vidId,vidTitle,channelId,channelTitle) => {
    let modalElement = document.createElement("div");
    modalElement.className = "modal";
    modalElement.style.display = "flex"

    modalElement.addEventListener("click", (e) => {
        if(e.target === modalElement){
            modalElement.style.display = "none"
        }
    })
    let modal = `
        <div class="window">
            <object data="http://www.youtube.com/embed/${vidId}"></object>
            <div class="info">
                
                <div>
                    <p><a href="https://www.youtube.com/channel/${channelId}" target="blank">${channelTitle}</a></p>
                    <p><a href="https://www.youtube.com/watch?v=${vidId}" target="blank">${vidTitle}</a></p>
                    <p class="inf">Remember to pause video before you click outside</p>
                    <p class="inf">If video is unavalible it means that video has copyrights</p>
                </div>
            </div>
        </div>
    `
    modalElement.innerHTML = modal
    document.body.appendChild(modalElement);
}