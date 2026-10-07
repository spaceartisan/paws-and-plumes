# Paws & Plumes v0.11.0 — Aethercraft & Hermetic Arts

Paws & Plumes is a traditional top-down browser RPG built for GitHub Pages. The game is designed like a compact Tibia/RuneScape-style RPG that also controls comfortably on a phone: title screen, multiple character slots, persistent world exploration, tap-to-pathfind, real interiors/dungeons, quests, gathering, crafting, skills, equipment, combat, banking, and local saves.

## v0.11 highlights

### Aethercraft combat style
Aethercraft is now a third combat path beside melee and Archery. Magic weapons use a regenerating **Focus** resource rather than ammunition. Focus regenerates quickly outside combat and more slowly while fighting.

- **Glass Aether Rod** — inexpensive starter focus.
- **Hermetic Wand** — quest reward with stronger range and partial armor penetration.
- **Quarry Catalyst** — advanced slow, hard-hitting focus crafted from Underworks materials.
- **Arc Burst** — the magic secondary attack; costs extra Focus and splashes nearby enemies.
- Magic accuracy scales with Aethercraft skill and equipment. Heavy defensive gear slightly interferes with casting.
- **Scholar's Coat** gives +10% magic accuracy and +10 maximum Focus, trading raw defense for spellcasting performance.
- **Blue Focus Tonic** restores 16 Focus.

### New character path
Character creation now has four backgrounds. **Apothecary's Apprentice** starts with Alchemy 2, Aethercraft 2, a Glass Aether Rod, ingredients, and a Focus Tonic.

### Rat Hexers
Two Rat Hexers now inhabit the Quarry Underworks. They fight from range, back away when crowded, and periodically telegraph **Violet Hex**. Violet Hex deals increased damage and drains 4 Focus when it lands.

Rat Hexers can drop **Aether Salt**, Rat Brass Tokens, and occasionally a Blue Focus Tonic.

### Saffron progression
Saffron's apothecary services now support the magic path:

- Brew Red Tonic.
- Distill Blue Focus Tonic.
- Assemble Glass Aether Rod.
- Tailor Scholar's Coat.
- Build the Quarry Catalyst after progressing far enough.
- Learn the permanent Town Note **The Hermetic Arts**.

Her new quest **Glass and Thunder** asks the player to distill two Focus Tonics and defeat two Rat Hexers, rewarding the Hermetic Wand. Completing it also unlocks the repeatable **Hexer Suppression** guild contract.

## Existing game systems

- Main menu, character selection, four character backgrounds, and separate persistent saves.
- Continuous Port Felin overworld with Eastroad, Mosswood, Old Quarry, riverlands, and day/night cycle.
- Obstacle-aware A* tap pathfinding plus desktop WASD/arrow movement.
- Enterable Guild Hall, Ironpaw Forge, Warm Saucer, Mercato, and Felin Exchange.
- Quarry Underworks dungeon with persistent gate/key progression, chests, boss, and strongbox.
- Melee Fencing with telegraphed enemy attacks, Guard, ripostes, and Flourish.
- Archery with ranged positioning, ammunition, Aimed Shot, marksmen, bows/crossbow, and armor accuracy tradeoffs.
- Aethercraft with Focus, ranged spell positioning, Arc Burst, spellcasting gear, and enemy hexers.
- Gathering, Woodcutting, Mining, Fishing, Cooking, Smithing, Tailoring, Alchemy, Crafting, and use-based skill progression.
- Permanent quests plus repeatable guild contracts.
- Physical ground loot and merchant buy/sell economy.
- Character bank/vault with safe banked crowns.
- NPC schedules, persistent Town Notes, world discoveries, ambient motion, music, ambience, and effects.
- Installable PWA with update controls while retaining the same stable app identity from prior releases.

## Controls

### Phone / touch
- Tap terrain to pathfind to that point.
- Tap NPCs, doors, enemies, gathering nodes, loot, chests, and other world objects to route into interaction range automatically.
- Bottom hotbar provides Attack/Cast, Flourish/Aimed Shot/Arc Burst, Guard, Tonic, and Interact.
- Inventory, Skills, Quests, and Equipment are in the in-game side panel.

### Desktop
- **WASD / arrow keys** — move and cancel active tap navigation.
- **1** — attack / shoot / cast.
- **2** — Flourish / Aimed Shot / Arc Burst.
- **3** — Guard.
- **4** — use Red Tonic.
- **5 / E** — interact.
- **Escape** — game menu.

## GitHub Pages deployment

No build step or server runtime is required. Put the contents of this `PawsAndPlumes` folder at the root of a GitHub Pages branch/folder and enable Pages in repository settings.

The PWA keeps the stable `paws-and-plumes-rpg` application identity used since the install fix, so v0.11 updates the existing installed app instead of creating a new one. The service worker cache has been bumped for this release.

## Save compatibility

v0.11 keeps the existing local save key (`paws_plumes_traditional_v020`). Older characters are migrated in place with Aethercraft level 1, a 30-point Focus pool, the new combat counters, and quest availability based on their existing Underworks progress.

## Authored-source workflow

- **Tiled 1.12.2 from the user's `DEV_TOOLS` folder** was used to validate/export the updated Quarry Underworks map with Rat Hexer placements.
- **Inkscape 1.4** was used to render the new Rat Hexer sprite from `assets/src/world/rat_hexer.svg` into the shared sprite sheet.
- The v0.11 spell effects are reproducibly synthesized from `assets/src/audio_v011/synth_magic.py` and encoded as `arcane_bolt.ogg` / `arcane_burst.ogg`.
- Editable Tiled TMX, SVG, and audio-generation sources remain in the project.

See `QA_REPORT.md` for the regression checklist and results.
