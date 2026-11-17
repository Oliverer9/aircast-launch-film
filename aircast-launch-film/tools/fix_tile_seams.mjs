// Repairs the 1-pixel seams between map tiles in the 2x screenshot of the site.
// The site's map uses a fractional zoom, and at 2x Chrome leaves a dark line where two
// tiles meet. It is a rendering artefact, not AirCast content, so each seam pixel is
// replaced with the average of its two neighbours. Only the map area is touched.
//
// Usage: node tools/fix_tile_seams.mjs <in.png> <out.png>

import { readFileSync, writeFileSync } from 'node:fs';
import zlib from 'node:zlib';

const [input, output] = process.argv.slice(2);
const layout = JSON.parse(readFileSync('assets/plates/layout.json', 'utf8'));

function decode(file) {
  const b = readFileSync(file);
  let i = 8, w, h, ct;
  const idat = [];
  while (i < b.length) {
    const len = b.readUInt32BE(i), type = b.toString('ascii', i + 4, i + 8), d = b.subarray(i + 8, i + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); ct = d[9]; }
    if (type === 'IDAT') idat.push(d);
    i += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = ct === 6 ? 4 : 3, stride = w * bpp, px = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[y * stride + x - bpp] : 0, up = y ? px[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y ? px[(y - 1) * stride + x - bpp] : 0;
      let v = row[x];
      if (f === 1) v += a; else if (f === 2) v += up; else if (f === 3) v += (a + up) >> 1;
      else if (f === 4) { const p = a + up - c, pa = Math.abs(p - a), pb = Math.abs(p - up), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? up : c; }
      px[y * stride + x] = v & 255;
    }
  }
  return { w, h, bpp, px, ct };
}

function encode({ w, h, bpp, px, ct }, file) {
  const stride = w * bpp, raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) { raw[y * (stride + 1)] = 0; px.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride); }
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (buf) => { let c = 0xffffffff; for (const byte of buf) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = ct; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
}

const im = decode(input);
const lum = (x, y) => { const o = (y * im.w + x) * im.bpp; return im.px[o] + im.px[o + 1] + im.px[o + 2]; };
// The map area in plate pixels (2x the measured page box), inset past its rounded border.
const m = layout.map;
const X0 = Math.ceil(m.x * 2) + 8, X1 = Math.floor((m.x + m.w) * 2) - 8;
const Y0 = Math.ceil(m.y * 2) + 8, Y1 = Math.floor((m.y + m.h) * 2) - 8;

// A seam is a full column (or row) that is darker than both neighbours along most of its length.
function seams(vertical) {
  const found = [];
  const [a0, a1, b0, b1] = vertical ? [X0, X1, Y0, Y1] : [Y0, Y1, X0, X1];
  for (let a = a0 + 1; a < a1 - 1; a++) {
    let darker = 0;
    for (let b = b0; b < b1; b++) {
      const [x, y] = vertical ? [a, b] : [b, a];
      const here = lum(x, y), n1 = vertical ? lum(x - 1, y) : lum(x, y - 1), n2 = vertical ? lum(x + 1, y) : lum(x, y + 1);
      if (here < Math.min(n1, n2) - 6) darker++;
    }
    if (darker / (b1 - b0) > 0.5) found.push(a);
  }
  return found;
}

const cols = seams(true), rowsFound = seams(false);
for (const x of cols) for (let y = Y0 - 8; y < Y1 + 8; y++) for (let k = 0; k < im.bpp; k++) {
  const o = (y * im.w + x) * im.bpp + k; im.px[o] = (im.px[o - im.bpp] + im.px[o + im.bpp]) >> 1;
}
for (const y of rowsFound) for (let x = X0 - 8; x < X1 + 8; x++) for (let k = 0; k < im.bpp; k++) {
  const o = (y * im.w + x) * im.bpp + k; im.px[o] = (im.px[o - im.w * im.bpp] + im.px[o + im.w * im.bpp]) >> 1;
}
encode(im, output);
console.log(`seams repaired: columns ${cols.join(', ') || 'none'}; rows ${rowsFound.join(', ') || 'none'}`);
