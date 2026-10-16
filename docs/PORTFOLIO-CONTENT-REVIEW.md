# Portfolio content review

Reviewed against `professional-reference/` on October 16, 2026. This update preserves the existing visual design. The transferred reference files remain unchanged.

## Experience added

| Company | Published roles and dates | Primary source |
| --- | --- | --- |
| Snap Remedy | Software Developer, Jul. 2026–Present; Software Developer Intern, Apr.–Jul. 2026 | [Canonical record](professional-reference/experience/snap-remedy.md) |
| PRO-Formance Intermodal | Software Intern, Jan.–Apr. 2026; Calgary, AB | [Canonical record](professional-reference/experience/pro-formance-intermodal.md) |
| Phillys | Web Developer, contract, Sep.–Nov. 2025; Calgary, AB | [Canonical record](professional-reference/experience/phillys.md) |

Snap Remedy is presented as one continuous engagement, labeled “Software Developer / Intern” for Apr. 2026–Present on both the home and Experience pages. The shared summary records the July 2026 transition, and contributions appear once for the entire engagement because the work spans both roles. The source-specific title dates remain in the table above. No location or specific employment arrangement is inferred. Technologies are taken from each employer's record, rather than the general skills list.

Experience wording uses established technical terms where the implementation supports them. Snap Remedy's extract/map/normalize/upsert workflow is described as **ETL (extract, transform, load)**, with resumable batch processing, relational data modeling, JSON APIs, LLM API integration, transactional imports, and automated Django testing. PRO-Formance emphasizes full-stack development, workflow automation, operational analytics, root-cause analysis, and account provisioning. Phillys emphasizes responsive web development, deployment, and production support. The home page's technical stack reflects these contexts and removes older vector-timestamp, broad RBAC, and unsupported Maven/JUnit/Pytest workflow wording. The imported source records remain unchanged.

## Projects added

| Project | Existing filter convention | Primary source and qualification |
| --- | --- | --- |
| J-- to MIPS Compiler | New Systems category | [Canonical record](professional-reference/projects/custom-compiler.md); Jan.–Apr. 2026 is confirmed. Full execution was blocked by missing external course support during investigation. |
| Climate Control Simulation | New Systems category | [Supporting analysis](professional-reference/evidence/greenhouse-control-simulation/PROJECT_ANALYSIS.md); software simulation, not hardware automation. No development dates supplied. |
| KiddoFlix | New Frontend category | [Supporting analysis](professional-reference/evidence/parental-control-streaming-ui/PROJECT_ANALYSIS.md); frontend design prototype with simulated account behavior, incomplete restrictions, and missing sample video. No development dates supplied. |

All three use the existing project data model, cards, generated detail routes, category filtering, and previous/next navigation. No repository, demo, or report URL was invented. The two analysis-only additions retain their prototype/validation limits; they are not promoted into confirmed employment records. Project dates are mentioned only where supported, following the existing pages' prose-based presentation.

## Existing project corrections

Existing slugs and featured order are preserved. New projects are not automatically featured.

- **IRC-HAT:** replaced vector-clock/P-RAM, configurable gossip fanout, convergence, lossless recovery, and measured multi-server deployment claims with documented NIO framing, successor forwarding, indexed persistence, and registry coordination. Recovery/build/test limitations remain explicit. [Source](professional-reference/projects/distributed-chat-system.md).
- **Genetic tuner:** removed unsupported accuracy/runtime figures and equal-budget/general-speedup claims. Described the actual optimizer API, mutation policy, compatibility handling, and mixed experiment provenance. [Source](professional-reference/projects/genetic-hyperparameter-tuning.md).
- **Gengar:** corrected AND/OR wording to implemented OR-tree search, removed municipal deployment/convergence success implications, and retained incomplete objectives and constraint integration. [Source](professional-reference/evidence/soccer-scheduler/PROJECT_ANALYSIS.md).
- **Raspberry Pi:** described SNES polling/serial integration; removed unsupported interrupt/ISR and successful hardware-execution claims. Distinguished supplied support code and Al Sweigart's puzzle. [Source](professional-reference/projects/bare-metal-raspberry-pi-controller.md).
- **Restaurant system:** replaced comprehensive five-role/security/deployment claims with supported account and reservation scope, partial numeric-clearance checks, schema-only boundaries, tutorial attribution, and unverified runtime status. [Source](professional-reference/projects/restaurant-management-system.md).
- **Pet detection:** retained rounded recorded YOLO/EfficientDet metrics and mixed real-occlusion outcomes; removed unsupported completed DETR results and guaranteed measured overlap. Training-lineage and historical-evaluation qualifications remain explicit. [Source](professional-reference/projects/occluded-pet-detector.md).

