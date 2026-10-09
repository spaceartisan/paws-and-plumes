const CACHE='paws-plumes-v0200-20261009';
const CORE=[
  './','./index.html','./style.css','./game.js','./manifest.webmanifest',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './assets/world/title_scene.png','./assets/world/world_tiles.png','./assets/world/interior_tiles.png','./assets/world/dungeon_tiles.png','./assets/world/cat_sprites.png',
  './assets/world/portrait_orange.png','./assets/world/portrait_tuxedo.png','./assets/world/portrait_gray.png',
  './assets/maps/port_felin_world.json','./assets/maps/bellflower_vale.json','./assets/maps/guild_hall.json','./assets/maps/ironpaw_forge.json','./assets/maps/warm_saucer.json','./assets/maps/mercato.json','./assets/maps/felin_exchange.json','./assets/maps/quarry_underworks.json',
  './assets/audio/music_port_felin.ogg','./assets/audio/ambience_town.ogg','./assets/audio/ambience_wild.ogg','./assets/audio/ambience_rain.ogg','./assets/audio/ambience_dungeon.ogg',
  './assets/audio/ui_click.ogg','./assets/audio/footstep.ogg','./assets/audio/sword_hit.ogg','./assets/audio/hurt.ogg',
  './assets/audio/gather.ogg','./assets/audio/coin.ogg','./assets/audio/quest.ogg','./assets/audio/level_up.ogg',
  './assets/audio/fish_splash.ogg','./assets/audio/cook_sizzle.ogg','./assets/audio/loot_pickup.ogg',
  './assets/audio/wood_chop.ogg','./assets/audio/mine_strike.ogg','./assets/audio/discover.ogg',
  './assets/audio/guard_block.ogg','./assets/audio/enemy_warning.ogg','./assets/audio/bow_shot.ogg','./assets/audio/arquebus_shot.ogg','./assets/audio/arcane_bolt.ogg','./assets/audio/arcane_burst.ogg','./assets/audio/festival_bell.ogg'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('paws-plumes-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));return response}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>{
    const update=fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>cached);
    return cached||update;
  }));
});
