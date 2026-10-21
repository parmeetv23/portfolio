# Homepage hero composition

## Changes

- Gave the statement more horizontal space by balancing the two desktop columns and increasing its container cap from 470px to 560px. At 1280px the available width grows from 470px to about 545px; at 1024px it grows from about 421px to 453px.
- Composed four phrase lines above 1000px: “I design and build”, “backend systems,”, “distributed architectures,”, and “and full-stack applications.” The underlying sentence is unchanged.
- Increased headline line-height from 1.19 to 1.25. Its font family, size, weight, letter spacing, and color are unchanged. Baseline comparisons confirm the same headline font size at every matching viewport.
- Phrase spans become inline at smaller sizes so wrapping follows the available width. The existing nonbreaking treatment of “full-stack” remains.
- Switched the hero to its existing stacked mobile treatment at 740px. Visual review identified that the former two-column treatment at 601px made the statement unnecessarily narrow. Only the hero uses the earlier breakpoint; surrounding site sections retain their existing rules.

Only `app/(site)/page.tsx` and hero-scoped rules in `app/portfolio.css` changed. Supporting text, links, navigation, diagrams, sections, and interaction code remain intact. No dependencies were added.

## Visual review

Reviewed actual browser screenshots at wide desktop, standard desktop, tablet, narrow tablet, and mobile sizes. The statement has four single-line phrases on desktop without shrinking its type. On smaller screens it wraps naturally, with sufficient space between the statement, supporting paragraph, role link, and experience anchor.

Representative comparisons:

- `before-1440.png` / `after-1440.png`: desktop composition.
- `before-1024.png` / `after-1024.png`: smaller desktop.
- `before-768.png` / `after-768.png`: tablet.
- `before-390.png` / `after-390.png`: mobile.
- `after-741.png` / `after-740.png`: transition to the stacked hero.
- `after-320.png`: narrow mobile.
- `after-home-full-1440.png`, `after-home-full-390.png`: complete homepage flow; screenshots wait for both lazy-loaded personal photos.

The first pass exposed the cramped 601px composition. The earlier stacking breakpoint was implemented and the full review repeated.

## Verification

- **74 browser checks passed** across 14 widths: 1920, 1440, 1280, 1100, 1024, 1001, 1000, 768, 741, 740, 601, 600, 390, and 320px. Also checked 844 × 390 landscape.
- **14 axe WCAG A/AA and 2.1 AA audits passed.**
- No checked text clipping, horizontal overflow, or browser errors. No layout shifts were recorded during the checked loads.
- Confirmed four single-line desktop phrases, natural inline wrapping below the desktop breakpoint, exact statement text, and unchanged headline font sizes against the baseline.
- Verified visible keyboard focus and Snap Remedy navigation, the experience anchor and smooth scrolling, navigation hover animation, the project-strip scroll button, reduced-motion anchor behavior, and mobile navigation/Escape focus.
- Final TypeScript, zero-warning ESLint, production build (26 generated pages), and `git diff --check` passed. The build retains its existing stale Browserslist-data notice.

Review used Chromium. Safari and Firefox were not exercised. No known issues remain in the checked scope. Detailed results and baseline comparisons are in `results.json`; the review script is `review.js`.

Work remained on `portfolio-redesign`. No commit, push, merge, or deployment was made. The development preview remains running at **http://localhost:3000/**.
