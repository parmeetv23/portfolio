---
project_id: restaurant-management-system
name: "Full-Stack Restaurant Management System"
dates: "Sep. 2024 - Dec. 2024"
categories: ["Full-stack development", "Relational data modeling", "Account authorization", "Reservation workflows"]
technologies: ["JavaScript", "React", "React Router", "Node.js", "Express", "MySQL", "mysql2", "Axios", "bcryptjs", "JWT", "SCSS", "Bootstrap", "Docker", "Docker Compose", "Nginx"]
evidence:
  - evidence/restaurant-management-system/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/projects/restaurant-management-system.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Overview

Restaurant-oriented React/Express/MySQL application, named fullstack-restaurant-site in its source README. Implemented areas include customer records, customer/employee accounts, menu listing and backend CRUD-related code, locations, ordinary reservations, and special-event inquiries. A wider relational schema covers additional concepts without completed matching workflows.

Original adaptation/integration is attributed under the supplied ownership premise. Tutorial-derived code, libraries, generated scaffolding, and schema-only areas remain distinct.

# Core Contributions

- Express route/controller/query layers and React screens with shared Axios services, authentication context, account forms, employee navigation, and booking interfaces.
- Phone-keyed customer CRUD and multi-table account lifecycle orchestration, duplicate checks, bcrypt hashing/verification, JWT cookie login/logout, detail retrieval, sparse updates, and deletion.
- Own-account access and employee-clearance thresholds for cross-account operations, re-reading database clearance and checking self-permission changes.
- Menu listing/detail selection, location listing/selection, reservation creation/listing/edit/deletion, and separate inquiry creation/location viewing.
- Account-specialization schema, composite keys, foreign keys/cascades, decimal prices, wider relational definitions, container/environment configuration, and setup/permission documentation.

# Architecture / Technical Design

React + BrowserRouter + AuthContext → six Axios service wrappers/shared credentialed JSON client → Express middleware/six routers → seven controllers → eight domain query modules → one shared mysql2 connection.

The callback-based CommonJS backend uses direct SQL, not an ORM or connection pool. Frontend screens mix functional and older class components. JWTs reside in an HTTP-only cookie; localStorage holds account ID/type/permission metadata. No startup token-validation or refresh flow is supplied; browser metadata is not authorization proof.

Customer registration composes CUSTOMER, ACCOUNT, and CUSTOMER_ACCOUNT; employees compose ACCOUNT and EMPLOYEE_ACCOUNT. Application email/phone checks precede insertion. Protected customer-account handlers allow self-access or employee clearance **≥2**; protected employee-account handlers allow self-access or clearance **≥5**. These policies do not cover all business APIs.

Intended container topology combines MySQL, API, and built React served by Nginx with a database volume. Browser code directly calls a build-time API URL; no application reverse-proxy configuration is supplied.

# Technical Depth

Reservation updates retain previous and replacement customer/location/date values so SQL can locate an editable composite key. Browser forms validate selected inputs, transform timestamps, sort bookings, and encode deletion identifiers. Supplied reservation DateTime is SQL **DATE**, conflicting with time-of-day UI values. Locale/timezone correctness and round trips are unverified.

Special inquiries use separate placement/request timestamps, description, customer-account phone, and location. The UI normalizes postal whitespace, filters requested dates, and sorts placement times. This is intake/viewing, not approval, notification, or booking conversion. A customer-only primary key limits the supplied table to one inquiry per customer.

The fifteen-table schema includes account/customer specialization, reservations, orders, rewards, waitlist, menu tags/items, and location availability. Orders/rewards/waitlist/availability remain schema-only. Keys/cascades affect phone changes/deletion; email and customer-account phone uniqueness are not fully enforced in DDL. The schema script was initially untracked in the investigated source; execution/live-schema equivalence is unknown.

# Scale / Metrics

- **37 business API method/path registrations** plus one root GET; counts include incomplete endpoints, not successful operations.
- **18 frontend route declarations**, **16 distinct routed screens**.
- **15 SQL table definitions**, **13 primary-key** and **17 foreign-key clauses**; schema counts, not data volume or implemented workflows.
- **Six documented numeric clearance levels (0–5)** and two login account types; partial threshold enforcement, not comprehensive six-role RBAC.
- Three Compose services and one intended database volume; no production user/record/load count or measured outcome.

# Testing / Validation

One stale CRA “learn react” test lacks required current App providers. No backend feature suite, end-to-end tests, coverage, CI, or verified test passes were supplied. Investigation node --check passed for **24 backend JavaScript files**, verifying parse syntax only. No app build/server/database/test run occurred.

# Reliability / Failure Handling

Callbacks propagate selected errors/not-found conditions; controllers map some HTTP statuses, reservation updates recognize foreign-key failures, and screens expose selected loading/error states. Compensating registration deletes are attempted, but multi-table operations lack transactions. Cleanup calls can omit callbacks; account updates can report success before query completion. Atomicity and successful rollback are not established.

Static mismatches include item method/parameter casing, an undefined variable/wrong column in reservation-time lookup, a customer-list map returning no JSX, links to missing routes, locale-sensitive time parsing, and unawaited deletion/navigation. These are source findings, not verified historical incidents or fixes.

Docker recipes/Compose exist, but named networks are undefined, API mapping uses 8080 while the server defaults to 8800, initialization/non-root database provisioning is unwired, and readiness/SPA fallback configuration is absent. DB startup throws on connection failure without application reconnect/backoff. Working deployment is unverified.

# Limitations / Attribution Boundaries

- Public employee registration accepts clearance; raw customer/menu/reservation/inquiry APIs lack account-handler authorization. UI visibility is not API-wide RBAC or proven session security.
- JWT uses a literal secret without explicit expiry; cookie policies are incomplete/inconsistent. SQL placeholders coexist with interpolation. Logs can expose passwords/hashes and identity data; tracked configuration contains credentials. No secret values are reproduced here.
- No capacity/collision scheduling engine, inventory-management workflow, ordering/payment fulfillment, reward redemption, or waitlist advancement is established from schema presence.
- README/source acknowledge BezKoder, Lama Dev, and freeCodeCamp tutorials. React/Router, Express, mysql2, bcryptjs, JWT, Axios, Bootstrap, CRA, MySQL, and Nginx provide underlying facilities; custom work is adaptation, orchestration, UI, schema, and configuration.
- Production deployment, adoption, performance improvement, audit logging, security assessment, and complete runtime success remain unverified.

# Notes

September–December 2024 dates derive from the owner-supplied resume seed on 2026-10-07, not independently verified chronology. Seed wording described “5-level RBAC,” scheduling/inventory/order APIs, “secure” sessions, “audit-friendly” models, consistent Docker/Nginx deployment, and structured API/deployment/permission documentation. Evidence instead supports six documented levels with partial enforcement, reservations rather than general scheduling, schema-only wider workflows, and deployment/security defects. Documentation found consists of setup, permission descriptions, comments, and scaffold guidance; a comprehensive API/runbook or audit feature is not established. Seed assertions remain qualified historical context, not supported feature claims for future generation.

Evidence sections: Contributions; Architecture; Backend / APIs; Database / Data Engineering; Reliability / Failure Handling; Security; Testing / Quality; Deployment / Infrastructure. Internal paths refer to the investigated workspace.
