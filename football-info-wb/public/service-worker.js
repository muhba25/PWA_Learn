importScripts('/workbox-v5/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);

} else {
    console.log(`Workbox gagal dimuat`);
}

///Precaching App Shell
workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/group.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
]);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('https://crests.football-data.org/'),
    new workbox.strategies.StaleWhileRevalidate()
)

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'stylesheet'
    })
);

workbox.routing.registerRoute(
    new RegExp('/js/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'js'
    })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.StaleWhileRevalidate(
    {
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('/group.html*'),
  new workbox.strategies.NetworkFirst(
    {
        cacheName: 'urlparamgroup',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('/team.html*'),
  new workbox.strategies.StaleWhileRevalidate(
    {
        cacheName: 'urlparamteam',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
