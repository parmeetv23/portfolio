# Targeted wording update

Implemented the four supplied replacements exactly: three illustration headings on `/projects` and the homepage introduction.

The humanizer review retained the requested wording. The headings describe their subjects directly, and the introduction names the three areas of work without adding claims or filler.

Chat and pet previews are shared with the homepage, so their components accept an optional heading. The listing supplies the new headings; existing homepage illustration headings retain their original wording. All other illustration headings, project titles, descriptions, labels, metrics, diagram markup, and controls remain unchanged.

No stylesheet, typography, color, or layout rules changed. The only fitting adjustment is an inline no-wrap span around `full-stack` in the homepage introduction, preventing a break at its hyphen while preserving the exact text.

## Verification

- Inspected actual screenshots at 1440, 768, 390, and 320px, including each updated illustration and the hero.
- Automated layout/text checks also covered 1024, 740, and 640px.
- All **43 browser checks** and **eight axe WCAG A/AA and 2.1 AA audits** passed.
- Verified all nine listing headings, exact introduction wording, unchanged homepage illustration headings, category filters, keyboard activation, architecture deep link, and Snap Remedy navigation.
- No recorded browser errors, horizontal overflow, or checked text clipping.
- Final TypeScript, zero-warning ESLint, production build (26 generated pages), and whitespace checks passed. The existing stale Browserslist-data notice remains.

Representative screenshots: `before-home-1440.png` / `after-home-1440.png`, `before-projects-1440.png` / `after-projects-1440.png`, `after-home-768.png`, `after-home-390.png`, and `after-projects-390.png`. Individual `after-chat-*`, `after-pet-*`, `after-restaurant-*`, and `after-hero-*` captures show the updated text at readable resolution. Results: `results.json`.

Browser review used Chromium. Work remained on `portfolio-redesign`; no commit, push, merge, or deployment was made. The existing development server remains at **http://localhost:3000/** and **http://localhost:3000/projects**.
