// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyALYtdua5TsOHOCmH2CGB943fdJD63BbS0",
  authDomain: "flashnews24-51c47.firebaseapp.com",
  projectId: "flashnews24-51c47",
  storageBucket: "flashnews24-51c47.firebasestorage.app",
  messagingSenderId: "585448664344",
  appId: "1:585448664344:web:e88275c1470dad9b97426d",
  measurementId: "G-TFYSDH8M2J"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle =
    payload.notification?.title || 'Flash News';

  const notificationOptions = {
    body:
      payload.notification?.body || 'Breaking news update',
   icon: 'https://hed3900.github.io/flashnews-app/icon-192.png''
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
self.addEventListener("notificationclick", function(event) {

event.notification.close();

const url = event.notification.data?.url || "https://hed3900.github.io/flashnews-app/";

event.waitUntil(

clients.openWindow(url)

);

});
