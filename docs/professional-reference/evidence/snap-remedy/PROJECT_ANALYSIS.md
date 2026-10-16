# MMS / SnapRemedy SKU Profitability Ranker

> Transfer source: `Resume_Builder/evidence/snap-remedy/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

## Overview

This project is a Django and React application for comparing finished-goods SKUs using locally synchronized Spire ERP inventory, sales, customer, pricing, and production data. It implements a configurable, deterministic ranking formula; optional Groq-generated explanations of ranking results; a CSV workflow for maintaining manual scoring factors; and a separate FRED commodity-price and producer-price-index viewer. The visible application title is **SKU Profitability Ranker**. The MMS / SnapRemedy identification is documented in `context_mms_sku_tool/context.md`, “Project Summary.”

The apparent problem addressed is providing a repeatable way to inspect and prioritize products using selected business signals rather than inspecting separate ERP records manually. That purpose is documented in `sku_ranking_probability_model.md`; actual business adoption, decision quality, revenue effects, and customer impact are not established. Despite the document's “probability model” title, the implementation is a weighted rules-based score, not a trained predictive model or calibrated probability.

Evidence anchors: `mms-sku-tool/spire_data/scoring.py`, `mms-sku-tool/spire_data/services.py`, `mms-sku-tool/spire_data/explanations.py`, `mms-sku-tool/frontend/src/pages/HomePage.jsx`, and `mms-sku-tool/external_data/services.py`.

### Investigation basis and evidence labels

This record describes the workspace inspected on **2026-10-07**. Paths are relative to the workspace root. Unless otherwise specified, application paths refer to `mms-sku-tool/`; the second copy is described separately.

- **Verified implementation** means directly inspected source, configuration, migrations, tests, or current filesystem state.
- **Verified local observation** means a read-only query of the supplied SQLite files, static source measurement, or the isolated checks described under Testing / Quality. Local database observations are snapshots, not production metrics.
- **Documented historical observation** means an existing project document reports an earlier run or investigation. Where persisted logs corroborate the report, that is stated. Documentation is not proof of every action or outcome it describes.
- **Interpretation / limitation** identifies a conclusion drawn from the implementation rather than an independently measured property.

The investigation did not call Spire, FRED, or Groq, install dependencies, run a production build, alter existing databases, modify existing source, or inspect Git authorship. SQLite files were opened through `mode=ro&immutable=1`, with read-only queries. Secrets are not reproduced. Framework files, installed packages, bytecode, and generated output are distinguished from original project implementation.

## Repository Scope

The workspace is a project collection, rather than a single Git repository rooted at `Snap Remedy/`:

| Location | Contents and relationship |
| --- | --- |
| `mms-sku-tool/` | Primary application checkout; Django project, two domain apps, React frontend, requirements, migrations, tests, and its own Git metadata. |
| `mms-temp/` | Second checkout with the same backend, migrations, tests, frontend package files, and nearly all frontend source; separate SQLite database and Python environment. Context documents identify it as a fresh-checkout verification environment. |
| `context_mms_sku_tool/` | Five Markdown files covering handoff context, tasks, sync implementation planning, and operational/live-validation records. |
| `SCORING_API_ENDPOINT_GUIDE.md` | Detailed request, response, filter, validation, explanation, and usage documentation. |
| `sku_ranking_probability_model.md` | Formula, factor definitions, worked examples, design reasoning, limitations, and future directions. |
| `.env` | Local integration configuration; only variable names were inventoried. It is outside both application checkout roots. |
| `mms-sku-tool/db.sqlite3`, `mms-temp/db.sqlite3` | Separate local data snapshots, excluded by the application Git ignore rules. Queried without modifying them. |
| `.venv/`, `venv/`, `frontend/node_modules/`, `__pycache__/` | Installed dependencies and runtime artifacts where present; not original application functionality. |

File-content comparison found only **two differing application source files** between the checkouts: `frontend/src/components/CommoditiesGraph.jsx` and `frontend/src/pages/CommoditiesPage.jsx`. Both are existing uncommitted edits in the primary checkout. The databases also differ. This is not a second independently implemented product and counts below do not double-count the duplicate source.

The primary checkout contains **36 project Python files**, including migrations, tests, framework scaffolding, and empty package initializers; **14 JavaScript/JSX files under `frontend/src/`**; four CSS files; eight numbered custom-app migration files; and four backend test modules. These counts exclude installed dependencies and generated bytecode. The comprehensive file and declaration inventories later in this record preserve smaller files and exact model/test names.

## Contributions

Per the developer's ownership statement, original project implementation is treated as their work; Git was not used to infer ownership. The evidence supports the following inventory:

1. **ERP integration and local data modeling:** nine dataset-specific Spire fetch/upsert adapters; explicit inventory, customer, sales, purchasing, territory, price-level, sell-price, and bill-of-materials models; raw-source retention; decimal/date conversion; dependency-aware relationship linking; and stable-key upserts. Evidence: `spire_data/services.py`, `spire_data/models.py`, migrations.
2. **Reusable synchronization architecture:** frozen `SpireDatasetSyncSpec` objects separating fetch/mapping from shared orchestration, bounded legacy sync, full-data pagination, retry classification, resumable checkpoints, chunk transactions, heartbeats, conflict checks, stale-log cleanup, and staff recovery/status APIs. Evidence: `spire_data/services.py`, `spire_data/views.py`, `spire_data/test_full_sync.py`.
3. **Deterministic SKU scoring:** local ORM aggregation, inventory eligibility, sales-scoped versus inventory/manual filters, payload normalization, date aliases, customer-tier weighting, margin buckets, peer-relative volume percentiles, optional-factor completeness, stable tie ordering, and detailed response metrics. Evidence: `spire_data/scoring.py`, `spire_data/tests.py`.
4. **Explanation integration:** structured Groq requests, prompt/schema design, normalized fallback content, context hashing, persistent explanation cache, refresh bypass, upfront top-N and lazy single-SKU flows, and per-SKU provider-error payloads. Evidence: `spire_data/explanations.py`, ranking/explanation views and tests.
5. **Inventory pricing correction and presentation:** normalized sell-price records with unit-of-measure and price-level metadata, seven visible business price groupings, SKU/territory filtering, and frontend price retrieval/display. The older twenty-column price matrix remains as a legacy schema artifact. Evidence: migrations `0004`/`0006`, current services/views, `HomePage.jsx`; historical transition is documented in context/tasks.
6. **Manual factor maintenance:** CSV template, strict server-side validation, duplicate/unknown-SKU reporting, no-write preview, create/update/unchanged comparisons, stateless revalidation at confirmation, and atomic writes; corresponding upload/status/error UI. Evidence: `manual_input_imports.py`, `import_views.py`, `test_imports.py`, `ManualInputsImportPage.jsx`.
7. **Commodity integration and visualization:** curated FRED series mappings, metadata and observation persistence, index-base extraction, missing-value handling, read APIs, year navigation, dollar/index tables, and Chart.js configuration. Evidence: `external_data/`, commodity frontend modules.
8. **Frontend application structure:** React routes under `/sku-profit/`, reusable filter and scoring controls, API wrappers, loading/empty/error states, expandable ranking details, structured explanations, navigation, and custom styling. Evidence: `frontend/src/`.
9. **Tests and validation work:** 185 backend test methods covering domain behavior, mapping, auth, API validation, ranking, imports, retries, resumability, and commodity reads; lint configuration; documented live sync, fresh-checkout, data-comparison, and discrepancy investigations. Evidence: four test modules and context documents. Distinguish current executable tests from historical manual reports.
10. **Technical and operational documentation:** full scoring and API guides, formula examples, sync design plan, validation tables and timings, operator recovery guidance, known limitations, and task handoffs. Evidence: seven pre-existing workspace Markdown documents, plus the frontend's template README.

### Framework, vendor, and generated boundaries

Django supplies HTTP routing/decorators, ORM/database adapters, migrations infrastructure, authentication/session machinery, password hashing/validators, CSRF middleware, admin pages, and test infrastructure. The project's contribution is its configuration, schema, mapping, policies, and application logic using those facilities. `admin.py` in both apps is a placeholder with no custom registrations; a custom domain admin console is not implemented.

React supplies rendering/state/effects; React Router supplies browser routing; Chart.js supplies chart rendering; Vite and its React plugin supply frontend development/build machinery; ESLint and plugins supply static rules; Requests supplies HTTP transport; python-dotenv supplies environment-file loading. The project integrates/configures these, rather than implementing their internals. Font Awesome icons come from a CDN stylesheet. The frontend README is recognizably React/Vite template documentation. Django entrypoints and much of settings scaffolding are generated boilerplate. Migration headers identify generated files in several cases; their project-specific schema changes and the `group_no` data backfill remain relevant implementation evidence. Lockfiles and installed distributions are dependency artifacts, not original library development.

## Architecture

```text
Spire ERP HTTP API
  -> dataset adapters -> bounded or full-sync runner
  -> local Django models + DataSyncLog + FullSyncCheckpoint
  -> local ORM aggregation -> deterministic ranking API
  -> React ranking table / prices / detail panel

CSV upload -> validation -> preview
           -> revalidation + atomic confirm -> ManualInput -> ranking

Ranking context -> Groq chat completions -> validated explanation
                -> SkuRankingExplanation cache -> React detail panel

FRED API -> series/observation sync -> local commodity tables
         -> year/series/observation APIs -> React tables + Chart.js
```

The backend is one Django project (`sku_tool`) with two custom apps (`spire_data`, `external_data`), sharing the configured database. It uses function-based views and `JsonResponse`; no Django REST Framework layer, serializer package, separate worker service, message broker, or task queue is present in the inspected project source/dependencies.

Synchronization is synchronous: the initiating Python call or HTTP request runs the orchestration and waits for completion. Status/recovery requests inspect persisted state, not worker-process liveness. There is no demonstrated scheduler or periodic sync service. Datasets and pages execute sequentially; full sync is designed to allow one active full run. Browser price requests use `Promise.all` and therefore introduce a separate client-side concurrency pattern.

Scoring reads local models and does not fetch Spire data. Optional explanation generation happens after ranking. FRED data is exposed in its own viewer and is **not an input to the current scoring formula**. Purchasing, normalized sell prices, and price levels are synchronized/readable but are not used as ranking factors; BOM values are returned as context metrics rather than scored production-cost calculations. Evidence: imports and data assembly in `scoring.py`, URL wiring, frontend API calls.

The local backend defaults to SQLite. The frontend development server proxies `/api` to `http://localhost:8000`, while its build base and browser-router basename are `/sku-profit/`. There is no Django route that serves the React application in `sku_tool/urls.py`; production static serving and browser-route fallback require infrastructure not established here.

## Technologies

### Languages

- Python for backend, synchronization, scoring, migrations, and tests.
- JavaScript with JSX for the React UI; CSS for styling; HTML for the entry page.
- SQL through Django ORM and the SQLite database schema; JSON for API bodies/raw data/cache context; CSV for manual inputs; Markdown for documentation.
- No TypeScript application source was found. React type packages are development dependencies, not evidence of a TypeScript implementation.

### Frameworks

- Django **4.2**, exactly pinned in `requirements.txt`. Settings still contain the generated Django 3.2.25 header; that header is not the dependency version.
- React and React DOM: manifest ranges `^19.2.6`, lockfile versions **19.2.7**.
- React Router DOM **7.16.0** in the lockfile; manifest range `^7.16.0`.

### Databases

- SQLite is configured and two populated SQLite database files exist.
- `psycopg2-binary==2.9.12` is declared, but no active PostgreSQL configuration or PostgreSQL deployment was found. It is a declared adapter dependency, not evidence of PostgreSQL use.

### Infrastructure / DevOps

- Vite: manifest `^8.0.12`, lockfile **8.0.16**; React plugin manifest `^6.0.1`, lockfile **6.0.2**.
- npm scripts for `dev`, `build`, `lint`, and `preview`; npm lockfile format **3**.
- WSGI and ASGI entrypoint modules from Django scaffolding; no committed process-server invocation or production topology.
- Git checkouts, Python virtual environments, local environment variables, optional `sku_tool.local_settings` override, and development API proxying.

### Libraries / Tools

- Requests **2.34.2**, python-dotenv **1.2.2**, and Python standard-library `decimal`, `datetime`, `calendar`, `csv`, `hashlib`, `json`, `dataclasses`, and logging.
- Chart.js **4.5.1**.
- ESLint manifest `^10.3.0`, lockfile **10.4.1**, with JavaScript recommended, React Hooks, and React Refresh rule configurations.
- Font Awesome **6.4.0**, loaded from cdnjs in `frontend/index.html`.
- Other pinned Python requirements: asgiref **3.11.1**, certifi **2026.5.20**, charset-normalizer **3.4.7**, idna **3.18**, sqlparse **0.5.5**, typing_extensions **4.15.0**, urllib3 **2.7.0**. These support the dependency stack; their presence is not a separate custom integration.

### Protocols / Standards

HTTP JSON APIs; Spire HTTP Basic credentials; Groq bearer authorization and an OpenAI-compatible chat-completions request format; FRED API-key query parameters; browser cookies/session authentication and CSRF-token headers on the lazy explanation request; multipart form-data CSV upload; UTF-8 with optional BOM; ISO date strings; JSON Schema structured-output request; SHA-256 context hashes. OpenAI-compatible request structure and the Groq model's name do not establish a direct OpenAI API integration.

Evidence for versions: `requirements.txt`, `frontend/package.json`, `frontend/package-lock.json`. Lockfile versions describe resolution, not proof of deployment versions.

## Features

### Ranking and source-data inspection

- Rank active (`status=0`), warehouse `00`, group `FG` inventory. This is narrower than synchronization's eleven allowed product groups.
- Filter by SKU(s), sales territories, customer tier(s), rolling month window or explicit date boundaries, sentimental/seasonal/fragile flags, and exclusivity.
- Choose supported factors and positive weights; inspect raw and normalized factors, missing factors, source metrics, completeness, ranks, and percentages.
- Obtain paginated inventory, prices, customers, sales, purchasing, BOM, manual-input, and sync-log records through staff endpoints.
- Display prices in seven business categories, including aggregation of six USA price levels.
- Generate explanations upfront for top-ranked rows or on demand for a selected row, reusing persistent cached results when context matches.

### Data maintenance and operations

- Run a selected Spire dataset or bounded sequence, optionally starting at an offset.
- Run all nine datasets to exhaustion, persist progress, resume failed/interrupted pages, explicitly start fresh, inspect status, and mark an interrupted run recoverable.
- Upload manual-factor CSV, preview changes, see validation errors and action counts, then confirm all-or-nothing writes.
- Fetch fifteen FRED series and their observations into local tables; browse monthly commodity values by year/type and selected chart series.

These are implementation-backed features; the details, restrictions, and known mismatches below are part of their actual scope.

