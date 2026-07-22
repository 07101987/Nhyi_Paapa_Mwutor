const CACHE_NAME = "shapes-adventure-platform-v9-self-taught-lessons";
const APP_SHELL = [
  "./",
  "./index.html",
  "./reset-cache.html",
  "./manifest.webmanifest",
  "./css/styles.css?v=20260722-self-taught-lessons",
  "./js/app.js?v=20260722-self-taught-lessons",
  "./js/data/curriculum.js",
  "./js/data/badges.js",
  "./js/services/db.js",
  "./js/services/pwa.js",
  "./js/services/rewards.js",
  "./js/services/speech.js",
  "./js/services/utils.js",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-learning-events") {
    event.waitUntil(Promise.resolve());
  }
});
