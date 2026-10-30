
importScripts("https://www.gstatic.com/firebasejs/13.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/13.1.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCvHAc5hAn_APEevyjqqu0bJSpeSjvjspg",
  authDomain: "nasa-prica-chat.firebaseapp.com",
  projectId: "nasa-prica-chat",
  storageBucket: "nasa-prica-chat.firebasestorage.app",
  messagingSenderId: "729490246241",
  appId: "1:729490246241:web:bfa5eecf30173538b4f820",
  measurementId: "G-15VK1J0VJM"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Naš mali svet ❤️";
  const options = {
    body: payload.notification?.body || "Kako si danas? ❤️",
    icon: "https://asterasites.github.io/1809/favicon.ico",
    data: {
      url: "https://asterasites.github.io/1809/"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(
      event.notification.data?.url ||
      "https://asterasites.github.io/1809/"
    )
  );
});
