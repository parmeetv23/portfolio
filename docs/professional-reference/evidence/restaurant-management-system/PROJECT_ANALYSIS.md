# Project Name

> Transfer source: `Resume_Builder/evidence/restaurant-management-system/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. Privacy edits are listed in `catalog.json`. Original-project links to unavailable artifacts are rendered as code path references. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

**fullstack-restaurant-site** — the name in the root `README.md`. The package names are `api` and `client`; the public HTML still uses the scaffold title “React App.” No independently verified restaurant business name is established here.

## Overview

This repository contains a restaurant-oriented web application with a React browser frontend, an Express HTTP API, and direct MySQL queries. Its implemented application areas are customer records, customer and employee accounts, menu-item listing and CRUD-related backend code, restaurant locations, ordinary reservations, and special-event inquiries. The employee interface exposes different navigation choices according to a numeric permission level. Account endpoints implement some server-side authorization checks; these do not extend to all business APIs.

The repository also contains a wider relational design for orders, rewards, waitlists, item tags, order items, and location-specific item availability. These additional tables are schema artifacts, not evidence of completed ordering, reward redemption, waitlist, or fulfillment workflows. Dockerfiles and Compose describe intended containerized operation, but configuration inconsistencies prevent treating them as proof of a working deployment.

The apparent problem addressed is providing a shared restaurant/customer interface for account information, menu and location discovery, and booking-related administration. That is an interpretation of the code and UI, not a verified business requirement or outcome.

### Evidence and investigation method

- **Verified implementation** means code, configuration, or documentation was directly inspected. It does not mean the feature passed an end-to-end test.
- **Static finding** means a mismatch or behavior is visible in source. Consequences that depend on a database, browser, platform, or concurrent requests are identified as implications rather than observed incidents.
- **Interpretation** is explicitly distinguished from verified behavior. Unknown production circumstances are listed separately.
- The user's statement that they are the sole developer is accepted as the ownership premise. Original project implementation and integration work are attributed accordingly; library internals, tutorial-origin material, generated scaffolding, and vendor files are distinguished below.
- Application source, SQL, both READMEs, manifests and lockfile metadata, Dockerfiles, Compose, environment configuration, tests, public assets/metadata, comments, hidden-file inventory, and tracked-file inventory were reviewed. Vendor package code was identified as dependency material rather than exhaustively analyzed as original project work.
- Git inspection was limited to current tracked-file inventory, status, and diff checks. Commit history was not needed or analyzed.
- No dependencies were installed, databases accessed, migrations executed, servers started, application builds generated, or source files changed. A read-only backend JavaScript syntax check was performed. This file is the only investigation output written into the repository.
- At the start, `createDatabase.sql` was already untracked and tracked files had no reported modifications. Its contents are included as evidence of the supplied working tree, not represented as committed history. A local `.DS_Store` is incidental filesystem metadata.
- Secret values are not repeated in this record. The presence and handling of credentials are documented where relevant.

## Repository Scope

| Area | Contents and relationship |
|---|---|
| `api/server.js` | Express startup, dotenv loading, CORS, parsers, root response, and six route-module registrations. |
| `api/routes/` | Six HTTP route modules: account, customer, item, location, reservation, and special reservation. |
| `api/controllers/` | Seven controllers, with customer-account and employee-account logic separated despite sharing one account router. |
| `api/models/` | Eight domain model files plus `db.js`. These are JavaScript constructor/query modules, not ORM models. |
| `api/config/db.config.js` | Environment-backed MySQL connection defaults. |
| `client/src/pages/` | Twelve page modules for authentication, account management, employee actions, locations, reservations, and special inquiries. |
| `client/src/components/` | Six component files: navbar, footer, three legacy customer screens, and menu-item list. Four are routed screens; navbar is mounted globally; footer rendering is commented out. |
| `client/src/services/` | Six Axios service wrappers matching the backend domains, with some stale/unmatched service methods. |
| `client/src/context/`, `common/` | Authentication state provider and a tutorial-sourced React Router adapter for class components. |
| `client/src/App.js`, `index.js` | Eighteen route declarations; browser-router and authentication-provider composition. |
| `client/src/style.scss`, `img/` | Global and page-specific Sass, tutorial-derived styles, and a logo asset. |
| `client/public/` | HTML template, manifest, robots file, favicon, and two scaffold icon PNGs. |
| `createDatabase.sql` | Standalone database/user/table creation script with fifteen tables; present but initially untracked. |
| Root `README.md` | Stack notes, tutorial references, local startup guidance, five-table SQL setup, and six documented employee clearance levels. |
| Dockerfiles, `docker-compose.yml`, `.env`, `api/.env.sample` | Intended MySQL/API/Nginx deployment and local configuration; gaps discussed below. |
| Package manifests/lockfiles | Separate frontend/backend npm projects and generated dependency graphs. |
| `api/node_modules/` tracked files | 494 tracked dependency files, counted from `git ls-files`; these are vendor material, including their own tests/docs, not project contributions or project test cases. |

There were 77 tracked files outside `node_modules` before this report. That count excludes the untracked SQL file and this newly written report. Counts are inventory measurements, not measures of code quality or effort.

## Contributions

Under the stated sole-developer ownership premise, the repository demonstrates the following project implementation and integration work:

1. **Express API assembly:** separate route/controller/query layers; JSON and URL-encoded request parsing; credentialed CORS; cookie parsing; environment-driven host configuration; root diagnostic response; application startup logging.
2. **Customer record CRUD:** phone-number keyed customer creation, retrieval, partial update construction, deletion, and bulk deletion; corresponding service methods and class-based browser screens.
3. **Account lifecycle orchestration:** composing base account records with customer or employee records; application-level duplicate-email checks; customer phone checks; password hashing and verification; separate customer/employee login; signed cookie creation; logout cookie clearing; account retrieval, partial update, and deletion.
4. **Account authorization rules:** own-account access, employee permission thresholds for other customer/employee accounts, and an explicit self-permission-change check. This is partial authorization coverage, not complete API-wide RBAC.
5. **Account browser workflows:** registration, contextual login, persistent user metadata, edit/read modes, account-type detection when employees access another account, conditional fields, loading/error displays, and employee navigation.
6. **Menu implementation:** item schema/model, CRUD route/controller skeleton and implementations, item-list browser UI with detail selection, and an Axios service. Several item endpoint references are inconsistent, so full operational CRUD is not established.
7. **Location implementation:** location schema, full/detail-selector queries, read endpoints, location directory UI, and shared location selection in reservation workflows.
8. **Reservation implementation:** create/read/update/delete data access; lookup by customer phone, location, and composite identity; preserving previous keys while editing; browser date/time conversion; booking-form validation; chronological listing; navigation to update/delete screens.
9. **Special-event inquiry implementation:** separate inquiry model/table, creation and location lookup endpoints, creation form, placement/request timestamps, postal normalization, location-specific viewing, browser-side date filtering and sorting.
10. **Relational schema work:** customer/account specialization, contact and location identifiers, composite keys, foreign keys and cascades, decimal prices, reward/order relationships, waitlist and item-availability structures. The schema-only areas are separately identified rather than credited as implemented services.
11. **Presentation and reuse:** shared navbar, authentication context, API client configuration, service classes, common account-form/button styling, Bootstrap use, responsive list/form rules, and page-specific reservation styling.
12. **Container and environment configuration:** API image, multistage frontend build/Nginx image, three-service Compose topology, persistent database volume, port/environment wiring, and startup dependencies. These are configuration contributions, not verified deployment accomplishments.
13. **Documentation and developer tooling:** local setup instructions, source acknowledgments, permission-level descriptions, npm scripts/lockfiles, CRA lint/browser targets, test setup, and retained scaffold test.
14. **Diagnostic implementation:** console logging of queries, request data, lookup results, reservation identifiers, errors, and database/server startup. This establishes logging code, not a verified debugging history or operational monitoring system.

### Boundaries of attribution

The README and many source headers explicitly acknowledge BezKoder CRUD tutorials, Lama Dev's blog tutorial, and a freeCodeCamp form-validation tutorial. `client/src/common/with-router.js` says it is **FROM** the BezKoder tutorial; much of `style.scss` is explicitly labeled tutorial-based. The original adaptation, domain wiring, and project-specific implementation are within the user's ownership premise, but this record does not claim every source line or design pattern was invented from scratch.

Express supplies HTTP routing/middleware mechanics; mysql2 supplies MySQL communication and placeholder escaping; bcryptjs supplies password-hash algorithms; jsonwebtoken supplies JWT operations; React/React Router supply rendering/context/hooks/routing; Axios supplies HTTP requests; Bootstrap supplies its CSS system; CRA/react-scripts supplies build/test/lint machinery; Nginx supplies static serving; MySQL supplies constraint enforcement. Configuring and integrating them is project work; their internals are not.

Lockfiles are generated package-resolution artifacts. `client/README.md`, the public React metadata/icons, `App.test.js`, `setupTests.js`, and `reportWebVitals.js` retain scaffold content. The logo's original creator/source cannot be established from the asset alone. Vendor tests and package documentation are excluded from project implementation/test counts.

## Architecture

### Runtime structure

```text
Browser
  React + BrowserRouter + AuthContext
  page/component state -> six service wrappers -> shared Axios instance
       | JSON HTTP requests; withCredentials; access_token cookie
       v
