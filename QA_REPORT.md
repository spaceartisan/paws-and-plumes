# Paws & Plumes v0.3.0 QA

Validated after the dynamic-world, audio and PWA-install pass.

## Static validation

- `game.js` passes Node syntax validation.
- `sw.js` passes Node syntax validation.
- `manifest.webmanifest` parses successfully.
- PWA icons are true 192 × 192 and 512 × 512 PNG files.
- All eleven new OGG files decode successfully with FFmpeg/FFprobe.
- Manifest now has an explicit same-origin `id`, `start_url`, scope, standalone display mode, required icon sizes and `prefer_related_applications: false`.
- Service-worker cache was bumped to `paws-plumes-v030-20261006` and includes the new audio assets.

## Browser/runtime regression

Headless Chromium was run against the exact v0.3 HTML/CSS/JS with local asset/network mocks because localhost navigation is blocked by the container policy.

Validated:

- 390 × 844 phone main menu renders without JavaScript/page errors.
- A simulated Chromium `beforeinstallprompt` event causes the **Install App** button to appear and remain actionable.
- Settings renders music, ambience and effects sliders plus install/update controls.
- Character creation still enters the world successfully.
- All four named NPCs moved from their initial positions during a 3.5-second dynamic-world test.
- Decorative townsfolk render and wander independently.
- Rosemary gathering increases inventory and creates floating world feedback.
- A real runtime bandit strike reduced enemy HP and created combat feedback.
- Audio calls execute through the runtime paths with no JavaScript exceptions; source OGG files were independently decode-validated.
- Dynamic screenshots taken several seconds apart produce substantial pixel differences, confirming active world motion.
- 320 × 568 small-phone menu keeps Characters, New Character, Install App and Settings inside the visible viewport.
- 1365 × 768 desktop gameplay has no page-level horizontal overflow.

## Reference screenshots

- `docs/screenshots/v030_menu_mobile.png`
- `docs/screenshots/v030_settings_mobile.png`
- `docs/screenshots/v030_world_mobile.png`
- `docs/screenshots/v030_world_dynamic_mobile.png`
- `docs/screenshots/v030_menu_small_phone.png`
- `docs/screenshots/v030_world_desktop.png`
