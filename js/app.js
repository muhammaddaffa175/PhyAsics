// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNsENRVSInn118AxrOow4Pn7nY0RH9ZbE",
  authDomain: "phyasics-a60b7.firebaseapp.com",
  databaseURL: "https://phyasics-a60b7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phyasics-a60b7",
  storageBucket: "phyasics-a60b7.appspot.com",
  messagingSenderId: "831571149135",
  appId: "1:831571149135:web:effef5bb43134f3236453a",
  measurementId: "G-EPKRXJBG6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
