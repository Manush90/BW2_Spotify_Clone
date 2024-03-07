// Ottieni riferimenti agli elementi del DOM  -- CUORE
const heartButton = document.getElementById("heartSwap");
const heartIcon = document.getElementById("heart");
const heartPath = heartIcon.querySelector("path");

// Aggiungi un gestore di eventi al pulsante del cuore
heartButton.addEventListener("click", function () {
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
});

// options object, headers with API key
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8223206026mshc9f22398ae98821p146eb6jsna3d58f053010",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// JUMBOTRON ENDPOINT
const jumbotronEndpoint = "https://deezerdevs-deezer.p.rapidapi.com/track/111406312";

// FIRST SECTION CARD
const endpointsFirstSection = [
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/2469",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/1234",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/2345",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/34456",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/5678",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/7891",
];

// Funzione per ottenere i dati dell'album da un URL
const getData = async (endpoint) => {
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Funzione per popolare il jumbotron con i dati dell'album
const populateJumbotron = async () => {
  try {
    const albumData = await getData(jumbotronEndpoint);

    const albumImage = document.querySelector(".jumbotron img.img-fluid");
    const albumTitle = document.querySelector(".jumbotron h1.display-4");
    const albumInfo = document.querySelector(".jumbotron p.lead");

    albumImage.src = albumData.album.cover_medium;
    albumTitle.textContent = albumData.title;
    albumInfo.textContent = `${albumData.artist.name} • ${albumData.release_date} • ${albumData.nb_tracks} brani`;
  } catch (error) {
    console.error("Error populating jumbotron:", error);
  }
};

// Funzione per popolare le card HTML con i dati della playlist
const populatePlaylistCards = async () => {
  try {
    const playlistData = await Promise.all(endpointsFirstSection.map((endpoint) => getData(endpoint)));

    playlistData.forEach((playlist, index) => {
      const card = document.querySelectorAll(".card")[index];
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".img-fluid");

      titleElement.textContent = playlist.title;
      imageElement.src = playlist.picture_medium;
    });
  } catch (error) {
    console.error("Error populating playlist cards:", error);
  }
};

// Chiamata alla funzione per popolare le card HTML con i dati delle playlist
populatePlaylistCards();

// Chiamata alla funzione per popolare il jumbotron con i dati dell'album
populateJumbotron();

// const fetchPromises = endpoints.map(endpoint => fetch(endpoint));

// Promise.all(fetchPromises)
//   .then(responses => {
//     // Process the responses
//   })
//   .catch(error => {
//     // Handle any errors
//   });

//   try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// GET Fetch Requests
