# Projects gallery refinement

Five listing-only previews replace the full chat, compiler, genetic-search, controller, and pet-dataset figures. The chat preview links directly to the full interactive architecture. The compiler remains an explicitly illustrative excerpt; evolution uses illustrative fitness; pet evidence retains exact training/evaluation counts and the mixed real-transfer finding; the controller distinguishes bare-metal polling from desktop decoding.

Scheduling and streaming figures, the interactive greenhouse, and the text-led restaurant entry were retained. Names, descriptions, topics, filters, and categories were preserved. Source changes are limited to ProjectCollection.tsx, projects/page.tsx, the new ProjectPreview.tsx, and projects-gallery.css.

At a 1440 × 1000 viewport, full-page screenshots measure approximately 6,363 px before and 5,097 px after: about 1,266 px / 20% shorter. Small live-height differences occur while fonts and rendering settle. At 390 px, screenshots measure 10,923 px before and 9,037 px after. The existing asymmetric composition and wider editorial rows remain.

## Verification

- 71 browser checks pass at 1440, 1024, 768, 390, and 320 px.
- 17 axe WCAG A/AA audits pass across the listing, homepage, and five affected case studies.
- Filters, project routes, architecture deep link, chat modes, fan-out, election steps, greenhouse controls, keyboard focus, mobile menu/Escape, and reduced motion pass.
- No horizontal overflow, checked text clipping, or browser errors.
- Five affected case-study figure screenshots are byte-identical before/after. Homepage differences are confined to its animated hero; remaining pixels match.
- TypeScript and ESLint pass in the working repository.
- Production build passes with all 26 static pages generated. Production smoke checks pass for the listing, homepage, Snap Remedy route, filters, and full chat interaction.

## Environment limits

Normal Git status and the in-place build stall on iCloud-offloaded .git/packed-refs and postcss.config.js. Git inspection used a temporary metadata copy without altering the original metadata. Build verification used a temporary copy of the current app/data/public source and a previously available PostCSS file whose Git content hash exactly matches the tracked configuration. Repository configuration was left untouched. The build emits an existing stale Browserslist-data notice. Accessibility automation is supplemented by screenshots and keyboard checks; it is not an exhaustive assistive-technology audit.

Work remained on portfolio-redesign. Existing changes were preserved. No commits, pushes, merges, or deployments were made. The reused repository development server remains at http://localhost:3000/projects.

## Representative artifacts

- before-desktop.png / after-1440.png
- before-768.png / after-768.png
- before-390.png / after-390.png
- filter-ml-tablet.png / filter-systems-mobile.png
- verification-results.json / production-smoke.json