Express API
  dotenv -> CORS -> body parsers -> cookie parser
  six routers -> seven controllers -> eight domain query modules
       | mysql2 queries through one shared connection
       v
MySQL restaurant database

Intended container arrangement:
  Nginx client service -> browser executes built JavaScript -> exposed API
  API service -> mysqldb service
  mysqldb -> named db volume
```

The frontend calls the API directly using a build-time URL; no application reverse-proxy configuration is supplied. Browser API traffic does not automatically use Docker's internal service names. The configured URL and CORS origin are therefore part of the browser/backend contract. Evidence: `client/src/http-common.js`, `api/server.js`, `client/Dockerfile`, `.env`, `docker-compose.yml`.

The backend uses CommonJS and callback-oriented model methods. All domain models import the same `api/models/db.js` connection. No ORM, connection pool, worker process, queue, scheduler, or service-to-service external API client is present in application source. The frontend uses ES module syntax, JSX, both class components and functional components, and local state with one shared authentication context.

### Principal data flows

- **Customer registration:** check email in `ACCOUNT` → check phone in `CUSTOMER` → insert `CUSTOMER` → bcrypt hash → insert `ACCOUNT` and fetch connection-local last-insert ID → insert `CUSTOMER_ACCOUNT` with zero past orders → success response. Cleanup calls exist on failures but are not transactional and omit required model callbacks.
- **Employee registration:** check email → bcrypt hash → insert `ACCOUNT` → insert `EMPLOYEE_ACCOUNT` using submitted names/clearance. There is no token/permission check in this registration handler.
- **Login:** find base account by email → verify corresponding subtype exists → compare bcrypt hash → sign JWT → set HTTP-only cookie → return user ID/type and employee permission where applicable → frontend stores response metadata in context/localStorage.
- **Account detail access:** verify cookie → permit matching account ID or look up requesting employee and compare current database clearance → fetch account and subtype/customer information → return selected fields without password hashes.
- **Reservation creation:** load locations and all customer records → validate browser inputs → compose SQL-style date/time string and selected postal identifier → POST → map request field casing into a `Reservation` object → parameterized insert.
- **Reservation editing:** fetch by old customer/location/date key → maintain old and new objects → validate and convert date/time → POST both objects → update fields while matching the previous key. Deletion matches all three key fields.
- **Special inquiry:** browser composes placement/request timestamps and cleans location postal spaces → insert `SP_EVENT_INQUIRY` → later query by location → browser filters requested dates and sorts placement times.

## Technologies

Versions below are directly resolved in each corresponding `package-lock.json`; they are not claims about currently installed or deployed versions.

| Group | Demonstrated technology/use |
|---|---|
| Languages/formats | JavaScript, JSX, SQL, SCSS, HTML, JSON, YAML, Dockerfile syntax, Markdown, environment key/value files. Vendor TypeScript declarations do not establish a TypeScript application. |
| Backend | Node.js; Express 4.18.2; mysql2 3.6.5; bcryptjs 2.4.3; jsonwebtoken 9.0.2; cookie-parser 1.4.6; cors 2.8.5; dotenv 10.0.0. |
| Frontend | React and react-dom 18.2.0; react-router-dom 6.20.1; Axios 1.6.2; Bootstrap 5.3.2; Sass 1.69.5. |
| Build/test tooling | react-scripts 5.0.1; @testing-library/react 13.4.0; @testing-library/jest-dom 5.17.0; @testing-library/user-event 13.5.0 declared but not used by the retained test; npm manifests and lockfile format 3. |
| Optional scaffold instrumentation | web-vitals 2.1.4, imported behind a callback check; no metrics consumer is configured. |
| Database/infrastructure | MySQL, Compose image `mysql:5.7`; Dockerfiles use `node:14`; frontend runtime image `nginx:1.17.0-alpine`; Compose format `3.8`. |
| Protocols/browser mechanisms | HTTP JSON APIs, CORS, cookies, JWT, MySQL protocol through mysql2, browser localStorage, browser-history routing, HTML date/time inputs. |

`api/package.json` mentions Sequelize in its description, but neither its dependencies nor its models use Sequelize. The README lists react-hook-form, but the frontend manifest and application imports do not demonstrate its use. They are not included as implemented technologies. The README's “password encryption” wording corresponds to bcrypt hashing in code, not reversible encryption.

## Features

| Feature area | Implemented surface | Important scope boundary |
|---|---|---|
| Customer records | Create/list/get/update/delete/delete-all API; legacy browser screens | Separate from customer accounts; routes lack authorization. |
| Customer accounts | Registration/login/logout, detail/list/update/delete, joined identity data | List and cross-account access enforce employee threshold 2; updates are not atomic. |
| Employee accounts | Registration/login, detail/list/update/delete, permission data | Cross-account access threshold 5; registration itself is public. |
| Employee home | Conditional links for reservations, inquiries, customer list, employee creation | Link visibility is not comprehensive route/API protection. |
| Menu | Item list with selected name/price/ID; backend query methods and CRUD routes | Broken controller method/parameter names; edit link has no frontend route. |
| Locations | Full contact/address list; shorter selection projection | No write endpoints despite documented level-4 editing privilege. |
| Reservations | Creation, location listing, detail/update/delete; backend phone/all lookups | Frontend time logic conflicts with SQL `DATE`; no capacity/collision scheduling engine. |
| Special inquiries | Creation and location listing; requested-date filtering; placement-time sorting | No update/delete, approval, notification, or conversion-to-booking workflow. |
| Orders/rewards/waitlist/availability | Relational definitions in SQL | No matching application controllers, routes, or user workflows. |

## Backend / APIs

### HTTP setup and conventions

`api/server.js` enables credentialed CORS for `CLIENT_ORIGIN`, defaulting to `http://localhost:3000`. It installs `express.json()`, `express.urlencoded({extended: true})`, and `cookieParser()`, then mounts the route modules. Listening uses `process.env.PORT || 8800`. `GET /` returns a welcome message; it is not a database readiness or dependency-health check.

There are **37 explicit API method/path registrations** plus **one root GET**, for **38 application registrations**. Counts exclude commented code, automatically supplied framework behaviors such as HEAD/OPTIONS handling, and frontend service methods without matching routes. Trailing slashes below are normalized for readability. A registered route is not necessarily functional.

### Account routes — 13

Evidence: `api/routes/account.routes.js`; `customer_account.controller.js`; `employee_account.controller.js`.

| Method | Path | Handler/behavior | Implemented authorization |
|---|---|---|---|
| POST | `/api/account/customer/register` | `register`; email/phone checks, three-table customer account creation | None |
| POST | `/api/account/customer/login` | `login`; customer-subtype/password verification, cookie | Credentials |
| POST | `/api/account/customer/update/:AccountID` | `authUpdate`; partial customer/account/order-count updates | Own ID or employee clearance ≥2 |
| GET | `/api/account/customer/:AccountID` | `authGet`; names, phone, email, past-order count | Own ID or employee clearance ≥2 |
| GET | `/api/account/customer` | `authGetAll`; joined account/customer listing including IDs | Employee clearance ≥2 |
| DELETE | `/api/account/customer/:AccountID` | `authDelete`; delete customer, then base account | Own ID or employee clearance ≥2 |
| POST | `/api/account/employee/register` | `register`; two-table creation with submitted permission | None |
| POST | `/api/account/employee/login` | `login`; employee-subtype/password verification, cookie | Credentials |
| POST | `/api/account/employee/update/:AccountID` | `authUpdate`; partial name/clearance/credential updates | Own ID or employee clearance ≥5; truthy self-clearance changes rejected |
| GET | `/api/account/employee/:AccountID` | `authGet`; names, email, clearance | Own ID or employee clearance ≥5 |
| GET | `/api/account/employee` | `authGetAll`; joined account/employee listing | Employee clearance ≥5 |
| DELETE | `/api/account/employee/:AccountID` | `authDelete`; delete base account, relying on subtype cascade | Own ID or employee clearance ≥5 |
| POST | `/api/account/logout` | Clear `access_token` cookie | None |

Customer registration accepts `Email`, `PhoneNum`, `FName`, `LName`, `Password`. Employee registration accepts `Email`, `PermissionLevel`, `FName`, `LName`, `Password`. Registration returns 200 success and 409 for detected duplicate identity fields. Invalid login uses a generic wrong-credentials message with 400. Authorization handlers distinguish missing cookie (401), invalid token/insufficient clearance (403), missing target (usually 404), and server errors (500).

Customer update recognizes names, phone, email, password, and `NumPastOrders`. Employee update recognizes names, email, password, and `PermissionLevel`. Checks use truthiness rather than typed field-presence validation, with consequences documented below. Passwords are rehashed when changed. Detail/list responses choose non-password fields even though internal account lookups use `SELECT *`.

### Customer routes — 6

