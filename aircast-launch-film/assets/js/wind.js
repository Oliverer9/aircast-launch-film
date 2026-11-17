// Wind streaks for the film, rebuilt from AirCast's own idea (WindLayer.jsx on the site)
// but deterministic: every particle's path is a function of the time t only, from a
// fixed seed, so the same second always draws the same picture (HyperFrames' rule).
//
// Data: window.AIRCAST (assets/js/aircast-data.js) – the snapshot's wind at every weather
// station and the map projection fitted on the live page (page pixels at 1x).
//
// AirWind.draw(canvas, t, view)
//   view = { scale, x, y }: a page pixel (px, py) lands on the canvas at
//   (px * scale + x, py * scale + y). The same numbers the shot's camera uses.
//   Options: { color, density, alpha }

(function () {
  const D = window.AIRCAST;
  const P = D.projection;
  const GRID = { south: 63.2, north: 66.6, west: -24.6, east: -13.4, latStep: 0.05, lonStep: 0.1 };
  const MAX_KM = 40; // like the site: no wind is invented far from any station
  const LIFE = 2.6; // seconds a particle lives before it starts again elsewhere
  const STEP = 1 / 30; // integrate at the film's frame rate
  const TRAIL = 0.8; // seconds of trail drawn behind each particle
  const PAGE_PX_PER_MS = 2.2; // page pixels per second for each m/s of wind

  // Seeded random number for (i, k, salt): the same inputs always give the same value.
  function rand(i, k, salt) {
    let h = (i * 374761393 + k * 668265263 + salt * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }

  // Spread the station readings over a grid (inverse distance weighting), once.
  const rows = Math.round((GRID.north - GRID.south) / GRID.latStep) + 1;
  const cols = Math.round((GRID.east - GRID.west) / GRID.lonStep) + 1;
  const gu = new Float32Array(rows * cols).fill(NaN);
  const gv = new Float32Array(rows * cols).fill(NaN);
  const vectors = D.wind.map((w) => {
    const rad = (w.from * Math.PI) / 180; // the API gives where the wind comes FROM
    return { lat: w.lat, lon: w.lon, u: -w.speed * Math.sin(rad), v: -w.speed * Math.cos(rad) };
  });
  for (let r = 0; r < rows; r++) {
    const lat = GRID.south + r * GRID.latStep;
    for (let c = 0; c < cols; c++) {
      const lon = GRID.west + c * GRID.lonStep;
      let ws = 0, us = 0, vs = 0;
      for (const s of vectors) {
        const dx = (s.lon - lon) * Math.cos(((lat + s.lat) / 2) * (Math.PI / 180)) * 111.32;
        const dy = (s.lat - lat) * 110.57;
        const d = Math.hypot(dx, dy);
        if (d > MAX_KM) continue;
        const w = 1 / Math.max(d, 1) ** 2;
        ws += w; us += s.u * w; vs += s.v * w;
      }
      if (ws > 0) { gu[r * cols + c] = us / ws; gv[r * cols + c] = vs / ws; }
    }
  }

  const toLon = (px) => (px - P.bx) / P.ax;
  const toLat = (py) => (Math.atan(Math.sinh((py - P.by) / P.ay)) * 180) / Math.PI;
  function windAtPage(px, py) {
    const r = Math.round((toLat(py) - GRID.south) / GRID.latStep);
    const c = Math.round((toLon(px) - GRID.west) / GRID.lonStep);
    if (r < 0 || r >= rows || c < 0 || c >= cols) return null;
    const u = gu[r * cols + c];
    return Number.isNaN(u) ? null : { u, v: gv[r * cols + c] };
  }

  function draw(canvas, t, view, options = {}) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const color = options.color || '225, 235, 245';
    const alpha = options.alpha ?? 0.85;
    const count = Math.round((W * H) / (options.density || 1800));
    const trailSteps = Math.round(TRAIL / STEP);
    const pageFromCanvas = (x, y) => [(x - view.x) / view.scale, (y - view.y) / view.scale];

    ctx.lineWidth = Math.max(1.2, 0.55 * view.scale);
    ctx.lineCap = 'round';
    for (let i = 0; i < count; i++) {
      const phase = rand(i, 0, 1) * LIFE;
      const k = Math.floor((t + phase) / LIFE);
      const age = t + phase - k * LIFE;

      // Spawn somewhere on the canvas that has wind (a few seeded tries).
      let px = null, py = null;
      for (let tries = 0; tries < 6 && px === null; tries++) {
        const [qx, qy] = pageFromCanvas(rand(i, k, 2 + tries) * W, rand(i, k, 9 + tries) * H);
        if (windAtPage(qx, qy)) { px = qx; py = qy; }
      }
      if (px === null) continue;

      // Walk it forward along the wind for its age, keeping the last few points.
      const steps = Math.floor(age / STEP);
      const trail = [];
      for (let s = 0; s <= steps; s++) {
        if (s >= steps - trailSteps) trail.push([px * view.scale + view.x, py * view.scale + view.y]);
        const w = windAtPage(px, py);
        if (!w) break;
        px += w.u * PAGE_PX_PER_MS * STEP;
        py -= w.v * PAGE_PX_PER_MS * STEP; // north is up on screen
      }
      if (trail.length < 2) continue;

      // Fade in at birth and out before it restarts, and from tail to head.
      const life = Math.min(1, age / 0.4, (LIFE - age) / 0.4);
      for (let s = 1; s < trail.length; s++) {
        ctx.strokeStyle = `rgba(${color}, ${(alpha * life * s) / trail.length})`;
        ctx.beginPath();
        ctx.moveTo(trail[s - 1][0], trail[s - 1][1]);
        ctx.lineTo(trail[s][0], trail[s][1]);
        ctx.stroke();
      }
    }
  }

  // Where a station dot is on the page (1x), from the fitted projection.
  function pagePoint(lat, lon) {
    return [P.ax * lon + P.bx, P.ay * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) + P.by];
  }

  window.AirWind = { draw, pagePoint, windAtPage };
})();
