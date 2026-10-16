---
experience_id: snap-remedy
company: Snap Remedy
role:
  - title: "Software Developer Intern"
    start_date: "2026-04"
    end_date: "2026-07"
  - title: "Software Developer"
    start_date: "2026-07"
    end_date: "Present"
location: null
start_date: "2026-04"
end_date: "Present"
status_confirmed_as_of: "2026-10-09"
employment_type: "Paid software development work; exact arrangement unconfirmed"
categories: ["Full-stack development", "ERP integration", "Data synchronization", "Decision-support tools", "Testing", "Technical documentation"]
technologies: ["Python", "Django", "JavaScript", "React", "React Router", "SQLite", "Django ORM", "CSS", "Vite", "Chart.js", "Requests", "Spire ERP API", "FRED API", "Groq API", "CSV", "JSON", "ESLint"]
evidence:
  - evidence/snap-remedy/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/experience/snap-remedy.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Snap Remedy

## Provenance and Completeness

Paid software development work for Snap Remedy, as confirmed by the owner for the original ingestion.

Owner confirmation on 2026-10-09: Software Developer Intern from April 2026 through July 2026, followed by Software Developer from July 2026 to Present (ongoing as of October 2026). Location and employee/contractor/full-time/part-time arrangement remain unconfirmed. The shared July month records the transition without inferring an exact day. Technical contributions below describe the engagement as a whole; their allocation to each role period has not been confirmed.

The source analysis inspected the workspace on **2026-10-07**. It treats original implementation as the developer's work based on the supplied ownership statement, rather than Git authorship analysis. Implementation findings, read-only local observations, and historical documentation are distinguished below. The source is a technical investigation, not a record of employment dates or an official role title.

The evidence file is the sole technical source for this record. Its internal code/document paths are investigation anchors, not additional artifacts asserted to exist in this resume repository. Consult its Contributions, Architecture, Database / Data Engineering, Reliability / Failure Handling, Testing / Quality, Performance / Scale, and Uncertain / Not Verifiable sections for fuller detail.

Source investigation: [evidence/snap-remedy/PROJECT_ANALYSIS.md](../evidence/snap-remedy/PROJECT_ANALYSIS.md).

## Overview

The analyzed application, identified as MMS / SnapRemedy and titled **SKU Profitability Ranker**, compares finished-goods SKUs using locally synchronized Spire ERP inventory, sales, customer, pricing, and production data. It combines configurable deterministic ranking, optional generated explanations, manual-factor CSV maintenance, and a separate commodity-price / producer-price-index viewer.

## Responsibilities

- Backend data modeling, ERP adapters, synchronization orchestration, ranking logic, and JSON APIs.
- React interfaces for ranking/filtering, pricing and SKU details, explanations, CSV imports, and commodity visualization.
- Data mapping corrections, resumability and recovery mechanisms, validation, and automated backend tests.
- Scoring/API documentation, sync design and validation records, operator recovery guidance, and technical handoffs.
- Documented investigations of pricing representation, invoice/order-date mapping, stale synchronization state, frontend payloads, provider compatibility, and discrepancies between environments. Historical debugging reports do not establish every action or a complete chronology.

## Technical Work

### ERP integration and data modeling

Nine dataset-specific Spire fetch/upsert adapters cover inventory, inventory price levels, normalized inventory sell prices, customers, territories, sales history, purchasing history, BOM templates, and BOM components. Mapping handles nested or scalar customer/vendor identifiers, nested pricing and unit-of-measure data, decimal/date conversion, and dependency-linked records. Raw ERP records are retained alongside promoted fields for inspection.

Stable identifiers and unique constraints support per-record `update_or_create` persistence. Preloaded relationship dictionaries, with lookup-and-cache refresh on misses, link sales to customers, prices to inventory, and components to BOM templates. Nullable relationships permit some unmatched references; unresolved required BOM templates and missing required identities cause skips. Inventory synchronization permits eleven product groups; ranking eligibility is narrower: active inventory, warehouse `00`, group `FG`.

