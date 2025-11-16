const playButton = document.getElementById("playButton");
const video = document.querySelector("video");
let videoDiv = document.querySelector(".video");
video.loop = false;
const prevPlaylistItems = document.getElementsByClassName("prev-playlist-item");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const shuffle = document.querySelector(".keys > img:nth-child(1)");
const repeat = document.querySelector(".keys > img:nth-child(5)");
// const play = document.querySelector(".keys > img:nth-child(3)");
let circle = document.querySelector(".progress-container > div:nth-child(2)");
let mid = document.querySelector(".mid");
let playImg = document.getElementById("music-img");
let musicName = document.getElementById("music-name");
let vidStat = document.querySelector(".extra-options > img:nth-child(1)");
let volumeBar = document.querySelector(".volume-bar");
let volumeProgress = document.querySelector(".volume-progress");
let volumeCircle = document.querySelector(".volume-thumb");
let side = document.querySelector(".side-button");
let left = document.querySelector(".left");
let cross = document.querySelector(".cross");


currColor = `255, 0, 115`;
shadeColor = `255, 0, 115`;
isDragging = false;
isDraggingVolume = false;
currSong = "";
shadeOpacity = 0;

const state = {
  set song(value) {
    currSong = value;

    if (!currSong) {
      // fade out before hiding
      videoDiv.classList.remove("show");
      setTimeout(() => {
        videoDiv.style.visibility = "hidden";
        vidStat.style.filter = "none";
        video.pause();
      }, 400); // matches CSS transition
    } else {
      // fade in and play
      videoDiv.style.visibility = "visible"; 
      video.src = `https://ntshyhpmyuxbfmszoufa.supabase.co/storage/v1/object/public/Videos/${value}.mp4`;
      videoDiv.classList.add("show");
      vidStat.style.filter = "invert(50%) sepia(100%) saturate(6000%) hue-rotate(95deg) brightness(110%) contrast(90%)";
      video.play();
    }
  }
};

function randomColor() {
  const g = Math.random() * 205 + 50;
  const b = Math.random() * 205 + 50;
  const r = Math.random() * 205 + 50;
  return `${r}, ${g}, ${b}`;
}

function addPlayList() {
  const playlists = document.querySelector(".playlists");
  const playlist_item = document.createElement("div");
  playlist_item.className = "playlist-item vend-sans-new";
  playlist_item.innerHTML = `<img src="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp" alt="" width="50px" height="50px">
                        <span>Liked Songs</span>
                        <span>Playlist &bull; Mohit Jitlal Thakre</span>
                        <img src="play-triangle.svg" alt="">`;
  playlists.append(playlist_item);
}

function addPrevPlayList() {
  const playlists = document.querySelector(".prev-playlists");
  const playlist_item = document.createElement("div");
  playlist_item.className =
    "prev-playlist-item vend-sans-new flex items-center gap-10 border-radius-5";
  playlist_item.innerHTML = `<img src="sahiba.jpg"  alt="playlist image">
                        <span>Arjit Singh</span>
                        <img src="play-green.svg" alt="" height="69%">`;
  playlists.append(playlist_item);
}

function addPlayListDetail(sname, simage) {
  const playlists = document.querySelector(".playlists");
  const playlist_item = document.createElement("div");
  playlist_item.className = "playlist-item vend-sans-new";
  playlist_item.innerHTML = `<img src="${simage}" alt="" width="50px" height="50px">
                        <span>${sname}</span>
                        <span>Playlist &bull; Mohit Jitlal Thakre</span>
                        <img src="play-triangle.svg" alt="">`;
  playlists.append(playlist_item);
  playlist_item.onclick = () => {
    state.song = (simage).replace(".jpeg", "");
    playImg.src = simage;
    musicName.innerHTML = sname;
    updateBackgroundGradient();
  }
}

function addPrevPlayListDetail(sname, simage) {
  const playlists = document.querySelector(".prev-playlists");
  const playlist_item = document.createElement("div");
  playlist_item.className =
    "prev-playlist-item vend-sans-new flex items-center gap-10 border-radius-5";
  playlist_item.innerHTML = `<img src="sahiba.jpg"  alt="playlist image">
                        <span>Arjit Singh</span>
                        <img src="play-green.svg" alt="" height="69%">`;
  playlists.append(playlist_item);
}

