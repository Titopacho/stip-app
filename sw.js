const CACHE='stip-v2';

self.addEventListener('install', e=>{
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e=>{
  // Pass through all requests
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
