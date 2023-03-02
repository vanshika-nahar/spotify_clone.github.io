// Initalize the Variables 
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Bad Habits - Ed Shereen" , filePath: 'songs/1.mp3' , coverPath:"covers/1.png"},
    {songName:"Shape of you - Ed Shereen" , filePath: 'songs/2.mp3' , coverPath:"covers/2.png"},
    {songName:"Perfect - Ed Shereen" , filePath: 'songs/3.mp3' , coverPath:"covers/3.png"},
    {songName:"Shivers - Ed Shereen" , filePath: 'songs/4.mp3' , coverPath:"covers/4.png"},
    {songName:"Photograph - Ed Shereen" , filePath: 'songs/5.mp3' , coverPath:"covers/5.png"},
    {songName:"Tides - Ed Shereen" , filePath: 'songs/6.mp3' , coverPath:"covers/6.png"},
    {songName:"Galway girl - Ed Shereen" , filePath: 'songs/7.mp3' , coverPath:"covers/7.png"},
    {songName:"I don't care - Ed Shereen" , filePath: 'songs/8.mp3' , coverPath:"covers/8.png"}
]

songItems.forEach(( element, i ) => {
    console.log( element, i )
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Handle Play/Pause click 
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity= 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

// Listen To Events
audioElement.addEventListener('timeupdate', () => {
    console.log("timeupdate");
    // Update SeekBar 
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPLays = () => {
    Array.from(document.getElementsByClassName('songItemsPLay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');

        element.classList.add('fa-circle-play');
        
    })
}
Array.from(document.getElementsByClassName('songItemsPLay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPLays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add("fa-circle-pause");
    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0 ;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add("fa-circle-pause");
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0 ;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add("fa-circle-pause");
})