# Paws & Plumes v0.20.0 — Weatherwise Wanderer

This release extends **Living Weather** into a small, optional fieldcraft expedition, while preserving the same traditional cat RPG, character slots, worlds, saves, authored assets, and GitHub Pages deployment.

## New in v0.20

- **Weatherwise Wanderer** is a permanent side quest from the **Port Felin Town Bell**. Complete Guildmaster Luca’s first road commission to unlock it. After **accepting** the bellkeeper's commission, make **two Silver Dace fishing casts in River Rain**, harvest **two rosemary or lavender patches in Low Mist**, and defeat **one outdoor enemy in Crosswind**. Actions before accepting, in interiors, or under the wrong weather do not count. All three objectives use the existing field interaction / combat systems, not a new mini-game. Return to the bell for **95 crowns, 80 Adventure XP, 25 Guild Renown**, and the **Oilskin Field Coat**.
- The **Oilskin Field Coat** gives **+2 Defense** and blocks **6 of the 8 percentage points** lost to outdoor Crosswind when firing bows or crossbows (leaving a 2-point penalty). It doesn't improve clear-weather accuracy. The effect appears in inventory and equipment descriptions.
- An accessible **Field Almanac** is included in the existing **World Atlas** tab. Tap **Read weather forecast** for the next four three-hour weather windows. Port Felin is always available; Bellflower Vale forecasts are added after discovering the vale. The Town Bell remains a forecast source. No additional hotbar button or HUD indicator was added.
- **Weather-conscious townsfolk** comment on rain, mist, and wind, and a few civilians keep to shelter in rainy or misty daytime conditions. Outdoor world behavior remains fully local and deterministic where appropriate, with no real weather APIs.
- A permanent **Town Note: Fieldcraft in Three Weathers** is recorded when the field quest is turned in.

## Compatibility and deployment

Upload the contents of the `PawsAndPlumes` directory to the root of the GitHub Pages deployment. There is no build step. **The existing save key is still `paws_plumes_traditional_v020`**, and **the PWA manifest ID is still `./paws-and-plumes-rpg`**, so characters and the already installed app remain the same. The new quest fields migrate on character load without deleting older world, equipment, quest, bank, or reputation data. The service-worker cache is updated to `paws-plumes-v0200-20261009`.

## Evidence and limits

See `QA_REPORT.md` for browser tests and `docs/screenshots/v020_almanac_390.png`, `v020_fieldcraft_320.png`, and `v020_crosswind_390.png` for actual in-browser captures. Gameplay regression was run in headless desktop Chromium at mobile and desktop viewports using in-memory copies of the **actual exported maps and images** because sandbox policy blocks network navigation to localhost. It has not been field-tested for audio balance or on a physical phone.

---

# Paws & Plumes v0.19.0 — Living Weather & Field Conditions

The real-time open world now has deterministic, changing local weather tied to each character’s **persistent in-game clock**. The weather cycle is entirely part of the traditional RPG world: it does **not** depend on phone location, real-world weather, daily login, or external APIs.

## What's new

- Outdoor regions change between **Fair Skies**, **River Rain**, **Low Mist**, and **Crosswind** approximately every **three in-game hours** (90 seconds at the current clock rate). The same date/period/region always yields the same forecast, even after reloading an older character.
- **Rain** visually darkens the open world and produces animated diagonal rainfall with a new Csound-authored stereo rain ambience. Each Silver Dace fishing interaction outdoors yields **one extra fish**, stacking with the existing River Day civic bonus.
- **Mist** overlays low-lying fog and reduces the range at which hostile enemies first notice the character to roughly **66%** of normal. Attacking an enemy still actively engages it; no stealth skill requirement or menu toggle is added.
- **Crosswind** adds animated gusts and reduces ranged accuracy by **eight percentage points** outdoors (before the existing accuracy limits). Fencing and Aethercraft accuracy remain unchanged.
- The HUD now identifies current weather, with **Sheltered** displayed inside buildings and the dungeon. The physical **Port Felin Town Bell** also shows a four-part weather forecast with effects, using the current world clock and region. Other festivals, shops, combat and wayshrines continue as before.
- Graphics respect `prefers-reduced-motion` by rendering static weather when reduced motion is requested.

## Authoring and assets

The new rain ambience was locally synthesized using **Csound 6.18 from `DEV_TOOLS/audio.zip`** and encoded as `assets/audio/ambience_rain.ogg`. Its editable score is at `assets/src/audio_v019/ambience_rain.csd`. Weather visuals use the existing Canvas rendering system, so no new map files or remotely hosted assets are necessary.

## Save / GitHub Pages compatibility

