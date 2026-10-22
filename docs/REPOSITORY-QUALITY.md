# Repository quality review

Reviewed on `portfolio-redesign`, October 21, 2026. The initial working tree was
clean. No commit, push, merge, deployment, or change to `main` was performed.
The current public website is the baseline; public text, project order, layout,
typography, colors, assets, and interactions were preserved.

## Findings and completed changes

- Removed `app/components/editorial/Diagrams.tsx`: no import consumers, no dynamic
  imports, and byte-for-byte identical to the retained
  `app/design-lab/editorial-v3/Diagrams.tsx`. No unique illustration was lost.
- Removed unused `getFeaturedProjects` and `getProjectsByCategory` exports from
  `data/projects.ts`. Project records and their supporting technical detail stay.
- Removed 115 obsolete CSS rules and the unused `message-route` keyframes from
  the public stylesheets. They belonged to the replaced network trace, application
  layer selector, compiler accordion, generic project artwork, and unused helper
  classes. Verified public component references before removing them; retained
  all independent prototype styles. One mixed selector kept its live chart branch.
- Renamed the public homepage function from its old prototype name to `HomePage`.
- Corrected README route structure, development build directory, project-authoring
  instructions, typography/theme description, and deployment guidance.
- Added repeatable production browser capture, functional/accessibility review,
  and image comparison scripts under `scripts/quality/`.

Public CSS source decreased from 79,362 to 70,703 bytes. Aggregate emitted CSS
decreased from 145,291 to 137,843 bytes, including the retained prototype bundles.
Public first-load JavaScript sizes reported by Next.js were unchanged.

## Git and artifact policy

`docs/` remains tracked in full. Its 37 existing source records include professional
references, technical evidence, content decisions, and design history. None are
runtime files, but they support accurate claims and future maintenance. Ignoring
the whole directory would hide useful source documentation without a benefit.

`output/` is generated-output storage. Its policy now keeps source Markdown reports
and JavaScript review scripts in Git, while ignoring screenshots, generated JSON,
logs, traces, recordings, and browser session files. The existing 27 reports and
36 scripts remain tracked. Historical reports may link to captures or JSON that
are now local-only; those files remain beside the reports in this checkout and
are also recoverable from prior Git history.

Used `git rm --cached` for exactly 1,145 previously tracked generated files:
1,072 PNGs, 70 JSON results, and three generated check transcripts, totaling
252,914,482 bytes. These are index-only removals, staged by Git; no local file was
deleted. SHA-256 checks confirmed every copy was preserved unchanged. This does
not rewrite or reduce existing Git history.

Ignore rules also cover Playwright reports/results/blob reports, Next.js preview
build directories (`.next-*`), logs, and editor/OS temporary files. No application,
public asset, build configuration, package/lockfile, or documentation file became
ignored. No caches or backup directories were deleted.

## Preserved deliberately

- All nine project-detail pages, experience pages, résumé, photos, technical
  illustrations, category filtering, project strip, navigation, and contact links.
- Both original supplied JPG photographs and every responsive derivative. The
  originals have no current source references, but remain useful asset sources.
- Historical design-lab routes, their unique illustrations, local font files,
  licenses, GSAP dependencies, and reports. They remain useful development
  references; the existing production rewrite and layout guard are retained.
- Detailed project records that are no longer rendered verbatim. They contain
  useful technical evidence, rather than disposable presentation code.
- Existing CSS cascade and palette aliases. Flattening the cascade or migrating
  every illustration color into new tokens would create unnecessary visual risk.

## Dependencies, configuration, and privacy

All direct packages have verified source or tooling consumers. No dependencies,
versions, package scripts, lockfile entries, or Next.js/TypeScript/ESLint/Tailwind
configuration changed. Existing strict TypeScript settings already catch unused
locals/parameters and unchecked array access; ESLint enforces type-only imports
and rejects explicit `any`.

The public routes largely render on the server. Filtering receives rendered
entries rather than the full technical dataset; client state is limited to the
controls that need it. GSAP is used by historical prototypes, not public pages.
No speculative memoization, client-boundary expansion, or lazy-loading refactor
was introduced.

A current tracked-file scan found no suspected credential assignments, private
keys, AWS access keys, or GitHub tokens. No environment/credential files are
tracked. The scan is heuristic and does not audit every historical Git object.
Public photographs were also inspected for GPS metadata. Professional-reference
records remain outside `public/`; production requests for source records and local
configuration are checked for HTTP 404. No business data or new public claims
were added.

## Verification

Baseline and final checks use `npm run build` followed by `npm start`, with
production served on `http://127.0.0.1:3001`. Development uses `.next-dev`, so its
preview can remain running independently.

- Baseline: production build, TypeScript, zero-warning ESLint, all 14 public
  routes at 1440px, 768px, and 390px; 42 full-page captures plus 34 interaction
  captures. Identical final viewports and states are used for comparison.
- Final: TypeScript, zero-warning application ESLint, production build (26 static
  entries), and both staged/unstaged `git diff --check` passed. The new JavaScript
  browser scripts also passed ESLint and syntax checks.
- Chromium production verification: **136 functional checks, 56 route/viewport
  checks** at 320/390/768/1440px, and **28 axe WCAG A/AA/2.1 AA page audits**, all
  passed. No console exceptions, unexpected failed responses, broken images,
  duplicate IDs, broken same-page anchors, or page-level horizontal overflow.
