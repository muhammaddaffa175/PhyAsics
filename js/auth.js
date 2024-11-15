// auth.js
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import app from './app.js';

const auth = getAuth(app);

// Register new user
export function registerUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Update profile with username
            return updateProfile(userCredential.user, {
                displayName: username
            });
        });
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
    const username = document.getElementById("username").value;

    try {
        await registerUser(email, password, username);
        alert("Registration successful!");
        window.location.href = "../index.html"; // Redirect to the main page after registration
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
        window.location.href = "../index.html"; // Redirect to the main page after login
    } catch (error) {
        console.error("Error during login:", error.message);
        alert("Login failed: " + error.message);
    }
});

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    const loginButton = document.getElementById("log-in");
    const userDisplay = document.getElementById("usernameDisplay");

    if (user) {
        // User is logged in, display username
        loginButton.style.display = "none";
        userDisplay.style.display = "block";
        userDisplay.textContent = user.displayName || "Profile";
        userDisplay.href = "profile.html"; // Direct to profile page on click
    } else {
        // User is not logged in, display login button
        loginButton.style.display = "block";
        userDisplay.style.display = "none";
    }
});

// Log out button in the profile page
document.getElementById("logout-button")?.addEventListener("click", async () => {
    try {
        await logoutUser();
        window.location.href = "index.html"; // Redirect to main page after logout
    } catch (error) {
        console.error("Error during logout:", error.message);
        alert("Logout failed: " + error.message);
    }
});
