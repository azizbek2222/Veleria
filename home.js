// Firebase Config (index.js dagi bilan bir xil bo'lishi kerak)
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

// UI Elementlar
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const logoutBtn = document.getElementById('logout-btn');

// Sidebar ochish/yopish
menuIcon.onclick = () => {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
};

overlay.onclick = () => {
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
};

// Foydalanuvchi ma'lumotlarini yuklash
auth.onAuthStateChanged((user) => {
    if (user) {
        database.ref('users/' + user.uid).once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('user-display-name').innerText = data.firstname + " " + data.lastname;
                document.getElementById('user-display-username').innerText = "@" + data.username;
            }
        });
    } else {
        window.location.href = "index.html";
    }
});

// Tablar orasida almashish
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Bu yerda chatlarni filtrlaydigan funksiya chaqirilsa bo'ladi
    };
});

// Logout
logoutBtn.onclick = () => {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
};
