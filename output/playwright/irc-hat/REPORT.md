# Distributed Chat System refinement

Completed October 19, 2026. No commit, push, merge, or deployment.

The homepage and Projects listing now use **Distributed Chat System** as the primary name, with IRC-HAT retained in the illustration and supporting copy. The dedicated case study has project-specific prose sections for custom networking, discovery/registry replication, message propagation/history, recovery, and Tools & Technologies. Its title, description, canonical URL, and Open Graph metadata are updated.

The replacement HTML/SVG architecture has three selectable views shared across all placements: discovery, messages, and coordination. The expanded case-study version adds protocol steps, join/log-request context, and the Bully election sequence. Desktop and mobile layouts represent the same actors and paths. Discovery replies return to the client; chat traffic follows a direct client connection and cyclic successor peer forwarding. Registry updates/ACKs and peer heartbeats have separate line styles. The diagram uses native buttons, descriptive SVG titles, stable instance IDs, and live text explanations. It has no automatic animation and adds no dependencies.

The final report is the primary architecture reference. Supplied presentation diagrams and the NIO text diagram informed the redraw and transport explanation. [The refinement note](../../../docs/IRC-HAT-REFINEMENT.md) records material differences between the report and inspected source, including vector ordering, registry completion semantics, full-log response wiring, addressing timeout action, and client resend behavior. The public copy describes mechanisms without turning those disputed properties into guarantees.

## Verification

- `npm run typecheck`: passed after the final production build. An intermediate concurrent run overlapped Next.js regenerating its type files; rerunning after generation completed passed.
- `npm run lint`: passed, zero warnings/errors. The production build's lint/type validation also passed.
- `NEXT_DIST_DIR=.next-production npm run build`: passed; 26 static pages generated. The existing Browserslist data-age notice remains; dependencies were unchanged.
- Chromium Playwright review: **15 route/viewport combinations** across the homepage, Projects listing, and project page at **320, 390, 820, 1024, and 1440px**.
- **45 architecture selections** checked the selected button, visible explanation, active protocol paths, and discovery reply target. No diagram labels extended outside their SVG or node bounds. The smallest checked scaled SVG text was at least 12px (with a 0.1px fractional-layout tolerance).
- No horizontal page overflow, clipped checked copy, duplicate IDs, broken case-study anchors, or browser console/page errors were recorded.
- Native keyboard activation using Space and Enter passed, along with project filtering, listing-to-case navigation, and reduced-motion interaction. Navigation explicitly waits for Next.js to update the URL.
- The case-study text and default architecture render with JavaScript disabled.
- Six axe scans at desktop/mobile sizes found no WCAG 2 A/AA or 2.1 AA violations. Browser coverage is Chromium with viewport emulation; this is not a manual screen-reader audit.
- `git diff --check`: passed.

Visual review corrected an SVG title hydration mismatch, undersized 320px labels, mobile label collisions, and the discovery reply endpoint. The saved screenshots and [structured results](review-results.json) are from the final passing [review script](review.js). Verification applies to the portfolio, not to executing the original Java application.

The pre-existing Next.js development server was reused and remains available at **http://127.0.0.1:3002**. The isolated production build did not replace its development output.

## Captures

| Placement | Desktop | Mobile |
| --- | --- | --- |
| Homepage feature | [1440px](home-feature-1440.png) | [390px](home-feature-390.png) |
| Projects feature | [1440px](projects-feature-1440.png) | [390px](projects-feature-390.png) |
| Case study | [1440px](case-1440.png) | [390px](case-390.png) |
| Discovery | [1440px](architecture-discovery-1440.png) | [390px](architecture-discovery-390.png) |
| Messages | [1440px](architecture-messages-1440.png) | [390px](architecture-messages-390.png) |
| Coordination | [1440px](architecture-coordination-1440.png) | [390px](architecture-coordination-390.png) |
