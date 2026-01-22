// Firebase-ni sozlash
const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

// Firebase-ni ishga tushirish
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Elementlarni olish
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const mainBtn = document.getElementById('main-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');

let isLoginMode = false;

// Sahifani almashtirish (Kirish / Ro'yxatdan o'tish)
toggleLink.onclick = function() {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        mainBtn.innerText = "Tizimga kirish";
        toggleText.innerHTML = "Akkauntingiz yo'qmi? <span id='toggle-link'>Yaratish</span>";
    } else {
        mainBtn.innerText = "Ro'yxatdan o'tish";
        toggleText.innerHTML = "Akkauntingiz bormi? <span id='toggle-link'>Kirish</span>";
    }
    // Qayta bog'lash (chunki span o'zgardi)
    document.getElementById('toggle-link').onclick = toggleLink.onclick;
};

// Tugma bosilganda
mainBtn.onclick = function() {
    const email = emailInput.value;
    const pass = passInput.value;

    if (email === "" || pass === "") {
        alert("Iltimos, hamma joyni to'ldiring!");
        return;
    }

    if (isLoginMode) {
        // Kirish
        auth.signInWithEmailAndPassword(email, pass)
            .then(() => {
                window.location.href = "home.html";
            })
            .catch((error) => {
                alert("Xato: " + error.message);
            });
    } else {
        // Ro'yxatdan o'tish
        auth.createUserWithEmailAndPassword(email, pass)
            .then(() => {
                window.location.href = "name.html";
            })
            .catch((error) => {
                alert("Xato: " + error.message);
            });
    }
};
