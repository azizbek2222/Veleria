// 1. Firebase Konfiguratsiyasi (Faqat bitta joyda bo'lishi kerak)
const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  databaseURL: "https://webtelegram-9a1d6-default-rtdb.firebaseio.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

// Firebase-ni ishga tushirish
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

// 2. UI Elementlarni tanlab olish
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const logoutBtn = document.getElementById('logout-btn');
const tabs = document.querySelectorAll('.tab');

// 3. Sidebar (Yon menyu) funksiyalari
menuIcon.onclick = () => {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
};

overlay.onclick = () => {
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
};

// 4. Foydalanuvchi ma'lumotlarini (Rasm, Ism, Username) Real-time yuklash
auth.onAuthStateChanged((user) => {
    if (user) {
        // '.on' ishlatdik - profil o'zgarsa, home sahifasini yangilamasdan rasm o'zgaradi
        database.ref('users/' + user.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Ism va Username
                document.getElementById('user-display-name').innerText = data.firstname + " " + (data.lastname || "");
                document.getElementById('user-display-username').innerText = "@" + data.username;
                
                const avatarCont = document.getElementById('user-avatar-container');
                const avatarLetter = document.getElementById('user-avatar-letter');

                // RASMNI TEKSHIRISH
                if (data.profilePic && data.profilePic !== "") {
                    // Agar rasm bazada bo'lsa
                    avatarCont.style.backgroundImage = `url(${data.profilePic})`;
                    avatarCont.style.backgroundSize = "cover";
                    avatarCont.style.backgroundPosition = "center";
                    if(avatarLetter) avatarLetter.style.display = 'none'; // Harfni yashirish
                } else {
                    // Agar rasm bo'lmasa, harfni ko'rsatish
                    avatarCont.style.backgroundImage = 'none';
                    if(avatarLetter) {
                        avatarLetter.style.display = 'block';
                        avatarLetter.innerText = data.firstname.charAt(0).toUpperCase();
                    }
                }
            }
        });
    } else {
        // Foydalanuvchi kirmagan bo'lsa
        window.location.href = "index.html";
    }
});

// 5. Menyu tugmalari (Yo'naltirishlar)

// Profil sahifasiga (Sidebar 1-chi element)
const profileBtn = document.querySelector('.menu-item:nth-child(1)');
if (profileBtn) {
    profileBtn.onclick = () => {
        window.location.href = "profile.html";
    };
}

// Sozlamalar sahifasiga (Sidebar 2-chi element)
const settingsBtn = document.querySelector('.menu-item:nth-child(2)');
if (settingsBtn) {
    settingsBtn.onclick = () => {
        window.location.href = "sozlamalar.html";
    };
}

// 6. Chat jildlari (Tablar) orasida almashish
tabs.forEach(tab => {
    tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    };
});

// 7. Chiqish (Logout)
logoutBtn.onclick = () => {
    if (confirm("Akkauntdan chiqishni xohlaysizmi?")) {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        });
    }
};
