// Downloads the OpenStreetMap tiles for frame 3 once, so the film never fetches while it
// renders. The frame shows Reykjavík Grensás (air quality) and Reykjavík - Bústaðavegur
// (wind), 1.4 km apart: at zoom 15 that is about 670 px, enough to see the line between them.
// Tiles: © OpenStreetMap contributors (credited on screen). A one-off download of ~40
// tiles with an identifying User-Agent, as OpenStreetMap's tile policy asks.
//
// Run from the film folder: node tools/get_tiles.mjs

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const Z = 15;
const n = 2 ** Z;
const tileX = (lon) => ((lon + 180) / 360) * n;
const tileY = (lat) => ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n;

// The midpoint of the two stations (from the snapshot) is the frame's centre.
const grensas = { lat: 64.1301, lon: -21.87465 };
const busta = { lat: 64.1275482178, lon: -21.9020004272 };
const cx = (tileX(grensas.lon) + tileX(busta.lon)) / 2;
const cy = (tileY(grensas.lat) + tileY(busta.lat)) / 2;

// Enough tiles to cover 1920 x 1080 around the centre, plus one tile of margin.
const x0 = Math.floor(cx - 960 / 256) - 1, x1 = Math.floor(cx + 960 / 256) + 1;
const y0 = Math.floor(cy - 540 / 256) - 1, y1 = Math.floor(cy + 540 / 256) + 1;

let fetched = 0;
for (let x = x0; x <= x1; x++) {
  for (let y = y0; y <= y1; y++) {
    const file = `assets/tiles/${Z}/${x}/${y}.png`;
    if (existsSync(file)) continue;
    mkdirSync(`assets/tiles/${Z}/${x}`, { recursive: true });
    const res = await fetch(`https://tile.openstreetmap.org/${Z}/${x}/${y}.png`, {
      headers: { 'User-Agent': 'aircast-launch-film/1.0 (Vefskolinn student project; one-off download)' },
    });
    if (!res.ok) throw new Error(`tile ${Z}/${x}/${y}: ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    fetched++;
    await new Promise((r) => setTimeout(r, 150)); // be gentle with the tile server
  }
}

const info = { z: Z, x0, x1, y0, y1, centre: { x: cx, y: cy }, grensas: { x: tileX(grensas.lon), y: tileY(grensas.lat) }, busta: { x: tileX(busta.lon), y: tileY(busta.lat) } };
writeFileSync('assets/tiles/tiles.json', JSON.stringify(info, null, 2));
console.log(`tiles x ${x0}-${x1}, y ${y0}-${y1}: fetched ${fetched}`);
console.log(`stations ${Math.hypot((info.grensas.x - info.busta.x) * 256, (info.grensas.y - info.busta.y) * 256).toFixed(0)} px apart at zoom ${Z}`);
