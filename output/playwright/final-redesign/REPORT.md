# Final portfolio redesign review

Implemented and reviewed on `portfolio-redesign`. The Git checkpoint separates
application code, configuration safeguards, the supplied résumé, and this review
archive into focused commits. Only the redesign branch is targeted for GitHub;
no merge or production deployment is part of the checkpoint.

## Design and implementation

The public homepage promotes **Editorial Personal 2**, preserving Newsreader and
Outfit, evergreen/fog/sage colors, the large personal introduction, professional
experience before projects, the interactive technical studies, and the second
hiking photograph. Public pages share a sticky header, mobile disclosure menu,
visible keyboard focus, and a fully padded contact footer.

- Projects: nine projects, six original categories, working filters, an asymmetric
  feature pair and alternating wider entries. Illustrations vary by technical
  subject and explicitly identify conceptual work.
- Case studies: all original technical information and qualifications retained,
  with readable columns, section navigation, diagrams, and adjacent-project links.
- Experience: three engagements retained, with clear roles, dates, contributions,
  and the documented Snap Remedy progression.
- Résumé: current supplied PDF, direct opening/downloading, native collapsible
  preview, loading feedback, and fallback guidance.
- Public pages render on the server; small client components handle interaction.
  No new dependencies; public routes do not import GSAP or design-lab modules.

Details: [design decisions and implementation](../../../docs/PORTFOLIO-REDESIGN.md).

## Browser iteration

Three substantive stages were completed before the interruption: initial desktop
review, correction and responsive review, then refined responsive captures.
Changes driven by the actual renders included fixing overflowing project figures,
differentiating the scheduler/control diagrams, enlarging small diagram labels,
and adapting the split compositions at 1000px. Lazy images were decoded before
final capture. The footer remains in normal document flow.

The initial accessibility audit identified low-contrast captions on sage panels;
the public muted text token was darkened to `#4d5e52`. The initial PDF reopen
check was unreliable; the preview now uses native `details` behavior. These two
regressions were reserved for the final production smoke test.

## Completed checks before interruption

- TypeScript, ESLint with zero warnings, and production build passed.
- All 13 public routes across 320, 390, 820, and 1440px: 52 combinations with one
  main landmark and H1, no horizontal overflow, no broken images, and visible
  footer links. See [initial verification](initial-verification-results.json).
- All category filters, keyboard filtering, primary navigation, employer anchors,
  skip-link focus, native radio arrow keys, compiler disclosure, message tracing,
  reduced motion, mobile menu/Escape/focus return, and navigation closing the
  mobile menu passed.
- Download and new-tab PDF opening passed. Project content rendered without JS.
- No browser exceptions, console errors, or failed HTTP responses in that run.
- Seven representative pages at desktop, tablet, and mobile were captured:
  [capture measurements](review-results.json); no overflow, missing images,
  missing primary landmarks, or clipped footers in the 21 captures.

The initial results intentionally retain the two failed checks for traceability;
final production results below determine their resolved status.

## Final production checks

The continuation reuses the saved production build on local port 3002 and does
not recreate screenshots or rerun the successful 52-combination matrix.

- TypeScript and zero-warning ESLint passed again on continuation.
- Production build passed with all 25 static pages generated. Public first-load
  JavaScript is approximately 83–94 kB; historical prototypes retain their own
  larger bundles and are excluded from public navigation.
- All 13 public routes returned HTTP 200 with one main and a nonempty H1.
- All six targeted desktop/mobile accessibility regressions passed with zero
  violations. The Projects index covers every affected conceptual-art background.
- Native PDF preview collapse, staying collapsed through the delayed fallback,
  and reopening passed. Current PDF opening and download passed; its served bytes
  match SHA-256 `069e6d3217a1c5fb9dda9d79c40aa61b17a25ecf839aa09361c834de1bc61da6`.
- Public navigation and ordinary missing-route/project HTTP 404 responses passed.
- No browser exceptions or unexpected console errors were observed.

The smoke test discovered an inherited prototype soft 404: the selected design
lab showed the missing-page view with noindex but HTTP 200. A production-only
`beforeFiles` rewrite now rejects the entire design-lab namespace before
rendering. A fresh production build and focused guard regression follow this
configuration fix. All seven design-lab paths now return HTTP 404, while the
checked public routes still return 200. The missing-page view has one main and
one footer, with no prototype content. Development configuration has no rewrite;
prototype source and development access are preserved.

Evidence: [smoke-test results](production-smoke-results.json),
[final guard regression](production-guard-results.json). The initial soft-404
failure is retained in the smoke results; the guard regression records its fix.

## Screenshots

These are the existing reviewed captures: desktop 1440×1000, tablet 820×1180,
and mobile 390×844. They were preserved during the continuation.

| Page | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Home | [Desktop](home-desktop.png) | [Tablet](home-tablet.png) | [Mobile](home-mobile.png) |
| Projects | [Desktop](projects-desktop.png) | [Tablet](projects-tablet.png) | [Mobile](projects-mobile.png) |
| Experience | [Desktop](experience-desktop.png) | [Tablet](experience-tablet.png) | [Mobile](experience-mobile.png) |
| Résumé | [Desktop](resume-desktop.png) | [Tablet](resume-tablet.png) | [Mobile](resume-mobile.png) |
| Distributed chat | [Desktop](chat-desktop.png) | [Tablet](chat-tablet.png) | [Mobile](chat-mobile.png) |
| Occluded pet detection | [Desktop](detection-desktop.png) | [Tablet](detection-tablet.png) | [Mobile](detection-mobile.png) |
| Compiler | [Desktop](compiler-desktop.png) | [Tablet](compiler-tablet.png) | [Mobile](compiler-mobile.png) |

Interaction captures: [project filter](projects-filter.png),
[application layer and focus](application-data.png), [mobile menu](mobile-menu.png).

## Limits and preservation

- Browser review used Chromium. Physical iOS/Android devices, Safari, Firefox,
  and a manual screen-reader pass remain untested. Automated accessibility
  checks are evidence, not a complete accessibility certification.
- Native PDF display varies by browser; direct open/download links remain
  available. A supplied replacement PDF appeared during the interruption and
  was retained. Existing résumé screenshots show the earlier supplied document;
  the production smoke test checks the current file instead.
- Screenshots precede the last small caption-contrast and PDF-disclosure fixes.
  Those fixes are verified against the production render without recapturing.
- No new runtime/project performance claims were made. Existing research and
  implementation limitations remain in the project descriptions.
- Design-lab prototypes, reports, photos, and dependencies remain intact. Their
  routes retain the production 404 guard.
- Logs, CLI downloads/sessions, initial captures, and isolated build output stay
  ignored. Only curated screenshots, scripts, reports, and result JSON are kept.
