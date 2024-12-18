// Nome del cache
const CACHE_NAME = 'convertitore-cache-v1';

// File da mettere in cache
const URLS_TO_CACHE = [
  '/index.html',
  '/convertitore_yen_euro.html',
  '/style.css', // Se hai un file di stile
  '/script.js', // Se hai uno script separato
  '/manifest.json', // Se usi un manifesto
];

// Installazione del Service Worker e caching dei file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Apertura del cache:', CACHE_NAME);
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Intercettazione delle richieste di rete
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se il file è nella cache, ritorna il file dalla cache
      return response || fetch(event.request);
    })
  );
});

// Pulizia della cache vecchia durante l'aggiornamento del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Cancellazione della cache vecchia:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
