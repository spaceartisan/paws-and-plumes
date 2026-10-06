# Paws & Plumes v0.3.0

A traditional top-down Renaissance-fantasy cat RPG built for GitHub Pages. The target remains closer to **Tibia / RuneScape-style adventuring** than to a conventional mobile game: phone support changes the controls and layout, not the game structure.

## Game flow

1. Title screen / main menu.
2. Character select with three independent local save slots.
3. Character creation: name, coat and starting upbringing.
4. Enter a persistent top-down world and physically walk to NPCs, resources and enemies.
5. Character progress is saved automatically and can be resumed from the title screen.

## v0.3.0 — living-world + audio pass

The world is intentionally less static now:

- Named NPCs wander around their home area instead of standing on one coordinate forever.
- Additional non-interactive townsfolk move through Port Felin so the hub feels inhabited.
- NPCs periodically speak short ambient lines in-world.
- Bandits and the bristleback patrol, acquire nearby players and pursue them.
- Moving combat targets remain tracked while the player closes into attack range.
- Player/NPC idle and movement bobbing adds motion even when sprites use the current single-frame strip.
- Resource nodes sway subtly.
- Cloud shadows and airborne dust/pollen drift over the map.
- Gathering and combat create particles and floating item/damage/XP/crown feedback.
- Wilderness and town use different looping ambience.
- A Renaissance-flavored Port Felin music loop plays after the first user interaction.
- Footsteps, sword impacts, damage, gathering, coins, quests, UI clicks and level-ups now have effects.
- Music, ambience and effects have independent volume controls plus a quick mute button in the HUD.
- Audio pauses when the page/app is backgrounded.

## Existing playable systems

- Tap/click-to-move world navigation; WASD and arrow keys also work on desktop.
- No energy system, daily timer, gacha currency or separate battle screen.
- Tap NPCs and world objects to walk into interaction range automatically.
- Real-time simple combat with auto-attacks in range, a manual Flourish ability and food/tonic hotkeys.
- Gathering directly in the world: rosemary, river reeds, grapes, oak and iron.
- Foraging, Woodcutting, Mining, Fencing and Defense progress through use.
- Smithing, Tailoring, Alchemy and general Crafting stations.
- Fishing and Cooking are represented in the skill model for later expansion.
- Guild quest with world-based objectives and turn-in.
- Inventory, equipment, quest journal, skills panel and minimap.
- Merchant, guildmaster, smith and apothecary interactions.
- Adventure level plus independent use-based skill levels.
- Three characters with separate inventory, position, quests, equipment and world state.
- Enemy respawns and resource recovery.

## Audio authoring

The v0.3 audio files were authored locally with the supplied **Csound** tools from `DEV_TOOLS/audio.zip`, then compressed to OGG for GitHub Pages/mobile use. The project does not depend on an external audio CDN.

Runtime audio lives in `assets/audio/`.

## Other DEV_TOOLS authoring

- **Inkscape 1.4**: title scene, world tiles, cat sprite strip and character portraits from editable SVG sources.
- **Tiled 1.12.2**: editable/exported `assets/maps/port_felin_world.tmx` → `port_felin_world.json`.

Editable art remains under `assets/src/world/` and the editable Tiled map remains beside the runtime JSON.

## Install / PWA behavior

v0.3.0 performs a one-time PWA identity cleanup. The early prototypes had no explicit manifest `id`, so supporting browsers could identify them by `start_url` and decide the prototype was already installed. v0.3 now uses the explicit stable identity `./paws-and-plumes-rpg` and keeps that identity for future releases.

The title screen displays **Install App** when Chromium supplies an install prompt. Settings also includes:

- install status,
- **Check for Update**, and
- **Refresh App Files** to clear old Paws & Plumes caches and reload the current deployment.

The service worker is versioned and uses network-first navigation so a new GitHub Pages deployment is less likely to be hidden behind stale HTML. Static art/audio remains cached for fast/offline reuse.

If an early prototype icon is still installed on the device, it can coexist with v0.3 because this build has a corrected identity. Remove the old prototype from the OS/browser whenever convenient.

## Controls

### Phone / touch

- Tap terrain to walk.
- Tap NPCs, enemies or resources to approach/interact.
- Bottom hotbar: attack, Flourish, tonic, bread, contextual interact.
- Lower-left button opens the character panel on small screens.
- Speaker button toggles audio.
- Lower-right menu opens the game menu.

### Desktop

- Click-to-move or WASD / arrow keys.
- `1–5` activate hotbar actions; `E` also performs contextual interact.
- `Esc` opens the game menu.

## Deploy to GitHub Pages

Upload the contents of this folder to a GitHub repository. In **Settings → Pages**, publish the branch containing `index.html`, normally from the repository root. No build step or server runtime is required.

## Save behavior

Character saves remain in browser `localStorage` and are preserved from v0.2. Clearing site data removes local characters. Audio preferences are stored separately in local storage.