The project keeps the same original `paws_plumes_traditional_v020` save key, the same `./paws-and-plumes-rpg` PWA identity, and the same map coordinates / Tiled source files. Weather is derived from `world.timeMinutes`; there is **no new required save field**. The service worker is versioned as `paws-plumes-v0190-20261009` and precaches the new OGG for offline play.

## Testing

See `QA_REPORT.md` for direct browser checks. Actual screenshots: `docs/screenshots/v019_rain_mobile.png`, `v019_forecast_mobile.png`, `v019_mist_small_phone.png`, `v019_indoors_mobile.png`.

---

# Paws & Plumes v0.18.0 — Combat Awareness & Field Loot

Paws & Plumes remains a traditional top-down Renaissance-fantasy cat RPG for GitHub Pages. **v0.18 is a focused combat/navigation quality pass** built directly on v0.17 Festival Week. All existing regions, events, quests, gear, characters and crafting systems remain intact.

## v0.18 highlights

### Enemy pursuit that understands obstacles
Enemies now reuse the actual A* navigation grid when their direct path to the player is obstructed. They can route around buildings and solid corners instead of indefinitely walking into walls. Pursuit routing is throttled and cached for mobile performance; unobstructed movement still takes the direct route. NPC and civilian schedules are preserved.

Hostile creatures now have a limited pursuit radius from their authored patrol point. Once an enemy strays too far, it breaks combat, navigates home, and restores its patrol state. This prevents a single accidentally aggroed enemy from following a character across the world. A small exclamation mark identifies alert enemies.

### Real solid cover in combat
Ranged enemies can no longer shoot through walls, tables or impassable terrain. The same restriction applies to player bows, crossbows, and Aethercraft spells. When a target is within nominal attack range but hidden behind cover, the game routes the character toward a clear firing position. Target UI identifies the blocked sightline. Area splash cannot pass through solid cover either.

Blocked manual special attacks do **not** consume their cooldown. Clear shots still consume the normal ammunition or Focus and behave as before. Existing Guard, heavy telegraph, Ranger and other discipline mechanics remain unchanged.

### Optional manual field-loot sweep
The normal physical ground-loot system remains. If several loot piles are within roughly 90 world pixels, pressing **Interact (hotbar 5, E or L)** gathers all nearby piles in one action, with one concise summary of the crowns and items collected. The Interact hotkey gains a subtle gold outline while loot is in range. Distant loot is left untouched. Individual tapped loot piles are still supported, and there is no automatic pickup or energy mechanic.

### Save and deployment compatibility
This release keeps the original **`paws_plumes_traditional_v020`** save key and the same **`./paws-and-plumes-rpg`** PWA identity. No new required saved fields or destructive migration are introduced. The service-worker cache advances to `paws-plumes-v0180-20261009` so redeploying updates the existing installed app.

## Validation
See `QA_REPORT.md` for detailed browser regression results and `docs/screenshots/v018_*` for the actual phone-sized captures. Editable TMX, SVG and audio source files from prior versions remain included.

---

# Paws & Plumes v0.17.0 — Festival Week & Roaming Dispatches

Paws & Plumes is a traditional top-down browser RPG for GitHub Pages, designed like a compact Tibia/RuneScape-style adventure that also controls comfortably on a phone. The game uses persistent characters, direct world movement, use-based skills, quests, gathering, crafting, banking, dungeons, and combat that happens in the world rather than on a separate battle screen.


## v0.17 highlights

### The Bellkeeper's Week
The Town Bell is now a real civic quest giver rather than only a schedule board. After securing Bellflower Vale, a character can accept **The Bellkeeper's Week**, a permanent quest that asks them to participate in the full festival cycle: buy from the Market Day stall, turn in a contract during Guild Muster, make two River Blessing catches, and gather three lavender during Bellflower Fair. Completing the circuit awards crowns, Adventure XP, Guild Renown, Bellflower Favor, and the **Bellkeeper's Festival Doublet**. The doublet is a hybrid defensive outfit with modest melee-critical, ranged-accuracy, magic-accuracy, and Focus bonuses.

Completing the quest also records a new **Town Note: The Seven-Day Festival Cycle**. Progress is based on actions actually performed during each event, not merely visiting the calendar on the correct day.

### Roaming event encounters
Calendar events now change who is physically present in the world. Event enemies are authored into the Tiled maps and only become active during their matching event or while a matching accepted dispatch is still active.

- **Market Day** — three masked Market Cutpurses prowl Port Felin's south approach.
- **Guild Muster** — Redtail Saboteurs press toward Eastroad while the guild is occupied.
- **River Blessing** — Fox Poachers appear along the riverbanks.
- **Bellflower Fair** — Sable Deserters threaten fair traffic in Bellflower Vale.

