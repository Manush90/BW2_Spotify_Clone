// options object, headers with API key
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8223206026mshc9f22398ae98821p146eb6jsna3d58f053010",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// Funzione per ottenere l'id dell'album dalla query string nell'URL
function getAlbumIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Funzione per ottenere i dati dell'album dal server usando l'id
async function fetchAlbumData(albumId) {
  try {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch album data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching album data:", error);
    // Gestire l'errore, ad esempio visualizzare un messaggio di errore all'utente
  }
}

// Funzione per popolare la pagina con i dati dell'album
async function populateAlbumPage() {
  const albumId = getAlbumIdFromUrl();
  if (!albumId) {
    console.error("Album id not found in URL");
    return;
  }

  const albumData = await fetchAlbumData(albumId);
  if (!albumData) {
    console.error("Failed to fetch album data");
    return;
  }

  // Popolare dinamicamente la pagina con i dati dell'album
  document.getElementById("album_Cover").src = albumData.cover_xl;
  document.getElementById("album_Name").textContent = albumData.title;
  document.querySelector(
    "#containerTestoAlbum a p"
  ).textContent = `${albumData.artist.name} • ${albumData.release_date} • ${albumData.nb_tracks} brani`;
  // Altri dati dell'album...

  // Puoi continuare a popolare altri elementi della pagina con i dati dell'album
}

// Funzione per ottenere la tracklist dell'album
async function fetchTracklist(albumId) {
  try {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}/tracks`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch tracklist");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tracklist:", error);
    // Gestire l'errore, ad esempio visualizzare un messaggio di errore all'utente
  }
}

// Funzione per popolare la tracklist dell'album
async function populateTracklist(albumId) {
  const tracklistData = await fetchTracklist(albumId);
  if (!tracklistData) {
    console.error("Failed to fetch tracklist");
    return;
  }

  // Ottieni il container dell'elenco delle canzoni
  const tracklistContainer = document.getElementById("boxSongs");

  // Pulisci il contenuto attuale dell'elenco delle canzoni
  tracklistContainer.innerHTML = "";

  // Popola dinamicamente l'elenco delle canzoni
  tracklistData.data.forEach((track, index) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("row");

    trackElement.innerHTML = `
        <div class="col-1">
          <p class="textColorSongs">${index + 1}</p>
        </div>
        <div class="col-5">
          <p class="small textColorSongs">${track.title}</p>
        </div>
        <div class="col-4">
          <p class="small textColorSongs">${track.duration}</p>
        </div>
        <div class="col-2">
          <!-- Altri dettagli della traccia, se necessario -->
        </div>
      `;

    tracklistContainer.appendChild(trackElement);
  });
}

// Chiama la funzione per popolare la tracklist dell'album quando la pagina è pronta
document.addEventListener("DOMContentLoaded", () => {
  const albumId = getAlbumIdFromUrl();
  if (albumId) {
    populateTracklist(albumId);
  } else {
    console.error("Album id not found in URL");
  }
});

// Chiama la funzione per popolare la pagina quando la pagina è pronta
document.addEventListener("DOMContentLoaded", populateAlbumPage);
