const CACHE='paws-plumes-v0260-20261010';
const CORE=[
  './','./index.html','./style.css','./game.js','./manifest.webmanifest',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './assets/world/scenery/lantern.png','./assets/world/scenery/planter.png','./assets/world/scenery/flowerbed.png','./assets/world/scenery/barrels.png',
  './assets/world/scenery/bench.png','./assets/world/scenery/hedge.png','./assets/world/scenery/flowerpatch.png','./assets/world/scenery/crate.png',
  './assets/world/scenery/rowan.png','./assets/world/scenery/fence.png','./assets/world/scenery/cobble_edge.png',
  './assets/world/wilderness/river_bank.png',
  './assets/world/wilderness/moss_boulder.png',
  './assets/world/wilderness/pine_bough.png',
  './assets/world/wilderness/wildflowers.png',
  './assets/world/wilderness/lavender_cluster.png',
  './assets/world/wilderness/mushroom_cluster.png',
  './assets/world/wilderness/oak_canopy.png',
  './assets/world/wilderness/quarry_rubble.png',
  './assets/world/wilderness/forest_edge.png',
  './assets/world/wilderness/aqueduct_fragment.png',
  './assets/world/wilderness/river_reeds.png',
  './assets/world/wilderness/fern_bank.png',
  './assets/world/wilderness/bramble.png',
  './assets/world/wilderness/fallen_log.png',
  './assets/world/title_scene.png','./assets/world/world_tiles.png','./assets/world/animation_fx.png','./assets/world/directional_sprites.png','./assets/src/world/walk_cycles.svg',
  './assets/world/facades/guild.png','./assets/world/facades/smith.png','./assets/world/facades/inn.png',
  './assets/world/facades/market.png','./assets/world/facades/bank.png','./assets/world/facades/quarry_hut.png','./assets/world/interior_tiles.png','./assets/world/dungeon_tiles.png','./assets/world/cat_sprites.png',
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