The Market Cutpurse has a new Inkscape-authored masked-cat sprite; the other event enemies use existing faction silhouettes so they remain immediately readable at phone scale.

### Temporary guild dispatches
The Guild contract board gains four event-only jobs: **Market Day Watch**, **Muster Saboteurs**, **River Poachers**, and **Vale Fair Security**. A dispatch can only be accepted while its event is active. Once accepted, however, its enemies remain available until the contract is completed or abandoned—even if the in-game calendar moves into the next day. This prevents the player from being stranded by an event boundary.

The new dispatches pay Adventure XP and Guild Renown; Vale Fair Security also grants Bellflower Favor. Event target kills use the same physical ground-loot and respawn systems as normal enemies.

### Event readability and audio
The HUD now shows the currently active world event beside the day/time display. The Town Bell has a dedicated locally synthesized **festival bell** cue, authored with Csound from `DEV_TOOLS/audio.zip`.

### Authored source updates
Port Felin and Bellflower Vale were updated in their editable TMX sources and exported through **Tiled 1.12.2 from DEV_TOOLS**. The Market Cutpurse sprite is retained as editable SVG under `assets/src/world/` and was rendered with **Inkscape 1.4**.


## v0.16 highlights

### Persistent in-game calendar
The existing world clock is now a persistent multi-day calendar instead of wrapping back to the same anonymous day. The HUD shows the current day and time, sleeping advances to the next seven-bells morning when appropriate, and wayshrine travel advances the same continuous calendar.

The seven-day cycle is **Bell Day, Market Day, Guild Day, River Day, Forge Day, Vale Day, Rest Day**. This is entirely in-game time; there are no real-world daily-login timers.

### Shop hours and routines
Major service NPCs now keep actual working hours. Bia, Luca, Neri, Saffron, Aurelia, Gesso, and Maribel can be visited after hours, but their business/service interfaces close until the next shift. Mina's Warm Saucer remains the dependable late-night refuge. Port Felin also has fewer wandering townsfolk late at night and becomes visibly busier during Market Day.

### World events
- **Port Felin Market Day** — traveling stall, extra street traffic, Neri fair pricing, Market Day fish pies, ammunition bundles.
- **Guild Muster** — repeatable guild contracts pay an additional 15% crowns for the in-game day.
- **River Blessing** — Silver Dace catches yield one guaranteed extra fish.
- **Bellflower Fair** — trusted cats receive reduced quartermaster prices from Maribel.

A physical **Town Bell & Calendar** in Port Felin explains the weekly schedule. The **Market Day Traveling Stall** is authored into the Tiled map but only exists as an interactable/visible world object while its event is active.


## v0.15 highlights

### Gilded Paw Renown and guild rank
Permanent commissions and repeatable guild contracts now build **Gilded Paw Renown**. Renown is character-specific and advances through five ranks:

- **Probationer** — starting rank.
- **Guild Paw** — 40 renown.
- **Roadwarden** — 100 renown.
- **Charterblade** — 200 renown.
- **Gilded Warden** — 350 renown.

Rank is not a class and does not replace skills or combat disciplines. It represents the guild's institutional trust in that character. Higher rank improves repeatable-contract crown payouts, Mercato buying/selling terms, and Guild Wayshrine travel priority. At Charterblade, for example, contract crowns are 15% higher, Neri gives 12% better market terms, and wayshrine travel time is reduced by 15%.

Guildmaster Luca changes his greeting as rank rises, the physical Guild Ledger now opens the standing record, and newly earned ranks have one-time guild stipends that must be claimed through Luca rather than being silently inserted into the inventory. The highest stipend includes a non-transferable **Gilded Warden Badge** trophy.

### Bellflower Favor
Bellflower now maintains a separate local reputation instead of treating the Vale as merely another quest map:

- **Stranger** — starting standing.
- **Vale Ally** — 50 favor.
- **Friend of the Vale** — 100 favor.
- **Vale Steward** — 175 favor.

Completing **Terms of the Vale** grants a large initial Favor award, while repeatable **Bellflower Patrol** contracts continue building it. Warden Maribel reacts differently as standing rises. Vale Allies gain access to **Bellflower Lavender Tea**, a local provision that restores both health and Focus; Friends of the Vale additionally unlock **Vale Field Rations**.

### Reputation-aware economy and travel
Reputation is connected to existing systems rather than being a decorative meter.

