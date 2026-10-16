# Editorial personal variation

> Checkpoint archive: raw logs, browser sessions, temporary hash baselines, and
> first-pass captures remain on disk but are excluded from Git. Final comparison
> assets and structured review results are versioned; see
> [the redesign index](../../../docs/PORTFOLIO-REDESIGN.md).

Preview: http://127.0.0.1:3000/design-lab/editorial-personal

Local design exploration, October 16, 2026. Original Editorial V3 and the production
portfolio are unchanged. Nothing was deployed.

## Recommendation

**Keep this small addition.** It provides a modest but useful improvement in
personality without changing the portfolio's professional emphasis. The specific
interests and supplied photograph make the page feel more personal after a long
sequence of technical material. The photo also adds natural texture to a page
otherwise composed of type, diagrams, and charts.

This is a content improvement more than a major visual upgrade. V3 alone has the
more concise ending and gets to Contact sooner. The variation earns its extra
space by staying small: one photograph, one heading, and two short sentences.
I would not expand it into a larger About section, photo gallery, or new navigation
destination.

## Photograph review

Both supplied images were opened and inspected before implementation.

| Supplied file | Assessment |
| --- | --- |
| `ChatGPT Image Oct 16, 2026, 02_35_28 PM.jpg` | Selected. The reflected mountain, muted rock, low cloud, and subdued green water sit comfortably beside the fog and evergreen palette. Its central composition remains legible at a small size. |
| `ChatGPT Image Oct 16, 2026, 02_35_49 PM.jpg` | Attractive panorama, but the broad blue sky would introduce a stronger color presence. The valley's finer details also lose more impact in a small editorial image. Retained untouched and unused. |

The image represents an outdoor interest, not a portrait or project artifact. The
page does not identify a particular mountain, lake, or trail. The Kananaskis
reference describes the owner's stated interests rather than asserting the exact
location of the photograph.

## Design and implementation

Used frontend-design and the installed Playwright CLI. Reviewed V3's source,
report, and saved desktop/mobile screenshots before building.

Retained V3's token system: fog `#F1F3ED`, paper `#FAFBF7`, evergreen `#263F38`,
muted green-gray `#616D65`, sage `#D6DED0`, and rule `#C9D1C5`. Newsreader and
Outfit retain their existing roles. No new color system, typefaces, effects,
dependencies, or professional-content changes.

The personal note sits between Projects and Contact:

```text
Existing project strip

Outside work                  Small 4:3 photograph
Brief note about interests

Existing contact footer
```

The desktop photograph is 320×240px. On mobile it is at most 280×210px and follows
the text, aligned to the right. The whole composition is retained without a crop,
filter, tint, frame, or decorative hover effect. A modest rule and V3's existing
spacing establish the transition. Only the project's trailing padding is adjusted
to avoid stacking the new note on top of an already large empty gap.

The writing is intentionally plain:

> I enjoy hiking around Kananaskis and exploring Alberta. I’m also into basketball.

No connection between outdoor interests and engineering ability is implied. The
copy makes no claims about frequency, specific trips, basketball teams, or whether
the owner plays or watches basketball.

The variation reuses V3's layout, fonts, and interactive components through imports.
Its page is an isolated copy with the personal note inserted; the comparison
footer links directly back to V3. V3's source was not refactored or edited.

## Image delivery

The selected original is 2048×1536px and 727,949 bytes. It remains unchanged.
Created separate derivatives with Pillow, using resize and encoding only:

| Derivative | Dimensions | Bytes |
| --- | --- | ---: |
| WebP, smaller candidate | 480×360 | 23,304 |
| WebP, larger candidate | 960×720 | 83,536 |
| Progressive JPEG fallback | 960×720 | 109,813 |

A native `picture` element supplies responsive WebP candidates and a JPEG fallback.
The image uses lazy loading, asynchronous decoding, explicit dimensions, and
descriptive alternative text. No metadata was copied to the derivatives. Both
original photographs are preserved byte-for-byte.

At the reviewed browser's device scale, the 480px WebP was selected at all tested
widths. Its file is approximately 96.8% smaller than the selected original. The
larger candidate is available for denser displays. No latency or Core Web Vitals
improvement is claimed.

See [optimization details](image-optimization.json).

## Visual review and comparison

The initial desktop/mobile views confirmed that the selected photo works without
color correction and that a smaller mobile image distinguishes the note from the
larger project features. No further visual-system changes were warranted.

The final full-page captures start at scroll position zero. This avoids the
mid-page sticky-header artifact visible in the initial review capture. Original
V3 screenshots were reused for the visual comparison, rather than recaptured.

| View | Editorial V3 | Personal variation |
| --- | --- | --- |
| Desktop full page | [V3](../editorial-v3/desktop-full.png) | [Variation](desktop-full.png) |
| Mobile full page | [V3](../editorial-v3/mobile-full.png) | [Variation](mobile-full.png) |

Detail captures: [desktop note](desktop-note.png), [mobile note](mobile-note.png),
[desktop opening](desktop.png), [mobile opening](mobile.png),
[desktop footer](desktop-footer.png), [mobile footer](mobile-footer.png).
Files containing `first` document the initial review and are not the final captures.

Assessment:

- **Personality:** improved. The interests are specific enough to say something
  about the person without becoming a personal-brand statement.
- **Visual fit:** good. The selected photograph's subdued colors complement the
  existing page, while its natural detail provides a quiet change of material.
- **Composition:** improved slightly. The note creates a pause before Contact;
  V3's simpler ending remains the stronger option if absolute brevity is the goal.
- **Professional focus:** preserved. The entire introduction, professional
  experience, project grid, and additional-project strip are unchanged.
- **Responsive behavior:** good. The note stacks on phones without turning the
  image into a full-width banner. No cropping or horizontal overflow was found.

The addition costs some scroll length, especially on phones, plus one lazy-loaded
image. These are reasonable tradeoffs for the small gain in personality. The
image itself is not biographical evidence; the interests in the accompanying
sentence do most of that work.

## Verification

- TypeScript (raw log retained locally, excluded from Git): passed, exit 0.
- ESLint (raw log retained locally, excluded from Git): passed, exit 0, no warnings.
- `git diff --check`: passed.
- [Browser results](browser-results.json): **32 checks passed**, with no console
  errors, warnings, uncaught page errors, or HTTP failures during the review.
- Live comparison with V3 confirmed identical text and matching geometry within
  one pixel for the hero, experience, project grid, and additional-project strip
  at 1440px. This checks that the inherited professional composition is preserved.
- Responsive checks at 320, 390, 768, and 1440px found no horizontal overflow, one
  main landmark and one h1, and a loaded photograph at its original 4:3 proportion.
- Confirmed skip-link focus, reused application/radio keyboard controls, compiler
  interaction, Contact navigation, footer visibility, and reduced-motion handling.
- The personal copy and photograph also render with JavaScript disabled.
- All three optimized image assets returned HTTP 200 with the expected image types.
- Inherited `noindex, nofollow` metadata is present. The unchanged design-lab
  production guard still applies to the new route.
- [Scope hashes](scope-check.json): all 47 pre-existing app, data, public, and
  dependency files match the baseline, including both original photographs.
  No dependencies were added or changed.

Verification used local headed Chrome. Physical phones, Safari, a full
screen-reader audit, and a production build/deployment were not tested.
