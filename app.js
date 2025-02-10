const music_action=document.querySelector(".play_pause_btn")
const play_btn=document.querySelector(".play_btn")
const pause_btn=document.querySelector(".pause_btn")
const timeUPD=document.querySelector(".other_controls")

//getElementBYTagName() will return htmlelement in array form so 
//directly accessiing them will cause an error so if their is 
//only one element to access then use the indexing property of arrar
//like array[0] to get the first element
const songList=document.querySelector(".your_song_list").getElementsByTagName("ul")[0]
//Global variable declearation section
let songs;
let audio;
let currentSongIndex;
play_btn.style.display = "flex"; // Initially show the play button
pause_btn.style.display = "none";
//Function to load the song list from the specified album folder (f).
async function songlst(f){
    let a= await fetch(`http://127.0.0.1:5500/music/${f}`)
    let response=await a.text();
    let div=document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    songs=[]
    currentSongIndex=0
    songList.innerHTML='';// Clear the song list before adding new songs.
    if(play_btn.style.display==="none")// If a song was playing from a previous album, pause it and reset buttons.
    {
        audio.pause()
        play_btn.style.display="flex"
        pause_btn.style.display="none"
    }
    // Filter out the links ending with .mp3 to get the songs in the album.
    for(let i=0;i<as.length;i++){
        if(as[i].href.endsWith(".mp3")){
            songs.push(as[i].href)
        }
    }
    audio = new Audio(songs[0])// Initialize the audio player with the first song.
    // Add each song to the UI with song details (name and artist).
    for(let i=0;i<songs.length;i++){
        let songs_name1=(songs[i].split(`/${f}/`)[1].replaceAll("%20"," "))
        let songItem = `
                <li>
                    <div class="song_icon">
                        <img class="song_icon" src="music_icon.svg" alt="">
                    </div>
                    <div class="brief_abt_song">
                        <div class="song_name">${songs_name1.split("-")[0]}</div>
                        <div class="artist">${songs_name1.split("-")[1].split("(")[0]}</div>
                    </div>
                    <div class="play_pause_btn">
                        <div class="play_btn">
                            <img class="b_btn" src="play_btn.svg" alt="play">
                        </div>
                        <div class="pause_btn" style="display: none;">
                            <img class="b_btn" src="pause_btn.svg" alt="pause">
                        </div>
                    </div>
                </li>`;
            songList.innerHTML += songItem;
    }
    document.querySelector(".current_song_info").innerHTML=audio.src.split(`/${f}/`)[1].replaceAll("%20"," ").split("-")[0]
    // Add event listeners to each song item for playing/pausing.
    let lst=songList.getElementsByTagName("li")
    for(let i=0;i<lst.length;i++){
        let plyBtn=lst[i].querySelector(".play_btn")
        let pusBtn=lst[i].querySelector(".pause_btn")
        lst[i].addEventListener("click",()=>{
            // When a song is clicked, toggle play/pause and update the audio source.
            if(pusBtn.style.display==="none")// Pause any currently playing song before playing the selected song.
            {
                for(let j=0;j<lst.length;j++){
                    let ply_Btn=lst[j].querySelector(".play_btn")
                    let pus_Btn=lst[j].querySelector(".pause_btn")
                    if(j!=i){
                        ply_Btn.style.display="inline"
                        pus_Btn.style.display="none"
                        play_btn.style.display="flex"
                        pause_btn.style.display="none"
                        audio.pause();
                    }
                    
                }
                audio = new Audio(songs[i])
                plyBtn.style.display="none"
                pusBtn.style.display="inline"
            }
            else{
                plyBtn.style.display="inline"
                pusBtn.style.display="none"
            }
            currentSongIndex=i
            playMusic(currentSongIndex);
            
        })
    }
    //view library in media@ for mobile and smaller screen//
    let open=document.querySelector(".open_btn")
    open.addEventListener("click",()=>{
        if(getComputedStyle(document.querySelector(".left_box")).left === "0px"){
            document.querySelector(".left_box").style.left="-300px";
            
        }
        else{
            document.querySelector(".left_box").style.left=0;
        }
        
    })
    document.querySelector(".close_btn").addEventListener("click",()=>{
        document.querySelector(".left_box").style.left="-300px";
    })
}



