# Distributed Chat System technical correction review

October 19, 2026. No commit, push, merge, or deployment.

The [technical audit](../../../docs/IRC-HAT-TECHNICAL-AUDIT.md) was completed and recorded before substantive public corrections. It traces claims to the final report, original presentation diagrams, canonical project record, source investigation, and original Java implementation. The Java application was not modified or executed; this review validates the portfolio.

## Corrections

- Client reconnect queries addressing and re-registers. The source's first-registration history request is no longer described as repeating after every reconnect.
- The diagram identifies the primary as the lookup destination; replicas retain registry state. Discovery and chat registration are distinct exchanges.
- Message propagation shows sender echo and numeric example PIDs, distinguishing a selected successor route from a fixed ring topology.
- Coordination illustrates a tracked registration event, update/ACK correlation, and a separate replica-to-primary refresh request. It no longer folds client counts, refresh, peer heartbeats, and leadership into one acknowledgment flow.
- Storage prose distinguishes live seen-UUID tracking from SHA-256 deduplication of serialized log records, and explains recent-ID selection before offset reads.
- Full-log request/response and merge handlers are described precisely, with the final report's recovery design identified rather than presenting the conflicting source snapshot as demonstrated restoration.
- Tools & Technologies describes NIO transport work, both JSON libraries' roles, terminal workers, Gradle modules/JARs, multistage Docker images, and Compose networking.
- Diagram title is **Distributed Chat System**. A fourth mode, **Failure & election**, uses a separate addressing-only graph and three manually selected states: failed primary, Election/Bully exchange, and new primary with Leader announcement and replica re-registration. The visual never reroutes clients or transfers the old primary IP.

## Verification

- Chromium: homepage, Projects listing, and dedicated project page at 320, 390, 820, 1024, and 1440px: **15 route/viewport combinations**.
- **90 rendered state checks** cover Discovery, Messages, Coordination, and all three failure/election states at every placement/width.
- Directed SVG endpoints were checked against the actual source/destination node rectangles, including lookup/reply, sender echo, successor propagation, tracked update/ACK, refresh request, Election/Bully reply, Leader announcement, replica registration, and record return.
- Checked event-ID correlation, illustrative PID order, absence of chat/client nodes in the election graph, and the PID 3 replica-to-primary role transition.
- No horizontal page overflow, checked UI clipping, duplicate IDs, broken case anchors, out-of-bounds SVG labels, clipped node text, or collisions between independent text labels. The smallest measured scaled SVG label was **12.01px**.
- Native keyboard activation passed for both mode selection and election-stage selection. Project filtering and navigation, reduced-motion interaction, and server-rendered content/default diagram with JavaScript disabled passed.
- **16 axe scans**: all six case-study states at desktop/mobile plus the homepage/listing default views. No WCAG 2 A/AA or 2.1 AA violations in the final run. This is Chromium viewport emulation, not a manual screen-reader review.
- No browser console errors or page exceptions in the final run.

The first browser pass found that the existing inherited button palette crossfade could produce transient low contrast. Architecture-mode changes now switch immediately. The intermediate election heading was also corrected to avoid implying leadership before the Leader stage. Final [structured results](review-results.json) pass; the [review script](review.js) is retained.

- `npm run typecheck`: passed after the final build.
- `npm run lint`: passed, zero warnings/errors.
- `NEXT_DIST_DIR=.next-production npm run build`: passed; 26 static pages generated. The pre-existing Browserslist data-age notice remains; no dependencies changed.
- `git diff --check`: passed.
- Reused development server remains reachable at **http://127.0.0.1:3002**; the final project route returned HTTP 200. The isolated production build preserved the running development server.

## Captures

| View | Desktop | Mobile |
| --- | --- | --- |
| Homepage feature | [1440px](home-feature-1440.png) | [390px](home-feature-390.png) |
| Projects feature | [1440px](projects-feature-1440.png) | [390px](projects-feature-390.png) |
| Dedicated case study | [1440px](case-1440.png) | [390px](case-390.png) |
| Discovery | [1440px](architecture-discovery-1440.png) | [390px](architecture-discovery-390.png) |
| Messages | [1440px](architecture-messages-1440.png) | [390px](architecture-messages-390.png) |
| Coordination | [1440px](architecture-coordination-1440.png) | [390px](architecture-coordination-390.png) |
| Primary lost | [1440px](architecture-lost-1440.png) | [390px](architecture-lost-390.png) |
| Election | [1440px](architecture-election-1440.png) | [390px](architecture-election-390.png) |
| New primary | [1440px](architecture-leader-1440.png) | [390px](architecture-leader-390.png) |
