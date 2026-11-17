# My style library

Every film style I have tried: where it lives, how to make another one, and what
broke. Add a row after every film. Mark the ones you would use again with ★.

| Style | Technology | Example film | How to make another one | Render cost |
|---|---|---|---|---|
| Living product (the real site, animated) | HTML + GSAP in HyperFrames; Canvas 2D for the wind; Kokoro voice; effects bundled with the skill | `aircast-launch-film/`: AirCast Iceland launch film, 40 s, Nov 2026 | Capture the real site at 2x (`hyperframes capture`) and save one data snapshot. Write one scene file per shot. Land the site's real parts (badge, chips, tiles) as crops of the captured image. Reuse the title helpers in `assets/js/film.js`. Start with `Read STYLE-LIBRARY.md and make another living-product film about …` | Light: 40 s took 4 min 6 s on a 4-core laptop |

## Notes per style

### Living product (the real site, animated)
- **Look:** the product's own colours, font and parts, never imitations. AirCast: dark ground
  #0d1620, navy header gradient, Inter 800 titles at 88 px, and one accent colour (Moderate
  yellow) used only on the thing the film follows. One light scene for contrast.
- **Motion:** titles land, then hold still, with varied entrances (blur by word, ink by word,
  blur the whole line). Five kinds of transition: a whip, a carry, a dip, a match cut, a blur swap.
  Slow camera pushes on the real map. No bounce on UI and no click rings.
- **Voice:** Kokoro `af_heart` through `hyperframes tts`, on this computer, normalised to about
  -16 LUFS. The voice is the clock: each scene starts on its line. The titles say the same
  thing in fewer words, so it works muted.
- **Music and sound:** no music. Only the sound effects bundled with the skill (Pixabay licence,
  no credit needed): whoosh, typing, click, pop, at volume 0.28–0.7. Each one starts so its peak
  lands one frame after its picture.
- **What broke, and the fix:**
  - Animating the map's blur replaced its dark-mode filter, and the map turned light. Fix: put
    the blur on a wrapper, so the map keeps its own filter.
  - Crops of the captured site cut off rounded ends, or showed bits of the neighbouring chips.
    The layout file's measurements were a few pixels off. Fix: measure the real pixels on the
    captured image.
  - The English voice said "Reykjavík" and "Grensás" the English way. Fix: respell them for the
    voice ("Rake-ya-veek", "Grenn-souse"), picked by ear from four test takes. The titles keep the
    real spelling.
  - Two sounds on the same audio track overlapped and gave a warning. Fix: one track per
    overlapping sound.
  - Rendering stopped working when HyperFrames' own Chrome lost a file (`icudtl.dat`), and Edge
    couldn't stand in for it. Fix: `hyperframes browser ensure --force` downloads it again.
- **Good for:** launch films for a real web app, where the product itself is the best picture.

## Notes for next time
- Choose the voice before the storyboard, as the guide says. Adding it afterwards meant retiming every frame.
- Write Icelandic names the way they sound in the voice script from the start, and test them by ear.
- Measure crops on the captured image itself, not from the layout file.
- Filters don't stack in GSAP: a tweened `filter` replaces the element's own. Animate a wrapper instead.
- The agent can't hear. It can only measure loudness and clipping, so listen to every take yourself.
- When only the sound changes, the picture doesn't need rendering again: the soundtrack can be rebuilt with ffmpeg and put under the same video.
