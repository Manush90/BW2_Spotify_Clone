const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=%3CREQUIRED%3E";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "be3da42077mshb39f0419e14de60p17053fjsnfb2d6848dc67",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("API Response:", data);
  })
  .catch((error) => {
    console.error(error);
  });
