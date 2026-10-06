// Keeps the site's heavy, rarely-changing files on the visitor's device so
// repeat visits don't re-download them. Pages themselves always come from
// the network, so a new deploy is never hidden behind a stale cache.
//
//   /_next/static/*  cache first: filenames are content-hashed, never change
//   /photos/*        cache, then refresh in the background for next time
//
// Bump VERSION to drop everything cached by an older worker.

const VERSION = "v1";
const CACHE = `site-${VERSION}`;
const base = new URL(self.registration.scope).pathname;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith(`${base}_next/static/`)) {
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith(`${base}photos/`)) {
    event.respondWith(staleWhileRevalidate(request, event));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  const refresh = fetch(request).then((res) => {
    if (res.ok) cache.put(request, res.clone());
    return res;
  });
  if (hit) {
    event.waitUntil(refresh.catch(() => {}));
    return hit;
  }
  return refresh;
}
