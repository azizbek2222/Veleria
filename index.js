import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    getRedirectResult,
    onAuthStateChanged 
} from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('google-login-btn');

// 1. Sahifa yuklanganda natijani kutish (Redirectdan qaytganda)
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            window.location.href = "name.html";
        }
    }).catch((error) => {
        console.error("Xatolik:", error.message);
        alert("Xatolik: " + error.message);
    });

// 2. Agar foydalanuvchi allaqachon kirgan bo'lsa
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "name.html";
    }
});

// 3. Tugma bosilganda Google-ga jo'natish
loginBtn.addEventListener('click', () => {
    loginBtn.innerText = "Kutilmoqda...";
    signInWithRedirect(auth, provider);
});
