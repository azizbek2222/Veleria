import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    RecaptchaVerifier, 
    signInWithPhoneNumber 
} from "firebase/auth";

const firebaseConfig = {
    // Sizning firebaseConfig ma'lumotlaringiz
    apiKey: "AIzaSyApRt8MNq4YvsjxQVhyQK3p5km8G7Hi9iE",
    authDomain: "webtelegram-9a1d6.firebaseapp.com",
    projectId: "webtelegram-9a1d6",
    storageBucket: "webtelegram-9a1d6.firebasestorage.app",
    messagingSenderId: "991268167197",
    appId: "1:991268167197:web:fa77f263a3d3a66600b0f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 1. Recaptcha yaratish
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'normal', // yoki 'invisible' (ko'rinmas) qilsa bo'ladi
    'callback': (response) => {
        console.log("Recaptcha tasdiqlandi");
    }
});

const phoneInput = document.getElementById('phone-number');
const codeInput = document.getElementById('verification-code');
const sendBtn = document.getElementById('send-code-btn');
const verifyBtn = document.getElementById('verify-code-btn');

let confirmationResult;

// 2. SMS yuborish
sendBtn.addEventListener('click', () => {
    const phoneNumber = phoneInput.value;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((result) => {
            confirmationResult = result;
            document.getElementById('phone-container').style.display = 'none';
            document.getElementById('code-container').style.display = 'block';
            alert("SMS kodi yuborildi!");
        }).catch((error) => {
            alert("Xatolik: " + error.message);
        });
});

// 3. Kodni tekshirish
verifyBtn.addEventListener('click', () => {
    const code = codeInput.value;
    confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log("Kirish muvaffaqiyatli!");
        window.location.href = "name.html";
    }).catch((error) => {
        alert("Kod noto'g'ri yoki muddati o'tgan!");
    });
});
