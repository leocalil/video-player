const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeBtn = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBrn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

// Play & Pause ----------------------------------- //
function showPlayIncon(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.title = "Play";
}

function tooglePlay(){
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.title = "Pause";
    }else{
        video.pause();
        showPlayIncon();
    }
}

// On Video End, show play button icon
video.addEventListener('ended', showPlayIncon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time){
    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress(){
    //console.log('currentTime', video.currentTime, 'duration', video.duration);
    let percentProgress = video.currentTime / video.duration*100;
    progressBar.style.width = `${percentProgress}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = displayTime(video.duration);
}

// Click to seek within the video
function setProgress(event){
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime*100}%`;
    video.currentTime = newTime*video.duration;
    console.log(newTime);
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
function changeVolume(e){
    let percentVolume = e.offsetX / volumeRange.offsetWidth;
    // ROunding volume up or down
    if (percentVolume < 0.1) {
        percentVolume = 0;
    }
    if (percentVolume > 0.9) {
        percentVolume = 1;
    }
    video.volume = percentVolume; // set volume
    volumeBar.style.width = `${percentVolume*100}%`;

    // Change volume icon depending on volume
    volumeBtn.className = '';
    if(percentVolume > 0.7){
        volumeBtn.classList.add('fas', 'fa-volume-up');
    }else if(percentVolume <= 0.7 && percentVolume >0){
        volumeBtn.classList.add('fas', 'fa-volume-down');
    }else if (percentVolume===0){
        volumeBtn.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = percentVolume;
}

// Mute / Unmute
function toogleMute(){

    volumeBtn.className = '';

    if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeBtn.classList.add('fas', 'fa-volume-mute');
        volumeBtn.setAttribute('title','Unmute');
    }else{
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume*100}%`;
        volumeBtn.classList.add('fas', 'fa-volume-up');
        volumeBtn.setAttribute('title','Mute');
    }
}

// Change Playback Speed -------------------- //

function changeSpeed(){
    console.log('video playback rate', video.playbackRate);
    console.log('selected value', speed.value);   
}

// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click',tooglePlay);
video.addEventListener('click',tooglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeBtn.addEventListener('click', toogleMute);
speed.addEventListener('change',changeSpeed);