Pricing moved from a twenty-column matrix to normalized sell-price records carrying price-level, UOM, currency, and inventory metadata. Active read/UI paths expose seven business price categories, including six USA price levels grouped together, with SKU and territory/category filtering. The unused legacy matrix remains in the schema. This is not a demonstrated currency/UOM normalization engine.

### Deterministic ranking

Local ORM aggregation produces SKU-level sales quantities, revenue and source margin totals, average unit price, distinct customer/territory counts, latest sale, and BOM context. Filters distinguish sales-scoped territory/customer/date restrictions from inventory/manual selection. Date aliases, rolling windows, factor aliases, positive weights, eligibility, and conflicting exclusivity filters have validation and tests.

Eight backend factors are supported: margin percentage, volume, customer value, sentimental value, exclusivity, production ease, seasonality, and fragility. Margin uses fixed buckets; volume uses peer-relative percentiles with tie handling; recognized customer tiers use revenue-weighted values with a units-based fallback. Manual factors use fixed-range normalization. The frontend exposes seven factor cards; customer value remains API-only, while customer tier is also a UI filter.

The score divides weighted available normalized factors by their available weight. Missing optional factors are excluded from that denominator; completeness is reported separately. Missing margin instead receives the lowest bucket. All-unavailable factors yield zero. Scores have deterministic ascending-SKU tie ordering after rounding; the filtered peer set is scored before the result limit, so filters can change volume percentiles while limit alone does not. Responses expose raw/normalized factors, missing data, completeness, and source metrics.

This is a weighted rules-based score, not machine learning or a calibrated probability. BOM quantities and minute-unit totals are context, not scored production-cost calculations. Purchasing, normalized prices, price levels, and FRED data are not current scoring factors; gross-profit dollars and COGS-per-minute are deferred.

### Explanations and commodity data

Groq chat-completions integration sends ranking context with prompts restricting explanations to supplied data and a structured-output schema. Application validation normalizes required text/lists and supplies fallback content. SHA-256 context hashing and a persistent cache incorporate SKU, context, model, and prompt version; refresh bypasses cache lookup. Top-N upfront and lazy single-SKU flows are implemented. Provider/network/parse failures produce per-SKU errors without discarding rankings, although not every database/context failure is caught by that provider handler.

FRED integration maintains fifteen configured series: six dollar-price and nine index series. It persists metadata and observations, extracts index-base dates, maps missing values to null, and exposes series/observation/year reads. React tables and Chart.js display selected series, year navigation, dollar/index distinctions, and frontend aluminum unit conversion. Series metadata is upserted; observation insertion ignores existing series/date conflicts rather than updating revised historical values.

### Manual inputs and frontend workflows

CSV maintenance includes a six-column template, UTF-8 BOM handling, a **2,097,152-byte** limit, strict header/required-cell/value checks, duplicate and unknown-SKU errors, and create/update/unchanged classification. Preview performs no writes. Confirmation reuploads and revalidates the CSV, then writes in one atomic transaction; unchanged records are not saved. No staged upload or preview token is persisted, and preview/confirmation do not share a locked snapshot.

Three React routes provide ranking, commodity viewing, and manual imports under `/sku-profit/`. Shared controls/API wrappers support filters, weights, price retrieval, expandable details, structured explanations, template download, preview counts, row/field errors, confirmation results, and loading/empty/error states. Chart.js rendering, React state/routing, and custom CSS are integrated rather than custom framework implementations.

## Architecture and Implementation

One Django project contains two domain apps (`spire_data`, `external_data`) sharing a database; local configuration uses SQLite. The analyzed source has **19 custom model classes** including operational/cache/legacy models, **eight numbered custom migrations**, and **31 custom API route patterns**. Function-based views return JSON without Django REST Framework.

Spire adapters feed a shared runner and local models; ranking reads those models independently of synchronization; optional explanations run after ranking. CSV imports update manual-factor records. FRED synchronization and its viewer remain a separate path.

