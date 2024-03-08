// dichiaro le variabili dell'id artista e delle 5 tracce da inserire nel profilo
const artistId = 102;
const songId = 2534909521;
const songId2 = 764420732;
const songId3 = 13140203;
const songId4 = 702551962;
const songId5 = 648151712;
const artistUrl = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`;
const fanListUrl = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/fans`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "83b2a89b80msh06456fc60e13f74p1de332jsn41e52919f2a3",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// popolo la prima traccia con cover album, nome traccia,durata, e ascolti totali
async function populateFirstSong() {
  try {
    const songResponse = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`,
      options
    );
    const songResult = await songResponse.json();
    console.log(songResult);

    const formattedDuration = formatDuration(songResult.duration);

    document.getElementById("songName").textContent = songResult.title;
    // rank.tolocalString ("it-iT") mi permette di avere la stringa numerica degli ascolti totali in formato migliaia quindi
    // es 2000000 in 2.000.000
    document.getElementById("playNum").textContent = songResult.rank.toLocaleString("it-IT");
    document.getElementById("songTime").textContent = formattedDuration;

    document.getElementById("ac1").src = songResult.album.cover_small;

    const artistResponse = await fetch(artistUrl, options);
    const artistResult = await artistResponse.json();
    console.log(artistResult);

    document.getElementById("artistName").textContent = artistResult.name;

    const fanResponse = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`,
      options
    );
    const fanResult = await fanResponse.json();
    console.log(fanResult);

    document.getElementById("monthlyList").textContent =
      fanResult.nb_fan.toLocaleString("it-IT") + " ascoltatori mensili";
  } catch (error) {
    console.error(error);
  }
}
// popolo la seconda traccia con cover album, nome traccia,durata, e ascolti totali
async function populateSecondSongFields() {
  try {
    const songResponse = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/track/${songId2}`,
      options
    );
    const songResult = await songResponse.json();
    console.log(songResult);

    const formattedDuration = formatDuration(songResult.duration);

    document.getElementById("ac2").src = songResult.album.cover_small;
    document.getElementById("songName2").textContent = songResult.title;
    document.getElementById("playNum2").textContent = songResult.rank.toLocaleString("it-IT");
    document.getElementById("songTime2").textContent = formattedDuration;
  } catch (error) {
    console.error(error);
  }
}
// popolo la terza traccia con cover album, nome traccia,durata, e ascolti totali
async function populateThirdSongFields() {
  try {
    const songResponse = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/track/${songId3}`,
      options
    );
    const songResult = await songResponse.json();
    console.log(songResult);

    const formattedDuration = formatDuration(songResult.duration);

    document.getElementById("ac3").src = songResult.album.cover_small;
    document.getElementById("songName3").textContent = songResult.title;
    document.getElementById("playNum3").textContent = songResult.rank.toLocaleString("it-IT");
    document.getElementById("songTime3").textContent = formattedDuration;
  } catch (error) {
    console.error(error);
  }
}

// popolo la quarta traccia con cover album, nome traccia,durata, e ascolti totali
async function populateFourthSongFields() {
  try {
    const songResponse = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/track/${songId4}`,
      options
    );
    const songResult = await songResponse.json();
    console.log(songResult);
    const formattedDuration = formatDuration(songResult.duration);

    document.getElementById("ac4").src = songResult.album.cover_small;
    document.getElementById("songName4").textContent = songResult.title;
    document.getElementById("playNum4").textContent = songResult.rank.toLocaleString("it-IT");
    document.getElementById("songTime4").textContent = formattedDuration;
  } catch (error) {
    console.error(error);
  }
}

// popolo la quinta traccia con cover album, nome traccia,durata, e ascolti totali
async function populateFifthSongFields() {
  try {
    const songResponse = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/track/${songId5}`,
      options
    );
    const songResult = await songResponse.json();
    console.log(songResult);

    const formattedDuration = formatDuration(songResult.duration);

    document.getElementById("ac5").src = songResult.album.cover_small;
    document.getElementById("songName5").textContent = songResult.title;
    document.getElementById("playNum5").textContent = songResult.rank.toLocaleString("it-IT");
    document.getElementById("songTime5").textContent = formattedDuration;
  } catch (error) {
    console.error(error);
  }
}

// cambio l'immagine dell'artista nell 'area preferiti
async function populateArtistImage() {
  try {
    const artistResponse = await fetch(artistUrl, options);
    const artistResult = await artistResponse.json();
    console.log(artistResult);

    // Popola l'immagine dell'artista
    document.getElementById("artistImg").src = artistResult.picture_small;
  } catch (error) {
    console.error(error);
  }
}

// cambo immagine di background tramite foto artista

async function changeBackgroundImage() {
  try {
    const artistResponse = await fetch(artistUrl, options);
    const artistResult = await artistResponse.json();
    console.log(artistResult);

    // Seleziona l'elemento con id "bgImg1"
    const backgroundElement = document.getElementById("bgImg1");

    // Aggiorna l'immagine di sfondo con l'immagine desiderata
    backgroundElement.style.backgroundImage = `url('${artistResult.picture_xl}')`;
  } catch (error) {
    console.error(error);
  }
}

// Chiamata alla funzione per cambiare l'immagine di sfondo

// funzione per cambiare i secondi della durata delle tracce da secondi totali a minuti seguito da : e secondi
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

window.onload = () => {
  populateFirstSong();
  populateSecondSongFields();
  populateThirdSongFields();
  populateFourthSongFields();
  populateFifthSongFields();
  populateArtistImage();
  changeBackgroundImage();
  // changeBackgroundImage();
};
