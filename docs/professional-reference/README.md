# Professional reference collection

Detailed professional information transferred from the sibling `Resume_Builder` repository on **2026-10-15**, source revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`. The actual directory uses that capitalization; the task referred to it as `resume_builder`.

This folder is reference material for future portfolio work. It is not connected to the website. No existing portfolio file, frontend, route, styling, application logic, or public asset was changed during the transfer. Future publication or implementation is a separate task.

## Start here

1. Find an experience or project in the tables below and read its complete record, including provenance, limitations, and clarification notes.
2. Read [GAPS.md](GAPS.md) before choosing claims. The general skills seed contains stale statements that conflict with newer detailed project records.
3. Use [SKILLS.md](SKILLS.md) to find technologies and their specific contexts. Skill names do not establish proficiency, professional tenure, or implementation ownership.
4. Consult the linked supporting analysis when more technical detail is needed. Its validation results describe the original investigation, not checks performed during this transfer.
5. Use [catalog.json](catalog.json) for machine-readable discovery, source/destination mapping, dates, hashes, privacy edits, and the inventory of excluded sources. [SOURCE-REVIEW.md](SOURCE-REVIEW.md) explains coverage and source selection.

## Organization and source authority

```text
docs/professional-reference/
├── README.md                 Navigation and usage
├── GAPS.md                   Conflicts, qualifications, missing information
├── SKILLS.md                 Cross-reference to supported skill contexts
├── SOURCE-REVIEW.md           Repository coverage and transfer decisions
├── catalog.json              Structured inventory and provenance
├── profile/                  Education, skills seed, certification status, public links
├── experience/               Five complete professional experience records
├── projects/                 Six complete canonical project records
└── evidence/<project-id>/     Ten detailed supporting analyses
    └── PROJECT_ANALYSIS.md
