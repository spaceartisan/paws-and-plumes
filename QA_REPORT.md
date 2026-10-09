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
