// cleanup service worker: unregister itself and then do nothing

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() =>
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          // reload each open tab so it stops using SW
          client.navigate(client.url);
        });
      })
    )
  );
});

// no fetch handler at all