```

The source's `profile/`, `experience/`, and `projects/` are **canonical records**. Their contents still distinguish resume-seeded claims, owner accounts/confirmations, and evidence-derived implementation findings. Canonical status does not mean independent verification of every claim. Explicit owner corrections and record-specific limitations matter.

The `evidence/` files are **supporting analyses**, not additional canonical career records. They preserve architecture, implementation, interfaces, algorithms, data transformations, test inventories, measured/saved results, attribution, and unresolved issues. They were retained once per analyzed system because they contain detail beyond the canonical records. Overlap with a record is supporting provenance, not a second project or accomplishment. Snap Remedy is a work experience, not a separate personal project; duplicate notebooks, checkouts, classifier variants, and archives remain grouped under their original system.

Generated resumes, application analyses, job postings, base resumes, templates, and synthetic tooling tests are not factual substitutes for career records. A job requirement is not a candidate skill. Do not silently promote evidence-only observations or stale generated wording into confirmed personal claims.

## Professional background

| Topic | Reference | Key qualification |
| --- | --- | --- |
| Identity and public professional links | [contact](profile/contact.md) | Parmeet Virdi; Calgary, AB; source-provided LinkedIn, GitHub, and portfolio URLs. Phone/email excluded; URL availability unverified. |
| Education | [education](profile/education.md) | University of Calgary, BSc Computer Science, Aug. 2022–Dec. 2026 expected; 3.7/4.0 cumulative GPA confirmed 2026-10-09; seven named coursework areas. Completion/current enrollment not independently established. |
| Original skills inventory | [skills](profile/skills.md) | Preserved with original provenance; see [conflicts](GAPS.md#skills-seed-conflicts) and [context index](SKILLS.md). |
| Certifications | [certifications](profile/certifications.md) | Owner confirmed none as of 2026-10-09; time-sensitive. |

## Work experience

These are navigation summaries. Complete responsibilities, accomplishments, tools, incident examples, qualifiers, and gaps remain in each record.

| Experience | Roles and dates | Detail retained |
| --- | --- | --- |
| [Snap Remedy](experience/snap-remedy.md) | Software Developer Intern, Apr.–Jul. 2026; Software Developer, Jul. 2026–Present, confirmed as of 2026-10-09 | Paid Django/React ERP decision-support work; nine Spire adapters, resumable synchronization, deterministic SKU ranking, Groq explanations/cache, FRED viewer, transactional CSV imports, data modeling, APIs, tests, documentation. Contributions are shared across the engagement. [Technical analysis](evidence/snap-remedy/PROJECT_ANALYSIS.md). |
| [PRO-Formance Intermodal](experience/pro-formance-intermodal.md) | Software Intern, Jan.–Apr. 2026, Calgary | Sole developer of one React/SQL/Python internal system: dashboard, scheduling, grants, analytics, support, onboarding, and knowledge base. Seed metrics retain exact 70%, 20%, 30+ students/month, and 200+ training hours/month with measurement gaps. |
| [Phillys](experience/phillys.md) | Web Developer, contract, Sep.–Nov. 2025, Calgary | PHP/JavaScript website rebuild, mobile layout, DNS/SSL/cPanel deployment, email inquiry workflow, troubleshooting, maintenance, vendor escalation. Seed reports 40% average-page-load reduction; method unconfirmed. |
| [Best Buy Canada](experience/Best_Buy_Experience.md) | Seasonal Sales Associate – Computing Department, Sep. 2025–Jan. 2026, Calgary | Needs assessment, technical product explanations, consultative selling, memberships/protection, checkout/orders, stock retrieval, holiday demand, collaboration and management recognition. Sales performance is recollection without numerical reports; customer repairs belonged to Geek Squad. |
| [Activate Games](experience/Activate_Games_Experience.md) | Game Facilitator, Aug. 2023–Mar. 2024; Team Lead, Mar.–Sep. 2024, Calgary | Repairs across 11 game rooms, guest service, bookings/payments, hands-on hardware diagnostics, shift leadership, six employees fully trained, cash reconciliation, inventory, incident response. Approximate facility volumes and role boundaries preserved. Earlier acting-lead/keyholder work has no confirmed start date. |

## Canonical projects

Dates below come from the source records, not analysis timestamps. Compiler, GA, and pet-detector dates were owner-confirmed on 2026-10-09; chat, Raspberry Pi, and restaurant dates remain resume-seeded.

| Project | Dates | Detailed scope and analysis |
| --- | --- | --- |
| [Occluded Pet Detector](projects/occluded-pet-detector.md) | Aug. 2025–Apr. 2026 | Oxford-IIIT Pet preparation, ADE20K synthetic occlusion, YOLOv8n/EfficientDet/partial DETR, COCO evaluation, NMS ensemble, exact clean/real metrics, research deliverables. Mixed robustness results and training-provenance gaps retained. [Analysis](evidence/occluded-pet-detector/PROJECT_ANALYSIS.md). |
| [J-- to MIPS Compiler](projects/custom-compiler.md) | Jan.–Apr. 2026 | ANTLR grammars, AST shaping, four semantic passes, scopes/type checks, calling convention, stack layout, MIPS control flow/runtime wrappers. Full end-to-end execution unverified because external course support was unavailable. [Analysis](evidence/custom-compiler/PROJECT_ANALYSIS.md). |
| [Genetic-Algorithm Hyperparameter Tuning](projects/genetic-hyperparameter-tuning.md) | Jan.–Apr. 2025 | Custom evolutionary optimizer, logistic solver/penalty compatibility, classifier comparisons, notebook/data preparation, saved accuracy/timing tables. Mixed notebook state, unequal budgets, and leakage risks retained. [Analysis](evidence/genetic-hyperparameter-tuning/PROJECT_ANALYSIS.md). |
| [IRC-HAT distributed chat](projects/distributed-chat-system.md) | Jan.–Apr. 2025 | Java NIO framing/partial writes, concurrent client/server workers, custom JSON protocol, addressing replication/election, file history/indexing, reconnect paths, containers and manual harnesses. Incomplete failover and uncorroborated seed stress-test claim distinguished. [Analysis](evidence/distributed-chat-system/PROJECT_ANALYSIS.md). |
| [Restaurant Management System](projects/restaurant-management-system.md) | Sep.–Dec. 2024 | React/Express/MySQL account, reservation and inquiry workflows, schema, JWT cookie integration, partial clearance checks, container configuration. Six documented levels, schema-only areas, security/runtime/deployment gaps retained. [Analysis](evidence/restaurant-management-system/PROJECT_ANALYSIS.md). |
| [Bare-metal Raspberry Pi SNES integration](projects/bare-metal-raspberry-pi-controller.md) | Jan.–Apr. 2024 | GPIO controller polling, active-low bit conversion, UART transport, Python/pyserial input decoding and Pygame integration. Course support and third-party puzzle attribution, configured timing, and unverified hardware/debug paths retained. [Analysis](evidence/bare-metal-raspberry-pi-controller/PROJECT_ANALYSIS.md). |

## Additional projects documented only in evidence

There is no corresponding canonical `projects/*.md` in the source for these three systems. Preserve this status. Exact development dates, deployment, and outcomes are not established; course names, proposal dates, and file timestamps do not supply those facts.

| Project | Source analysis and supported scope | Important limits |
| --- | --- | --- |
| Climate Control Simulation | [greenhouse-control-simulation](evidence/greenhouse-control-simulation/PROJECT_ANALYSIS.md): Java Swing configuration/live results, temperature/humidity/soil-moisture loops, four actuators, local saved-run history, numeric validation and documentation. | Simulation only; no sensors or physical greenhouse. Shared-state and cooperative thread-shutdown gaps; no supplied automated tests or measured control performance. |
| KiddoFlix | [parental-control-streaming-ui](evidence/parental-control-streaming-ui/PROJECT_ANALYSIS.md): React/MUI parent/child interface, routing, search/catalog, favorites, browser storage, restriction controls, keyboard/player interactions, profile personalization and account dialogs. | Design prototype; no backend/accounts or durable account mutations. Time usage is simulated, route controls incomplete, sample video missing, browser/build outcomes unverified. |
| Gengar soccer scheduler | [soccer-scheduler](evidence/soccer-scheduler/PROJECT_ANALYSIS.md): Python CLI, sectioned input parsing, half-hour domain, feasibility bookkeeping, recursive OR-tree construction, genetic selection/crossover/mutation, manual diagnostics and proposal. | Fabricated course scenario; two objective terms disabled, some constraints disconnected, observed mutation/parser failures. Large fixtures are available input scale, not proof of successful solves. No implemented AND-tree alternative established. |

## Reuse, privacy, and freshness

- Preserve metric units, qualifiers, population, split, model, timeframe, conditions, and evidence status. Source-code counts, configured parameters, investigator checks, and saved experiment results are different kinds of evidence.
- Do not add degrees completed, awards, certifications, publication acceptance, production usage, profitability gains, security guarantees, deployment success, or causal improvements without support. Record missing information as unknown.
- Reconfirm `Present`, expected education dates, GPA, and certification status when updating public copy. Transfer date is not a new owner confirmation.
- Public professional URLs are retained exactly as supplied. Do not invent repository/demo links from project names. The source analyses contain internal code paths and sometimes public library/service links; those are not automatically project showcase URLs.
- Telephone/email, absolute machine paths, private-network addresses, database usernames, demo credential literals, and sensitive third-party customer circumstances were omitted or generalized. No `.env`, credentials, resume PDFs, source code, raw business records, or private configuration files were copied. The manifest records redaction categories without storing removed values.
- Relative links between the imported career records and analyses work within this folder. Paths inside the analyses generally refer to original investigated projects that were not supplied in `Resume_Builder`. Source paths in provenance are repository-relative identifiers, not claims that those artifacts live in this website.
