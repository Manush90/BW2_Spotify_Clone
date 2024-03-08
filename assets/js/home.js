// options object, headers with API key
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8223206026mshc9f22398ae98821p146eb6jsna3d58f053010",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// JUMBOTRON ENDPOINT
const jumbotronEndpoint = "https://deezerdevs-deezer.p.rapidapi.com/album/226762";

// FIRST SECTION CARD
const endpointsFirstSection = [
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/2469",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/1234",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/2345",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/34456",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/1230",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/7891",
];

// BUONASERA SECTION
const endpointsSecondSection = [
  "https://deezerdevs-deezer.p.rapidapi.com/album/8880231",
  "https://deezerdevs-deezer.p.rapidapi.com/album/9276214",
  "https://deezerdevs-deezer.p.rapidapi.com/album/1503218",
  "https://deezerdevs-deezer.p.rapidapi.com/album/125834",
  "https://deezerdevs-deezer.p.rapidapi.com/album/71318",
];

const endpointsThirdSection = [
  "https://deezerdevs-deezer.p.rapidapi.com/album/105824",
  "https://deezerdevs-deezer.p.rapidapi.com/album/81847",
  "https://deezerdevs-deezer.p.rapidapi.com/album/2267671",
  "https://deezerdevs-deezer.p.rapidapi.com/album/90252342",
  "https://deezerdevs-deezer.p.rapidapi.com/album/13619731",
];

// Rimuovi async/await
const getData = (endpoint) => {
  return fetch(endpoint, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null;
    });
};

