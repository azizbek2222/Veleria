import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const btn = document.getElementById('action-btn');
const toggleBtn = document.getElementById('toggle-text');

let isLogin = false;

toggleBtn.onclick = () => {
    isLogin = !isLogin;
    btn.innerText = isLogin ? "Kirish" : "Ro'yxatdan o'tish";
    toggleBtn.innerHTML = isLogin ? "Akkauntingiz yo'qmi? <span>Yaratish</span>" : "Akkauntingiz bormi? <span>Kirish</span>";
};

btn.onclick = () => {
    const email = emailInput.value;
    const pass = passInput.value;

    if (isLogin) {
        signInWithEmailAndPassword(auth, email, pass)
            .then(() => window.location.href = "home.html")
            .catch(err => alert("Xato: " + err.message));
    } else {
        createUserWithEmailAndPassword(auth, email, pass)
            .then(() => window.location.href = "name.html")
            .catch(err => alert("Xato: " + err.message));
    }
};
