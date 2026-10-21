# Remaining project refinement

Historical log. Its completion claims were superseded by the independent [quality recovery review](QUALITY-RECOVERY.md), including changes to content, figures, ordering, and the review-server setup.

## Scope and progress

Eight projects were refined after Snap Remedy and Distributed Chat System. Their completed pages and IRC-HAT refinement notes establish the prose, evidence, and visual benchmark. Preserve those two implementations. Keep all existing project URLs, navigation, filters, typefaces, colors, and responsive structure. No commits or publishing authorized.

| Project | Evidence review | Implementation | Final rendered review |
| --- | --- | --- | --- |
| Pet detection | Complete | New narrative, measured comparison, original training figure | Complete |
| Genetic hyperparameter search | Complete | Evolution/compatibility narrative and report comparison | Complete |
| Soccer scheduling | Complete | Representation, OR-tree and genetic integration narrative | Complete |
| Bare-metal controller | Complete | Polling, protocol and host boundary narrative | Complete |
| Restaurant reservations | Complete | Data relationships, account policies and booking edits | Complete |
| J-- compiler | Complete | Four passes, target layout and runtime checks | Complete |
| Greenhouse simulation | Complete | Target bands, worker coordination and history | Complete |
| KiddoFlix | Complete | Routes, storage scopes and input/player interactions | Complete |

## Benchmark and design decisions

Snap Remedy's concrete mechanism explanations and IRC-HAT's control/data separation inform the writing. Avoid their old inventory and disclaimer patterns. Each remaining project has its own technical section names and density; Tools & Technologies explains technology roles. Tradeoffs appear alongside their mechanisms. Historical analyses remain unchanged.

Use existing tokens: fog `#f1f3ed`, paper `#fafbf7`, ink `#263f38`, sage `#d6ded0`, rule `#c9d1c5`; Newsreader headings and Outfit prose. The overview remains a two-column editorial spread, stacking on mobile. The content body retains the existing sticky table of contents and readable measure.

```
Overview / mechanism or measured result
TOC      / project-specific engineering sections
         / technology tags and roles
Adjacent projects
```

Use semantic HTML for diagrams so labels reflow at mobile sizes. Compiler pass selection and temperature-rule selection explain changes in behavior. Other diagrams stay static. No decorative animation or simulated benchmark curves. Keep the existing real-occlusion chart and add a genuine report figure with full-size access. Do not invent application screenshots.

## Evidence and factual decisions

### Pet detection

Sources: canonical `professional-reference/projects/occluded-pet-detector.md`, its supporting analysis, original `CPSC599_26_Project_Report.pdf` (7 pages), retained source-artifact findings in the analysis.

- One foreground class **pet**, not separate cat/dog/breed classifiers.
- Whole-pet boxes come from trimap foreground with bounded padding. Original synthetic labels retain the full box, not visible-only extent.
- Retained dataset: **3,000** generated examples + **3,312** clean training images = **6,312** training paths. Report §3.2 says 3,312 synthetic examples; the saved inventory contradicts that count. Publish the artifact count, retain the discrepancy here.
- The requested 0.20–0.65 object/pet area ratio is not measured pet occlusion coverage. Removed “controlled coverage” and unsupported leakage-prevention implications from public explanations.
- Recorded YOLO and EfficientDet real-occlusion results have distinct mAP50 and mAP50–95 units. Preserve both, population 74 images/90 boxes, rounded values. No statistical or uniform robustness claim.
- Hard-NMS ensemble combines two EfficientDet checkpoints, not three architectures or weighted fusion.
- Report abstract/§2 says DETR was excluded; §4 and §5 attach the same metrics to different evaluation splits. No executed final DETR lineage resolves that conflict. Describe the integration and exploration without presenting its metrics as final comparisons.
- Original Figure 5 (page 4, second embedded image) was extracted losslessly to `public/images/projects/pet-detection/clean-training-loss.png`. It is the clean YOLO box-loss plot, not the mislabeled validation mAP plot. Caption, alt text, 50-epoch axis, and full-size link preserve context. Third-party pet photographs were not republished because their license/source coverage is incomplete.

### Genetic search

Sources: canonical genetic-hyperparameter-tuning record, detailed analysis, original `CPSC 544 Group Project/Project_Report/ProjectReport.pdf` (4 pages), Table 2. A separate `CPSC_544___Project_Report.pdf` (5 pages) is a different report; do not substitute it for the analysis-linked deliverable.