Synchronization runs synchronously in the initiating Python call or HTTP request, processing datasets/pages sequentially. There is no demonstrated worker service, queue, scheduler, or periodic refresh service. Vite supplies the development/build configuration and localhost API proxy; frontend asset base and browser basename are `/sku-profit/`. Production hosting, static serving, route fallback, and deployed versions are not established.

## Reliability and Data Synchronization

- Reusable frozen dataset specifications separate fetch/mapping adapters from shared bounded and full-sync orchestration. Full sync processes all nine datasets to exhaustion in prerequisite order; prerequisite failure stops dependent processing.
- Durable checkpoints store current dataset/page offset, completed datasets, batch size, summaries, errors, and timestamps. Default page size is **5,000**, with a locally enforced maximum of **10,000**; a short or empty page ends a dataset.
- Timeouts, connection failures, and HTTP 429/500/502/503/504 receive at most **three total fetch attempts**, waiting **one and two seconds** between attempts at the same offset. Other HTTP failures fail immediately. Spire requests have a **30-second** Requests timeout, not a whole-run deadline.
- Writes commit in **250-record transaction chunks**, with checkpoint heartbeats between chunks. Page progress advances only after successful page completion. A later chunk failure can leave earlier chunks committed; resume replays the failed page through stable-key upserts. This is not whole-page atomicity for larger pages or exactly-once processing.
- Sync logs retain fetched/saved/skipped counters and success/failure state. Status APIs expose checkpoint/log information and stale-state advice. Started state older than **14,400 seconds** can be cleaned/interrupted; fresh conflicting runs block startup through state/log guards.
- Staff recovery requires explicit interruption confirmation, retains progress, and rejects conflicting log states. It changes persisted state without terminating a process; operators must independently know that the previous process stopped. Heartbeat age is not proof of process liveness.

SQLite does not provide the row-lock semantics implied by `select_for_update`; guards are best effort and no distributed lock or fencing token is present. Offset pagination has no upstream snapshot token or change watermark. Synchronization does not reconcile upstream deletions or detect manual deletion of already-completed local records. Skipped-row logs lack per-record reason detail.

FRED does not have the Spire runner's timeout/retry/checkpoint protections, and observation requests do not paginate beyond their configured limit. Groq caching has no expiry/eviction, retry, or request coalescing. Efficiency mechanisms include relationship-map preloading, database-side aggregation, bounded pages, short transactions, cached explanations, and bulk FRED inserts; no measured speedup is established.

## Metrics and Scale

These are source-analysis observations of supplied local snapshots and persisted runs, not production capacity, user counts, or business outcomes. The duplicate checkout is not a second product and counts are not added across copies.

- Each of two local databases contained **563,760 rows across nine Spire business tables**: 697 inventory, 20 price levels, 926 sell prices, 1,752 customers, 13 territories, **525,134 sales-history**, 9,057 purchasing-history, 1,142 BOM-template, and **25,019 BOM-component** rows.
- Each had **265 ranking-eligible finished-goods inventory rows** and **4,288 commodity observations** (1,695 dollar and 2,593 index). Both had zero manual-input rows, so import functionality is implementation/test evidence rather than observed populated operational use.
- Local sales invoice dates span **2014-01-23 through 2026-05-20**; both snapshots had null minimum/maximum order dates. This does not establish complete or current upstream history.
- Three successful persisted full-sync logs each report **567,030 fetched / 563,760 saved / 3,270 skipped**. Saved counters represent accepted upsert operations, including updates, rather than necessarily new inserts; exact reasons for every skip are not recoverable.
- Recorded elapsed durations were **1471.230061 seconds** (main, 2026-08-13), **1245.243139 seconds** (temp, 2026-09-11), and **1551.306296 seconds** (temp, 2026-09-11). These are particular end-to-end local sync runs, not controlled before/after benchmarks. Documentation attributes resume=true to the first two and resume=false to the last; logs do not store that argument.
- At investigation time the main checkpoint was failed at inventory offset zero, despite older successful loads; the temp checkpoint was completed. Historical success does not imply the latest main run succeeded.

## Testing and Validation

