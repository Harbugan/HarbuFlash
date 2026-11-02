# HARBUFLASH v0.3.0 — Into the Jungle

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

## What's new in v0.3.0

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

## Jungle expansion (v0.3.0)

- Eight classic 320-pixel flip-screen rooms, with no smooth camera scrolling.
- A longer route through increasingly dense jungle, ruins and an extraction point.
- Additional elevated platforms, lava gaps and enemy encounters.
- Revised six-pose walking animation intended to reduce backward-looking leg motion.
- Existing score, pause, high-score and English UI are retained.

### Playtest checklist

Walk in both directions; jump and catch ledges; cross all three lava gaps; fight enemies; collect the Holocube near the end; enter the extraction elevator. Verify checkpoint respawns and score persistence. This version has not yet been browser-playtested.
