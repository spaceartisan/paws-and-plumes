# Paws & Plumes v0.6.1 QA — Pathfinding

## Static checks

- `game.js` passes `node --check`.
- `sw.js` passes `node --check`.
- Version advanced to `0.6.1`.
- Stable save key remains `paws_plumes_traditional_v020`.
- Stable PWA identity remains `./paws-and-plumes-rpg`.
- Service-worker cache bumped to `paws-plumes-v061-20261006`.

## Navigation implementation

The old straight-line tap movement has been replaced with an A* navigation layer using a 24 px navigation grid.

Validated implementation behavior:

- Static collisions include blocked ground tiles and authored building bounds.
- Navigation points sample clearance around the player footprint.
- Eight-direction movement is supported.
- Diagonal neighbor expansion checks both orthogonal neighbors to prevent corner cutting.
- Resulting A* paths are line-of-sight smoothed before movement.
- Blocked terrain taps fall back to a nearby reachable navigation point.
- A short stuck detector triggers route replanning if a route segment unexpectedly cannot advance.
- Keyboard movement cancels tap navigation immediately.
- Completed terrain routes explicitly save the final position.

## Phone corner-routing regression

Controlled Chromium harness, 390×844:

- Seeded player at world `(120, 440)`, immediately left of the Guild Hall.
- Tapped world `(350, 440)`, directly on the opposite side of the Guild Hall.
- A straight line between those points crosses the Guild Hall collision and would fail under v0.6.
- v0.6.1 routed south around the building and then back toward the target.
- Final saved position: approximately `(349.4, 442.3)`.
- No runtime errors occurred.
- No repeated manual taps were required.

Visual capture:

- `docs/screenshots/v061_pathfinding_route_mobile.png`

## Interaction routing regression

Controlled Chromium harness, 390×844:

- Seeded player at `(120, 440)`.
- Tapped Guildmaster Luca from the opposite side of the Guild Hall corner.
- The direct line intersects Guild Hall collision.
- Character routed around the corner into interaction range.
- Guildmaster Luca dialogue opened automatically after arrival.
- No runtime errors occurred.

Visual capture:

- `docs/screenshots/v061_interaction_path_mobile.png`

## Small-phone regression

Controlled Chromium harness, 320×568:

- Seeded player at `(220, 350)`, above the Guild Hall.
- Tapped `(350, 520)`, below/right of the building.
- Pathfinding routed around the obstacle and arrived at approximately `(348.7, 515.6)`.
- `scrollWidth = clientWidth = 320`.
- `scrollHeight = clientHeight = 568`.
- No page-level overflow and no browser runtime errors.

Visual capture:

- `docs/screenshots/v061_pathfinding_small_phone.png`

## Save / migration

No persistent schema migration is required. All A* path state is transient. Existing v0.3–v0.6 saves continue to use the same key and data structure.
