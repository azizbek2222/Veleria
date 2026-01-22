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

// Orqaga qaytish
document.getElementById('back-btn').onclick = () => {
    window.location.href = "home.html";
};

// Ma'lumotlarni yuklash
auth.onAuthStateChanged((user) => {
    if (user) {
        database.ref('users/' + user.uid).once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('p-full-name').innerText = data.firstname + " " + data.lastname;
                document.getElementById('p-username').innerText = "@" + data.username;
                document.getElementById('p-avatar').innerText = data.firstname.charAt(0).toUpperCase();
            }
        });
    } else {
        window.location.href = "index.html";
    }
});

// Logout
document.getElementById('logout-settings').onclick = () => {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
};
