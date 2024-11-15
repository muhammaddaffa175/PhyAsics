import app from './app.js';
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const db = getDatabase(app);  // Using the Firebase app instance

// Function to save data (including unlocked levels)
export const saveUserData = (userId, data) => {
  return set(ref(db, 'users/' + userId), data);
};

// Function to read data (for user details)
export const getUserData = (userId) => {
  const dbRef = ref(db);
  return get(child(dbRef, `users/${userId}`));
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
export const getUnlockedLevels = (userId) => {
  const userRef = ref(db, `users/${userId}/unlockedLevels`);
  return get(userRef); // Mengambil data unlockedLevels dari Firebase
};