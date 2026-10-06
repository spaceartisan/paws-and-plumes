# Paws & Plumes v0.2.0 QA

Validated after the traditional-RPG rebuild.

## Automated checks

- `game.js` passes Node syntax validation.
- `manifest.webmanifest` and runtime Tiled JSON parse successfully.
- `port_felin_world.tmx` re-exports successfully through Tiled 1.12.2 as a 24 × 16 map.
- Headless Chromium validation at 390 × 844 completed with no JavaScript/page errors.
- Main menu renders all expected controls.
- Character creation completes and enters the world.
- Top-down world canvas loads its map, sprites and UI.
- Guildmaster interaction works after walking into range.
- Guild quest acceptance works.
- Keyboard movement and contextual world interaction work.
- Rosemary gathering updates the character state.
- Road-bandit targeting, automatic attacks, retaliation, defeat and rewards complete successfully.
- Mobile character panel and minimap render correctly after opening.
- Desktop layout was visually checked at 1365 × 768.

## Reference screenshots

- `docs/screenshots/v020_menu_mobile.png`
- `docs/screenshots/v020_character_create_mobile.png`
- `docs/screenshots/v020_character_select_mobile.png`
- `docs/screenshots/v020_world_mobile.png`
- `docs/screenshots/v020_panel_mobile.png`
- `docs/screenshots/v020_combat_test.png`
- `docs/screenshots/v020_world_desktop.png`