## Backend / APIs

### Endpoint inventory

`sku_tool/urls.py` registers **31 custom API route patterns**, plus the framework `admin/` include. A parameterized path counts as one pattern; methods do not multiply counts, and Django admin's internal URLs are excluded. There are **20 Spire/ranking/import API patterns** and **11 external-data API patterns**.

All API patterns below have active `api_staff_required` protection except the three import routes, whose decorators are commented out. Method decorators are active. `api_staff_required` returns JSON 401 for an unauthenticated request and JSON 403 for an authenticated non-staff user; middleware can reject requests first, particularly for CSRF.

| Method | Route | View / behavior |
| --- | --- | --- |
| POST | `/api/spire/sync/` | `sync_spire_data`: select dataset or bounded `all`; `limit`, `max_pages`, `start`. |
| POST | `/api/spire/sync-all/full/` | `sync_spire_full_data`: full nine-dataset sync; `batch_size`, `resume`. |
| GET | `/api/spire/sync-all/status/` | `get_spire_full_sync_status`: checkpoint, stale indicators, active/latest logs, recovery advisory. |
| POST | `/api/spire/sync-all/recover/` | `recover_spire_full_sync`: requires literal JSON `confirm_interrupted: true`. |
| GET | `/api/territories/` | `get_territory_data`: visible territory options and label overrides. |
| GET | `/api/inventory-items/` | `get_inventory_items`: explicit inventory fields. |
| GET | `/api/inventory-price-levels/` | `get_inventory_price_levels`: price-level metadata. |
| GET | `/api/inventory-sell-prices/` | `get_inventory_sell_prices`: visible normalized prices; optional `sku`, `territory`. |
| GET | `/api/customers/` | `get_customers`: customer number, name, tier-source `user_def2`, timestamps. |
| GET | `/api/sales-history/` | `get_sales_history_items`: invoice/line identity, SKU, joined customer fields, dates, quantities, financial fields. |
| GET | `/api/purchasing-history/` | `get_purchasing_history_items`: purchase/line identity, SKU, quantities, date, vendor, price. |
| GET | `/api/bill-of-materials-templates/` | `get_bill_of_materials_templates`: template/parent-SKU metadata. |
| GET | `/api/bill-of-materials-items/` | `get_bill_of_materials_items`: component quantities, labor minutes, joined template identifiers. |
| GET | `/api/manual-inputs/` | `get_manual_inputs`: five manual factors joined to inventory. |
| GET | `/api/imports/manual-inputs/template/` | `manual_inputs_template`: CSV header-only download; currently ungated. |
| POST | `/api/imports/manual-inputs/preview/` | `preview_manual_inputs_import`: validate multipart `file`, return actions; currently ungated and CSRF exempt. |
| POST | `/api/imports/manual-inputs/confirm/` | `confirm_manual_inputs_import`: revalidate and save; currently ungated and CSRF exempt. |
| GET | `/api/sync-logs/` | `get_sync_logs`: paginated Spire sync logs. |
| POST | `/api/sku-rankings/` | `get_sku_rankings`: local scoring and optional explanations; staff protected, CSRF exempt. |
| POST | `/api/sku-ranking-explanation/` | `get_sku_ranking_explanation`: explain supplied ranking row without recomputation; CSRF protected. |
| POST | `/api/external/sync/` | `sync_external_api_data`: form `entity`, fixed limit 1000, FRED sync. |
| GET | `/api/series/dollar/` | `get_commodities_series_dollar_list`: all dollar-series metadata. |
| GET | `/api/series/dollar/<str:series_id>/` | `get_commodities_series_dollar_item`: one series or 404. |
| GET | `/api/series/index/` | `get_commodities_series_index_list`: all index-series metadata. |
| GET | `/api/series/index/<str:series_id>/` | `get_commodities_series_index_item`: one index series or 404. |
| GET | `/api/observations/dollar/` | Dollar observations, optional query `series_id`. |
| GET | `/api/observations/dollar/<str:series_id>/` | Date-ordered observations; 404 when no observations exist. |
| GET | `/api/observations/index/` | Index observations, optional query `series_id`. |
| GET | `/api/observations/index/<str:series_id>/` | Date-ordered observations; 404 when no observations exist. |
| GET | `/api/commodities/dollar/<int:year>/` | All dollar series with selected-year month/date/value arrays, display names and units. |
| GET | `/api/commodities/index/<int:year>/` | All index series with selected-year month/date/value arrays and base dates. |

The shared Spire list helper orders by database `id`, defaults to 100 rows, caps `limit` at 500, accepts nonnegative `start`, fetches `limit+1`, and returns `start`, `limit`, `count`, `has_more`, and an endpoint-specific record key. It avoids a full total-count query. Consequently sync-log API ordering is ascending ID, despite the model's default newest-first ordering. Raw payload columns are omitted from these explicit field lists. Commodity APIs use unpaginated lists instead.

Malformed JSON and recognized input errors generally produce 400; method decorators produce 405; sync conflicts produce 409; Spire/ranking unexpected failures produce 502 with server-side exception logging. Full-sync known errors can include checkpoint `failed_dataset` and `failed_start`. External sync instead returns raw exception text with 500, and silently selects `sync_all` for an unknown entity. It reads `request.POST`, unlike the Spire JSON/form helper.

### Territory and sell-price policy

`get_territory_data` excludes codes `ADM`, `03`, `06`, `07`, `08`, and `12`. Label overrides are declared for `03` (Retail In Store), `04` (Direct To Customer), and `07` (Administration); the `03`/`07` overrides are unreachable under the current exclusion list.

Sell-price territory categories are a separate explicit mapping; they must not be confused with sales `territory_code` values:

| Display category | Price-level code(s) | Description match(es) |
| --- | --- | --- |
| Corporate | `01` | Corporate |
| Wholesale | `02` | Wholesale |
| Direct To Customer | `03` | Website |
| Dropship Sales | `04` | Dropship |
| Show Sales | `05` | Discount |
| Distribution | `06` | Distribution |
| USA Sales | `10`–`15` | US Wholesale, US Dist East, US Dist West, US Dropship, US Discount, US Dist FOB |

The read endpoint always restricts results to these groups by a code-or-description `Q` expression. An optional single `territory` value accepts a configured display label, code, or description; lookup input is trimmed and case-normalized. Unknown values return 400 listing valid choices. No multi-value or comma-separated contract is implemented. Evidence: constants and helpers in `spire_data/views.py`, `TableDataEndpointTests`.

### Ranking data assembly and semantics

`build_sku_metric_rows` validates filters even for direct service callers. It aggregates sales at SKU grain using `Sum` for units, revenue, average-margin and current-margin totals; `Avg` for unit price; distinct `Count` for customers and territories; and `Max(invoice_date)` for latest sale. These are direct source-field aggregations, not a newly validated accounting model: average unit price is not quantity-weighted, margin totals are not independently recalculated, and latest-sale output has no order-date fallback.

Territory/customer/date filters restrict sales **before** aggregation. Explicit start/end bounds override the rolling window if either is supplied. Invoice dates take priority; order dates are used only when the invoice date is null. Month subtraction clamps the day to the target month's length. Windows are `1`, `6`, `12`, or `all`. A sales-scoped filter excludes inventory without matching sales; SKU-only/all-time selection can retain an otherwise eligible item with no sales and zero volume.

The assembly also aggregates BOM component count, summed component quantities, and summed minute-unit quantities by parent SKU. It reads optional one-to-one manual inputs and inventory costs/margin fields. Inventory group comes from the explicit `group_no` column, not `raw_data`. BOM component quantities are summed across rows without unit harmonization; the result is contextual, not a demonstrated universal physical quantity.

Customer value groups matching sales by SKU and customer tier. BRONZE/SILVER/GOLD/PLATINUM map to 1/2/3/4. Unknown labels are excluded. Positive aggregate revenue is the preferred denominator for the weighted tier value; otherwise positive aggregate units are used; otherwise the accumulator yields zero. This is an aggregate fallback, not per-row substitution. Highest recognized tier is also returned. Tier filter input is uppercased, and query matching uses stored `user_def2` values.

| Factor | Default weight | Raw value and normalization |
| --- | ---: | --- |
| `margin_pct` (`margin` alias) | 4 | Missing or ≤20% maps to -1; >20–40 to 1; >40–50 to 2; >50–60 to 3; >60–70 to 4; >70–80 to 5; >80 to 6. Normalize over [-1,6]. |
| `volume` | 4 | Raw net `total_units_sold`; positive quantities ranked among positive peers using average zero-based tie position divided by `n-1`; nonpositive quantities score 0; one positive SKU scores 1. |
| `customer_value` | 2 | Weighted recognized tier signal, clamped/normalized over [1,4]; absent recognized-tier data is unavailable. |
| `sentimental` | 1 | True → -1, false → 0; normalize [-1,0]. |
| `exclusive` | 1 | Customer-exclusive -2, territory-exclusive -1, nonexclusive 0; normalize [-2,0]. |
| `production_ease` | 1 | Stored 0 or 1; normalize [0,1]. Model labels are Non-Cold Storage / Cold Storage. It is not derived from BOM labor time. |
| `seasonal` | 1 | True → 0, false → 3; normalize [0,3]. |
| `fragility` | 1 | True → -2, false → 0; normalize [-2,0]. |

The fixed-range helper clamps values to factor bounds. A missing `ManualInput` row makes its five factors unavailable, not false/zero. Missing margin is treated differently: it receives the lowest bucket and remains available. This distinction matters because both supplied databases currently have zero manual-input rows.

For each SKU:

```text
score = sum(weight × normalized factor for available enabled factors)
        / sum(weight for available enabled factors)

completeness = available requested weight / total requested weight
```

An all-unavailable result scores zero; completeness is reported separately and does not penalize the final score. Normalized/raw factor values and score are rounded to four decimal places; percentages to two; Decimal source metrics to five; returned weights to two. Scores are formatted before sorting, so ties at four decimals use ascending SKU. The entire filtered peer set is scored before the limit is applied. Changing limit alone does not change peer percentiles; changing filters can. Ranking defaults to 100 rows and rejects values above 500.

Payload behavior worth preserving:

- Factors can be explicit, or inferred from weight keys. An empty request does not automatically enable every factor.
- Omitted/empty weights use defaults for enabled factors; a nonempty custom weight mapping must supply every enabled factor.
- `margin` canonicalizes to `margin_pct`; enabled-factor aliases are deduplicated.
- `territory` is rejected as a factor; `margin_dollars` is explicitly deferred; other unsupported factors, including `cogs_per_minute`, are rejected.
- `filters.customer_value` is rejected as ambiguous; use customer-tier filters.
- Unknown filter keys are ignored rather than rejected, so misspellings can broaden selection.
- Date aliases are `start_date`/`date_from`/`from` and `end_date`/`date_to`/`to`, inside `filters`, with first-present precedence.
- Boolean filter strings accept true/false, 1/0, yes/no. Contradictory exclusivity combinations are rejected; satisfiable redundant combinations use AND semantics.
- Although the view docstring says scalar integer exclusivity levels are accepted, `_validate_exclusivity_levels` delegates to a string-or-list validator; an integer inside a list works, while a bare numeric scalar is rejected. Source behavior takes precedence over that wording.
- Numeric conversion relies on `int()`/`Decimal()` and positivity checks; not every JSON numeric edge case is strictly typed or explicitly checked for finiteness.

Evidence: `scoring.py` functions, `SkuMetricDataAssemblyTests`, `ScoringHelperTests`, `PercentileNormalizationTests`, API guide.

## Frontend

### Routing and state

`App.jsx` has three React Router routes under basename `/sku-profit/`: `/` (ranking), `/commodities`, and `/manual-inputs/import`. `main.jsx` mounts with `createRoot`, `StrictMode`, and global CSS. State is managed with component `useState`, `useEffect`, `useMemo`, and `useRef`; no global store library is configured. `Filters` and `Commodities` are hook-using service functions, though their names do not follow the conventional `use...` naming pattern.

### Ranking page

`HomePage.jsx` loads territory options, renders customer-tier and territory multi-checkbox controls, explicit date inputs with an All Time toggle, and a result-limit slider. The UI defaults to all time and ten rows, with a slider range of 1–50. Seven factor cards expose enable toggles and weight sliders from 1–10, defaulting to 5 and disabled. The backend's eighth factor, `customer_value`, is available by API but has no enable card in the current UI; customer tier is still a frontend filter.

`buildRankingPayload` maps UI state to backend aliases, arrays, numeric weights, dates, and limit. No factors selected produces local empty results without an API call. Loading, first-use, no-match, and generic error states are distinct; the ranking error is cleared after three seconds. Changing filters does not automatically refresh existing results; the user must generate again.

After ranking, `loadPricesForRanking` clears the price map and issues one request per ranked SKU using `Promise.all`. Each failed price request becomes an empty list. Codes are zero-padded; values are formatted to two decimals, deduplicated, and joined with ` / ` within each category. The UI displays the score multiplied by ten, rather than the API's 0–1 score or percentage. The price UI does not label each currency/UOM, and it fetches only the default first price page; this is not a comprehensive multi-currency normalization or pagination client.

Rows expand/collapse one SKU at a time. “Generate Description” sends the complete prior ranking response and selected SKU to the lazy explanation endpoint. `createReadableDescription` combines summary/rank reason and displays selected margin/quantity metrics, missing-data notes, positive/negative drivers, and review actions. Empty sections are suppressed. `loadDescription` lacks try/catch/finally; rejected requests can leave its loading flag set. No cancellation or request-identity guard handles rapid row changes. The formatter uses `Number(value)` for metrics, so null can render numerically as zero rather than N/A. These are verified implementation limitations, not repaired during this investigation.

### Manual input page

`ManualInputsImportPage.jsx` provides a template download via Blob/object URL, CSV picker, local BOM/header/header-only checks, server preview, action totals, row/field error table, confirm button, and success counts. Changing the selected file clears prior preview/result/error state. Confirmation is enabled only after preview rows exist in this UI, but the backend intentionally permits direct confirmation with full revalidation. The preview API includes current and incoming values; this page renders incoming values and action, not a full side-by-side diff.

`api.js` centralizes this workflow's network errors and JSON/non-JSON HTTP error conversion, with separate authentication, authorization, invalid-response, and network error types. The frontend's local header check is a simple comma split with whitespace trimming, not a full CSV parser; server `csv.DictReader` is authoritative. Valid quoted headers may therefore behave differently between local and backend parsing. The UI's auth guidance describes the intended staff workflow even though import view staff checks are currently disabled.

### Commodity page and components

`Commodities.js` tracks selected year/type and refetches on either change. Its bounds are hard-coded **2000–2026**, with 2026 initial selection. Failures are logged to the console without a visible error/reset flow. The page provides dollar/index selection, year buttons, a FRED source link, one table per returned series, a selectable chart, and explanatory text about dollar versus index values.

