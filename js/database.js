import app from './app.js';
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const db = getDatabase(app);  // Using the Firebase app instance

// Fungsi untuk menyimpan data pengguna (termasuk unlocked levels)
export const saveUserData = (userId, data) => {
  const userRef = ref(db, `users/${userId}`);
  return set(userRef, data)
    .then(() => {
      console.log(`Data pengguna berhasil disimpan untuk userId: ${userId}`);
    })
    .catch((error) => {
      console.error("Gagal menyimpan data pengguna:", error);
    });
};

// Fungsi untuk mengambil data pengguna dari Firebase Realtime Database
export const getUserData = async (userId) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log("Data pengguna ditemukan:", userData);
      return userData;
    } else {
      console.log("Data pengguna tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Error saat mengambil data pengguna:", error);
    return null;
  }
};

// Fungsi untuk menyimpan data unlockedLevels ke Firebase
export const saveUnlockedLevels = (userId, unlockedLevels) => {
  const userRef = ref(db, `users/${userId}`);
  set(userRef, {
      unlockedLevels: unlockedLevels // Menyimpan data unlockedLevels
  })
  .then(() => {
      console.log('User levels updated successfully.');
  })
  .catch((error) => {
      console.error('Error updating user levels:', error);
  });
};

// Fungsi untuk mengambil data unlockedLevels dari Firebase
export const getUnlockedLevels = async (userId) => {
  try {
    const userRef = ref(db, `users/${userId}/unlockedLevels`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const unlockedLevels = snapshot.val();
      console.log("Unlocked levels ditemukan:", unlockedLevels);
      return unlockedLevels;
    } else {
      console.log("Unlocked levels tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Error saat mengambil unlocked levels:", error);
    return null;
  }
};