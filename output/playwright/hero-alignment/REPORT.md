# Hero alignment with the page boundary

Replaced the desktop block's relative horizontal offset with a right-aligned 448px maximum container. The narrower outer container fits the existing headline and the unchanged supporting paragraph measure, bringing its right edge onto the shared page boundary while retaining separation from the name.

This pass changes one existing CSS rule. Text, fonts, line breaks, line spacing, vertical positions, hero height, name placement, and tablet/mobile positioning remain unchanged. Earlier uncommitted hero work is preserved.

## Verification

- Captured screenshots and geometry at 1920, 1440, 1280, 1200, 1100, 1024, 1001, 1000, 768, 740, 390, and 320px.
- The block's right edge matches the shared content boundary at every checked two-column width (within 0.01px). Mobile keeps its existing reading measure and position.
- Compared text-fragment widths/heights/vertical coordinates, wording, font metrics, and hero/name geometry against the baseline. All existing wrapping and vertical spacing is preserved.
- Visually reviewed desktop, tablet, and mobile screenshots. No checked clipping, horizontal overflow, or browser errors.
- Three axe WCAG A/AA and 2.1 AA audits passed. Keyboard focus and Snap Remedy case-study navigation passed.
- TypeScript, zero-warning ESLint, production build (26 pages), and whitespace checks passed. The existing stale Browserslist-data notice remains.

Representative comparisons: `before-1440.png` / `after-1440.png`, `before-1280.png` / `after-1280.png`, `before-1024.png` / `after-1024.png`, and `before-390.png` / `after-390.png`. Measurements: `before.json`, `after.json`, and `results.json`.

Chromium was used for browser review. No known issues remain in the checked scope. Work stayed on `portfolio-redesign`; no commits or pushes were made. Preview remains running at **http://localhost:3000/**.
