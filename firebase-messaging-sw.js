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
      "https://www.flashnews24.site/favicon.ico",

    image: payload.notification?.image

    data: {
  url: payload.fcmOptions?.link ||
       payload.data?.link ||
       "https://www.flashnews24.site/"
  }

  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const url = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        client.navigate(url);
        client.focus();
        return;
      }
      return clients.openWindow(url);
    })
  );
});