`CommodityDollar` formats two-decimal prices and returns N/A for invalid numbers; Aluminum values are divided by **2204.62** to convert from per metric ton to per pound. `CommodityIndex` formats two-decimal index values and shows the base date. `CommoditiesGraph` registers Chart.js components, owns/destroys a chart instance through refs/effect cleanup, renders one selected series, cycles six colors, fills a smoothed line, formats tooltips, and pads min/max bounds by 25% of observed range. Aluminum conversion is repeated in chart data. Missing numeric points are excluded from bound calculation but not otherwise fully handled. Month labels are the first N fixed month abbreviations rather than derived from each observation date; gaps or all-missing/empty values can therefore require additional handling.

The primary checkout's uncommitted chart edit replaces a state-reset effect with a derived `selectedIndex` fallback and uses it consistently for data, colors, heading, buttons, and dependencies. Its page edit removes an unused `useEffect` import. The older variants remain in `mms-temp/`. Evidence: direct file comparison and existing working-tree diff.

### Reusable UI and styling

Five JSX files live under `src/components`: commodity dollar/index tables, commodity graph, dropdown/date/limit controls, and factor cards. `SummaryCard` is an additional local component inside the import page; five is a file count, not the total number of component functions. `InputTemplates.jsx` defines descriptions/icons and enable/weight controls for seven factors. The production-ease prose refers to effort/time, while backend scoring uses the manual cold-storage-coded value; those semantics are not fully reconciled.

Four stylesheets implement palette variables, global resets/base elements, filter cards/toggles/sliders, table/row states, descriptions, commodity chart/table layout, and import action/status panels. The import stylesheet has a 900px breakpoint. Commodity CSS includes unscoped `table`, `thead`, `th`, and `td` selectors, so styles are not isolated per component. Chart canvas has an image role and aria label; a comprehensive accessibility audit is not evidenced. No CSS framework is installed merely because the palette variable names resemble one.

## Database / Data Engineering

### Schema inventory and relationships

There are **19 custom model classes**: 14 in `spire_data/models.py` and five in `external_data/models.py`. This includes logs/cache/checkpoint and the inactive legacy price matrix, not nineteen independent business datasets. Django auth/session/admin/content-type models are additional framework models.

| Model | Identity, contents, and relationship |
| --- | --- |
| `InventoryItem` | Unique SKU; name, warehouse, status, explicit group, current/average costs and inventory margin fields; raw JSON and timestamps. |
| `Customer` | Unique customer number; name and `user_def2` tier source; raw JSON and timestamps. |
| `SalesHistoryItem` | Unique Spire ID and unique invoice/record pair; nullable Customer FK with SET_NULL; SKU, invoice/order dates, quantities, prices/costs/margins, territory, raw JSON. |
| `PurchasingHistoryItem` | Unique Spire ID and unique purchase-number/record pair; SKU, ordered/received quantities, unit price, order date, vendor fields, raw JSON. |
| `Territory` | Unique territory code; name, description, raw JSON. |
| `InventoryPriceLevel` | Unique Spire ID, code, and sell-price index; description, currency, main flag, raw JSON. |
| `InventorySellPriceMatrix` | Legacy unique Spire ID/SKU, nullable one-to-one InventoryItem SET_NULL, twenty nullable price columns, raw array/record JSON. No active sync/read use. |
| `InventorySellPrice` | Unique Spire ID; nullable InventoryItem FK SET_NULL; indexed SKU/price-level code, warehouse/group/status, UOM metadata, price-level metadata, costs, price/margin/markup/effective date, raw JSON. |
| `BillOfMaterialsTemplate` | Unique Spire ID/template number; parent SKU, warehouse, description, required quantity, expected yield, raw JSON. |
| `BillOfMaterialsItem` | Unique Spire ID; required template FK CASCADE; component SKU/name, quantity/unit, minute quantity, raw JSON. |
| `ManualInput` | Required one-to-one InventoryItem CASCADE; sentimental, exclusivity, production ease, seasonal, fragile values. |
| `DataSyncLog` | Entity/status, start/finish timestamps, fetched/saved/skipped counters, error text. |
| `FullSyncCheckpoint` | Unique operation; run status, current entity/offset, last completed offset, batch size, completed-entity list and per-dataset JSON summaries, error/timestamps. |
| `SkuRankingExplanation` | SKU, context hash, prompt/model, ranking-context/explanation/raw-response JSON; unique `(sku, request_hash, prompt_version, model)`. No InventoryItem FK. |
| `CommoditySeriesDollar` | Unique series ID; names, observation span, frequency, units, timestamps. |
| `CommoditySeriesIndex` | Unique series ID; names, observation span/frequency/base-index date string, timestamps. |
| `CommoditySeriesDollarObservation` | Required series FK CASCADE; date; nullable decimal value `(14,5)`; unique and indexed `(series,date)`. |
| `CommoditySeriesIndexObservation` | Required series FK CASCADE; date; nullable decimal value `(10,2)`; unique and indexed `(series,date)`. |
| `CommoditySyncLog` | Four entity choices, three statuses, counters, timestamps, error text. |

The final declaration appendix preserves every field type, precision, nullability, length, relation, and model Meta declaration. Important relational boundaries: sales SKU, purchasing SKU, template parent SKU, and BOM component SKU are string identifiers, not inventory foreign keys; territory and normalized price-level metadata likewise are not fully relationalized. No custom sales composite query indexes are declared beyond unique constraints and Django-generated relation indexes. Manual field choices are application/model metadata; no explicit database CHECK constraints for those enumerations are authored in these models.

### Migrations

| App / file | Implemented change |
| --- | --- |
| `spire_data/0001_initial.py` | Nine foundation models, customer/manual/template relationships, unique sales and purchase line constraints. |
| `spire_data/0003_skurankingexplanation.py` | Explanation model and cache uniqueness constraint; depends directly on `0001`. |
| `spire_data/0004_inventorypricelevel_alter_datasynclog_entity_and_more.py` | Price-level model, legacy price matrix, sync entity choices. |
| `spire_data/0005_inventoryitem_group_no.py` | Explicit inventory group field; forward backfill from dict `raw_data.groupNo`, reverse clearing to empty string. |
| `spire_data/0006_inventorysellprice.py` | Normalized sell-price model with SKU and price-level indexes. |
| `spire_data/0007_fullsynccheckpoint.py` | Durable full-sync progress model. |
| `spire_data/0008_alter_datasynclog_entity.py` | Adds full-sync entity choice. |
| `external_data/0001_initial.py` | Five commodity models, observation indexes, and series/date uniqueness. |

There is no `0002` source migration; `0003` explicitly depends on `0001`, so numbering alone does not establish a broken migration chain. Both supplied databases record all eight custom migrations as applied. The group backfill uses historical models through `apps.get_model`, preserves unexpected/non-dict raw-data safety, and saves only the new field per matching inventory row. No destructive removal of the legacy matrix is implemented.

### Spire transformation and synchronization

`spire_get` joins configured base/endpoint paths, sends Basic credentials and `Accept: application/json`, applies a **30-second Requests timeout**, raises HTTP errors, and decodes JSON. Settings overrides take precedence over environment variables for the three Spire credentials.

| Dataset | Upstream relative endpoint | Mapping/filter details |
| --- | --- | --- |
| inventory | `inventory/items/` | Server filter status 0, warehouse 00, group `$in` eleven allowed codes; local group check; upsert by `partNo`; nested pricing margins. |
| inventory_price_levels | `inventory/price_levels/` | Require ID/code; numeric code minus one becomes nonnegative `sell_price_index`; preserve currency/main/description. |
| inventory_sell_prices | `inventory/sell_prices/` | Dot-path filter warehouse 00/group FG/status 0; local FG check; upsert by ID, nested inventory/UOM/priceLevel fields. |
| customers | `customers/` | Require customer number; persist name/tier/raw payload. |
| territories | `territories/` | Code fallback `code`, `territoryCode`, then ID; convert to string. |
| sales_history | `sales/invoice_items/` | Warehouse 00 filter; require ID and part number; customer can be nested dict or bare identifier; distinct `invoiceDate` and `orderDate`; invoice territory. |
| purchasing_history | `purchasing/history_items/` | Warehouse 00 filter; require ID/part number; purchase number fallbacks across row/order; nested order date and vendor dict/string; `receivedToDateQty`. |
| bill_of_materials_templates | `production/templates/` | Warehouse 00 filter; require ID/template/parent part; required quantity and expected-yield percent. |
| bill_of_materials | `production/template_items/` | Warehouse 00 filter; require ID and resolvable template; component `unitQty`; populate labor minutes only when unit uppercases to `MINUTE`. |

Allowed inventory groups are `FG`, `CS`, `FC`, `MN`, `SP`, `CN`, `IN`, `AC`, `FA`, `LT`, and `LA`. An in-source comment records that Spire requires `$in` rather than a direct group array; the latter had produced HTTP 500. This is a documented API compatibility finding, not reproduced live here.

Decimal conversion strips commas/whitespace and returns null on recognized parse errors; dates use the first ten characters as ISO date; integer helper returns null for recognized invalid input. Zero decimal values are preserved. Inventory status uses its own `int()` expression rather than the helper. Upsert guards skip missing required identities or unresolved BOM templates. Missing customer/inventory relation matches are permitted where model FKs are nullable. All main adapters retain raw records for inspection, but active scoring uses promoted fields.

Sales/customer, price/inventory, and BOM/template adapters preload FK lookup dictionaries and perform a one-row lookup on a miss, caching newly found IDs. This avoids repeated relation lookups for known keys without preventing later-created local records from being linked. Persistence uses per-record `update_or_create`, not bulk ERP inserts. Successful upserts count as saved even if they update an existing record.

No deletion reconciliation, source change watermark, CDC stream, upstream snapshot token, or per-record rejection ledger is implemented. Thus a successful sync refreshes returned records but is not an exact mirror of upstream deletions. Offset-based resume assumes saved progress remains meaningful; manually deleting already-completed local records is not detected. The documents' broad “match current Spire state” wording must be read with those restrictions.

### CSV transformations and integrity

The exact six headers are `sku,is_sentimental,exclusivity_level,production_ease,is_seasonal,is_fragile`, including order. Files must have a `.csv` extension and be at most **2,097,152 bytes**. UTF-8 BOM is accepted through `utf-8-sig`. Header mismatch is checked before empty-data detection. Required cells reject blank and literal case-insensitive `NULL`; booleans accept true/false/yes/no/1/0; exclusivity permits -2/-1/0; production ease permits 0/1. SKU lookup is against any existing inventory item, not only ranking-eligible finished goods. Duplicate SKUs within an upload are errors. Error details include physical logical row numbering starting at 2, field, and message.

Preview uses existing manual values to classify create/update/unchanged without writes. Confirmation parses and validates again, rebuilds the preview, then executes writes in one `transaction.atomic()` block. Unchanged rows are not saved, preserving their timestamps. A write failure rolls back and returns `import_failed` with “No rows were saved.” No preview token, staged upload model, import-history table, or persisted CSV file is used. Validation/action determination occur before the write transaction, so this is not a locked snapshot across preview and confirmation. Unexpected extra cells are not explicitly rejected by the row validator; header strictness should not be described as complete CSV-shape validation.

## External Integrations

### Spire ERP

Nine dataset adapters described above form one external-system integration. Runtime config is `SPIRE_BASE_URL`, `SPIRE_USERNAME`, and `SPIRE_PASSWORD`. Documents record a live ERP endpoint and connectivity problems, but endpoint reachability, source production designation, and credential validity were not retested. Local retained records/logs provide direct evidence of substantial past synchronization.

### FRED

`FRED_get` uses `FRED_BASE_URL` and `FRED_API_KEY`, requesting `/fred/series` and `/fred/series/observations` with `file_type=json`. Metadata reads FRED's `seriess` array. Six dollar series and nine index series are hard-coded:

| Commodity | Dollar series | Index series |
| --- | --- | --- |
| Butter | `APU0000FS1101` | `WPU0232` |
| Chocolate | `APU0000702421` | `PCU3113513113517` |
| Wheat flour | `APU0000701111` | `WPU02120301` |
| Rice | `APU0000701312` | `PCU31121231121204` |
| Sugar | `APU0000715211` | `WPU0252` |
| Aluminum | `PALUMUSDM` | `PCU3313133131` |
| Plastic | — | `PCU325211325211` |
| Glass | — | `PCU3272132721` |
| Paperboard/cardboard | — | `WPU09141107` |

Metadata start dates are clamped to 2000-01-01 when earlier. Index-base dates are extracted from unit text with month/year or year-only regexes and stored as a string. Observation requests start at 2000-01-01, take a limit (API sync fixes it at 1000), and do not implement additional pagination. FRED `.` values become null. Observations use `bulk_create(ignore_conflicts=True)` under unique series/date constraints; reruns ignore existing observations rather than updating revised historical values. Series metadata uses `update_or_create`.

Four sequential sync phases load dollar metadata, index metadata, dollar observations, then index observations. Observation upsert functions receive one group per series; their sync-log counters therefore count **series groups**, not individual observation rows. The local observation counts must be queried separately. The backend stores raw aluminum source units/values; conversion happens in the frontend despite a service comment suggesting conversion during sync.

No explicit timeout, retries/backoff, checkpoint/resume, or full-run locking is implemented for FRED. The external sync conflict check is entity-specific; `all` does not get its own started log and unknown entities fall back to all. Empty metadata `seriess` results append an empty list, but the upsert expects a dictionary and calls `.get`; this error path can fail rather than count a skipped record. These details limit claims of robust external-data synchronization.

### Groq

`explanations.py` calls `${GROQ_BASE_URL}/chat/completions`; defaults are `https://api.groq.com/openai/v1`, model `openai/gpt-oss-20b`, 20-second timeout, temperature 0.2, and prompt version `v1`. The API key is sent in a bearer header. Optional configuration is `GROQ_EXPLANATION_MODEL` and `GROQ_EXPLANATION_TIMEOUT_SECONDS`.

The supplied context includes SKU/name, rank, score/completeness, available/missing factors, raw/normalized factors, source metrics, filters, weights, and enabled factors. The system prompt restricts explanations to supplied data and prohibits invented external facts. A strict JSON Schema request requires six named fields: summary, rank reason, positive drivers, negative drivers, missing-data notes, and recommended actions. This is application grounding/prompting, not a guarantee that generated statements are correct.

The backend verifies required keys/list shapes, requires string summary/rank reason, strips whitespace and non-string/empty list entries, and supplies fallback text for empty required strings/positive-driver/action arrays. The local validator does not fully enforce every JSON Schema condition, such as rejecting all additional keys. Successful records persist normalized explanation, input context, and raw response.