// creating a function which will load the songs folder passing the folder to songlst(folder)as value
async function folderGet(){
    let a= await fetch("http://127.0.0.1:5500/music")
    let response=await a.text();
    let div=document.createElement("div")
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let folders=[];
    for(let i=0;i<as.length;i++){
        if(as[i].href.includes("music")){
            folders.push(as[i].href.split("music/")[1])
        }
    }
    let fd=document.querySelector(".right_box")
    for(let i=1;i<folders.length;i++){
        let b= await fetch(`music/${folders[i]}/info.json`)
        let response= await b.json()
        let fdinnerText=`<div class="song_folder_card">
                        <div class="cover_folder_img">
                            <img src="music/${folders[i]}/cover.jpg" alt="">
                        </div>
                        <div class="cover_name">
                            ${response.title}
                        </div>
                        <div class="album_play">
                        <img class="b_btn" src="play_btn.svg" alt="play">
                    </div>
                    </div>
                    `;
        fd.innerHTML+=fdinnerText;  
    }
    let sCard=document.querySelectorAll(".song_folder_card");
    songlst(folders[1]);//it starts from 1 insated of 0 because the folders[0]if the empty folder as default
    for(let i=0;i<sCard.length;i++){
        sCard[i].addEventListener("click", () => songlst(folders[i + 1]));

        
    };  
    
    return folders;  
}
folderGet()



//creating a function which convert the currentTime of the current song which is giving us in seconds to minutes:secinds 00:00 format//
function secondsToMinuteSeconds(seconds,duration){
    let minute=Math.floor(seconds/60);
    let second=Math.floor(seconds%60);
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    let mindura=Math.floor(duration/60);
    let secdura=Math.floor(duration%60);
    mindura = mindura < 10 ? `0${mindura}` : mindura;
    secdura = secdura < 10 ? `0${secdura}` : secdura;
    
    timeUPD.innerHTML=`${minute}:${second} / ${mindura}:${secdura}`;
}

function playMusic(i){
    let lst=songList.getElementsByTagName("li")
    let plyBtn=lst[i].querySelector(".play_btn")
    let pusBtn=lst[i].querySelector(".pause_btn")
    if(pause_btn.style.display==="none"){
        audio.play();
        play_btn.style.display="none"
        pause_btn.style.display="flex" 
        plyBtn.style.display="none"
        pusBtn.style.display="inline" 
}
    else{ 
        audio.pause();
        play_btn.style.display="flex"
        pause_btn.style.display="none"
        plyBtn.style.display="inline"
        pusBtn.style.display="none"

    }
    audio.addEventListener('timeupdate', () => {
        secondsToMinuteSeconds(audio.currentTime,audio.duration);
        document.querySelector(".circle").style.left=`${(audio.currentTime/audio.duration)*100}%`;
      });
    document.querySelector(".current_song_info").innerHTML=audio.src.split("/music/")[1].replaceAll("%20"," ").split("-")[0]

    audio.addEventListener('ended',()=>{
        let lst=songList.getElementsByTagName("li")
        if(currentSongIndex<(lst.length-1)){
            let ply_Btn=lst[currentSongIndex].querySelector(".play_btn")
            let pus_Btn=lst[currentSongIndex].querySelector(".pause_btn")
            play_btn.style.display="flex"
            pause_btn.style.display="none"
            ply_Btn.style.display="inline"
            pus_Btn.style.display="none"
        
            audio=new Audio(songs[++currentSongIndex])
            playMusic(currentSongIndex)
        }  
    })
    
   
}
document.querySelector(".moving_bar").addEventListener('click',(e)=>{
    document.querySelector(".circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%";
    audio.currentTime=(audio.duration*(e.offsetX/e.target.getBoundingClientRect().width))
    
})


music_action.addEventListener("click",()=>playMusic(currentSongIndex));
 
document.querySelector(".next_btn").addEventListener("click",()=>{
    if(currentSongIndex<songs.length){
        let lst=songList.getElementsByTagName("li")
        let ply_Btn=lst[currentSongIndex].querySelector(".play_btn")
        let pus_Btn=lst[currentSongIndex].querySelector(".pause_btn")
        if(play_btn.style.display==="none"){
            play_btn.style.display="inline"
            pause_btn.style.display="none"
            ply_Btn.style.display="inline"
            pus_Btn.style.display="none"
            audio.pause();
        }
        currentSongIndex+=1;
        audio = new Audio(songs[currentSongIndex])
        playMusic(currentSongIndex)
    }
})
document.querySelector(".previous_btn").addEventListener("click",()=>{
    if(currentSongIndex>0){
        let lst=songList.getElementsByTagName("li")
        let ply_Btn=lst[currentSongIndex].querySelector(".play_btn")
        let pus_Btn=lst[currentSongIndex].querySelector(".pause_btn")
        if(play_btn.style.display==="none"){
            play_btn.style.display="inline"
            pause_btn.style.display="none"
            ply_Btn.style.display="inline"
            pus_Btn.style.display="none"
            audio.pause();
        }
        audio.pause();
        audio = new Audio(songs[--currentSongIndex])
        playMusic(currentSongIndex)
    }
})
