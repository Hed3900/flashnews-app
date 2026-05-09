importScripts(
'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'
);

importScripts(
'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js'
);

firebase.initializeApp({

apiKey: "AIzaSyALYtdua5TsOHOCMhcCGB943fdJD63BbS0",

authDomain:
"flashnews24-51c47.firebaseapp.com",

projectId:
"flashnews24-51c47",

storageBucket:
"flashnews24-51c47.firebasestorage.app",

messagingSenderId:
"685448664344",

appId:
"1:685448664344:web:e88275c1470dad9b97426d"

});

const messaging =
firebase.messaging();
