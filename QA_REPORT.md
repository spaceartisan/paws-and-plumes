# v0.25.0 — Directional Characters QA

## Real browser verification

The full shipping `game.js`, CSS, runtime images and map JSON were loaded into Chromium using an in-memory asset harness. Tests exercised actual movement, damage and map-transition methods; the harness is NOT included in the release archive.

- **390×844, 320×568, 1280×720:** created a character through the real menu, entered Port Felin successfully, loaded the new 1024-wide directional sheet, and saw **no JavaScript errors or horizontal overflow**.
- **Directional movement:** four successful `movePlayer` calls, followed by actual pose updates, yielded **East → North → West → South**. Screenshot previews of all four views were reviewed individually.
- **Special windup:** a Road Bandit in open walkable ground displayed the real game warning UI plus a new ground warning ring/glint; the test scene was moved out of the shop front after screenshot review.
- **Attack:** invoking the real `enemyStrike` function reduced character health while the bandit faced toward the player and played its attack feedback.
- **Real pointer interactions:** clicked the Felin Exchange doorway using Chromium mouse events on the actual canvas, loaded the bank interior, then clicked the exit to return to Port Felin.
- **Art:** all 16 original front sprite frames are preserved, with 16 vector-rendered side and 16 back frames in the shipped PNG sheet. The intermediate generated rendering is not distributed.
- **Screen evidence:** `docs/screenshots/v025_four_directions_review.png`, `v025_south_mobile.png`, `v025_east_mobile.png`, `v025_north_mobile.png`, `v025_west_mobile.png`, `v025_enemy_windup_mobile.png`, `v025_enemy_attack_mobile.png`, `v025_north_small_phone.png`, `v025_east_desktop.png`.

## Release checks

- `node --check game.js` and `node --check sw.js` pass.
- All eight runtime maps parse; all PWA precache targets exist.
- Save key and manifest ID unchanged; no map or collision geometry edits.
- GIFs, QA harness, and generation scripts are not required at runtime and are excluded from the ZIP.

## Limits

