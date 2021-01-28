// jshint esversion:6
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// workbox.routing.registerRoute(
//     ({request})=> request.destination === "image",
//     new workbox.strategies.CacheFirst()
// );
const CACHE  = 'Simon-game';
const cacheWhitelist = ['Simon-game'];
let resourcesToCache = ["./", "./img/game.png", "./game.js", "./sounds/wrong.mp3", "./sounds/blue.mp3", "./sounds/green.mp3", "./sounds/red.mp3", "./sounds/yellow.mp3", "./styles.css"];
// To install a service worker
self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open(CACHE).then(cache =>{
            return cache.addAll(resourcesToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });