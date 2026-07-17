import admin from "firebase-admin";
import Parser from "rss-parser";
import fs from "fs";

const parser = new Parser();

const serviceAccount = JSON.parse(
process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

const messaging = admin.messaging();
const db = admin.firestore();
const FEED_URL =
"https://www.flashnews24.site/feeds/posts/default?alt=rss";

async function checkNews(){

const feed = await parser.parseURL(FEED_URL);

const latest = feed.items[0];

const docRef = db.collection("settings").doc("lastPost");
const doc = await docRef.get();
const oldPost = doc.exists ? doc.data().link : "";
console.log("Latest RSS:", latest.link);
console.log("Firestore:", oldPost);

if (oldPost === latest.link) {
    console.log("No New Post");
    return;
}
let image = "https://www.flashnews24.site/favicon.ico";

if (latest.content) {
  const match = latest.content.match(/<img[^>]+src="([^"]+)"/i);
  if (match) {
    image = match[1];
  }
}
console.log("Image URL:", image);
const message = {
  topic: "all",

  notification: {
    title: latest.title,
    body: latest.contentSnippet || "Tap to read the full story"
  },

  data: {
    link: latest.link,
    articleId: latest.link
  },

  webpush: {
    notification: {
      icon: "https://www.flashnews24.site/favicon.ico",
      image: image
    },
    fcmOptions: {
      link: latest.link
    }
  },

  android: {
    priority: "high",
    notification: {
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      imageUrl: image
    }
  }
};
const snapshot = await db.collection("tokens").get();

const tokens = [];

snapshot.forEach((doc) => {
  const data = doc.data();
  if (data.token) {
    tokens.push(data.token);
  }
});
try {

const response = await messaging.sendEachForMulticast({
  tokens: tokens,
  notification: message.notification,
  webpush: message.webpush,
    android: message.android
});

console.log("Notification Response:");
console.log(JSON.stringify(response, null, 2));

await docRef.set({
  link: latest.link,
  title: latest.title,
  updatedAt: Date.now()
});
  
} catch (err) {
  console.error("Notification Error:", err);
}

}

checkNews();
