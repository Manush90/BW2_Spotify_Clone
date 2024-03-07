// options object, headers with API key
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8223206026mshc9f22398ae98821p146eb6jsna3d58f053010",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// FIRST SECTION CARD
const endpoints = [
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/2469",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/1234",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/2345",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/34456",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/5678",
  "https://deezerdevs-deezer.p.rapidapi.com/playlist/7891",
];

// Funzione per ottenere i dati della playlist da un URL
const getPlaylistData = async (endpoint) => {
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching playlist data:", error);
    return null;
  }
};

// Funzione per popolare le card HTML con i dati della playlist
const populatePlaylistCards = async () => {
  try {
    const playlistData = await Promise.all(endpoints.map((endpoint) => getPlaylistData(endpoint)));

    playlistData.forEach((playlist, index) => {
      const card = document.querySelectorAll(".card")[index];
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".img-fluid");

      titleElement.textContent = playlist.title; // Assuming playlist object has a 'title' property
      imageElement.src = playlist.picture_medium; // Assuming playlist object has a 'picture_medium' property
    });
  } catch (error) {
    console.error("Error populating playlist cards:", error);
  }
};

// Chiamata alla funzione per popolare le card HTML con i dati delle playlist
populatePlaylistCards();

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
