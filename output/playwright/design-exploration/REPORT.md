# Homepage design exploration

> Checkpoint archive: raw logs, browser sessions, temporary hash baselines, and
> first-pass captures remain on disk but are excluded from Git. Final comparison
> assets and structured review results are versioned; see
> [the redesign index](../../../docs/PORTFOLIO-REDESIGN.md).

Two local prototypes built and inspected on October 16, 2026. Neither replaces
the existing homepage. No deployment was performed.

## Open locally

- Editorial: http://127.0.0.1:3000/design-lab/editorial
- Experimental: http://127.0.0.1:3000/design-lab/experimental

Both inherit `noindex, nofollow` metadata. The shared design-lab layout calls
Next's `notFound()` in production. The routes are not linked from any existing
public navigation. This is development-only routing, not an authentication system.

## Concept 1: The Working Edition

An editorial reading experience, combining a typographic opening with carefully
composed project illustrations. Newsreader display typography and Public Sans
supporting text sit on porcelain `#F7F8FC`, with aubergine `#30213D`, slate
`#605D6B`, iris `#5338B8`, and lilac `#E7E1F3`.

Composition:

```text
Name / portfolio description                 Navigation
Large serif statement                       Personal introduction
Current professional work                   Checkpoint illustration
Large chat project              Smaller, offset pet-detection study
Compiler project index entry
Readable career history
Contact
```

The bold element is the typographic opening. Project features have unequal
proportions; the career section favors readable summaries over repeated cards.

Strengths: clear professional positioning, strong reading hierarchy, approachable
personality, and visible current employment before the personal project selection.
Weaknesses: a longer reading experience on mobile; lower immediate interaction;
the current illustrations explain ideas but do not provide actual project captures.

## Concept 2: Look Closer

A poster-like opening with Bricolage Grotesque display typography, layered shapes,
and a single project stage. Public Sans supports reading. Lavender `#EAE5F3`,
grape `#352343`, tangerine `#FF986B`, cobalt `#2947C7`, and white reading surfaces
create a distinct identity. Alternate project states use complementary pale fills.

Composition:

```text
Name                                        Navigation
Large sans-serif statement                  Layered composition
Short introduction                          Project anchor
Full-width dark project section
Project selector        Reveal stage / project explanation
Career section
Large contact invitation
```

Selecting IRC-HAT, Pet detection, or J-- compiler updates the stage and project
account. “Look beneath” moves the foreground layer away, reveals a conceptual
diagram, and opens an explanation with the project's limitations. Changing the
project closes the reveal. Native radios support arrow-key selection; the button
supports keyboard activation and reports its state through `aria-expanded`.

Strengths: stronger immediate recognition, a more playful personality, and an
interaction tied to understanding the actual projects.
Weaknesses: the poster opening delays technical detail; only one project account
is visible at a time; it may suggest a creative-development positioning more than
a backend-focused one. It has more client interaction than the editorial concept.

## Content and artifact integrity

- Existing experience data supplies all three employer summaries, roles, and dates.
- Existing project data supplies editorial project lookup and the IRC-HAT summary.
  Experimental descriptions are brief, faithful adaptations of the existing
  project accounts, including research/course scope and validation limitations.
- No achievements, performance measurements, or commercial outcomes were added.
- Every new project visual is an original, code-drawn **conceptual illustration**.
  There are no actual project screenshots or detection outputs in these prototypes.
- Captions distinguish illustrations from runtime evidence. Descriptive SVG
  alternatives supply the same distinction for assistive technology.
- Fonts are self-hosted inside the design-lab directory with license notices.
- No application dependencies were added or changed.
- Existing Home, Projects, Experience, shared public components, global styles,
  and content data remain unchanged (`git diff --exit-code` on those paths).

## Screenshots

Final desktop captures use a 1440×1000 viewport; mobile uses 390×844.
Full-page capture excludes the native scrollbar where Chrome does so.

| Concept | Desktop viewport | Full desktop | Full mobile |
| --- | --- | --- | --- |
| Editorial | [Opening](editorial-desktop.png) | [Full page](editorial-desktop-full.png) | [Full page](editorial-mobile-full.png) |
| Experimental | [Opening](experimental-desktop.png) | [Full page](experimental-desktop-full.png) | [Full page](experimental-mobile-full.png) |

Additional evidence:

- [Editorial tablet composition](editorial-tablet.png)
- [Experimental revealed state, desktop](experimental-desktop-revealed-full.png)
- [Experimental revealed state, mobile](experimental-mobile-revealed-full.png)

## Browser review and refinements

Used the repository Playwright CLI wrapper with headed local Chrome. Inspected
the desktop and mobile captures of both concepts. Additional layout measurements
cover 320, 390, 768, and 1440 pixels. No horizontal page overflow was found.

Refinements made after reviewing captures:

- Increased supporting copy sizes, including project and employment descriptions.
- Made mobile navigation more legible; moved editorial Resume access to the footer
  on narrow screens and gave experimental navigation its own row.
- Adjusted editorial display sizes at narrow phone and tablet widths.
- Enlarged diagram labels on mobile.
- Clipped the inactive skip link to prevent a fixed-element full-page capture
  artifact; it becomes visible when focused.

Verified project selection, reveal/collapse, reset after project changes, arrow-key
radio selection, Tab/Space button activation, and visible focus. Reduced-motion
emulation disables the layer transition and smooth scrolling. Both pages expose
one main landmark, one h1, and noindex metadata.

Responsive inspection recorded zero console errors, zero console warnings, zero
uncaught page errors, and no HTTP responses with status 400 or above during those
checks. This covers local Chrome, not physical phones or Safari. It is not a full
assistive-technology audit.

## Available checks

- `npm run typecheck`: passed, exit 0. Output (raw log retained locally, excluded from Git)
- `npm run lint`: passed, exit 0; no warnings or errors. Output (raw log retained locally, excluded from Git)
- [Production exclusion source check](production-guard.json): development renders;
  production invokes actual Next `notFound()` and produces `NEXT_NOT_FOUND`.
  The source layout was transpiled for this isolated check with font/CSS loading
  stubbed. A production build or deployed production response was not tested.
- [Responsive measurements](responsive-check.txt)
- [Keyboard activation](keyboard-check.txt)
- [Reduced-motion behavior](reduced-motion-check.txt)
- Final capture log (raw log retained locally, excluded from Git)

The existing local development server was reused and left running.

## Direction recommendation

Editorial is the stronger foundation for communicating professional judgment and
making employment and project evidence easy to assess. Experimental is the bolder
choice for personality and immediate recognition. If combining them later, retain
one typography/palette/layout system and borrow only the purposeful reveal as an
optional case-study interaction.