Evidence: `api/routes/customer.routes.js`, `api/controllers/customer.controller.js`, `api/models/customer.model.js`.

| Method | Path | Behavior |
|---|---|---|
| POST | `/api/customer` | Insert `PhoneNum`, `FName`, `LName` using object placeholder. |
| GET | `/api/customer` | Return all raw customer records. |
| GET | `/api/customer/:PhoneNum` | Lookup phone; 404 on model `not_found`. |
| PUT | `/api/customer/:PhoneNum` | Construct partial SQL update from supplied phone/name fields. |
| DELETE | `/api/customer/:PhoneNum` | Delete by phone. |
| DELETE | `/api/customer` | Delete all customer rows subject to database constraints. |

These handlers do not check JWTs or employee permissions. They expose a second data-access path distinct from protected account APIs. Customer creation returns `{newCustomer}` rather than a flat customer object. Controllers contain body/nonempty-field checks, but some branches send errors without returning.

### Item routes — 5

Evidence: `api/routes/item.routes.js`, `api/controllers/item.controller.js`, `api/models/item.model.js`.

| Method | Path | Source behavior/status |
|---|---|---|
| POST | `/api/item` | Constructs item and calls `Item.create`; request ID property is `itemId`, model column is `ItemID`. |
| GET | `/api/item` | Calls `Item.getAll`. |
| GET | `/api/item/:ItemId` | Calls nonexistent `Item.findById`; model exports `findByID`; reads mismatched `req.params.itemId`. |
| PUT | `/api/item/:ItemId` | Calls nonexistent `Item.updateById`; model exports `update`; parameter casing also mismatches. |
| DELETE | `/api/item/:ItemId` | Calls existing `Item.remove`, but reads mismatched `req.params.itemId`. |

The model implements create, get-all, get-by-ID, get-by-name, full field update, and delete with placeholders. `findByName` has no HTTP route. No route enforces the README's menu-edit permission level. `item.service.js` additionally calls DELETE `/item` and GET `/item?title=...`; no delete-all route exists and the list controller does not implement title filtering.

### Location routes — 2

Evidence: `api/routes/location.routes.js`, `api/controllers/location.controller.js`, `api/models/location.model.js`.

| Method | Path | Behavior |
|---|---|---|
| GET | `/api/location/all` | `SELECT * FROM LOCATION`. |
| GET | `/api/location/names` | Select `Name, Postal, Street, City, Province`. |

The `getDistinguish` name does not indicate SQL `DISTINCT`: the query projects identifying fields without deduplication. Both endpoints are public. No location creation/update/deletion API is registered.

### Reservation routes — 9

Evidence: `api/routes/reservation.routes.js`, `api/controllers/reservation.controller.js`, `api/models/reservation.model.js`.

| Method | Path | Behavior/status |
|---|---|---|
| POST | `/api/reservation` | Maps `Customer, NumPeople, Location, Type, DateTime` into model and inserts. Logs request body. |
| POST | `/api/reservation/update` | Expects `{updatedReservation, previousReservation}`; update by previous customer/location/date. |
| GET | `/api/reservation/all` | All reservations. |
| GET | `/api/reservation/phone/:phone` | Reservations matching customer phone. |
| PUT | `/api/reservation/update/:customerEmail/:dateTime` | Calls the same body-based update handler; URL parameters are not consumed by that handler. |
| DELETE | `/api/reservation/delete/:Customer/:Location/:Datetime` | Delete by composite identity; 404 when no row affected. |
| GET | `/api/reservation/update/get/:Customer/:Location/:Datetime` | Composite lookup; returns first row, or JSON null if absent. |
| GET | `/api/reservation/location/:location` | Reservations at location. |
| GET | `/api/reservation/times/:location` | Incomplete: controller does not forward location; model references an undefined `location` and sorts on a column absent from reservation schema. |

No reservation route checks authentication/authorization. Updates translate MySQL `ER_NO_REFERENCED_ROW` and `ER_NO_REFERENCED_ROW_2` into 400 with an invalid-customer message; a location foreign-key failure can receive that same message. Other update errors use 500. The model's `not_found` update error takes that generic 500 branch rather than the handler's later `!data` 404 branch.

Unconnected model methods include `updateByCustomerAndDatetime` and `getReservationsByLocationDate`; the latter's proposed route/controller code is commented out. The `customerEmail` naming in the older update method is inconsistent with the phone-based schema. Client `getAllTimesForLocation` calls `/times/location/:location`, which does not match the registered `/reservation/times/:location`.

### Special inquiry routes — 2

Evidence: `api/routes/special_reservation.routes.js`, `api/controllers/special_event.controller.js`, `api/models/special_reservation.model.js`.

| Method | Path | Behavior |
|---|---|---|
| POST | `/api/specialRes` | Insert `Customer, Location, Description, TimePlaced, TimeRequested`. |
| GET | `/api/specialRes/location/:location` | Return inquiries by location; empty results are `[]`. |

Both are public. The controller performs only a body-presence check on create. No update/delete implementation or background processing is supplied. The model returns an `insertId`-derived `id` in creation responses even though this table has no auto-increment column; the same mismatch exists for reservation creation. These are not reliable surrogate reservation/inquiry identifiers.

## Frontend

### Application composition and route inventory

`index.js` creates a React root and nests `App` inside `BrowserRouter` and `AuthContextProvider`. `App` renders the shared navbar, Bootstrap `.container`, and routes. Footer rendering is commented out. No global protected-route wrapper, catch-all/not-found route, or server-rendering implementation is supplied.

| Route(s) | Module and implemented behavior |
|---|---|
| `/`, `/login`, `/employee/login` | `pages/login.jsx`: one component switches customer/employee login by exact pathname; validates nonempty email/password; calls context login; navigates customers to `/` and employees to `/employee`. Root therefore remains a login screen, not a separate restaurant landing page. |
| `/register` | `pages/register.jsx`: customer name/phone/email/password fields, nonempty checks, submit and error display, then login navigation. |
| `/account/:AccountID` | `pages/manage-account.jsx`: account details, loading/error states, edit/save/cancel/delete; customer/employee conditional fields and target lookup. |
| `/employee` | `pages/home-employee.jsx`: employee-only view with reservation link, inquiry link at ≥1, customer list at ≥2, and employee creation at ≥5; other visitors get navigation help. |
| `/employee/createAccount` | `pages/create-employee.jsx`: employee name/email/password/permission form, default permission zero; submits registration and navigates to employee home. The component itself has no authorization guard. |
| `/employee/customerList` | `pages/employee-list-customers.jsx`: permission/type checks and protected API fetch, loading/error/list-selection state; list-rendering defects described below. |
| `/customers` | `components/customers-list.component.js`: legacy raw-customer list; selected customer/index stored, but detail/edit panel and bulk-delete button are commented out. |
| `/add` | `components/add-customer.component.js`: legacy raw customer creation and success/reset state. |
| `/customers/:PhoneNum` | `components/customer.component.js`: raw customer fetch, first/last-name edit, phone display, delete; router hooks injected by `withRouter`. |
| `/menu` | `components/items-list.components.js`: fetch all items, select item, display name/price/ID, link to an unregistered item-edit URL. |
| `/locations` | `pages/locations.jsx`: loading/error handling and full location contact/address list. |
| `/reservation` | `pages/reservation_create.jsx`: regular reservation creation. |
| `/reservation/view` | `pages/reservation_view.jsx`: choose location, fetch/sort bookings ascending by date/time, display customer/party size/type/time, link to edit. |
| `/reservation/update/:location/:DateTime/:Customer` | `pages/reservation_update.jsx`: load by composite identity, edit customer/party/location/type/time, submit old/new records, delete, navigate to updated identity. |
| `/specialreservation` | `pages/special_event_create.jsx`: inquiry phone/location/description/requested date/time form. |
| `/specialreservation/view` | `pages/special_event_view.jsx`: choose location, filter requested date range, sort descending by placement time, display inquiry details. |

There are 18 route declarations mapping to 16 distinct routed component implementations: twelve page files plus four component files. The six files under `components/` are not all reusable UI primitives; four are full screens.

### State and service integration

- `AuthContextProvider` initializes `currentUser` from JSON in localStorage key `user`. Login updates context from API response; an effect persists it. Logout awaits the server call then sets state to null. The JWT is kept in a cookie rather than copied into localStorage; localStorage contains ID/type/permission metadata.
- No startup token-validation request, refresh-token workflow, cross-tab synchronization, or parsing-error guard surrounds persisted user JSON. Metadata can become stale and is not itself authorization proof.
- The shared Axios instance sets `withCredentials: true`, JSON content type, and `REACT_APP_API_BASE_URL || "http://localhost:8800/api"`. Six singleton service classes encapsulate account/customer/item/location/reservation/inquiry calls. No custom interceptors, retry policy, timeout, cancellation, or request cache is configured.
- Functional pages use `useState`, `useEffect`, context, and React Router hooks. Legacy CRUD screens use class state and lifecycle methods. No Redux or other dedicated state-management library is demonstrated.
- Navbar links cover home, locations, menu, reservation creation, inquiry creation, and employee home; login/register switch to account/logout links when metadata exists. Navbar logout initiates the async context call but navigates immediately.

