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

const templateStr = 
`<div class='video-card'>
    <div class='thumbnail'>
        <img src="https://picsum.photos/320/180">
    </div>
    <div class="info">
        <div class="title">Title</div>
        <div class="channelName">Channel Name</div>
    </div>
</div>`

const containerCreator = (data) => {
    let container = 
    `<div class='video-card'>
        <div class='thumbnail'>
            <img src="${data.snippet.thumbnails.medium.url}">
        </div>
        <div class="info">
            <div class="title"><a href="https://www.youtube.com/watch?v=${data.id.videoId}" target="blank">${data.snippet.title}</a></div>
            <div class="channelName"><a href="https://www.youtube.com/channel/${data.snippet.channelId}" target="blank">${data.snippet.channelTitle}</a></div>
        </div>
    </div>`
    grid.innerHTML += container;
}
