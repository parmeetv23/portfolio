# Snap Remedy content refinement

Implemented on `portfolio-redesign`. No commit, push, merge, or deployment.

The homepage now introduces the Django backend and React frontend, with backend
engineering first. Experience presents three engineering contributions in prose,
records the intern-to-contract progression, and links to
`/experience/snap-remedy`. The new case study explains selected modeling,
synchronization, scoring/API, interface, and validation decisions.

The reusable architecture illustration is server-rendered HTML/SVG. Its compact
homepage form and expanded case-study form read left to right on desktop and
vertically on mobile. Optional explanations and external-data visualization are
separate from deterministic scoring. No new dependencies or interactive recovery
or scoring demonstrations were added. The previous public application-layer
illustration was removed; historical design-lab prototypes remain unchanged.

The installed humanizer skill was used for drafting and a second editorial pass.
That pass shortened the repeated introduction and removed a redundant closing
disclaimer. Public prose generalizes integration vendors and omits business
records, proprietary factor mappings/formulas, schema names, endpoint paths, and
operator instructions. Source reference documents were neither changed nor linked
from public pages. The owner confirmed contract status from July 2026; the older
canonical source's unspecified employment arrangement was not copied into public
copy.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed, zero warnings/errors.
- `NEXT_DIST_DIR=.next-production npm run build`: passed; 26 generated pages.
  The build retains the existing outdated Browserslist-data notice. No dependency
  or lockfile update was made.
- Chromium production review: 59 checks passed. Home, Experience, and the case
  study were checked at 320, 390, 820, and 1440px: 12 route/viewport combinations,
  with no horizontal page overflow, broken images, or clipped stage labels.
- Six axe scans (three changed pages at mobile/desktop sizes) found no WCAG
  2 A/AA or 2.1 AA violations. Automated checks are not a complete accessibility
  audit.
- All 14 public routes returned HTTP 200. The checked development-only prototype
  route returned HTTP 404 in production.
- The changed pages render their content without JavaScript. No browser errors
  were recorded. Public main-content checks found no vendor names, internal
  identifiers from the checked list, or private-document links.
- Additional checks at 1024/1100px confirmed no page or diagram-label overflow
  near the desktop breakpoint. Mobile menu opening and Escape focus return passed.
- The homepage experience link, Experience-to-case-study link, and case-study
  return link were followed in the browser; the employer anchor is retained.

Evidence: [review script](review.js), [structured results](review-results.json).
Screenshots use the final production build. Detail captures use document
coordinates so sticky navigation does not overlap the captured illustration.
Raw CLI logs and initial captures remain local/ignored.

The application's 185 backend tests are historical evidence described in the
case study, not tests rerun in this portfolio repository. No original application
source investigation or live-provider validation was repeated. Browser coverage
is Chromium with viewport emulation; physical devices, Safari, Firefox, and manual
screen-reader testing were not performed.

The supplied résumé PDF is unchanged and still names specific integrations. Its
content is outside this homepage/Experience/case-study refinement.

## Review captures

| View | Desktop | Mobile |
| --- | --- | --- |
| Homepage feature | [Desktop](home-feature-desktop.png) | [Mobile](home-feature-mobile.png) |
| Full homepage | [Desktop](home-desktop.png) | [Mobile](home-mobile.png) |
| Experience | [Desktop](experience-desktop.png) | [Mobile](experience-mobile.png) |
| Case study | [Desktop](case-desktop.png) | [Mobile](case-mobile.png) |
| Architecture detail | [Desktop](architecture-desktop.png) | [Mobile](architecture-mobile.png) |