Cache identity uses SHA-256 of sorted compact JSON containing context, model, and prompt version, combined with SKU/model/version uniqueness in the database. Changes to rank, filters, metrics, weights, or model can change the key. Refresh bypasses cache lookup and updates the matching record. No cache expiry, eviction, provider retry, or request coalescing is implemented. Upfront explanation calls are sequential and limited by slicing returned results. Provider/network/parse failures become per-SKU `groq_error` payloads; cache/context/database failures are not all enclosed by that provider catch.

The lazy endpoint validates selected-row membership and required top-level fields but accepts client-provided ranking values without recomputing or signing them. It preserves display context rather than proving the client context is authentic. Historical docs report a successful live explanation using the default model and HTTP 400 with a prompt-guard model; those are earlier observations, not current provider tests.

### Presentation asset dependency

Font Awesome is loaded from cdnjs in `frontend/index.html`. This is an external browser asset dependency in addition to the **three business/data API integrations** above; it is not counted as a fourth backend API integration.

## Reliability / Failure Handling

### Full synchronization lifecycle

1. Validate batch size (default **5000**, accepted 1–**10000**).
2. Acquire/create the unique `spire_full_sync_all` checkpoint under a transaction; handle initial unique-creation `IntegrityError`; use `select_for_update` for state/log access.
3. Reject a fresh running full checkpoint. Mark a running checkpoint stale after **14,400 seconds** and interrupt it; clean abandoned full-run logs. Mark non-full started logs older than the same four-hour threshold failed; fresh individual logs still block startup.
4. Reset on first use, explicit `resume=False`, or a previously completed checkpoint. Otherwise retain completed entities and failed/interrupted offset. Create a full-sync log.
5. Process the nine datasets in dependency order, completing each before constructing the next. Store current entity/offset before fetching each page.
6. Retry timeouts, connection errors, HTTP 429/500/502/503/504 at the same offset for at most **three attempts total**, with **one- and two-second** waits. The constant is named `MAX_RETRIES`, but the loop implements three attempts, not three retries after the first attempt. Other HTTP errors fail immediately. There is no jitter or `Retry-After` handling.
7. Persist page records in **250-record chunks**, each under its own transaction. Heartbeat between committed chunks; save counters/next offset only after the full page succeeds.
8. Stop a dataset when the returned page is shorter than batch size, including an empty page following an exact full page. Advance by requested batch size, not returned row count. Mark completion in summary/list.
9. Mark checkpoint/log completed/success or failed with preserved failed offset. Full log totals sum committed-page summaries.

Chunk transactions intentionally mean a later chunk failure can leave earlier chunks committed. Because checkpoint offset remains on the failed page, resume replays it using stable-key upserts. This provides resumable replay, **not exactly-once processing or whole-page atomicity for pages larger than one chunk**. The test named “rolls back entire page” uses a two-row page inside one chunk; separate tests explicitly verify later-chunk persistence and idempotent replay. A failed log's counters can omit those partially committed chunks until a successful replay.

Heartbeat age indicates recent checkpoint writes, not proof that a process is alive. Recovery requires explicit confirmation, uses a transaction, refuses if non-full started logs or multiple full started logs exist, marks a running checkpoint interrupted and one full log failed, and retains progress. It can recover a fresh checkpoint; it does not require staleness and does not terminate a process. Operators must independently know the old process has stopped. `can_recover` is advisory.

### Concurrency boundaries

The source uses row-lock APIs and uniqueness plus best-effort log guards, but default SQLite does not implement PostgreSQL-style `SELECT FOR UPDATE` row locking. Single-entity legacy sync checks and log creation are not one fully serialized acquisition. There is no fencing token to stop a recovered worker from later writing state, and no distributed lock. Tests simulate state and transaction behavior; they do not establish cross-process race freedom. The locking limitation is supported by the configured backend and installed Django SQLite backend feature implementation, rather than credited as a custom mechanism.

### Other failure handling

- Individual sync runs share retry classification, create/finalize logs in `finally`, and retain successful writes before a later failure. They have no full checkpoint.
- Invalid list pagination, known ranking filter/weight errors, CSV errors, and explanation shape errors have explicit handling; some malformed non-object JSON bodies in sync views are not consistently guarded before `.get`.
- Spire/ranking views log exceptions with contextual parameters and generic outward messages on unexpected errors. Recovery/stale cleanup emit actor/log/state information through `logger.info`; no custom log sink, metrics backend, alerting, or retention policy is configured.
- FRED logs persist counters and raw exception messages. Raw provider error text and request URLs can contain configuration details; context explicitly records an earlier API-key URL exposure in a failed traceback. Values are not reproduced here.
- Frontend manual imports have structured failure guidance; other UI paths mostly use generic errors or console logging, with the description loading-state issue noted above.

## Security

Verified mechanisms include Django session/authentication middleware, the custom staff-only JSON decorator on **28 of 31 API patterns**, active CSRF middleware, default password validator configuration, security/clickjacking middleware, and method restrictions. The access model is authenticated staff versus non-staff, not a custom multi-role RBAC/permission system. Framework user/group/permission tables exist, but no domain role matrix or object-level permission enforcement was found.

The three import endpoints are currently unauthenticated at view level; preview and confirm are CSRF exempt. Ranking is staff-gated but CSRF exempt. Other POST routes retain CSRF protection; recovery has an explicit CSRF test. The lazy explanation client reads `csrftoken` from cookies and supplies `X-CSRFToken`. No custom login UI, token API, SSO, OAuth, or JWT implementation is present; import guidance points staff users to Django `/admin/` login.

Integration keys are environment-driven; `.gitignore` excludes `.env`, local overrides, SQLite files, environments, media/static output, and frontend build/dependency output. A local `.env` nevertheless exists at workspace level. `services.py` uses default dotenv search, whereas `explanations.py` explicitly attempts the application-root `.env`; documented shell use sources the parent `.env`. This is configuration behavior, not a secrets manager.

`settings.py` contains a literal development secret key, `DEBUG=True`, empty `ALLOWED_HOSTS`, a trusted CSRF origin of `http://localhost:5173`, and an optional `local_settings` import. No existing local override file was found. No production secret, TLS termination, cookie-hardening, rate-limiting, CSP, audit-log storage, backup encryption, or formal security review can be established. The CDN stylesheet has no integrity attribute. These findings describe current files rather than asserting exploitation or production exposure.

## Testing / Quality

### Automated test inventory

Static AST enumeration finds **185 `test_*` methods in 15 Django TestCase classes across four files**, counted once in the primary checkout. Runtime discovery also found 185 tests. Tests construct ORM fixtures in code and use Django Client/RequestFactory-style request patterns, mocks for Spire/Groq calls, patched failure paths, and assertions on JSON/database state. There are no external fixture data files required by these tests.

| File / class | Methods | Scope |
| --- | ---: | --- |
| `spire_data/tests.py`: DataPointCoverageTests | 1 | Modeled scoring data points. |
| SpireSyncMappingTests | 16 | Filters, precision, nested mapping, retries, dates, FK-map refresh, offsets, labor minutes. |
| ScoringHelperTests | 4 | Margin boundaries, clamping, missing manual fields, unavailable-factor score. |
| SkuMetricDataAssemblyTests | 48 | Aggregations, eligibility, aliases, filters, dates, validation, factors, completeness, ranking order/limit, explanation cache/error flows. |
| PercentileNormalizationTests | 4 | Empty/single/nonpositive/tied/distinct-volume behavior. |
| ViewHelperTests | 4 | Positive and nonnegative integer parsing. |
| SpireSyncViewTests | 31 | Auth, sync validation/conflicts/failures, full status/staleness, recovery and CSRF. |
| TerritoryDataViewTests | 2 | Visibility/labels and GET restriction. |
| SkuRankingViewTests | 12 | Auth, documented valid/invalid payloads, limits, rankings and explanation errors. |
| SkuRankingExplanationViewTests | 8 | Provided context, membership/fields, required-text fallback, cache and provider errors. |
| TableDataEndpointTests | 14 | All data endpoints, pagination, populated records, SKU and visible territory pricing filters. |
| `spire_data/test_full_sync.py`: FullSpireSyncServiceTests | 18 | Pages/end conditions, retry/failure, stale/conflict logic, checkpoint/resume, chunk transaction/heartbeat behavior, dependency ordering. |
| FullSpireSyncRealUsageTests | 2 | All real dataset adapters with mocked Spire payloads and duplicate-free rerun. “RealUsage” does not mean live network tests. |
| `spire_data/test_imports.py`: ManualInputImportTests | 12 | Template local bypass, file/header/row errors, no-write preview, upserts, unchanged rows, revalidation, rollback. |
| `external_data/tests.py`: CommodityAPITest | 9 | Series and observation list/detail/filter/404 responses using staff login. |

File totals are 144 + 20 + 12 + 9 = 185, across 15 classes. Subtests/loops and duplicated checkout methods are not extra test cases.

### Current investigation checks

The backend suite was run with the existing `.venv/bin/python -B`, overriding both default and test database names to `:memory:` before Django setup. Requests' underlying network method was patched to reject accidental live calls. This allows test database creation/migrations/fixture writes only in memory; the supplied SQLite files remain untouched. Python `-B` suppresses bytecode writes. The run completed successfully: **185 tests passed in 90.781 seconds**, with Django reporting no system-check issues. This duration is the isolated test run, not an application performance measurement.

All 36 project Python files parsed successfully via `ast.parse`. Frontend lint was invoked directly with existing Node 22.21.1 and `node_modules/eslint/bin/eslint.js .`, without `--fix` or cache flags; it completed with exit code 0 and no diagnostics. No production build was run because that would write output in the existing frontend directory. Historical `context.md`/`tasks.md` reports build, check, migration-drift, lint, and 185-test passes, as well as staff API smoke checks; those historical reports are distinct from current execution.

Coverage percentage, browser end-to-end automation, load testing, provider contract testing against current live APIs, and true multiprocess concurrency testing are not established. Commodity tests cover reads, not FRED sync behavior or every year endpoint. No frontend test runner/script, Python linter configuration, or CI workflow was found.

## Deployment / Infrastructure

The repository demonstrates a development/build arrangement, not a verified production deployment:

- Django settings default to local SQLite, UTC/timezone-aware handling, English locale, `STATIC_URL=/static/`, app templates plus a `BASE_DIR/templates` search location, standard middleware, and BigAutoField IDs.
- `manage.py`, `asgi.py`, and `wsgi.py` are framework entrypoints. Their existence does not demonstrate an ASGI server, worker fleet, or production WSGI service.
- Vite uses `/sku-profit/` as asset base and React router basename; `/api` development proxy points to localhost:8000 with `changeOrigin: true`, `secure: false`.
- npm scripts expose Vite dev/build/preview and ESLint. The lockfile records Vite's Node requirement `^20.19.0 || >=22.12.0` and ESLint's `^20.19.0 || ^22.13.0 || >=24`; context documents use Node 22.21.1 and record default Node 21.1.0 incompatibility.
- Optional local Django settings are ignored by Git, but no such file is present in these checkouts.
- Existing generated output is present only in the primary frontend's `dist/`: `index.html` (511 bytes), `assets/index-BEY1i1pq.js` (467,420 bytes), and `assets/index-DUq2zLA4.css` (18,815 bytes). These are observed artifact sizes, not compressed transfer sizes or performance measurements. Their existence demonstrates retained build output, not deployment or a verified match to the current uncommitted source. They were not rebuilt or modified.
- No Dockerfile, Compose file, Kubernetes/Terraform configuration, Nginx/Apache configuration, CI/CD YAML, deployment script, process supervisor definition, cloud resource definition, or scheduler was found in project-owned files.

No exact hosting provider, public URL, replica count, reverse-proxy timeout, domain/TLS setup, backup/restore procedure, release pipeline, or deployed version can be asserted. A subpath base is evidence of intended URL placement, not proof of hosting at that path.

## Performance / Scale

### Directly observed local datasets

Read-only `COUNT(*)` queries on **both** databases yielded identical counts for the following business tables. This investigation verifies counts, not a new full field-by-field parity comparison.

| Model / table suffix | Rows in each database |
| --- | ---: |
| InventoryItem / `inventoryitem` | 697 |
| InventoryPriceLevel / `inventorypricelevel` | 20 |
| InventorySellPrice / `inventorysellprice` | 926 |
| Customer / `customer` | 1,752 |
| Territory / `territory` | 13 |
| SalesHistoryItem / `saleshistoryitem` | 525,134 |
| PurchasingHistoryItem / `purchasinghistoryitem` | 9,057 |
| BillOfMaterialsTemplate / `billofmaterialstemplate` | 1,142 |
| BillOfMaterialsItem / `billofmaterialsitem` | 25,019 |
| ManualInput / `manualinput` | 0 |
| InventorySellPriceMatrix / `inventorysellpricematrix` | 0 |
| CommoditySeriesDollar | 6 |
| CommoditySeriesDollarObservation | 1,695 |
| CommoditySeriesIndex | 9 |
| CommoditySeriesIndexObservation | 2,593 |

The nine Spire business-dataset counts total **563,760 rows**. Each database has **265** inventory rows satisfying status 0 / warehouse 00 / FG. The sales invoice-date range is **2014-01-23 through 2026-05-20**; `MIN(order_date)` and `MAX(order_date)` are null in both. This is observed local historical coverage, not proof that all upstream history exists or data is fresh to the investigation date.

The main database contains 38 cached explanations, 15 Spire sync logs, five commodity logs, one checkpoint, one framework user, and seven framework sessions. The temp database contains one cached explanation, four Spire logs, four commodity logs, one checkpoint, one user, and two sessions. User/session counts are local artifacts and do **not** establish active production users or usage.

### Persisted sync runs and measurements

| Database / successful full-sync log | Recorded start and finish (UTC per project settings/docs) | Elapsed from timestamps | Fetched / saved / skipped |
| --- | --- | ---: | --- |
| main `DataSyncLog.id=12` | 2026-08-13 18:40:11.057901 → 19:04:42.287962 | 1471.230061 s (about 24m31s) | 567,030 / 563,760 / 3,270 |
| temp `DataSyncLog.id=2` | 2026-09-11 19:16:04.508946 → 19:36:49.752085 | 1245.243139 s (about 20m45s) | 567,030 / 563,760 / 3,270 |
| temp `DataSyncLog.id=4` | 2026-09-11 21:19:30.454106 → 21:45:21.760402 | 1551.306296 s (about 25m51s) | 567,030 / 563,760 / 3,270 |

These are end-to-end elapsed durations for particular local sync calls, not CPU time, an API response-time benchmark, or a before/after improvement. Records saved are accepted upsert operations, not necessarily newly inserted rows. The documents say the first two runs used resume true and the last explicitly used false; **the database log does not store the resume argument**, so that argument attribution is documentary.