The implementation contains **185 backend test methods in 15 Django TestCase classes across four modules**, covering mapping, precision, relationships, filters, scoring, authentication/API validation, caching/provider errors, pagination, synchronization retries/checkpoints/chunk rollback and replay, dependency ordering, CSV validation/atomicity, and commodity reads. Tests use ORM fixtures and mocks; tests named “RealUsage” exercise actual adapters with mocked Spire payloads, not live calls.

During the source investigation, an isolated in-memory database run with accidental network calls blocked completed with **185 tests passed in 90.781 seconds** and no Django system-check issues. That is an investigation validation result, not application performance or a new ingestion-time test. All 36 project Python files parsed; frontend ESLint exited successfully without diagnostics.

Historical documents separately report builds, checks, migration-drift checks, tests, staff API smoke checks, live synchronization/provider checks, fresh-checkout verification, and database comparison work. Persisted sync logs corroborate the full-run counters/timings above. The investigation rechecked database counts and selected sales aggregates, not complete field-level parity or another operator's browser/database. A reported ranking mismatch in another environment remains unresolved.

No coverage percentage, frontend automated suite, browser end-to-end validation, load testing, true multiprocess race testing, or current live provider contract validation is established. Commodity tests cover reads, not the FRED synchronization pipeline. No CI workflow was found; no production build was run during the investigation.

## Tools and Systems

Python; Django **4.2**; Django ORM/migrations/TestCase; SQLite; JavaScript/JSX; React; React Router; CSS/HTML; Vite; Chart.js; Requests; python-dotenv; ESLint; HTTP JSON APIs; CSV; JSON Schema structured-output requests; SHA-256 context hashing; Git/local Python and npm environments. Integrations: Spire ERP, FRED, Groq. Version details in the source describe manifests/lockfiles rather than deployed versions.

## Notes and Clarification

### Scope and attribution

- Titles and month/year dates were confirmed by the owner on 2026-10-09, as recorded above. Location and employee/contractor/full-time/part-time arrangement remain unconfirmed. Paid work classification comes from the original owner ingestion instruction. Document/run dates do not establish employment dates or phase-specific contribution dates.
- Source supports implementation scope under its ownership statement, not independently audited authorship, team size, management duties, or a complete work timeline.
- Django supplies ORM, transactions, migrations, authentication/session/CSRF machinery, admin infrastructure, and testing facilities. React/Router, Chart.js, Vite, Requests, and ESLint supply their respective runtime/tool behavior. The contribution is application schema, policies, orchestration, integration, configuration, and domain/UI logic using those tools.
- **28 of 31 API patterns** have active staff gating. The three import routes bypass staff checks; preview/confirm and ranking are CSRF exempt. This is staff/non-staff access control, not custom multi-role RBAC. Development settings and absent production evidence do not establish a hardened production service or security audit.
- PostgreSQL is not demonstrated: a declared adapter dependency does not establish use. No TypeScript application, direct OpenAI API integration, custom admin console, CI/CD pipeline, or cloud deployment is evidenced.
- Ranking aggregates source fields rather than audited profitability. Average unit price is not quantity-weighted; BOM component totals do not harmonize units. Production ease is a manual cold-storage-coded field with unresolved UI/business semantics, not calculated labor efficiency. Unknown filter keys are ignored and can broaden selection.
- Groq prompting/schema handling does not establish explanation accuracy. The lazy endpoint accepts supplied ranking context without recomputing/signing it. Historical provider success is not proof of current reachability.
- UI limitations include results requiring regeneration after filter changes, one price request per SKU without throttling/full pagination, incomplete currency/UOM labels, an explanation-request failure path that can leave loading state set, and commodity date/missing-data handling limits. Browser completeness/accessibility compliance is unverified.
- Production users, adoption, revenue/profit improvement, time savings, uptime, latency, capacity, backups, and deployment environment are unverified. No business outcome is asserted.

### Follow-up facts

Follow-up facts useful for future employment records: employment arrangement, location, phase-specific contribution timing if needed, actual hosting and operational refresh requirements, users/adoption with measured outcomes if available, intended margin/production-ease definitions, and resolution of the external ranking discrepancy.
