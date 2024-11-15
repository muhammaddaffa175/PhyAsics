// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import app from './app.js';

const auth = getAuth(app);

// Register new user
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login existing user
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout user
export function logoutUser() {
  return signOut(auth);
}

// Event listeners for login and registration buttons
document.getElementById("button_register")?.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email_register").value;
  const password = document.getElementById("psw_register").value;

  try {
    const userCredential = await registerUser(email, password);
    alert("Registration successful!");
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert("Registration failed: " + error.message);
  }
});

document.getElementById("button_login")?.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email_login").value;
  const password = document.getElementById("psw_login").value;

  try {
    await loginUser(email, password);
    alert("Login successful!");
    window.location.href = "../index.html"; // Redirect to the main page
  } catch (error) {
    console.error("Error during login:", error.message);
    alert("Login failed: " + error.message);
  }
});
