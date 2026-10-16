# Editorial V2

> Checkpoint archive: raw logs, browser sessions, temporary hash baselines, and
> first-pass captures remain on disk but are excluded from Git. Final comparison
> assets and structured review results are versioned; see
> [the redesign index](../../../docs/PORTFOLIO-REDESIGN.md).

Local prototype: http://127.0.0.1:3000/design-lab/editorial-v2

Created October 16, 2026. Development only, with inherited `noindex, nofollow`
metadata and the existing production `notFound()` guard. Not deployed or promoted.

## What informed this iteration

Reviewed the existing [exploration report](../design-exploration/REPORT.md), both
prototype implementations, V1's saved desktop and mobile captures, and the
Experimental revealed-state capture. Reused those comparison screenshots; none
of the original prototypes was recaptured or changed.

V1's strengths were its readable account of engineering work and accessible
project descriptions. Its weaknesses were a slogan-led opening, broadly reusable
serif treatments, pale diagram cards, and writing that occasionally sounded more
dramatic than the underlying work. Experimental's useful contribution was an
interaction that explained project details, rather than merely decorating them.

## Design decisions

The opening now introduces **Parmeet Virdi**, followed by a direct description of
his work and current role. It pairs an oversized Newsreader name with a large,
original dimensional study of resumable imports. Outfit provides a more compact,
distinct supporting rhythm than V1's Public Sans. The palette shifts from
aubergine/lilac to evergreen, fog, and sage. It remains quiet without depending on
cream, clay, ornamental stamps, or repeated decorative labels.

The composition gives different material different treatment:

- Import architecture gets the dominant opening illustration and a state control.
- IRC-HAT gets a dark, dimensional network study with direct technical copy.
- Pet detection gets an actual comparison of recorded results, rather than a cat
  illustration standing in for evidence.
- The compiler gets an expandable pipeline, replacing V1's small index entry.
- Professional experience uses a pinned desktop heading, one scrubbed reading
  passage, and a user-controlled set of implementation notes.

The main grid uses twelve columns: 7 + 5, then 12, with dense placement. Tablet
project layouts pair visuals with text; mobile returns to a single reading order.
The project strip scrolls only on user input. Motion is confined to the experience
passage and meaningful controls. Reduced motion removes pinning, scrubbing,
illustration movement, and animated scrolling.

The deterministic skill selection used seed 2157: Editorial Split, Outfit,
horizontal accordion, carousel, marquee, title pinning, and text scrubbing.
The carousel became sourced implementation notes and the marquee became a
user-controlled project strip to honor the brief's restraint and factuality.
No testimonials or partner claims were invented.

## Writing and evidence

Removed V1's “Software for imperfect conditions,” “An interruption. Not a fresh
start,” “Hello, elsewhere,” and “What remains visible?” treatments. Project names,
technical descriptions, and clear actions now carry the page. Current employment,
role transition, dates, scope, and limitations follow `data/experiences.ts`,
`data/projects.ts`, and the professional-reference records.

The supplied collection contains technical analyses but no reusable product
captures, model output images, or source-project binaries. Its internal artifact
references explicitly point outside the supplied collection. Existing portfolio
verification screenshots are pictures of the portfolio, not project evidence.

New visuals are original React/SVG conceptual illustrations, captioned as such.
The pet chart is a new rendering of historical mAP@0.50 values, not a new model
evaluation or a screenshot of an experiment. It includes an accessible data table:

| Detector | Clean training | Occlusion-aware training |
| --- | ---: | ---: |
| YOLOv8n | 0.471 | 0.345 |
| EfficientDet-D0 | 0.098 | 0.112 |

Source: `data/projects.ts`, `occluded-pet-detection`, corroborated by
`docs/professional-reference/evidence/occluded-pet-detector/PROJECT_ANALYSIS.md`.
The page retains the 74-image scope and states that repeated-seed studies and
statistical significance are not established. No invented outcomes, runtime
screenshots, detector predictions, throughput numbers, or failover guarantees.

## Browser review and targeted redesign audit

Applied frontend-design and gpt-taste for the first pass, then inspected it with
the repository Playwright CLI in headed Chrome. Applied redesign-existing-projects
to the implemented page and made targeted refinements:

| Finding | Change |
| --- | --- |
| Name nearly touched the figure on desktop | Reduced display size while retaining its two-line presence |
| Small technical text in narrow diagrams | Enlarged primary labels; removed secondary in-image text below 800px |
| Records appeared to project beyond the storage plate | Corrected the isometric cell coordinates |
| “Show resume” could be confused with the résumé link | Changed control to “Resume import” |
| Chart lacked a numeric scale and accessible series association | Added scale, explicit training names, and an accessible table |
| Table's intrinsic width caused narrow-screen overflow | Put it inside a clipped, positioned screen-reader wrapper |
| Open compiler panel did not collapse when activated again | Added toggle behavior and checked Enter/Space activation |
| Scroll text returned to low opacity on revisiting | Made the completed scrub reveal persist |
| Contact heading wrapped awkwardly on phones | Reduced mobile display size to retain one line |
| Scrollbar changes could shift the layout | Added a V2-scoped stable scrollbar gutter |

