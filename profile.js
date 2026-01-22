const firebaseConfig = {
  apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
  authDomain: "webtelegram-9a1d6.firebaseapp.com",
  databaseURL: "https://webtelegram-9a1d6-default-rtdb.firebaseio.com",
  projectId: "webtelegram-9a1d6",
  storageBucket: "webtelegram-9a1d6.firebasestorage.app",
  messagingSenderId: "991268167197",
  appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

let currentUserId;
let base64Image = "";

// 1. Ma'lumotlarni yuklash
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUserId = user.uid;
        database.ref('users/' + user.uid).once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                document.getElementById('edit-firstname').value = data.firstname || "";
                document.getElementById('edit-lastname').value = data.lastname || "";
                document.getElementById('edit-username').value = data.username || "";
                if (data.profilePic) {
                    document.getElementById('imagePreview').style.backgroundImage = `url(${data.profilePic})`;
                    base64Image = data.profilePic;
                }
            }
        });
    } else {
        window.location.href = "index.html";
    }
});

// 2. Rasmni tanlash va ko'rish (Base64 ga o'tkazish)
document.getElementById('imageUpload').onchange = function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            base64Image = e.target.result;
            document.getElementById('imagePreview').style.backgroundImage = `url(${base64Image})`;
        };
        reader.readAsDataURL(file);
    }
};

// 3. Ma'lumotlarni saqlash
document.getElementById('save-all').onclick = function() {
    const fname = document.getElementById('edit-firstname').value;
    const lname = document.getElementById('edit-lastname').value;
    const uname = document.getElementById('edit-username').value;

    if (!fname || !uname) {
        alert("Ism va Username majburiy!");
        return;
    }

    database.ref('users/' + currentUserId).update({
        firstname: fname,
        lastname: lname,
        username: uname,
        profilePic: base64Image
    }).then(() => {
        alert("Profil yangilandi!");
        window.location.href = "home.html";
    }).catch((error) => {
        alert("Xatolik: " + error.message);
    });
};
