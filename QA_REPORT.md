# Paws & Plumes v0.11.0 QA Report

Date: 2026-10-07

## Static checks

- `node --check game.js` — passed.
- `node --check sw.js` — passed.
- Updated Quarry Underworks TMX exported/validated successfully through Tiled 1.12.2 from `DEV_TOOLS` using its AppImage extraction path under Xvfb.
- New Rat Hexer SVG rendered successfully with Inkscape into the shared 832×64 sprite sheet.
- Service-worker cache includes both new Aethercraft audio files.

## Save migration

A v0.10-style character was loaded through the v0.11 migration path.

Passed:
- Aethercraft skill added at level 1.
- Focus initialized to 30/30.
- Existing equipment, inventory, quests, dungeon state, bank, and character identity remained usable.
- `Glass and Thunder` becomes available when `Beneath the Old Quarry` was already completed.
- New `magic_kills` combat counter initialized without altering ranged counters.

## Saffron / crafting / quest

Passed:
- Saffron's dialogue renders the Glass and Thunder quest.
- Blue Focus Tonic crafting consumes the intended ingredients and increments its crafted counter.
- Glass Aether Rod, Scholar's Coat, and Quarry Catalyst entries render with their progression requirements.
- Town-note option records The Hermetic Arts persistently.

## Aethercraft combat

Passed:
- Glass Rod normal cast consumes Focus.
- Successful cast grants Aethercraft XP.
- Magic range is distinct from melee and Archery range.
- Arc Burst uses the larger Focus cost.
- A forced two-target Arc Burst regression killed both adjacent Rat Hexers, recorded **2 magic kills**, recorded **2 Rat Hexer kills**, created **2 physical loot drops**, and completed the combat portion of Glass and Thunder.
- With Hermetic Wand and Scholar's Coat, the same forced Arc Burst spent exactly **9 Focus** (4 base + 5 burst).
- Scholar's Coat raises maximum Focus to 40 and displays +10% magic accuracy / +10 Focus.
- Swapping from Scholar's Coat to Padded Doublet immediately clamps a full 40 Focus back to the normal 30-point maximum.
- No runtime/page errors were produced by the forced multi-target combat regression.

## Rat Hexer enemy behavior

Passed:
- Both Rat Hexer objects exist on the exported Quarry Underworks map.
- Hexers use ranged/kiting behavior rather than closing to melee.
- Violet Hex telegraph appears.
- Violet Hex uses the magic projectile/sound path.
- A successful Violet Hex drains 4 Focus in addition to its damage.
- Guarded magic attacks are reported as blocked spells rather than shots and do not incorrectly grant a melee riposte.

## Character creation and responsive layout

Passed:
- Character creation shows all four backgrounds, including Apothecary's Apprentice.
- Apothecary's Apprentice starts with the intended Aethercraft/Alchemy bonuses, Glass Rod, ingredients, and Focus Tonic.
- 390×844 phone gameplay render completed with Focus HUD and Aethercraft hotbar.
- 320×568 regression completed with zero horizontal page overflow and no runtime errors.

## Visual captures

- `docs/screenshots/v011_apothecary_mobile.png`
- `docs/screenshots/v011_magic_combat_mobile.png`
- `docs/screenshots/v011_character_create_mobile.png`
- `docs/screenshots/v011_small_phone.png`

## Notes

The container blocks normal localhost/file navigation for the headless browser, so browser QA used an isolated in-memory harness built from the release HTML/CSS/JS and preloaded map data. Test-only hooks were injected into the harness; they are not present in the release files.
