# Projects layout refinement

Branch: `portfolio-redesign`. The working tree was clean before this pass. No commits, pushes, merges, deployments, or changes to main were made.

## Layout decisions

- Paired entries share two intrinsic grid tracks using CSS subgrid: one for previews and one for copy. Their categories and titles now begin together. Copy retains its natural height; links are not pushed to the bottom of a neighbouring entry.
- The featured chat/pet pair now uses balanced column widths. Chat retains its dark visual emphasis, and the pet title and research evidence have more room.
- Compiler, restaurant, and streaming spreads retain their alternating editorial composition, with copy aligned to the top of the preview. Removed the extra copy padding and consolidated restaurant layout rules with the other spreads.
- Spread columns use equal widths on tablets so the compiler preview can retain a readable source/assembly comparison. The listing becomes one column at 740px, before narrow columns make its diagrams unnecessarily tall. The surrounding site breakpoints are unchanged.
- Tightened group gaps, spread padding, and the gap before project links. Mobile separators retain a clear pause between entries.
- Listing figures use consistent insets and caption styling. Genetic-generation marks and the label-free scheduling grid have smaller visual footprints. The streaming diagram is capped at a supporting-preview size. Greenhouse controls remain in a compact three-button row with 44px minimum targets, alongside slightly tighter actuator spacing.
- Chat relay nodes and controller stages use available panel space deliberately rather than leaving a large empty area immediately before the caption.
- Filtered results keep independent preview heights: filtering creates different neighbours, so it must not stretch the compiler to match the greenhouse or the evolutionary illustration to match the research preview.

The most visible improvements are the chat/pet pair, the controller/greenhouse pair, and the tablet compiler spread. Restaurant and streaming copy now connect more clearly to their previews. The genetic/scheduling pair also has aligned titles and quieter illustration proportions.

## Preserved

No public-facing text was edited. Project names, descriptions, categories, technologies, ordering, destinations, diagram labels, captions, qualifications, and technical meaning remain intact. No humanizer pass was needed. All project-specific controls remain available. Homepage previews and full case-study figures are unchanged.

The palette, Newsreader/Outfit typography, title styling, unbordered project entries, two-column desktop arrangement, and alternating full-width spreads remain in place. No dependencies were added.

Only three application files changed: `app/portfolio.css`, `app/projects-gallery.css`, and a filter-state data attribute in `app/components/ProjectFilter.tsx`. Figure sizing rules are scoped to `.project-collection`.

## Visual review and measurements

Captured and inspected complete desktop, tablet, and mobile pages, with detailed slices for reading the whole page at useful resolution. Also inspected category-filter layouts and the 741/740px transition.

| Viewport width | Before height | After height |
| --- | ---: | ---: |
| 1440px | 5313px | 4896px |
| 1024px | 5296px | 5058px |
| 768px | 5569px | 5335px |
| 390px | 9556px | 9173px |
| 320px | 10572px | 10209px |

At the same 1440 × 1000 viewport, the page is approximately 417px shorter (8%). The earlier single-column breakpoint intentionally prioritizes legibility over page height on narrow tablets.

Representative comparisons:

- `before-projects-1440.png` / `after-projects-1440.png`
- `before-projects-768.png` / `after-projects-768.png`
- `before-projects-390.png` / `after-projects-390.png`
- `after-projects-741.png` / `after-projects-740.png`: breakpoint review.
- `filter-systems-768.png`: independent natural heights after filtering.
- `production-projects-1440.png`, `production-projects-768.png`, `production-projects-390.png`: compiled production presentation.
- `after-slice-*`: readable slices of complete final pages.

## Verification

- **209 development checks passed** across 12 widths: 1440, 1280, 1024, 1000, 768, 741, 740, 640, 601, 600, 390, and 320px.
- **34 production checks passed** at 1440, 768, 740, 390, and 320px.
- **32 axe WCAG A/AA and 2.1 AA audits passed**: 27 development and five production audits. Production audits wait for the existing 200ms button-color transitions to finish.
- Verified all eight category filters using the keyboard, nine distinct project destinations and navigation, visible keyboard focus, three greenhouse states at every checked development width, all chat views/election stages/fan-out controls, the architecture deep link, mobile navigation/Escape, and reduced-motion controls/navigation.
- No recorded browser errors, checked text clipping, figure overflow, or horizontal overflow.
- Compared the homepage and compiler, greenhouse, scheduling, and streaming case studies at 1440, 768, and 390px. All 12 case-study comparisons are pixel-identical. Homepage dimensions and layout match; its minor raster differences are at most one RGB color level. See `shared-page-comparison.json`.
- Final TypeScript, zero-warning ESLint, production build (26 generated pages), and `git diff --check` passed. The existing stale Browserslist data notice remains.

Browser verification used Chromium. Safari and Firefox were not exercised. No known layout issues remain in the checked scope.

## Preview

The existing repository development process initially served stale HTML with missing generated CSS/JS/font assets. Restarted it with a fresh ignored development cache before taking valid baselines. No source or production output was removed during that recovery.

The temporary production comparison server was stopped after review. The development preview remains running at **http://localhost:3000/projects**.

Detailed evidence: `before.json`, `results.json`, `production-results.json`, `review.js`, and `production-review.js`.
