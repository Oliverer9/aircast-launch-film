// Writes compositions/s3-together.html: the real OpenStreetMap map of Reykjavík around the
// two stations (tiles from tools/get_tiles.mjs), in AirCast's dark-mode look, with the
// air quality station, the weather station and the 1.4 km line between them.
// The tiles are written into the HTML (not made by script) so the renderer loads them all.
//
// Run from the film folder: node tools/make_s3.mjs

import { readFileSync, writeFileSync } from 'node:fs';

const t = JSON.parse(readFileSync('assets/tiles/tiles.json', 'utf8'));
// The midpoint of the stations sits at frame (980, 600), a little below centre for the title.
const fx = (tx) => Math.round((tx - t.centre.x) * 256 + 980);
const fy = (ty) => Math.round((ty - t.centre.y) * 256 + 600);

const tiles = [];
for (let x = t.x0; x <= t.x1; x++) {
  for (let y = t.y0; y <= t.y1; y++) {
    tiles.push(`      <img id="s3-t-${x}-${y}" class="s3-tile" src="assets/tiles/${t.z}/${x}/${y}.png" alt="" style="left: ${fx(x)}px; top: ${fy(y)}px" />`);
  }
}
const g = { x: fx(t.grensas.x), y: fy(t.grensas.y) };
const b = { x: fx(t.busta.x), y: fy(t.busta.y) };
const mid = { x: Math.round((g.x + b.x) / 2), y: Math.round((g.y + b.y) / 2) };

const html = `<template>
  <style>
    #root {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: #1b2633;
    }
    /* The camera on the map; it carries the arrival's blur, so the map keeps its own filter. */
    #s3-world {
      position: absolute;
      inset: 0;
    }
    /* The site's dark map: OpenStreetMap tiles inverted and turned back to their own hues. */
    #s3-map {
      position: absolute;
      inset: 0;
      filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(0.9);
    }
    .s3-tile {
      position: absolute;
      width: 256px;
      height: 256px;
    }
    #root .title {
      left: 96px;
      top: 96px;
    }
    .s3-pin {
      position: absolute;
      width: 56px;
      height: 56px;
      margin: -28px 0 0 -28px;
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: 0 0 0 4px #ffffff;
    }
    #s3-pin-air {
      background: var(--moderate);
      border: 6px solid #1a1a1a;
    }
    #s3-pin-wind {
      background: #ffffff;
      border: 6px solid #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .s3-label {
      position: absolute;
      padding: 14px 24px;
      background: #152230;
      border: 2px solid #2b3b4c;
      border-radius: 16px;
      color: var(--ink);
      font-size: 34px;
      font-weight: 700;
      white-space: nowrap;
    }
    .s3-label small {
      display: block;
      font-size: 28px;
      font-weight: 600;
      color: var(--muted);
    }
    #s3-km {
      position: absolute;
      transform: translate(-50%, -100%);
      padding: 8px 18px;
      background: #ffffff;
      border-radius: 999px;
      color: var(--light-ink);
      font-size: 34px;
      font-weight: 800;
      white-space: nowrap;
    }
    /* The dip before the cut: the frame darkens 40% for 3 frames, so the cut reads as meant. */
    #s3-dip {
      position: absolute;
      inset: 0;
      background: #000000;
      opacity: 0;
    }
    #s3-credit {
      position: absolute;
      right: 16px;
      bottom: 12px;
      padding: 4px 10px;
      background: rgba(13, 22, 32, 0.8);
      color: #c7d6e4;
      font-size: 18px;
    }
  </style>
  <div id="root" data-composition-id="s3" data-width="1920" data-height="1080">
    <div id="s3-world">
      <div id="s3-map">
${tiles.join('\n')}
      </div>
    </div>
    <svg id="s3-line" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true" style="position: absolute; left: 0; top: 0">
      <line id="s3-join" x1="${g.x}" y1="${g.y}" x2="${b.x}" y2="${b.y}" stroke="#ffffff" stroke-width="5" stroke-dasharray="16 12" stroke-linecap="round" />
    </svg>
    <div id="s3-pin-air" class="s3-pin" style="left: ${g.x}px; top: ${g.y}px"></div>
    <div id="s3-pin-wind" class="s3-pin" style="left: ${b.x}px; top: ${b.y}px">
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" style="transform: rotate(330deg)">
        <path d="M12 3v16M6 9l6-6 6 6" fill="none" stroke="#0b5cad" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div id="s3-label-air" class="s3-label" style="left: ${g.x + 52}px; top: ${g.y - 48}px">Reykjavik Grensas<small>air quality · Loftgæði</small></div>
    <div id="s3-label-wind" class="s3-label" style="right: ${1920 - b.x + 52}px; top: ${b.y - 48}px">Reykjavík - Bústaðavegur<small>wind · Veðurstofa</small></div>
    <div id="s3-km" style="left: ${mid.x}px; top: ${mid.y - 24}px">1.4 km apart</div>
    <div id="s3-credit" data-layout-ignore>© OpenStreetMap contributors</div>
    <h1 id="s3-title" class="title clip" data-start="0.3" data-duration="2.7">AirCast Iceland puts them together</h1>
    <div id="s3-dip"></div>
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      // The map arrives a little large and settles (its whoosh peaks on the cut).
      tl.from('#s3-world', { scale: 1.08, filter: 'blur(10px)', duration: 0.6, ease: 'power3.out', transformOrigin: '${mid.x}px ${mid.y}px' }, 0);
      Film.blurLine(tl, '#s3-title', 0.3);
      // The two stations land, the air one first, each with its label.
      tl.from('#s3-pin-air', { scale: 0, duration: 0.4, ease: 'expo.out' }, 0.4);
      tl.from('#s3-label-air', { opacity: 0, filter: 'blur(6px)', duration: 0.2, ease: 'power2.out' }, 0.5);
      tl.from('#s3-pin-wind', { scale: 0, duration: 0.4, ease: 'expo.out' }, 0.6);
      tl.from('#s3-label-wind', { opacity: 0, filter: 'blur(6px)', duration: 0.2, ease: 'power2.out' }, 0.7);
      // Then the line joins them, drawn from the air station to the wind station, and the distance lands.
      tl.from('#s3-join', { attr: { x2: ${g.x}, y2: ${g.y} }, duration: 0.6, ease: 'power2.inOut' }, 0.95);
      tl.from('#s3-km', { opacity: 0, scale: 0.8, duration: 0.35, ease: 'expo.out' }, 1.5);
      tl.to('#s3-dip', { opacity: 0.4, duration: 0.1, ease: 'none' }, 2.9);
      tl.to({}, { duration: 3 }, 0);
      window.__timelines['s3'] = tl;
    })();
  </script>
</template>
`;
writeFileSync('compositions/s3-together.html', html);
console.log(`wrote compositions/s3-together.html: ${tiles.length} tiles, Grensás at (${g.x}, ${g.y}), Bústaðavegur at (${b.x}, ${b.y})`);