Main log 10 also records a bounded rehearsal with 383 fetched/saved and zero skipped in 11.842493 seconds; context documents describe artificially forcing an empty page after two small real pages per dataset. It is not a complete load benchmark.

The current temp checkpoint corroborates the full-run per-dataset breakdown:

| Dataset | Fetched | Saved/upserted | Skipped | Last completed offset | Next offset |
| --- | ---: | ---: | ---: | ---: | ---: |
| inventory | 697 | 697 | 0 | 0 | 5000 |
| inventory_price_levels | 20 | 20 | 0 | 0 | 5000 |
| inventory_sell_prices | 926 | 926 | 0 | 0 | 5000 |
| customers | 1752 | 1752 | 0 | 0 | 5000 |
| territories | 13 | 13 | 0 | 0 | 5000 |
| sales_history | 528001 | 525134 | 2867 | 525000 | 530000 |
| purchasing_history | 9062 | 9057 | 5 | 5000 | 10000 |
| bill_of_materials_templates | 1142 | 1142 | 0 | 0 | 5000 |
| bill_of_materials | 25417 | 25019 | 398 | 25000 | 30000 |

Code identifies skip conditions, but logs do not retain a per-record reason breakdown; the exact reasons for all 3,270 skipped rows cannot be reconstructed solely from these counters.

### Current state versus historical completion

Main checkpoint: **failed**, entity `inventory`, start 0, batch size 5000, no completed entities, empty result summary. Its latest full-sync log (15) is failed with zero counters; older successful data remains. Main has no currently started sync logs. Temp checkpoint: **completed**, all nine entities listed, empty current entity, current start 30000, last completed start 25000, batch size 5000; no started logs. A historically completed run does not imply the latest main checkpoint is completed.

Current file sizes: main **1,144,934,400 bytes**, temp **1,144,729,600 bytes**. `context_mms_sku_tool/doc.md` records an earlier main size of 1,144,373,248 bytes after the August run. Those are different snapshots; no pre-run size or controlled storage-growth experiment exists.

### Implemented efficiency measures and limits

Preloaded FK dictionaries, database-side grouped aggregation, bounded ERP pages, 250-record transactions, `limit+1` list pagination, persistent explanation caching, and bulk FRED observation inserts are explicit implementation choices. No measured speedup is claimed. Scoring assembles all eligible filtered metric rows and sorts them in Python before limiting, and some aggregates read broader datasets before SKU filtering. Commodity year endpoints query observations per series. Browser prices create one request per result with no concurrency throttle. These are code-derived characteristics, not measured bottlenecks or capacity guarantees.

## Technical Challenges / Complexity

- **ERP identity and shape alignment:** flat identifiers coexist with nested or scalar customer/vendor values, nested sell-price/UOM objects, and dependency-linked BOM records. Dedicated adapters and FK-map refresh reconcile these shapes; tests cover representative cases. This is more involved than merely proxying JSON.
- **Resumption across partial persistence:** page-level progress and chunk-level commits must cooperate so failure does not skip uncommitted work. The checkpoint remains on the page, earlier chunks can persist, and stable-key upserts make replay practical. Tests distinguish within-chunk rollback from later-chunk recovery.
- **Liveness versus stale metadata:** logs/checkpoints can outlive a process. Separate status, staleness, cleanup, and explicit recovery logic make state inspectable, while leaving known race/liveness limitations rather than claiming a distributed job system.
- **Filter scope and scoring population:** sales filters affect aggregates and candidate inclusion; SKU/manual filters affect the comparison set; volume depends on that set. Alias normalization is applied twice through public paths, requiring idempotent normalization and tests.
- **Missing data versus low values:** unavailable manual/customer factors change the denominator and completeness; missing margin is intentionally/actually a low bucket. This affects interpretation and is explicitly tested/documented rather than concealed in a single score.
- **Separating deterministic calculation from generated explanation:** the Groq layer consumes ranking context without changing scores; context-sensitive caching and fallback validation reduce repeated provider use and malformed output, but do not guarantee factual text.
- **Preview/confirm integrity:** CSV validation must surface all useful row errors, distinguish unchanged updates, avoid preview writes, and roll back confirmation failures while accepting a stateless reupload.
- **Operational discrepancy investigation:** documents preserve comparisons between independently synchronized databases, direct sales aggregation, frontend payload checks, and remaining uncertainty about another environment's mismatching result. This is documented debugging work, not a verified diagnosis of that external environment.

Evidence is in the corresponding service/test functions and `context.md`'s September investigations. No difficulty, team scale, or productivity claims are inferred.

## Documentation / Operational Support

| Document | Preserved contribution / interpretation boundary |
| --- | --- |
| `SCORING_API_ENDPOINT_GUIDE.md` | Endpoint/auth, field contracts, all factors/filters, weights, examples, explanation flows, unsupported usage, unknown-filter caveat. Examples are demonstrations, not production records. |
| `sku_ranking_probability_model.md` | Source-to-factor mapping, bucket/range/percentile formulas, completeness, worked examples, non-ML rationale, limitations and proposed extensions. |
| `context_mms_sku_tool/README.md` | Handoff entrypoint and primary-project location. |
| `context_mms_sku_tool/context.md` | Current/historical branch and implementation state, operator distinctions between FRED/Spire sync, recovery/resume guidance, fresh-checkout investigation, live provider results, database comparisons, known defects. |
| `context_mms_sku_tool/tasks.md` | Completed backend/UI work, implementation details, historical verification, active and deferred work. |
| `context_mms_sku_tool/full_sync_all_implementation_plan.md` | Design decomposition, dependency order, endpoint/checkpoint proposal, retry/concurrency/test plan and batch-size rationale. Older status/follow-ups are superseded by later code/context; hypothetical 512,000-row arithmetic is not a measured workload. |
| `context_mms_sku_tool/doc.md` | August full-sync run timestamps, per-dataset counters, checkpoint/storage observations, and reported live validation. Persistent log 12 corroborates totals/duration. |
| `mms-sku-tool/frontend/README.md` | Vite template guidance, not a complete project onboarding/deployment runbook. |

Operational support is implemented through sync/status/recovery/list APIs and shell-callable services. No dedicated operator frontend, custom admin registration, management-command suite, or health-check endpoint is present. Documentation calls these potential follow-ups. The two `sync_all` functions are materially different: `external_data.services.sync_all()` updates FRED data, while `spire_data.services.sync_all()` is bounded ERP sync; `spire_data.services.sync_all_full()` is the full ERP refresh.

Historical debugging records include: Spire `$in` syntax, inventory group promotion, replacing matrix/territory-derived pricing with normalized price-level rows, retry/heartbeat refinements, stale individual logs blocking full startup, distinct invoice/order date mapping, frontend credentials/routing/time-filter fixes, import error presentation, unsuitable Groq model selection, Node toolchain incompatibility, and a failed explanation loading state. Current code/tests verify many resulting mechanisms, while exact chronology remains documentary.

For the reported territory-04 January–February 2026 ranking mismatch, this investigation independently queried both local databases: FG000258 has 9 matching invoice rows / 53 units, FG000696 has 21 / 41, and FG000259 has 9 / 34. Context reports those as the top three after invoking ranking and checking frontend payload generation. This investigation rechecked those three aggregate values, not another user's browser/database or the full ranking call. Context explicitly leaves the remote mismatch unresolved and notes that changing filters does not refresh old displayed results until regeneration.

## Quantifiable Evidence

| Metric | Value | Evidence / definition |
| --- | ---: | --- |
| Custom Django apps | 2 | `INSTALLED_APPS`: spire_data and external_data. |
| Custom model classes | 19 | AST enumeration of the two `models.py` files: 14 + 5. Includes operational/legacy models. |
| Numbered custom migrations | 8 | Seven Spire files, one external-data file; not highest suffix. |
| Custom API route patterns | 31 | `sku_tool/urls.py`; excludes admin include. |
| Staff-gated API patterns | 28 | Active decorators; three import routes bypass staff gating. |
| React pages / routes | 3 | `frontend/src/App.jsx`. |
| Reusable component files | 5 | `frontend/src/components/*.jsx`; excludes page-local SummaryCard. |
| Frontend source JS/JSX files | 14 | App/main/API + three services + three pages + five components. |
| CSS files | 4 | `frontend/src/styling/`. |
| Business/data API integrations | 3 | Spire, FRED, Groq; excludes icon CDN. |
| Spire datasets in full run | 9 | `FULL_SYNC_DATASET_BUILDERS`. |
| Inventory sync product groups | 11 | `INVENTORY_PRODUCT_GROUP_CODES`. |
| Backend scoring factors | 8 | `DEFAULT_WEIGHTS` / supported-factor set. |
| Frontend factor cards | 7 | `Filters.js`, `Scoring.js`, HomePage. |
| Recognized customer tier labels | 4 | BRONZE, SILVER, GOLD, PLATINUM; not user roles. |
| Visible sell-price business categories | 7 | `VISIBLE_INVENTORY_SELL_PRICE_TERRITORIES`. |
| FRED configured series | 15 | Six dollar and nine index mappings. |
| Backend test methods | 185 | Static named-method count and runtime discovery; 144 + 20 + 12 + 9. |
| Default full-sync page / maximum | 5,000 / 10,000 | Full-sync constants and validator. Maximum is locally enforced/documented, not newly verified with provider. |
| Full-sync write chunk | 250 records | `FULL_SYNC_HEARTBEAT_RECORD_INTERVAL`. |
| Fetch attempts / delay sequence | 3 / 1s, 2s | `_fetch_records_with_retries`, `_sleep_before_retry`. |
| Stale-run/log threshold | 14,400 s | Two service constants. |
| Spire request timeout | 30 s | `spire_get`. Requests timeout is not a total full-run deadline. |
| Groq default timeout | 20 s | `DEFAULT_TIMEOUT_SECONDS`. |
| Ranking/list default and maximum | 100 / 500 | Separate scoring/list constants. |
| CSV maximum bytes / columns | 2,097,152 / 6 | Import constants. |
| Local sales records in each DB | 525,134 | Read-only `COUNT(*)` on sales table. |
| Nine Spire business tables combined, each DB | 563,760 | Sum of the nine enumerated local table counts. |
| Eligible finished-goods rows, each DB | 265 | Inventory SQL filter status=0, warehouse='00', group_no='FG'. |
| Full-run fetched/saved/skipped | 567,030 / 563,760 / 3,270 | Main log 12, temp logs 2/4; temp checkpoint detail. |
| August measured elapsed run | 1471.230061 s | Main log 12 finish minus start; also validation document. |
| September explicit-fresh run elapsed | 1551.306296 s | Temp log 4 timestamps; resume=False attribution from context. |
| Local commodity observations, each DB | 4,288 | 1695 dollar + 2593 index rows. |
| Current main SQLite bytes | 1,144,934,400 | Filesystem stat during investigation. |
| Current temp SQLite bytes | 1,144,729,600 | Filesystem stat during investigation. |

## Evidence Map

### Claim: local deterministic ranking is separate from ERP synchronization and generated explanations

**Evidence:**

- `mms-sku-tool/spire_data/scoring.py` — `build_sku_metric_rows`, `_filtered_sales_queryset`, `rank_skus`, `build_ranking_response`.
- `mms-sku-tool/spire_data/explanations.py` — `_ranking_context`, `_explain_result`, `explain_provided_ranking_sku`.
- `mms-sku-tool/spire_data/tests.py` — SkuMetricDataAssemblyTests and SkuRankingExplanationViewTests.
- `sku_ranking_probability_model.md` — formula and explanation-layer sections.

### Claim: full synchronization supports checkpointed replay with short transactions and dependency ordering

**Evidence:**

- `mms-sku-tool/spire_data/services.py` — `FULL_SYNC_DATASET_BUILDERS`, `_run_full_dataset`, `_persist_full_sync_record_chunk`, `_heartbeat_checkpoint`, `_acquire_full_sync_checkpoint`, `sync_all_full`.
- `mms-sku-tool/spire_data/models.py` — FullSyncCheckpoint, DataSyncLog.
- `mms-sku-tool/spire_data/test_full_sync.py` — later-chunk failure/resume, heartbeat transaction depth, prerequisite-completion and prerequisite-failure tests.
- `mms-sku-tool/spire_data/migrations/0007_fullsynccheckpoint.py`.

### Claim: operations include stale-state detection and explicit recovery, with limits

**Evidence:**

- `spire_data/services.py` — `_checkpoint_is_stale_running`, `_auto_fail_stale_individual_sync_logs`, `get_full_sync_status`, `recover_full_sync`.
- `spire_data/views.py` — recovery confirmation and staff decorators.
- `spire_data/tests.py` — SpireSyncViewTests covering CSRF, stale state, unrelated active logs, multiple full logs, and no-op recovery.
- `context_mms_sku_tool/context.md` — instructions not to recover a still-running process.

### Claim: normalized pricing supersedes a retained legacy matrix in active paths

**Evidence:**

- `spire_data/models.py` — InventorySellPrice and InventorySellPriceMatrix coexist.
- `spire_data/migrations/0004_inventorypricelevel_alter_datasynclog_entity_and_more.py`, `0006_inventorysellprice.py`.
- `spire_data/services.py` — `build_inventory_sell_prices_sync_spec`.
- `spire_data/views.py` — sell-price visibility and territory filtering.
- `frontend/src/pages/HomePage.jsx` — seven category columns.
- `context_mms_sku_tool/tasks.md` — documented removed territory-price endpoint.

### Claim: manual imports are previewable and transactional, but presently bypass staff access

**Evidence:**

- `spire_data/manual_input_imports.py` — validators, `_build_preview`, `confirm_manual_input_import`.
- `spire_data/import_views.py` — commented staff decorators and active CSRF exemptions.
- `spire_data/test_imports.py` — unauthenticated template test, no-write preview, revalidation and rollback tests.
- `frontend/src/pages/ManualInputsImportPage.jsx` — UI workflow/status.

### Claim: commodity history is stored locally and displayed separately from scoring

**Evidence:**

- `external_data/services.py` — fixed FRED maps, four sync phases, bulk observation insertion.
- `external_data/models.py` and migration — series/date constraints and precision.
- `external_data/views.py` — year/series/observation APIs.
- `frontend/src/services/Commodities.js`, `CommodityDollar.jsx`, `CommodityIndex.jsx`, `CommoditiesGraph.jsx`.
- `spire_data/scoring.py` — no external_data input/import.

### Claim: successful full loads at the recorded local size are substantiated

**Evidence:**

- `mms-sku-tool/db.sqlite3` — `spire_data_datasynclog.id=12`, business-table counts.
- `mms-temp/db.sqlite3` — full logs 2/4 and `spire_data_fullsynccheckpoint.result_summary`.
- `context_mms_sku_tool/doc.md` — corresponding August timestamps/totals and historical size.
- Current checkpoint status was queried independently, preventing old completion reports from being presented as current main state.

