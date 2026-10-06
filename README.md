# Paws & Plumes

A mobile-first casual Renaissance-fantasy RPG for GitHub Pages. The world is populated primarily by cats; the player begins as Milo, an orange tabby guild duelist in Port Felin.

## Current playable slice

- Turn-based battles with Attack, Focus/Flourish, Guard, healing tonics, and retreat.
- Gathering at authored map locations for rosemary, reeds, and grapes.
- Crafting consumables plus permanent attack/defense upgrades.
- Three guild quests with accept/progress/claim states.
- Character XP/leveling and four use-based skills: Fencing, Foraging, Crafting, Alchemy.
- Town services: guild hall, market, inn, fencing practice.
- Inventory, bestiary/discovery journal, local save, offline energy recovery.
- Installable PWA with cached core assets.
- Responsive touch-first UI designed for portrait phones while remaining usable on desktop.

## Art / authoring pipeline

The provided DEV_TOOLS were used in this build:

- Inkscape 1.4: rendered the layered vector portraits, crest/app icons, and tileset to PNG.
- Tiled 1.12.2: authored/exported `assets/maps/gilded_outskirts.tmx` to the runtime JSON map.

Source SVGs, TMX, and TSX are retained under `assets/src` and `assets/maps` so the art/map can be iterated instead of being runtime-generated.

## Deploy to GitHub Pages

Upload the contents of this folder to the root of a GitHub repository. In **Settings → Pages**, deploy from the branch containing `index.html` (usually `main`) and the root folder. No build step or server runtime is required.

## Save behavior

Progress is stored in `localStorage` on the current browser/device. Energy recovers by 1 every 4 minutes while below maximum. Clearing site data removes the save.
