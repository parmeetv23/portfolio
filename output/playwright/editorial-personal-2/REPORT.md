# Second photograph variation

> Checkpoint archive: raw logs, browser sessions, temporary hash baselines, and
> first-pass captures remain on disk but are excluded from Git. Final comparison
> assets and structured review results are versioned; see
> [the redesign index](../../../docs/PORTFOLIO-REDESIGN.md).

Preview: http://127.0.0.1:3000/design-lab/editorial-personal-2

Compare with the [first photograph](http://127.0.0.1:3000/design-lab/editorial-personal).

Uses the same personal copy, layout, typefaces, colors, image proportions, and
interactions. Only the photograph, its alternative text, and prototype metadata
and comparison links differ. Original versions and production remain unchanged.

The second image adds a brighter blue presence and a broader landscape view.
The first remains the quieter fit with the evergreen palette; this version is
available for direct comparison without filtering or cropping either photograph.

The original second photograph is unchanged. Separate 480px and 960px WebP copies
weigh 20,614 and 79,996 bytes; the JPEG fallback is 99,359 bytes. Responsive delivery,
lazy loading, explicit dimensions, and meaningful alternative text are retained.
See [optimization details](image-optimization.json).

Screenshots:

- [Desktop detail](desktop-note.png), [full desktop](desktop-full.png)
- [Mobile detail](mobile-note.png), [full mobile](mobile-full.png)

Checks:

- TypeScript and ESLint passed: typecheck (raw log retained locally, excluded from Git), lint (raw log retained locally, excluded from Git).
- [Browser measurements](browser-results.json): photograph loaded at its full
  4:3 proportion on desktop and mobile; no horizontal overflow at 320, 390, or
  1440px; footer links visible at the narrowest width.
- No console errors, warnings, uncaught page errors, or HTTP failures during review.
- [Scope check](scope-check.json): all 54 existing app/data/public/dependency files
  match their baseline hashes, including both original photographs and the first
  personal variation.
- `git diff --check` passed. No dependencies added. Nothing deployed.
