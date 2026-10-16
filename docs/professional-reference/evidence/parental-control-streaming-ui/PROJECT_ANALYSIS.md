# Project Name

> Transfer source: `Resume_Builder/evidence/parental-control-streaming-ui/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. Privacy edits are listed in `catalog.json`. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

**KiddoFlix** — a browser-based children's viewing and parental-control interface prototype. The npm package is named **`candy-demo`**, version **`0.1.0`**, and is private. The repository is identified as `CPSC481_project` in the README clone command. The browser document and application manifest retain Create React App names rather than KiddoFlix branding. Evidence: `package.json`, `README.md`, `src/components/Header.js`, `public/index.html`, `public/manifest.json`.

## Overview

KiddoFlix implements a React single-page interface for choosing parent or child profiles, browsing a fixed show catalog, searching by title or category, viewing show descriptions and episode buttons, opening a custom video-player interface, saving favorites, and demonstrating parental controls. Parent-facing screens cover profile setup, account actions, viewing-history examples, show restrictions, screen-time settings, and profile locks.

The README explicitly calls the application a **design concept**. The implementation supports that characterization: some interactions update browser storage, others change only React state or show confirmation messages, and several displayed values are hardcoded examples. There is no application backend, database server, real account-registration service, or recorded viewing pipeline in the inspected repository. The player refers to a sample video that is absent from the repository.

**Interpretation:** the interface appears intended to explore how children discover entertainment and how parents supervise that experience. The code establishes the interaction design, but does not establish production operation, actual family usage, content licensing, or measured improvements in safety or usability.

### Evidence and investigation conventions

- **Verified implementation** means directly visible source/configuration/data behavior. It does not imply that every browser workflow was executed successfully.
- **Interpretation** identifies a technical consequence or likely intent derived from source. Where relevant, runtime confirmation remains outstanding.
- **Not established** means the available repository does not supply adequate evidence.
- Original application implementation is attributed to the sole developer as instructed. Git authorship was not investigated. Framework internals, stock template artifacts, external media, generated dependency metadata, and apparently generated fixture prose are distinguished below.
- Investigation covered all 90 tracked files: all application JavaScript, stylesheets, project/public configuration, documentation, dependency manifest and lockfile, and the asset inventory. Binary assets were inspected through file-type metadata rather than a visual or licensing audit. Ignored local dependency packages were inspected selectively to verify tooling/dependency questions; their vendor implementation is not project work.
- No network services were contacted and no external documentation was used to fill repository gaps. No installation, build, development server, migration, formatter, source edit, or Git history mutation was performed. The only intended repository change is this file.

## Repository Scope

| Area | Contents and relationship |
|---|---|
| Root | `README.md`, `package.json`, `package-lock.json`, `.gitignore`; no custom deployment or backend configuration. |
| `src/index.js` | Creates the React root, wraps `App` in `React.StrictMode`, imports base CSS, invokes the web-vitals helper without a reporting callback. |
| `src/App.js` | BrowserRouter/Routes composition, outer layout, nested parent layout, wildcard route. |
| `src/tools/` | Four modules: shared color getters, route definitions, demo profiles/catalog fixtures, browser-storage helpers. |
| `src/pages/` | Seven top-level pages, four child viewing pages, ten parent-control pages: 21 page files. |
| `src/components/` | Five direct component files, four menu components, twelve parent-layout/dialog/control files: 21 component files. |
| `src/App.css`, `src/index.css`, `src/logo.svg` | Template styles and React logo artifact; main application styling is largely MUI `sx` and inline styles. |
| `src/App.test.js`, `src/setupTests.js` | One template test plus test matcher setup. |
| `src/reportWebVitals.js` | Template-style optional metrics hook; not actively collecting metrics from the entry point. |
| `public/` | HTML shell, manifest, robots policy, favicon and two stock-sized app icons. |
| `public/images/` | 25 image assets and `ref.txt` with image-source references. No video directory/file is supplied. |
| Local ignored material | `node_modules/` and `.DS_Store` files exist in the inspected workspace. These are not counted as original application code or tracked deliverables. |

The tracked JavaScript total is 51 files: 21 pages + 21 components + 4 tools + 5 entry/test/metrics files (`App.js`, `index.js`, `App.test.js`, `setupTests.js`, `reportWebVitals.js`). Counts refer to files, not a claim that each file contains exactly one React component.

## Contributions

The following inventory describes original repository implementation as the developer's work, including incomplete prototype interactions. The qualification in each entry is part of the contribution record.

1. **Application composition and navigation:** assembled a React application with a centralized route registry, two layout levels, profile parameters, navigation state for show/episode selection, query parameters for onboarding and lockout messaging, and a wildcard page (`App.js`, `tools/HelperPages.js`, layout and page modules).
2. **Visual interface design and composition:** implemented large circular login/create actions, profile selection cards, a distinct gold parent card, icon-based management links, parent sidebar navigation, show-image cards, episode grids, responsive wrapping/flex layouts, hover feedback, visible custom focus states, dialogs, and success/error notifications. These compose MUI primitives; MUI's dialog, slider, switch, icon, and layout internals are not custom implementations.
3. **Demo sign-in and account-creation flow:** implemented local form state, required-field and format checks, password confirmation, numeric PIN confirmation, password visibility controls, fixed demo credential comparisons, and navigation into profile setup. No real account record or credential persistence is implemented (`Login.js`, `Create.js`, `ParentLogin.js`).
4. **Parent profile personalization:** implemented name validation, image selection through FileReader, Data URL previews, a default external image, browser persistence, and menu restoration (`ParentProfileInit.js`, `ProfileViews.js`).
5. **Profile and account management prototypes:** implemented add/edit/remove child, change-password, and delete-account dialogs with inputs, image controls, confirmations, delayed closure, and notification feedback. These do not implement the corresponding durable account/child mutations (`Acount.js`, five account-dialog modules).
6. **Child and parent browsing interfaces:** implemented recent/favorite carousels, fixed resume controls, catalog/category browsing, case-insensitive title search, parent search suggestions, show details, synthetic episode lists, navigation into playback, and separate parent/child variants (`ChildWatchPages/`, `ParentMain.js`, `FindShow_Parent.js`, `ShowParentDetails.js`).
7. **Keyboard interaction logic:** implemented a logical focus state for discovery and player screens, arrow-key transitions, Enter/Space activation, Backspace navigation, and player shortcuts. Known gaps in wiring and state synchronization are preserved under Testing / Quality.
8. **Custom controls around browser video:** implemented play/pause, progress tracking/seeking, volume and mute controls, fullscreen controls, poster-style image display, overlay styling, and pointer/keyboard event handling. Media decoding/playback itself is HTML video functionality; the referenced media is missing (`VideoPlay.js`).
9. **Browser persistence utilities:** implemented JSON-based favorites, title restrictions, time-limit storage, duplicate suppression, removals, profile-keyed lookup, default returns, and exception logging (`StorageUtils.js`).
10. **Per-child show restriction editing:** implemented a profile checkbox dialog on parent show details whose toggles write restrictions, plus child-side filtering in recent/favorite lists and text searches. Filtering is incomplete across entry points and is not a security boundary (`ShowParentDetails.js`, `ChildMain.js`, `FindShow.js`).
11. **Screen-time settings and account lock simulation:** implemented hours/minutes controls, conversion to total minutes, persistent time-limit values, duplicate-safe lock flags, a lock switch, child-home lock redirect, remaining-time visualization, and a separate lock/time message page. Actual timed enforcement is not implemented (`ScreenTime.js`, `TimeSlider.js`, `ChildMain.js`, `Kickout.js`).
12. **History and restriction management demonstrations:** implemented child/date selectors, metadata cards, trailer links, confirmation dialogs, static results, and a locally removable sample restriction list (`History.js`, `Restrict.js`, `TimeSelector.js`, `HistoryCard.js`, restriction-dialog modules).
13. **Shared helpers and reusable controls:** organized colors/hover colors, page definitions, fixtures, exit links, profile cards, child selectors, history cards, time controls, search-field shell, and nested layout components.
14. **Project configuration and documentation:** maintained npm dependency declarations/lockfile, CRA scripts, ESLint/browser targets, ignore rules, local run instructions, demo credentials, application guide, and image reference notes. Configuration/integration work is attributable; the bundled third-party tooling implementation is not.

### Framework, generated, and third-party boundaries

- React supplies rendering, hooks, root management, and StrictMode; React Router supplies routing, outlets, links, location/parameter/navigation APIs. The repository supplies the route table and screen behavior.
- MUI and its styling dependencies supply widgets, icons, styles infrastructure, and built-in widget behavior. This repository supplies their arrangement, values, event handlers, and custom styles.
- Browser APIs supply localStorage, JSON, FileReader, CustomEvent, history, scrolling, HTML video, and fullscreen operations. Custom code connects them to the workflows.
- CRA/react-scripts supplies the build/dev/test pipeline. `package-lock.json` is generated resolution metadata, not a custom dependency-management algorithm.
- README CRA sections, the test asserting a “learn react” link, CSS `.App-*` rules, `logo.svg`, app icons/manifest/HTML placeholders, and web-vitals scaffolding are template material or template-derived artifacts. Their retention does not establish custom test, branding, or telemetry functionality.
- Show artwork is external media, with reference notes in `public/images/ref.txt`; no claim of original illustration or media ownership is made. External profile images are also not developer-created artwork established by this repository.
- A comment immediately before the `ConstantLib.js` `shows` array says the fixture content was “all GBT.” This supports a generated-content caveat for that sample catalog, not a precise claim about which model, prompt, or exact portions were generated. Integrating fixtures into the application is distinct from authoring the underlying show facts/prose.

## Architecture

The repository implements a single browser application with static bundled data and browser-local persistence. No independent backend or network service module exists in the tracked tree.

```text
public/index.html (#root)
  -> src/index.js (React root / StrictMode)
    -> App (BrowserRouter)
      -> Layout (Header + Outlet)
        -> publicPages: entry, menu, child screens, parent browse/sign-in/setup
        -> ParentLayout (20% Sidebar + 80% Outlet)
          -> authPages: account, history, restrict, screen time, parent home
        -> NoPage (*)

Page/component state: React useState/useEffect/useRef
  <-> ConstantLib: fixed child profiles and sample metadata
  <-> localStorage: favorites, restrictions, limits, locks, parent profile
  -> router parameters/state/query strings
  -> static local images / remote image URLs / external trailer link
  -> HTML video element requesting /videos/sample.mp4 (not supplied)
```

“Public” and “auth” are route-list names, not access-control enforcement. The nested parent layout renders a sidebar and outlet without checking authentication. ParentMain, ParentLogin, profile initialization, parent discovery, and parent show details are themselves in the public route list.

### State and data flows

| Flow | Verified implementation |
|---|---|
| Demo login | Email/password input → exact literal comparisons → `/menu`; no session/token generated. |
| Account creation | Five-field validation → `/parentprofileinit?fromCreate=true`; email/password/PIN are not passed or saved. |
| Parent setup | Selected file → FileReader Data URL → `parentProfile` JSON → `/menu?newAccount=true` when `fromCreate` is truthy. |
| Profile display | `ProfileViews` loads `parentProfile` on mount; children come from `ConstantLib.getKidsProfile()`. |
| Child viewing | Profile name in path → case-insensitive avatar lookup against fixtures → show `{title,image}` in navigation state → episode `{episode,showTitle,image}` in navigation state. |
| Favorites | Details click → StorageUtils JSON read/modify/write → local toggle/notification; home reloads favorites on mount/profile change. |
| Restrictions | Parent details checkbox → immediate save/remove by child name and exact title → child home/search filter reads. |
| Screen-time choice | ChildSelect callback and custom event → selected child; TimeSlider hours/minutes → total minutes; Confirm → browser storage. |
| Lock | Switch immediately persists profile-name flag; ChildMain mount/profile effect checks it and navigates to `/kickout?reason=locked`. |
| History | Date index and child index → conditional selection of fixed show fixtures; playback does not feed it. |

There is no Redux, Context-based global store, query client, service worker, server rendering, centralized authenticated session, background worker, or application API client demonstrated in source. A bubbling `childSelected` event dispatched on `document` and listened to on `window` supplements the normal `ChildSelect` callback in ScreenTime; it is not a cross-process event bus.

## Technologies

### Languages and browser formats

- JavaScript with ES modules and JSX for application logic/UI.
- CSS and MUI `sx` objects/inline styles for presentation.
- HTML document template; JSON manifests, dependency metadata, and serialized browser data.
- Markdown project documentation and plain-text image references.
- JPEG, PNG, WebP, SVG, and ICO assets. These are asset formats, not evidence of a custom image-processing pipeline.

### Frameworks and directly used libraries

Versions below are resolved versions in `package-lock.json`; the locally inspected installed versions matched these direct-package entries.

| Technology | Manifest declaration / locked version | Demonstrated use |
|---|---|---|
| React | `^19.0.0` / `19.0.0` | Function components, state/effects/refs, StrictMode. |
| React DOM | `^19.0.0` / `19.0.0` | `createRoot` in `src/index.js`. |
| React Router DOM | `^7.2.0` / `7.2.0` | BrowserRouter, Routes, Route, Outlet, Link, navigation/location/parameter hooks. |
| MUI Material | `^6.4.6` / `6.4.6` | Layouts, forms, dialogs, cards, slider, switch, notifications, progress rings. Both Grid and Grid2 imports occur. |
| MUI icons | `^6.4.6` / `6.4.6` | Navigation, categories, account tools, stars, playback and lock icons. |
| react-scripts | `^5.0.1` / `5.0.1` | All four npm scripts delegate to CRA tooling. |
| web-vitals | `^4.2.4` / `4.2.4` | Referenced by optional metrics helper; no active callback or collected results. |

### Declared support packages and inactive declarations

- `@emotion/react` `^11.14.0`, `@emotion/styled` `^11.14.0`: MUI styling support; no custom direct Emotion usage appears in project imports.
- `@mui/styled-engine-sc` `^6.3.1` and `styled-components` `^6.1.14`: declared and locked, but no application imports, bundler alias, or explicit styled-components engine configuration establishes use of that alternative engine. Do not describe this as a custom styled-components architecture.
- `cra-template` `1.2.0`: template dependency, not a runtime feature.
- `@babel/plugin-proposal-private-property-in-object` `^7.21.11`: sole direct devDependency; no custom Babel config is supplied.
- Lockfile toolchain examples include Jest `27.5.1`, webpack `5.97.1`, ESLint `8.57.1`, and Babel core `7.26.0`. These are dependency-provided tools, not separately implemented services.
- `@mui/system` is locked at `6.4.6` and mentioned in README installation instructions, but is not a root direct dependency or an application import.
- `@testing-library/react` and `@testing-library/jest-dom` are imported by test files but absent from root declarations, lockfile package entries, and the inspected local installation. They represent intended test dependencies with a missing setup, not a successfully configured test stack.

### Databases, infrastructure, protocols

Persistence is the browser Web Storage API; no SQL/NoSQL database or ORM is demonstrated. Browser navigation, JSON serialization, local asset requests, HTTPS image URLs, and an external YouTube hyperlink are present. No application REST, GraphQL, WebSocket, OAuth, HLS, DASH, or DRM implementation appears in source. MP4 is the configured sample source suffix, not evidence of an included playable asset.

## Features

| Feature/workflow | What is implemented | Boundary |
|---|---|---|
| Entry screen | Circular Login/Create links with shared colors and hover styling. | No account/session checks. |
| Login | Empty-field errors; exact `[email omitted]` / `[demo credential omitted]` match; password visibility. | Fixed demo gate only. |
| Create account | Email format, six-character password minimum, matching password/PIN confirmation, four numeric PIN digits. | Validates then navigates; creates no authentication record. |
| Parent PIN entry | Four-character input cap, numeric/length checks, exact `[demo credential omitted]` match; destination based on mode. | Chosen creation PIN is not used. |
| Parent profile | Name, local image preview, Data URL or default URL saved/restored. | One browser-wide parent profile; no account namespace. |
| Profile menu | Parent, two fixture children, Add User, four management shortcuts. | New-account query flag only hides fixture children. |
| Child home | Fixed recent list, stored favorites, restriction filtering, resume shortcut, time indicator, lock redirect. | Recent/resume/elapsed time are not actual viewing records. |
| Parent home/browse | Welcome screen and separate parent browsing/search/detail flows. | Parent browse paths do not include a profile parameter. |
| Discovery | Seven categories, 23-title static search catalog, image cards, keyboard logic. | Child category results are not restriction-filtered. |
| Parent search suggestions | If no substring match, suggest titles beginning with query's first character. | No fuzzy-match library or remote search. Child suggestion state is never populated with suggestions. |
| Details | Description, image, favorite toggle, generated numbered episodes. | Static counts; no real episode metadata/catalog service. |
| Video controls | HTML video wrapper with seek/volume/play/fullscreen controls. | Missing sample video, no per-show source mapping. |
| Parent restrictions | Per-child toggles persist exact show titles. | Writes occur before Confirm; Cancel does not roll them back. |
| Dedicated Restrict page | Search-field shell, fixed result cards, confirmation UI, example restriction list. | Separate from persisted restriction management. |
| Screen-time controls | Persist limits and locks; slider/number inputs; save notification. | No usage accounting or automatic daily reset/enforcement. |
| Viewing history | Three fixed date ranges, child selection, conditional cards with metadata. | No collected history or real history deletion. |
| Child/account dialogs | Add/edit/remove/change-password/delete interactions and feedback. | Mutation semantics are simulated. |
| Exit/lockout/not-found | Menu/home links, lock/time reason messages, wildcard 404. | Exit does not clear storage or invalidate a session. |

## Backend / APIs

**Application API endpoints implemented: 0.** The 21 named route entries below are client-side screen paths, not server endpoints. There is no backend entry point, application HTTP request implementation (`fetch`, Axios, XMLHttpRequest), API handler, server-side business service, authentication provider, scheduled process, message consumer, or worker in the project source.

Business-like logic runs in browser handlers and storage helpers. Static asset requests and remote image rendering do not constitute a custom backend integration. `package-lock.json` may contain server/network tooling as dependencies of the development environment; that does not establish a deployed application server.

## Frontend

### Complete route registry

Evidence: `src/tools/HelperPages.js` `publicPages`/`authPages`, consumed by `src/App.js`.

| Registry | Path | Component / purpose |
|---|---|---|
| Public | `/` | Home: entry choices. |
| Public | `/login` | Login: demo credentials. |
| Public | `/create` | Create: account-form validation. |
| Public | `/menu` | Menu: profiles and parent tools. |
| Public | `/childmain` | ChildMain without named profile. |
| Public | `/childmain/:profileName` | ChildMain for supplied profile. |
| Public | `/findShow/:profileName` | Child FindShow. |
| Public | `/showdetails/:profileName` | Child ShowDetails. |
| Public | `/videoplay/:profileName` | VideoPlay, exported component named VideoPlayer. |
| Public | `/parentlogin/:mode` | ParentLogin and mode-to-destination mapping. |
| Public | `/parentmain` | ParentMain browser. |
| Public | `/parentprofileinit` | ParentProfileInit personalization. |
| Public | `/showdetails_parent` | ShowParentDetails. |
| Public | `/parentFindShow` | FindShow_Parent. |
| Public | `/about` | Placeholder About heading. |
| Public | `/kickout` | Lock/time-limit explanatory screen. |
| Parent layout | `/acount` | Account controls; spelling retained in file and URL. |
| Parent layout | `/history` | History fixture view. |
| Parent layout | `/restrict` | Restriction-management prototype. |
| Parent layout | `/screentime` | Time-limit and lock settings. |
| Parent layout | `/parenthome` | Welcome/Watch screen. |
| App fallback | `*` | NoPage: “404 Not found.” |

There are 16 public entries + 5 parent-layout entries, and one additional wildcard. The root outer layout route and empty-path parent layout route are structural wrappers, not additional distinct feature paths. ChildMain is deliberately listed with and without a profile. Several registry `name` fields repeat; the video entry uses `showdetails` as its name.

### Entry, forms, and menu details

- `Home` uses circular, heavily padded MUI buttons linked to login/create. Some imported navigation/helper variables remain unused.
- `Login.handleSubmit` prevents form submission, checks blank email/password, compares both hardcoded values, and navigates. It does not perform the general email/length validation described broadly in README. The submit button also wires the handler to `onClick`.
- `Create` uses the regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`, password length ≥6, equality checks, PIN length exactly 4, and `^\d+$`. Changes clear its error message. Password and confirmation each have visibility toggles; PIN fields remain password inputs with a four-character maximum.
- `ParentLogin.pageMover` maps `History`, `Screen time`, `Restrict`, and `reg` to their respective screens, with other values going to `/acount`. `handleMove` enforces literal `[demo credential omitted]`. The form-level submit handler itself only calls `preventDefault`; movement is attached to the button click.
- `ParentProfileInit` rejects whitespace-only names but stores the original entered name. Image selection accepts `image/*`; FileReader converts the chosen file into a Data URL. No image resizing, file-size validation, or upload is implemented. It writes `parentProfile` directly without a try/catch.
- `ProfileViews` restores parent JSON with a parse catch, defaults to “Parent” with a Freepik image, and links the parent card through `/parentlogin/reg`. Child cards use fixture names. Add User links through `/parentlogin/Account`.
- `newAccount` is tested for query-string truthiness. When present, children are filtered by `a.type === "parent"`; neither default child has that field, so both are hidden. This does not delete or create children, and is not persisted onboarding state.
- `ToolBox` has Screen time, Restrict, History, and Account links, each routed through ParentLogin. Sidebar links point directly to five parent-layout destinations and offer an Exit to menu.

### Discovery, browsing, and detail implementation

- ChildMain and ParentMain each embed the same 15-item recent-list fixture and a hardcoded Naruto resume action. Cards are horizontal overflow content with hidden scrollbars, fixed 250×150 sizing, image backgrounds, and hover scaling. Child recent/favorite card buttons explicitly have `tabIndex={-1}`.
- ChildMain additionally loads favorites, removes exact-title restrictions from them and from recent items, loads the time limit, checks the lock, and generates `Math.floor(Math.random() * 30)` minutes of used time. Remaining time is clamped at zero. No limit displays infinity; a determinate progress ring shows the remaining fraction for a nonzero limit.
- ChildMain contains `scrollToShow` and `scrollShows` helper definitions, including viewport-based page-size calculation and scroll-bound clamping, but they are not wired to rendered controls. Do not credit working next/previous carousel controls merely from those functions/imports.
- Both discovery pages locally duplicate category arrays, category membership data, and a 23-title `allShows` array. Search is lowercase substring matching performed on each input change; category selection clears query/results/suggestions. No server search, pagination, debounce, ranking, or index exists.
- Category membership counts are Adventure 12, Animals 4, Fantasy 6, Music 4, Popular Picks 23, School Life 8, Superheroes 6. Titles overlap categories; these are memberships, not 63 distinct shows. Popular Picks is fixed rather than a recommendation algorithm.
- Parent search generates first-character suggestions only after a nonempty query has zero matches. Child search filters restricted titles but never sets a nonempty suggestions array. Its rendered “Did you mean” block is consequently inactive under the implemented handlers.
- Discovery stores logical focus strings (`search`, `back`, `logo`, `category-N`, `show-N`), directly focuses/blurs the text input, installs/removes a window keydown listener, activates matching `data-focus` elements, and uses gold outline/glow/scale styling. This is custom navigation logic, with gaps documented below.
- Both detail pages use navigation state `{title,image}`, falling back to `Unknown Show` and an empty image when the entire state is absent. Each embeds 22 descriptions and 22 episode counts. Missing title entries use generic description text and generate ten episodes; their label says “Unknown” total.
- Episode arrays are synthetic `{number: i+1, title: 'Episode N'}` objects. Selecting an episode both sets local state and immediately navigates to the player. A conditional “Watch Episode” button also exists, although immediate navigation generally leaves that screen.
- Favorites store only `{title,image}` from detail pages, toggle star/button appearance, and show a three-second notification. They are not server-synchronized bookmarks.
- Parent details adds a profile restriction dialog. `handleProfileToggle` updates `restrictedProfiles` and immediately writes a restriction/removal inside the state updater. The rendered Confirm handler only closes and shows feedback; Cancel only closes. A separate `handleRestrictConfirm` function referencing `selectedProfiles` is defined but not wired to the rendered Confirm action.

### Player details

`src/pages/ChildWatchPages/VideoPlay.js` implements the following browser-side controls:

- Uses refs for the video and fullscreen container; state for play status, volume, percentage progress, duration, fullscreen state, and logical focus.
- Calls `video.play()` / `pause()`, catches play-promise rejection silently, and toggles local play state. It has no `onPlay`, `onPause`, or `onEnded` reconciliation.
- Reads `duration` from metadata/time-update events only when finite; updates progress as currentTime/duration ×100. Seeking converts percentage back into seconds, requires duration >0, and rejects non-finite target time.
- Volume slider spans 0–1 with `0.01` steps; pointer mute toggles between 0 and 1 and assigns the video volume. Arrow volume changes use 0.1 increments clamped to 0–1. The `m` shortcut only changes React volume state, not the video element volume.
- Fullscreen uses `requestFullscreen`/`exitFullscreen` and toggles local state; no fullscreen-change listener or fullscreen-promise rejection handler is supplied.
- Clicking the video container toggles play unless inside `.video-controls`; controls stop click propagation. Double-click requests fullscreen. A pause-state image and hover play overlay supplement the hidden/shown video element.
- The container uses a 16:9 aspect ratio, black background, maximum 80vw width, and a bottom gradient control overlay. Seek and volume controls are native range inputs.
- Keyboard mapping includes left/right movement among back/play/volume/fullscreen, Enter/Space activation except volume, Backspace browser back, `k`/`p` play/pause, `m` mute state, `f` fullscreen, and up/down volume adjustment when volume is logically selected.
- All shows and episodes use `/videos/sample.mp4`; there is no per-title URL, episode source, actual resume offset, autoplay-next logic, caption track, playback history write, or time-limit accounting.

### Shared UI, styling, and accessibility scope

`ColorPick.js` exposes 11 functions for colors/hover colors: primary white, secondary `#9381ff`, third/error `#c84630`, white text, hover black/`#7a6ee6`/`#d35a47`, and menu hover `#f0f0f0`. It is a custom helper, not a configured MUI theme provider. Its array-bound guards use comparisons that would not properly protect every missing index, but the current literal arrays provide the accessed values.

`Header` renders a fixed app bar with KiddoFlix text. Drawer state/list code remains, but the button that opens it is commented out. `Footer` would map public routes into links and show “My dummy website,” but `Layout` comments out its rendering. Page-level KiddoFlix buttons navigate to menu; the global Header brand itself is plain Typography, so the README's general home-button description does not apply to that header.

Accessibility-related implementation includes MUI labels, some alt text, password-visibility aria labels, and custom focus highlights. The repository does not establish accessibility compliance or complete keyboard coverage: image-background show buttons lack textual labels, some cards are removed from normal tab order, child-selection Boxes are click-driven, and the custom discovery focus wiring has gaps. Default CRA CSS respects reduced-motion preference for its unused logo animation, but that does not establish reduced-motion handling for custom page hover transitions.

## Database / Data Engineering

### Browser storage schema and ownership

There are **five application-defined localStorage keys**, with no schema-version field, migrations, account scoping, remote synchronization, encryption, or relational constraints.

| Key | Serialized shape | Writers and readers |
|---|---|---|
| `parentProfile` | `{name: string, imageURL: string}`; imageURL can be a Data URL. | ParentProfileInit writes; ProfileViews reads. |
| `kiddoflix_favorites` | Object keyed by profile name; each value an array of show objects (UI supplies `{title,image}`). | StorageUtils; child/parent details and home pages. |
| `kiddoflix_restrictions` | Object keyed by profile name; each value an array of title strings. | StorageUtils; parent details writes, child home/search reads. |
| `kiddoflix_time_limits` | Object keyed by profile name; values are total minutes. | StorageUtils; ScreenTime writes, ChildMain reads. |
| `kiddoflix_locked_profiles` | Array of exact profile-name strings. | ScreenTime helper exports; ScreenTime edits and ChildMain checks. |

StorageUtils exposes nine named functions: `getFavorites`, `saveFavorite`, `removeFavorite`, `getRestrictions`, `saveRestriction`, `removeRestriction`, `isShowRestricted`, `getTimeLimit`, `saveTimeLimit`. It also exports the same functions in a default object. ScreenTime exports `getProfileLockStatus` and `setProfileLockStatus` separately from its default component.

Favorites are deduplicated by exact `title` with `some`; existing duplicates do not update their image. Restriction/lock arrays use exact `includes` comparisons and only append absent values. Removals use filtering or splice. Each mutation reads/deserializes the whole stored collection and rewrites it as JSON; there are no transactions, compare-and-swap operations, indexes, or merge protocols.

**Interpretations from the implementation:** independent tabs can overwrite changes because whole-value read/modify/write operations have no coordination. There is no storage-event subscription to refresh other screens. Renaming a profile would need key migration to preserve associations, but no such migration exists and the edit dialog currently does not perform a real rename. Case-insensitive avatar lookup and case-sensitive persistence keys can disagree. Arbitrary route profile names are accepted, and parent routes that request `profileName` without defining that parameter operate with `undefined`, which becomes an object property key when stored.

### Static datasets and transformations

1. **Child fixture:** two `{name,imageURL}` records, Cam and Dawson, in `ConstantLib.js`. The array is returned directly by `getKidsProfile`; no mutation service or persistent child list is supplied.
2. **General metadata fixture:** 19 show records in `ConstantLib.js`, each with `title`, `desc`, `trailer`, `thumbnail`, `rating`, `age`, and `genre`. Used particularly by history/result cards. It includes adult-oriented examples and differs from the child discovery dataset.
3. **Discovery fixtures:** 23 titles duplicated in child and parent `allShows`, with category maps containing overlapping subsets of those titles. They are not two external datasets or two integrations.
4. **Recent fixtures:** 15 title/image records in each home-browser variant, not timestamps or recorded watch events.
5. **Details metadata:** matching sets of 22 description entries and 22 episode-count entries duplicated in child/parent details. These counts drive generated buttons, not actual media files.
6. **Other fixtures:** `HISTORY_sample_week` in ConstantLib has seven title/time/day entries but is neither exported nor consumed. A module `week` value has setter/getter exports without active consumers. TimeSelector has three date strings. RestrictViewDialog starts with four title strings in component state.

The search catalog titles are Franklin; Wonder Pets; Backyardigans; Avatar; Fairly OddParents; Dora; Handy Manny; Max & Ruby; SpongeBob; Phineas and Ferb; Johnny Test; Hannah Montana; Drake & Josh; iCarly; The Suite Life of Zack & Cody; Cory in the House; Danny Phantom; Kim Possible; Batman; Super Why; Harry and His Bucket Full of Dinosaurs; Naruto; Peppa Pig.

The 19 general metadata titles are SpongeBob SquarePants; Avatar: The Last Airbender; Breaking Bad; Stranger Things; The Office; Game of Thrones; Rick and Morty; The Mandalorian; The Simpsons; Attack on Titan; Black Mirror; Brooklyn Nine-Nine; Friends; Better Call Saul; Futurama; One Piece; The Witcher; The Boys; Invincible.

### Stored episode-count values

These are **repository fixture values**, not externally verified show facts, supplied episodes, or processed-record measurements. Evidence: both details modules, `showEpisodeCounts`.

| Fixture title | Count | Fixture title | Count |
|---|---:|---|---:|
| Avatar | 61 | Backyardigans | 80 |
| Batman | 65 | Cory in the House | 34 |
| Danny Phantom | 53 | Dora the Explorer | 178 |
| Drake & Josh | 57 | Fairly OddParents | 172 |
| Franklin | 78 | Handy Manny | 78 |
| Hannah Montana | 98 | Harry and His Bucket Full of Dinosaurs | 52 |
| iCarly | 97 | Johnny Test | 117 |
| Kim Possible | 87 | Max & Ruby | 96 |
| Peppa Pig | 369 | Phineas and Ferb | 129 |
| SpongeBob | 272 | Super Why | 103 |
| The Suite Life of Zack & Cody | 87 | Wonder Pets | 60 |

Title-key mismatches are meaningful: discovery/recent uses `Dora`, but descriptions/counts use `Dora the Explorer`; recent uses `Max and Ruby` and `Zach & Cody`, whereas discovery/details use `Max & Ruby` and `The Suite Life of Zack & Cody`; Naruto is absent from the description/count maps. This explains generic detail fallbacks and means title-based restrictions/favorites do not consistently identify the same show across all screens. There are no canonical IDs or normalization layer.

Data transformations are local: lowercasing for searches/profile lookup, hours/minutes conversion, JSON serialization, FileReader Data URL conversion, progress percentages, and episode array generation. No ETL, migrations, batch synchronization, checkpoints, database queries, or record-processing pipeline is demonstrated.

## External Integrations

There are **no application-level external API integrations** demonstrated. External resource references are:

| Resource | How it is used | Limits |
|---|---|---|
| Remote profile images | Default children load URLs from Google-hosted image thumbnails and `pbs.twimg.com`; parent default uses Freepik; Add User uses iStock. | Ordinary image requests, not authenticated provider integrations. No availability/cache/error strategy supplied. |
| Remote show thumbnails | ConstantLib includes Google/Wikipedia-hosted image URLs rendered by HistoryCard. | Fixtures, not live catalog ingestion. |
| YouTube link | HistoryCard opens one hardcoded `youtu.be` URL in a new tab with `rel="noopener noreferrer"`. | It does not select `a.trailer`; there is no YouTube player/API integration. |
| Image-source references | `public/images/ref.txt` records 23 labeled sources, including Unsplash, Reddit, ABYstyle, Google Images, wikis, Rotten Tomatoes, Kanopy, Disney+, Amazon, YouTube, Bilibili, TV sites, and wallpaper sites. | Attribution notes; no evidence these sites are called as runtime APIs or that permissions/licenses were validated. |

Package registry resolution URLs in `package-lock.json`, tutorial links in comments, and CRA documentation links in README are development/documentation references, not product integrations.

## Reliability / Failure Handling

### Implemented mechanisms

- StorageUtils wraps reads and writes in try/catch, logs operation-specific errors, and returns `[]`, `false`, or `0` on failed reads. Missing entries default to empty JSON objects and per-profile defaults.
- Lock helpers similarly catch/log failures and return false from a failed lock check.
- Favorites/restrictions/locks suppress duplicates as described above.
- ProfileViews catches malformed stored parent JSON and retains default state. The initial `localStorage.getItem` occurs outside that parse try block.
- Unknown profile lookup falls back to `{name:"U", imageURL:""}`. Details/player have defaults when navigation state is absent; descriptions/counts have missing-title fallbacks.
- Form handlers expose required-field/format/mismatch feedback; screen-time input fields clamp independently; media seeking checks finite time/duration.
- Discovery/player window keydown listeners and ScreenTime's custom-event listener have effect cleanup on unmount/re-run.
- ChildMain clamps calculated remaining minutes at zero. TimeSelector prevents stepping past the three supplied ranges.
- Account and restriction-dialog prototypes use delayed closures (1,000 ms), and notifications use 3,000 ms auto-hide durations. These are interaction timings, not retry policies or performance measurements.

### Failure-handling limits

- JSON shape/type validation is absent. Parseable but incorrect data can reach unsupported operations; catches cover some paths, but consumers can still receive unsuitable values (for example a non-array favorite value).
- Failed writes are logged without returning a success/failure result. Callers can show success and update local UI despite storage failure. ParentProfileInit writes without a catch.
- Restriction and lock read errors return permissive false/empty results; they do not fail closed. These are demo controls rather than reliable access enforcement.
- There is no retry, exponential backoff, checkpoint, transaction, rollback, resumability, persistent job record, stale-job detection, or recovery endpoint.
- Image loads and FileReader have no implemented error UI or fallback/error callback. Images are not resized or bounded before localStorage persistence.
- Player errors are swallowed; play state can diverge from actual playback. Fullscreen errors and browser-driven exit are not reconciled.
- Dialog timeout handles are not retained/cleared on unmount. Restriction state writes occur inside a React state updater; this mixes persistence side effects with state calculation, particularly relevant because the root uses StrictMode.
- There is no application error boundary, centralized logger, telemetry collector, health check, or persisted audit log. Console logging and transient UI messages are the demonstrated observability.

## Security

Implemented security-adjacent mechanisms are **client-side demo checks and validation**, not production authentication/authorization:

- Fixed login credential and PIN comparisons provide the demonstrated entry interactions. Password/PIN fields use masked input types, and password visibility buttons are present where described.
- Account creation validates field formats and confirmations; it does not create credentials, hash a password, or establish a session.
- Browser-local title restrictions and lock flags affect specific child screens. Parent routes, child details, and video routes are not protected by a shared guard.
- The external trailer link uses `noopener noreferrer` for its new-tab target.
- `.gitignore` excludes dependency/build/coverage directories, package-manager logs, `.DS_Store`, and environment-specific `.env.*.local` variants. There is no environment example or application environment-variable configuration. This ignore configuration is not evidence of a secrets-management system.

No server-side authorization, RBAC policy engine, token/cookie/session validation, rate limit, password reset, hashing/encryption scheme, protected media URL, CSRF mechanism, security headers, or transport configuration is implemented in the application. Parent and child are two **interface modes**, not two securely enforced roles. Stored profile/favorite/control data is browser-accessible JSON without an account boundary. Exiting or deleting via the prototype does not clear it.

## Testing / Quality

### Repository tests and configuration

- **One test declaration in one test file**: `src/App.test.js`, `test('renders learn react link', ...)`. It renders App, looks for `/learn react/i`, and expects the element to be in the document.
- `src/setupTests.js` imports `@testing-library/jest-dom` for matchers. Both it and the test depend on packages missing from the manifest, lockfile, and inspected installation.
- The application does not render a “learn react” link. Therefore this assertion is stale relative to current UI even if dependency/setup failures were addressed. No successful test-run output is stored or claimed here.
- `npm test` delegates to `react-scripts test`; `eslintConfig` extends `react-app` and `react-app/jest`. There is no custom Jest configuration, explicit lint npm script, checked-in coverage, CI workflow, integration suite, end-to-end suite, or feature-specific automated test in the tracked tree.
- React StrictMode is enabled. Its behavior is framework-provided and does not substitute for tests.

### Read-only verification performed for this record

1. Enumerated all tracked files and the non-vendor local tree; inspected all application/configuration/documentation files and asset file types. Parsed package JSON/lock metadata.
2. Parsed all **51 JavaScript files** with the locally available Babel parser using module and JSX syntax. All parsed successfully. Syntax parsing does not prove valid imports, correct hooks, passing lint, or successful rendering.
3. Counted routes and fixture arrays/object maps through their parsed declarations, rather than estimating from UI descriptions.
4. Ran **nine investigative checks** on StorageUtils in an isolated Node VM using a Map-backed localStorage substitute: missing favorites default; title deduplication retaining original image; profile separation; favorite removal; restriction deduplication/lookup; restriction removal; time-limit default/round-trip; malformed JSON fallbacks; caught write failure. All nine passed. The in-memory harness removed ES export syntax only; it did not write source, create test files, or use real browser storage. These checks are not nine pre-existing repository tests and do not validate UI workflows.
5. Verified missing testing-library packages against manifest, lockfile, and local package paths; verified absence of the configured video asset against the tree.
6. An additional in-memory ESLint `no-undef` check was attempted but did not produce a result before it was interrupted. No lint-pass claim is made.

A production build, CRA test runner, or browser session was not run. This avoids generating caches/build artifacts in existing directories and preserves the requested read-only investigation. Runtime/browser behavior and build success remain unverified.

### Source-confirmed gaps and technical interpretations

| Finding | Evidence and consequence |
|---|---|
| Missing video asset | VideoPlay requests `/videos/sample.mp4`; no such file is supplied. Actual playback from this repository alone is not established. |
| Account actions are simulations | Add/Edit/RemoveChild, ChangePassword, and DeleteAccount handlers show feedback/close/navigate without data mutations. Delete does not clear localStorage. |
| Change-password validation is weak even as a demo | Only current-password nonemptiness and equality of new/confirm are checked. Empty new and confirm strings compare equal; current password is not verified. |
| Restrictions do not cover all access paths | ChildMain and child text search filter titles, but child category rendering uses the raw category array. Child details/player do not check restriction or lock status. Fixed resume bypasses title filtering. |
| Screen-time limits are not enforced | No accumulating usage, timer, daily date/reset, or player limit check exists. ChildMain randomizes used time and displays zero without automatically navigating on exhaustion. Avatar clicks can navigate to the time-limit Kickout manually. |
| Saved time limit is not loaded into editor | ScreenTime initializes 60 minutes; TimeSlider initializes 1h 0m and does not read the selected child's saved limit. Switching child loads lock state but not its limit. |
| Time bounds are independent | Hours allow 24 and minutes allow 59, so text fields can represent 24h59m even though the slider maximum is 24h. Fields do not explicitly enforce integer values. |
| Undefined parent profile identity | ParentMain, parent discovery, and parent details call `useParams().profileName` although their routes have no such parameter. Favorites may use the `"undefined"` storage bucket and player links `/videoplay/undefined`; avatar uses U. |
| Resume navigation state mismatch | Both home variants pass `{title:"Naruto",image}`; player destructures `showTitle` and `episode`. Because state exists, the whole-object fallback does not supply missing fields. The displayed title/episode can be undefined. |
| Exact-title identity mismatch | Dora, Max and Ruby, Zach & Cody, and ConstantLib naming differ across datasets. Restriction/favorite association and detail lookups use exact titles. |
| Restriction Cancel is not rollback | Parent detail checkbox writes immediately; Cancel merely closes. Confirm is notification/closure, not the storage commit. |
| History date initial mismatch | TimeSelector starts at index 2 but does not call its parent callback on mount; History starts `showIndex` at 0. Initial visible date and selected fixture branch can disagree until interaction. |
| History is not telemetry | HistoryCard always renders “Watched: 50 minutes”; History switches among fixed first-four ConstantLib shows. No watch-event input or date query exists. |
| Restrict search is not connected | SearchBar holds its own text and logs it; Restrict's separate Search button toggles fixed child-dependent result cards. RestrictViewDialog contains its own four-item list. |
| Shared history-dialog open flag | One `HistoryCard.open` boolean controls a RestrictDialog inside every mapped card; with multiple shows, each receives the same true value. Interpretation: multiple dialogs may open together. No clicked-title/profile context is passed. |
| Discovery focus wiring gaps | Handlers refer to `back`/`logo` data-focus targets, but those rendered buttons have no corresponding attributes. `categories.indexOf(selectedCategory)` compares object entries against a string, so it cannot recover the selected category index. |
| Player key-handler closure risk | Its listener effect depends on focus/volume, not play/fullscreen state even though handlers use those values. Interpretation: keyboard play/fullscreen can use stale state between reattachments. |
| Player state does not reflect browser events | `m` does not set actual element volume; play rejection still allows local toggle; no ended/fullscreenchange handling. No claim of robust media control synchronization. |
| Repeated IDs and incomplete edit behavior | EditChildDialog repeats `id="file-upload"` for children and file handler does nothing. RemoveChildDialog repeats checkbox `id="1"`, tracks one name despite multiple checkboxes, and does not remove data. |
| Notification is not proof of success | Storage helpers swallow errors; account dialogs are simulations. “Saved/changed/deleted successfully” text must not be treated as evidence of a completed durable mutation. |
| Legacy/default imports and unused code | Several files contain unused imports, handlers, constants, and commented controls. Examples include default `Box` imports from the MUI barrel in account-dialog modules, unused default `Button` in Kickout, unused scroll helpers, and unused restriction-confirm state. No build/lint result establishes their exact toolchain impact. |
| Optional metrics API mismatch | reportWebVitals requests `getCLS/getFID/getFCP/getLCP/getTTFB`; the installed locked web-vitals distribution exposes `onCLS/onFID/onFCP/onLCP/onTTFB` names. The no-callback invocation avoids that branch. Activating it as written would require reconciliation; no metrics are recorded. |

These findings record the repository's current implementation. They are not fixes performed during this investigation, and source-derived runtime consequences are not presented as observed browser failures.

## Deployment / Infrastructure

### Demonstrated build/run configuration

`package.json` has four scripts:

| Script | Command | Scope |
|---|---|---|
| `start` | `react-scripts start` | CRA development server. README specifies localhost:3000. |
| `build` | `react-scripts build` | CRA production build command; no build executed here. |
| `test` | `react-scripts test` | CRA test runner, with the test limitations above. |
| `eject` | `react-scripts eject` | Stock escape hatch; not executed and no ejected config is present. |

Production Browserslist targets `>0.2%`, `not dead`, `not op_mini all`; development targets the last Chrome, Firefox, and Safari version. These are compatibility target declarations, not a browser compatibility test result.

The HTML template uses `%PUBLIC_URL%` for favicon, app icon, and manifest links. Application show images and video use root-relative `/images/...` and `/videos/...` paths. **Interpretation:** subpath hosting would require attention to those paths, and BrowserRouter deep links would require hosting fallback support; no host configuration demonstrates either.

The manifest retains “React App” / “Create React App Sample,” three icon entries, `start_url: "."`, standalone display, black theme color, and white background. `robots.txt` allows all user agents with an empty Disallow. No service-worker registration or offline strategy establishes a working offline PWA.

### Not present

No Dockerfile, container-compose topology, Kubernetes files, reverse proxy configuration, cloud/IaC definition, hosting-provider settings, CI/CD workflow, deployment script, `.env` example, application environment configuration, Node version pin, or documented production domain is present in the inspected tracked tree. A build script and template deployment links are not evidence that deployment occurred. Actual deployment topology/environment is unknown.

## Performance / Scale

No measured latency, throughput, concurrency, memory usage, bundle size, production user count, startup duration, processing duration, or before/after improvement is available. The web-vitals helper is called without a callback and no result dataset exists.

Verified implementation characteristics are:

- Discovery linearly scans a fixed 23-item array on each input change. This is a source-level algorithm observation, not a benchmark.
- Child filtering repeatedly calls a storage helper that reads/parses the restriction JSON per title. No memoization or cached restriction set is implemented.
- Episode pages generate/render all numbered buttons at once. The largest configured count is 369 (Peppa Pig); there is no pagination or virtualization. This is fixture/render scale, not 369 playable episodes.
- Storage mutations rewrite whole JSON values synchronously; there is no concurrent-write coordination or batched persistence.
- Profile images are read as full Data URLs and stored without resizing/compression; actual stored sizes and browser quota outcomes are unknown.
- Image files include large source dimensions, for example `batman.jpg` is 6000×4000 and `cory.jpg` / `kim_possible.jpg` are 3840×2160 according to file headers. CSS scales them; no image-optimization pipeline is supplied. This establishes source dimensions, not measured page weight or load-time impact.
- Hover/smooth-scroll styling and progress indicators are UI behavior, not measured performance optimizations. CRA minification/hashing discussed in README is framework build behavior, not a project-specific optimization or evidence of a successful build.

## Technical Challenges / Complexity

The following are technically meaningful implementation concerns, without implying unusual scale or proven production robustness:

1. **Preserving identity through several screens.** The project passes profile identity in paths and show/episode identity in router state, then indexes persistence by names/titles. This connects many screens but requires consistent naming and route contracts; current parent-route and title discrepancies show that coupling.
2. **Separate parent and child experiences.** Shared fixtures/utilities support separate browse/detail files and a nested parent-control layout. Much of the catalog, keyboard logic, and detail metadata is duplicated, making consistent behavior across variants a maintenance concern. There is no rationale document establishing why duplication was chosen.
3. **Combining browser state with persistent controls.** Favorites, restrictions, limits, locks, profile state, callback selection, and a custom event coordinate independent components. The code demonstrates these connections, but does not provide transactions, rollback semantics, or cross-tab synchronization.
4. **Keyboard navigation alongside text entry.** Discovery distinguishes active input from logical focus and routes arrow/activation/back keys. Player shortcuts add another stateful interaction model. Correct focus targets and effect dependencies matter; current gaps prevent claiming complete remote-control or accessibility support.
5. **Media element/control synchronization.** The wrapper translates time/progress/volume/fullscreen events into UI state and guards finite seek values. Missing source media and incomplete event reconciliation limit its demonstrated completeness.
6. **Time-entry representation and enforcement boundaries.** Decimal slider hours are split into hours/minutes, then converted into integer-like minute totals for storage and display. The settings and visualization are implemented; accounting for actual elapsed viewing, date rollover, and enforcement is not.
7. **Prototype communication.** Dialog confirmations and save messages provide interaction feedback while some actions remain simulations. Maintaining an accurate distinction between UI intent and durable behavior is necessary to understand this repository; this record preserves it.

## Documentation / Operational Support

- `README.md` supplies a repository clone URL, MUI installation command, optional router installation, `npm start`, sample credentials, account input requirements, interface guidance, navigation tips, and an explicit design-concept statement.
- Its custom application guide documents parent child-management/restriction/history/time controls and child category/detail/watch interactions. Some descriptions exceed implemented behavior: any valid input does not log in because login/PIN use fixed values; child management/password deletion are simulations; history is not actual collected data; PIN visibility toggles are not supplied throughout the described forms.
- The remaining README content is CRA-generated guidance for scripts, build, eject, code splitting, bundle analysis, PWA, configuration, deployment, and minification troubleshooting. Linked topics are not evidence those capabilities were customized or exercised.
- `public/images/ref.txt` preserves 23 image-source entries. It is attribution/reference documentation, not a complete license inventory; Paw Patrol has an asset but no corresponding entry in that list.
- Inline comments document demo-only random usage, unimplemented save behavior, fixed watch times, intended refactoring, disabled footer/header controls, and prototype shortcuts. They help distinguish intent from executed code. No chronology or completion claim is inferred merely from comments.
- No API specification, schema document, architecture decision record, formal usability-study report, operator runbook, monitoring guide, recovery procedure, admin CLI, recovery endpoint, or deployment record is present. Parent-facing settings pages are UI controls rather than operational administration tooling for a backend.

## Quantifiable Evidence

Counts were determined by `git ls-files`, extension/directory grouping, parsed JavaScript declarations, package JSON, or exact source values. They exclude this analysis file unless explicitly stated. Fixture values and UI timings are not production metrics.

| Metric | Value | Evidence / counting method |
|---|---:|---|
| Existing tracked files | 90 | `git ls-files`, before adding this document. |
| Source JavaScript files | 51 | Tracked `src/**/*.js`, including test/setup/metrics. |
| Page files | 21 | 7 direct + 4 ChildWatchPages + 10 ParentControls. |
| Component-directory files | 21 | 5 direct + 4 menuComponents + 12 parentLayoutCompo. |
| Tool modules | 4 | ColorPick, ConstantLib, HelperPages, StorageUtils. |
| Named client route entries | 21 | HelperPages: 16 public + 5 parent-layout. |
| Wildcard fallback routes | 1 | App route `*`. |
| Implemented application API endpoints | 0 | Complete application source/tree inspection; routes are frontend-only. |
| Server database models/migrations | 0 | No server/database/migration artifacts in inspected tree. |
| Demonstrated UI modes | 2 | Parent and child screens; not enforced RBAC roles. |
| Fixture child profiles | 2 | ConstantLib `kidsProf`, Cam and Dawson. |
| App-defined localStorage keys | 5 | StorageUtils (3), ScreenTime (1), ParentProfileInit/ProfileViews (1). |
| StorageUtils named functions | 9 | Named exported helper declarations. |
| Lock helper exports | 2 | ScreenTime get/set lock functions. |
| General metadata fixture shows | 19 | ConstantLib `shows` array elements. |
| Search titles per discovery page | 23 | `allShows` array elements in each variant; duplicated catalog. |
| Discovery categories per variant | 7 | `categories` entries and `shows` map keys. |
| Category memberships per variant | 12 / 4 / 6 / 4 / 23 / 8 / 6 | Adventure / Animals / Fantasy / Music / Popular Picks / School Life / Superheroes arrays. |
| Recent fixture cards per home variant | 15 | `recentShows` arrays in ChildMain and ParentMain. |
| Description entries per detail variant | 22 | `showDescriptions` map properties. |
| Episode-count entries per detail variant | 22 | `showEpisodeCounts` map properties. |
| Largest configured episode-button count | 369 | Peppa Pig fixture, not supplied media count. |
| Fallback generated episodes | 10 | `showEpisodeCounts[title] || 10`. |
| Fixed history date ranges | 3 | TimeSelector: April 6–12, 13–19, 20–26; year unspecified. |
| History-card watch time text | 50 minutes | HistoryCard literal; not measured usage. |
| Inactive weekly sample rows | 7 | ConstantLib `HISTORY_sample_week`. |
| Restriction-view initial sample titles | 4 | RestrictViewDialog local state. |
| Image assets under public/images | 25 | File inventory excluding `ref.txt`. |
| Image-source reference entries | 23 | Labeled reference blocks in `ref.txt`. |
| Repository test cases | 1 | One `test(...)` in `src/App.test.js`; template assertion. |
| Investigative storage checks | 9 passed | In-memory harness described under Testing; not committed tests. |
| Successfully syntax-parsed JS files | 51 | Babel parser with JSX/module options; not build verification. |
| npm scripts | 4 | start, build, test, eject. |
| Root dependency declarations | 12 dependencies + 1 devDependency | package.json object keys. |
| Lockfile version / package-map entries | 3 / 1,380 | package-lock.json; entries include root and nested package paths, not necessarily distinct package names. |
| Creation password minimum | 6 characters | Create `validatePassword`. |
| Creation PIN length | 4 numeric digits | Create validation and input limits. |
| Default editor time | 60 minutes | ScreenTime state; TimeSlider 1h 0m. |
| Slider range / step | 0–24 hours / 0.25h (15 minutes) | TimeSlider props. |
| Text input clamps | Hours 0–24; minutes 0–59 | TimeSlider handler; combined maximum can exceed 24h. |
| Simulated used-time range | Integer 0–29 minutes | ChildMain `Math.floor(Math.random() * 30)`. |
| Notification auto-hide | 3,000 ms | Snackbar props in relevant dialogs/details/ScreenTime. |
| Delayed dialog action | 1,000 ms | Account/restriction prototype timeout handlers. |
| Video volume range / slider step | 0–1 / 0.01 | VideoPlay input props; arrow adjustment 0.1. |

## Evidence Map

Paths are relative to the repository root. Function/component names are stable anchors for the inspected version; entries emphasize substantial functionality and boundaries rather than citing every style property.

| Claim | Concrete evidence |
|---|---|
| React SPA with centralized nested routing | `src/index.js` root; `src/App.js` App; `src/tools/HelperPages.js` publicPages/authPages; `src/components/Layout.js`; `src/components/ParentLayout.js`. |
| Application is documented as a concept | `README.md`, “Login Information & Application Guide,” explicit design-concept note; simulation comments/handlers in dialogs. |
| Fixed credentials rather than real authentication | `src/pages/Login.js` handleSubmit; `src/pages/ParentControls/ParentLogin.js` handleMove/pageMover; no guards in App/ParentLayout. |
| Validation without registration persistence | `src/pages/Create.js` validateEmail/validatePassword/handleSubmit. |
| Parent profile persistence and picture preview | `src/pages/ParentControls/ParentProfileInit.js` handleProfilePictureChange/handleSubmit; `src/components/menuComponents/ProfileViews.js` mount effect. |
| Favorites persist by profile/title | `src/tools/StorageUtils.js` get/save/removeFavorite; both details modules' handleFavoriteClick; both home effects. |
| Restrictions persist only in parent-details workflow | `src/pages/ParentControls/ShowParentDetails.js` handleProfileToggle and rendered dialog; `src/tools/StorageUtils.js` restriction functions. |
| Child filtering is partial | `src/pages/ChildWatchPages/ChildMain.js` filteredFavorites/filteredRecentShows; `FindShow.js` handleSearch versus raw category render; no checks in ShowDetails/VideoPlay. |
| Limits/locks persist but time is simulated | `ScreenTime.js` helper exports, handleConfirm/handleLockToggle; `TimeSlider.js`; `ChildMain.js` effect/random usage; `Kickout.js` reason query. |
| Custom media-control wrapper, missing source | `VideoPlay.js` media handlers, key handler, refs and `<video src="/videos/sample.mp4">`; public asset inventory. |
| Search/category/focus behavior | Child `FindShow.js` and parent `FindShow_Parent.js`: allShows, shows, handleSearch, handleKeyDown, getFocusStyle. |
| Generated episode lists | Child `ShowDetails.js` and `ShowParentDetails.js`: descriptions/count maps, Array.from, handleEpisodeClick. |
| Child/account management not durable | `AddChildDialog.js`, `EditChildDialog.js`, `RemoveChildDialog.js`, `ChangePasswordDialog.js`, `DeleteAccountDialog.js`: submit/file handlers; no persistence calls. |
| History/restriction management uses fixtures | `History.js`, `Restrict.js`, `HistoryCard.js`, `TimeSelector.js`, `RestrictDialog.js`, `RestrictViewDialog.js`, `SearchBar.js`. |
| Shared data is static and inconsistent across catalogs | `ConstantLib.js` kidsProf/shows; browse recent arrays; discovery arrays; detail maps. |
| Recovery consists primarily of local catches/defaults | `StorageUtils.js` all functions; ScreenTime lock helpers; ProfileViews parse handling; VideoPlay play catch. |
| Build/test configuration is CRA-based | `package.json` scripts/eslintConfig/browserslist; `package-lock.json`; README stock script documentation. |
| Existing automated test is stale and lacks dependencies | `App.test.js`, `setupTests.js`, package manifest/lock, and current App/home output. |
| No collected performance evidence | `src/index.js` no-argument reportWebVitals call; `reportWebVitals.js` callback guard; no metrics/report artifact. |
| Assets are external/template material | `public/images/ref.txt`; image/profile URLs; `public/index.html`, manifest/icons and `src/logo.svg`; CRA README declaration. |

## Git / Development History

Git history was **not analyzed**, and no authorship investigation was performed. Current source, fixtures, and configuration adequately expose the delivered scope and its prototype limits. Read-only Git usage was limited to file inventory/status and preservation checks. No chronology, delivery date, prior removal/refactoring, individual commit responsibility, or deployment event is inferred from timestamps, README recollections, or package versions.

## Uncertain / Not Verifiable

- Production deployment, hosting environment, domain, user count, real accounts, real watch volume, commercial operation, or business impact.
- Successful build or complete browser execution of the current tree; syntax parsing and isolated storage checks do not establish these.
- Performance, bundle-size, accessibility, usability, cross-browser, security, reliability, or scalability outcomes.
- Actual licensed media availability or authorization to redistribute external artwork; source references do not establish license terms.
- Whether sample show descriptions/ratings/episode counts are accurate in the real world. They are preserved as fixtures only.
- Whether `/videos/sample.mp4` was supplied externally in some other demonstration environment.
- Why particular catalogs, duplicated page implementations, colors, route naming, demo credentials, or storage designs were selected beyond observable comments and behavior.
- Earlier prototypes, features removed before this snapshot, fixes/debugging performed historically, or duration of development. No history was examined to reconstruct them.
- Any formal course specification, evaluation result, design report, user research, or grading context; the repository name alone does not establish those details.
- Exact origin of every template-derived line and generated fixture sentence. The CRA declaration and fixture comment support attribution boundaries but not line-level provenance.
- No unresolved personal ownership question is introduced: original project implementation is treated as the sole developer's work per the supplied ownership statement.

## Questions Requiring External Context

1. What problem statement, assignment requirements, or intended demonstration scenarios guided the prototype?
2. Was this version demonstrated or hosted anywhere, and was sample video provided outside the repository?
3. Were usability sessions, accessibility checks, evaluations, or formal design artifacts produced separately? If so, what evidence records their results?
4. Which workflows were deliberately left as simulations versus intended for later functional completion?
5. Were the duplicated catalogs/parent-child variants and browser-storage design deliberate tradeoffs with documented reasons?
6. What licenses or permissions apply to the show images, profile images, and any demonstration video?
7. Are there externally recorded measurements, usage data, deployment details, or earlier project artifacts that should supplement this source-based record?

## Additional Technical Details

### Complete application-file inventory

This index preserves smaller modules and inactive artifacts as well as primary screens. Paths below omit `src/` for readability.

| File(s) | Specific role/detail |
|---|---|
| `App.js` | Route mapping, outer white/min-height wrapper; maps route arrays without React keys. |
| `index.js` | React root and StrictMode; CSS and optional-vitals entry. |
| `App.css` | Stock `.App`, logo/header/link styles and 20-second logo rotation keyframes; not the main custom UI styling. |
| `index.css` | Body margin reset, system font stack, antialiasing, code font stack. |
| `logo.svg` | Retained React logo asset; no active import in App. |
| `App.test.js`, `setupTests.js` | Template test and missing testing-library matcher import. |
| `reportWebVitals.js` | Callback-guarded dynamic metrics import with legacy getter names. |
| `tools/ColorPick.js` | Shared color and hover getter API; no ThemeProvider. |
| `tools/ConstantLib.js` | Two profiles, 19-show metadata array, unused weekly fixture/week state. |
| `tools/HelperPages.js` | Registry helpers getPublicPages/getAuthPages/getAllPages and JSX screen instances. |
| `tools/StorageUtils.js` | Nine JSON persistence helpers and default export object. |
| `components/Header.js` | Fixed brand bar; dormant drawer-opening control. |
| `components/Footer.js` | Public-route links and dummy text; not mounted. |
| `components/Layout.js` | Header and Outlet; Footer commented out. |
| `components/ParentLayout.js` | 20% sidebar / 80% child outlet; no auth check. |
| `components/SearchBar.js` | Local text input plus console-log submit; no result callback. |
| `components/menuComponents/ExitButton.js` | Reusable arrow/link with destination and label defaults; color prop is not used in rendered styling. |
| `components/menuComponents/ChildProfileSel.js` | Linked picture card; gold parent treatment and PARENT badge. |
| `components/menuComponents/ProfileViews.js` | Stored parent plus fixture children and Add User; query-driven hiding of children. |
| `components/menuComponents/ToolBox.js` | Four icon links that encode destination labels into ParentLogin mode. |
| `components/parentLayoutCompo/Sidebar.js` | Five direct parent links plus menu Exit. |
| `components/parentLayoutCompo/ChildSelect.js` | Default child index 1; mount callback; selected border; bubbling name event. |
| `components/parentLayoutCompo/TimeSelector.js` | Three fixed date strings; bounded arrows and Now index 2. |
| `components/parentLayoutCompo/TimeSlider.js` | Decimal-hour slider and independent hour/minute fields; effect callback. |
| `components/parentLayoutCompo/HistoryCard.js` | Metadata/thumbnail cards, fixed watched minutes, hardcoded trailer URL, shared restriction-dialog state. |
| `components/parentLayoutCompo/RestrictDialog.js` | Yes/No restriction confirmation with simulated success/delay. |
| `components/parentLayoutCompo/RestrictViewDialog.js` | Exported function is named ReportViewDialog; four sample titles removable only in local state; empty-state message. |
| `components/parentLayoutCompo/AddChildDialog.js` | Name check, image Data URL preview, input reset, simulated success. |
| `components/parentLayoutCompo/EditChildDialog.js` | Fixture-name input fields, inactive image selection, simulated success. |
| `components/parentLayoutCompo/RemoveChildDialog.js` | Fixture checkboxes, last selected-name state, simulated success. |
| `components/parentLayoutCompo/ChangePasswordDialog.js` | Current/new/confirm masked inputs; limited checks and simulated success. |
| `components/parentLayoutCompo/DeleteAccountDialog.js` | Yes/No prompt, notification, delayed navigation to root. |
| `pages/Home.js` | Large circular entry links. |
| `pages/Login.js` | Fixed login and password visibility. |
| `pages/Create.js` | Five-field account-form validation and onboarding navigation. |
| `pages/Menu.js` | Exit, ProfileViews, ToolBox composition. |
| `pages/Kickout.js` | Query-dependent lock/time message/icon and menu exit. |
| `pages/About.js` | Placeholder “Hello from about”; no substantive about content. |
| `pages/NoPage.js` | Box wrapper and 404 heading, valid Box import. |
| `pages/ChildWatchPages/ChildMain.js` | Child home, fixtures/favorites, random remaining time, lock check, unused scrolling helpers/old image arrays. |
| `pages/ChildWatchPages/FindShow.js` | Child categories/search/focus; restricted text filtering but raw category rendering. |
| `pages/ChildWatchPages/ShowDetails.js` | Child descriptions/counts, favorite storage, episode navigation. |
| `pages/ChildWatchPages/VideoPlay.js` | Custom HTML-video wrapper and keyboard controls. |
| `pages/ParentControls/ParentLogin.js` | PIN demo gate and destination mapping. |
| `pages/ParentControls/ParentProfileInit.js` | Parent name/image persistence and onboarding query. |
| `pages/ParentControls/ParentMain.js` | Parent recent/favorite browser and resume; absent route profile parameter. |
| `pages/ParentControls/FindShow_Parent.js` | Parent catalog search and first-character suggestions. |
| `pages/ParentControls/ShowParentDetails.js` | Detail/favorites and persisted per-child restriction toggles. |
| `pages/ParentControls/ParentHome.js` | Welcome and Watch link to parentmain. |
| `pages/ParentControls/Acount.js` | Reusable genButton helper; five independently controlled account dialogs. |
| `pages/ParentControls/History.js` | Date/child selection over fixed ConstantLib examples. |
| `pages/ParentControls/Restrict.js` | Disconnected search UI and fixed result/restriction-list dialogs. |
| `pages/ParentControls/ScreenTime.js` | Selected-child limits, lock helpers/switch, callback and custom-event subscription. |

### Public assets and residual details

The 25 show-image files are `DannyPhantom.jpg`, `Dora.jpg`, `Fairly_OddParents.webp`, `HandyManny.jpg`, `JohnnyTest.webp`, `avatar.jpg`, `backyardigans.jpg`, `batman.jpg`, `cory.jpg`, `drake_Josh.jpg`, `franklin.png`, `hannah-montana.jpg`, `harry.webp`, `iCarly.jpg`, `kim_possible.jpg`, `max_and_ruby.jpg`, `naruto.jpg`, `naruto.png`, `paw patrol.jpg`, `peppa.jpg`, `phineas_and_ferb.png`, `spongebob.jpeg`, `super_why.jpg`, `wonder_pets.jpg`, and `zach_Cody.webp`. Naruto has two supplied formats; Paw Patrol is not referenced by the inspected application source. ChildMain's unused legacy image arrays reference `/images/spongebob.jpg`, while the supplied file is `spongebob.jpeg`; the active discovery catalog uses the supplied extension.

`public/favicon.ico`, `logo192.png`, and `logo512.png` supply the template icon references; `public/index.html`, `manifest.json`, and `robots.txt` retain generic CRA metadata. File extensions and filename capitalization are part of the checked-in asset contract.

History's visible branches select Breaking Bad or Stranger Things for child index 0, and SpongeBob SquarePants / Avatar: The Last Airbender or SpongeBob alone for index 1. These are fixed demo branches, not inferred preferences or actual child behavior. The initial ChildSelect index is 1. A misspelled “Wendesay” string is retained in one history branch; dates have no year. No chronology should be inferred from them.

Other small implementation details include unused Lorem Ipsum variables in History/Restrict, selected-episode color constants not applied in details, repeated mapped elements without keys in several older components, and a footer that would link literal parameterized route patterns if enabled. These support a prototype/unfinished-cleanup interpretation, not a documented history of debugging or refactoring.

### Final preservation and review scope

The final review rechecked the tracked inventory against this component/asset/configuration index, distinguished implemented handlers from placeholders, and tied substantial claims to source paths and named declarations. It did not infer production outcomes or credit library internals as original functionality. SHA-256 content comparisons against the pre-report baseline confirmed that all 90 existing tracked files were unchanged. Git status showed only the new `PROJECT_ANALYSIS.md` file.
