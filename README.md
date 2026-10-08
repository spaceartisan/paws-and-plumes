# Paws & Plumes v0.13.1 — Interior Collision Hotfix

Paws & Plumes is a traditional top-down browser RPG for GitHub Pages, designed like a compact Tibia/RuneScape-style adventure that also controls comfortably on a phone. The game uses persistent characters, direct world movement, use-based skills, quests, gathering, crafting, banking, dungeons, and combat that happens in the world rather than on a separate battle screen.


## v0.13.1 hotfix

This focused update fixes an interior collision trap found in the **Warm Saucer** and hardens every map transition against similar problems.

- Warm Saucer entrance spawn moved from `(384, 410)` to the clear `(384, 470)` position.
- The previous spawn overlapped the padded collision region of the lower inn table.
- Every map load now checks whether the saved player position has valid navigation clearance. If not, the character is moved to the nearest safe A* node automatically. This also rescues characters already saved in the old bad inn position.
- Manual and path-following movement now slides along a free X/Y axis when diagonal movement hits an obstacle, reducing snagging on furniture and wall corners.
- All current map-transition spawn points were audited for navigation clearance.
- Each town interior was checked for a valid route from its entrance to its exit, primary NPCs, and service objects.
- Save key and PWA identity are unchanged.

## v0.13 highlights

### Tradecraft refinement
High-level crafting now has a material-refinement loop rather than ending when the first good equipment set is obtained.

At the new **Ironpaw Masterwork Bench** inside the authored Ironpaw Forge map, characters can refine:

- **Forge Charcoal** — 2 Oak Logs, Crafting 3.
- **Quarry Steel Billet** — 2 Iron Ore + 1 Forge Charcoal, Smithing 4.
- **Foxhide Lining** — 2 Red Fox Pelts + 2 River Reed, Tailoring 4.

Saffron's apothecary work now continues the chain:

- **Bellflower Oil** — 3 Bellflower Lavender + 1 Black Grape, Alchemy 4.
- **Aetherglass Lens** — 2 Aether Salt + 1 Bellflower Oil, Alchemy 5 / Crafting 4.

These refined materials are persistent inventory items, can be banked or sold, grant the appropriate trade-skill XP, and update normal crafted-item counters.

### A Maker's Mark
After completing **Terms of the Vale**, Bia Ironpaw offers a new permanent trade quest, **A Maker's Mark**.

The quest asks the character to demonstrate all three core guild trades by producing:

- 2 Quarry Steel Billets
- 1 Foxhide Lining
- 1 Bellflower Oil

Reward:

- 190 crowns
- 150 Adventure XP
- **Gilded Maker's Seal**

Claiming the quest unlocks the masterwork recipes at Bia's bench. Existing v0.12 characters that already completed Terms of the Vale receive A Maker's Mark as available after migration.

### Masterwork equipment
Masterworks consume the original equipment plus refined materials. They are upgrades to gear the player has already earned, not extra random drops.

- **Masterwork Quarry Sabre** — Attack 13 and +6% melee critical chance.
- **Reinforced Brigandine** — Defense 5 with a smaller ranged-accuracy penalty than the original brigandine.
- **Bellflower Recurve** — Attack 9, longer bow range, faster shot cycle, and +12% weapon accuracy.
- **Oiled Foxhide Jerkin** — Defense 3 and +13% ranged accuracy.
- **Aetherglass Wand** — Attack 10, Focus cost 3, strong magic accuracy, and modest armor penetration.
- **Aetherwoven Scholar Coat** — Defense 2, +14% magic accuracy, and +15 maximum Focus.

If the base item being upgraded is currently equipped, it is automatically replaced by the new masterwork. This prevents an equipped base item from surviving as an invisible duplicate after its inventory copy is consumed.

### Repeatable trade work
The Guild contract board now includes **Guild Steel Order** after A Maker's Mark is complete. It tracks only Quarry Steel Billets refined after the contract is accepted and rewards 118 crowns / 72 Adventure XP for three billets.

### Authored Forge update
The Ironpaw Forge TMX now contains a physical **Masterwork Bench** landmark layered over the existing work bench. It can be tapped/pathfound to like other world interactions and opens the refinement/masterwork interface directly.

## Existing game systems

- Traditional title screen, character selection/creation, and three persistent character slots.
- Continuous Port Felin region plus Bellflower Vale.
- Obstacle-aware A* tap pathfinding and desktop WASD/arrow movement.
- Enterable Guild Hall, Ironpaw Forge, Warm Saucer, Mercato, and Felin Exchange.
- Quarry Underworks dungeon with persistent gate/key/chest/boss progression.
- Fencing, Archery, and Aethercraft combat styles with optional combat disciplines.
- Gathering, Woodcutting, Mining, Fishing, Cooking, Smithing, Tailoring, Alchemy, and Crafting.
- Permanent quests and repeatable guild contracts.
- Physical ground loot and merchant buy/sell economy.
- Persistent bank/vault with safe banked crowns.
- NPC routines, Town Notes, day/night, music, ambience, and sound effects.
- Installable PWA with the same stable application identity used by prior releases.

## Controls

### Phone / touch

- Tap terrain to pathfind there.
- Tap NPCs, doors, enemies, resources, loot, benches, chests, signposts, and other world objects to route into interaction range automatically.
- Bottom hotbar provides Attack/Cast/Shoot, Flourish/Aimed Shot/Arc Burst, Guard, Tonic, and Interact.
- Inventory, Skills, Quests, and Equipment remain in-game panels over the live world.

### Desktop

- **WASD / arrow keys** — move and cancel active tap navigation.
- **1** — attack / shoot / cast.
- **2** — Flourish / Aimed Shot / Arc Burst.
- **3** — Guard.
- **4** — use Red Tonic.
- **5 / E** — interact.
- **Escape** — game menu.

## GitHub Pages deployment

There is no build step or server runtime. Put the contents of this `PawsAndPlumes` folder at the root of the GitHub Pages branch/folder and enable Pages.

The PWA retains the stable `paws-and-plumes-rpg` application identity. The v0.13 service-worker cache is `paws-plumes-v0130-20261007`, so an existing installed copy updates in place rather than becoming a second app.

## Save compatibility

v0.13 deliberately retains the existing save key (`paws_plumes_traditional_v020`). Older characters migrate in place. The migration adds A Maker's Mark without resetting equipment, bank contents, disciplines, quest history, character identity, or world state.

## Authored-source workflow

The project retains editable sources next to runtime exports.

- **Tiled 1.12.2 from `DEV_TOOLS`** was used under Xvfb to update `assets/maps/ironpaw_forge.tmx` with the Masterwork Bench and export the runtime JSON.
- Existing Inkscape-authored map/sprite sources remain under `assets/src/` and `assets/source/`.
- Existing Csound sources remain beside the locally authored audio effects.

See `QA_REPORT.md` for this release's regression results.
