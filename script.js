const form = document.querySelector("form");

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
})

const getData = () => {
    return{
        q:document.querySelector("#searchField").value ? document.querySelector("#searchField").value : "",
        maxResults:document.querySelector("#quantity").value ? document.querySelector("#quantity").value : "5",
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