### Account-form details

Registration requires nonempty first/last name, phone, email, and password in JavaScript. Fields cap names at 35 characters, phone at 14, and password at 12; email uses an HTML email input. Login also caps password input at 12 and uses a text email field. Comments explicitly leave stronger phone/email validation as TODOs. These browser limits are not equivalent to API validation.

Employee creation defaults clearance to zero, accepts a number input without a 0–5 range constraint, and performs nonempty identity/password checks. Setting state inside its missing-clearance validation does not rewrite the already-created submission object.

Account management chooses customer lookup for customer users. For employees managing their own ID it fetches employee data; when managing another ID, clearance ≥5 tries employee lookup first and falls back on 404 to customer lookup if clearance ≥2. It presents edit fields as placeholders and constructs sparse updates. Customers see past-order count, while the UI exposes its editor only to employees. Other-employee clearance editing is exposed when the logged-in ID differs from the target. Password display is masked and blank input is intended to keep the old value.

The page calls deletion/logout service promises without awaiting them, so navigation and local state do not reliably reflect server completion. It calls the service logout directly rather than the context logout, leaving `currentUser` metadata uncleared in this path. Several error handlers read `err.result.data.message`, unlike Axios's `err.response`; one lookup reads `cErr.status` instead of `cErr.response.status`. These are static failure-handling defects, not observed test results. Its unchanged-field cleanup schedules state updates and then submits existing state; omission of unchanged fields is not guaranteed within that same event.

### Reservation and inquiry details

- Creation fetches **all customer records** to check membership locally. It requires exactly ten digits for phone, a chosen location, positive numeric party size, a date, a future date/time, and a selected time constrained to 09:00–22:00. There is no creation-time maximum party-size check or integer-only check.
- Creation defaults `type` to `Regular` and has no type selector. It sends `NumPeople` in the API body; the model maps this to its lower-case `numPeople` property. Successful creation resets fields but puts its success string in the same error state rendered with danger styling.
- Creation's helper expects 12-hour time tokens even though an HTML `time` input supplies 24-hour values. This mixes formats rather than establishing a thoroughly normalized time policy.
- Update requires party size >0 and <20 but does not actually test integrality; its error text says integer. It checks parseable/future dates, permits hours ≥9 and <22, and validates phone membership against the downloaded customer list. Its bound is thus different from creation's inclusive 22:00 bound.
- Update allows `Regular` or `Special` in the ordinary reservation table. A `Special` type value does not automatically create a `SP_EVENT_INQUIRY` row.
- Update converts dates to locale strings, then reparses expecting month/day/year, comma-space, and AM/PM. This is locale-sensitive. A separate helper applies `getTimezoneOffset() * 60000` before populating `datetime-local`. The report does not infer a business timezone from these browser operations.
- Update mutates the old/new state objects' timestamp properties before posting. Delete starts a request and navigates without awaiting it. Request errors in the promise catch are logged without setting the visible error message.
- Reservation service URL-encodes the three deletion path segments. Other composite lookup/update-link construction uses interpolated values and browser date formatting.
- Inquiry creation uses `new Date().toISOString().slice(0,19).replace("T"," ")` for placement time and concatenates requested date/time. This combines a UTC-derived value with local-input-style values without a documented timezone policy. It removes whitespace from the selected postal code. State initializes `Location`, while the form uses lower-case `location`; selection creates the lower-case property used by submission.
- Inquiry creation validates that the selected location resolves, but does not implement the ordinary reservation form's future-time, phone-membership, or business-hour checks. The backend accepts both timestamps from the client.
- Inquiry viewing filters `TimeRequested` inclusively against selected date boundaries and sorts `TimePlaced` descending. A date-only upper boundary parses to the start of that date, not an explicit end-of-day boundary. Changing date filters triggers another location query because the filters are effect dependencies. List keys use `reservation.Id`, which is absent from the provided inquiry schema/query.

### Presentation and retained scaffolding

`style.scss` defines shared navy/dark-blue/gray/white color variables, button intent classes, horizontal/vertical button groups, navbar layout, account-form rows, errors, card-like lists, and reservation/inquiry form/list styles. Responsive rules at `max-width: 768px` reduce list/form margins and padding. This demonstrates particular responsive adjustments, not full cross-device validation. Bootstrap CSS is imported globally; Bootstrap JavaScript components are not imported.

A substantial Sass section explicitly derives from the Lama Dev blog tutorial and contains `.home`, `.single`, and `.add` blog/editor selectors. The app does not mount corresponding blog pages, and its root div does not use `.app`, under which many tutorial rules are nested. These styles are not evidence of implemented blog/editor features.

The logo PNG is 2000×1247 pixels and is imported into navbar and footer. Public icons are 192×192 and 512×512 PNGs plus a multiresolution favicon. Public metadata remains CRA-branded; robots allows crawling (`Disallow:` empty). A manifest with standalone display exists, but no service worker/offline workflow is registered. Logo authorship, responsive usability, accessibility conformance, and visual design validation are not established. Images in navbar/footer lack alt text in source; the logout control is a clickable span rather than a button.

## Database / Data Engineering

### Schema sources and scope

The root README defines five tables: `CUSTOMER`, `ACCOUNT`, `CUSTOMER_ACCOUNT`, `EMPLOYEE_ACCOUNT`, and `ITEM`. `createDatabase.sql` defines fifteen with `IF NOT EXISTS`, plus database/user creation and a database grant. These are manual setup artifacts, not versioned migrations. The SQL script does not seed records, reconcile existing table definitions, or record schema versions.

The README grants SELECT/INSERT/DELETE/UPDATE to a local database user; the SQL script grants ALL PRIVILEGES on the restaurant database. Both define a localhost-scoped user. The script's broader privileges are not equivalent to a least-privilege deployment. Exact credential values are intentionally omitted here.

### Full table inventory

In the following table, columns are NOT NULL unless explicitly marked nullable. Primary-key and foreign-key behavior is stated as declared SQL, not proof that this schema has been installed.

| Table | Columns | Key/relationship and application usage |
|---|---|---|
| `LOCATION` | `Name VARCHAR(255)`, `Email VARCHAR(255)`, `PhoneNum VARCHAR(14)`, `Street VARCHAR(255)`, `City VARCHAR(255)`, `Province VARCHAR(255)`, `Postal CHAR(6)` | PK `Postal`; read API and reservation selectors. Postal code is the location identifier, so distinct locations cannot share that key in this design. |
| `ACCOUNT` | `AccountID INT AUTO_INCREMENT`, `Email VARCHAR(254)`, `Password VARCHAR(60)` | PK `AccountID`; credential base for both account subtypes. Email is not declared UNIQUE. |
| `CUSTOMER` | `PhoneNum VARCHAR(14)`, `FName VARCHAR(35)`, `LName VARCHAR(35)` | PK phone; customer CRUD and booking reference. |
| `CUSTOMER_ACCOUNT` | `AccountID INT`, `Customer VARCHAR(14)`, `NumPastOrders INT DEFAULT 0` (nullable in DDL) | PK account ID; FK account → ACCOUNT with delete cascade; FK customer → CUSTOMER phone with delete and update cascade. `Customer` is not separately declared UNIQUE. |
| `EMPLOYEE_ACCOUNT` | `AccountID INT`, `FName VARCHAR(35)`, `LName VARCHAR(35)`, `PermissionLevel INT DEFAULT 0` (nullable in DDL) | PK/FK account → ACCOUNT, delete cascade. No SQL clearance range constraint. |
| `ORDER_T` | `OrderID INT`, `Customer INT`, `Type VARCHAR(10)`, `TimePlaced TIMESTAMP`, `Notes TEXT`, `Location CHAR(6)` | PK order ID, not auto-increment; customer FK → CUSTOMER_ACCOUNT account ID; location FK → LOCATION with delete cascade. Schema only. |
| `REWARD` | `Customer INT`, `Name VARCHAR(50)`, `ExpiryDate DATE`, `DiscountPerc INT`, `Qty INT` | Composite PK customer/name/expiry; customer FK → CUSTOMER_ACCOUNT account ID. No percentage/quantity checks. Schema only. |
| `ORDER_REWARDS` | `Customer INT`, `Name VARCHAR(50)`, `ExpiryDate DATE`, `Ordr INT` | Composite PK customer/name/expiry; composite FK → REWARD. `Ordr` has no FK to ORDER_T and is not part of the PK. Schema only; this key permits only one mapping row per reward key. |
| `ITEM` | `ItemID INT AUTO_INCREMENT`, `Name VARCHAR(255)`, nullable `Description TEXT`, nullable `Picture VARCHAR(255)`, `Price DECIMAL(10,2)` | PK item ID; menu model/UI. Picture is a string field, not an upload pipeline. |
| `RESERVATION` | `Customer VARCHAR(14)`, `numPeople INT`, `Location VARCHAR(6)`, `Type VARCHAR(25)`, `DateTime DATE` | Composite PK customer/location/date; FKs → CUSTOMER phone and LOCATION postal, without explicit cascades. Active reservation code supplies date-and-time strings, conflicting with declared DATE storage. |
| `WAITLIST_POSITION` | `Customer VARCHAR(14)`, `Location CHAR(6)`, `NumberOfPeople INT`, `Position INT` | Composite PK customer/location; FK customer → CUSTOMER_ACCOUNT customer phone and location → LOCATION, both delete cascade. No uniqueness on location/position. Schema only. |
| `ITEM_TAGS` | `Item INT`, nullable `Tag VARCHAR(255)` | FK item → ITEM; no explicit primary/unique key. Schema only. |
| `ORDER_ITEMS` | `Ordr INT`, `Item INT` | FK order → ORDER_T; no item FK, quantity column, or explicit primary/unique key. Schema only. |
| `SP_EVENT_INQUIRY` | `Customer VARCHAR(14)`, `Location CHAR(6)`, `Description TEXT`, `TimePlaced DATETIME`, `TimeRequested DATETIME` | PK customer phone alone; FKs → CUSTOMER_ACCOUNT customer phone and LOCATION, both delete cascade. Inquiry API uses this table. The PK restricts a customer to one row across all locations/times. |
| `ITEM_AVAILABILITY` | `ItemID INT`, `Location CHAR(6)`, `AvailDelivery BOOLEAN`, `AvailForPickup BOOLEAN` | Composite PK item/location; FKs → ITEM and LOCATION, both delete cascade. Schema only. |