- Base mutation changes at most one field. Logistic specialization can also update its dependent solver.
- Global-best elitism and uniform per-field crossover are custom optimizer policy; scikit-learn supplies learners, folds and baseline searches.
- `run(X, y)` is not a complete sklearn SearchCV contract. Avoid “framework” implying that compatibility.
- Table 2 corroborates SVC GA/grid/randomized test accuracy **0.7416**, times **160.09 / 940.42 / 155.49 s**. Label as final-report results with unequal budgets/concurrency, not general speedup.
- Mixed saved notebook state (later breast-cancer code vs older diabetes results) is a real provenance conflict. Do not relabel report metrics as a reproduced breast-cancer benchmark. Omit unrelated small drug/Titanic experiment accuracy rather than imply generalization.
- Original GA history images exist, but their run correspondence is incomplete. Prefer the documented algorithm illustration and explicit report table.

### Soccer scheduling

Source: detailed soccer-scheduler analysis; no separate canonical project record or completed final-results report supplied in the collection. The inspected proposal is design evidence.

- Recurring bookings use half-hour capacity and compressed weekday groups, not a field-specific calendar or opponent matching.
- Implemented search is **OR-tree**, fixed next-unassigned-event order, state copying and randomized child ordering; no AND-tree, MRV or optimality claim.
- Crossover reuses constructive completion. Mutation is an implemented attempt, not a validated successful search outcome.
- Pair/minimum routines are active, but preference/section routines return zero. The minimum-fill routine compares residual capacity incorrectly. Avoid suggesting a correctly optimized full objective or complete feasibility: parser/mutation/constraint integration have concrete defects.
- Replace generic colored “schedule” grid with schematic partial-state branching, explicitly not a solved schedule.

### Bare-metal controller

Sources: canonical controller record and detailed analysis.

- GPIO/MMIO SNES polling, active-low conversion, 16 samples, changed-state hexadecimal UART transport and pyserial action dispatch are the contributions.
- Firmware and host game run in separate environments. The old generic board drawing did not explain that boundary.
- 33,333 μs delay is an approximate 30 Hz target, not measured latency. Controller/UART use polling, not interrupt handlers.
- Identify supplied AArch64 build/startup/timer/debug scaffolding separately from custom integration. Attribute Al Sweigart's existing puzzle behavior.
- No physical latency, production success or executed JTAG claim added.

### Restaurant reservations

Sources: canonical restaurant-management-system record and supporting analysis. Original schema/README assets are available, but no reviewed screenshot or deployable capture is established. Use a layers/relationships diagram rather than fabricate product UI.

- Name foregrounds implemented accounts/reservations, not broad inventory/order/restaurant automation implied by schema-only areas.
- Direct mysql2 SQL, separate routers/controllers/query modules, specialized account records and composite reservation keys explain engineering depth.
- Six documented clearance levels, selected account checks, HTTP-only JWT cookie. No comprehensive RBAC or secure-session guarantee.
- Compensating deletes are not transactions. DATE storage conflicts with time-of-day UI; do not claim slot scheduling/collision prevention.
- Compose/Nginx are configuration work with retained wiring defects; no successful deployment claim. Tutorial attribution retained.

### J-- compiler

Sources: canonical compiler record and detailed four-pass/codegen analysis.

- Global declaration collection; scope/reference binding; type propagation; structure/literal checks are separate passes.
- Declaration back-references connect semantics to target layout. Explain custom stack calling convention, saved registers, intermediate temporaries and short circuit control flow.
- Return presence is not proof of all-path return; generated fallthrough error complements that check.
- ANTLR and cpsc411 supply recognizer/tree machinery. Missing external AST support blocked the historical review's end-to-end run, not proof the implementation stages are absent. No simulated execution or fabricated assembly output shown.

### Greenhouse simulation

Source: detailed greenhouse-control-simulation analysis; no separate canonical record, final report, physical measurements or dates supplied.

- Three Runnable loops plus result coordination, four simulated actuators, independent intervals, and local history.
- Three-unit deadband; temperature heating/cooling, humidity humidifier only, soil sprinkler only. The interactive rule diagram illustrates conditions, not measured telemetry or a new numerical simulator.
- Shared state and worker interruption are concretely incomplete; avoid “thread-safe” or reliable shutdown claims. Software simulation remains explicit.

