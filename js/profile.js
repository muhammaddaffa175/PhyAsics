import app from './app.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const auth = getAuth(app);
const db = getDatabase(app);

// Referensi elemen
const profileUsername = document.getElementById('profile-username');
const profileEmail = document.getElementById('profile-email');
const logoutButton = document.getElementById('logout-button');

// Periksa apakah user sudah login
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Ambil data user dari Realtime Database
    const userRef = ref(db, `users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        profileUsername.textContent = userData.username || "Anonymous";
        profileEmail.textContent = user.email || "No email found";
      } else {
        profileUsername.textContent = "No user data found.";
        profileEmail.textContent = user.email || "No email found";
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
      profileUsername.textContent = "Error loading username.";
      profileEmail.textContent = "Error loading email.";
    });
  } else {
    // Jika tidak login, arahkan ke halaman login
    window.location.href = 'index.html';
  }
});

// Fungsi Logout
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert("Logged out successfully!");
    window.location.href = 'index.html';
  }).catch((error) => {
    console.error("Error during logout:", error);
    alert("Error logging out. Please try again.");
  });
});
