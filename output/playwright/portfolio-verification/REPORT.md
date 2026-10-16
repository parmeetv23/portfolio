# Portfolio browser verification

> Checkpoint archive: raw logs, browser sessions, temporary hash baselines, and
> first-pass captures remain on disk but are excluded from Git. Final comparison
> assets and structured review results are versioned; see
> [the redesign index](../../../docs/PORTFOLIO-REDESIGN.md).

Verified 2026-10-16T07:08:01.603Z using the repository Playwright skill wrapper in headed Chrome 155.0.8059.82.

- Local server: http://127.0.0.1:3000
- package.json development command: `npm run dev` (`next dev`). Started with `--hostname 127.0.0.1` after confirming no server was listening on port 3000.
- Captured and visually inspected Home, Projects, and Experience at 1440×900 and 390×844, plus supplementary full-page images.
- No visible horizontal clipping or overlapping content in those captures. DOM measurements found no horizontal overflow or elements extending past the viewport on any of the six page/viewport combinations.
- Desktop: Projects uses two columns; home experience cards use three columns. Mobile: cards stack, text and tags wrap, and Contact moves to a second navigation row.
- Home → Projects → Experience navigation succeeded. Mobile Experience → Projects → Home succeeded. Contact reached /#contact; its heading remained visible below the sticky navigation.
- Project filter: All showed 9 cards, ML showed 3, resetting All restored 9.
- Browser console: 0 errors and 0 warnings. No uncaught page errors were recorded.
- All 29 requests listed by the final CLI network export had HTTP 200 responses, including CSS, JavaScript, and route data. No HTTP 4xx/5xx responses were recorded.
- The request-failed listener recorded 7 Next.js `?_rsc=` streams with `net::ERR_ABORTED` during navigation, including Contact. Those same URLs had HTTP 200 response headers in the network log. No failed scripts/styles or visibly broken destination pages were observed. The underlying reason for cancellation was not established.
- The development server printed an outdated Browserslist-data warning. This was terminal output, not a browser console warning.

## Requested viewport screenshots

| Page | Desktop 1440×900 | Mobile 390×844 |
| --- | --- | --- |
| Home | [home-desktop-1440x900.png](home-desktop-1440x900.png) | [home-mobile-390x844.png](home-mobile-390x844.png) |
| Projects | [projects-desktop-1440x900.png](projects-desktop-1440x900.png) | [projects-mobile-390x844.png](projects-mobile-390x844.png) |
| Experience | [experience-desktop-1440x900.png](experience-desktop-1440x900.png) | [experience-mobile-390x844.png](experience-mobile-390x844.png) |

Full-page Home comparisons use the matching `*-full.png` filenames. Supplementary
Projects and Experience full-page images are retained locally, excluded from Git. They exclude the native 15px scrollbar, so their image widths are 1425px and 375px; the requested viewport images retain the exact requested dimensions. [Mobile Contact anchor](home-mobile-contact.png) was captured separately.

## Evidence and limits

- [Browser diagnostics and overflow measurements](browser-diagnostics.json)
- Network export, including static resources (raw log retained locally, excluded from Git)
- Console summary (raw log retained locally, excluded from Git)
- Raw CLI snapshots and console output remain locally in `.playwright-cli/` beside
  this report and are excluded from Git.

This verifies desktop Chrome at two viewport sizes; it does not establish behavior on physical phones, touch input, Safari, or other browsers. Resume, individual project detail routes, downloads, and external destinations were not exercised. Application files and project dependencies were unchanged; only verification artifacts were created under `output/playwright/portfolio-verification/`. The local development server was left running.
