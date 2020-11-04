const CACHE_NAME = "oleolemks-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/icon.png",
  "/pages/home.html",
  "/pages/contact.html",
  "/pages/member.html",
  "/pages/produk.html",
  "/css/materialize.css",
  "/js/materialize.js",
  "/js/nav.js",
  "/manifest.json",
  "/images/baje-wijen.jpeg",
  "/images/bumbu-coto.png",
  "/images/krupuk-bawang.jpg",
  "/images/losari-cok.jpg",
  "/images/markisa.jpg",
  "/images/otak2.jpg",
  "/images/sarung.jpg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/logo.jpg",
  "/brand.jpg",
  "/favicon.ico"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});