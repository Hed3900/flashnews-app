// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD3iAhm2hzUabQf9TIfrSxa7o10tFCMmqA",
  authDomain: "flashnews24-5bfd6.firebaseapp.com",
  projectId: "flashnews24-5bfd6",
  storageBucket: "flashnews24-5bfd6.firebasestorage.app",
  messagingSenderId: "192814639105",
  appId: "1:192814639105:web:775cfcafeb0e0c38577800",
  measurementId: "G-M48NN30S6Z"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  const notificationTitle =
    payload.notification?.title || "Flash News";

  const notificationOptions = {
    body:
      payload.notification?.body || "Breaking news update",

    icon:
      "https://hed3900.github.io/flashnews-app/icon-192.png",

    image:
      "https://www.flashnews24.site/image.jpg",

    data: {
      url:
        payload.data?.url ||
        "https://hed3900.github.io/flashnews-app/"
    }
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});

self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  const url =
    event.notification.data?.url ||
    "https://hed3900.github.io/flashnews-app/";

  event.waitUntil(
    clients.openWindow(url)
  );

});
