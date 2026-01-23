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

// Firebase-ni ishga tushirish
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const backBtn = document.getElementById('back-btn');

// Orqaga qaytish tugmasi
backBtn.onclick = () => {
    window.history.back();
};

// Qidiruv funksiyasi
searchInput.oninput = (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 1) {
        searchResults.innerHTML = '<div class="initial-msg">Qidirish uchun username kiriting...</div>';
        return;
    }

    // Firebase'dan username bo'yicha qidirish
    database.ref('users').orderByChild('username')
        .startAt(query)
        .endAt(query + "\uf8ff")
        .once('value', (snapshot) => {
            searchResults.innerHTML = ""; // Oldingi natijalarni tozalash
            
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val();
                    const userId = childSnapshot.key;
                    
                    // Natija elementini yaratish
                    createSearchResultItem(user, userId);
                });
            } else {
                searchResults.innerHTML = '<div class="no-result">Hech narsa topilmadi</div>';
            }
        });
};

function createSearchResultItem(user, id) {
    const div = document.createElement('div');
    div.className = 'search-item';
    
    // Profil rasm yoki birinchi harf
    let avatarContent = "";
    let avatarStyle = "";
    
    if (user.profilePic) {
        avatarStyle = `style="background-image: url('${user.profilePic}')"`;
    } else {
        avatarContent = user.firstname ? user.firstname.charAt(0).toUpperCase() : "?";
    }

    div.innerHTML = `
        <div class="user-img" ${avatarStyle}>${avatarContent}</div>
        <div class="user-info">
            <div class="user-name">${user.firstname} ${user.lastname || ""}</div>
            <div class="user-username">@${user.username}</div>
        </div>
    `;

    div.onclick = () => {
        // Bu yerda tanlangan foydalanuvchi bilan chatga o'tish kodini yozish mumkin
        console.log("Tanlangan user ID:", id);
        // window.location.href = `chat.html?id=${id}`; 
    };

    searchResults.appendChild(div);
}