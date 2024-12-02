const CACHE_NAME = 'restaurant-catalog-v1';
const URLsToCache = [
  '/',
  '/index.html',
  '/app.webmanifest',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
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

// Instalasi Service Worker dan caching awal
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
            return caches.delete(cacheName); // Hapus cache lama
          }
        })
      );
    })
  );
});

// Mengambil data dari cache dan jaringan
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Gunakan data dari cache jika tersedia
      }

      return fetch(event.request).then((networkResponse) => {
        if (!event.request.url.startsWith('https://restaurant-api.dicoding.dev/') &&
            event.request.url.indexOf(self.location.origin) === -1) {
          return networkResponse; // Abaikan caching untuk domain di luar aplikasi
        }

        // Simpan respons ke cache untuk permintaan di masa depan
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
      });
    }).catch(() => {
      // Menyediakan fallback untuk kasus offline (opsional)
      if (event.request.url.endsWith('.png')) {
        return caches.match('/icons/icon-192x192.png'); // Fallback ikon jika offline
      }
    })
  );
});

