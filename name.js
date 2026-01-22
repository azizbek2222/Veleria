import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  databaseURL: "https://webtelegram-9a1d6-default-rtdb.firebaseio.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {
    const user = auth.currentUser;
    const fname = document.getElementById('firstname').value;
    const lname = document.getElementById('lastname').value;
    const uname = document.getElementById('username').value;

    if (user && fname && lname && uname) {
        set(ref(database, 'users/' + user.uid), {
            firstname: fname,
            lastname: lname,
            username: uname,
            email: user.email,
            photo: user.photoURL
        }).then(() => {
            window.location.href = "home.html";
        }).catch((error) => {
            alert("Xatolik: " + error.message);
        });
    } else {
        alert("Barcha maydonlarni to'ldiring!");
    }
});
