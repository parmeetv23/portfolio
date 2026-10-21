# Requested visual adjustments

- Order: Distributed Chat System, Pet Detection Under Occlusion, J-- to MIPS Compiler, Genetic Algorithm Hyperparameter Search, Constraint-Based Soccer Scheduling, Restaurant Reservation System, Bare-Metal SNES Controller Interface, Greenhouse Climate Simulation, Family Streaming Interface.
- Homepage selection remains the first three; secondary project links follow the collection order.
- Compiler shows J-- source → representative MIPS instructions → expected output. The example uses the documented untyped main syntax, stack-passed printi argument, and MIPS runtime. It is an illustrative excerpt, with setup/runtime boilerplate omitted.
- Restaurant artwork is removed from both the collection and case study; the overview now uses a text-led spread.
- Genetic search uses three generations of circles. Radius represents fitness; the strongest candidate A persists, mixed fills show crossed traits, and diamonds mark mutations. No measured convergence is implied.
- Restored the earlier scheduling grid and three-screen interface compositions. Two older variants existed, so a clarification was offered; these older compositions were the default selected in the absence of a reply.
- Renamed KiddoFlix to Family Streaming Interface throughout public copy and metadata. `/projects/kiddoflix` redirects permanently to `/projects/family-streaming-interface`.

Retained the existing palette and typography. All new figures are static server-rendered SVG/HTML; no new dependencies or motion. Reapplied humanizer to captions and the renamed introduction, and frontend-design to desktop/mobile rendered previews. Removed CSS for replaced figures instead of stacking overrides.

## Screenshots

| Page | Desktop | Mobile |
| --- | --- | --- |
| Projects collection | [Full page](final-projects-1600-full.png) | [Full page](final-projects-390-full.png) |
| Compiler | [Full page](final-j-minus-minus-mips-compiler-1600-full.png) | [Full page](final-j-minus-minus-mips-compiler-390-full.png) |
| Genetic search | [Full page](final-genetic-algorithm-hyperparameter-finder-1600-full.png) | [Full page](final-genetic-algorithm-hyperparameter-finder-390-full.png) |
| Soccer scheduling | [Full page](final-ai-scheduling-hard-constraints-1600-full.png) | [Full page](final-ai-scheduling-hard-constraints-390-full.png) |
| Restaurant | [Full page](final-fullstack-restaurant-system-1600-full.png) | [Full page](final-fullstack-restaurant-system-390-full.png) |
| Family streaming | [Full page](final-family-streaming-interface-1600-full.png) | [Full page](final-family-streaming-interface-390-full.png) |

Final verification results are recorded in `verification-results.json`; the executable CLI browser workflow is `verify.js`. Build, lint and TypeScript logs stay alongside the captures. The previous portfolio-wide recovery report is historical; this follow-up supersedes its visual and ordering decisions.

## Final verification

Passed: 70 route/viewport checks at 320, 390, 768, 1280 and 1600 pixels; 240 interaction checks; 17 client transitions. No recorded browser exceptions, failed requests, overflow, clipped checked content, or tested axe violations. Explicit checks confirm exact project order, zero restaurant figures, three genetic generations with unchanged elite radius, source/MIPS/output compiler stages, and the 308 redirect to the renamed page. TypeScript, zero-warning lint, production build (26 pages) and source whitespace checks passed.

Actually inspected desktop/mobile previews, final figure crops at narrow/tablet/desktop widths, the text-led restaurant case study and the reordered collection. The development server remains at http://127.0.0.1:3000, serving the real workspace. No commit, push, merge, or deployment.

Local tooling note: the final read-only Git diff check stalled on macOS cloud-evicted `.git/packed-refs`. Repository metadata was not altered. A direct whitespace/conflict-marker scan of the changed source passed; see `whitespace-results.json`.
