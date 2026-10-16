# Editorial V3

> Checkpoint archive: raw logs, browser sessions, temporary hash baselines, and
> first-pass captures remain on disk but are excluded from Git. Final comparison
> assets and structured review results are versioned; see
> [the redesign index](../../../docs/PORTFOLIO-REDESIGN.md).

Preview: http://127.0.0.1:3000/design-lab/editorial-v3

Isolated local prototype, October 16, 2026. V2, V1, Experimental, the production
homepage, and all other public pages remain unchanged. Nothing was deployed.

## Focus of this iteration

Reviewed V2's implementation, report, and saved desktop, tablet, and mobile
screenshots. Retained Newsreader, Outfit, the evergreen/fog/sage palette, and
the existing project accounts. Used frontend-design and GPT Taste for composition,
hierarchy, visual treatment, and selective motion; used the installed Playwright
CLI for actual browser review and verification.

The brief's request to preserve the visual system took precedence over a fresh
randomized font/layout exploration. V3 reuses the isolated V2 foundation rather
than introducing a different design direction or refactoring shared public code.

## Material improvements

| Area | V2 | V3 |
| --- | --- | --- |
| Positioning | Backend systems, data tools, interfaces | Full-stack applications, React interfaces, Python/Django services, data integration |
| Opening | Name beside a dominant resumable-import study | Name beside a direct introduction to the developer's broader work |
| First chapter | Personal projects | Professional experience, followed by personal projects |
| Snap Remedy | Recovery/import feature dominates the opening | Full application account with interfaces, services, scoring, and ETL/data integration |
| Previous roles | Stacked late in the page | Two desktop columns immediately after current employment |
| Navigation | Static header | Compact sticky header, current-section underline and `aria-current`, anchor clearance, back-to-top link |
| Application visual | Pale checkpoint illustration | Original exploded application study with higher contrast and selectable layers |
| IRC-HAT | Static network illustration with hover scale | Deeper green treatment and an explicitly requested message-trace animation |
| Research visual | Two-tone bars | Stronger bar contrast, depth, and hatching to distinguish training conditions |
| Footer | Contact and crowded single bottom row | Contact, social/back navigation, and separate prototype-comparison row |

The opening stays focused on the person and the breadth of their work. At the
1440×1000 desktop viewport, professional experience is already visible in the
first screen. The large name and quieter supporting text preserve V2's editorial
character without making one technical feature the site's identity.

Detailed personal-project descriptions, technical limitations, research values,
and project destinations remain substantively the same as V2. The employment
introduction is a brief reframing of existing, supported experience records.
No new results or career claims were invented.

## Visuals and interactions

- The application study is original SVG, showing abstract React, Django, and data
  layers. It is explicitly identified as a conceptual illustration, not a product
  screenshot. Its abstract interface elements are not presented as actual UI.
- Native radio controls select Overview, Interfaces, Services, or Data. Selection
  emphasizes a layer and updates a short explanation. Arrow keys work normally;
  keyboard focus is visible, and the explanation uses a polite live region.
- Message tracing runs for one short traversal after a button press, then stops.
  It illustrates a route through connected peers; it does not claim a live system
  run, measured latency, guaranteed delivery, or successful failover.
- Two restrained desktop scroll effects give the application study depth and
  animate its connecting stroke. There are no repeating background animations,
  scroll hijacking, or opacity-gated body paragraphs.
- Reduced motion disables transforms, transitions, animated anchor scrolling,
  and message travel. The selectors and static explanations remain usable.
- The compiler accordion and user-controlled project strip are reused from V2.
- The sticky header uses a passive scroll listener with animation-frame scheduling.
  It exposes the active section through both an underline and `aria-current`.

No dependencies were added, and all font/image resources remain local.

## Footer investigation

The reported V2 cutoff did **not** reproduce as a layout bug. At the document end
in the live browser, all bottom-row links were visible, the footer had visible
overflow, and the last row retained 25px bottom padding. Its bottom matched the
document boundary within normal fractional-pixel rounding.

Evidence: [V2 footer viewport](v2-footer-investigation.png) and
[measurements](v2-footer-measurements.json). The earlier image's exact cropping
history cannot be established, so this does not prove a specific capture cause.

V3 keeps the footer in normal document flow with natural height, adds a distinct
comparison row and bottom spacing, and gives the V3 document canvas its own fog
background. The last change prevents the production page's dark root background
from appearing as a dark capture/scrollbar-gutter edge. It applies only while V3
is present.