### Claim: backend behavior is covered by 185 tests, without asserting full coverage

**Evidence:**

- `spire_data/tests.py`, `spire_data/test_full_sync.py`, `spire_data/test_imports.py`, `external_data/tests.py`.
- Current isolated runner discovery and results described under Testing / Quality.
- Source-method inventory below preserves exact class/test names.

In this Evidence Map, paths beginning `spire_data/`, `external_data/`, or `frontend/` are shorthand under `mms-sku-tool/`.

## Git / Development History

No commit history walk or authorship analysis was performed: current code, migrations, local data, and extensive handoff documents already reveal the scope. Read-only current-state commands show both checkouts at short HEAD **`db61114`**; primary branch **`spire-backend-data`**, temp branch **`main`**. Primary has the two existing commodity frontend modifications described above; temp has a clean short-status result.

Documents report earlier commits/merges/pushes and describe removed/refactored behavior, including the old territory-prices endpoint and legacy price matrix. These are retained as documentary development context where useful, not freshly verified remote Git state or an exhaustive chronology. No branch/commit operation was needed. Migration headers and documentation dates establish recorded dates, not the developer's working hours or a complete project timeline.

## Uncertain / Not Verifiable

- Actual production users, active users, customers served, business impact, revenue/profit improvement, or time saved.
- Production hosting, topology, live version, operational uptime, traffic, request latency, capacity, security posture, or backups.
- Current live Spire/FRED/Groq reachability, credentials, contract details, and completeness/freshness relative to upstream systems.
- Exact per-record reasons behind all skipped ERP rows; logs retain counts, not a rejection ledger.
- Current parity of every business value across the two databases: historical context reports a natural-key/value comparison excluding local IDs/timestamps/raw JSON, but this investigation revalidated counts and selected aggregates only.
- Another operator's ranking mismatch: their actual running database and browser request are not available here. Manual deletion followed by unfinished-run resume is documented as a plausible later recovery issue, not the proven original cause.
- Validity of inventory/sales margin fields as audited profitability measures; `margin_dollars` and COGS-per-minute are explicitly deferred.
- Business interpretation of production ease: model labels, UI explanation, and score direction do not independently establish the intended policy.
- Provider-generated explanations' factual accuracy or quality under all inputs; prompting and schema normalization are not an evaluation study.
- Strong concurrent-job exclusion on default SQLite, exactly-once persistence, complete upstream deletion handling, or resilience to source mutation during offset pagination.
- Full frontend behavior in a browser, accessibility compliance, frontend automated coverage, or live end-to-end provider integration during this investigation.
- A complete historical activity log. Source and documents evidence work, but not every past debugging session or deployment action.

## Questions Requiring External Context

1. Where and how is the application actually hosted, and what settings/security controls replace the committed development defaults?
2. Who uses the rankings operationally, what decisions do they support, and are outcomes measured?
3. Which source definitions should govern margin percentage, gross-profit dollars, production ease, and price/UOM/currency comparisons?
4. What refresh cadence, history-completeness expectations, upstream deletion policy, and recovery ownership are required in operation?
5. Are manual-factor data maintained elsewhere, given that both supplied databases have no ManualInput rows?
6. What is the actual request/response and database state in the environment with the unresolved ranking discrepancy?
7. What data-sharing policy and quality review apply to sending SKU metrics/context to Groq?
8. What real workload, response-time targets, and concurrency requirements should govern future database/deployment choices?

These questions do not revisit the supplied sole-developer ownership statement or ask for facts already obtainable from current source.

## Additional Technical Details

### Small implementation details retained for traceability

- Most domain models preserve `created_at`/`updated_at`; observation rows instead retain date/value and their series relation. Django handles timestamp behavior; the project chooses where those fields exist.
- Foreign-key deletion behavior preserves sales/pricing rows with null related records, while BOM children and manual inputs cascade with their parent. This is not universal referential coverage because many SKU/codes remain strings.
- Full-sync checkpoint state is one mutable operation record rather than one checkpoint per run; historical run totals remain in logs, but older detailed summaries can be overwritten.
- `resume=False` resets progress, not business tables. A completed checkpoint also starts over with `resume=True`. Neither mode clears manual inputs, explanation cache, or source rows removed upstream.
- Short final pages advance next offset by full batch size; therefore next offset can exceed actual fetched count. This is intentional offset bookkeeping, not evidence of extra fetched rows.
- Recovery updates selected status/finish/error fields and preserves progress, including current start and summaries. It does not itself restart synchronization.
- The commodity metadata endpoint field lists omit `display_name`, whereas year-grouped endpoints include it for the UI.
- Missing series observations return 404 even if metadata exists, so “no observations” and “unknown series” share that response.
- API list ordering overrides model defaults; ranking sorting operates on rounded response scores. Both details affect deterministic display.
- SKU explanation context includes the already assigned rank; a changed peer ranking can invalidate cache even if a SKU's individual source metrics stay constant.
- CSV validation reads the entire bounded file into memory and constructs all rows before writes; it does not stream or chunk imports. The size bound is the implemented capacity control.
- `frontend/index.html` still has title `frontend`. No dedicated favicon, image asset, or custom icon system is demonstrated by project-owned files.
- Settings configure a template directory, but no custom template files are present. App admin files remain placeholders. AppConfig and empty `__init__.py` files provide framework wiring, not extra features.
- The ignore list includes Java/Maven/media/package patterns; those patterns are not evidence that Java, Maven, video processing, or packaged desktop applications were used.

### Declaration and file appendices

The appendices below are extracted from project-owned source to preserve exact field declarations, test identifiers, and file coverage. Declaration text describes schema/code, not additional functionality beyond the analysis above. Dependency environments, Git internals, bytecode, and generated frontend output are intentionally excluded from custom-code inventories.


### Appendix A: Exact model field declarations

Each row is extracted from the corresponding current `models.py` AST. Implicit Django primary keys are not repeated; `DEFAULT_AUTO_FIELD` is BigAutoField. Model Meta declarations are preserved after each table. Relation targets and on-delete policies are literal source declarations.

#### `InventoryItem`

Source: `mms-sku-tool/spire_data/models.py` — line 4.

| Field | Declaration |
| --- | --- |
| `sku` | `models.CharField(max_length=50, unique=True)` |
| `sku_name` | `models.CharField(max_length=255, blank=True)` |
| `warehouse` | `models.CharField(max_length=20, blank=True)` |
| `status` | `models.IntegerField(null=True, blank=True)` |
| `group_no` | `models.CharField(max_length=20, blank=True)` |
| `current_cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `average_cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `curr_margin_pct` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `curr_margin_amt` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['sku']`.

#### `Customer`

Source: `mms-sku-tool/spire_data/models.py` — line 51.

| Field | Declaration |
| --- | --- |
| `customer_no` | `models.CharField(max_length=50, unique=True)` |
| `name` | `models.CharField(max_length=255, blank=True)` |
| `user_def2` | `models.CharField(max_length=50, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['customer_no']`.

#### `SalesHistoryItem`

Source: `mms-sku-tool/spire_data/models.py` — line 66.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `invoice_no` | `models.CharField(max_length=50, blank=True)` |
| `rec_no` | `models.PositiveIntegerField(null=True, blank=True)` |
| `sku` | `models.CharField(max_length=50, blank=True)` |
| `sku_name` | `models.CharField(max_length=255, blank=True)` |
| `customer` | `models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='sales_history')` |
| `order_qty` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `invoice_date` | `models.DateField(null=True, blank=True)` |
| `order_date` | `models.DateField(null=True, blank=True)` |
| `territory_code` | `models.CharField(max_length=50, blank=True)` |
| `unit_price` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `extended_price` | `models.DecimalField(max_digits=16, decimal_places=5, null=True, blank=True)` |
| `average_cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `average_margin` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `current_cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `current_margin` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['-order_date', '-invoice_date']`; `constraints = [models.UniqueConstraint(fields=['invoice_no', 'rec_no'], name='unique_sales_invoice_line')]`.

#### `PurchasingHistoryItem`

Source: `mms-sku-tool/spire_data/models.py` — line 152.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `number` | `models.CharField(max_length=50, blank=True)` |
| `rec_no` | `models.PositiveIntegerField(null=True, blank=True)` |
| `sku` | `models.CharField(max_length=50, blank=True)` |
| `sku_name` | `models.CharField(max_length=255, blank=True)` |
| `unit_price` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `order_qty` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `received_qty` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `order_date` | `models.DateField(null=True, blank=True)` |
| `vendor_no` | `models.CharField(max_length=50, blank=True)` |
| `vendor_name` | `models.CharField(max_length=255, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['-order_date']`; `constraints = [models.UniqueConstraint(fields=['number', 'rec_no'], name='unique_purchasing_history_line')]`.

#### `Territory`

Source: `mms-sku-tool/spire_data/models.py` — line 202.

| Field | Declaration |
| --- | --- |
| `territory_code` | `models.CharField(max_length=50, unique=True)` |
| `name` | `models.CharField(max_length=255, blank=True)` |
| `description` | `models.CharField(max_length=255, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['territory_code']`.

#### `InventoryPriceLevel`

Source: `mms-sku-tool/spire_data/models.py` — line 219.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `code` | `models.CharField(max_length=20, unique=True)` |
| `description` | `models.CharField(max_length=255, blank=True)` |
| `currency_code` | `models.CharField(max_length=10, blank=True)` |
| `sell_price_index` | `models.PositiveSmallIntegerField(unique=True)` |
| `is_main` | `models.BooleanField(default=False)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['sell_price_index']`.

#### `InventorySellPriceMatrix`