// Funzione per popolare il jumbotron con i dati dell'album
const populateJumbotron = async () => {
  try {
    const albumData = await getData(jumbotronEndpoint);

    // Seleziona il container del jumbotron
    const jumbotronContainer = document.getElementById("jumbotronContainer");

    // Crea e popola gli elementi HTML all'interno del container
    jumbotronContainer.innerHTML = `
      <div class="row rounded-1">
        <div class="col-3 d-flex flex-column justify-content-around p-3">
          <a href="./album-page.html?id=${albumData.id}">
            <img class="img-fluid" src="${albumData.cover_medium}" alt="Album cover" />
          </a>
        </div>
        <div class="col-9">
          <div class="d-flex flex-row align-items-center justify-content-between my-2">
            <span class="text-uppercase fw-bold fs-7">Album</span>
            <button class="btn text-uppercase fw-bold text-secondary bg-grey-03 rounded-pill fs-7 mt-3 me-2">
              nascondi annunci
            </button>
          </div>
          <h1 class="display-4 fw-bold mt-1 fs-1">${albumData.title}</h1>
          <p class="lead fs-6 fw-bold">${albumData.artist.name} • ${albumData.release_date} • ${albumData.nb_tracks} brani</p>
          <p class="call">Ascolta l'ultimo album di ${albumData.artist.name}</p>
          <p class="lead">
            <a class="btn bg-green rounded-pill fs-6 text-black px-4" href="#" role="button">Play</a>
            <a class="btn btn-outline-light rounded-pill fs-6 px-4 mx-2" href="#" role="button">Salva</a>
            <a class="btn text-secondary p-0 fs-7" href="#" role="button"> • • • </a>
          </p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error populating jumbotron:", error);
  }
};

// Funzione per popolare le card HTML con i dati delle playlist
const populatePlaylistCards = async () => {
  try {
    const playlistData = await Promise.all(endpointsFirstSection.map((endpoint) => getData(endpoint)));

    // Seleziona il container della sezione "Buonasera"
    const buonaseraContainer = document.querySelector(".container-fluid .first-section");

    // Crea e popola gli elementi HTML all'interno del container
    playlistData.forEach((playlist) => {
      // Crea la card
      const card = document.createElement("div");
      card.classList.add("col");

      // Popola il contenuto della card
      card.innerHTML = `
      <div class="col">
        <div class="card mb-3 p-0 border-0 bg-grey-01">
          <a href="#">
            <div class="row g-0 align-items-center">
              <div class="col-2">
                <img src="${playlist.picture_medium}" class="img-fluid rounded-start" alt="Playlist image" />
              </div>
              <div class="col-10">
                <h5 class="card-title fs-6 mx-4 my-0">${playlist.title}</h5>
              </div>
            </div>
          </a>
        </div>
      </div>
      `;

      //
      buonaseraContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error populating playlist cards:", error);
  }
};

const populateSecondSectionCards = async () => {
  try {
    const secondSectionData = await Promise.all(endpointsSecondSection.map((endpoint) => getData(endpoint)));

    // Seleziona il container della sezione "Altro di ciò che ti piace"
    const secondSectionContainer = document.querySelector(".second-section .row-cols-2");

    // Crea e popola gli elementi HTML all'interno del container
    secondSectionData.forEach((album) => {
      // Crea la card
      const card = document.createElement("div");
      card.classList.add("col");

      // Popola il contenuto della card
      card.innerHTML = `
        <div class="card h-100 border-0 p-3 bg-grey-10">
          <a href="./album-page.html?id=${album.id}">
            <img src="${album.cover_medium}" class="card-img-top rounded" alt="${album.title}" />
            <div class="card-body px-1 pt-3 pb-1 d-flex flex-column justify-content-between">
              <h5 class="card-title fs-6">${album.title}</h5>
              <p class="card-text fs-7">${album.artist.name}</p>
            </div>
          </a>
        </div>
      `;

      // Aggiungi la card al container della sezione "Altro di ciò che ti piace"
      secondSectionContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error populating second section cards:", error);
  }
};

// Funzione per popolare le card HTML - BUONASERA SECTION - album
// Funzione per popolare le card HTML della sezione "Ascoltati di recente"
const populateThirdSectionCards = async () => {
  try {
    // Ottieni i dati degli album dalla terza sezione
    const thirdSectionData = await Promise.all(endpointsThirdSection.map((endpoint) => getData(endpoint)));

    // Seleziona il container della sezione "Ascoltati di recente"
    const thirdSectionContainer = document.querySelector(".third-section .row-cols-2");

    // Crea e popola gli elementi HTML all'interno del container
    thirdSectionData.forEach((album) => {
      // Crea la card
      const card = document.createElement("div");
      card.classList.add("col");

      // Popola il contenuto della card
      card.innerHTML = `
        <div class="card h-100 border-0 p-3 bg-grey-10">
          <a href="./album-page.html?id=${album.id}">
            <img src="${album.cover_medium}" class="card-img-top rounded" alt="${album.title}" />
            <div class="card-body px-1 pt-3 pb-1 d-flex flex-column justify-content-between">
              <h5 class="card-title fs-6">${album.title}</h5>
              <p class="card-text fs-7">${album.artist.name}</p>
            </div>
          </a>
        </div>
      `;

      // Aggiungi la card al container della sezione "Ascoltati di recente"
      thirdSectionContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error populating third section cards:", error);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  populateJumbotron();
  populatePlaylistCards();
  populateSecondSectionCards();
  populateThirdSectionCards();
});

const fillHeart = () => {
  const heartIcon = document.getElementById("heart");
  const heartPath = heartIcon.querySelector("path");
  // Controlla se l'icona del cuore è vuota o piena
  if (heartIcon.classList.contains("fill-gray")) {
    // Se è vuota, cambia classe per mostrare l'icona del cuore pieno
    heartIcon.classList.remove("fill-gray");
    heartIcon.classList.add("fill-green");
    // Modifica il percorso per riempire il cuore
    heartPath.setAttribute(
      "d",
      "M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"
    );
  } else {
    // Altrimenti, cambia classe per mostrare l'icona del cuore vuoto
    heartIcon.classList.remove("fill-green");
    heartIcon.classList.add("fill-gray");
    // Ripristina il percorso per il cuore vuoto
    heartPath.setAttribute(
      "d",
      "M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"
    );
  }
};

// PlayerBar

//barra regolabile del volume
function updateVolume() {
  const volumeRange = document.getElementById("volumeRange");
  const volumeFill = document.getElementById("volumeFill");
  const value = volumeRange.value;

  volumeFill.style.width = value + "%";
}

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const mobilePlayButton = document.getElementById("mobilePlayButton");
const mobilePauseButton = document.getElementById("mobilePauseButton");

playButton.addEventListener("click", () => {
  playButton.classList.add("d-none");
  pauseButton.classList.remove("d-none");
});

pauseButton.addEventListener("click", () => {
  pauseButton.classList.add("d-none");
  playButton.classList.remove("d-none");
});

mobilePlayButton.addEventListener("click", () => {
  mobilePlayButton.classList.add("d-none");
  mobilePauseButton.classList.remove("d-none");
});

mobilePauseButton.addEventListener("click", () => {
  mobilePauseButton.classList.add("d-none");
  mobilePlayButton.classList.remove("d-none");
});

const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("fill-gray")) {
    shuffleButton.classList.add("fill-green");
    shuffleButton.classList.remove("fill-gray");
  } else {
    shuffleButton.classList.remove("fill-green");
    shuffleButton.classList.add("fill-gray");
  }
});
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("fill-gray")) {
    repeatButton.classList.add("fill-green");
    repeatButton.classList.remove("fill-gray");
  } else {
    repeatButton.classList.remove("fill-green");
    repeatButton.classList.add("fill-gray");
  }
});

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
