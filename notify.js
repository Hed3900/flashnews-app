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

const FEED_URL =
"https://www.flashnews24.site/feeds/posts/default?alt=rss";

async function checkNews(){

const feed = await parser.parseURL(FEED_URL);

const latest = feed.items[0];

const oldPost =
fs.readFileSync(
"lastpost.txt",
"utf8"
);

if(oldPost === latest.link){

console.log("No New Post");

return;

}
const message = {
  notification: {
    title: "🚨 Breaking News",
    body: latest.title
  },
  topic: "breaking-news",
  webpush: {
    fcmOptions: {
      link: latest.link
    }
  }
};

try {

  await messaging.send(message);

  console.log("Notification Sent");

  fs.writeFileSync(
    "lastpost.txt",
    latest.link
  );

} catch (err) {

  console.error(err);

}

}

checkNews();
