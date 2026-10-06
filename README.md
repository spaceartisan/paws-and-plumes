# Paws & Plumes v0.4.0

A traditional top-down Renaissance-fantasy cat RPG built for GitHub Pages. The design target remains closer to **Tibia / RuneScape-style adventuring** than to a conventional mobile game: phone support changes the controls and layout, not the game structure.

## Game flow

1. Title screen / main menu.
2. Character select with three independent local save slots.
3. Character creation: name, coat and starting upbringing.
4. Enter a persistent top-down world and physically walk to NPCs, resources, fishing spots, loot and enemies.
5. Character progress is saved automatically and can be resumed from the title screen.

## v0.4.0 — interconnected RPG loop

This pass turns several previously separate systems into a more traditional world-based progression loop.

### Fishing and Cooking

- Fishing is now an active use-based skill rather than a placeholder.
- Two authored fishing spots were added to the Port Felin riverbank in the Tiled map source and runtime JSON.
- Fishing produces **Silver Dace**, grants Fishing XP and can occasionally produce an extra catch as skill level rises.
- **Mina Whiskerpot**, the Warm Saucer innkeeper, is a new world NPC.
- Mina can cook Silver Dace into **Grilled Silver Dace**, which restores 14 health and grants Cooking XP.
- Batch cooking is available when carrying multiple fish.
- The existing Cooking skill now progresses through real gameplay.

### Quest chain

- Quest-giver markers now appear physically over NPCs:
  - `!` for an available quest.
  - `?` when an active quest can be turned in.
- Completing **A Paw on the Roads** unlocks a second quest, **A Proper Supper**.
- A Proper Supper asks the player to catch three Silver Dace and cook two at the Warm Saucer.
- The quest journal hides genuinely locked quests until their prerequisite is complete.
- Older v0.2/v0.3 characters are migrated automatically with the new quest/counter/world fields.

### Physical world loot

- Enemy rewards no longer jump directly into the inventory.
- Defeated enemies create visible loot drops in the world.
- The player must walk to/tap the drop to collect its crowns and items.
- Loot appears on the minimap and expires after two minutes if ignored.
- Enemy XP is still awarded immediately on defeat.

### Day/night world time

- Each character now has persistent in-world time.
- The clock advances continuously while playing and is shown in the top HUD.
- Port Felin darkens through evening/night and brightens again toward morning.
- Building windows light up after dark.
- Renting a room at the Warm Saucer restores health and advances time to 07:00.

### World/minimap improvements

- Minimap now shows NPCs, enemies, resources, fishing spots, ground loot and the player rather than only the terrain/player dot.
- Existing moving NPCs, ambient townsfolk, enemy patrol/chase behavior, chatter, cloud shadows and particles remain intact.

### New audio

Three additional effects were authored locally with the supplied **Csound** tooling and compressed to OGG:

- fishing splash,
- cooking sizzle,
- loot pickup.

Editable `.csd` source files are retained in `assets/src/audio_v040/`.

## Existing playable systems

- Tap/click-to-move world navigation; WASD and arrow keys also work on desktop.
- No energy system, daily timer, gacha currency or separate battle screen.
- Tap NPCs, enemies, resources, fishing spots and loot to approach/interact.
- Real-time simple combat with auto-attacks in range, a manual Flourish ability and food/tonic use.
- Gathering directly in the world: rosemary, river reeds, grapes, oak, iron and fish.
- Fencing, Defense, Foraging, Woodcutting, Mining, Fishing, Cooking, Smithing, Tailoring, Alchemy and Crafting all exist as use-based skills.
- Smithing, Tailoring and Alchemy crafting stations/NPCs.
- Inventory, equipment, quest journal, skills panel and minimap.
- Merchant, guildmaster, smith, apothecary and innkeeper interactions.
- Adventure level plus independent skill levels.
- Three characters with separate inventory, position, quests, equipment and world state.
- Enemy respawns and resource recovery.

## DEV_TOOLS authoring

- **Inkscape 1.4**: title scene, world tiles, cat sprite strip and character portraits from editable SVG sources.
- **Tiled 1.12.2**: editable `assets/maps/port_felin_world.tmx` and runtime `port_felin_world.json`; v0.4 adds Mina plus two river fishing spots to both authored/runtime map representations.
- **Csound 6.18**: local game SFX authoring; v0.4 source patches are retained under `assets/src/audio_v040/`.

## Install / PWA behavior

The corrected PWA identity from v0.3 remains stable: `./paws-and-plumes-rpg`.

The title screen displays **Install App** whenever Chromium supplies an install prompt. Settings also includes install status, **Check for Update**, and **Refresh App Files**. The service worker cache is versioned per release and navigation remains network-first so GitHub Pages deployments are less likely to remain stuck on stale HTML.

## Controls

### Phone / touch

- Tap terrain to walk.
- Tap NPCs, enemies, resources, fishing spots or loot to approach/interact.
- Bottom hotbar: attack, Flourish, tonic and bread on narrow screens.
- Lower-left button opens the character panel.
- Speaker button toggles audio.
- Lower-right menu opens the game menu.

### Desktop

- Click-to-move or WASD / arrow keys.
- `1–5` activate hotbar actions; `E` also performs contextual interact.
- `Esc` opens the game menu.

## Deploy to GitHub Pages

Upload the contents of this folder to a GitHub repository. In **Settings → Pages**, publish the branch containing `index.html`, normally from the repository root. No build step or server runtime is required.

## Save behavior

Character saves remain in browser `localStorage` using the existing v0.2+ save key, so v0.3 characters continue forward. v0.4 migrates missing quest, crafting-counter, world-time and ground-loot fields when a character is loaded. Clearing site data removes local characters. Audio preferences are stored separately.