- Verified every category and project order; all nine client-side project
  transitions; distributed discovery/messages/coordination/election views, fan-out,
  and election stages; temperature controls and visible keyboard focus; compiler
  preview; project-strip scrolling; résumé response/download/new-tab/disclosure;
  mobile menu/Escape/focus restoration; contact/footer links; reduced motion;
  no-JavaScript server-rendered project content; legacy 308 redirect; and ten HTTP
  404 cases including every prototype route. Source/local record URLs returned
  404 in four separate checks.
- Visual review: **76 matching screenshot pairs**. All **42 full-page captures
  are pixel-identical**, as are 28 interaction captures. Six diagram-state
  captures differ by only 9–31 pixels each, at most two levels per color channel,
  exclusively along faint SVG line edges. Cropped comparisons were inspected:
  these are rasterization/antialiasing variations, with no changed geometry,
  labels, colors, spacing, or content. The strict comparator intentionally exits
  nonzero for these tiny residuals and records them for review; they were not
  hidden with a broad image tolerance. All 42 recorded document states (text,
  links, image dimensions, document width/height) match exactly.
- An initial mobile focus assertion sampled native smooth scrolling too early.
  The harness now waits for focus scrolling to settle; all nine focus checks
  pass. No application change was needed.

Artifacts are local under `output/playwright/repository-cleanup/`: baseline/final
images and document states, interaction checks, visual comparison, CSS removal
inventory, and the preservation checksum manifest. Native PDF plugin contents
are masked during page comparisons; the iframe dimensions, surrounding preview
UI, PDF response, filename, new-tab opening, and disclosure behavior are checked
separately. No screenshots are added to Git.

The review used the installed React/Next.js, web guidelines, Playwright,
design-system, and frontend-design skills. The
[Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)
informed semantic, focus, reduced-motion, image, and keyboard checks. No
public-facing writing changes required the humanizer skill.

## Repeat the browser review

From the repository root, build and start production on an available port. The
capture and verification functions derive their origin from the open browser URL.

```sh
npm run typecheck
npm run lint
npm run build
npm start -- --hostname 127.0.0.1 --port 3001
```

In another terminal, use the installed Playwright CLI wrapper:

```sh
bash .agents/skills/playwright/scripts/playwright_cli.sh -s=quality open 'http://127.0.0.1:3001/?quality-phase=baseline'
bash .agents/skills/playwright/scripts/playwright_cli.sh -s=quality run-code --filename scripts/quality/capture.js
# Reopen the same URL before the second script; the first script navigates away.
bash .agents/skills/playwright/scripts/playwright_cli.sh -s=quality goto 'http://127.0.0.1:3001/?quality-phase=baseline'
bash .agents/skills/playwright/scripts/playwright_cli.sh -s=quality run-code --filename scripts/quality/verify.js
```

Save the CLI `### Result` JSON values as `baseline.json` and
`baseline-checks.json` in the artifact directory. After making changes and
rebuilding production, repeat with `?quality-phase=final`, saving `final.json`
and `final-checks.json`. Review every failed check, not just the CLI exit status.
With Pillow available in the local Python environment:

```sh
python3 scripts/quality/compare.py
git diff --check
git diff --cached --check
```

The accessibility pass uses the locally available `axe-core` installation. It is
transitive tooling, not an application dependency. A clean install without its
`axe.min.js` must supply it in the review environment before that optional audit.
There was no existing unit-test runner or test package script to run.

## Remaining work, not implemented

1. **Resolve dependency advisories before deployment.** The existing lockfile's
   npm audit reports 24 affected packages: one critical, 20 high, three moderate.
   This includes the pinned Next.js 14.0.4 and build/lint transitive dependencies.
   Counts include indirect dependency chains and do not establish exploitability
   of every finding in this application. For example, the critical
   [middleware authorization advisory](https://github.com/vercel/next.js/security/advisories/GHSA-f82v-jwr5-mffw)
   concerns middleware authorization, which this portfolio does not implement;
   [server-component denial of service advisories](https://github.com/vercel/next.js/security/advisories/GHSA-mwv6-3258-q52c)
   also warrant reviewing for the App Router deployment. Plan a supported,
   patched framework/toolchain upgrade and rerun the production matrix; no
   automatic audit fix or dependency upgrade was applied during this cleanup.
2. **Replace the temporary dependency installation when convenient.** This
   checkout already links `node_modules` to `/tmp/portfolio-final-check/node_modules`;
   `.node_modules-cloud-backup/` holds the earlier local copy. The installed
   top-level packages resolve correctly and all checks use that installation.
   Removing the temporary directory would break it. A future clean `npm ci` in
   reliable local storage should replace the workaround; it was not disturbed.
3. **Refresh browser compatibility data** alongside the dependency maintenance.
   Builds report an outdated Browserslist dataset; builds still succeed.
4. **Broaden browser coverage** to Firefox, Safari, physical touch devices, and a
   screen reader. This review uses Chromium and automated WCAG checks; those
   checks supplement manual verification and do not prove complete accessibility.
5. **Consider archiving prototypes outside the route tree** if build size becomes
   a concern. Existing production requests return 404, but Next.js still builds
   the prototype entries. Moving their imports/fonts or removing GSAP would be
   a separate structural change, not required for this conservative cleanup.
