// jshint esversion:6
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.routing.registerRoute(
    ({request})=> request.destination === "image",
    new workbox.strategies.CacheFirst()
);

self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open("static").then(cache =>{
            return cache.addAll(["./", "./game.js", "./sounds/wrong.mp3", "./sounds/blue.mp3", "./sounds/green.mp3", "./sounds/red.mp3", "./sounds/yellow.mp3", "./styles.css"]);
        })
    );
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});