function toggleGreen(element) {
  let style = window.getComputedStyle(element);

  if (style.filter === "none" || style.filter === "") {
    element.style.filter = "invert(50%) sepia(100%) saturate(6000%) hue-rotate(95deg) brightness(110%) contrast(90%)";
  } else {
    element.style.filter = "none";
  }
}

function updateProgress(e) {
     const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const duration = video.duration;

    video.currentTime = (clickX / rect.width) * duration;
    let len = (video.currentTime / video.duration) * 100;
    progress.style.width = `${len}%`;
    circle.style.left = `${len-1}%`;

}

function updateProgressVolume(e) {
     const rect = volumeBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    // const duration = video.duration;

    let len = (clickX / rect.width) * 100;
    video.volume = (clickX / rect.width);
    volumeProgress.style.width = `${len-1}%`;
    volumeCircle.style.left = `calc(${len}% - 5px)`;

}

function updateBackgroundGradient() {
    const color = randomColor();
  currColor = color;
  const gradient = document.querySelector(".main-content");
  gradient.style.transition = "background-color 0.5s ease-in-out";
  const player = document.querySelector(".player-cover");
  player.style.transition = "background-color 0.5s ease-in-out";
  const grad = document.querySelector(".mid-cover");
  grad.style.transition = "background-color 0.5s ease-in-out";

  gradient.style.backgroundColor = `rgba(${color}, 1)`;
  
  player.style.backgroundColor = `rgba(${color}, 1)`;
  
  grad.style.backgroundColor = `rgba(${currColor}, 1)`;
  shadeColor = color;
  const topbar = document.querySelector(".background-mid-pane");
  topbar.style.transition = "background-color 0.5s ease-in-out";
  topbar.style.backgroundColor = `rgba(${shadeColor}, 1)`;
}


function updateBackgroundGradientSmooth() {
    const color = randomColor();
  currColor = color;
  const gradient = document.querySelector(".main-content");
  gradient.style.transition = "background-color 2s ease-in-out";
  const player = document.querySelector(".player-cover");
  player.style.transition = "background-color 2s ease-in-out";
  const grad = document.querySelector(".mid-cover");
  grad.style.transition = "background-color 2s ease-in-out";

  gradient.style.backgroundColor = `rgba(${color}, 1)`;
  player.style.backgroundColor = `rgba(${color}, 1)`;
  shadeColor = color;
  
  grad.style.backgroundColor = `rgba(${currColor}, 1)`;
  const topbar = document.querySelector(".background-mid-pane");
  topbar.style.transition = "background-color 2s ease-in-out";
  topbar.style.backgroundColor = `rgba(${shadeColor}, 1)`;
  

}

