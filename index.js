import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  databaseURL: "https://webtelegram-9a1d6-default-rtdb.firebaseio.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4",
  measurementId: "G-7F5X24BNQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('google-login-btn');

loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // Login muvaffaqiyatli
            console.log("Kirildi:", result.user);
            // Keyingi sahifaga o'tish
            window.location.href = "name.html";
        })
        .catch((error) => {
            console.error("Xatolik:", error.message);
            alert("Kirishda xatolik yuz berdi!");
        });
});
