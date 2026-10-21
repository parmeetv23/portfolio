# Portfolio quality recovery

Subsequent owner-requested figure, naming and ordering changes are recorded in [visual adjustments](../visual-adjustments/README.md). That follow-up supersedes those decisions in this historical report.

Reviewed all nine project entries and case studies, homepage project appearances, the Projects collection, Experience, Snap Remedy, Résumé, navigation, footer, and error pages. Preserved the existing Newsreader/Outfit editorial design. Work remains uncommitted on `portfolio-redesign`; no push, merge, or deployment.

## Writing and evidence

Rewrote the eight generic case studies around what the software does and why its mechanisms matter. All nine listing summaries were reviewed and simplified. The final humanizer pass checked complete paragraphs for repetition, staged contrasts, technology inventories, report language, and unsupported claims. Snap Remedy and the substantive IRC-HAT case study were reviewed against their records and retained.

Pet detection now leads with annotation conversion, synthetic image generation, detector integration and controlled comparisons. Recorded metrics, the modest EfficientDet gain, YOLO transfer gap, ensemble result and annotation differences remain accurate. DETR language was narrowed to the incomplete training record; the previous convergence explanation was insufficiently established. The 3,000 synthetic-image artifact count is retained despite conflicting report prose. GA report measurements remain separate from clearly marked example fitness scores. Restaurant authorization, date precision, and registration atomicity are described within their actual scope; compiler execution, controller attribution and timing, scheduler completeness, and prototype account/media behavior retain appropriate boundaries. No performance, production-use, deployment, or user claims were invented.

## Figures and shared layout

- Genetic search: replaced the summary flow with candidate fitness, tournament examples, explicit inherited fields, mutation, and preservation of the global-best elite.
- Compiler: removed the redundant pass selector and homepage accordion. A worked Boolean expression explains short-circuit control flow without fabricating captured assembly output.
- Pet detection: introduced the dataset/training/evaluation pipeline on the homepage, listing and case study; moved measured comparison into findings. Kept the original report loss plot with full-size access.
- Controller: shows active-low sample conversion, changed-state serial output, and the firmware/desktop boundary.
- Restaurant: a before/after composite-key edit demonstrates why updates need both identities.
- Soccer: shows residual capacity before assignment, after assignment, and after backtracking.
- KiddoFlix: illustrates child-specific storage and what survives reloads or crosses device boundaries.
- Greenhouse: retained the useful control-rule interaction, clarified the formula wrapping, and verified every state.

Scoped shared prose styling to direct paragraphs so figures and captions retain their own typography. Tables now have deliberate column measures, padded rows, semantic headers and aligned numeric values. Diagram labels reflow by container width. Corrected narrow wrapping of the J-- language name. Static compiler content now renders outside the homepage client module.

## Names and priorities

Soccer's technical title leads, with Gengar secondary; its category is Algorithms. KiddoFlix now identifies the family streaming interface, with prototype scope stated in the summary. The collection and adjacent-project navigation follow one order: chat, compiler, restaurant, pet detection, genetic search, controller, climate simulation, KiddoFlix, soccer. This balances engineering depth, software-role relevance, supporting evidence, and completeness. The homepage's intentional chat/pet/compiler selection remains; restaurant reservations were added to the secondary strip.

## Runtime

The old preview ran from a temporary source snapshot. Workspace startup blocked on cloud-evicted dependency files before listening. Restoring files alone was insufficient: macOS evicted more installed files during validation. The workspace now links to the healthy same-lockfile dependency installation at `/tmp/portfolio-final-check/node_modules`; the old installation is preserved in ignored `.node_modules-cloud-backup/`. Source edits and the running server use the actual repository. This is a local dependency workaround, not a version upgrade; removing that temporary installation would require reinstalling the locked dependencies in reliable local storage.

The dependency-path repair initially left mixed React module identities in the running compiler. A clean generated dev cache and restart corrected that reproducible hydration failure. Development now defaults to `.next-dev`, separate from production `.next`, preventing builds from replacing live preview chunks. No application error was suppressed. The exact historical `undefined.call` stack was not reproduced, so its original trigger remains unproven. See [runtime evidence](RUNTIME.md).

## Distinct quality gates

1. **Editorial/evidence:** final paragraph review completed for every revised study. [Per-project content audit](CONTENT-AUDIT.md).
2. **Design:** actually inspected desktop/mobile full pages, figure and table crops, narrative/footer slices, intermediate-width contact sheets, and interaction states. Corrected issues found during inspection. Isolated figure captures hide sticky site chrome only while taking the screenshot; complete-page captures retain it.
3. **Browser:** 70 direct-route checks at 320, 390, 768, 1280 and 1600 pixels; 240 interaction checks; 17 same-document client transitions. Zero recorded runtime exceptions, failed requests, checked content clipping, broken anchors, duplicate IDs, horizontal overflow, or tested axe WCAG A/AA/2.1 AA violations. Tables passed text-bound checks at all widths. Reduced motion, landscape, enlarged root text, PDF and original plot assets passed. [Results](verification-results.json), [repeatable browser script](verify.js).
4. **Production:** all 14 public routes returned 200 with one primary navigation and footer. Nine project client transitions passed. Three missing-route checks returned 404; all six prototype paths returned the public 404. No runtime exceptions. [Production results](production-results.json).
5. **Build:** final TypeScript, lint (zero warnings), production build (26 generated pages), and Git whitespace checks passed in the actual workspace. The development server stayed live during production validation.

Final narrow-screen refinements and screenshot refresh results are in `capture-results.json`. Screenshots are indexed in [SCREENSHOTS.md](SCREENSHOTS.md). No new factual decision requires owner input. Historical project gaps remain documented in `docs/QUALITY-RECOVERY.md` and the canonical reference collection.

The requested development server is left running from the actual repository at **http://127.0.0.1:3000**. The temporary production server was stopped.
