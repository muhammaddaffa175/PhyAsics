import app from './app.js';
import { getAuth, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

// Referensi elemen
const profileUsername = document.getElementById('profile-username');
const profileEmail = document.getElementById('profile-email');
const profilePhoto = document.getElementById('profile-photo');
const logoutButton = document.getElementById('logout-button');
const updatePhotoForm = document.getElementById('update-photo-form');
const updatePasswordForm = document.getElementById('update-password-form');
const newPasswordInput = document.getElementById('new-password');

// Periksa apakah user sudah login
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Ambil data user dari Firebase Realtime Database
    const userRef = ref(db, `users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        // Menampilkan data username dan email di profile
        profileUsername.textContent = userData.username || "Anonymous";
        profileEmail.textContent = user.email || "No email found";

        // Menampilkan foto profil jika ada
        if (userData.photoURL) {
          profilePhoto.src = userData.photoURL;
        } else {
          profilePhoto.src = "default-profile.png"; // Foto default jika tidak ada foto profil
        }
      } else {
        profileUsername.textContent = user.username || "No user data found.";
        profileEmail.textContent = user.email || "No email found";
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
      profileUsername.textContent = "Error loading username.";
      profileEmail.textContent = "Error loading email.";
    });
  } else {
    // Jika user belum login, arahkan ke halaman login
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

// Fungsi untuk memperbarui foto profil
updatePhotoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('profile-photo-upload').files[0];
  if (file) {
    const storageReference = storageRef(storage, `profilePhotos/${auth.currentUser.uid}`);
    try {
      await uploadBytes(storageReference, file);
      const photoURL = await getDownloadURL(storageReference);

      // Simpan URL foto di database dan perbarui di UI
      await set(ref(db, `users/${auth.currentUser.uid}/photoURL`), photoURL);
      profilePhoto.src = photoURL;
      alert("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error updating photo:", error);
      alert("Failed to update profile photo: " + error.message);
    }
  } else {
    alert("Please select a photo to upload.");
  }
});

// Fungsi untuk memperbarui password
updatePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = newPasswordInput.value;

  try {
    await updatePassword(auth.currentUser, newPassword);
    alert("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
    alert("Failed to update password: " + error.message);
  }
});

document.getElementById("show-file-input").addEventListener("click", function () {
  const fileUploadContainer = document.getElementById("file-upload-container");
  const updatePhotoButton = document.getElementById("show-file-input");

  // Sembunyikan tombol "Update Photo" dan tampilkan input file
  updatePhotoButton.style.display = "none";
  fileUploadContainer.style.display = "block";

  // Tambahkan kelas "show" untuk efek transisi
  setTimeout(() => {
    fileUploadContainer.classList.add("show");
  }, 10);
});

// Fungsi untuk submit foto (jika Anda ingin mengatur event submit form)
document.getElementById("update-photo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Logika upload foto profil ke storage atau server
});
