# Paws & Plumes v0.4.0 QA

Validated after the fishing/cooking, quest-chain, ground-loot and day/night pass.

## Static validation

- `game.js` passes Node syntax validation.
- `sw.js` passes Node syntax validation.
- `manifest.webmanifest` parses successfully.
- `port_felin_world.json` parses successfully.
- `port_felin_world.tmx` parses successfully as XML.
- Tiled source and runtime JSON both contain Mina Whiskerpot and the two new fishing spots.
- Existing PWA identity remains unchanged so v0.4 updates the v0.3 install instead of creating another app identity.
- Service-worker cache bumped to `paws-plumes-v040-20261006`.
- New fishing, cooking and loot OGG effects decode successfully.

## Browser/runtime regression

A controlled headless Chromium harness ran the exact built CSS/JS and actual image assets, with browser storage/audio/network mocked only where the container blocks normal localhost navigation.

Validated at 390 × 844 unless otherwise noted:

- Character creation enters the top-down world successfully.
- The first quest shows an in-world `!` marker over Guildmaster Luca.
- A river fishing spot can be clicked and catches a Silver Dace.
- Fishing increments inventory and the Fishing gameplay path without runtime exceptions.
- Mina Whiskerpot is reachable through contextual interaction.
- A Silver Dace can be cooked into Grilled Silver Dace at the Warm Saucer.
- Cooking increments the real Cooking gameplay path.
- The follow-on quest **A Proper Supper** appears after its prerequisite and can be accepted.
- A one-HP road bandit is defeated by the normal runtime combat loop.
- Defeating the bandit creates one persistent physical ground-loot object rather than directly awarding the loot.
- Clicking the ground drop removes it from the world and transfers the reward to the character.
- The in-world clock displays approximately `21:01` when seeded at 21:00.
- Night rendering visibly darkens the scene and turns on building windows.
- Desktop rendering at 1365 × 768 has no page-level horizontal overflow.
- No JavaScript page errors occurred during the complete fishing → cooking → quest → combat → loot → night sequence.

## Audio validation

- `fish_splash.ogg` decodes successfully.
- `cook_sizzle.ogg` decodes successfully.
- `loot_pickup.ogg` decodes successfully.
- The three effects are included in the service-worker cache list.
- Corresponding editable Csound `.csd` sources are retained under `assets/src/audio_v040/`.

## Reference screenshots

- `docs/screenshots/v040_world_day_mobile.png`
- `docs/screenshots/v040_fishing_mobile.png`
- `docs/screenshots/v040_innkeeper_mobile.png`
- `docs/screenshots/v040_ground_loot_mobile.png`
- `docs/screenshots/v040_night_mobile.png`
- `docs/screenshots/v040_world_desktop.png`