There are **13 explicit primary-key clauses**, **17 foreign-key clauses**, **2 auto-increment declarations**, **10 delete-cascade clauses**, and **1 update-cascade clause** in this SQL file. `ITEM_TAGS` and `ORDER_ITEMS` have no explicit PK. No standalone `CREATE INDEX`, explicit secondary-index declaration, UNIQUE constraint, CHECK constraint, trigger, procedure, view, or migration runner is provided. MySQL's indexes required/generated for keys are database behavior, not custom query-optimization work.

### Modeling and integrity implications

- The account/subtype structure is relational specialization: customer accounts join credential records to phone-keyed customer records, while employee subtypes store employee names/clearance. It does not have a general roles/permissions join table.
- Customer records can exist without accounts through `/api/customer`. However, registration rejects an already-existing phone instead of attaching an account to that customer record. Ordinary reservations reference CUSTOMER; inquiries require a phone present in CUSTOMER_ACCOUNT.
- Code comments assume one customer account per customer, but only account ID is the customer-account PK. The database does not declare phone unique in CUSTOMER_ACCOUNT. Account email uniqueness likewise relies on pre-insert application lookup rather than a unique constraint; concurrent requests can race.
- Reservation DATE storage cannot preserve the time-of-day used by the UI. With that exact schema, composite uniqueness is by customer/location/day, not separate reservation times. Actual server SQL mode and live schema are unknown, so timestamp coercion/error behavior was not experimentally verified.
- Changing a customer's phone cascades into CUSTOMER_ACCOUNT, but no update cascade is declared for RESERVATION's direct customer reference or for the waitlist/inquiry references to customer-account phone. Existing dependent rows can therefore obstruct an otherwise intended phone change.
- Deleting customer/account/location/item rows can be blocked by noncascading relationships. The code's expectation that deleting a customer/account completes cleanly is not universal once orders/rewards/reservations exist.
- Table creation uses uppercase table names, while account/customer/item model queries often use lowercase. LOCATION/RESERVATION/SP_EVENT_INQUIRY queries use uppercase. Compatibility depends on the MySQL server's identifier/case configuration; cross-platform equivalence is not verified.
- `IF NOT EXISTS` makes repeated create attempts avoid recreating existing named objects; it is not a schema migration/reconciliation mechanism.

### Queries and data transformations

`CustomerAccount.getAll` selects account ID/email/name/phone/order count using `(account NATURAL JOIN customer_account) JOIN customer ON Customer=PhoneNum`. `EmployeeAccount.getAll` uses `account NATURAL JOIN employee_account` and excludes password. Individual customer-account reads make three successive model lookups; employee detail reads make two, in addition to any authorization lookup.

Account/customer/subtype partial-update builders omit undefined fields. Item update replaces its four mutable fields in one placeholder query. Reservation update uses old composite keys and new values in one parameterized statement. Reservation/inquiry filtering is mostly SQL equality by customer/location, with sorting/date-range filtering in the browser. No application pagination, batch processing, ETL, dataset import/export, synchronization, checkpointing, or data warehouse workflow is present.

## External Integrations

1. **MySQL database:** mysql2 creates one connection using environment/default host/user/password/database settings; models submit SQL through it. This is the only external persistence service directly integrated by backend application code.
2. **Frontend-to-project API:** Axios sends JSON requests to the configured Express URL with credential cookies. This is an internal application boundary, not a third-party SaaS integration.
3. **Container images/package distribution:** Dockerfiles/Compose reference Node, MySQL, and Nginx images and run npm installs. These are build/runtime dependencies, not external business APIs.

No payment gateway, email/SMS delivery, map provider, OAuth provider, cloud storage SDK, analytics collector, or third-party reservation service call is present in the inspected application source. Tutorial hyperlinks and the README's linked report document are documentation references, not live integrations. External pages were not needed to establish repository behavior and were not used as evidence here.

## Reliability / Failure Handling

### Implemented mechanisms

- Most query callbacks log errors and propagate error/data results; many lookup/update/delete models return a `kind: "not_found"` marker or use `affectedRows` to detect absent targets.
- Controllers translate a subset of errors into 400/401/403/404/409/500 responses. Login does not distinguish nonexistent email from wrong password in its public error message.
- Registration performs duplicate checks before creation and attempts compensating deletions after downstream insert failures.
- Reservation updates explicitly recognize two foreign-key error codes. Composite identity is retained during changes so the UPDATE can locate the original row.
- Some frontend screens display loading, empty, success, and error states; other failures only reach console output. Locations use `finally` to clear loading state.
- Compose gives API and database `restart: unless-stopped`; database files are intended to persist in a named volume. These are container-manager mechanisms, not custom recovery algorithms.

### Verified weaknesses and their implications

| Source finding | Evidence | Implication/limit |
|---|---|---|
| No transaction around multi-table account operations | Account controllers and model SQL | Registration/update/deletion can partially complete; no atomic rollback guarantee. |
| Cleanup calls omit callbacks | Customer registration calls `Customer.remove(phone)` / `Account.remove(id)`; employee registration calls `Account.remove(id)` | Models later invoke `result(...)`; error-cleanup paths can themselves throw. No runtime recovery success is established. |
| Account insert and `SELECT LAST_INSERT_ID()` are enqueued separately | `Account.create` | A failed insert does not prevent the subsequent select; callback can be invoked for both paths and can return a previous connection-local ID. This is separate from the normal successful sequential-query case. |
| Account update sends success immediately after scheduling database callbacks | `update` helpers in both account controllers | Client can receive success before completion; a later callback may attempt another response. |
| Several customer model error branches call `result(null, err)` | `Customer.getAll`, `updateByPhone`, `remove`, `removeAll` | Controllers may treat SQL errors as successful data. |
| Account-list model empty branch does not return | `CustomerAccount.getAll`, `EmployeeAccount.getAll` | Empty results invoke error callback and then success callback; handlers can attempt duplicate responses. |
| Validation error responses do not always return | Customer create/update and item update controllers | Processing may continue after sending 400. |
| Dynamic customer UPDATE has incomplete comma logic and unquoted phone values | `Customer.updateByPhone` | Phone+last-name without first-name produces an invalid SET sequence; formatted/alphanumeric phone strings are mishandled. |
| Truthy field gates | Both account controllers | Numeric zero for order count or permission is treated as absent in some paths. String `"0"` behaves differently; consistent typed validation is absent. |
| Unmatched item methods/parameter casing | Item routes/controller/model | GET-one/PUT cannot call their intended model methods; delete does not retrieve the registered ID parameter correctly. |
| Reservation times endpoint has undefined variable and wrong column | `Reservation.getAllTimesForLocation` | Function cannot execute as intended; SQL references `TimeRequested`, which belongs to inquiries, not RESERVATION. |
| Reservation not-found update maps to generic error | Reservation controller `updateReservation` | Model `not_found` is treated as 500 rather than the intended later 404. |
| Employee customer-list map has no return and reversed entry semantics | `employee-list-customers.jsx` JSX `Object.entries(...).map` | No list items are returned; key string is treated as customer object and value as index. Search state exists without search implementation, and selection does not lead to an edit screen. |
| Item edit/legacy delete navigate to missing frontend routes | `items-list.components.js` → `/items/:id`; `customer.component.js` → `/tutorials` | Navigation targets have no matching `App.js` route. |
| Legacy customer creation expects a flat response and stores `PhoneNumber` | `add-customer.component.js` versus model `{newCustomer}` | Returned fields do not map to expected state. |
| Asynchronous operations are not consistently awaited | Navbar, account deletion, reservation deletion | Navigation/error handling can occur before operation outcome; no verified recovery UI. |
| Locale-dependent parsing and DATE/DATETIME mismatch | Reservation pages and SQL | Date/time round trips and key matching are not reliably established across locales/schema variants. |
| Startup database failure throws | `api/models/db.js` | No connection retry/reconnect/backoff or graceful startup readiness strategy is implemented. |

