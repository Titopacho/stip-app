const CACHE='stip-v1';
const ASSETS=['/','index.html','/manifest.json'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  if(e.request.url.includes('firebasejs')||
     e.request.url.includes('googleapis')||
     e.request.url.includes('generativelanguage')||
     e.request.url.includes('tabler')){
    return fetch(e.request);
  }
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