The audit deliberately omitted unrelated app features: this prototype has no
accounts, forms, loading data, pricing, or legal workflow requiring new UI.

## Final screenshots and V1 comparison

Desktop: 1440×1000. Tablet: 768×1024. Mobile: 390×844. Chrome full-page
captures omit the native scrollbar. Full desktop capture follows an actual scroll
through experience so the completed text reveal is visible. Final mobile capture
was refreshed after layout and font settling to remove a capture-edge artifact.

| View | Editorial V1, existing capture | Editorial V2 |
| --- | --- | --- |
| Desktop opening | [V1](../design-exploration/editorial-desktop.png) | [V2](desktop.png) |
| Desktop full page | [V1](../design-exploration/editorial-desktop-full.png) | [V2](desktop-full.png) |
| Tablet | [V1](../design-exploration/editorial-tablet.png) | [V2](tablet.png), [full page](tablet-full.png) |
| Mobile full page | [V1](../design-exploration/editorial-mobile-full.png) | [V2](mobile-full.png) |

Additional captures: [mobile opening](mobile.png), [mobile contact](mobile-footer.png),
[desktop experience](desktop-experience.png), [resumed import study](import-resumed.png),
[compiler Generate state](compiler-generate.png). Files ending in `first` preserve
the initial review and are not the final design.

Compared with V1, V2 has a stronger personal identity, a more cohesive visual
language, more varied project proportions, and more direct writing. The result
chart communicates judgment more effectively than a decorative research image.
The contact section stays within the page's palette, replacing V1's abrupt dark
footer. Tablet has its own deliberate arrangement rather than just compressed
desktop columns.

## Validation

- TypeScript (raw log retained locally, excluded from Git): passed, exit 0.
- ESLint (raw log retained locally, excluded from Git): passed, exit 0, no warnings.
- [Responsive measurements](responsive-results.json): no horizontal page overflow
  at 320, 390, 600, 768, 1024, 1440, or 1920 pixels. One main, one h1; the name
  uses two lines at every measured width. Noindex metadata present.
- [Browser checks](browser-results.json): 21 passed; no console errors, warnings,
  uncaught page errors, or HTTP failures during the verification run.
- Verified import state and reset; compiler panel switching and collapse;
  implementation-note navigation and wraparound; keyboard Enter/Space; visible
  focus and skip link; user-triggered project scrolling and keyboard access to
  clipped links; actual desktop pinning and completed reading reveal.
- Reduced-motion emulation removes pinning, keeps text fully visible, and
  disables illustration transitions. Core content also renders with JavaScript
  disabled. Interactive controls require JavaScript.
- All thirteen unique local navigation destinations returned HTTP 200. External
  profile links and mail delivery were not tested.
- [Scope check](scope-check.json): hashes for all 41 pre-existing app, data, public,
  and sampled root files match the baseline, including Editorial V1, Experimental,
  production homepage, other public pages, shared styles, and the lab guard.
- [Production guard](production-guard.json): development renders; production calls
  the actual Next `notFound()` and yields `NEXT_NOT_FOUND`. This is a source-level
  check with font/CSS imports stubbed, not a full production build or deployed test.

Dependencies added: `gsap`, `@gsap/react`, and self-hosted
`@fontsource-variable/outfit`. Imports are confined to V2. No framework migration,
production entry point changes, or new external asset requests.

## Remaining weaknesses and tradeoffs

1. **Evidence imagery remains limited.** The conceptual drawings are more coherent
   and specific, but actual permission-cleared product captures and project outputs
   would add credibility that illustrations cannot supply.
2. **Mobile is still a long read.** The larger project accounts and compiler study
   add depth. A shorter selection may suit a future recruiting-focused homepage.
3. **The opening prioritizes identity and one current-work illustration.** Other
   projects begin below the first desktop viewport. V1 exposes current-work prose
   earlier, while V2 makes that work more visual at the top.
4. **Motion adds weight and maintenance.** GSAP gives the desktop experience a
   clear reading relationship, but adds dependencies. Static fallback content is
   intact and reduced-motion users get the full material without animation.
5. **The palette is intentionally narrow.** It increases coherence but keeps the
   imagery abstract and tonally similar; real project artifacts would introduce
   useful variety without arbitrary accent colors.
6. **Verification is local Chrome.** No physical-device, Safari, full screen-reader,
   deployed production, or full production-build certification is claimed.

The development server remains available at port 3000. V1 and Experimental remain
available at their original routes for direct comparison. Nothing was published.