No application retry limit, exponential backoff, dead-letter queue, checkpoint, resumability, idempotency key, stale-job recovery, optimistic-lock version, or deduplication job is present. Duplicate primary keys are left to database errors beyond the explicit account prechecks. Logging uses console methods with no custom severity routing, retention, structured-log schema, request correlation, tracing, or alerting integration.

## Security

### Demonstrated controls

- bcrypt salt cost **10** for registration and password updates, with synchronous hash/compare calls. Algorithm implementation belongs to bcryptjs; application code chooses and invokes it.
- Signed JWT cookie authentication on account detail/list/update/delete operations. Customer token payload includes ID/type; employee token also includes permission.
- Login sets `access_token` with `httpOnly: true`. Browser JavaScript uses returned metadata, not direct JWT access.
- Cross-account customer authorization requires employee database clearance ≥2; cross-account employee authorization requires ≥5. The server re-reads employee clearance for those decisions rather than trusting only the permission payload/localStorage.
- Employee self-update rejects a truthy submitted `PermissionLevel`. Password fields are omitted from successful account detail/list payloads.
- Many item/reservation/inquiry writes/lookups and deletion methods use mysql2 placeholders. Credentialed CORS restricts the configured browser origin.

### Coverage gaps visible in source

- JWT signing/verifying uses a fixed literal secret in both account controllers; no secret environment variable or rotation mechanism is present. Tokens have no explicit expiry option, refresh flow, revocation list, or password-change invalidation.
- Login cookie options do not explicitly set Secure or SameSite. Logout clears with `sameSite: "none", secure: true`, different from login options. Actual cookie behavior depends on browser/protocol and was not verified.
- Employee registration accepts requested permissions without authentication. UI hiding at level 5 does not protect the registration route or page.
- Raw customer APIs, including delete-all; item APIs; reservation APIs; and special-inquiry APIs do not enforce authentication/permissions. Location APIs are also public. Protected account endpoints do not close these alternate access paths.
- Customer account owners can submit `NumPastOrders` directly: the server does not reproduce the UI's employee-only edit restriction.
- Multiple account/customer/subtype queries interpolate request-derived values directly into SQL. Parameterization is inconsistent; the repository does not support a claim of general SQL-injection prevention.
- Input validation is primarily browser-side or body-presence/truthiness checks. There is no centralized server schema validator, permission range validation, robust email/phone validation, or server booking-hour/party-size enforcement.
- Employee registration logs the entire request body, including the submitted password. Account model/controller diagnostics log account objects containing password hashes; customer/reservation records and identity data are also logged. There is no redaction mechanism.
- Root `.env` is tracked and includes a database password setting; the database config/sample also contain literal fallback/example credentials. No secret manager is configured.
- No explicit CSRF token, login throttling, account lockout, security-header middleware, TLS termination, or audit trail is configured in project code. CORS alone is not proof of API authorization or CSRF protection.

These are evidence-backed limits of the implementation, not claims that exploitation occurred. No penetration test or current dependency vulnerability assessment was performed.

## Testing / Quality

### Supplied tests and tooling

- **One project test declaration** was found: `test('renders learn react link', ...)` in `client/src/App.test.js`. The count is from inspecting application test files outside vendor directories and counting the single `test(...)` body. Vendor package tests are excluded.
- This is the retained CRA scaffold test. It renders `<App />` and expects `/learn react/i`; the app no longer renders that text and now needs router/authentication providers not supplied by this test. Static inspection indicates it is stale, not application feature coverage. It was not executed, so this is not a recorded failing test run.
- `client/src/setupTests.js` imports jest-dom matchers. Testing Library React is used in the test; user-event is declared but not used there.
- `client/package.json` exposes `react-scripts test`, start/build/eject scripts, and CRA ESLint presets `react-app` / `react-app/jest`. There is no separate custom lint script or project-specific lint-rule file.
- Backend `npm test` is the placeholder command that prints “Error: no test specified” and exits 1. No backend unit/integration tests, API contract tests, database fixtures, browser end-to-end tests, load tests, coverage reports, or project CI checks were found outside vendor material.
- Browser targets are production `>0.2%`, `not dead`, `not op_mini all`; development targets the last Chrome/Firefox/Safari versions. This is build configuration, not demonstrated cross-browser test coverage.

### Investigation validation

`node --check` passed for **24 backend JavaScript files**: server (1), configuration (1), model-directory files including DB connection (9), controllers (7), and routes (6). It checks parse syntax only; it does not resolve controller method correctness, exercise handlers, contact MySQL, or validate authorization.

No app test suite/build/linter was run, because those commands could create caches/build output or otherwise alter the supplied tree. Counts, route/model correspondence, schema references, environment wiring, and file inventory were checked with read-only commands. No claim of runtime test coverage or working deployment follows from these checks.

The root README says frontend npm-audit findings are false positives and recommends `npm audit --production`. No supporting audit output exists in the repository. That statement is recorded as documentation, not accepted as a verified security conclusion.

## Deployment / Infrastructure

### Configured topology

`docker-compose.yml` declares three services:

| Service | Configuration |
|---|---|
| `mysqldb` | `mysql:5.7`; unless-stopped restart; root `.env`; root password/database environment; host/container port mapping; named `db:/var/lib/mysql` volume; references network `backend`. |
| `api` | Build `./api`; depends on mysqldb; unless-stopped restart; root `.env`; DB host set to `mysqldb`; DB user/password/name/port and client origin passed; references `backend` and `frontend`. |
| `client` | Build `./client`; depends on API; passes `REACT_APP_API_BASE_URL` as build argument; exposes frontend mapping; references `frontend`. No restart policy is specified. |

`api/Dockerfile` uses Node 14, working directory `/api`, copies `package.json`, runs `npm install`, copies the directory, and executes `npm start`. There is no explicit start script in `api/package.json`; a `server.js` entry file exists and the setup relies on npm's conventional fallback. The project does not define a custom start command.

`client/Dockerfile` uses Node 14 to install/build React, embeds API URL via ARG/ENV, then copies `/client/build` into `/usr/share/nginx/html` in Nginx 1.17.0 Alpine. Nginx runs in the foreground. Bundling/minification is CRA behavior, not custom compiler implementation.

### Environment contract

| Setting/source | Value or behavior demonstrated |
|---|---|
| Backend local DB defaults | Host localhost, user [database username omitted], database restaurant, literal password fallback; source `api/config/db.config.js`. |
| Backend listen | Reads `PORT`, default 8800; source `api/server.js`. |
| Local frontend API fallback | `http://localhost:8800/api`; source `client/src/http-common.js`. |
| CORS fallback | `http://localhost:3000`; source `api/server.js`. |
| Root `.env` DB ports | Host 3307 → container 3306. |
| Root `.env` API ports | Host 6868 → container 8080. |
| Root `.env` client ports | Host 8888 → container 80. |
| Root `.env` browser origin/API | HTTP origin at private address `[private address omitted]:8888`; API at same address port 6868 with `/api`. This is evidence of configured private-network addressing, not proof of a VM platform or successful deployment. |
| `api/.env.sample` | DB host/user/password/name plus DB_PORT=3306, NODE_DOCKER_PORT=8800, CLIENT_ORIGIN=http://localhost:8801. |

### Deployment gaps

1. Compose service definitions reference `backend` and `frontend`, but the top-level `networks:` block has no definitions. This is incomplete network configuration, not two successfully provisioned networks.
2. Root `.env` maps API container port 8080, but the server listens on default 8800 because no `PORT` override is configured. `NODE_DOCKER_PORT` does not control `server.js`.
3. `DB_PORT` is present in Compose/sample but is not included in `db.config.js` or `mysql.createConnection` options.
4. Database service config supplies root password and database, but does not pass `MYSQL_USER`/`MYSQL_PASSWORD` for the API's configured non-root user. There is no init-script mount. The SQL's localhost user is not evidence of a network-accessible account provisioned for the API container.
5. `createDatabase.sql` is not wired into image initialization or Compose startup. The README setup lacks the location/reservation/inquiry tables needed by later application routes.
6. `depends_on` declarations express ordering, but no health checks/readiness conditions are configured. The API throws on connection failure; retry behavior is limited to container restart policy.
7. Nginx has no supplied custom config for React Router history fallback or API proxying. Successful direct navigation to nested SPA URLs is not established by these files.
8. Client Dockerfile uses `EXPOSE $REACT_DOCKER_PORT`, but that variable is not declared as an ARG/ENV in the image build; Compose supplies only the API URL build argument. It is not a verified exposure configuration.
9. Both images run `npm install` after copying only package.json, rather than installing from the lockfile at that step. Lockfiles are copied later with the rest of the directory. Reproducible dependency installation is therefore not established by the Docker recipes.
10. No `.dockerignore` is present. `COPY . .` can include local dependency directories and other build-context files. The repository actually tracks some API node_modules files.

