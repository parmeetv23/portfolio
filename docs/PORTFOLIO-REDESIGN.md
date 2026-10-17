# Portfolio redesign workspace

## Public redesign — October 16, 2026

The selected **Editorial Personal 2** direction is now implemented on the public
routes in `portfolio-redesign`. The Git checkpoint groups the completed work into
four focused commits: public application and design system; build isolation and
production prototype safeguards; the supplied résumé PDF; and documentation with
curated visual/verification evidence. Only `portfolio-redesign` is targeted for
push to `origin`. No merge, production deployment, or change to `main` is part of
this checkpoint. The exploration checkpoint notes below are historical.

### Direction and shared system

- Reused the exact `/design-lab/editorial-personal-2` implementation: the V3
  composition, Newsreader display typography, Outfit body text, evergreen ink,
  fog background, sage panels, technical studies, and compact personal note.
- The selected asset is `public/images/editorial-personal-2/mountain-valley-*`,
  the second photograph shown in the approved prototype and its report. Its
  original 4:3 framing, responsive WebP/JPEG sources, and natural color remain.
- Palette: fog `#f1f3ed`, paper `#fafbf7`, ink `#263f38`, sage `#d6ded0`,
  rules `#c9d1c5`. Public muted text is darkened to `#4d5e52` after contrast
  testing, including captions on sage backgrounds.
- Display: Newsreader, restrained tracking and compact line height. Interface
  and body: Outfit. Both are self-hosted, with no remote font requests.
- Layout: 1328px maximum width, 56px desktop gutters, 32px tablet gutters, 20px
  mobile gutters. Major section spacing scales from 64 to 120px. Body copy is
  generally 16–18px; case-study reading measure is capped. Tablet composition
  adapts at 1000px; mobile navigation and stacked layouts start at 600px.
- Shared sticky navigation has route-aware active states, a keyboard-operable
  mobile disclosure, Escape handling, and a skip link. Every public page has
  the same contact footer, with natural document flow and explicit bottom
  padding. No fixed-height footer or scroll-pinned page container is used.

### Implementation

| Route | Implementation |
| --- | --- |
| `/` | Promoted selected homepage, full-stack introduction, professional experience first, selected projects, recorded ML results, compiler interaction, and approved personal note. |
| `/projects` | All nine projects and six categories retained; asymmetric feature pair, alternating wide entries, distinct conceptual diagrams, native filter buttons, live result count. |
| `/projects/[slug]` | All nine static case studies; original overview, contributions, architecture, algorithms, failure handling, optimizations, technologies, results, and limitations retained. Section navigation and previous/next links added to the editorial composition. |
| `/experience` | All three existing professional engagements, responsibilities, technologies, and dates retained. Snap Remedy progression is shown explicitly using the canonical source: intern Apr.–Jul. 2026; developer Jul. 2026–Present. Contributions remain attributed to the engagement as a whole. |
| `/resume` | Current supplied PDF preserved; direct download and new-tab viewing, collapsible native preview, loading message and persistent fallback guidance. |
| Missing routes | Matching editorial 404 page and recovery navigation. |

Public routes live in `app/(site)` without changing their URLs. `SiteShell` owns
the shared navigation, local fonts, and footer. `app/editorial.css` preserves
the selected foundation; `app/portfolio.css` contains the public layout system.
Reusable technical visuals are promoted into `app/components/editorial`, with
no public imports from the development-only design lab. Historical prototypes,
reports, screenshots, font licenses, and their production guard remain intact.
Unused legacy production card/button components were removed.

Project records, professional records, supplied photographs, and dependencies
are unchanged. The redesign does not rewrite the résumé. A replacement PDF
appeared in the working tree during the interruption; that supplied file is
preserved and verified separately from the earlier PDF captures. No project screenshots or repository/demo
URLs were invented. Conceptual graphics identify themselves; the detection
chart is explicitly a redraw of recorded results, with an accessible data table.

Public content renders on the server. Only navigation, filtering, PDF feedback,
and interactive studies use client state. The project filter receives rendered
entries rather than the entire technical dataset. No new dependencies were
added. GSAP remains available to historical prototypes but is not imported by
public pages. The short message trace is user-triggered CSS motion; reduced
motion disables travel, transitions, and smooth scrolling.

`NEXT_DIST_DIR` optionally isolates local build output. Review used separate
`.next-redesign` and `.next-production` directories to avoid overwriting the
pre-existing server on port 3000. Both are ignored. Normal `npm run dev` and
`npm run build` still use `.next`.

### Visual iteration and verification

The browser review began while implementation was in progress. Initial desktop
captures exposed overflowing project figures; removing their percentage height
fixed the overlap. Subsequent review differentiated the scheduler and climate
diagrams, increased small-diagram label sizes, widened the tablet adaptation
breakpoint, and verified the lazy-loaded personal photo. Accessibility testing
then identified weak caption contrast; the muted text token was darkened. The
PDF disclosure was simplified to native behavior after an unreliable reopen
check. The final capture pass uses decoded images and instant programmatic
scrolling so screenshots and footer measurements are stable.

The frontend-design, redesign-existing-projects, design-system, ui-ux-pro-max,
React performance, web-interface-guidelines, and Playwright workflows informed
the implementation and review. GPT Taste was inspected for composition advice;
its randomized redesign and compulsory motion patterns conflict with the
selected direction and were not applied. No new concept exploration was run.

The continuation confirmed TypeScript and zero-warning ESLint checks, then
smoke-tested the saved production build. All 13 public routes rendered, the
caption-contrast audit passed at 390px and 1440px, and the native PDF preview
collapsed, stayed collapsed through loading feedback, and reopened correctly.
The current supplied 103,261-byte PDF was served with SHA-256
`069e6d3217a1c5fb9dda9d79c40aa61b17a25ecf839aa09361c834de1bc61da6`;
its download filename and new-tab opening passed.

Production review also exposed an inherited soft 404: the design-lab layout
hid prototype content and emitted noindex, but its streamed response was HTTP
200. A production-only `beforeFiles` rewrite now rejects `/design-lab/:path*`
through the shared missing-page route before rendering. The original layout
guard and all prototype source remain intact; development has no such rewrite.
This configuration change received a fresh production build and focused guard
verification: all seven prototype paths returned 404 and the checked public
routes returned 200. TypeScript, zero-warning ESLint, and the fresh production
build passed. The 52 successful responsive checks and existing screenshots were
not repeated. Browser coverage remains Chromium; physical devices, Safari,
Firefox, and a manual screen-reader review remain outside this verification.

Final verification details and screenshot links are recorded in
[the final review report](../output/playwright/final-redesign/REPORT.md).

---

## Historical exploration checkpoint

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
