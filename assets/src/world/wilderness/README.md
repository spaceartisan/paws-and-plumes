# Wilderness artwork (editable)

All 14 graphics in this folder are editable vector drawings. PNG counterparts live in `assets/world/wilderness/` and can be recreated with Inkscape, e.g.:

```bash
inkscape assets/src/world/wilderness/oak_canopy.svg --export-filename=assets/world/wilderness/oak_canopy.png --export-background-opacity=0
```

Place one named object with `type=wilderness` and property `kind=<PNG basename>` in the `Wild Scenery` layer of `assets/maps/port_felin_world.tmx` or `assets/maps/bellflower_vale.tmx`, setting its bounding box to the SVG dimensions. Export the TMX to matching JSON. The `Wild Scenery` layer is always presentation-only and is **not** in pathfinding, collision, NPC targeting, resource gathering, or click picking. Keep tree trunks and substantial rocks in existing blocked terrain (gid 6) and do not place apparent barriers across walkable routes without authoring corresponding gameplay collision.

The forest_edge and river_bank sprites are transparent 64px sprites drawn at forest/other and water/other tile boundaries. Their rotation follows the Ground tiles; the Ground tile IDs remain authoritative for both movement and rendering. QA by inspecting real mobile/desktop game captures in multiple regions.