No hosted domain, cloud provider configuration, Kubernetes resources, CI/CD workflow, automated release script, TLS certificate setup, deployment log, backup/restore procedure, or production rollout record is present. Existing configuration is not proof that the system was deployed or maintained in production.

## Performance / Scale

No measured latency, throughput, record volume, concurrent-user count, production user count, uptime, bundle size, or performance improvement is recorded in project artifacts.

Verifiable implementation characteristics are:

- **One shared MySQL connection** created in `api/models/db.js`; no pool/replica/shard configuration. This describes architecture, not benchmarked concurrency capacity.
- All-list queries lack LIMIT/OFFSET. Reservation forms download the full customer list; menu, locations, accounts, and location-specific reservation/inquiry lists have no pagination.
- Browser arrays perform sorting/filtering. Special-inquiry date-filter changes trigger refetches. No pagination or indexed date-range query optimization is implemented for that UI.
- Synchronous bcrypt cost-10 hashing/comparison executes in request handling. Potential event-loop delay under load is a technical implication; no timing is measured.
- Account detail reads involve multiple sequential lookups; no aggregate account-detail join or application cache is used for those handlers.
- `reportWebVitals.js` can register CLS/FID/FCP/LCP/TTFB callbacks, but `index.js` calls it without a callback, so the measurement branch is not enabled. There are no stored web-vital results.
- Three Compose service declarations, one API application instance declaration, and one database volume describe intended topology only. No scaling/replica configuration or resource limits are supplied.

## Technical Challenges / Complexity

The following aspects require coordination across application layers; their presence does not imply all related edge cases are solved:

- **Account specialization:** identity/credentials span two tables for employees and three for customers. Registration, detail retrieval, sparse updates, and cascaded deletion need consistent keys and error sequencing. The current code implements orchestration but lacks transactional completion guarantees.
- **Own-account versus administrator access:** a single account-management UI targets customer or employee IDs, while backend handlers distinguish owner access from permission-based employee access. UI metadata and database authorization checks serve different roles, with visible coverage gaps.
- **Mutable composite booking identity:** reservation customer/location/date fields are both editable values and row identifiers. Preserving previous identity for WHERE conditions is meaningful implementation work; schema/time conversion mismatches complicate it.
- **Browser/SQL date-time conversion:** date input, time input, locale strings, ISO strings, URL keys, and SQL DATE/DATETIME fields are connected by explicit transformations. Existing code shows the complexity but does not establish locale/timezone correctness.
- **Two customer representations:** standalone phone-keyed customer records and registered customer accounts have different lifecycle and foreign-key implications. Ordinary reservations and special inquiries reference different levels of that model.
- **Cross-origin cookie sessions:** client credential configuration, server CORS origin, login cookie, JWT verification, and persistent browser metadata must align. Container/browser URLs and cookie options add deployment constraints.
- **Browser and container networking:** internal DB hostname, externally reachable API URL, frontend origin, container ports, and build-time frontend configuration need separate treatment. Several inconsistencies remain visible.

No low-level systems programming, distributed consensus, custom cryptography, ETL engine, distributed job processing, or fault-tolerant synchronization implementation is demonstrated and none is attributed.

## Documentation / Operational Support

- Root `README.md`: identifies stack and tutorial foundations; gives npm installation/start guidance in API/client directories; supplies database/user creation and five tables; explains permission levels 0–5; includes an external report-document link and an npm-audit note.
- `client/README.md`: CRA-generated development/test/build/eject and documentation links. Its descriptions of bundling/minification are framework documentation, not evidence of custom build optimization or deployment.
- `api/.env.sample`: local DB and CORS examples, although the documented port variable does not match the server's `PORT` input.
- Account controllers/models and several frontend pages include comments describing accepted fields, returned fields, authorization intent, callback contracts, and tutorial provenance. Some comments are stale, such as references to email for phone-keyed reservations and copied customer wording in item validation.
- Employee home, account-management forms, reservation update/delete screen, and inquiry viewer provide administrative UI surfaces. No standalone CLI admin tool, recovery endpoint, maintenance job, data export, or backup utility is supplied.
- Root GET and console startup messages support simple manual inspection; there is no operational runbook, API schema/OpenAPI document, incident log, monitoring dashboard, or dedicated health/readiness endpoint.

### Documented versus enforced permission levels

| Level | README meaning | Demonstrated implementation |
|---|---|---|
| 0 | Waitlist/reservations | Employee home exposes reservations; no active waitlist workflow; reservation backend lacks clearance enforcement. |
| 1 | Adds special reservations | Employee home exposes inquiry link at ≥1; inquiry page/API lacks equivalent enforcement. |
| 2 | Adds customer-account information | Server checks ≥2 for account-list and cross-customer-account operations; employee UI uses same threshold. Raw customer routes remain public. |
| 3 | Adds menu modification | Documented only as a privilege; item writes have no permission checks and item-edit UI route is absent. |
| 4 | Adds location modification | Documented only; no location write endpoint/UI. |
| 5 | Adds employee account creation/modification | Cross-employee-account get/list/update/delete use ≥5 and employee home hides creation link below 5; registration handler/page themselves are unguarded. |

These are six documented numeric levels and two login account types, not six fully implemented and comprehensively secured roles.

## Quantifiable Evidence

| Metric | Value | Evidence / counting method |
|---|---:|---|
| API business route registrations | 37 | Active `router.get/post/put/delete` statements in six `api/routes/*.js` files; commented route excluded. |
| Total app HTTP registrations including root | 38 | 37 above plus `app.get("/")` in `api/server.js`; excludes implicit framework routes. |
| Account/customer/item/location/reservation/inquiry route breakdown | 13 / 6 / 5 / 2 / 9 / 2 | Corresponding route files; each explicit method/path registration counted once. |
| Route modules / controller files | 6 / 7 | File inventory under `api/routes` and `api/controllers`. |
| Domain model files | 8 | `api/models/*.model.js`; excludes connection module `db.js`. |
| SQL tables | 15 | `CREATE TABLE IF NOT EXISTS` statements in initially untracked `createDatabase.sql`. |
| README SQL tables | 5 | Five CREATE TABLE statements in `README.md`; overlapping subset, not five extra distinct tables. |
| Explicit PK / FK clauses | 13 / 17 | Literal declarations in `createDatabase.sql`; composite keys count as one clause. |
| Auto-increment declarations | 2 | ACCOUNT.AccountID and ITEM.ItemID. |
| Delete / update cascade clauses | 10 / 1 | Explicit clauses in `createDatabase.sql`; not observed runtime operations. |
| Frontend route declarations | 18 | `<Route ...>` declarations in `client/src/App.js`. |
| Distinct routed screen implementations | 16 | Twelve page modules plus four screen components; login reused at three routes. |
| Page / component / service files | 12 / 6 / 6 | Inventory under respective `client/src` directories; not a count of every React function. |
| Shared auth context providers | 1 | `AuthContextProvider` in `client/src/context/auth.context.js`. |
| Login account types | 2 | Customer and employee controller/login paths and JWT type values. |
| Documented numeric permission levels | 6 (0–5) | Root README; enforcement coverage differs by feature. |
| Cross-account authorization thresholds | 2 and 5 | Customer/employee account controllers. |
| bcrypt cost | 10 | `genSaltSync(10)` in account register/update code. |
| Browser password/name/phone limits | 12 / 35 / 14 characters | Registration/account input attributes; reservation-create phone instead requires 10 digits. These are UI limits. |
| Reservation update party-size check | >0 and <20 | `reservation_update.jsx`; not integer-only, not applied by backend, not creation maximum. |
| Reservation UI time bounds | Creation 09:00–22:00; update hour ≥9 and <22 | Reservation creation validation/input attributes versus update validation. |
| Compose services / named volumes | 3 / 1 | `docker-compose.yml`; declarations only. |
| Referenced network names / defined named networks | 2 / 0 | `backend` and `frontend` referenced by services; empty top-level networks block. |
| MySQL application connections constructed | 1 | `mysql.createConnection` in `api/models/db.js`; no pool. |
| Backend direct dependencies | 7 | `api/package.json` dependencies. |
| Frontend declared dependencies / dev dependencies | 10 / 1 | `client/package.json`; includes test/helper packages, not eleven custom integrations. |
| Lockfile package entries | API 96; client 1,543 | Number of keys in each lockfile `packages` object, including the root package; not unique top-level libraries or installed-module counts. |
| Project test declarations found | 1 | Single retained test in `client/src/App.test.js`, excluding node_modules. |
| Backend parse checks | 24 passed | Investigation ran `node --check` on server/config/model/controller/route files without executing them. |
| Tracked nonvendor / vendor files at inspection | 77 / 494 | `git ls-files`, split on `/node_modules/`; excludes report and untracked SQL. |
| Custom-used logo dimensions | 2000×1247 pixels | PNG file metadata for `client/src/img/logo.png`; origin unknown. |
| Responsive style breakpoint | 768px | `@media (max-width: 768px)` in `style.scss`. |

No count in this table represents production users, database records, successful requests, performance gains, or historical effort.

## Evidence Map

### Claim: the application is a layered React/Express/MySQL system

Evidence:

