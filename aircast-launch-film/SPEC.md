# SPEC: AirCast Iceland launch film

GOAL:    the viewer wants to open the site and check their own town's air.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps. Delivery copy 1280 x 720.
TIME:    40 s x 30 fps = 1200 frames.
DATA:    one snapshot, 30.10.2026 21:04 UTC (assets/data). The film never fetches anything.
LOOK:    the product itself. Ground #0d1620 (the site's dark page) with the header's
         navy gradient #060f19 -> #0d2a45; ink #e8eef4; muted #a8b7c6.
         Accent is rationed: the level colour of Grensás, Moderate yellow #f0e641, on the
         dot, the badge, the NO2 bar and one word of the claim. Nothing else is yellow.
         Display: Inter 800, 88 px titles (8.1% of the height), tracking -2%.
         Body/product text: the captured site at 2x (assets/plates/site-2x.png).
         One light world: shot 2 on the site's light page colour #f2f5f8 with ink #10202f.
         No grain, no vignette, no glow, no blur on text.
OBJECTS: the real AirCast map (OpenStreetMap tiles as the site shows them) with its
         station dots; the real badge, NO2 bar, chart and wind tile from the site;
         the site's own cloud mark (inline SVG from the site's header).
         The cursor: a white arrow with a 2 px navy outline, 64 px tall (6% of the frame).
MOTION:  enter: power3.out 14 frames; move/camera: power2.inOut 18 frames;
         exit: power2.in 10 frames; one hero move per shot, secondaries 4-6 frames later
         at 60% of the travel; titles land and then hold still (no drift).
         Wind streaks: deterministic particles from the snapshot's 270 wind stations,
         seeded, drawn on canvas as a function of time.
SHOTS:
  1  f0-120     hook: the map plate fills the frame, streaks already moving; Grensás pulses once; title lands at
                f9. Hands off: the frame slides left into the light world.
  2  f120-258   tension: light world. Two real records, as the APIs give them, type in one
                after the other; titles name each. Hand-off: both records fly to two points
                on a small Iceland.
  3  f258-348   reveal: the real Reykjavík map (OpenStreetMap, dark); the two stations join
                with a line "1.4 km apart"; title "AirCast Iceland puts them together".
  4  f348-528   proof 1: the whole site (workspace), push to the map, the cursor clicks the
                Grensás dot, which becomes the badge, pushed in at 1.8x.
  5  f528-738   proof 2: all six pollutant rows at 2.3x, the other five dimmed, NO2 lit ("See
                why", f528-603), then its last 24 hours (f603-738, the longest hold) draw as a line (rebuilt from the real history data, in the site's style).
  6  f738-900   payoff: back to the map, pushed in on Reykjavík at 2x, wind streaks at their
                real speeds; the wind tile "4 m/s from SSE" lands.
  7  f900-1050  claim: the real header at 1.5x right under the title; the summary chips land
                one by one.
  8  f1050-1200 end card: the cloud mark is carried in on a wind streak, the wordmark wipes
                in beside it, the address lands and holds 2.5 s.
SOUND:   narrated. A voice (Kokoro "Heart", local) is the clock: each scene starts on the
         line that names it (SCRIPT.md). Under it, no music (Oliver's choice): a few effects
         bundled with the skill (Pixabay licence), each peaking one frame after its picture:
         whoosh on the whip, the map and the mark; typing on the records; click on Grensás;
         pop on the badge, the wind tile and two of the chips.
BANNED:  the skill's defaults (dark void with small floating things, glow, particles as
         decoration, purple gradients, glass cards, cream paper + serif, everything centred,
         everything fading and sliding up, text that drifts, corner labels, three cards in a
         row, a title over a dimmed screenshot, the logo docked in a corner); plus: any
         invented reading, any UI the site doesn't have, health advice of our own.
QA:      f9 (title over the moving map), f200 (both records readable), f330 (the join),
         f470 (the click on Grensás), f600 (NO2 bar legible at >= 26 px), f680 (chart),
         f820 (wind over Reykjavík), f1000 (chips), f1180 (end card, address readable).
