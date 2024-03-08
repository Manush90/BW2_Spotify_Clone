

// const url = "https://deezerdevs-deezer.p.rapidapi.com/album/"; const id = "248216622";

// // const url = window.location.pathname;
// // const id= url.split(`/`).pop()

function getAlbumIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const albumId = getAlbumIdFromUrl();
const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${url}`, {
    headers: {
      'X-RapidAPI-Key': '0974397af4msha0b6e043e50ee9ep12a0fbjsneab4f4422724',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	
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
        <p class="artist_Name" onclick="getToArtist('${albumData.artist.id}')">${artist.name} • ${year} • ${albumData.nb_tracks} brani, ${formattedDuration} </p>
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
      <div class="row"> 
        <div class="col-1">
          <p class="textColorSongs">${index + 1}</p>
        </div>
        <div class="col-5">
          <p class="small textColorSongs">${track.title}</p>
        </div>
        <div class="col-4">
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
































































































