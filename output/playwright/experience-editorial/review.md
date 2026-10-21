# Experience editorial refinement

PRO-Formance Intermodal now has three contribution sections: full-stack workflow tools; data integration and analytics; troubleshooting and onboarding. Its original opening summary retains sole-developer ownership of one full-stack system. The prose preserves React, Python APIs, SQL, grant workflows, training scheduling, spreadsheet integration, instructor/attendance analytics, data-integrity and workflow fixes, account provisioning, access configuration, onboarding documentation, and knowledge-base work.

Phillys now has two sections: contact-form integration; deployment and production support. The original summary retains the PHP/JavaScript website rebuild and responsive layouts. The sections preserve email routing to the care team, domain/DNS setup, SSL installation, cPanel administration, browser/integration/hosting fixes, and technical documentation for vendor escalation. The repeated rebuild sentence was removed from the contribution text because the summary already covers it. The separate restaurant application and later proposals were not introduced.

Sources: docs/professional-reference/experience/pro-formance-intermodal.md and docs/professional-reference/experience/phillys.md. These records provide broad owner-confirmed/transcribed scope, with no independent implementation artifacts. Unverified percentages and workflow counts remain omitted. No framework, database engine, hosting vendor, security guarantee, performance outcome, or private implementation details were invented. Canonical records were not modified.

Both entries use the existing contribution renderer and Snap Remedy typography/spacing. Technology lists receive a 28 px gap when they directly follow contributions. More specific Experience-page selectors preserve the intended 23 px employer-title margins and 30 px summary margins when production CSS ordering would otherwise reset them. Existing mobile type sizes remain in place. There are no matching-height containers or new illustrations/pages.

All opening summaries, roles, dates, employment labels, locations, technologies, and Snap Remedy content are unchanged. Snap Remedy remains the longest entry and keeps its case-study link. Shared homepage role screenshots are byte-identical before and after.

## Verification

- 74 browser checks pass at widths 1440, 1024, 768, 390, and 320.
- Five development and three production axe WCAG A/AA audits pass.
- No horizontal overflow, checked heading/prose clipping, or browser errors.
- Employer anchor navigation works by keyboard and under reduced motion; targets clear the sticky header.
- Résumé, Snap Remedy case-study, primary navigation, and mobile menu/Escape checks pass.
- TypeScript, ESLint, production build, and git diff --check pass in the repository.
- Existing tracked changes outside this task match the pre-edit diff exactly. Work remained on portfolio-redesign; no commits, pushes, merges, or deployments.

The build reports stale Browserslist data; dependency updates are outside this pass. Automated accessibility checks and keyboard review do not replace a full assistive-technology audit.

## Artifacts

- after-1440.png, after-768.png, after-390.png, after-320.png: final development screenshots.
- production-1440.png, production-768.png, production-390.png: final production screenshots.
- before-1440.png, before-768.png, before-390.png: initial comparison screenshots.
- verification-results.json and production-results.json: browser results.
- home-roles-before.png / home-roles-after.png: unchanged shared homepage summaries.

Development preview is left running at http://localhost:3000/experience.
