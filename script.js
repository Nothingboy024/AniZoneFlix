// 🔐 Admin Password
const ADMIN_PASSWORD = "admin123";

function checkPassword() {
  let pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Wrong Password!");
  }
}

// ➕ Add Episode from Admin
function addEpisode() {
  let anime = document.getElementById("anime").value;
  let episode = document.getElementById("episode").value;
  let link480 = document.getElementById("link480").value;
  let link720 = document.getElementById("link720").value;
  let link1080 = document.getElementById("link1080").value;

  let data = JSON.parse(localStorage.getItem("animeData")) || {};

  if (!data[anime]) data[anime] = [];

  data[anime].push({
    episode,
    link480,
    link720,
    link1080
  });

  localStorage.setItem("animeData", JSON.stringify(data));
  alert("Episode Added!");
}

// 📺 Load Anime on Home Page
if (document.getElementById("animeContainer")) {
  loadAnime();
}

function loadAnime() {
  let container = document.getElementById("animeContainer");
  let data = JSON.parse(localStorage.getItem("animeData")) || {};

  for (let anime in data) {
    let card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `<h2>${anime}</h2>`;

    data[anime].forEach(ep => {
      let epDiv = document.createElement("div");
      epDiv.innerHTML = `
        <p>Episode ${ep.episode}</p>
        <a href="${ep.link480}">480p</a>
        <a href="${ep.link720}">720p</a>
        <a href="${ep.link1080}">1080p</a>
        <hr>
      `;
      card.appendChild(epDiv);
    });

    container.appendChild(card);
  }
}
