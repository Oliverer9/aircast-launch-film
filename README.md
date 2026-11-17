# Films: AirCast Iceland launch film

**Live page:** https://oliverer9.github.io/aircast-launch-film/

Vefskólinn guide 4.4, "Animations with Claude". A 40-second launch film for
[AirCast Iceland](https://aircast-iceland.onrender.com/), made with Claude Opus 5.5 and HyperFrames.

## Hand-in

| What the guide asks for | Where it is |
|---|---|
| The film, 720p MP4 | [aircast-launch-film/renders/aircast-launch-film-720p.mp4](aircast-launch-film/renders/aircast-launch-film-720p.mp4) (1080p: [aircast-launch-film-1080p.mp4](aircast-launch-film/renders/aircast-launch-film-1080p.mp4)) |
| The storyboard page, and one change made because of it | [aircast-launch-film/boards/storyboard.html](aircast-launch-film/boards/storyboard.html). The change list is at the top of the page. |
| STYLE-LIBRARY.md, with a row and a "what broke" note | [STYLE-LIBRARY.md](STYLE-LIBRARY.md) |
| The prompts and the model | [aircast-launch-film/PROMPTS.md](aircast-launch-film/PROMPTS.md) |

## The plan and the review

- [BRIEF.md](aircast-launch-film/BRIEF.md): message, audience, length, voice
- [PITCHES.md](aircast-launch-film/PITCHES.md): the four pitches, and the one picked
- [SCRIPT.md](aircast-launch-film/SCRIPT.md): every title and voice line
- [SPEC.md](aircast-launch-film/SPEC.md) and [STORYBOARD.md](aircast-launch-film/STORYBOARD.md): the shots, their timing and the look
- [REVIEW.md](aircast-launch-film/REVIEW.md): what was checked and fixed before rendering

## Make it again

Needs Node 22+, FFmpeg, and Python with `kokoro-onnx` and `soundfile` for the voice.

```bash
cd aircast-launch-film
npx hyperframes@0.8.222 preview                                        # open it in Studio
npx hyperframes@0.8.222 render -o renders/aircast-launch-film-1080p.mp4   # render it
```

Map tiles © OpenStreetMap contributors. Sound effects from Pixabay (see `aircast-launch-film/assets/sfx/CREDITS.md`).
