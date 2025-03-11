// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCEpqWdrP8Q_l8Ce7L_rluWxS28ln6LECo",
  authDomain: "workout-buddy-8a166.firebaseapp.com",
  projectId: "workout-buddy-8a166",
  storageBucket: "workout-buddy-8a166.appspot.com",
  messagingSenderId: "263828348382",
  appId: "1:263828348382:web:6bec94a3c5e702c991514f",
  measurementId: "G-G6XXYN91CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const message = document.getElementById("message");

// Sign Up
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      message.textContent = "Account created successfully!";
      message.className = "success";
      console.log("Signed up:", userCredential.user);
    })
    .catch((error) => {
      message.textContent = `Error: ${error.message}`;
      message.className = "error";
    });
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      message.textContent = "Logged in successfully!";
      message.className = "success";
      console.log("Logged in:", userCredential.user);

      // Show logout button, hide signup/login
      document.getElementById("logout-btn").style.display = "block";
      document.getElementById("signup-btn").style.display = "none";
      document.getElementById("login-btn").style.display = "none";
    })
    .catch((error) => {
      message.textContent = `Error: ${error.message}`;
      message.className = "error";
    });
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      message.textContent = "Logged out successfully!";
      message.className = "success";

      // Reset buttons
      document.getElementById("logout-btn").style.display = "none";
      document.getElementById("signup-btn").style.display = "block";
      document.getElementById("login-btn").style.display = "block";
    })
    .catch((error) => {
      message.textContent = `Error: ${error.message}`;
      message.className = "error";
    });
});
