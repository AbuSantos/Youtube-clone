// fetching the youtube data from youtube's api
 
fetch(video_http + new URLSearchParams({
    key:API_KEY,
    part:'snippet',
    chart:"mostPopular",
    maxResults:50,
    regionCode:'NG'
}))
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.items.forEach(item=> {
        getChannelIcon(item);
        console.log(item);
    });
})

//getting the channelicon because youtube stores the channel data in a difff api
const getChannelIcon=(video_data)=>{
    fetch(channel_http + new URLSearchParams({
        key:API_KEY,
        part:'snippet',
        id:video_data.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=>{
        console.log(video_data);
        video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
        console.log(video_data.channelThumbnail);
        displayVideo(video_data);
        console.log(data);
    })   
}

//displaying the youtube data  to the UI

const displayVideo=(data)=>{
    const videoContaineer=document.querySelector('.video_wrapper');


    videoContaineer.innerHTML+=`
     <div class="video_container" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
                    <div class="thumbnail">
                        <img src="${data.snippet.thumbnails.high.url}" alt=""/>
                        <span class="timeline">10:23</span>
                   </div>

                    <div class="description">
                     <img src="${data.channelThumbnail}" alt=""/>  
                        <div class="des_content">
                            <h4 class="video_info">${data.snippet.title}</h4>
                                <p class="video_owner">
                                    ${data.snippet.channelTitle}
                                    <span class="verify"></span>
                                </p>
                                <p class="views">
                                    20M views .
                                    <span class="upload_date">10 months ago</span>
                                </p>
                        </div> 
                     </div>
                </div> 

    `
    
}

const searchInput= document.querySelector('#search');
const searchBtn=document.querySelector('#search_btn');

let searchLink="https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click',()=>{
    if(searchInput.value.length){
        console.log(searchInput.value);

        location.href=searchLink+searchInput.value;
    }
});