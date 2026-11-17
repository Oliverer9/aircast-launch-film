# Review: AirCast Iceland launch film

What was checked before the render, and what is left as it is on purpose.

## How it was checked

- `hyperframes lint`: 0 errors.
- `hyperframes check --json`: passes (`ok: true`).
- `hyperframes snapshot --review`: every scene at its start and middle, a 5-frame strip around
  each of the 7 cuts, and the beats at phone width (all in `review/`).
- Close crops (`snapshot --zoom`) on the badge and the summary chips, the two places where a
  piece of the real site is lifted off and landed again.
- Sound was measured with `hyperframes audio`, not heard: no clipping; the voice is around
  -16 LUFS; each effect starts so its peak lands one frame after its picture.

## Fixed in this pass

- Scene 3: animating the map's blur replaced its dark-mode filter, so the map turned light.
  The blur now sits on a wrapper (`#s3-world`), and the map keeps its own filter.
- Scene 4: the plate's badge is about 8 px wider than the measured box, so its rounded end
  showed beside the landed copy. Re-measured on the plate (page x 1104 to 1544).
- Scene 7: the strip that hides the chips picked up the chips' rounded tops ("( )"), and
  the chip crops cut off their rounded ends. Both re-measured on the plate.
- Scene 2: the whip landed on an empty page for 0.3 s; the title and record now start as it lands.
- Scene 4: the badge's slot was empty for 0.4 s before it landed; it now lands as "Right now" starts.
- The second chip pop and the typing were on the same audio track as other sounds; each overlap
  now has its own track.

## Left as it is

- `line_unread` on the wind record's last line (`"f": 3.99, "d_txt": "SSE"`): it is on screen
  0.84 s, under the 1.7 s floor. Fixing it means moving the voice, which says "Wind, by
  another" over it; the wind speed is shown again, readable, in scene 6.
- `duplicate_media_discovery_risk` on scenes 4, 6 and 7: the same site plate is used for
  several crops at once on purpose (the badge, the wind tile, the chips).
- The phone view: the JSON records in scene 2 are small at phone width. They are there to
  show that the two sources are different, not to be read word by word; the titles carry it.

## Second pass: Icelandic names (17.11.2026)

- Scene 4's voice line now says the names the Icelandic way ("Grenn-souse", "Rake-ya-veek"),
  picked by ear from four takes in `assets/voice/tests/`. "Right now" lands 0.05 s later than before.
- The badge pop moved to audio track 4, so it no longer overlaps the click on track 3.
- HyperFrames could not render this time: its cached headless Chrome had lost `icudtl.dat`
  ("Invalid file descriptor to ICU data"), and Edge would not stand in for it. Only the sound had
  changed, so the picture of the 1 November render was kept as it is (same video stream, checked
  by MD5) and the soundtrack was rebuilt with ffmpeg from the `<audio>` clips in `index.html`.
  The method was checked by first rebuilding the old soundtrack: it matched the old render once
  brought to the same -1.5 dB peak that HyperFrames uses.
- Then HyperFrames' Chrome was downloaded again (`hyperframes browser ensure --force`), the check
  passed, and the film was rendered properly (4 min 6 s). That render replaced the ffmpeg version: the
  picture matched it (PSNR 58 dB) and so did the sound. The 720p copy was made from it.
