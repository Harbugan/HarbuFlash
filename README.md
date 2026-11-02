# HARBUFLASH v0.4.0 — Character Sprites

An authentic 8-bit jungle platformer inspired by classic cinematic platform games. Built with vanilla HTML, CSS and JavaScript, with no external dependencies.

## Play

Open `index.html` in a modern desktop browser.

| Key | Action |
| --- | --- |
| Left / Right or A / D | Walk |
| Up or W | Jump, climb a ledge, enter the elevator |
| Down or S | Crouch or release a ledge |
| Space, Z, X or Left Ctrl | Fire |
| P | Pause / resume |
| Enter or Space | Start / restart |

Find the Holocube and reach the elevator. Avoid the lava pit and enemies.

## What's new in v0.4.0

- English-only instructions, interface and documentation.
- Refined retro frame, responsive layout and creator credit.
- More forgiving ledge detection and a short coyote-time window for jumps.
- Pause/resume support.
- Score for enemies, Holocube collection and stage completion.
- Persistent high score saved locally in the browser.

## Technical notes

- 320 × 200 internal canvas resolution with nearest-neighbor scaling.
- Commodore 64-inspired 16-color palette.
- Three flip-screen zones in the Jungle stage.
- Procedural pixel art, character rigs and synthesized WebAudio sound effects.
- No dependencies or build step.

## Future stages

The Jungle remains a single-page proof of concept. Future versions can extract shared input, rendering, physics and progression into reusable modules before adding more HTML stage pages.

Created by .::H∆RBUGΛП::.

## Jungle expansion (v0.4.0)

- Eight classic 320-pixel flip-screen rooms, with no smooth camera scrolling.
- A longer route through increasingly dense jungle, ruins and an extraction point.
- Additional elevated platforms, lava gaps and enemy encounters.
- Revised six-pose walking animation intended to reduce backward-looking leg motion.
- Existing score, pause, high-score and English UI are retained.

### Playtest checklist

Walk in both directions; jump and catch ledges; cross all three lava gaps; fight enemies; collect the Holocube near the end; enter the extraction elevator. Verify checkpoint respawns and score persistence. This version has not yet been browser-playtested.

## Character sprite milestone (v0.4.0)

- Original 16 × 32 pixel blonde boy sprite with the reference's blonde hair, brown jacket, blue trousers and dark boots.
- Character palette is independent from the jungle background palette.
- Frame atlas generated in `hero-sprites.js`; no external libraries or image services.
- Initial idle, six-pose walk, turn and placeholder action poses integrated into the existing game.
- All game text remains in English.

**Work in progress:** The movement physics and level layout are intentionally unchanged. The jump, climb, crouch and death poses need animation refinement after the idle/walk visual review. The draft PR has not been browser-playtested.

## v0.4.1 Character Polish

- Preserves the 16x32 blonde boy's original hair, jacket and trouser colors.
- Refines the face profile and hair silhouette.
- Introduces separate takeoff, rising, apex, falling and landing sprite poses.
- Uses air time and vertical velocity to choose jump poses without altering collision physics.
- Retains the previous six-frame walking animation and classic flip-screen camera.

**Testing:** Browser gameplay and visual animation QA are still required before merge. Check walk, jump, landing, ledge climb, death, and the complete jungle route.

## v0.4.2 — Adventurer and ledge climb

- Redesigned original blonde 16x32 protagonist with expressive pulp-platformer proportions, a defined face and boots; inspired by the *feel* of Rick Dangerous without reusing assets.
- Maintains the six-frame walk cycle and the existing landing duration.
- Distinct overhead catch, hanging, pull-up, knee-up and stand poses.
- Ledge grab has a brief catch animation before up can initiate a climb.
- Pull-up movement now uses eased phases, including a separate horizontal knee-over-ledge transition.
- Review before merging: sprite readability, left/right mirroring, grabbing from both directions, ledge clearance, landings, shooting, crouching and death. Browser playtesting has not been performed.
