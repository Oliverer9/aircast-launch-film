# The HyperFrames skills: what they tell the agent

Installed 30.10.2026 with `npx skills add heygen-com/hyperframes`, into this `films` project
only (`.agents/skills`). Chosen: 4 of the 7.

| Skill | Picked | What it does |
|---|---|---|
| hyperframes | yes | The main rules: how a film is built and rendered, and the work loop |
| hyperframes-cli | yes | How to use the `hyperframes` command, and fix failed renders |
| media-use | yes | Music, sound effects, icons, voice; free tools or HeyGen's paid ones |
| hyperframes-registry | yes | ~450 ready-made blocks (titles, transitions, map overlays) |
| figma | no | Only for Figma designs |
| remotion-to-hyperframes | no | Only for converting films from other tools |
| slideshow | no | Live presentations, not videos |
| find-skills (offered) | no | Would make the agent go looking for more skills on its own |

## Rules the agent will follow

- **The same second always looks the same:** no `Date.now()`, no unseeded `Math.random()`,
  no network fetches, no timers; everything follows one paused timeline. (So the film uses a
  saved snapshot of AirCast's data, never live data.)
- **Its own work loop for a film over 15 s:** first three storylines in words only, and the
  person picks; then a `SPEC.md` where "every adjective is a number"; then `check`,
  `snapshot` and a written `REVIEW.md`; and it **only renders when the person approves**
  the preview.
- **Music and sound by default** for a film over ~15 s, unless silence is asked for.
- **Show real things from their source:** for a website, `npx hyperframes capture <url>`
  takes the real site instead of redrawing it.
- **Fonts:** only the bundled ones work by name; any other font must be a file in
  `assets/fonts/` (matches the guide's step 06).

## Things to watch

- **Paid services:** `media-use` prefers HeyGen's paid catalog for music and images, and says
  to *confirm before a paid call*. With no HeyGen account it falls back to free tools. The
  brief says music made in code, so the free route is the one to use.
- **Sales nudges:** the skill tells the agent to call the preview "the HyperFrames desktop app,
  never Studio", to offer that app, and to check `usage` (the person's plan). The course calls
  it Studio; both mean the same preview.
- **Feedback:** after a render it sends a rating to HeyGen, *unless telemetry is off*. It is
  off on this laptop (`telemetryEnabled: false` in `~/.hyperframes/config.json`).
- **Downloads:** installing registry items needs the network; a smarter search needs a ~33 MB
  download, which the skill says to offer, not do silently.
