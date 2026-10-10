# Port Felin — editable scenery art

Ten source SVGs and one curb edging SVG are authored here; corresponding game-ready transparent PNGs are in `assets/world/scenery/`. To re-export any source from the project root:

```bash
inkscape assets/src/world/scenery/lantern.svg --export-filename=assets/world/scenery/lantern.png --export-background-opacity=0
```

Port Felin's decorative objects are in **`assets/maps/port_felin_world.tmx` → `Scenery`**. Each `scenery` object uses a `kind` string matching a PNG filename. Keep object width/height equal to its SVG's native pixel dimensions, then re-export the TMX to JSON. This layer has **no collisions and no click targets**; gameplay objects remain exclusively in `World Objects`. Do not place a fake barrier across a walkable path. Rowan tree trunks should remain rooted in the already-blocked forest margin unless matching authored obstacle collision is added.

The `cobble_edge.svg` sprite is an authored top-edge strip; its other orientations are rotated by the tile renderer only where the **Tiled Ground** cobbles (gid 2) meet grass (gid 1). Changing the town's ground painting is enough to update the curb positions automatically; gameplay terrain remains authoritative.

Before releasing, inspect real in-game screenshots for labels, door alignment, interaction hit areas, and scenery/civilian overlap in both portrait and desktop formats.
