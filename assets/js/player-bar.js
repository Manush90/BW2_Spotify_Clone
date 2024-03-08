const playMusic = (data) => {
  const coverSong = document.getElementById("coverPlayer");
  const artistSong = document.getElementById("artistPlayer");
  const titleSong = document.getElementById("titlePlayer");

  titleSong.textContent = data.title_short || data.title;
  artistSong.textContent = data.artist.name;
  coverSong.src = data.album.cover_medium;
};
