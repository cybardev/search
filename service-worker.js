// @ts-nocheck
const cacheName = "cybarsearch";

self.addEventListener("install", (event) => {
    // Kick out the old service worker
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                "/",
                "/assets/images/cy-icon.png",
                "/assets/images/apple-icon-180.png",
                "/assets/images/apple-splash-1125-2436.jpg",
                "/assets/images/apple-splash-1136-640.jpg",
                "/assets/images/apple-splash-1170-2532.jpg",
                "/assets/images/apple-splash-1242-2208.jpg",
                "/assets/images/apple-splash-1242-2688.jpg",
                "/assets/images/apple-splash-1284-2778.jpg",
                "/assets/images/apple-splash-1334-750.jpg",
                "/assets/images/apple-splash-1536-2048.jpg",
                "/assets/images/apple-splash-1620-2160.jpg",
                "/assets/images/apple-splash-1668-2224.jpg",
                "/assets/images/apple-splash-1668-2388.jpg",
                "/assets/images/apple-splash-1792-828.jpg",
                "/assets/images/apple-splash-2048-1536.jpg",
                "/assets/images/apple-splash-2048-2732.jpg",
                "/assets/images/apple-splash-2160-1620.jpg",
                "/assets/images/apple-splash-2208-1242.jpg",
                "/assets/images/apple-splash-2224-1668.jpg",
                "/assets/images/apple-splash-2388-1668.jpg",
                "/assets/images/apple-splash-2436-1125.jpg",
                "/assets/images/apple-splash-2532-1170.jpg",
                "/assets/images/apple-splash-2688-1242.jpg",
                "/assets/images/apple-splash-2732-2048.jpg",
                "/assets/images/apple-splash-2778-1284.jpg",
                "/assets/images/apple-splash-640-1136.jpg",
                "/assets/images/apple-splash-750-1334.jpg",
                "/assets/images/apple-splash-828-1792.jpg",
                "/assets/images/manifest-icon-192.maskable.png",
                "/assets/images/manifest-icon-512.maskable.png",
                "/manifest.json",
                "/sitemap.xml",
                "/robots.txt",
                "/index.html",
                "/README.md",
                "/LICENSE",
                "/CNAME",
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    // Delete any non-current cache
    event.waitUntil(
        caches.keys().then((keys) => {
            Promise.all(
                keys.map((key) => {
                    if (![cacheName].includes(key)) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(cacheName).then(async (cache) => {
            const response = await cache.match(event.request);
            return (
                response ||
                fetch(event.request).then((networkResponse) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
            );
        })
    );
});
