// 1. Firebase Konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  databaseURL: "https://webtelegram-9a1d6-default-rtdb.firebaseio.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

// 2. Firebase-ni ishga tushirish (agar hali ishga tushmagan bo'lsa)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {
    const user = auth.currentUser;
    const fname = document.getElementById('firstname').value.trim();
    const lname = document.getElementById('lastname').value.trim();
    const uname = document.getElementById('username').value.trim().toLowerCase();

    // Ma'lumotlar to'liq kiritilganini tekshirish
    if (!fname || !lname || !uname) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    if (user) {
        // Tugmani vaqtincha faolsizlantirish (ikki marta bosilmasligi uchun)
        saveBtn.innerText = "Yuklanmoqda...";
        saveBtn.disabled = true;

        // Ma'lumotlarni Firebase Realtime Database'ga saqlash
        database.ref('users/' + user.uid).set({
            firstname: fname,
            lastname: lname,
            username: uname,
            email: user.email,
            uid: user.uid,
            profilePic: "", // Bo'sh rasm uchun joy
            createdAt: new Date().toISOString()
        })
        .then(() => {
            console.log("Ma'lumotlar muvaffaqiyatli saqlandi!");
            // Home sahifasiga o'tish
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert("Xatolik yuz berdi: " + error.message);
            saveBtn.innerText = "Saqlash va Boshlash";
            saveBtn.disabled = false;
        });
    } else {
        alert("Avtorizatsiyadan o'tilmagan! Iltimos, qaytadan kiring.");
        window.location.href = "index.html";
    }
});

// Sahifa yuklanganda foydalanuvchi tizimga kirganini tekshirish
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Agar foydalanuvchi login qilmagan bo'lsa, uni login sahifasiga qaytarish
        window.location.href = "index.html";
    }
});
