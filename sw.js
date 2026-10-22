const CACHE_NAME = 'my-workout-simple-v4-sunday-anterior';
const APP_FILES = ["./", "./index.html", "./app.css", "./app.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-180.png", "./exercise-art/a-bench.svg", "./exercise-art/a-incline.svg", "./exercise-art/a-fly.svg", "./exercise-art/a-press.svg", "./exercise-art/a-lateral.svg", "./exercise-art/a-cable-lateral.svg", "./exercise-art/a-curl.svg", "./exercise-art/a-hammer.svg", "./exercise-art/a-squat.svg", "./exercise-art/a-lunge.svg", "./exercise-art/a-extension.svg", "./exercise-art/a-decline-crunch.svg", "./exercise-art/a-leg-raise.svg", "./exercise-art/p-lat.svg", "./exercise-art/p-row.svg", "./exercise-art/p-chestrow.svg", "./exercise-art/p-wide-row.svg", "./exercise-art/p-rear.svg", "./exercise-art/p-pushdown.svg", "./exercise-art/p-overhead.svg", "./exercise-art/p-rdl.svg", "./exercise-art/p-hip.svg", "./exercise-art/p-curl.svg", "./exercise-art/p-lying-curl.svg", "./exercise-art/p-calf.svg", "./exercise-art/p-extension.svg", "./exercise-art/p-kickback.svg", "./exercise-art/a-dips.svg", "./exercise-art/custom.svg"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) {const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));}
    return response;
  })));
});