- `client/src/index.js` — BrowserRouter/AuthContextProvider/App composition.
- `client/src/http-common.js` — Axios JSON/cookie transport and base URL.
- `api/server.js` — Express middleware and six route modules.
- `api/models/db.js` — single mysql2 connection.
- `api/routes/*`, `api/controllers/*`, `api/models/*.model.js` — route/controller/query relationship.

### Claim: account workflows span multiple relational entities

Evidence:

- `api/controllers/customer_account.controller.js` — `register`, `get`, `update`, `deleteCAccount`.
- `api/controllers/employee_account.controller.js` — corresponding employee lifecycle helpers.
- `api/models/customer_account.model.js` — joined list query and subtype methods.
- `api/models/employee_account.model.js` — account/subtype natural join.
- `createDatabase.sql` — ACCOUNT, CUSTOMER, CUSTOMER_ACCOUNT, EMPLOYEE_ACCOUNT keys/cascades.

### Claim: cookie authentication and partial account authorization are implemented

Evidence:

- Both account controllers — bcrypt calls, `jwt.sign`, `jwt.verify`, `authGet`, `authGetAll`, `authUpdate`, `authDelete`.
- `api/routes/account.routes.js` — public register/login/logout and protected-handler routing.
- `client/src/context/auth.context.js` — response metadata persistence, login/logout.
- `api/routes/customer.routes.js`, other domain controllers — alternate APIs without token checks.

### Claim: reservations use mutable composite identities and explicit date conversion

Evidence:

- `api/models/reservation.model.js` — `update`, composite lookup, `deleteReservation`.
- `client/src/pages/reservation_view.jsx` — `generateReservationIdentifier`, chronological sorting.
- `client/src/pages/reservation_update.jsx` — old/new state, conversion helpers, validation, update/delete.
- `client/src/services/reservation.service.js` — nested update payload, encoded deletion URL.
- `createDatabase.sql` — composite reservation primary key and DATE mismatch.

### Claim: special inquiries are distinct from ordinary reservations

Evidence:

- `api/models/special_reservation.model.js` — SP_EVENT_INQUIRY insert and location lookup.
- `api/controllers/special_event.controller.js` / `api/routes/special_reservation.routes.js` — two-route surface.
- `client/src/pages/special_event_create.jsx` — placement/request time construction and postal normalization.
- `client/src/pages/special_event_view.jsx` — requested-date filters and placement sorting.
- `createDatabase.sql` — inquiry fields, account-phone FK, customer-only PK.

### Claim: the database design exceeds the implemented workflow scope

Evidence:

- `createDatabase.sql` — ORDER_T, REWARD, ORDER_REWARDS, WAITLIST_POSITION, ITEM_TAGS, ORDER_ITEMS, ITEM_AVAILABILITY.
- `api/server.js` and route inventory — no corresponding services/routes registered.
- `client/src/App.js` — no order/reward/waitlist/availability screen routes.

### Claim: some feature surfaces are incomplete or internally inconsistent

Evidence:

- Item route/controller/model files — ItemId/itemId and findById/findByID/updateById/update mismatches.
- `reservation.model.js` — undefined location and invalid times-query ordering column.
- `employee-list-customers.jsx` — map callback does not return JSX.
- `items-list.components.js`, `customer.component.js`, `App.js` — links/navigation to unregistered paths.
- Account controllers/models — premature update success, callback omissions, empty-list double callbacks.

### Claim: containerization is configured but deployment is not established

Evidence:

- Both Dockerfiles — Node API and multistage React/Nginx recipes.
- `docker-compose.yml` — three services, volume, dependencies, missing named-network definitions.
- `.env` versus `api/server.js` — 8080 container mapping versus 8800 default listener.
- `api/config/db.config.js` — DB_PORT not consumed.
- Compose and SQL — no database initialization mount/non-root user provisioning for container access.

### Claim: test coverage is scaffold-only in the supplied application files

Evidence:

- `client/src/App.test.js` — one learn-react assertion.
- `client/src/setupTests.js` — jest-dom setup.
- `api/package.json` — explicit failing placeholder test script.
- `client/package.json` — CRA test/lint configuration.
- Nonvendor file inventory — no other test/fixture/CI files.

### Claim: tutorial, vendor, and generated material must be separated from original work

Evidence:

- Root README and source headers — tutorial acknowledgments.
- `client/src/common/with-router.js` — explicit FROM attribution.
- `client/src/style.scss` — labeled tutorial section.
- `client/README.md`, public metadata, test/vitals setup — scaffold content.
- `api/node_modules/*` and lockfiles — dependency/vendor and generated material.

## Git / Development History

Commit history was not analyzed: current files sufficiently reveal the application structure and important limitations, and the user explicitly supplied sole-developer ownership. No authorship, development dates, duration, refactor sequence, historical bug fixes, or deployment chronology is inferred from commits.

Current-state Git evidence establishes that root `.env` and 494 API dependency files are tracked, while `createDatabase.sql` was already untracked before this report. The schema script is therefore identified throughout as working-tree evidence. Comments such as “Corrected property name,” debug prints, unused code, and tutorial remnants show current code content but do not prove when or how debugging/refactoring took place.

## Uncertain / Not Verifiable

- Whether any version of the application has run successfully end to end, and which local/deployed schema was used.
- Actual production hosting, domain, users, restaurant/location count, dataset sizes, request volume, latency, uptime, business impact, or customer outcomes.
- Whether Docker configuration was ever deployed, or whether private address `[private address omitted]` corresponds to any specific virtualization/network environment.
- Live MySQL version, storage engine, SQL mode, table-name case behavior, indexes, permissions, existing schema/data, and whether the standalone SQL has been executed.
- Whether the wider schema tables represent unfinished scope, future plans, or work implemented elsewhere. Only their definitions are present here.
- Historical fixes, test results, manual acceptance tests, current vulnerability status, or successful failure-recovery behavior.
- Exact separation of copied/adapted tutorial lines from original lines; acknowledgments are preserved rather than reverse-engineering authorship.
- Original authorship/license of the logo graphic. API manifest declares ISC, but no standalone repository-wide license document was found; package metadata does not establish asset rights.
- Intended business meaning/rationale of clearance levels, customer phone identity, postal-keyed locations, one-inquiry-per-customer key, and DATE reservation storage beyond the observable code.
- Whether response/callback mismatches or locale issues were encountered by users. They are static findings, not documented incidents.
- Production readiness, complete authorization, offline/PWA behavior, accessibility conformance, mobile usability, and dependency-audit safety are not established.

## Questions Requiring External Context

1. What was the intended operational or educational context, and which workflows were considered required/completed at handoff?
2. Was this application actually run or deployed, and with what database schema, SQL mode, platform, network/port overrides, and initialization steps?
3. Were the schema-only order/reward/waitlist/availability areas intentionally deferred, or implemented in material outside this working tree?
4. What business rules should govern booking capacity, party sizes, operating hours, timezones, repeated inquiries, and customer registration versus standalone customer records?
5. Are there external manual-test results, screenshots, deployment records, operational incidents, or benchmark measurements that can substantiate outcomes beyond source presence?
6. What was the intended database/user provisioning and backup process, if used beyond local development?
7. What is the logo's source/license, and what licensing was intended for the complete project?
8. If actual business/customer impact is relevant, what independently recorded usage or outcome evidence exists?

No ownership question is needed: sole-developer ownership of original project work was supplied explicitly.

## Additional Technical Details

- Both packages are separate npm projects; no root workspace/package manifest is present. API metadata is version 1.0.0, client 0.1.0/private. Neither establishes a release history.
- API/client lockfiles both use lockfile version 3. Their package entries are dependency-resolution metadata, not independent project modules.
- Both `.gitignore` files ignore node_modules, coverage, build, selected local environment filenames, and npm/yarn logs. They do not remove already tracked vendor files. Root `.env` remains tracked.
- The model object names and response casing are not uniformly normalized: Customer creation nests `{newCustomer}`, account creation returns an ID, item/reservation/inquiry creation use `id`, persistent SQL columns use `AccountID`/`ItemID` and mixed reservation casing. Some update model responses retain a misleading `queryPhoneNum` label for an account ID.
- `Account.getAll`, subtype remove/find-by-phone helpers, and item find-by-name exist even when not exercised by a current route. They demonstrate query methods, not additional API endpoint count.
- No actual reward redemption, automatic `NumPastOrders` increment, order placement, payment, waitlist advancement, location edit, menu picture upload/render pipeline, or inquiry confirmation/notification can be credited from table/field presence alone.
- Customer registration's duplicate-phone check conflicts with registering an account for a customer previously added through the legacy raw-customer form. This distinction is preserved because the two workflows remain routed.
- Default employee permission zero is nullable in the DDL. Backend authorization compares values numerically without centralized type/range validation; browser clearance fields likewise do not enforce a declared enumeration.
- The footer is defined and imported but not rendered. Unused imports, search state, commented list controls, and blog-related styles are retained source artifacts, not hidden completed features.
- No existing repository file was repaired during this investigation. Identified defects and operational gaps are documented as part of the technical record rather than silently changed.
