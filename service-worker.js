// Evah Café Checklist - Service Worker
// Estratégia: cache-first pros assets do app, network-first pras fontes externas
// Bump CACHE_VERSION quando atualizar o app pra forçar refresh nos celulares

const CACHE_VERSION = 'evah-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

// Instalação: baixa o app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Ativação: limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first com fallback de rede; fontes do Google ficam em cache dinâmico
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Só intercepta GET
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((response) => {
        // Só cacheia respostas válidas (status 200, mesmo origin ou CORS basic/cors)
        if (!response || response.status !== 200) return response;
        const respClone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => {
          // Cacheia fontes do Google e qualquer asset que respondeu OK
          cache.put(req, respClone);
        });
        return response;
      }).catch(() => {
        // Offline e sem cache: tenta servir index.html como fallback navegacional
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