- Contract-board cards show rank-adjusted crown rewards and Renown/Favor rewards.
- Contract turn-ins apply the current guild-rank payout bonus.
- Neri's displayed purchase prices and sell offers update with Gilded Paw rank.
- Guild Wayshrine travel time is reduced by rank, while still advancing the world clock.
- The Quest Journal now begins with persistent Gilded Paw and Bellflower standing cards, progress bars, current perks, and distance to the next rank.

### Legacy migration
Existing v0.14 characters receive historical reputation from **already claimed permanent quests**. This preserves the significance of work completed before the reputation system existed. Repeatable-contract reputation is not guessed retroactively because old saves did not record completed-contract counts.

Migration is idempotent: once the reputation record exists, loading/migrating the character again does not award the historical total a second time. Previously earned rank stipends remain unclaimed until the player explicitly collects them from Luca.


## v0.14 highlights

### Exploration fog and atlas
The minimap is no longer automatically omniscient. Outdoor regions and the Quarry Underworks reveal in coarse exploration cells around the character as you physically travel. Enemies, resources, drops, and special landmarks remain hidden on the minimap until that part of the map has been charted.

A fifth in-game panel, **World Atlas**, now shows:

- current-region charting percentage,
- all named places the character has discovered,
- which discovered places are on the current map,
- tap-to-route buttons for same-map destinations using the existing A* pathfinder, and
- activation state for the wayshrine network.

This preserves the traditional exploration loop while making the expanded world easier to navigate on a phone.

### Guild wayshrine network
Three physical wayshrines now exist in authored maps:

- **Port Felin Wayshrine** beside the guild quarter,
- **Old Quarry Wayshrine** on the quarry road, and
- **Bellflower Wayshrine** in Bellflower Vale.

A shrine is **not** unlocked by quest progress, old discoveries, or save migration. The character must physically reach and activate it once. After at least two shrines have been activated, interacting with any active shrine allows travel to another active shrine. Travel advances the in-game clock (25 minutes between Port Felin and the quarry, 55 minutes for Bellflower routes) and cannot be used while actively fighting.

### Save compatibility and authored maps
Existing saves migrate by adding empty `world.exploredMap` and `world.waypoints` records. Old characters retain every quest, item, bank entry, discipline, map position, and world flag, but begin with no wayshrines activated so exploration is never granted retroactively.

The new Port Felin and Old Quarry shrines were authored in `port_felin_world.tmx`; the existing Bellflower shrine gained network metadata in `bellflower_vale.tmx`. Both maps were exported to runtime JSON using **Tiled 1.12.2 from `DEV_TOOLS` under Xvfb**.


## v0.13.1 hotfix

This focused update fixes an interior collision trap found in the **Warm Saucer** and hardens every map transition against similar problems.

- Warm Saucer entrance spawn moved from `(384, 410)` to the clear `(384, 470)` position.
- The previous spawn overlapped the padded collision region of the lower inn table.
- Every map load now checks whether the saved player position has valid navigation clearance. If not, the character is moved to the nearest safe A* node automatically. This also rescues characters already saved in the old bad inn position.
- Manual and path-following movement now slides along a free X/Y axis when diagonal movement hits an obstacle, reducing snagging on furniture and wall corners.
- All current map-transition spawn points were audited for navigation clearance.
- Each town interior was checked for a valid route from its entrance to its exit, primary NPCs, and service objects.
- Save key and PWA identity are unchanged.

## v0.13 highlights

### Tradecraft refinement
High-level crafting now has a material-refinement loop rather than ending when the first good equipment set is obtained.

At the new **Ironpaw Masterwork Bench** inside the authored Ironpaw Forge map, characters can refine:

- **Forge Charcoal** — 2 Oak Logs, Crafting 3.
- **Quarry Steel Billet** — 2 Iron Ore + 1 Forge Charcoal, Smithing 4.
- **Foxhide Lining** — 2 Red Fox Pelts + 2 River Reed, Tailoring 4.

Saffron's apothecary work now continues the chain:

- **Bellflower Oil** — 3 Bellflower Lavender + 1 Black Grape, Alchemy 4.
- **Aetherglass Lens** — 2 Aether Salt + 1 Bellflower Oil, Alchemy 5 / Crafting 4.

These refined materials are persistent inventory items, can be banked or sold, grant the appropriate trade-skill XP, and update normal crafted-item counters.

### A Maker's Mark
After completing **Terms of the Vale**, Bia Ironpaw offers a new permanent trade quest, **A Maker's Mark**.

The quest asks the character to demonstrate all three core guild trades by producing:

- 2 Quarry Steel Billets
- 1 Foxhide Lining
- 1 Bellflower Oil

Reward:

