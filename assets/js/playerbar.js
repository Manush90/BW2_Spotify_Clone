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

//barra regolabile del volume
function updateVolume() {
  const volumeRange = document.getElementById("volumeRange");
  const volumeFill = document.getElementById("volumeFill");
  const value = volumeRange.value;

  volumeFill.style.width = value + "%";
}

// invertire button di play e pausa

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

// coloriamo le modalità shuffle e repeat

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

// const heartSwapButton = document.getElementById("heartSwap");

// heartSwapButton.addEventListener("click", () => {
//   const heartSVG = document.getElementById("heart");
//   const oldPath =
//     "M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z";
//   const newPath =
//     "M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z";

//   if (heartSVG.classList.contains("fill-gray") && heartSVG.classList.contains("hoverSVG")) {
//     heartSVG.setAttribute("width", "18px");
//     heartSVG.setAttribute("class", "fill-green hoverSVG");
//     heartSVG.querySelector("path").setAttribute("d", newPath);
//   } else if (heartSVG.classList.contains("fill-green") && heartSVG.classList.contains("hoverSVG")) {
//     heartSVG.setAttribute("width", "19px");
//     heartSVG.setAttribute("class", "fill-gray hoverSVG");
//     heartSVG.querySelector("path").setAttribute("d", oldPath);
//   }
// });

// Ottieni riferimenti agli elementi del DOM
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
