const CACHE='paws-plumes-v020';
const ASSETS=[
  './','./index.html','./style.css','./game.js','./manifest.webmanifest',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './assets/world/title_scene.png','./assets/world/world_tiles.png','./assets/world/cat_sprites.png',
  './assets/world/portrait_orange.png','./assets/world/portrait_tuxedo.png','./assets/world/portrait_gray.png',
  './assets/maps/port_felin_world.json'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match('./index.html'))));});
