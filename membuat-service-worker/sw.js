const CACHE_NAME = "codepolitan-reader-lite-v5";
var urlsToCache = [
"/",
"/index.html",
"/js/main.js",
"/img/logo.png",
"/materialize/css/materialize.min.css",
"/materialize/js/materialize.min.js"];
 
self.addEventListener("install", function(event) {
  console.log("ServiceWorker: Menginstall..");
 
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

//EVENT FETCH OLD
// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       console.log("ServiceWorker: Menarik data: ", event.request.url);
 
//       if (response) {
//         console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//         return response;
//       }
 
//       console.log(
//         "ServiceWorker: Memuat aset dari server: ",
//         event.request.url
//       );
//       return fetch(event.request);
//     })
//   );
// });

//EVENT FETCH NEW
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        }
      );
    })
  );
});

//EVENT FETCH CACHE FIRST
// self.addEventListener('fetch', function(event) {
//    event.respondWith(
//       caches.match(event.request).then(function(response) {
//          return response || fetch(event.request);
//       })
//    );
// });

//EVENT FETCH NETWORK FIRST
// self.addEventListener('fetch', function(event) {
//    event.respondWith(
//       fetch(event.request)
//       .catch(function() {
//          return caches.match(event.request);
//       })
//    );
// });

//EVENT STALE WHILE REVALIDATE
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function(response) {
//         var fetchPromise = fetch(event.request).then(function(networkResponse) {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         })
//         return response || fetchPromise;
//       })
//     })
//   );
// });

//EVENT ACTIVATE
self.addEventListener('activate', function(event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});