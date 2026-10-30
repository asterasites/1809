
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCvHAc5hAn_APEevyjqqu0bJSpeSjvjspg",
  authDomain: "nasa-prica-chat.firebaseapp.com",
  projectId: "nasa-prica-chat",
  storageBucket: "nasa-prica-chat.firebasestorage.app",
  messagingSenderId: "729490246241",
  appId: "1:729490246241:web:bfa5eecf30173538b4f820",
  measurementId: "G-15VK1J0VJM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// VAŠI NALOZI
const MY_UID = "IeCJS0HMIOVVYC08yn9D5ViePQu1";
const HER_UID = "m5F6FHVVG0YVoOUK8P6gAUwRVTI3";

const loginSection = document.getElementById("login");
const chatSection = document.getElementById("chat");
const messages = document.getElementById("messages");

const loginError = document.getElementById("loginError");
const chatError = document.getElementById("chatError");

let stopListening = null;

// PRIJAVA
document.getElementById("loginButton").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  loginError.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    loginError.textContent = "Prijava nije uspela. Proveri email i lozinku.";
  }
});

// PRAĆENJE PRIJAVE
onAuthStateChanged(auth, (user) => {
  if (stopListening) {
    stopListening();
    stopListening = null;
  }

  if (!user) {
    loginSection.hidden = false;
    chatSection.hidden = true;
    messages.replaceChildren();
    return;
  }

  if (user.uid !== MY_UID && user.uid !== HER_UID) {
    signOut(auth);
    loginError.textContent = "Ovaj nalog nema pristup razgovoru.";
    return;
  }

  loginSection.hidden = true;
  chatSection.hidden = false;

  listenForMessages();
});

// UČITAVANJE PORUKA UŽIVO
function listenForMessages() {
  const messagesRef = collection(
    db,
    "chats",
    "private",
    "messages"
  );

  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "asc")
  );

  stopListening = onSnapshot(messagesQuery, (snapshot) => {
    messages.replaceChildren();

    snapshot.forEach((doc) => {
      const data = doc.data();

      const bubble = document.createElement("div");
      bubble.className =
        "message " +
        (data.senderId === auth.currentUser.uid ? "mine" : "theirs");

      const content = document.createElement("div");
      content.textContent = data.text || "";

      const time = document.createElement("small");

      if (data.createdAt) {
        time.textContent = data.createdAt.toDate().toLocaleString("sr-RS");
      } else {
        time.textContent = "Šalje se...";
      }

      bubble.appendChild(content);
      bubble.appendChild(time);
      messages.appendChild(bubble);
    });

    messages.scrollTop = messages.scrollHeight;

  }, (error) => {
    chatError.textContent = "Greška pri učitavanju poruka: " + error.message;
  });
}

// SLANJE PORUKA
document.getElementById("messageForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text || !auth.currentUser) return;

  const senderId = auth.currentUser.uid;
  const recipientId = senderId === MY_UID ? HER_UID : MY_UID;

  chatError.textContent = "";

  try {
    input.disabled = true;

    await addDoc(
      collection(db, "chats", "private", "messages"),
      {
        senderId: senderId,
        recipientId: recipientId,
        text: text,
        createdAt: serverTimestamp()
      }
    );

    input.value = "";

  } catch (error) {
    chatError.textContent = "Poruka nije poslata: " + error.message;
  } finally {
    input.disabled = false;
    input.focus();
  }
});

// ODJAVA
document.getElementById("logoutButton").addEventListener("click", async () => {
  await signOut(auth);
});