A physical phone, installed service-worker update and sustained battery impact were not tested. This pass adds facing sprites, not fully hand-drawn multi-frame directional walk cycles (v0.24's footfall/bounce rendering remains in place).

---

# v0.24.0 — Living Characters QA

## Real-game browser checks

The browser harness loaded the shipped HTML/CSS/JS, the actual maps and PNGs, and the new animation atlas using in-memory asset interception; no gameplay code was reimplemented. The test-only accessors are excluded from this release ZIP.

- **390×844, 320×568, 1280×720:** menu, new-character creation, Port Felin entry, runtime sprite sheet and animation FX loading all pass. Zero uncaught JavaScript exceptions or console errors; no missing assets or horizontal overflow.
- **Movement:** holding S on the actual game produced world-position changes and raised the player's walk-blend above 0.5. A sampled animated sequence and walking screenshot were captured.
- **Combat integration:** using `playerStrike(false)` against a real Road Bandit reduced HP **24 → 18** and triggered player-melee/enemy-hit animation hooks. A subsequent real `enemyStrike` produced a player hit reaction. This confirms calls use the gameplay attack paths, not only standalone FX helpers.
- **Interactions:** a real canvas tap at the Felin Exchange exterior door entered the bank, and a canvas tap at its interior exit returned to Port Felin.
- **Screenshots inspected:** `v024_town_idle_mobile.png`, `v024_walk_mobile.png`, `v024_melee_mobile.png`, `v024_magic_mobile.png`, `v024_hit_mobile.png`, `v024_town_desktop.png`. The moving sequence was reviewed frame by frame and the walk rate adjusted down during the pass.

## Static / release checks

- `node --check game.js` and `node --check sw.js` pass.
- All eight runtime map JSONs parse; map source and collision data are unchanged from v0.23.
- Service-worker pre-cache references exist, including `assets/world/animation_fx.png`.
- Stable save key and manifest identity preserved; no save-field migration required.

## Limitations

Browser previews simulate phone viewport sizes, not performance on a physical handset. The sprite system retains face-forward original art rather than adding full directional frames, and some action FX are deliberately stronger than naturalistic movement for small-screen readability.

---

# v0.23.0 — Wilderness Renewal QA

## Browser verification

- Real shipping JavaScript/CSS and authored map/PNG assets ran in Chromium using an in-memory asset server substitute because localhost connections are blocked. 390×844, 320×568, 1280×720 screen sizes each loaded Port Felin and Bellflower Vale, including remote map positioning for South Road, Mosswood, Old Quarry, the Vale, and Old Aqueduct.
- All **14** wilderness sprites were successfully loaded; no browser page errors, console errors, asset load failures, or horizontal document overflow were observed in the three viewport sizes.
- **Interaction regression:** tapping the actual Felin Exchange doorway on the in-game canvas entered the bank and tapping its exit returned to Port Felin. Three world navigation requests all returned waypoints that satisfy existing walkability checks.
- Outdoor weather systems remained active in both regions. Screenshots reviewed after fixing overlaps between debris and quarry art and relocating tree trunks/rocks toward blocked forest tile margins.

## Data integrity

- Both `port_felin_world` and `bellflower_vale` retain **identical Ground gid arrays and World Objects arrays to v0.22**. Only an independent, decorative `Wild Scenery` layer was added: Port Felin **31** objects; Bellflower **29** objects.
- Editable Tiled TMX and exported JSON agree on object IDs, coordinates, names, and counts.
- All 8 exported map JSON files parse; all 14 edited SVG sources parse; all 14 PNG exports validate; every service-worker precache target exists.
- `node --check` passes for both the gameplay script and the service worker. Version is **0.23.0**, offline cache is `paws-plumes-v0230-20261009`, and PWA identity and save key remain stable.

## Known limits

New scenery is strictly **visual-only**. Large art is concentrated on impassable tile margins; remaining flowers and low ferns can be walked through. No new interaction/collision semantics have been added. Physical handset testing and installed-PWA refresh are not simulated in this environment.

---

# v0.22.0 — Living Streets & Garden Edges QA

## Full-game browser checks

- Actual shipping JS, CSS, maps, sprites and PNGs loaded in headless Chromium using in-memory asset responses (localhost blocked by container policy). 320×568, 390×844 and 1280×720 passed game boot, character creation, map load, and screenshot capture without page errors or viewport horizontal overflow.
- Port Felin Tiled `Scenery` layer contains **25** explicitly placed decorative objects; all **11** new PNG resources (10 sprites + curb overlay) loaded successfully.
- Linked exterior door lookup still resolves Guild Hall, Ironpaw Forge, Warm Saucer, Mercato, and Felin Exchange to exactly the same Tiled doorway objects. A real canvas click on Felin Exchange entered `felin_exchange`.
- The v0.21.0 Port Felin **Ground tile array and entire `World Objects` collection are unchanged**, verified by comparison against the prior ZIP; scenery is a new independent Tiled object layer only.
- All **8** runtime map JSON files parse, all scenery SVG sources parse, transparent PNGs open, every service-worker precache target exists, `node --check game.js` and `node --check sw.js` pass.
- Stable save key and PWA manifest app ID confirmed. No new saved fields required.

## Screenshot review

Inspected actual `v022_town_mobile.png`, `v022_town_small_phone.png`, `v022_town_desktop.png`, and `v022_south_green_mobile.png`. Found and corrected label-obscuring flowerbeds, a barrel/NPC overlap and false fence barriers before final captures. `v022_before_after_mobile.png` compares the actual v0.21 screenshot to the final v0.22 game viewport.

## Known limitations

Scenery is deliberately **visual only**. Benches, crates, planters, and flowers do not add collision or new interactions; author any future solid obstacles in `World Objects` with corresponding gameplay/navigation testing. Tree trunks in the south border are placed in existing impassable forest terrain. Real handset/PWA update behavior remains untested.

---

# v0.21.0 — Port Felin Art Pass QA

## Actual-game browser tests

Headless Chromium ran the release game script, CSS, runtime maps and PNG assets using an in-memory web asset harness (localhost browsing is restricted in the sandbox). An ephemeral QA bridge exposed existing game functions for assertions; it is **not** included in the ZIP.

- **390×844, 320×568, 1280×720:** main menu, character creation and actual Port Felin gameplay loaded without JavaScript page errors or console errors. No horizontal page overflow.
- **All six new facades loaded:** Guild Hall, Ironpaw Forge, Warm Saucer Inn, Mercato, Felin Exchange and Quarry Hut. The new street paving atlas loaded normally through the existing Tiled map reference.
- **Door position invariants:** all five exterior building entrances match the active map doorway center **exactly** (0 px horizontal offset): Guild 255, Forge 465, Inn 255, Mercato 465 and Exchange 618, in world coordinates. All five are classified as facade doors so the duplicate overlay is hidden.
- **Real input map transition:** in the 390×844 Chromium test, used a genuine canvas pointer event on Felin Exchange's actual mapped door center. It transitioned to `felin_exchange`; tapping that interior's actual return door transitioned back to `port_felin`. Collision and navigation code were not replaced.
- **Art/source review:** the exported contact sheet of the six distinct facade sprites was inspected; in-game images were separately opened and visually inspected at all three viewports and near Felin Exchange. The overlaid unselected door labels discovered on the first test pass were removed and the final screenshots regenerated.

Screenshots: `docs/screenshots/v021_town_small_phone.png`, `v021_town_mobile.png`, `v021_town_desktop.png`, and `v021_exchange_mobile.png`. The inspected side-by-side comparison is `v021_before_after_mobile.png`.

## Static/release checks

- `node --check game.js` and `node --check sw.js` pass.
- Map JSON is unchanged from v0.20.2; all 8 runtime maps parse.
- Existing Tiled sources, character save key, PWA manifest identity, audio, quests and movement/physics remain intact.
- SVG masters, PNG runtime exports, and export instructions are included. All six runtime PNGs are precached by the incremented service worker.

## Limitations

Physical phone power/audio tests and vendor-specific installed-PWA update behavior remain device tests. No claim of such hardware tests is made here.

---

# v0.20.2 — Door Alignment Hotfix QA

## Browser / render verification (actual game code)

Headless Chromium was used at **390×844** and **1280×720** with the real shipping `game.js`, CSS, exported maps, and runtime assets loaded through the in-memory browser harness.

- **Menu / boot:** main menu, character creation, and entry into Port Felin all still functioned without runtime errors.
- **Exterior door correction:** Port Felin building doors now visually align with their linked doorway positions.
- **Duplicate marker removal:** the separate chunky exterior door glyph no longer renders over those facade doors in town, eliminating the visibly offset double-door effect seen in the prior pass.
- **Captures:** `docs/screenshots/v0202_port_doors_mobile.png` and `docs/screenshots/v0202_port_doors_desktop.png`.

## Static / release verification

- JavaScript syntax: `node --check game.js` and `node --check sw.js` pass.
- Save key remains `paws_plumes_traditional_v020`; PWA identity remains `./paws-and-plumes-rpg`.
- Service-worker cache updated to `paws-plumes-v0202-20261009`.

## Remaining device-specific checks

A physical phone / installed PWA was not available in the sandbox, so installed-update timing and real-device visual comfort should still be checked on hardware.

---

# v0.20.0 — Weatherwise Wanderer QA

## Browser regression (actual game code)

Headless Chromium was used at **390×844**, **320×568**, and **1280×720**. The full shipping `game.js`, CSS, and exported map/image assets were loaded in a browser, with in-memory asset responses because this environment forbids localhost navigation. No gameplay algorithms or RPG systems were reimplemented by the harness, and the harness itself is not shipped.

- **All three sizes:** game main menu displayed; character creation via the real save constructor and the game shell loaded Port Felin; no JavaScript runtime exceptions or console errors; the viewport did not develop horizontal overflow (document width equaled viewport width).
- **Quest availability and migration:** an older character lacking all v0.20 quest fields migrated to **available** after an already-claimed first guild commission; new counters initialize to zero. Record calls before accepting do not grant progress.
- **Town Bell and World Atlas:** accepted Weatherwise Wanderer through its real button, opened the Field Almanac through its atlas button, and rendered four forecast entries in the modal.
- **Real gameplay hooks:** two normal `gatherResource` fishing casts in **River Rain**; two normal rosemary harvest interactions in **Low Mist**; one normal outdoor `defeatEnemy` call in **Crosswind**. The quest journal reported **2/2 rain casts • 2/2 mist herbs • 1/1 wind victory**, then enabled turn-in.
- **Reward / note:** turning in awarded the **Oilskin Field Coat**, marked the quest claimed, and recorded **Fieldcraft in Three Weathers** in the character’s Town Notes.
- **Archery numbers:** at the same character skill and equipped shortbow, Crosswind accuracy was **0.834** without coat and **0.894** with coat; clear-sky accuracy with coat was **0.914**. Coat mitigates wind only; base wind effect remains intact.
- **Determinism:** the Port Felin and Bellflower Vale forecasts yield independently keyed regional weather; Port Felin forecast rendered four entries; when Bellflower Vale was marked discovered, the full almanac showed both independent regional forecasts. v0.19 weather generation was preserved.
- **Captures:** `docs/screenshots/v020_almanac_390.png`, `v020_almanac_320.png`, `v020_fieldcraft_390.png`, `v020_fieldcraft_320.png`, `v020_crosswind_390.png`, `v020_crosswind_320.png`, and `v020_two_regions_1280.png` (plus the three additional 1280px variants).

## Release verification

- JavaScript syntax: `node --check game.js` and `node --check sw.js` pass.
- All 8 runtime map JSON files parse; service-worker precache file targets exist.
- Existing save key, PWA app identity, source TMX and SVGs, audio files, and all prior screenshots are retained.
- The testing script is outside the distribution archive.

## Remaining device-specific checks

An actual phone / installed PWA was not available in the sandbox. Installed-service-worker refresh behavior, battery cost, and perceived audio balance should be checked on-device.

---

# Paws & Plumes v0.19.0 — QA Report

## Real game browser regression

Executed the actual release `game.js` in headless Chromium at **390×844**, **320×568**, and **1280×720**, with maps and images served via an in-memory asset harness (the container restricts localhost navigation). No gameplay algorithms were reimplemented in the test; exported QA references invoke existing functions.

- **Weather generation:** sampled 100 three-hour slots and observed all four conditions. A fixed date and region always return the same weather; `warm_saucer` returns clear because it is indoors. Bellflower and Port Felin use different deterministic regional sequences.
- **Rain fishing:** with random extra yields disabled and River Day inactive, a Silver Dace node gave exactly **2 fish in rain vs 1 under fair skies**. Resource cooldown/skill/quest actions continued using the normal interaction logic.
- **Crosswind:** an Archery character with the same shortbow, skill, and armor had hit probabilities **0.902 (clear) vs 0.822 (wind)**, an **8-percentage-point penalty**.
- **Mist awareness:** a normal Road Bandit at a clear, navigable 140-pixel separation did **not** detect the character in mist, but **did** detect them in fair weather using the same actor update path.
- **Indoor shelter:** after loading Warm Saucer through the game's real map loader with outdoor rain active, the weather HUD displayed **`⌂ Sheltered`** and indoor conditions were `clear`.
- **Weather UI:** rain, mist, four forecast entries, and changing HUD labels rendered in real browser captures.

## v0.18 regression carried forward

- Enemy A* found a route around Guild Hall with **4 path waypoints** and reached the destination.
- Shooting across solid cover consumed **0 arrows and caused 0 damage**; a clear longbow shot consumed one arrow.
- An enemy over its leash distance stopped attacking and returned toward its patrol.
- Interact collected exactly **13 crowns + 5 rosemary** from two nearby drops while preserving the distant drop.
- At 320×568, document width was **320px**, equal to viewport width. No browser runtime errors were captured.

## Static / release verification

- `node --check` passes for game and service worker.
- All authored runtime maps are valid JSON, and all service-worker precache targets exist.
- PWA `id` remains `./paws-and-plumes-rpg`; original save key remains unchanged.
- Existing map TMX, editable SVG, and prior audio source files are preserved; added editable Csound score and OGG rain layer.
- QA harness is excluded from the distributable ZIP.

## Limits

The game was browser-tested in a desktop Chromium simulation of phone viewports; battery use, audio balance on a real handset, and vendor-specific installed-PWA behavior still need device testing.
