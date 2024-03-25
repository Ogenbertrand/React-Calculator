self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('static').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/src/index.css',
                '/src/index.js',
                '/src/components/Wrapper.css',
                '/src/components/Wrapper.jsx',
                '/src/components/Screen.css',
                '/src/components/Screen.jsx',
                '/src/components/ButtonBox.jsx',
                'https://fonts.googleapis.com/css2?family=Montserrat&display=swap'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response;
            return fetch(event.request);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('dynamic-content-v1').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return (
                    response ||
                    fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                );
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== 'static' && key !== 'dynamic-content-v1')
                    .map((key) => caches.delete(key))
            );
        })
    );
});