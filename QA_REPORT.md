# Paws & Plumes v0.13.1 QA Report

Date: 2026-10-07

## Reported issue

The Warm Saucer interior entrance was reproduced as an invalid spawn. The old destination point `(384, 410)` lies inside the expanded collision bounds of the lower inn table, which can leave a character unable to move after entering the building.

## Fixes validated

Passed:

- Warm Saucer destination spawn changed to `(384, 470)` in the editable `port_felin_world.tmx`.
- The map was re-exported with the supplied **Tiled 1.12.2 AppImage** under Xvfb.
- Exported `port_felin_world.json` contains the corrected spawn.
- New Warm Saucer spawn passes full A* navigation-clearance probes.
- Old bad position `(384, 410)` is still correctly detected as obstructed.
- The automatic recovery search resolves that old trapped position to a nearby safe navigation node around `(372, 468)`.
- `loadMap()` now runs the recovery check on every map load, so previously trapped saved characters self-repair after update.
- Movement now slides on a free axis when a diagonal step collides, reducing corner/furniture snagging.

## Transition-spawn audit

Every current destination spawn passed the same navigation-clearance test:

- Port Felin → Guild Hall
- Port Felin → Ironpaw Forge
- Port Felin → Warm Saucer
- Port Felin → Mercato
- Port Felin → Felin Exchange
- Port Felin → Quarry Underworks
- Port Felin → Bellflower Vale
- Every corresponding return route back to Port Felin

No current transition spawn overlaps blocking geometry or blocked ground.

## Interior reachability audit

From each entrance spawn, a navigation-grid reachability test successfully found paths to the interior exit plus all primary NPC/service interactions.

- Guild Hall: Luca, contract board, clerk, exit
- Ironpaw Forge: Bia, forge, Masterwork Bench, exit
- Warm Saucer: Mina, cooking hearth, guest bed, fiddler, exit
- Mercato: Neri, Saffron, exit
- Felin Exchange: Aurelia, vault chest, clerk, exit

## Static checks

Passed:

- `node --check game.js`
- `node --check sw.js`
- JSON parsing for the manifest and all runtime map JSON files
- Save key remains `paws_plumes_traditional_v020`
- PWA identity remains unchanged
- Service-worker cache bumped to `paws-plumes-v0131-20261007`

## Diagnostic capture

- `docs/screenshots/v0131_warm_saucer_spawn_fix.png`

The diagnostic shows the old spawn inside the table collision region and the corrected entrance position below it.
