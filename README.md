# Paws & Plumes v0.2.0

A traditional top-down Renaissance-fantasy RPG built for GitHub Pages. The game is intended to feel closer to old-school Tibia/RuneScape-style adventuring than to a conventional mobile game: the phone is a control/display target, not the game design model.

## Game flow

1. Title screen / main menu.
2. Character select with three independent local save slots.
3. Character creation: name, coat and starting upbringing.
4. Enter a persistent top-down world and physically walk to NPCs, resources and enemies.
5. Character progress is saved automatically and can be resumed from the title screen.

## Current playable slice

- Tap/click-to-move world navigation; WASD and arrow keys also work on desktop.
- No energy system, daily timer, gacha currency or separate battle screen.
- Click/tap NPCs and world objects to walk into interaction range automatically.
- Real-time simple combat: target an enemy and auto-attack in range, with a manual Flourish ability and food/tonic hotkeys.
- Gathering directly in the world: rosemary, river reeds, grapes, oak and iron.
- Resource skill progression: Foraging, Woodcutting and Mining.
- Combat skill progression: Fencing and Defense.
- Crafting skills and stations: Smithing, Tailoring, Alchemy and general Crafting.
- Additional tracked skills already represented for future expansion: Fishing and Cooking.
- Guild quest with world-based objectives and turn-in.
- Inventory, equipment, quest journal, skills panel and minimap.
- Merchant, guildmaster, smith and apothecary NPC interactions.
- Adventure level plus independent use-based skill levels.
- Multiple characters with separate inventory, position, quests, equipment and world state.
- Enemy respawns and resource recovery.
- Installable PWA; all game runtime files are static and GitHub Pages compatible.

## DEV_TOOLS authoring pipeline

This pass uses tools from the supplied `DEV_TOOLS` folder:

- **Inkscape 1.4** rendered the title scene, world tiles, cat sprite strip and character portraits from editable SVG sources.
- **Tiled 1.12.2** validated/exported `assets/maps/port_felin_world.tmx` into the runtime `port_felin_world.json` map.

Editable art lives under `assets/src/world/`. The editable Tiled map remains under `assets/maps/` alongside its exported JSON.

## Controls

### Phone / touch
- Tap terrain to walk.
- Tap an NPC, enemy or resource to walk toward it and interact.
- Bottom hotbar: attack, Flourish, tonic, bread, contextual interact.
- Lower-left menu button opens the character panel on small screens.
- Lower-right menu button opens the game menu.

### Desktop
- Click-to-move is identical to touch.
- WASD or arrow keys move directly.
- `1–5` activate hotbar actions; `E` also performs contextual interact.
- `Esc` opens the game menu.

## Deploy to GitHub Pages

Upload the contents of this folder to a GitHub repository. In **Settings → Pages**, publish the branch containing `index.html`, normally from the repository root. No build step or server runtime is required.

## Save behavior

Each of the three character slots is stored in browser `localStorage`. Clearing site data removes local characters. There is intentionally no offline-energy mechanic in v0.2.0.
