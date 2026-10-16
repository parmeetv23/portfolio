# Portfolio redesign workspace

The `portfolio-redesign` branch checkpoints the editorial design exploration.
It starts from `main` at `ad9d47ce84951134caf21fa09acf7ebbecb5a99d`.
The branch setup did not move `main`, push any refs, deploy a prototype, or change
hosting configuration for parmeetvirdi.com.

## Run and compare locally

```sh
npm ci
npm run dev
```

Open these paths on the local development server:

| Prototype | Route | Design report |
| --- | --- | --- |
| Editorial V1 | `/design-lab/editorial` | [Initial exploration](../output/playwright/design-exploration/REPORT.md) |
| Experimental | `/design-lab/experimental` | [Initial exploration](../output/playwright/design-exploration/REPORT.md) |
| Editorial V2 | `/design-lab/editorial-v2` | [V2 report](../output/playwright/editorial-v2/REPORT.md) |
| Editorial V3 | `/design-lab/editorial-v3` | [V3 report](../output/playwright/editorial-v3/REPORT.md) |
| Personal note, lake photograph | `/design-lab/editorial-personal` | [Personal variation](../output/playwright/editorial-personal/REPORT.md) |
| Personal note, valley photograph | `/design-lab/editorial-personal-2` | [Second photograph](../output/playwright/editorial-personal-2/REPORT.md) |

V3 is the preferred editorial foundation from the design discussion. The personal
variations are alternatives for comparison; neither is promoted to production.
The existing design-lab layout applies `noindex, nofollow` metadata and rejects
production requests with Next's `notFound()`. This is a development-only guard,
not an authentication system.

The public homepage and other public-page source are unchanged by this checkpoint.
Earlier professional-content updates already belong to the parent `main` history.
The pending dependency additions (`gsap`, `@gsap/react`, and the self-hosted Outfit
font package) are included because the design prototypes import them. Their
versions are recorded in the lockfile.

## What is versioned

- All prototype source under `app/design-lab`, including font files and licenses.
- Both supplied hiking photographs and their optimized WebP/JPEG derivatives.
  The originals are retained unchanged for future asset preparation.
- Design reports, final desktop/mobile/tablet comparisons, and useful interaction
  and footer captures linked by the reports.
- Structured browser, responsive, scope, production-guard, and image-optimization
  results, plus the review/capture scripts used to produce them.
- A production-page reference report and its requested viewport captures, with
  the full-page Home images retained as a stable visual comparison.

These are historical review artifacts. Their recorded checks and measurements
describe the corresponding iteration, not an automatic guarantee about future
changes. Local server links in reports require running the development server.

## What stays local

`.gitignore` excludes generated output by default, then permits the report,
review-script, structured-result, and final-image categories above. It separately
excludes temporary hash baselines, superseded `first` screenshots, two redundant
V3 viewport images, and duplicate full-page Projects/Experience captures from the
production reference review.

Raw test logs, network exports, DOM snapshots, browser session archives, caches,
and other temporary output remain on disk and are not committed. Reports identify
raw logs as local-only rather than linking to files absent from the repository.
Existing dependency/build/cache ignores remain in effect. Application source,
project data, photographs, optimized assets, and font licenses are not ignored.

No existing files were discarded as part of the checkpoint setup. A preflight
inventory of original file hashes and Git refs was recorded outside the repository
for verifying preservation during that operation.

## Continue work

Use `portfolio-redesign` for further design commits. Keep `main` as the stable
production branch; merging or publishing is a separate decision. This setup does
not configure an upstream branch or push to GitHub.

Relevant checks:

```sh
npm run typecheck
npm run lint
```

Browser review scripts live beside their reports under `output/playwright` and
use the installed Playwright CLI workflow. Captures and logs from future runs
should be reviewed before committing; first-pass and raw session artifacts remain
local according to `.gitignore`.
