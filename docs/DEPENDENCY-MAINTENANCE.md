# Dependency and installation maintenance

October 21, 2026, on `portfolio-redesign`. This follows the repository cleanup in
[REPOSITORY-QUALITY.md](REPOSITORY-QUALITY.md). No commit, push, merge, deployment,
or changes to `main` were performed. Public content, styles, assets, and interactions
are preserved. Generated evidence is local in `output/playwright/dependency-maintenance/`.

## Versions and upgrade decision

| Package | Before (installed) | After (installed) |
| --- | --- | --- |
| Next.js / eslint-config-next | 14.0.4 | 16.4.2 |
| React / React DOM | 18.3.1 | 19.3.1 |
| ESLint | 8.57.1 | 9.39.5 |
| TypeScript ESLint | 8.46.4 | 8.72.0, supplied by eslint-config-next |
| React types / React DOM types | 18.3.27 / 18.3.7 | 19.3.0 / 19.3.0 |
| Tailwind CSS | 3.4.19 | 3.4.19 |
| PostCSS (direct) | 8.5.6 | 8.5.31 |
| Nano ID | 3.3.11 | 3.3.20 |
| source-map-js | 1.2.1 | 1.2.2 |
| Browserslist | 4.28.1 | 4.29.4 |
| caniuse-lite | 1.0.30001765 | 1.0.30001818 |
| TypeScript / Autoprefixer | 5.9.3 / 10.4.23 | unchanged |
| Outfit / GSAP / GSAP React | 5.3.0 / 3.15.0 / 2.1.2 | unchanged |

