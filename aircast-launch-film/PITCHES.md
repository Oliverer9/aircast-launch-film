# Pitches: AirCast Iceland launch film (40 s)

Four looks that are deliberately different from each other, and from the watercolour,
arcade and neo-punk films shown in class. All of them use a saved snapshot of real AirCast
data, so every render is the same.

## 1. Living map (the site, alive)
- **Concept:** the film is AirCast's own map coming to life. Iceland draws itself, the
  stations light up one by one in their level colours, the wind streaks start to move, and
  the camera dives into Reykjavík, where the "Moderate" badge appears.
- **Look:** the site's own colours, font (Inter) and cards, so the film and the site feel
  like one product.
- **Technology:** HTML + GSAP in HyperFrames; Canvas 2D for the wind. Light render.
- **First five seconds:** a dark screen, a single line traces Iceland's coastline, and
  "AirCast Iceland" fades in under it.

## 2. Topographic ink
- **Concept:** a cartographer's drawing. Contour lines spread across Iceland like ink on
  paper; pollution blooms as watercolour-free ink washes; the wind is drawn as hatched
  pen strokes. Calm and editorial.
- **Look:** cream paper, dark navy ink, one accent colour per level; a serif title.
- **Technology:** SVG stroke animation with GSAP in HyperFrames. Light render.
- **First five seconds:** a pen nib draws the coastline in one continuous stroke.

## 3. Aurora data
- **Concept:** the night sky over Iceland, where the northern lights are made of the
  air quality data: each ribbon is a station, its colour is the level, and its sway follows
  the measured wind. It ends by "pulling down" the sky into the site.
- **Look:** deep night blues, glowing ribbons, stars; big white type.
- **Technology:** Canvas 2D shaders-style drawing in HyperFrames. Medium render.
- **First five seconds:** stars fade in, then one green ribbon unfurls across the sky.

## 4. Breath on a window (a bit weird)
- **Concept:** a cold window. Someone breathes on it, the glass fogs, and a finger writes
  "Is the air OK today?" Through the cleared strokes you see the AirCast map behind the glass.
- **Look:** soft blur, condensation, a hand-written line, then crisp UI behind.
- **Technology:** Canvas 2D with blur and masks in HyperFrames. Medium render.
- **First five seconds:** fog spreads across the screen with a faint breath sound.

## My pick
**1, Living map.** It shows the real product, it is the cheapest to render on a laptop,
and it works muted because every scene is a visual of the site doing its thing. If you
want something more memorable, mix it with the ending of **4**: the window clears to
reveal the live site.

## Questions (my default in brackets)
1. Length? [40 s]
2. Voice or no voice? [no voice, music only, works muted]
3. Language on screen? [English]
4. Where is it shown? [LMS/Padlet muted, and a projector]
5. Should the last frame show the address? [yes: aircast-iceland.onrender.com]
