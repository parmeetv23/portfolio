# Hero horizontal positioning

Moved the complete desktop introduction block to the right using relative positioning on its existing CSS rule. The responsive offset ranges from 16px on smaller desktops to 32px on wide desktops. It applies above 1000px; tablet and mobile positioning remains unchanged.

This pass added only `position: relative` and a responsive `left` value to the existing `.portfolio .v3-hero-intro` desktop rule. Earlier uncommitted hero work was preserved.

## Verification

- Captured screenshots at 1920, 1440, 1280, 1100, 1024, 1001, 1000, 768, 740, 390, and 320px. Visually inspected wide/small desktops, tablet, and both mobile sizes.
- Before/after geometry comparisons at all 11 widths confirm unchanged name position, hero dimensions, text widths, text heights, font sizes, line heights, and vertical positions. Only the desktop block's horizontal position changes.
- No checked clipping, horizontal overflow, or browser errors.
- Three axe WCAG A/AA and 2.1 AA audits passed. Visible keyboard focus and the Snap Remedy case-study link passed.
- TypeScript, zero-warning ESLint, production build (26 pages), and whitespace checks passed. The existing stale Browserslist-data notice remains.

Representative comparisons: `before-1440.png` / `after-1440.png`, `before-1024.png` / `after-1024.png`, `before-768.png` / `after-768.png`, and `before-390.png` / `after-390.png`. Details: `results.json`, `before.json`, `after.json`, and `accessibility.json`.

Browser review used Chromium. No known issues remain in the checked scope. Work remained on `portfolio-redesign`; no commits or pushes were made. Development preview remains running at **http://localhost:3000/**.
