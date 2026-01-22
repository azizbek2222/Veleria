import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged 
} from "firebase/auth";

// Firebase sozlamalari
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

// Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google tugmasini tanlab olish
const loginBtn = document.getElementById('google-login-btn');

// 1. Foydalanuvchi holatini kuzatish
// Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa, uni avtomatik o'tkazib yuboradi
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Foydalanuvchi tizimda:", user.displayName);
        window.location.href = "name.html";
    }
});

// 2. Kirish funksiyasi
loginBtn.addEventListener('click', async () => {
    try {
        loginBtn.innerText = "Yuklanmoqda...";
        loginBtn.disabled = true;

        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        console.log("Muvaffaqiyatli kirildi:", user.displayName);
        window.location.href = "name.html";

    } catch (error) {
        console.error("Xatolik yuz berdi:", error.code, error.message);
        
        // Xatolik xabarlarini tushunarli qilish
        if (error.code === 'auth/popup-blocked') {
            alert("Brauzeringiz oyna ochilishini blokladi. Iltimos, ruxsat bering.");
        } else if (error.code === 'auth/unauthorized-domain') {
            alert("Ushbu domen (vercel.app) Firebase-da ruxsat etilmagan!");
        } else {
            alert("Kirishda xatolik: " + error.message);
        }
        
        loginBtn.innerText = "Google orqali kirish";
        loginBtn.disabled = false;
    }
});
