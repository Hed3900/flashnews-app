const CACHE_NAME = "flashnews-v20260717";

const urlsToCache = [

"/",

"/index.html",

"/manifest.json",

"/icon.png"

];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(urlsToCache);

})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request);

})

.catch(() => {

return caches.match("/index.html");

})

);

});