Dedicated final captures show the complete footer at
[desktop](desktop-footer.png), [tablet](tablet-footer.png), and
[mobile](mobile-footer.png) sizes. [Final measurements](footer-results.json)
confirm every footer link is visible, Contact is the active navigation item, and
the footer bottom reaches the viewport/document end within subpixel rounding.
The browser interaction run also checks the footer at 320px.

## Browser refinements

The first responsive review found a tablet overlap between the technology line
and the experience link. Corrected the grid selector specificity; responsive
measurements now explicitly check that their rectangles do not intersect.

Other targeted refinements:

- Expanded the SVG viewBox so the top application plate has complete edges.
- Used a single anchor offset so the sticky header does not hide section titles
  or create a doubled gap.
- Preserved 44px navigation targets at narrow widths.
- Made the main landmark programmatically focusable for the skip link.
- Matched the document canvas to the prototype to eliminate dark capture edges.
- Waited for the active-navigation transition and fonts to settle before final
  footer captures; kept full-page and dedicated footer evidence separate.

## Screenshots and comparison

Desktop: 1440×1000. Tablet: 768×1024. Mobile: 390×844. Full-page Chrome captures
may exclude the native scrollbar. Initial files containing `first` are retained
as review evidence and are not the final design.

| View | V2, existing capture | V3 |
| --- | --- | --- |
| Desktop opening | [V2](../editorial-v2/desktop.png) | [V3](desktop.png) |
| Desktop full page | [V2](../editorial-v2/desktop-full.png) | [V3](desktop-full.png) |
| Tablet full page | [V2](../editorial-v2/tablet-full.png) | [V3](tablet-full.png) |
| Mobile full page | [V2](../editorial-v2/mobile-full.png) | [V3](mobile-full.png) |

Additional evidence: [current work](current-work.png),
[services selection and keyboard focus](application-services.png),
[message trace](message-trace.png), and
[sticky project navigation](desktop-project-navigation.png).

## Checks

- TypeScript (raw log retained locally, excluded from Git): passed, exit 0.
- ESLint (raw log retained locally, excluded from Git): passed, exit 0, no warnings.
- `git diff --check`: passed.
- [Responsive measurements](responsive-results.json): no horizontal overflow at
  320, 390, 600, 768, 1024, 1440, or 1920px. Exactly one h1 and one main; the name
  stays on two lines. Experience precedes projects, navigation links fit, and the
  tablet technology/link overlap is absent at every measured width.
- [Browser summary](browser-summary.json): 35 checks passed. No console errors,
  warnings, uncaught page errors, or HTTP failures during that verification run.
  The [review script](browser-review.js) preserves the assertions and capture steps.
- Tested sticky behavior, section indicators, anchor clearance, skip-link focus,
  radio selection and arrow keys, trace start/stop, compiler Enter/Space controls,
  project-strip traversal, reduced motion, footer reachability, and static content
  with JavaScript disabled. Interactive state changes require JavaScript.
- All thirteen unique local link destinations returned HTTP 200. External social
  profiles and email delivery were not tested.
- [Scope check](scope-check.json): all 38 pre-existing app, data, public, and
  dependency files match their baseline hashes. V2 and the earlier prototypes
  are preserved. `package.json` and the lockfile are unchanged.
- [Production guard](production-guard.json): inherited development-only layout
  renders in development and calls the actual Next `notFound()` in production.
  This is a source-level check with font/CSS imports stubbed, not a full build.
- Inherited `noindex, nofollow` metadata is present.

The review used local headed Chrome. Physical devices, Safari, a full screen-reader
audit, and a production build/deployment were not tested.

## Tradeoffs and remaining weaknesses

1. The hero is quieter and less image-led than V2. It communicates the broader
   professional identity sooner, while the main illustration appears in context
   with the employment account.
2. Prioritizing professional work pushes personal projects further down the page.
   Sticky section navigation gives readers direct access without reducing the
   desktop spacing or compressing the content for mobile.
3. The application study remains conceptual. Real project artifacts, when available
   and suitable to publish, would provide stronger evidence than an abstraction.
4. The additional selector and tracing control add a little client behavior.
   They reuse the existing stack and avoid loops, external assets, or new packages.
5. Detailed project copy was deliberately preserved. Selecting other highlights
   or revising the technical accounts is still a separate content pass.

The local server remains available on port 3000. Nothing was promoted to production.