## Exclusions and duplication decisions

- Best Buy and Activate Games are excluded as requested, including Activate's hardware troubleshooting. No retail/customer-service roles are published.
- Snap Remedy's SKU Profitability Ranker is represented as employment, not duplicated as a personal project. PRO-Formance workflows are one employment system, not separate projects.
- Existing chat, pet detection, genetic tuning, soccer scheduling, Raspberry Pi, and restaurant entries are updated in place rather than duplicated under reference-record names.
- Duplicate notebooks, classifier variants, checkouts, and archives remain part of their parent projects.
- Education/coursework is not presented as employment. No separate professional-development program is documented, and the certification record confirms none as of October 9, 2026; no such entry is invented.
- Unverified business metrics are omitted: PRO-Formance's 70% administrative-effort reduction and 20% pass-rate improvement; Phillys' 40% page-load reduction. PRO-Formance's 30+ students/month and 200+ training hours/month are also omitted pending clarification of how the counts were established.
- No resume PDF, contact information, dependency versions, global theme, or broader visual redesign is changed.

## Details requiring owner verification

1. **Snap Remedy:** confirm that Software Developer remains current; “Present” was last confirmed October 9, 2026. July overlaps because the exact transition day is unspecified. Location, employment arrangement, team size, contribution timing by role, production hosting, and adoption/business outcomes remain unconfirmed.
2. **PRO-Formance:** confirm the baseline, period, method, and attribution before publishing improvement percentages; explain the monthly workflow counts. Python framework, SQL engine, deployment, and test history are unspecified.
3. **Phillys:** confirm the page-load measurement and conditions before using 40%; provide a public website URL, framework/host if relevant, and maintenance duration if these should be included.
4. **New projects:** confirm Climate Control Simulation and KiddoFlix development dates and any desired public links. They currently rely on supporting source analyses, without separate canonical project records. Confirm whether the compiler's external dependencies and end-to-end validation are now available.
5. **Existing projects:** confirm updated execution/test evidence before restoring any recovery, performance, deployment, security, completed DETR, or hardware-success claims. The [source gaps](professional-reference/GAPS.md) describe the unresolved limits.

Missing values are omitted from public cards or explicitly qualified in project detail text. They are recorded here for review without inventing filler values.

## Verification

- Passed `git diff --check`.
- Passed strict TypeScript compiler-API checks for `data/projects.ts` and `data/experiences.ts` with zero diagnostics.
- Passed syntax checks for every changed TypeScript/TSX file using the installed TypeScript compiler.
- Passed direct data checks: nine unique projects; category membership/filter helpers; all slug lookups; previous/next links and invalid-slug handling; unchanged four-project featured order; three employers; navigation targets and matching route files. Snap Remedy's two source titles are now displayed as one combined role, with the July transition retained in its shared summary.
- Reviewed responsive classes: the shared navigation wraps and stacks on small screens, experience role/date rows stack below `sm`, technology badges wrap, and project previous/next links stack on mobile. Existing page widths, spacing, colors, type scale, cards, and project grid are reused.
- **Incomplete environment checks:** `npm run lint`, `./node_modules/.bin/tsc --noEmit --incremental false`, and `npm run build` were attempted but stalled during installed-dependency reads without application diagnostics, then were interrupted. Retrying lint outside the sandbox also stalled. A compiler-API application check likewise stalled reading Next declaration files. A simple read of the installed TypeScript CLI file stalled as well, while the compiler library and repository source reads worked. No dependency files were modified or reinstalled.
- No repository ESLint configuration is present. A direct ESLint API attempt using `next/core-web-vitals` also stalled while loading the installed ESLint package.
- A successful full lint, application typecheck, production build, HTTP route smoke check, and desktop/mobile browser check remain to be completed in a working dependency/runtime environment. The data/syntax checks above do not substitute for them.
