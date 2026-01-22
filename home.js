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

// Firebase-ni ishga tushirish (agar hali ishga tushmagan bo'lsa)
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
// Menyuni ochish
menuIcon.onclick = () => {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
};

// Menyuni yopish (ekranning bo'sh joyini bosganda)
overlay.onclick = () => {
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
};

// 4. Avtomatik foydalanuvchi tekshiruvi va ma'lumotlarni yuklash
auth.onAuthStateChanged((user) => {
    if (user) {
        // Foydalanuvchi tizimga kirgan bo'lsa, ma'lumotlarini bazadan olamiz
        database.ref('users/' + user.uid).once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Sidebar-dagi Ism va Username-ni yangilash
                document.getElementById('user-display-name').innerText = data.firstname + " " + data.lastname;
                document.getElementById('user-display-username').innerText = "@" + data.username;
                
                // Avatar uchun ismning birinchi harfini qo'yish
                const avatar = document.getElementById('user-avatar');
                if(avatar) avatar.innerText = data.firstname.charAt(0).toUpperCase();
            }
        });
    } else {
        // Agar kirmagan bo'lsa, login sahifasiga qaytarish
        window.location.href = "index.html";
    }
});

// 5. Menyu tugmalari (O'tishlar)

// Profil tugmasi (1-chi element)
const profileBtn = document.querySelector('.menu-item:nth-child(1)');
if (profileBtn) {
    profileBtn.onclick = () => {
        window.location.href = "sozlamalar.html";
    };
}

// Sozlamalar tugmasi (2-chi element)
const settingsBtn = document.querySelector('.menu-item:nth-child(2)');
if (settingsBtn) {
    settingsBtn.onclick = () => {
        window.location.href = "sozlamalar.html";
    };
}

// 6. Chat jildlari (Tablar) orasida almashish animatsiyasi
tabs.forEach(tab => {
    tab.onclick = () => {
        // Eski aktiv tabni o'chirish
        tabs.forEach(t => t.classList.remove('active'));
        // Yangisini aktiv qilish
        tab.classList.add('active');
        
        console.log("Tanlangan jild:", tab.getAttribute('data-type'));
    };
});

// 7. Chiqish (Logout) funksiyasi
logoutBtn.onclick = () => {
    const confirmLogout = confirm("Haqiqatdan ham akkauntdan chiqmoqchimisiz?");
    if (confirmLogout) {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            alert("Xatolik yuz berdi: " + error.message);
        });
    }
};
