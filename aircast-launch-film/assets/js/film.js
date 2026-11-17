// Shared title moves for the scenes (SPEC MOTION: titles land, then hold dead still).
// Each scene adds these to its own paused timeline, so every frame can be rendered on its own.
window.Film = (function () {
  // Wraps each word of a title in span.w once. A child element (like the accent word) stays
  // one word, so its own colour is kept.
  function words(el) {
    if (el.dataset.split) return el.querySelectorAll('.w');
    const parts = [];
    for (const node of [...el.childNodes]) {
      if (node.nodeType === 3) {
        for (const t of node.textContent.split(/(\s+)/)) {
          if (!t) continue;
          parts.push(/^\s+$/.test(t) ? document.createTextNode(t) : Object.assign(document.createElement('span'), { className: 'w', textContent: t }));
        }
      } else {
        node.classList.add('w');
        parts.push(node);
      }
    }
    el.replaceChildren(...parts);
    el.querySelectorAll('.w').forEach((w) => (w.style.display = 'inline-block'));
    el.dataset.split = '1';
    return el.querySelectorAll('.w');
  }

  const q = (sel) => document.querySelector(sel);

  return {
    // Word by word, each sharpening from a 6 px blur, 0.067 s apart; no position change.
    blurWords(tl, sel, at) {
      const w = words(q(sel));
      gsap.set(w, { opacity: 0, filter: 'blur(6px)' });
      tl.to(w, { opacity: 1, filter: 'blur(0px)', duration: 0.13, stagger: 0.067, ease: 'power2.out' }, at);
    },
    // The whole line sharpens from 8 px in 0.18 s.
    blurLine(tl, sel, at) {
      const w = words(q(sel));
      gsap.set(w, { opacity: 0, filter: 'blur(8px)' });
      tl.to(w, { opacity: 1, filter: 'blur(0px)', duration: 0.18, ease: 'power2.out' }, at);
    },
    // Word by word from a pale grey to ink, 0.09 s apart.
    inkWords(tl, sel, at, from) {
      const w = words(q(sel));
      const ink = getComputedStyle(q(sel)).color;
      gsap.set(w, { color: from });
      tl.to(w, { color: ink, duration: 0.2, stagger: 0.09, ease: 'power1.out' }, at);
    },
    // Leaves with a blur and fade in 0.18 s.
    blurOut(tl, sel, at) {
      tl.to(words(q(sel)), { opacity: 0, filter: 'blur(8px)', duration: 0.18, ease: 'power2.in' }, at);
    },
  };
})();
