const firebaseConfig = {
  apiKey: "AIzaSyCvHAc5hAn_APEevyjqqu0bJSpeSjvjspg",
  authDomain: "nasa-prica-chat.firebaseapp.com",
  projectId: "nasa-prica-chat",
  storageBucket: "nasa-prica-chat.firebasestorage.app",
  messagingSenderId: "729490246241",
  appId: "1:729490246241:web:bfa5eecf30173538b4f820",
  measurementId: "G-15VK1J0VJM"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginView = document.getElementById("loginView");
const homeView = document.getElementById("homeView");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const logoutBtn = document.getElementById("logoutBtn");

auth.onAuthStateChanged(user => {
  loginView.classList.toggle("hidden", !!user);
  homeView.classList.toggle("hidden", !user);
  logoutBtn.classList.toggle("hidden", !user);
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  loginMessage.textContent = "Prijavljivanje...";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    loginMessage.textContent = "";
  } catch (error) {
    loginMessage.textContent = error.code === "auth/invalid-credential"
      ? "Email ili lozinka nisu ispravni."
      : "Greška pri prijavi: " + error.message;
  }
});

logoutBtn.addEventListener("click", () => auth.signOut());

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./app-sw.js").catch(error => {
      console.warn("Service worker nije registrovan:", error);
    });
  });
}
