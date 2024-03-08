function getAlbumIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const albumId = getAlbumIdFromUrl();
const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${url}`, {
    headers: {
      "X-RapidAPI-Key": "be3da42077mshb39f0419e14de60p17053fjsnfb2d6848dc67",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }

      return response.json();
    })
    .then((albumData) => {
      popolaBanner(albumData);
      popolaCanzoni(albumData);
    })
    .catch((err) => {
      console.error("Errore durante il recupero dei dati:", err);
    });
});

function popolaBanner(albumData) {
  let containerDatiAlbum = document.getElementById("containerDatiAlbum");
  containerDatiAlbum.innerHTML = "";

  let artist = albumData.artist;
  let releaseDate = albumData.release_date;
  let year = releaseDate.split("-")[0];
  let formattedDuration = secondsToMinutes(albumData.duration);

  let newContainerDatiAlbum = `
    <div class="col-12 col-md-3 col-lg-3 text-center">
      <img id="album_Cover" src="${albumData.cover_medium}" class="img-fluid mb-2" style="object-fit: cover"/>
    </div>
    <div id="containerTestoAlbum" class="col-12 col-md-9 col-lg-9">
      <h2 class="text-white small">ALBUM</h2>
      <h1 class="text-white" id="album_Name">${albumData.title}</h1>
      <a class="d-flex text-white align-items-center" id="linkArtista">
        <img src="${artist.picture_small}" class="rounded-circle me-3" onclick="getToArtist('${albumData.artist.id}')"/>
        <p class="artist_Name" onclick="getToArtist('${albumData.artist.id}')"><span id="artistName">${artist.name}</span> • ${year} • ${albumData.nb_tracks} brani, ${formattedDuration} </p>
      </a>
    </div>`;

  containerDatiAlbum.innerHTML = newContainerDatiAlbum;
}

function popolaCanzoni(albumData) {
  let boxSongs = document.getElementById("boxSongs");
  boxSongs.innerHTML = "";

  albumData.tracks.data.forEach((track, index) => {
    let formattedDuration = secondsToMinutes(track.duration);

    let newBoxSongs = `
      <div class="row trackDiv"> 
        
      <div class="col-1">
          <p class="textColorSongs">${index + 1}</p>
        </div>
        <div class="col-1">
        <button class="d-flex bg-green rounded-circle border-0 p-2 hoverPlay" onclick="trackSessionStorage(event)">
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="10px"
          class="fill-black"
        >
          <path
            d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
          ></path>
        </svg>
       </button>
       </div>       
            <div class="col-5 trackTitle">
              <p class="small textColorSongs trackTitle">${track.title}</p>
            </div>
            <div class="col-3">
              <p class="small textColorSongs">${track.rank}</p>
            </div>
            <div class="col-2">
              <p class="timeSong small textColorSongs">${formattedDuration}</p>
            </div>  
      </div>`;

    boxSongs.innerHTML += newBoxSongs;
  });
}

function secondsToMinutes(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const getToArtist = (id) => {
  window.location.assign("./artist.html?Id=" + id);
};

function trackSessionStorage(event) {
  const trackElement = event.target.closest(".trackDiv");
  const trackTitle = trackElement.querySelector(".trackTitle").textContent;
  const artistSong = document.getElementById("artistName").textContent;
  const coverAlbum = document.getElementById("album_Cover").getAttribute("src");

  localStorage.clear();

  localStorage.setItem("selectedtrackTitle", trackTitle);
  localStorage.setItem("selectedartistSong", artistSong);
  localStorage.setItem("selectedcoverAlbum", coverAlbum);

  compilePlayer();
  hideOrSeen();
}

const compilePlayer = () => {
  const coverSong = document.getElementById("coverPlayer");
  const artistSong = document.getElementById("artistPlayer");
  const titleSong = document.getElementById("titlePlayer");

  titleSong.innerText = localStorage.getItem("selectedtrackTitle");
  artistSong.innerText = localStorage.getItem("selectedartistSong");
  coverSong.setAttribute("src", localStorage.getItem("selectedcoverAlbum"));
};

const hideOrSeen = () => {
  const playerBar = document.getElementById("playerBar");
  const artistSong = localStorage.getItem("selectedartistSong");

  if (!artistSong || artistSong.value === "") {
    playerBar.classList.add("d-none");
    playerBar.classList.add("d-lg-block");
  } else {
    playerBar.classList.remove("d-none");
    playerBar.classList.remove("d-lg-block");
  }
};
