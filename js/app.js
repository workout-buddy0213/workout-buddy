// ✅ Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let timerInterval;
let seconds = 0;

// ✅ Timer Functions
function formatTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            document.getElementById('timer').innerText = formatTime(seconds);
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById('timer').innerText = formatTime(seconds);
}

// ✅ Event Listeners for Timer
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', stopTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);

// ✅ Auth Functions
const authHeader = document.getElementById('authHeader');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const switchAuthBtn = document.getElementById('switchAuthBtn');

let isLogin = true;

switchAuthBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    authHeader.innerText = isLogin ? 'Login' : 'Sign Up';
    authSubmitBtn.innerText = isLogin ? 'Login' : 'Sign Up';
});

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => updateUI(true))
            .catch(err => alert(err.message));
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => updateUI(true))
            .catch(err => alert(err.message));
    }
});

document.getElementById('logoutLink').addEventListener('click', () => {
    auth.signOut().then(() => updateUI(false));
});

function updateUI(isLoggedIn) {
    document.getElementById('loginLink').classList.toggle('d-none', isLoggedIn);
    document.getElementById('signupLink').classList.toggle('d-none', isLoggedIn);
    document.getElementById('logoutLink').classList.toggle('d-none', !isLoggedIn);
    document.getElementById('timerSection').classList.toggle('d-none', !isLoggedIn);
    document.getElementById('authSection').classList.toggle('d-none', isLoggedIn);
}

// ✅ Navbar Links
document.getElementById('timerLink').addEventListener('click', () => {
    document.getElementById('timerSection').classList.remove('d-none');
    document.getElementById('authSection').classList.add('d-none');
});

document.getElementById('homeLink').addEventListener('click', () => {
    document.getElementById('authSection').classList.remove('d-none');
    document.getElementById('timerSection').classList.add('d-none');
});

// ✅ Firebase Auth State Change
auth.onAuthStateChanged(user => updateUI(!!user));