- 190 crowns
- 150 Adventure XP
- **Gilded Maker's Seal**

Claiming the quest unlocks the masterwork recipes at Bia's bench. Existing v0.12 characters that already completed Terms of the Vale receive A Maker's Mark as available after migration.

### Masterwork equipment
Masterworks consume the original equipment plus refined materials. They are upgrades to gear the player has already earned, not extra random drops.

- **Masterwork Quarry Sabre** — Attack 13 and +6% melee critical chance.
- **Reinforced Brigandine** — Defense 5 with a smaller ranged-accuracy penalty than the original brigandine.
- **Bellflower Recurve** — Attack 9, longer bow range, faster shot cycle, and +12% weapon accuracy.
- **Oiled Foxhide Jerkin** — Defense 3 and +13% ranged accuracy.
- **Aetherglass Wand** — Attack 10, Focus cost 3, strong magic accuracy, and modest armor penetration.
- **Aetherwoven Scholar Coat** — Defense 2, +14% magic accuracy, and +15 maximum Focus.

If the base item being upgraded is currently equipped, it is automatically replaced by the new masterwork. This prevents an equipped base item from surviving as an invisible duplicate after its inventory copy is consumed.

### Repeatable trade work
The Guild contract board now includes **Guild Steel Order** after A Maker's Mark is complete. It tracks only Quarry Steel Billets refined after the contract is accepted and rewards 118 crowns / 72 Adventure XP for three billets.

### Authored Forge update
The Ironpaw Forge TMX now contains a physical **Masterwork Bench** landmark layered over the existing work bench. It can be tapped/pathfound to like other world interactions and opens the refinement/masterwork interface directly.

## Existing game systems

- Traditional title screen, character selection/creation, and three persistent character slots.
- Continuous Port Felin region plus Bellflower Vale.
- Obstacle-aware A* tap pathfinding and desktop WASD/arrow movement.
- Enterable Guild Hall, Ironpaw Forge, Warm Saucer, Mercato, and Felin Exchange.
- Quarry Underworks dungeon with persistent gate/key/chest/boss progression.
- Fencing, Archery, and Aethercraft combat styles with optional combat disciplines.
- Gathering, Woodcutting, Mining, Fishing, Cooking, Smithing, Tailoring, Alchemy, and Crafting.
- Permanent quests and repeatable guild contracts, now tied into Gilded Paw Renown and Bellflower Favor.
- Physical ground loot and a rank-aware merchant buy/sell economy.
- Persistent bank/vault with safe banked crowns.
- NPC routines, Town Notes, day/night, music, ambience, and sound effects.
- Installable PWA with the same stable application identity used by prior releases.

## Controls

### Phone / touch

- Tap terrain to pathfind there.
- Tap NPCs, doors, enemies, resources, loot, benches, chests, signposts, and other world objects to route into interaction range automatically.
- Bottom hotbar provides Attack/Cast/Shoot, Flourish/Aimed Shot/Arc Burst, Guard, Tonic, and Interact.
- Inventory, Skills, Quests, Equipment, and the World Atlas remain in-game panels over the live world.
- The atlas can route to already discovered destinations on the current map; fast travel itself requires an activated wayshrine.

### Desktop

- **WASD / arrow keys** — move and cancel active tap navigation.
- **1** — attack / shoot / cast.
- **2** — Flourish / Aimed Shot / Arc Burst.
- **3** — Guard.
- **4** — use Red Tonic.
- **5 / E** — interact.
- **Escape** — game menu.

## GitHub Pages deployment

There is no build step or server runtime. Put the contents of this `PawsAndPlumes` folder at the root of the GitHub Pages branch/folder and enable Pages.

The PWA retains the stable `paws-and-plumes-rpg` application identity. The v0.15 service-worker cache is `paws-plumes-v0150-20261008`, so an existing installed copy updates in place rather than becoming a second app.

## Save compatibility

v0.15 deliberately retains the existing save key (`paws_plumes_traditional_v020`). Older characters migrate in place. Guild Renown and Bellflower Favor migrate alongside the existing exploration/fog state and wayshrine activations without resetting equipment, bank contents, disciplines, quest history, character identity, map location, or world state.

## Authored-source workflow

The project retains editable sources next to runtime exports.

- **Tiled 1.12.2 from `DEV_TOOLS`** was used under Xvfb to update `assets/maps/ironpaw_forge.tmx` with the Masterwork Bench and export the runtime JSON.
- Existing Inkscape-authored map/sprite sources remain under `assets/src/` and `assets/source/`.
- Existing Csound sources remain beside the locally authored audio effects.

See `QA_REPORT.md` for this release's regression results.