function makeCardRow(titleText, albums) {
    // Create title
    let title = document.createElement("div");
    title.classList.add("title", "quicksand-extralight");
    title.textContent = titleText;

    // Create card holder
    let cardHolder = document.createElement("div");
    cardHolder.classList.add("card-holder", "flex", "items-center");

    // Loop through all albums
    albums.forEach(album => {
        // Create album card
        let albumCard = document.createElement("div");
        albumCard.classList.add("album-card", "vend-sans-new");

        // Create album cover
        let albumCover = document.createElement("div");
        albumCover.classList.add("album-cover");

        // Add image
        let img = document.createElement("img");
        img.src = album.image;
        img.alt = album.title;

        // Create play button
        let playButton = document.createElement("div");
        playButton.classList.add("play-button");
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="12" fill="#1db954"></circle>
                <path d="M9 8l7 4-7 4V8z" fill="#000"></path>
            </svg>
        `;

        // Append image and play button to cover
        albumCover.appendChild(img);
        albumCover.appendChild(playButton);

        // Album info
        let albumInfo = document.createElement("div");
        albumInfo.classList.add("album-info");
        albumInfo.innerHTML = `
            <h4>${album.title}</h4>
            <p>${album.artist}</p>
        `;

        // Assemble the card
        albumCard.appendChild(albumCover);
        albumCard.appendChild(albumInfo);
        cardHolder.appendChild(albumCard);
        albumCard.onclick = () => {
          state.song = (album.image).replace(".jpeg", "");
          playImg.src = album.image;
          musicName.innerHTML = album.title;
          updateBackgroundGradient();
        }
    });

    // Add to container
    let prevPlaylist = document.querySelector(".prev-playlists");
    prevPlaylist.after(cardHolder);
    prevPlaylist.after(title);
    
}




for (let i = 0; i <= 2; i++) {
  addPlayList();
}

addPlayListDetail("Girl I Need You", "baaghi.jpeg");
addPlayListDetail("Sultana", "sultana.jpeg");

for (let i = 0; i <= 6; i++) {
  addPlayList();
}

for (let i = 0; i <= 6; i++) {
  addPrevPlayList();
}

for(let i=0; i < 5; i++) {
  makeCardRow("Made for You", [
    { image: "Galliyaan.jpeg", title: "Galliyaan", artist: "Mithoon, Ankit Tiwari" },
    { image: "murder.jpeg", title: "Murder 3", artist: "Pritam" },
    { image: "aashiqui.jpeg", title: "Aashiqui 2", artist: "Arijit Singh" },
    { image: "rockstar.jpeg", title: "Rockstar", artist: "A.R. Rahman" },
    { image: "tamasha.jpeg", title: "Tamasha", artist: "Mohit Chauhan" }
]);

  
} 



playButton.addEventListener("click", () => {

//   if(video.currentTime == video.duration) {

//   }
  if (video.paused) {
    video.play();
    playButton.src = "pause.svg";
    
  } else {
    video.pause();
    playButton.src = "circle-play-solid-full.svg";
  }

  updateBackgroundGradient();
  
});


video.addEventListener("timeupdate", () => {
    if(video.currentTime == video.duration) playButton.src = "circle-play-solid-full.svg"; 
    let bar = document.querySelector(".bar");
    let circle = document.querySelector(".progress-container > div:nth-child(2)");
    let comTime = bar.firstElementChild;
    let remTime = bar.lastElementChild;
    
    let len = (video.currentTime / video.duration) * 100;
    progress.style.width = `${len}%`;
    let time = parseInt(video.currentTime);
    if (time % 60 < 10) comTime.innerText = `${parseInt(time / 60)}:0${time % 60}`;
    else comTime.innerText = `${parseInt(time / 60)}:${time % 60}`;
    let rtime = parseInt(video.duration - video.currentTime);
    if (!isNaN(rtime)) {
        if (rtime % 60 < 10) remTime.innerText = `${parseInt(rtime / 60)}:0${rtime % 60}`;
        else remTime.innerText = `${parseInt(rtime / 60)}:${rtime % 60}`;
    }
    

    circle.style.left = `${len-1}%`;

});


video.addEventListener("loadedmetadata", () => {
    if(video.currentTime == video.duration) playButton.src = "circle-play-solid-full.svg"; 
    if(video.paused) playButton.src = "circle-play-solid-full.svg"; 
    else playButton.src = "pause.svg"; 
    let bar = document.querySelector(".bar");
    let circle = document.querySelector(".progress-container > div:nth-child(2)");
    let comTime = bar.firstElementChild;
    let remTime = bar.lastElementChild;
    
    let len = (video.currentTime / video.duration) * 100;
    progress.style.width = `${len}%`;
    let time = parseInt(video.currentTime);
    if (time % 60 < 10) comTime.innerText = `${parseInt(time / 60)}:0${time % 60}`;
    else comTime.innerText = `${parseInt(time / 60)}:${time % 60}`;
    let rtime = parseInt(video.duration - video.currentTime);
    if (rtime % 60 < 10) remTime.innerText = `${parseInt(rtime / 60)}:0${rtime % 60}`;
    else remTime.innerText = `${parseInt(rtime / 60)}:${rtime % 60}`;

    circle.style.left = `${len-1}%`;

});

progressContainer.addEventListener("click", (e) => {
  if(!isDragging)updateProgress(e);
  
});


// progressContainer.addEventListener("dblclick", (e) => {
//     isDragging = true;
//     updateProgress(e);
// })

progressContainer.addEventListener("mousedown", (e) => {
    circle.style.visibility = "visible";
    progress.style.backgroundColor = "lime";
    isDragging = true;
    circle.style.backgroundColor = "lime";
    e.preventDefault();
    updateProgress(e);
    
})

volumeBar.addEventListener("mousedown", (e) => {
    volumeCircle.style.visibility = "visible";
    volumeProgress.style.backgroundColor = "lime";
    isDraggingVolume = true;
    volumeCircle.style.backgroundColor = "lime";
    e.preventDefault();
    updateProgressVolume(e);
    
})

window.addEventListener("mousemove", (e) => {
    if(isDragging) updateProgress(e);
    else if(isDraggingVolume) updateProgressVolume(e);
    
})

window.addEventListener("mouseup", (e) => {
    if(isDragging) {
      circle.style.visibility = "hidden";
      circle.style.backgroundColor = "white";
      progress.style.backgroundColor = "white";
      isDragging = false;
    }
    else if(isDraggingVolume) {
      volumeCircle.style.visibility = "hidden";
      volumeCircle.style.backgroundColor = "white";
      volumeProgress.style.backgroundColor = "white";
      isDraggingVolume = false;
    }
    
    
})



mid.addEventListener("scroll", () => {
  const topbar = document.querySelector(".background-mid-pane");
  let maxLen = 100;
  if(mid.scrollTop > maxLen) {
    topbar.style.backgroundColor = `rgba(${shadeColor}, 1)`;
    topbar.style.opacity = 1;
    return;
  }
  else {
    let opacity = mid.scrollTop / maxLen;
    topbar.style.backgroundColor = `rgba(${shadeColor}, 1)`;
    topbar.style.opacity = opacity;
  }
});



progressContainer.addEventListener("mouseover", () => {
    if(!isDragging) {
        circle.style.visibility = "visible";
    progress.style.backgroundColor = "lime";
    }
    
})

progressContainer.addEventListener("mouseout", () => {
    if(!isDragging) {
        circle.style.visibility = "hidden";
    progress.style.backgroundColor = "white";
    }
    
})

volumeBar.addEventListener("mouseover", () => {
    if(!isDraggingVolume) {
      volumeCircle.style.visibility = "visible";
      volumeProgress.style.backgroundColor = "lime";  
    } 
})

volumeBar.addEventListener("mouseout", () => {
    if(!isDraggingVolume) {
      volumeCircle.style.visibility = "hidden";
      volumeProgress.style.backgroundColor = "white";
    }
    
})

setInterval(() => {
  if(video.paused) return;
  updateBackgroundGradientSmooth()
},5000);


video.onclick = () => {
    if(video.paused) {
        video.play();
        playButton.src = "pause.svg";
    }
    else {
        video.pause();
        playButton.src = "circle-play-solid-full.svg";
    }
}



for (let element of prevPlaylistItems) {
  element.addEventListener("pointerenter", () => {
    const color = randomColor();
    element.style.backgroundColor = `rgba(${color}, 0.2)`;
    const gradient = document.querySelector(".mid-cover");
    gradient.style.backgroundColor = `rgba(${color}, 1)`;
    shadeColor = color;
    element.lastElementChild.style.opacity = "1";
    const topbar = document.querySelector(".background-mid-pane");
    topbar.style.backgroundColor = `rgba(${shadeColor}, 1)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.backgroundColor = "rgba(117, 117, 117, 0.338)";
    element.lastElementChild.style.opacity = "0";
    const gradient = document.querySelector(".mid-cover");
    gradient.style.backgroundColor = `rgba(${currColor}, 1)`;
    shadeColor = currColor;   
    const topbar = document.querySelector(".background-mid-pane");
    topbar.style.backgroundColor = `rgba(${shadeColor}, 1)`;
  });
}

shuffle.onclick = () => toggleGreen(shuffle);
repeat.onclick = () => {
  if (video.loop == true) video.loop = false;
  else video.loop = true;
  toggleGreen(repeat);
}




const close = document.querySelector(".video > img");

close.onclick = () => {
  // Trigger fade-out transition
  videoDiv.classList.remove("show");
  vidStat.style.filter = "none";
  // Wait for transition to finish before fully hiding it
  setTimeout(() => {
    videoDiv.style.visibility = "hidden";
    // video.pause(); // optional: stop the video too
  }, 400); // same duration as your CSS transition
};




vidStat.onclick = () => {
  if(currSong == "") return;
  videoDiv.style.visibility = "visible"; 
      videoDiv.classList.add("show");
  vidStat.style.filter = "invert(50%) sepia(100%) saturate(6000%) hue-rotate(95deg) brightness(110%) contrast(90%)";


}

side.onclick = () => {
  if (left.style.left == "10px") left.style.left = "-400px";
  else left.style.left = "10px";
}


cross.onclick = () => {
  if (left.style.left == "-400px") left.style.left = "10px";
  else left.style.left = "-400px";
}