Source: `mms-sku-tool/spire_data/models.py` — line 239.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `inventory_item` | `models.OneToOneField(InventoryItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='sell_price_matrix')` |
| `sku` | `models.CharField(max_length=50, unique=True)` |
| `sku_name` | `models.CharField(max_length=255, blank=True)` |
| `warehouse` | `models.CharField(max_length=20, blank=True)` |
| `group_no` | `models.CharField(max_length=20, blank=True)` |
| `price_01` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_02` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_03` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_04` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_05` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_06` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_07` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_08` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_09` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_10` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_11` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_12` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_13` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_14` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_15` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_16` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_17` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_18` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_19` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_20` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `raw_sell_prices` | `models.JSONField(null=True, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['sku']`.

#### `InventorySellPrice`

Source: `mms-sku-tool/spire_data/models.py` — line 387.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `inventory_item` | `models.ForeignKey(InventoryItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='sell_prices')` |
| `sku` | `models.CharField(max_length=50, db_index=True)` |
| `sku_name` | `models.CharField(max_length=255, blank=True)` |
| `warehouse` | `models.CharField(max_length=20, blank=True)` |
| `inventory_status` | `models.IntegerField(null=True, blank=True)` |
| `group_no` | `models.CharField(max_length=20, blank=True)` |
| `unit_of_measure_id` | `models.PositiveIntegerField(null=True, blank=True)` |
| `unit_of_measure_code` | `models.CharField(max_length=50, blank=True)` |
| `unit_of_measure_description` | `models.CharField(max_length=255, blank=True)` |
| `unit_of_measure_conversion_factor` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price_level_id` | `models.PositiveIntegerField(null=True, blank=True)` |
| `price_level_code` | `models.CharField(max_length=20, blank=True, db_index=True)` |
| `price_level_description` | `models.CharField(max_length=255, blank=True)` |
| `currency_code` | `models.CharField(max_length=10, blank=True)` |
| `cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `current_cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `standard_cost` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `price` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |
| `margin` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `current_margin` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `markup` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `current_markup` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `effective_date` | `models.DateField(null=True, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['sku', 'unit_of_measure_code', 'price_level_code']`.

#### `BillOfMaterialsTemplate`

Source: `mms-sku-tool/spire_data/models.py` — line 459.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `template_no` | `models.CharField(max_length=50, unique=True)` |
| `parent_sku` | `models.CharField(max_length=50, blank=True)` |
| `warehouse` | `models.CharField(max_length=20, blank=True)` |
| `description` | `models.CharField(max_length=255, blank=True)` |
| `required_qty` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `yield_expected_pct` | `models.DecimalField(max_digits=8, decimal_places=4, null=True, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['template_no']`.

#### `BillOfMaterialsItem`

Source: `mms-sku-tool/spire_data/models.py` — line 492.

| Field | Declaration |
| --- | --- |
| `spire_id` | `models.PositiveIntegerField(unique=True)` |
| `template` | `models.ForeignKey(BillOfMaterialsTemplate, on_delete=models.CASCADE, related_name='items')` |
| `minutes_per_production` | `models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)` |
| `component_sku` | `models.CharField(max_length=50)` |
| `component_name` | `models.CharField(max_length=255, blank=True)` |
| `quantity` | `models.DecimalField(max_digits=12, decimal_places=4, null=True, blank=True)` |
| `unit` | `models.CharField(max_length=50, blank=True)` |
| `raw_data` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['template__template_no', 'component_sku']`.

#### `ManualInput`

Source: `mms-sku-tool/spire_data/models.py` — line 534.

| Field | Declaration |
| --- | --- |
| `inventory_item` | `models.OneToOneField(InventoryItem, on_delete=models.CASCADE, related_name='manual_input')` |
| `is_sentimental` | `models.BooleanField(default=False)` |
| `exclusivity_level` | `models.IntegerField(choices=EXCLUSIVITY_CHOICES, default=0)` |
| `production_ease` | `models.IntegerField(choices=PRODUCTION_EASE_CHOICES, default=0)` |
| `is_seasonal` | `models.BooleanField(default=False)` |
| `is_fragile` | `models.BooleanField(default=False)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Choice declarations: `EXCLUSIVITY_CHOICES = [(0, 'Not Exclusive'), (-1, 'Exclusive in Territory'), (-2, 'Exclusive to Customer')]`; `PRODUCTION_EASE_CHOICES = [(0, 'Non-Cold Storage'), (1, 'Cold Storage')]`.

Meta: `ordering = ['inventory_item__sku']`.

#### `DataSyncLog`

Source: `mms-sku-tool/spire_data/models.py` — line 574.

| Field | Declaration |
| --- | --- |
| `entity` | `models.CharField(max_length=50, choices=ENTITY_CHOICES)` |
| `started_at` | `models.DateTimeField(auto_now_add=True)` |
| `finished_at` | `models.DateTimeField(null=True, blank=True)` |
| `records_fetched` | `models.IntegerField(default=0)` |
| `records_saved` | `models.IntegerField(default=0)` |
| `records_skipped` | `models.IntegerField(default=0)` |
| `status` | `models.CharField(max_length=20, choices=STATUS_CHOICES, default='started')` |
| `error_message` | `models.TextField(blank=True)` |

Choice declarations: `ENTITY_CHOICES = [('inventory', 'Inventory'), ('inventory_price_levels', 'Inventory Price Levels'), ('inventory_sell_prices', 'Inventory Sell Prices'), ('customers', 'Customers'), ('sales_history', 'Sales History'), ('purchasing_history', 'Purchasing History'), ('territories', 'Territories'), ('bill_of_materials_templates', 'Bill of Materials Templates'), ('bill_of_materials', 'Bill of Materials'), ('full_sync_all', 'Full Sync All')]`; `STATUS_CHOICES = [('started', 'Started'), ('success', 'Success'), ('failed', 'Failed')]`.

Meta: `ordering = ['-started_at']`.

#### `FullSyncCheckpoint`

Source: `mms-sku-tool/spire_data/models.py` — line 617.

| Field | Declaration |
| --- | --- |
| `operation` | `models.CharField(max_length=50, unique=True)` |
| `status` | `models.CharField(max_length=20, choices=STATUS_CHOICES)` |
| `current_entity` | `models.CharField(max_length=50, blank=True)` |
| `current_start` | `models.PositiveIntegerField(default=0)` |
| `last_completed_start` | `models.PositiveIntegerField(null=True, blank=True)` |
| `batch_size` | `models.PositiveIntegerField(default=5000)` |
| `completed_entities` | `models.JSONField(default=list, blank=True)` |
| `result_summary` | `models.JSONField(default=dict, blank=True)` |
| `error_message` | `models.TextField(blank=True)` |
| `started_at` | `models.DateTimeField(null=True, blank=True)` |
| `finished_at` | `models.DateTimeField(null=True, blank=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Choice declarations: `STATUS_CHOICES = [('running', 'Running'), ('completed', 'Completed'), ('failed', 'Failed'), ('interrupted', 'Interrupted')]`.

Meta: `ordering = ['-updated_at']`.

#### `SkuRankingExplanation`

Source: `mms-sku-tool/spire_data/models.py` — line 645.

| Field | Declaration |
| --- | --- |
| `sku` | `models.CharField(max_length=50)` |
| `request_hash` | `models.CharField(max_length=64)` |
| `prompt_version` | `models.CharField(max_length=20)` |
| `model` | `models.CharField(max_length=100)` |
| `ranking_context` | `models.JSONField()` |
| `explanation` | `models.JSONField()` |
| `raw_response` | `models.JSONField(null=True, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['-updated_at']`; `constraints = [models.UniqueConstraint(fields=['sku', 'request_hash', 'prompt_version', 'model'], name='unique_sku_ranking_explanation_cache')]`.

#### `CommoditySeriesDollar`

Source: `mms-sku-tool/external_data/models.py` — line 6.

| Field | Declaration |
| --- | --- |
| `series_id` | `models.CharField(max_length=50, unique=True)` |
| `series_name` | `models.CharField(max_length=280, blank=True)` |
| `display_name` | `models.CharField(max_length=300, blank=True)` |
| `observation_start` | `models.DateField(null=True, blank=True)` |
| `observation_end` | `models.DateField(null=True, blank=True)` |
| `frequency` | `models.CharField(max_length=50, blank=True)` |
| `units` | `models.CharField(max_length=100, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['series_name']`.

#### `CommoditySeriesIndex`

Source: `mms-sku-tool/external_data/models.py` — line 28.

| Field | Declaration |
| --- | --- |
| `series_id` | `models.CharField(max_length=50, unique=True)` |
| `series_name` | `models.CharField(max_length=280, blank=True)` |
| `display_name` | `models.CharField(max_length=300, blank=True)` |
| `observation_start` | `models.DateField(null=True, blank=True)` |
| `observation_end` | `models.DateField(null=True, blank=True)` |
| `frequency` | `models.CharField(max_length=50, blank=True)` |
| `base_index_date` | `models.CharField(max_length=100, blank=True)` |
| `created_at` | `models.DateTimeField(auto_now_add=True)` |
| `updated_at` | `models.DateTimeField(auto_now=True)` |

Meta: `ordering = ['series_name']`.

#### `CommoditySeriesDollarObservation`

Source: `mms-sku-tool/external_data/models.py` — line 50.

| Field | Declaration |
| --- | --- |
| `series` | `models.ForeignKey(CommoditySeriesDollar, on_delete=models.CASCADE, related_name='observations')` |
| `date` | `models.DateField()` |
| `value` | `models.DecimalField(max_digits=14, decimal_places=5, null=True, blank=True)` |

Meta: `unique_together = ('series', 'date')`; `indexes = [models.Index(fields=['series', 'date'])]`; `ordering = ['date']`.

#### `CommoditySeriesIndexObservation`

Source: `mms-sku-tool/external_data/models.py` — line 76.

| Field | Declaration |
| --- | --- |
| `series` | `models.ForeignKey(CommoditySeriesIndex, on_delete=models.CASCADE, related_name='observations')` |
| `date` | `models.DateField()` |
| `value` | `models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)` |

Meta: `unique_together = ('series', 'date')`; `indexes = [models.Index(fields=['series', 'date'])]`; `ordering = ['date']`.

#### `CommoditySyncLog`

Source: `mms-sku-tool/external_data/models.py` — line 103.

| Field | Declaration |
| --- | --- |
| `entity` | `models.CharField(max_length=50, choices=ENTITY_CHOICES)` |
| `started_at` | `models.DateTimeField(auto_now_add=True)` |
| `finished_at` | `models.DateTimeField(null=True, blank=True)` |
| `status` | `models.CharField(max_length=20, choices=STATUS_CHOICES, default='started')` |
| `records_fetched` | `models.IntegerField(default=0)` |
| `records_saved` | `models.IntegerField(default=0)` |
| `records_skipped` | `models.IntegerField(default=0)` |
| `error_message` | `models.TextField(blank=True)` |

Choice declarations: `ENTITY_CHOICES = [('commodities series', 'commodities_series'), ('commodities series index', 'commodities_series_index'), ('commodities series observations', 'commodities_series_observations'), ('commodities series index observations', 'commodities_series_index_observations')]`; `STATUS_CHOICES = [('started', 'Started'), ('success', 'Success'), ('failed', 'Failed')]`.

Meta: `ordering = ['-started_at']`.

### Appendix B: Complete named test inventory

Names identify the executable assertions, not claims of broader coverage. Source files contain in-code fixtures/mocks; see the test matrix for counts and scope.

#### `mms-sku-tool/spire_data/tests.py`

**DataPointCoverageTests** (1 methods; line 55)

- `test_product_scoring_data_points_are_modelled` (line 61)

**SpireSyncMappingTests** (16 methods; line 231)

- `test_inventory_sync_filters_active_warehouse_items` (line 233)
- `test_inventory_sync_skips_items_outside_allowed_product_groups` (line 272)
- `test_inventory_sync_handles_spire_high_precision_and_large_margin_pct` (line 295)
- `test_inventory_price_level_sync_saves_price_level_metadata` (line 327)
- `test_inventory_price_level_sync_skips_records_without_numeric_code` (line 371)
- `test_inventory_sell_price_sync_saves_price_level_rows` (line 390)
- `test_inventory_sell_price_sync_preserves_zero_and_missing_values` (line 473)
- `test_inventory_sell_price_sync_skips_items_outside_finished_goods` (line 507)
- `test_sales_sync_uses_distinct_invoice_and_order_dates` (line 534)
- `test_individual_sync_retries_transient_spire_errors` (line 570)
- `test_individual_sync_blocks_when_full_sync_checkpoint_is_running` (line 591)
- `test_inventory_sell_price_sync_refreshes_inventory_map_on_miss` (line 609)
- `test_sales_sync_refreshes_customer_map_on_miss` (line 657)
- `test_bom_sync_refreshes_template_map_on_miss` (line 696)
- `test_sales_sync_passes_requested_start_offset_to_spire` (line 730)
- `test_bom_sync_saves_labour_minutes_from_minute_unit_qty` (line 746)

**ScoringHelperTests** (4 methods; line 775)

- `test_score_margin_pct_bucket_boundaries` (line 776)
- `test_normalize_factor_range_clamps_out_of_range_values` (line 794)
- `test_manual_raw_score_handles_missing_numeric_manual_fields` (line 804)
- `test_weighted_score_returns_zero_when_all_factors_are_missing` (line 814)

**SkuMetricDataAssemblyTests** (48 methods; line 837)

- `test_build_sku_metric_rows_aggregates_synced_tables` (line 939)
- `test_build_sku_metric_rows_excludes_inactive_and_other_warehouse_inventory` (line 968)
- `test_build_sku_metric_rows_excludes_non_finished_good_product_groups` (line 981)
- `test_build_sku_metric_rows_uses_group_no_field_not_raw_data` (line 1011)
- `test_build_sku_metric_rows_keeps_active_inventory_without_sales` (line 1033)
- `test_build_sku_metric_rows_ignores_unclassified_customer_tiers` (line 1044)
- `test_build_sku_metric_rows_applies_territory_and_customer_filters` (line 1074)
- `test_build_sku_metric_rows_applies_multiple_customer_tier_filters` (line 1094)
- `test_build_sku_metric_rows_applies_multiple_territory_filters` (line 1114)
- `test_build_sku_metric_rows_applies_sku_and_date_range_filters` (line 1129)
- `test_build_sku_metric_rows_accepts_plural_skus_scalar_filter` (line 1147)
- `test_build_sku_metric_rows_accepts_customer_tier_filter_alias` (line 1152)
- `test_validated_filters_is_idempotent_for_representative_payload` (line 1169)
- `test_validated_filters_is_idempotent_for_empty_payload` (line 1188)
- `test_build_sku_metric_rows_rejects_customer_value_filter_key` (line 1196)
- `test_build_sku_metric_rows_applies_manual_factor_filters` (line 1203)
- `test_manual_factor_filters_exclude_missing_manual_input_rows` (line 1233)
- `test_exclusive_filter_combines_with_redundant_exclusivity_levels` (line 1239)
- `test_build_sku_metric_rows_filters_exclusivity_levels` (line 1259)
- `test_build_sku_metric_rows_rejects_invalid_exclusivity_levels` (line 1264)
- `test_build_sku_metric_rows_rejects_conflicting_exclusive_filters` (line 1271)
- `test_build_sku_metric_rows_applies_time_window_filter` (line 1283)
- `test_sku_filter_with_sales_scoped_filter_excludes_sku_without_matching_sales` (line 1298)
- `test_build_sku_metric_rows_rejects_unknown_time_window` (line 1312)
- `test_build_sku_metric_rows_rejects_invalid_date_range` (line 1319)
- `test_build_sku_metric_rows_reports_date_range_alias_names` (line 1331)
- `test_build_sku_metric_rows_reports_invalid_date_alias_name` (line 1343)
- `test_build_ranking_response_scores_and_ranks_skus` (line 1350)
- `test_build_ranking_response_rejects_missing_enabled_factors` (line 1395)
- `test_build_ranking_response_supports_volume_factor` (line 1402)
- `test_build_ranking_response_rejects_margin_dollars_factor` (line 1415)
- `test_build_ranking_response_uses_default_weight_when_weight_omitted` (line 1427)
- `test_build_ranking_response_renormalizes_missing_manual_factors` (line 1437)
- `test_build_ranking_response_scores_zero_when_all_factors_missing` (line 1463)
- `test_build_ranking_response_resolves_alias_weight_for_canonical_factor` (line 1478)
- `test_build_ranking_response_deduplicates_alias_and_canonical_factor` (line 1489)
- `test_build_ranking_response_rejects_non_positive_and_non_numeric_weights` (line 1500)
- `test_build_ranking_response_applies_limit_after_sorting_and_reranks` (line 1514)
- `test_build_ranking_response_limit_does_not_change_returned_sku_scores` (line 1539)
- `test_build_ranking_response_sorts_tied_scores_by_sku` (line 1582)
- `test_build_ranking_response_calculates_volume_percentiles_for_three_skus` (line 1613)
- `test_build_ranking_response_sku_filter_recalculates_volume_percentile` (line 1660)
- `test_build_ranking_response_rejects_territory_scoring_factor` (line 1725)
- `test_build_ranking_response_rejects_invalid_explain_sku_payload` (line 1737)
- `test_build_ranking_response_explains_top_ranked_skus` (line 1758)
- `test_build_ranking_response_reuses_cached_top_ranked_explanations` (line 1815)
- `test_build_ranking_response_refresh_bypasses_cached_top_ranked_explanations` (line 1869)
- `test_build_ranking_response_returns_explanation_errors_without_groq_key` (line 1914)

**PercentileNormalizationTests** (4 methods; line 1940)

- `test_percentile_normalize_handles_empty_and_single_positive_sku` (line 1941)
- `test_percentile_normalize_forces_zero_and_negative_values_to_zero` (line 1948)
- `test_percentile_normalize_handles_ordering_and_ties` (line 1964)
- `test_percentile_normalize_evenly_spaces_distinct_positive_values` (line 1982)

**ViewHelperTests** (4 methods; line 2001)

- `test_positive_int_accepts_positive_integer_strings` (line 2002)
- `test_positive_int_rejects_zero_negative_float_and_non_numeric` (line 2007)
- `test_non_negative_int_accepts_zero_and_positive_integer_strings` (line 2018)
- `test_non_negative_int_rejects_negative_float_and_non_numeric` (line 2024)

**SpireSyncViewTests** (31 methods; line 2036)

- `test_sync_view_requires_authentication` (line 2052)
- `test_sync_view_requires_staff_user` (line 2058)
- `test_sync_view_rejects_invalid_json` (line 2066)
- `test_sync_view_rejects_invalid_entity` (line 2078)
- `test_sync_view_runs_selected_sync` (line 2092)
- `test_sync_view_returns_502_when_sync_function_raises` (line 2136)
- `test_sync_view_rejects_invalid_pagination` (line 2161)
- `test_sync_view_rejects_duplicate_running_entity` (line 2192)
- `test_sync_view_all_blocks_when_any_sync_is_running` (line 2207)
- `test_sync_view_blocks_individual_sync_while_full_sync_is_running` (line 2220)
- `test_full_sync_view_requires_authentication` (line 2235)
- `test_full_sync_view_requires_staff_user` (line 2241)
- `test_full_sync_view_rejects_invalid_json` (line 2249)
- `test_full_sync_view_runs_full_sync_service` (line 2261)
- `test_full_sync_view_rejects_invalid_batch_size` (line 2281)
- `test_full_sync_view_returns_conflict_when_service_is_running` (line 2312)
- `test_full_sync_view_failure_payload_includes_checkpoint_position` (line 2327)
- `test_full_sync_status_requires_authentication` (line 2353)
- `test_full_sync_status_requires_staff_user` (line 2359)
- `test_full_sync_status_returns_idle_without_checkpoint` (line 2367)
- `test_full_sync_status_returns_running_checkpoint_and_log` (line 2382)
- `test_full_sync_status_reports_stale_running_checkpoint` (line 2418)
- `test_full_sync_status_reports_stale_started_sync_logs` (line 2438)
- `test_full_sync_recover_requires_authentication` (line 2463)
- `test_full_sync_recover_requires_staff_user` (line 2473)
- `test_full_sync_recover_requires_confirmation` (line 2485)
- `test_full_sync_recover_keeps_csrf_protection` (line 2497)
- `test_full_sync_recover_marks_running_checkpoint_interrupted` (line 2509)
- `test_full_sync_recover_noops_when_nothing_is_stuck` (line 2557)
- `test_full_sync_recover_returns_conflict_for_other_started_syncs` (line 2571)
- `test_full_sync_recover_returns_conflict_for_multiple_full_sync_logs` (line 2591)

**TerritoryDataViewTests** (2 methods; line 2616)

- `test_territory_view_returns_allowed_territories_with_label_overrides` (line 2625)
- `test_territory_view_only_allows_get` (line 2649)

**SkuRankingViewTests** (12 methods; line 2657)

- `test_ranking_view_requires_authentication` (line 2717)
- `test_ranking_view_requires_staff_user` (line 2723)
- `test_ranking_view_rejects_invalid_payload` (line 2731)
- `test_ranking_view_rejects_limit_above_maximum` (line 2746)
- `test_ranking_view_returns_ranked_sku_results` (line 2764)
- `test_ranking_view_returns_explanation_errors_without_failing_rankings` (line 2796)
- `test_ranking_view_returns_top_n_explanations` (line 2826)
- `test_ranking_view_accepts_full_scoring_payload` (line 2875)
- `test_ranking_view_documented_valid_examples_work_as_endpoint_requests` (line 2970)
- `test_ranking_view_documented_invalid_examples_return_validation_errors` (line 3182)
- `test_ranking_view_rejects_territory_as_scoring_factor` (line 3226)
- `test_ranking_view_rejects_margin_dollars_as_scoring_factor` (line 3246)

**SkuRankingExplanationViewTests** (8 methods; line 3270)

- `test_explanation_view_requires_authentication` (line 3368)
- `test_explanation_view_requires_staff_user` (line 3374)
- `test_explanation_view_uses_provided_ranking_context` (line 3384)
- `test_explanation_view_normalizes_empty_required_text` (line 3410)
- `test_explanation_view_reuses_cached_provided_context` (line 3454)
- `test_explanation_view_rejects_sku_missing_from_ranking_results` (line 3479)
- `test_explanation_view_rejects_missing_selected_result_fields` (line 3493)
- `test_explanation_view_returns_groq_error_without_failing_request` (line 3507)

**TableDataEndpointTests** (14 methods; line 3528)

- `test_inventory_items_endpoint_returns_paginated_records` (line 3540)
- `test_table_endpoint_rejects_invalid_pagination` (line 3612)
- `test_table_endpoint_rejects_limit_above_maximum` (line 3623)
- `test_table_endpoint_requires_staff_user` (line 3631)
- `test_table_endpoints_are_available` (line 3639)
- `test_inventory_price_levels_endpoint_returns_paginated_records` (line 3665)
- `test_inventory_sell_prices_endpoint_returns_price_level_records` (line 3709)
- `test_inventory_sell_prices_endpoint_paginates_and_filters_by_sku` (line 3773)
- `test_inventory_sell_prices_endpoint_filters_visible_territories_by_default` (line 3807)
- `test_inventory_sell_prices_endpoint_filters_by_requested_territory_code` (line 3852)
- `test_inventory_sell_prices_endpoint_filters_by_requested_territory_label` (line 3903)
- `test_inventory_sell_prices_endpoint_filters_by_requested_territory_description` (line 3940)
- `test_inventory_sell_prices_endpoint_rejects_unknown_territory_filter` (line 3966)
- `test_table_endpoints_return_populated_synced_records` (line 3979)

#### `mms-sku-tool/spire_data/test_full_sync.py`

**FullSpireSyncServiceTests** (18 methods; line 36)

- `test_full_sync_paginates_until_dataset_is_complete` (line 42)
- `test_full_sync_detects_end_after_empty_page_following_full_page` (line 88)
- `test_full_sync_rejects_batch_size_above_spire_limit` (line 115)
- `test_full_sync_retries_same_page_after_temporary_failure` (line 122)
- `test_full_sync_does_not_retry_http_400` (line 147)
- `test_full_sync_fails_cleanly_after_retries_are_exhausted` (line 164)
- `test_full_sync_resume_retries_interrupted_page_without_duplicates` (line 182)
- `test_full_sync_fresh_running_checkpoint_still_conflicts` (line 229)
- `test_full_sync_auto_fails_stale_individual_sync_logs_before_starting` (line 252)
- `test_full_sync_fresh_individual_sync_log_still_conflicts` (line 295)
- `test_full_sync_stale_running_checkpoint_is_marked_interrupted_and_resumed` (line 314)
- `test_full_sync_resume_false_clears_stale_running_checkpoint` (line 372)
- `test_full_sync_registers_running_log_and_marks_success` (line 421)
- `test_full_sync_rolls_back_entire_page_when_upsert_fails_mid_batch` (line 437)
- `test_full_sync_heartbeats_between_committed_record_chunks` (line 474)
- `test_full_sync_resume_after_later_chunk_failure_retries_page_idempotently` (line 526)
- `test_full_sync_completes_prerequisite_before_dependent_dataset` (line 590)
- `test_full_sync_stops_dependent_dataset_after_prerequisite_failure` (line 622)

**FullSpireSyncRealUsageTests** (2 methods; line 652)

- `test_full_sync_all_uses_real_specs_for_every_spire_dataset` (line 820)
- `test_full_sync_all_rerun_updates_without_duplicate_records` (line 881)

#### `mms-sku-tool/spire_data/test_imports.py`

**ManualInputImportTests** (12 methods; line 15)

- `test_template_returns_expected_headers_without_staff_for_local_testing` (line 66)
- `test_preview_rejects_missing_file` (line 77)
- `test_preview_rejects_non_csv_extension` (line 85)
- `test_preview_rejects_oversized_file` (line 96)
- `test_preview_rejects_header_mismatch` (line 117)
- `test_preview_rejects_empty_csv_after_header_validation` (line 132)
- `test_preview_collects_row_validation_errors` (line 144)
- `test_preview_summarizes_create_and_update_without_writing` (line 172)
- `test_confirm_upserts_manual_inputs` (line 197)
- `test_confirm_counts_unchanged_rows_without_writing` (line 229)
- `test_confirm_revalidates_and_rejects_invalid_csv_without_writing` (line 270)
- `test_confirm_rolls_back_if_import_fails_mid_transaction` (line 290)

#### `mms-sku-tool/external_data/tests.py`

**CommodityAPITest** (9 methods; line 15)

- `test_dollar_series_list` (line 66)
- `test_index_series_list` (line 76)
- `test_dollar_series_item` (line 85)
- `test_index_series_item_not_found` (line 94)
- `test_dollar_observation_list` (line 100)
- `test_dollar_observation_filter_by_series` (line 109)
- `test_dollar_observation_item` (line 121)
- `test_index_observation_item_not_found` (line 131)
- `test_index_observation_list` (line 137)

### Appendix C: Project file coverage inventory

The following lists the primary checkout's project-owned files (and its data snapshot). The second checkout has corresponding files; content comparison identified only its database and two commodity JSX files as different. Installed packages, caches, Git internals and generated output are excluded. Line counts are informational, not a contribution/complexity metric.

| Path | Lines / artifact classification |
| --- | --- |
| `mms-sku-tool/.gitignore` | 74 |
| `mms-sku-tool/db.sqlite3` | Local SQLite snapshot; queried read-only; ignored by Git |
| `mms-sku-tool/manage.py` | 22 |
| `mms-sku-tool/requirements.txt` | 11 |
| `mms-sku-tool/external_data/__init__.py` | 0 |
| `mms-sku-tool/external_data/admin.py` | 3 |
| `mms-sku-tool/external_data/apps.py` | 6 |
| `mms-sku-tool/external_data/models.py` | 138 |
| `mms-sku-tool/external_data/services.py` | 401 |
| `mms-sku-tool/external_data/tests.py` | 144 |
| `mms-sku-tool/external_data/views.py` | 481 |
| `mms-sku-tool/external_data/migrations/0001_initial.py` | 108 |
| `mms-sku-tool/external_data/migrations/__init__.py` | 0 |
| `mms-sku-tool/frontend/.gitignore` | 24 |
| `mms-sku-tool/frontend/README.md` | 16 |
| `mms-sku-tool/frontend/eslint.config.js` | 21 |
| `mms-sku-tool/frontend/index.html` | 13 |
| `mms-sku-tool/frontend/package-lock.json` | Generated npm dependency resolution; inspected root/package versions |
| `mms-sku-tool/frontend/package.json` | 29 |
| `mms-sku-tool/frontend/vite.config.js` | 18 |
| `mms-sku-tool/frontend/src/App.jsx` | 16 |
| `mms-sku-tool/frontend/src/main.jsx` | 10 |
| `mms-sku-tool/frontend/src/api/api.js` | 177 |
| `mms-sku-tool/frontend/src/components/CommoditiesGraph.jsx` | 152 |
| `mms-sku-tool/frontend/src/components/CommodityDollar.jsx` | 41 |
| `mms-sku-tool/frontend/src/components/CommodityIndex.jsx` | 37 |
| `mms-sku-tool/frontend/src/components/DropdownTemplates.jsx` | 127 |
| `mms-sku-tool/frontend/src/components/InputTemplates.jsx` | 72 |
| `mms-sku-tool/frontend/src/pages/CommoditiesPage.jsx` | 96 |
| `mms-sku-tool/frontend/src/pages/HomePage.jsx` | 444 |
| `mms-sku-tool/frontend/src/pages/ManualInputsImportPage.jsx` | 478 |
| `mms-sku-tool/frontend/src/services/Commodities.js` | 49 |
| `mms-sku-tool/frontend/src/services/Filters.js` | 96 |
| `mms-sku-tool/frontend/src/services/Scoring.js` | 132 |
| `mms-sku-tool/frontend/src/styling/Commodities.css` | 171 |
| `mms-sku-tool/frontend/src/styling/Global.css` | 96 |
| `mms-sku-tool/frontend/src/styling/Home.css` | 745 |
| `mms-sku-tool/frontend/src/styling/ManualInputsImport.css` | 377 |
| `mms-sku-tool/sku_tool/__init__.py` | 0 |
| `mms-sku-tool/sku_tool/asgi.py` | 16 |
| `mms-sku-tool/sku_tool/settings.py` | 137 |
| `mms-sku-tool/sku_tool/urls.py` | 149 |
| `mms-sku-tool/sku_tool/wsgi.py` | 16 |
| `mms-sku-tool/spire_data/__init__.py` | 0 |
| `mms-sku-tool/spire_data/admin.py` | 3 |
| `mms-sku-tool/spire_data/apps.py` | 6 |
| `mms-sku-tool/spire_data/explanations.py` | 321 |
| `mms-sku-tool/spire_data/import_views.py` | 62 |
| `mms-sku-tool/spire_data/manual_input_imports.py` | 414 |
| `mms-sku-tool/spire_data/models.py` | 668 |
| `mms-sku-tool/spire_data/scoring.py` | 1169 |
| `mms-sku-tool/spire_data/services.py` | 1397 |
| `mms-sku-tool/spire_data/test_full_sync.py` | 900 |
| `mms-sku-tool/spire_data/test_imports.py` | 314 |
| `mms-sku-tool/spire_data/tests.py` | 4103 |
| `mms-sku-tool/spire_data/views.py` | 1119 |
| `mms-sku-tool/spire_data/migrations/0001_initial.py` | 204 |
| `mms-sku-tool/spire_data/migrations/0003_skurankingexplanation.py` | 46 |
| `mms-sku-tool/spire_data/migrations/0004_inventorypricelevel_alter_datasynclog_entity_and_more.py` | 76 |
| `mms-sku-tool/spire_data/migrations/0005_inventoryitem_group_no.py` | 34 |
| `mms-sku-tool/spire_data/migrations/0006_inventorysellprice.py` | 161 |
| `mms-sku-tool/spire_data/migrations/0007_fullsynccheckpoint.py` | 60 |
| `mms-sku-tool/spire_data/migrations/0008_alter_datasynclog_entity.py` | 33 |
| `mms-sku-tool/spire_data/migrations/__init__.py` | 0 |

Workspace documents inspected: `SCORING_API_ENDPOINT_GUIDE.md`, `sku_ranking_probability_model.md`, and all five Markdown documents in `context_mms_sku_tool/`. The workspace `.env` was inspected only for variable names, not reproduced. No applicable project `AGENTS.md` was found outside excluded installed/generated directories.

The final filesystem rescan included top-level directories in both checkouts, frontend configuration/source, retained primary `dist/` artifacts, dependencies as third-party material, and each database. A before/after SHA-256 comparison of 137 existing files outside dependency/cache/generated/Git directories found no changed, added, or removed files in that set. This included both SQLite databases. Read-only Git status retained exactly the two pre-existing primary JSX modifications and a clean temp checkout. `PROJECT_ANALYSIS.md` is the sole file created by the investigation; no cache-generating build or dependency operation was run.

### Appendix D: Reproducible read-only measurement definitions

Counts and run durations above use these query forms on each SQLite file opened with `mode=ro&immutable=1`; queries do not require Django or a running application:

```sql
SELECT COUNT(*) FROM spire_data_saleshistoryitem;
SELECT COUNT(*) FROM spire_data_inventoryitem
WHERE status = 0 AND warehouse = '00' AND group_no = 'FG';
SELECT id, status, started_at, finished_at,
       records_fetched, records_saved, records_skipped
FROM spire_data_datasynclog
WHERE entity = 'full_sync_all' ORDER BY id;
SELECT operation, status, current_entity, current_start,
       last_completed_start, batch_size, completed_entities, result_summary
FROM spire_data_fullsynccheckpoint;
SELECT MIN(invoice_date), MAX(invoice_date), MIN(order_date), MAX(order_date)
FROM spire_data_saleshistoryitem;
SELECT app, name FROM django_migrations
WHERE app IN ('spire_data', 'external_data');
```

Table counts use `COUNT(*)` for each named table; file sizes use filesystem stat; durations subtract ISO-parsed finish/start timestamps. Endpoint counts enumerate `path()` calls whose literal route starts `api/`; models enumerate direct classes in the two model modules; test counts enumerate `test_*` methods in the four test modules and are cross-checked by Django discovery. Source comparison excludes dependency/generated directories and compares file contents. No author or contribution-volume inference is derived from these measurements.
