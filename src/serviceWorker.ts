const CACHE_NAME = 'tictactoe-v1';
const urlsToCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'/icons/icon-192x192.png',
	'/icons/icon-512x512.png'
];

self.addEventListener('install', (event: any) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => cache.addAll(urlsToCache))
	);
});

self.addEventListener('fetch', (event: any) => {
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request))
	);
}); 