Next.js 14 is [unsupported](https://nextjs.org/support-policy). The audit's proposed
14.2.35 fix does not address all current advisory ranges, including the later
[AVIF optimizer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4).
The current supported stable release was checked against npm release metadata and
the official [Next.js 16 migration guide](https://nextjs.org/docs/app/guides/upgrading/version-16).
React and React DOM are upgraded together, with corresponding types; no React
Compiler or new rendering/caching feature is enabled. Webpack remains explicit in
both development and production scripts to preserve the existing CSS pipeline.

The lockfile was updated through normal package resolution and targeted compatible
updates for affected glob/browser-data dependencies. No `audit fix --force`, forced
peer resolution, audit exclusions, or vulnerability overrides were used.

## Security results and remaining tooling work

Full npm audit: **24 findings (1 critical, 20 high, 3 moderate) before; 9 findings
(0 critical, 7 high, 2 moderate) after**. Production-only `npm audit --omit=dev`:
**zero findings after remediation**. These are affected-package counts, including
inherited dependency chains, rather than counts of distinct exploitable flaws.

The remaining seven high entries are `braces`, `chokidar`, `micromatch`,
`fast-glob`, `tailwindcss`, `@next/eslint-plugin-next`, and `eslint-config-next`.
They share the [braces stack-exhaustion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
The published latest braces release, 3.0.3, remains affected. The two moderate
entries are `postcss-selector-parser` and its dependent `postcss-nested`, from
[selector-parser CPU exhaustion](https://github.com/advisories/GHSA-rj75-hqrm-r3gf).
The installed compatible 6.1.5 remains affected; the advisory requires 7.1.6 or later.
All nine are development dependencies, used for local/CI linting and CSS generation.
No application route accepts user-supplied glob patterns, CSS, or selectors.

Tailwind 4 changes Preflight, utility defaults, PostCSS integration, and browser
requirements; see its [upgrade guide](https://tailwindcss.com/docs/upgrade-guide).
That migration is deferred rather than forced into this presentation-preserving
maintenance. Reassess after upstream compatible patches; otherwise plan a separate
Tailwind migration with visual acceptance. A selector-parser major override was
not imposed on parents declaring version 6 compatibility.

ESLint 9 is [end of life](https://eslint.org/version-support/). ESLint 10.13.0 was
examined, but the current React, import, and JSX accessibility plugins used by the
Next.js config declare compatibility only through ESLint 9. The installed tree
resolves without forced peers. Retaining ESLint 9.39.5 is a documented development
maintenance limitation, not a claim of full toolchain support. Prefer a compatible
upstream plugin/config release; replacing those lint integrations requires a
separate review. No unsupported Next.js framework version is retained.

The production dependency findings are resolved. The full dependency tree is not
vulnerability-free: the documented development-only findings and ESLint support
limitation remain maintenance work; no deployment was attempted.

## Necessary compatibility changes

- Project route and metadata functions await promised route parameters, as required
  by Next.js 16. Route generation, metadata values, and rendered content are unchanged.
- `data-scroll-behavior="smooth"` preserves the old Next.js route-transition scroll
  override while retaining existing in-page smooth scrolling and reduced motion.
- `eslint.config.mjs` replaces `.eslintrc.json`; the lint script invokes ESLint
  directly with zero warnings. TypeScript rules remain scoped to TypeScript files;
  consistent type imports and rejection of explicit `any` remain enforced.
- A historical prototype wraps its GSAP callback when the click handler executes,
  keeping ref reads out of render without disabling lint rules or changing animation.
- Next.js-required automatic JSX runtime and current generated route-type paths are
  recorded in `tsconfig.json`. `typecheck` generates route types before `tsc`, so it
  works before a build. Development and production output remain separate.
  Typechecking excludes duplicate development output: Next.js 16.4.2's active-dev
  validator emits unused `NextRequest`/`AppRouteHandlerRoutes` imports when there
  are no route handlers. The generated production validator checks the same source
  routes without that defect. Application unused/strict checks remain enabled; no
  generated file or installed dependency was patched.
- `agentRules: false` prevents dev startup from generating repository policy files.
- `.nvmrc`, Node engine bounds, and package-manager metadata record the verified
  Node 22/npm 10 setup. Validation used Node 22.21.1 and npm 10.9.4.
- The useful contact-sheet script moved byte-for-byte to
  `scripts/quality/make-contact-sheets.py`; its paths and behavior are unchanged.

## Installation and recovery

The original tracked lockfile first passed `npm ci`, typecheck, lint, and a production
build in a source snapshot under `/Users/parmeetvirdi/Developer/portfolio-security-20261021`.
This is durable local storage outside the cloud-synced Desktop. The upgraded lockfile
then passed a fresh `npm ci`, typecheck, lint, build, and production browser checks
there before the original workspace installation was changed.

The workspace dev server was deliberately stopped before changing dependency identity.
The original symlink was moved intact into
`.node_modules-cloud-backup/security-original-link`; its
`/tmp/portfolio-final-check/node_modules` target and the older cloud backup are retained.
The workspace now has an ordinary `node_modules` directory populated by `npm ci`.
It resolves Next.js inside this repository, without a dependency on the temporary
installation. Old dev/production build caches were renamed to ignored recovery
directories, then production and development outputs were regenerated independently.
Original changed-file recovery copies are checksum-verified in the ignored
`source-backup.tar.gz` artifact; the pre-maintenance diff and status are also preserved.

For a fresh checkout, use `nvm use`, `npm ci` including development dependencies,
`npm run typecheck`, `npm run lint`, and `npm run build`. No private environment
file is required for the default site origin and locally served fonts/assets.
The Playwright CLI/browser and Python Pillow are review-environment tools; the
repository quality guide describes their use. No unit-test runner or `npm test`
script exists; the existing production browser scripts provide the automated suite.

## Verification

- The normal workspace `npm ci`, typecheck, zero-warning lint, and production build
  passed, including a final typecheck/lint/build with development running. A second fresh source-only snapshot at
  `/Users/parmeetvirdi/Developer/portfolio-security-clean-20261021` independently
  passed `npm ci`, typecheck, lint, and build without ignored local files,
  existing dependencies, or build caches. The manifest and lockfile agree.
- Existing production browser suite passed: **136 functional checks, 56 route/viewport
  checks, and 28 axe WCAG A/AA/2.1 AA audits**. All 14 public routes were checked at
  320, 390, 768, and 1440 pixels. Navigation, filters, diagram controls, résumé
  preview/download/new-tab behavior, keyboard focus/menu handling, reduced motion,
  no-JavaScript project content, legacy redirect, prototype exclusions, and source
  privacy checks pass. No browser errors or unexpected failed responses were recorded.
- **76 matching screenshot pairs** were compared at desktop, tablet, and mobile
  viewports and interaction states. All 42 recorded document states match exactly.
  The raw strict comparison reports 73 pixel-identical pairs. Two SVG-state images
  differ by nine pixels each, with a maximum one-level channel delta. The initial
  desktop homepage capture differs by 58,771 pixels, mostly in photograph resampling,
  with a maximum nine-level channel delta. Magnified crops were visually inspected.
  Repeating the unchanged final build removes the photograph residual; the second
  repeat differs from baseline by only one pixel at one channel level. Image sources,
  natural dimensions, and rendered dimensions match. This confirms browser raster
  variation rather than a changed asset, layout, or application behavior. Raw
  captures and the nonzero strict result remain intact; no broad tolerance hides them.
  See `visual-comparison.json` and `visual-investigation.json` in the local evidence.
- Development smoke checks passed for homepage, projects, distributed chat, and
  résumé, with no page errors. The changed prototype's message-trace control also
  reaches its original traced state without console errors.
- Nineteen production dependency-trace files contain no reference resolving into
  the temporary installation or either external verification installation.
- Staged and unstaged whitespace checks pass. Existing staged artifact removals
  match their pre-maintenance listing exactly, and all 1,145 local copies remain.
  The pre-existing cleanup changes are byte-for-byte preserved except README,
  which received the necessary installation/framework guidance updates.
- The only remaining project server is development at **http://127.0.0.1:3000**,
  running from this repository's normal installation. Both production check servers
  were stopped. No currently installed dependency files are marked cloud-evicted.

No functional or production-dependency deployment blocker was found in these checks.
The nine development-only audit entries and ESLint support limitation remain as
reported above. Deployment and hosting configuration were not changed.

## Files changed by this maintenance

- `package.json`, `package-lock.json`
- `.nvmrc` (new)
- `eslint.config.mjs` (new), `.eslintrc.json` (removed)
- `tsconfig.json`, `next.config.js`
- `app/layout.tsx`
- `app/(site)/projects/[slug]/page.tsx`
- `app/design-lab/editorial-v3/Interactions.tsx`
- `README.md`
- `docs/REPOSITORY-QUALITY.md` (maintenance pointer only)
- `docs/DEPENDENCY-MAINTENANCE.md` (new)
- `scripts/quality/make-contact-sheets.py` (moved from ignored output storage)

The existing cleanup diff, its untracked review scripts, `.gitignore` improvements,
and 1,145 staged tracking removals remain in place. No new Git staging was performed.
