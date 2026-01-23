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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

// 2. UI Elementlarni tanlab olish
const menuIcon = document.getElementById('menu-icon');
const searchIcon = document.getElementById('search-icon'); // Yangi element
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const logoutBtn = document.getElementById('logout-btn');
const tabs = document.querySelectorAll('.tab');

// 3. Sidebar funksiyalari
menuIcon.onclick = () => {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
};

overlay.onclick = () => {
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
};

// --- QIDIRUV TUGMASI (LUPA) ---
if (searchIcon) {
    searchIcon.onclick = () => {
        window.location.href = "search.html";
    };
}

// 4. Foydalanuvchi ma'lumotlarini Real-time yuklash
auth.onAuthStateChanged((user) => {
    if (user) {
        database.ref('users/' + user.uid).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('user-display-name').innerText = data.firstname + " " + (data.lastname || "");
                document.getElementById('user-display-username').innerText = "@" + data.username;
                
                const avatarCont = document.getElementById('user-avatar-container');
                const avatarLetter = document.getElementById('user-avatar-letter');

                if (data.profilePic && data.profilePic !== "") {
                    avatarCont.style.backgroundImage = `url(${data.profilePic})`;
                    avatarCont.style.backgroundSize = "cover";
                    avatarCont.style.backgroundPosition = "center";
                    if(avatarLetter) avatarLetter.style.display = 'none';
                } else {
                    avatarCont.style.backgroundImage = 'none';
                    if(avatarLetter) {
                        avatarLetter.style.display = 'block';
                        avatarLetter.innerText = data.firstname.charAt(0).toUpperCase();
                    }
                }
            }
        });
    } else {
        window.location.href = "index.html";
    }
});

// 5. Menyu tugmalari
const profileBtn = document.querySelector('.menu-item:nth-child(1)');
if (profileBtn) {
    profileBtn.onclick = () => {
        window.location.href = "profile.html";
    };
}

const settingsBtn = document.querySelector('.menu-item:nth-child(2)');
if (settingsBtn) {
    settingsBtn.onclick = () => {
        window.location.href = "sozlamalar.html";
    };
}

// 6. Chat jildlari
tabs.forEach(tab => {
    tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    };
});

// 7. Chiqish
logoutBtn.onclick = () => {
    if (confirm("Akkauntdan chiqishni xohlaysizmi?")) {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        });
    }
};