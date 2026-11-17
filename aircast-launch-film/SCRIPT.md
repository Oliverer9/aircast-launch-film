# Script: every word on screen

A voice (Kokoro "Heart", made on this computer with `hyperframes tts`) says what the viewer
sees; the titles say the same thing in fewer words, so the film also works muted. The rest is
the product's own text (real, from the captured site). Real numbers only, from the data snapshot taken
30.10.2026 at 21:04 UTC (`assets/data/air-and-wind.json`).

| Shot | Time (s) | Title on screen | Product text the viewer reads |
|---|---|---|---|
| 1 | 0.3–3.7 | Is the air OK right now? | the map, coloured station dots; Grensás pulses |
| 2 | 4.3–6.7 | Air quality is measured here | Loftgæði: "Reykjavik Grensas · NO₂ 25.1 µg/m³" |
| 2 | 6.8–8.5 | Wind is measured there | Veðurstofa: "Reykjavík - Bústaðavegur · 4 m/s SSE" |
| 3 | 8.9–11.5 | AirCast Iceland puts them together | the two stations join: "1.4 km apart" |
| 4 | 12.2–17.4 | Pick a station | the site; the badge "Air quality: Moderate" |
| 5 | 18.0–20.0 | See why | "Nitrogen dioxide (NO₂) 25.1 µg/m3 · Moderate" |
| 5 | 20.6–24.5 | At 10:00 it reached Poor | the last 24 hours of NO₂ at Grensás |
| 6 | 24.8–29.8 | And where the wind takes it | "Wind 4 m/s from SSE" |
| 7 | 30.6–34.6 | Iceland's air and wind, live | "20 Good · 1 Fair · 1 Moderate · 8 No index" |
| 8 | 36.0–40.0 | AirCast Iceland | aircast-iceland.onrender.com |

Rules from the skill: at most 6 words a line, one line at a time, no full stops; each
line holds 0.3 s a word + 0.5 s; the last at least 2 s.

## Voice

Made with `hyperframes tts -v af_heart` (one file per line in `assets/voice/`, the untouched
takes in `assets/voice/raw/`), then brought up to about -16 LUFS with ffmpeg `loudnorm`
(true peak -1.5 dB). "Grensás" and "Reykjavík" are spelt the way they sound for the voice
("Grenn-souse", "Rake-ya-veek", picked by ear from four test takes in `assets/voice/tests/`);
the titles keep the real spelling.

| File | Starts (s) | Says |
|---|---|---|
| v1.wav | 0.4 | Is the air in Iceland safe to breathe right now? |
| v2.wav | 4.3 | Air quality is measured by one agency. Wind, by another. |
| v3.wav | 8.8 | AirCast Iceland puts them together on one map. |
| v4.wav | 12.1 | Pick a station, like Grenn-souse in Rake-ya-veek. Right now: moderate. |
| v5.wav | 17.7 | Nitrogen dioxide is the reason. At ten this morning, it reached poor. |
| v6.wav | 24.8 | And the wind shows where it's going: four metres a second, from the south-southeast. |
| v7.wav | 30.6 | Iceland's air and wind, live. |
| v8.wav | 35.6 | AirCast Iceland. Try it now. |
