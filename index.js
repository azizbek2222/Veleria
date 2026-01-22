import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

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

// Ro'yxatdan o'tish
document.getElementById('reg-btn').addEventListener('click', () => {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;

    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            window.location.href = "name.html";
        })
        .catch((error) => {
            alert("Xatolik: " + error.message);
        });
});

// Kirish
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("Email yoki parol noto'g'ri!");
        });
});
