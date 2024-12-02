const CACHE_NAME = 'restaurant-catalog-v1';
const URLsToCache = [
  '/',
  '/index.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/styles/main.css',
  '/styles/responsive.css',
  '/scripts/index.js',
  '/scripts/routes.js',
  '/scripts/data/restaurant-source.js',
  '/scripts/utils/sw-register.js',
  '/scripts/views/pages/home.js',
  '/scripts/views/pages/detail.js',
  '/scripts/views/pages/favorite.js',
  '/scripts/views/templates/template-creator.js',
  'https://restaurant-api.dicoding.dev/images/medium/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(URLsToCache);
      })
  );
});

// Aktifkan Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }


        return fetch(event.request).then((networkResponse) => {
          if (event.request.url.indexOf('https://restaurant-api.dicoding.dev/') === -1) {
            return networkResponse;
          }

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          return networkResponse;
        });
      })
  );
});
