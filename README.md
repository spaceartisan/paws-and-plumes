# Paws & Plumes v0.6.1

A traditional top-down Renaissance-fantasy cat RPG for GitHub Pages. The design target remains closer to **Tibia / RuneScape-style adventuring** than to a conventional mobile game: the same persistent world runs on desktop and phone, while touch support changes controls/layout rather than the progression model.

## v0.6.1 — Obstacle-aware tap pathfinding

This is a focused movement-quality update built directly on v0.6.0.

### Tap / click navigation

The previous tap controls were straight-line movement: the character walked directly toward the tapped point and simply stopped when a building, blocked ground tile or corner got in the way.

v0.6.1 replaces that behavior with an obstacle-aware **A\* navigation grid**:

- Tap a point beyond a building and the character routes around the building automatically.
- Diagonal path steps refuse to cut through blocked corners.
- Navigation samples player clearance around each route point instead of treating the character as a zero-size point.
- Long routes are line-of-sight smoothed so the character follows natural segments instead of visibly zig-zagging across a grid.
- Taps on blocked terrain are redirected to the nearest reachable navigation point rather than repeatedly pushing into the obstacle.
- A subtle gold destination/path indicator appears for terrain taps.
- WASD / arrow-key movement immediately cancels an active tap route, preserving direct desktop control.
- Exact final route position is saved when a tap route completes.

### Interaction-aware routing

NPCs, resources, enemies, loot and landmarks use the same navigation system.

- Tapping an NPC or resource from around a corner routes into interaction range and automatically interacts.
- The character stops within useful range rather than trying to occupy the target's center point.
- Enemy approach routing periodically replans against moving enemies.
- If a moving target changes position significantly, the route updates rather than continuing toward the target's old location.
- Unreachable targets fail cleanly instead of leaving the character permanently walking into an obstacle.

## Existing v0.6 systems retained

- Main menu, character select and character creation.
- Three independent persistent character saves.
- Continuous Port Felin → South Road → Eastroad → Old Quarry → Mosswood world.
- Reactive combat with Attack, Flourish, Guard/Riposte, tonic and contextual interaction.
- Repeatable Gilded Paw contract board.
- Two-way merchant economy and physical ground loot.
- Character level plus Fencing, Defense, Foraging, Woodcutting, Mining, Fishing, Cooking, Smithing, Tailoring, Alchemy and Crafting.
- Four connected permanent quests.
- Fishing/cooking, smithing/tailoring/alchemy crafting.
- Rich-resource skill gates.
- Persistent day/night cycle, NPC routines, wandering civilians and enemy patrols.
- Music, ambience and independent effect-volume controls.
- Installable PWA with a stable identity and update controls.

## Controls

### Phone / touch

- **Tap terrain:** pathfind and walk to that point.
- **Tap NPC / enemy / resource / fishing spot / loot / board:** pathfind into range and interact.
- Hotbar:
  1. Attack
  2. Flourish
  3. Guard
  4. Red Tonic
  5. Interact
- Lower-left button opens the character panel.
- Speaker button toggles audio.
- Lower-right menu opens the game menu.

### Desktop

- Click-to-pathfind, or use WASD / arrow keys for direct movement.
- `1` Attack.
- `2` Flourish.
- `3` Guard.
- `4` Red Tonic.
- `5` or `E` Interact.
- `Esc` opens the game menu.

## Install / PWA behavior

The stable PWA identity remains `./paws-and-plumes-rpg`, so v0.6.1 updates the same installed app introduced in v0.3. The service-worker cache is `paws-plumes-v061-20261006`.

If an installed copy does not update immediately, open **Settings → Check for Update**, then use **Refresh App Files** if needed.

## Deploy to GitHub Pages

Upload the contents of the `PawsAndPlumes` folder to a GitHub repository. In **Settings → Pages**, publish the branch containing `index.html`, normally from the repository root. No build step or server runtime is required.

## Save compatibility

The save key remains `paws_plumes_traditional_v020`. v0.6.1 changes only transient navigation state and does not alter the persistent character schema. Existing characters retain their exact progression, position, inventory, quests, equipment and world state.