### KiddoFlix

Source: detailed parental-control-streaming-ui analysis and original design-concept README context; no canonical record or final runtime results.

- Profile-keyed favorites/restrictions/limits/locks differ from browser-wide parent details. No backend/account service.
- Nested routes and keyboard/video control integration are the engineering work. Stored settings do not establish full access enforcement.
- Time usage and history are examples, not measured accounting. Account dialogs do not perform durable server mutations; sample video absent.
- Available catalog images are third-party assets, not authenticated interface captures. Use a route/storage diagram, not invented screenshots.

## Skills and review process

- humanizer: compare whole paragraphs with actual completed case studies; remove inventories, repeated qualifications, forced contrasts, academic framing and unsupported causal claims; reread final prose after implementation.
- frontend-design: preserve established tokens and editorial layout; use the subject's strongest mechanism or genuine artifact; review rendered screenshots critically.
- ui-ux-pro-max: responsive reflow, 44px controls, readable text, keyboard support and table alternatives. Chart search recommends grouped bars for precise comparisons; retain that existing chart form rather than radar.
- vercel-react-best-practices: keep narrative/data/static diagrams server-rendered; isolate only two small interactive mechanism components; no added dependency or client fetch.
- web-design-guidelines: fetched latest official rules; review scoped CSS, semantics, focus, image dimensions, anchor offsets, keyboard behavior, motion and hydration. Portfolio voice and user design requirements override generic title-case/second-person preferences.
- playwright: reuse existing server on `http://127.0.0.1:3002`; inspect all modified public pages and all new interactions at desktop/mobile. Capture screenshots/results under `output/playwright/remaining-projects/`.

## Final review

All eight projects passed writing, technical, content, visual, and functional review. See [per-project quality review](../output/playwright/remaining-projects/REPORT.md), [browser results](../output/playwright/remaining-projects/review-results.json), and [mechanism results](../output/playwright/remaining-projects/mechanism-results.json).

Final browser suite: 48 page/viewport checks, 96 interactions and 17 internal links passed. Focused mechanism suite: 28 state/viewport checks passed, including landscape. Zero checked WCAG violations and browser errors. The 320px GA heading overflow was fixed and the suite rerun. All source/data for completed Snap Remedy and Distributed Chat System components were compared with HEAD and remain unchanged.

TypeScript and lint passed. An isolated production build generated all 26 pages successfully; a final repeat encountered macOS cloud-evicted (`dataless`) Next metadata. Unreadable files in the installed Next package were restored, byte-for-byte, from the cached Next 14.0.4 tarball. A temporary source/lockfile copy outside cloud-managed Desktop storage is used for the final verification retry. No dependency version, manifest or lockfile changed. Final retry status is appended below.

The existing port-3002 server was unresponsive and replaced, with output redirected to `/tmp/portfolio-project-refinement-dev.log`. The sole development instance remains at `http://127.0.0.1:3002`. No commit, push, merge or deployment was performed.


### Final verification result

**Passed.** The exact final-source copy in `/tmp/portfolio-final-check` completed `npm run build` (26 generated pages), `npm run typecheck`, and `npm run lint`. SHA-256 comparisons confirm all 12 changed application/data files, the original figure, package.json and package-lock.json match the working tree; see `output/playwright/remaining-projects/build-copy-hashes.json`. The original repository also passed TypeScript, lint and diff checks. Its initial isolated build succeeded before the final small adjustments; later original-directory retries were stopped because of cloud-placeholder reads. The final successful temporary build validates the final source, not an earlier revision.

No implementation work remains. Unresolved project-history questions are listed in the per-project evidence sections and final quality report. The development server was checked again and serves the homepage, listing and refined project pages at `http://127.0.0.1:3002`. All changes remain uncommitted.


### Review server location

The final persistent `npm run dev` process runs from `/tmp/portfolio-final-check` at `http://127.0.0.1:3002`. The Desktop repository's installed-file reads failed with `ECANCELED` even after restoring cached Next files. This matching copy avoids that filesystem failure. It contains the final source and unchanged lockfile verified by SHA-256; future edits in the Desktop workspace are not automatically mirrored to the temporary review copy. No other development server was left listening on port 3002.
