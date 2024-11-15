// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika menu di klik
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan navbar

const hamburger = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

function loadPage(page) {
  let pagePath = '';
  
  if (page === 'vector-addition') {
      pagePath = 'vector-addition/index.html';
  } else if (page === 'parabola-game') {
      pagePath = 'parabola-game/index.html';
  } else {
      document.querySelector("#" + page).scrollIntoView({ behavior: 'smooth' });
      return;
  }
  
  fetch(pagePath)
      .then(response => response.text())
      .then(html => {
          document.querySelector("#content").innerHTML = html;
      })
      .catch(error => console.log("Error loading page:", error));
}

// Event listener untuk perubahan hash
window.addEventListener("hashchange", () => {
  const page = window.location.hash.substring(1) || "home";
  loadPage(page);
});

// Muat halaman awal berdasarkan hash atau default ke 'home'
window.addEventListener("load", () => {
  const page = window.location.hash.substring(1) || "home";
  loadPage(page);
});

document.getElementById("search").addEventListener("click", (event) => {
  event.preventDefault();
  const searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display = searchContainer.style.display === "none" ? "flex" : "none";
});

document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  
  if (searchTerm) {
    // Logika pencarian atau redirect ke hasil pencarian
    alert("Searching for: " + searchTerm);
  }
});