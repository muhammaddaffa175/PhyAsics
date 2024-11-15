// database.js
import app from './app.js';
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const db = getDatabase(app);  // Using the Firebase app instance

// Function to save data
export const saveUserData = (userId, data) => {
  return set(ref(db, 'users/' + userId), data);
};

// Function to read data
export const getUserData = (userId) => {
  const dbRef = ref(db);
  return get(child(dbRef, `users/${userId}`));
};
