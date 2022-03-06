let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let img = document.querySelector('.image');
let playpause_btn = document.getElementById('playpause-track');
let next_btn = document.getElementById('next-track');
let prev_btn = document.getElementById('prev-track');
let repeat_btn = document.getElementById('repeat-track');
let progress = document.getElementById('progress');
let progress_div = document.getElementById('progress_div');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let random_btn = document.getElementById('random-track');
let music =document.querySelector('audio');

let track_index = 0;
let isRandom = false;
let isPlaying = false;
const music_list = [
  
    {
        img : 'jubin-nautiyal.jpeg',
        name : 'Dil Galti Kar Baitha',
        artist : 'Jubin Nautiyal',
        music : 'DilGaltiKarBaithaHai.mp3'
    },
    {
        img : 'RaataanLambiyan.jpg',
        name : 'Raataan Lambiyan',
        artist : 'Jubin Nautiyal',
        music : 'Raataan Lambiyan.mp3'
    },
    {
        img : 'BedardiSePyarKa.jpg',
        name : 'Bedardi Se Pyar Ka',
        artist : 'Jubin Nautiyal',
        music : 'Bedardi Se Pyar Ka.mp3'
    },
    {
        img : 'WafaNaRaasAayee.jpg',
        name : 'Wafa Na Raas Aayee',
        artist : 'Jubin Nautiyal',
        music : 'Wafa Na Raas Aayee.mp3'
    },
    {
        img : 'DilLautaDo.jpg',
        name : 'Dil Lauta Do',
        artist : 'Jubin Nautiyal',
        music : 'Dil Lauta Do.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    reset();
    music.src = music_list[track_index].music;
    music.load();
    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

}

random_btn.addEventListener("click",() =>{
    isRandom ? pauseRandom() : playRandom();
});
function playRandom(){
    isRandom = true;
    random_btn.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    random_btn.classList.remove('randomActive');
}


// *play music
const playMusic = ()=>{
    isPlaying = true;
    music.play();
    playpause_btn.classList.replace("fa-play-circle", "fa-pause-circle");
    track_art.classList.add('rotate');
};

// *pause music
const pauseMusic = ()=>{
    isPlaying = false;
    music.pause();
    playpause_btn.classList.replace("fa-pause-circle", "fa-play-circle");
    track_art.classList.remove('rotate');
};


playpause_btn.addEventListener("click",()=>{
    // if(isPlaying){
    //     pauseMusic();
    // }else{
    //     playMusic()
    // }
    isPlaying ? pauseMusic() : playMusic();
});

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";

}
// loadTrack(music_list[1]);

const next_track = () =>{
    //play random
    if(isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }
    //play next
   else if(isRandom === false){
    track_index = (track_index + 1 ) % music_list.length;
}
else{
    track_index =0;
}
    loadTrack(track_index);
    playMusic();
}
const prev_track = () =>{
    track_index = (track_index - 1  + music_list.length) % music_list.length;
    loadTrack(track_index);
    playMusic();

 }
next_btn.addEventListener('click', next_track);
prev_btn.addEventListener('click', prev_track);


//update music current time and duration
music.addEventListener("timeupdate",(event)=>{

    const {currentTime, duration} = event.srcElement;

    let progress_time = (currentTime/duration)*100;
    progress.style.width = `${progress_time}%`;
   
    // duration time update 
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    
    if(sec_duration < 10){
        sec_duration = `0${sec_duration}`;
    }
    if(min_duration < 10){

        min_duration = `0${min_duration}`;
    }
    if(duration){
        total_duration.textContent = `${min_duration}:${sec_duration}`;
    }
    
    // current time update 
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    
    if(sec_currentTime < 10){

        sec_currentTime = `0${sec_currentTime}`;
    }
    if(min_currentTime < 10){

        min_currentTime = `0${min_currentTime}`;
    }
    curr_time.textContent = `${min_currentTime}:${sec_currentTime}`;

});

//automatic play next music  when prev music end.
music.addEventListener('ended',next_track);

//progress onclick functionality

progress_div.addEventListener("click",(event) =>{
   let progressWidth = progress_div.clientWidth;
   let clickedOffsetX = event.offsetX
   const songduration = music.duration; 
   music.currentTime  = (clickedOffsetX/ progressWidth)*songduration;
   playMusic();
});

//repeat music
repeat_btn.addEventListener("click",(event) =>{
    let curent_index = track_index;
    loadTrack(curent_index);
    playMusic();
 });
