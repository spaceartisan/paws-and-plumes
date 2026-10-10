# Port Felin facades — editable vector masters

The six SVG files in this directory are the editable artwork for the building fronts in Port Felin. They were exported using **Inkscape**, with corresponding pixel PNGs placed in `assets/world/facades/` for the game renderer. Changes to an SVG should be exported to the PNG of the same basename.

From the project root, for example:

```bash
inkscape assets/src/world/facades/guild.svg --export-filename=assets/world/facades/guild.png --export-background-opacity=0
```

Each file uses native 1:1 world pixel dimensions with a transparent **16 px gutter on either side**, **48 px above the building footprint**, and **24 px below it**. The renderer draws it at `(building.x - 16, building.y - 48)`, so the visible base of each facade shares the original map-authored footprint. Door centers were placed at the actual map door centers (relative to the building): Guild 95, Forge 80, Inn 95, Mercato 80, Exchange 68.

The underlying Tiled objects in `assets/maps/port_felin_world.tmx` (and its exported JSON) remain the authoritative source for position, collision, click/tap interaction, and map transitions. The SVG artwork is strictly visual, and a sprite change must never silently change gameplay hit regions. If you change a footprint or move a door in Tiled, update the corresponding editable SVG and PNG as well, then verify with in-game screenshots and a real tap-to-enter regression.

A closed shed front is included for Quarry Hut, which has no authored door interaction; the art intentionally does not suggest that the hut can be entered. The old Canvas facade code remains a fallback if sprite art is unavailable offline.
