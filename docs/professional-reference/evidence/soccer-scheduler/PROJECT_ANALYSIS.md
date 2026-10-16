# Project Name

> Transfer source: `Resume_Builder/evidence/soccer-scheduler/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

**Gengar — CPSC 433 soccer game and practice scheduling search system**

The implementation directory is `CPSC-433-Gengar-Project/`. The accompanying proposal is titled “CPSC433 Project Proposal” and dated October 2024. “Gengar” is supported by the directory and proposal filename; there is no separately declared application/package name.

## Overview

This is a Python command-line implementation of a constraint-based weekly soccer field-time scheduler for a CPSC 433 artificial intelligence assignment. It reads games, associated practices, field-time capacities, restrictions, and scheduling preferences from a sectioned text file. Its search combines a recursive OR-tree backtracking procedure with a population-based genetic process. It aims to produce complete schedules satisfying hard constraints and minimizing a weighted penalty function.

The assignment describes a **fabricated Calgary scheduling scenario**, not an operational municipal system. Games represent recurring bookings for divisions, rather than individual matches between two named teams. Practice and game capacities are independent; specific field identities, locations, opponent matching, season dates, and weekend tournaments are not modeled. These boundaries come from `CPSC433F24-ProjectProblem.pdf`, “General Problem Description” and “Instantiation Specifics,” and match the code's time/capacity representation.

The current code is an incomplete implementation of that specification. It includes substantive custom parsing, time encoding, constraint checks, state updates, randomized search, crossover, mutation, and output formatting. However, two objective functions are constant-zero placeholders, some specified hard constraints are disconnected or absent, and several representation mismatches cause incorrect behavior or runtime failures. It should not be described as a fully validated scheduler, as finding optimal schedules, or as satisfying every assignment requirement.

### Evidence conventions and investigation boundary

- **Verified implementation:** directly visible executable code, file contents, or bounded observations described below.
- **Documented intent:** requirements or proposed behavior in PDFs/comments; not automatically implemented behavior.
- **Technical interpretation:** a reasoned implication of code, explicitly identified where it extends beyond an observed result.
- **Unverified:** outcomes, history, deployments, measurements, or provenance not established by the available material.

Unless otherwise stated, code paths below are relative to `CPSC-433-Gengar-Project/`; PDF paths are relative to the workspace containing this analysis. Function names provide stable evidence anchors; line numbers refer to the inspected snapshot. All eight Python files were read, all text scenarios were inspected directly or parsed in full, all four PDFs were text-extracted, and configuration/generated-file inventories were reviewed. PDF extraction contains malformed mathematical glyphs, so formulas in this record are based on executable code or clearly readable prose rather than reconstructed symbols.

The user's sole-developer statement is the attribution basis for original project implementation. Git history was not used to allocate credit. Course handouts, copied examples, Python/library behavior, and generated caches are distinguished from custom work.

## Repository Scope

The workspace root contains four PDFs and a nested Git repository. This analysis is at the workspace root, alongside the PDFs, rather than inside the nested implementation directory.

| Location | Contents and relationship |
|---|---|
| `main.py` | Shared numeric constants; slot initialization and conversion; raw schedule printing; bidirectional string identifier mapping; small manual checks; attempted shared-map setters. Despite its name, it is not the CLI runner. |
| `testing.py` | Actual CLI entry point: argument parsing, input parsing, representation construction, model creation, 100-generation run, and formatted output. Despite its name, it is not an automated test suite. |
| `hardConstraints.py` | Central assignment/unassignment operations; feasibility predicates; global restriction registries and setters; embedded manual/debug test routines. |
| `softConstraints.py` | Weighted objective composition; minimum-fill and pair scoring; disabled preference/section scoring; separate event-penalty attribution for mutation. |
| `geneticAlgorithm.py` | Mutation and exhaustive candidate-placement enumeration with assignment/unassignment rollback. |
| `alternateOrTree.py` | `OrTreeNode`: partial states, expansion, randomized heuristic ordering, parent-guided crossover, recursive search; substantial commented example code. |
| `model.py` | `Model`: initial population, solution evaluation, top-two parent selection, crossover orchestration, probabilistic mutation, survivor selection, best-schedule reporting. |
| `test_geneticAlgorithm.py` | Standalone verbose debugging variant of mutation/candidate enumeration, with a guarded demonstration; no current pytest test functions. |
| `test1.txt` | Small 3-game/3-practice input scenario. |
| `ali_tests/` | 11 input scenarios and one illustrative output text file. Includes two large inputs, three smaller inputs, five constraint-named inputs, and `hudson.txt`. |
| `nathan_tests/` | Nine numbered scenarios and a course-example input. |
| `.vscode/launch.json` | One Python `debugpy` launch configuration, using the current file and nine example positional arguments. |
| `__pycache__/` | 20 generated `.pyc` files with Python 3.11/3.12/3.13 tags; one includes a pytest 8.3.4 tag. These are artifacts, not original source or a supported-version declaration. |
| `.pytest_cache/` | Generated pytest metadata, including six old node IDs and three failed-node flags. These do not match the current test source. |
| `.git/` | Git metadata in the nested project; history not analyzed. |
| `.DS_Store` | macOS filesystem metadata at workspace and project levels. |
| `CPSC433F24-ProjectDescription.pdf` | 3-page course assignment/process requirements. |
| `CPSC433F24-ProjectProblem.pdf` | 8-page problem/domain specification and hard/soft constraints. |
| `CPSC433F24-ProjectInput.pdf` | 6-page input/output contract, numeric parameters, example input/output. |
| `Gengar (1).pdf` | 11-page formal project proposal for the OR-tree-augmented genetic model. |

No application README, dependency manifest/lockfile, packaging file, database definition, migration, web application, container configuration, CI workflow, deployment script, or environment example was found in the inspected project tree. The README inside `.pytest_cache` is generated pytest documentation.

## Contributions

Under the supplied ownership instruction, original Python implementation is treated as the user's work. The inventory includes partially implemented features and debugging work, without representing them as completed capabilities.

1. **Domain representation and time abstraction:** defined a compact schedule structure, game/practice index conventions, shared slot-field constants, half-hour indexing, abstract weekday groups, evening/age encodings, and bidirectional league/tier ID assignment (`main.py`; game parsing in `testing.py`).
2. **Text-to-search-instance pipeline:** built a ten-section parser, comma-spacing normalization, game sorting and indexed lookup, practice attachment, capacity expansion, restriction registration, weight/penalty intake, and human-readable schedule output (`testing.py`).
3. **Assignment feasibility and state bookkeeping:** implemented contiguous-time and alignment checks; capacity enforcement; unwanted/incompatible restrictions; related game/practice overlap checks; evening checks; attempted partial-assignment checks; inverse unassignment; and optional diagnostic output (`hardConstraints.py`).
4. **Constraint registries and helper scaffolding:** implemented symmetric incompatibility sets, unwanted-slot sets, open-practice associations, upper-level group registries, fixed-assignment registries, and slot-disabling utilities. Some are not correctly integrated or have defects described below.
5. **Objective and mutation-attribution code:** built four-term weighted objective wiring, active pair/minimum routines, placeholder preference/section routines, and a separate contribution calculator distributing selected penalties over involved events (`softConstraints.py`).
6. **Constructive search:** built partial-state OR-tree expansion, completion/dead-end marking, child state copying, randomized scoring and tie breaking, depth-limited recursive traversal, and first-complete-solution return (`alternateOrTree.py`).
7. **Genetic search orchestration:** built population initialization through constructive search; deterministic selection of the two lowest-cost schedules; agreement-first inheritance and randomized parent fallback; optional mutation; and truncation to the lowest-cost population members (`model.py`, `alternateOrTree.py`).
8. **Mutation/candidate search:** implemented penalty-proportional event selection, alternative-placement enumeration by day/event type, feasibility probing, restoration of prior placement, and attempted reassignment (`geneticAlgorithm.py`).
9. **Debugging and manual validation support:** added constraint diagnostic messages, raw state/capacity printing, PASS/FAIL-style checks, commented experiments and example schedules, a verbose genetic-operation harness, small constraint scenarios, and editor launch arguments. These are distinct from a maintained automated assertion suite.
10. **Design documentation represented in the workspace:** preserved a formal proposal defining states, transitions, constraint/evaluation helpers, OR-tree search control, genetic extension functions, and an example search. Treat proposal statements as design evidence, not proof of executable correctness or experimental results.

### Attribution boundaries

Python supplies list/dictionary/set semantics, copying, sorting, random sampling, regex operations, file IO, and `argparse`; their general capabilities are not custom implementations. The choice and integration of those primitives into scheduling logic are custom work. No third-party solver, genetic-algorithm framework, ORM, or web framework is imported by the application.

The three `CPSC433F24-*` PDFs are course-provided specifications. `nathan_tests/ProjectInput.txt` explicitly identifies itself as the posted example; `ali_tests/hudson.txt` and `hudson_output.txt` closely follow the handout's example. The output file explicitly states that it is not related to the preceding input. Large-input file provenance is not established merely by their filenames. They demonstrate available input data, not necessarily custom dataset authorship. The proposal carries multiple names; per the user's instruction this investigation does not infer implementation ownership from that cover page or directory names. Individual authorship of supplied prose/data is not independently established.

## Architecture

### Execution and module flow

```text
input text + 8 integer parameters
              |
              v
testing.py: argparse, parse, normalize, sort, build lookups
    |                       |
    |                       +--> hardConstraints global registries
    v
Model(slots, games, practices, preferences, pairs, tiers, weights, penalties)
    |
    +--> initialize_population: copied templates -> OrTreeNode.search
    |                                                |
    |                         find_possible_slots -> assign/unassign
    |                                                |
    |                                score/order copied child states
    |
    +--> generations: top-two parents -> OR-tree crossover/completion
    |                                      -> optional mutate
    |                                      -> score and retain best members
    v
best available schedule -> eval_cost -> print_output -> stdout
```

This is a single-process, synchronous, in-memory application. The implementation does not contain worker threads, multiprocessing, async execution, remote services, queues, databases, or persistence of search progress. Recursive tree nodes retain child lists; population schedules and search states are ordinary Python objects.

`Model.__init__` immediately initializes the population. `testing.py` executes argument parsing and the search at module top level, without a `__main__` guard. Importing it is therefore not a side-effect-free way to obtain its parser. Other algorithm modules import shared definitions from `main.py`; the standalone debug harness has a `__main__` guard.

### State and search invariants

The effective schedule order is `(games, practices, slots)`, using `GAME=0`, `PRAC=1`, `SLOT=2`. Some comments still state `(slots, games, practices)`; the executable indexing and unpacking establish the actual order.

- A game is `[game_code, assignment]`.
- Practices are rows indexed by game, with one assignment per practice.
- Unassigned events use the empty tuple `()`; generated assigned times normally use lists of half-hour indices. Some examples use tuples.
- A slot row is `[remaining_game_max, game_min, remaining_practice_max, practice_min]`.
- Assignments decrement remaining capacity for every covered half-hour; unassignment increments it and restores `()`.
- Game event references are integers; practice references are two-element index pairs, converted to tuples for dictionary keys.
- Mutation attribution introduces tagged keys such as `('game', id)`, `('practice', game_id, practice_id)`, and `('event', event_id)`. Their inconsistent handling is a significant integration defect.

Interpretation: mutable residual capacity is intended to make legal assignment preserve feasibility incrementally. This invariant is not sufficient to prove a returned schedule valid: some checks are missing, repeated practice assignment can corrupt capacity, and completion checks only inspect assignment presence.

## Technologies

| Category | Demonstrated technology | Evidence and boundary |
|---|---|---|
| Language/runtime | Python 3 | All executable source; investigation used installed Python 3.11. No version requirement is declared. |
| Standard library | `argparse` | CLI types, positional argument requirements, and help/error handling in `testing.py`. |
| Standard library | `re` | Comma-following whitespace normalization in `testing.py`. |
| Standard library | `random` | Random child-score noise, shuffling, mutation probability, weighted/unweighted choices. |
| Standard library | `copy` / `deepcopy` | Initial/crossover templates and attempted shared-map copies; some imports are unused. |
| Development tools | VS Code, `debugpy` launch configuration | `.vscode/launch.json`; actual extension installation is not established. |
| Testing tooling | pytest artifacts | `.pytest_cache`, pytest-tagged bytecode; current collection yielded zero tests. Pytest is not an application runtime dependency. |
| Version control | Git metadata | Nested `.git`; no history/author analysis. |
| File formats | Sectioned comma-separated plain text, PDF, JSON-with-comments editor config | Fixtures, documentation, and debugger configuration. Input is a custom text format, not a general CSV parser. |

No demonstrated application framework, database engine, external API protocol, infrastructure platform, or vendor solver. Java/C++ mentioned in course documents are permitted alternatives, not technologies used by this implementation. Ghostscript was an investigation tool for PDF extraction, not a project dependency.

## Features

### Time representation and supported placements

`main.py` defines 13 hours per abstract day, 26 half-hour intervals per day, and 78 total intervals across MO/TU/FR. The represented range is 08:00 through an interval beginning at 20:30 and ending at 21:00. MO game bookings stand for Monday/Wednesday/Friday; TU games stand for Tuesday/Thursday. MO practices represent Monday/Wednesday; TU practices represent Tuesday/Thursday; FR practices are separate. These recurring-day meanings are documented in the course specification; the code represents them through compressed day groups rather than generating actual calendar events.

| Event and day | Duration | Start alignment | Structural candidate starts |
|---|---|---|---:|
| MO game | 60 minutes / 2 intervals | Whole hour from 08:00 | 13 |
| TU game | 90 minutes / 3 intervals | Every 90 minutes from 08:00 | 8 |
| MO or TU practice | 60 minutes / 2 intervals | Whole hour from 08:00 | 13 per day |
| FR practice | 120 minutes / 4 intervals | Every two hours from 08:00 | 6 |
| FR game | Disallowed as a separate assignment | Represented through MO game recurrence | 0 |

Counts are derived from the loops in `geneticAlgorithm.find_possible_slots`, before capacity and other restrictions. They imply 21 structural game placements and 32 practice placements per event, not 21/32 guaranteed legal choices on every input.

`get_slot_index` converts hours to an offset from 08:00 and adds day offsets of 26 or 52. It recognizes T/t/TU and F/f/FR explicitly; other day values fall through to Monday. Only the minute string `"30"` increments the half-hour offset; other minute strings are not rejected. Hours below 8 print a diagnostic and return `None`; upper-hour bounds are not checked there. `get_slot_string` converts indices back to MO/TU/FR and terminates on negative or too-large values. `get_slot_index_from_string` strips the two comma-separated fields.

### Game and practice encoding

`StringToUniqueNumber` assigns monotonically increasing IDs starting at 1 to league-plus-age/tier strings and retains reverse lookup. Repeated strings return the same ID; unknown reverse lookups return `None`.

The parser extracts age using `lineCopy[1][1:3]` and division using `int(lineCopy[3])`. Ages below 16 receive positive IDs; ages 16+ negative IDs. Divisions numerically greater than or equal to 9 receive an additional absolute offset of 1000. `assign_helper_evening` treats absolute codes of at least 1000 as evening-only and requires a normalized start interval of at least 20, corresponding to 18:00.

This implementation does **not** match the specification exactly: the specification's evening rule is division numbers starting with 9, and its upper-level collision rule names U15/U16/U17/U19. Numeric `division >= 9` includes non-9-prefix divisions, while the age sign split excludes U15 and includes other older ages. Age sign encoding alone does not enforce upper-level collisions.

Practices with a matching full game-name prefix attach to that game's row. PRC and OPN are not given separate scheduling algorithms. Tier-wide practices without DIV are placed in `practices[-1]`, indexed as `(-1, practice_index)`, and entered into an open-practice registry. The intended additional open-practice row is only mentioned in a comment; no such row is appended. These entries therefore share the last game's row, and no corresponding output name is appended. This is a verified representation gap, not complete tier-wide practice support.

### Constructive OR-tree search

`OrTreeNode` stores the partial schedule, solution status (`"?"`, `"yes"`, `"no"`), optional parents A/B, objective parameters, random bound `r`, and child nodes.

- `isComplete` checks all game and practice assignments against `()`.
- `next_unassigned_event` chooses the first unassigned game, then the first practice in row order. This is fixed ordering, not a minimum-remaining-values heuristic.
- `ftrans` marks complete states `yes`; obtains feasible placements for the next event; marks states with no candidates `no`; copies slot rows, game records, and practice rows for each child; and applies the candidate through `assign`.
- `fleaf` returns 0 for complete states; 1 when both parents agree on the next unassigned event; otherwise `2 + eval_cost(state) + randint(0, r)`.
- `search` rejects `no` states or depths above `max_depth`, expands, shuffles scored children before sorting to randomize ties, and recursively returns the first completed schedule found.
- There is no global final constraint pass in this process. Calls to a proposed `constr()` in `fleaf`/`ftrans` are commented out.
- Completion is feasible under the checks actually called, not a proof of objective optimality or full specification compliance.

Child copies separate outer mutable records/capacity rows. Existing assignment sequences are shallow-shared, while the implementation typically replaces rather than edits assignment sequences. Population initialization and crossover templates use `deepcopy` instead.

### Population and crossover

`Model` defaults to a population size of 10 and `max_iter=1000`, with the latter passed as OR-tree **depth**, not a count of generations or total node expansions. It performs one construction attempt per requested population member. Failed attempts are silently omitted; there is no refill-until-full loop or uniqueness filter.

`select_parents` sorts the current population by objective and chooses the two best entries. `run_generation` returns immediately if fewer than two members exist. `crossover` constructs a fresh copy of the initial problem and invokes `runCrossoverSearch`.

`orTreeCrossover` first attempts parent-agreed game/practice assignments. For remaining events it independently shuffles parent order, tries the first parent's placement, and falls back to the second on failure. It checks parent array bounds. It then uses ordinary OR-tree search for still-unassigned events, or returns directly if complete. Failed shared assignments are not reported; failed alternatives can remain unassigned for search.

Each produced child has a 0.2 mutation trigger probability. After insertion, the population is evaluated, sorted, and truncated to the requested size. There is no deduplication or explicit diversity maintenance. `run_search` defaults to 50 generations, but `testing.py` calls it with 100. It returns the lowest-cost available schedule or `None`; it does not stop early at cost zero or impose a wall-clock budget.

### Mutation and candidate enumeration

`mutate` computes event contributions, returns unchanged if their sum is zero, samples one key with probability proportional to its contribution, enumerates alternative placements, randomly chooses one if available, and unassigns/reassigns the event.

`find_possible_slots` temporarily unassigns the event, tries every aligned candidate through the hard-constraint operation, unassigns accepted probes, and restores the original assignment if it was truthy. It has branches for plain game IDs, tagged game keys, two-element practice references, and tagged practice keys. It does not use `assign(set=False)` for this enumeration, despite that option existing.

The placement-list equality comparison excludes the current placement only when its sequence type also matches. A tuple assignment compared to a list candidate is unequal even with the same indices. Restoration is not in a `try/finally`; an exception can interrupt rollback. Mutation passes tagged contribution keys directly to unassignment/assignment functions that do not accept that representation correctly. These limitations are demonstrated below.

## Backend / APIs

There is no HTTP/backend server and no API endpoint inventory. The external interface is a local CLI plus importable Python functions/classes.

The command structure, inferred directly from `testing.py`, is:

```sh
python3 -B testing.py INPUT_FILE minfilledWeight prefWeight pairWeight secdiffWeight gameminPenalty practiceminPenalty notpairedPenalty sectionPenalty
```

For example, from the implementation directory:

```sh
python3 -B testing.py test1.txt 1 1 1 1 1 1 1 1
```

This is the actual invocation shape, **not a claim that the example completes successfully**. In this investigation it reached mutation and raised an `AttributeError`.

`argparse` requires one filename and eight integer values. It supplies command-line type/arity errors and help output. The code adds no nonnegative/positive range checking, configuration file, random-seed argument, population-size argument, generation-count argument, timeout option, or output-file option.

| Input header | Implemented interpretation | Material limitation |
|---|---|---|
| `Name:` | Stored among raw table rows | Not used to control search or label final output. |
| `Game slots:` | Day/time/max/min expanded across 2 MO or 3 non-MO half-hours | Assumes non-MO means the 90-minute category; no robust day validation. |
| `Practice slots:` | Expanded across 2 MO/TU or 4 other-day half-hours | Assumes remaining day category is FR; malformed day values can be misinterpreted. |
| `Games:` | Name/age/division parsing and encoded game creation | Name lookup and tier map are finalized only when a nonempty practice row is read. |
| `Practices:` | Game-prefix matching; attempted tier-wide practice handling | Tier-wide row/names/association mapping are inconsistent. |
| `Not compatible:` | Resolve game/practice references; register symmetric pairs | Unknown references print warnings and are skipped. |
| `Unwanted:` | Resolve event and register starting half-hour | Repeated registration incorrectly inserts tuples into a set otherwise holding integers. |
| `Preferences:` | Append `[slot_index, event_reference, preference_value]` | Values remain strings; objective ignores them; mutation expects a dictionary instead. |
| `Pair:` | Store a game-to-game map | Practice pairs are not parsed, and multiple pairs with the same first game overwrite. |
| `Partial assignments:` | Register the single start index as a tuple | Candidate assignments are full lists; equality check rejects them; unresolved event may leave an undefined/stale variable. |

The parser strips lines, skips blanks, and normalizes whitespace **after** commas with `re.sub(r",\s*", ", ", line)`. It does not comprehensively normalize internal spaces in event names or spaces before commas. Recognized headers are exact and case-sensitive. It relies on the expected section ordering and does not build a separate validated schema before starting search. Duplicate slot definitions overwrite capacity fields; duplicate game/practice names overwrite their lookup entries while arrays can retain records.

Output starts with `Eval-value:` and prints each game followed by its practice entries. It converts the first covered interval back to a day/start time and can print `NOT ASSIGNED`. Games are alphabetized when practice parsing triggers finalization; practices retain input insertion order. On a `None` result, it prints `No valid schedule found.` The solver does not distinguish infeasibility from every other reason that no result was found, nor does this branch use a nonzero exit status.

## Frontend

No browser UI, native graphical UI, frontend components, routing, form framework, or UI state-management library is present. The user workflow is: prepare/edit an input file, supply numeric objective parameters, execute `testing.py`, and read terminal output. The optional GUI discussed in the input specification was not implemented in the inspected source.

## Database / Data Engineering

No persistent database, ORM entities, tables, indexes, migrations, transactions, or database queries are present. The data work is an in-memory transformation pipeline:

1. Read the supplied local text file with Python `open(..., "r")`.
2. Split the sectioned format into recognized records and preserve selected raw rows in `tables`.
3. Expand logical slot durations into per-half-hour capacity rows, initially all zero so absent slots are unavailable.
4. Encode league/age/tier/division information and sort game names together with game records.
5. Resolve textual references to integer or practice-pair identifiers.
6. Populate restriction registries and objective data.
7. Clone templates for each search attempt; mutate in-memory assignment/capacity state.
8. Convert the selected state back to textual names and start times.

`tier_map` built by the parser maps **game index → normalized league/tier code**. Mutation's section calculation instead indexes it using encoded game codes. Open-practice construction looks up `tier_map[game_code]` and passes the result as though it were associated game indices. Both are incompatible uses of the parser's mapping.

The initial `slots` template is retained by `Model` and copied for construction/crossover. `main.set_slots` also appends slot rows into a module-level list, but that list is not used by the active cost function to recover original capacities. Calling it repeatedly would accumulate rows. The preference/tier/pair setter functions assign to local variables without `global`, leaving the module-level dictionaries unchanged; active model parameters are passed explicitly instead.

There is no ETL into an external store, synchronization process, pagination, batch/checkpoint handling, deduplicated import, or durable record-processing count. Fixture row counts below measure supplied data, not successful production processing.

## External Integrations

No external service/API integration is implemented. CMSA, CUSA, and CSSC are domain strings in the supplied scheduling problem and fixtures, not connected systems. The program performs local text input and terminal output only. The VS Code/debugpy configuration is development tooling; Git metadata is source-control context. There is no email, calendar, authentication provider, hosted model, payment service, or network client in the application imports/calls.

## Reliability / Failure Handling

### Implemented mechanisms

- Most feasibility checks return `False` before capacity mutation, and valid assignments return `True`.
- Capacity is checked on every covered half-hour before decrementing.
- `assign(..., set=False)` permits feasibility checking without applying changes, although active candidate enumeration uses assignment and rollback.
- Incompatibility registration records both directions and uses sets to deduplicate repeated edges.
- Candidate enumeration restores capacity/placement after successful probes in ordinary control flow.
- Child schedule copies isolate search alternatives at the level of mutable rows.
- Tree nodes use explicit complete/dead-end states and propagate failure with `None`.
- Population search tolerates failed construction attempts, failed crossover results, and fewer than two members.
- Mutation has no-op paths for zero total penalty or no available alternative.
- Unknown incompatibility references receive printed diagnostics; selected helper failures expose `DEBUG` messages.
- Output has a no-result branch and a raw population/debug display path.

These are local search/error-handling mechanisms, not database transactions or durable fault recovery. There are no timed retries, exponential backoff, resumable jobs, checkpoints, structured logs, metrics collection, tracing, or crash recovery.

### Verified defects and implementation gaps

| Finding | Evidence | Effect / verification boundary |
|---|---|---|
| Preference and section objectives disabled | `softConstraints.py:36` `eval_pref`; `:118` `eval_secdiff` | Both return 0. Preference and section weights do not affect `eval_cost`. |
| Minimum-fill compares residual capacity instead of occupancy | `eval_min`; `hardConstraints.assign` | Penalty is added when remaining max is below minimum, rather than when bookings are below minimum. Repeated across half-hours, unlike the intended logical-slot count. |
| Parser preferences are a list; mutation requires `.get` | `testing.py:46`; `softConstraints.py:147` | Observed `AttributeError: 'list' object has no attribute 'get'` in CLI and direct probes. It can happen even with an empty preference list once any game is assigned. |
| Contribution keys mismatch assignment API | `eval_penalty_contributions`; `geneticAlgorithm.mutate`; `unassign` | A tagged game contribution reaches string indexing in unassignment. Direct mutation probe reproduced `TypeError`. Tagged event/practice cases also have incompatible shapes by inspection. |
| Fixed assignments use incompatible shape/type | `testing.py:331`; `set_partassign`; `assign_helper_partassign` | Parser stores `(start,)`; candidates are `[start, start+1, ...]`. Direct probe rejected a matching-start legal game candidate. No initial preassignment is applied. |
| Game lookup finalization depends on a practice data line | `testing.py`, first `Practices:` row branch | Empty practice sections leave game lookup and tier map empty; pair records silently vanish; partial records can raise `NameError`. Observed for numbered fixtures. |
| Repeated unwanted registration creates mixed set contents | `hardConstraints.py:392` `set_unwanted` | First `[0]`, then `[2]`, produces `{0, (2,)}`; checking integer 2 misses the second restriction. Direct probe accepted the unwanted second placement. |
| Practice reassignment fails to return `False` | `hardConstraints.assign`, practice already-assigned branch | The code prints a diagnostic but proceeds, overwriting assignment and decrementing new capacity without restoring old capacity. Direct two-assignment probe confirmed both succeed. |
| Crossover can reassign an already inherited practice | `orTreeCrossover` agreement loop plus preceding reassignment behavior | On prefilled templates, practice capacity can be decremented again. This is a code-derived risk; no claim of a measured failure frequency. |
| Open-practice and upper-level checks are disconnected | `assign_helper_open_practice`, `assign_helper_upper_level`, and `assign` call list | Helpers exist but `assign` does not invoke them. Parser does not populate `upper_levels`. |
| Upper-level helper itself does not match registry representation | `set_upper_level` stores code→set; helper indexes iterated keys as clusters | Calling it with populated data is not a demonstrated working enforcement path. It also indexes first assigned time without a general unassigned guard. |
| Tier-wide practice storage/printing incomplete | `testing.py` open-practice branch and `print_output` | Last existing row reused; names not appended; associations use wrong tier-map orientation. Parser-only inspection found 134 practices but 83 practice names in each large input. |
| Global incompatible overlap does not normalize FR against recurring MO games | `check_no_overlap` versus `assign_helper_game_prac_overlap` | Related game/practice helper explicitly subtracts 52 for Friday; general incompatibility comparison only compares raw indices. Thus cross-day recurrence collisions are not generally covered by explicit incompatibilities. |
| Upper-age simultaneous-game prohibition absent from assignment path | `assign`; unused upper-level helper | Encoded ages do not enforce the specified U15/U16/U17/U19 exclusion. |
| Tuesday 11:00–12:30 meeting not automatically excluded | `set_zero_game_max` exists, but no active call; `testing.py` TODO | This helper can disable supplied slots, but automatic meeting enforcement is not implemented. `test9` reached search/mutation rather than reporting infeasibility. |
| Special U12T1S/U13T1S showcase creation not implemented | No trigger/creation path in parser or solver; scenario file | The dedicated fixture also omits ordinary DIV fields and produced `IndexError` in game parsing. A named scenario does not demonstrate support. |
| Pair parser is narrower than evaluator/specification | `testing.py` Pair branch; `eval_pair` | Evaluator supports game or tuple-practice IDs, but CLI loads game pairs only; one outgoing pair per first-game dictionary key. |
| Pair equality is full Python sequence equality | `eval_pair` | Same start with different duration or list/tuple type can be penalized; two unassigned `()` values compare equal. Partial-state scoring is not a full final validity test. |
| Mutation tier scoring is inconsistent with main objective | `eval_penalty_contributions` | It requires unequal game codes with equal `tier_map` values, indexes map by code, and calculates section penalties even though main `eval_secdiff` is disabled. Potential errors depend on supplied codes/maps. |
| Input validation is partial | Parsing branches and slot conversion | Unknown days fall through, arbitrary minute values are not rejected, malformed names/counts can raise ordinary exceptions, and there is no overall schema check. |
| Unknown partial-assignment event lacks explicit rejection | `testing.py`, Partial assignments branch | `event_index` can be undefined or retained from a previous row/branch. Undefined case was reproduced with `test5` and `test6`. |
| Bounds helper assumes nonempty input | `assign_helper_contiguous` indexes first/last entries | `assign` is not a safe general-purpose validation API for an empty candidate sequence. |
| Capacity debug checker is not a valid global verifier | `check_all_maxes_non_negative` | Rejects zero, despite zero being a legitimate full slot, and has no final `True` return. Not used by active search. |
| Collision debug path has undefined name | `check_no_overlap`, `DEBUG=True` collision print | References `event_index1`, which is not an argument/local variable. Normal `DEBUG=False` path avoids it. |
| Shared-map setters have local-variable shadowing | `main.set_pref_map`, `set_tier_map`, `set_pair_map` | Do not update module maps; explicit parameter passing is the active path. |
| No final full validation / guaranteed optimization | `isComplete`, `runCrossoverSearch`, `run_search` | Completion checks assignment presence; returned best is best of retained population under the implemented, incomplete objective. |

The report records these issues without modifying the project. They are not evidence that fixes were made or that debugging succeeded historically.

## Security

The application has no authentication, authorization, RBAC, user accounts, session handling, permission layer, secret-management integration, or network-facing surface in the inspected source. It reads a filename supplied by the caller and uses ordinary filesystem permissions. No credentials or application environment-variable contract are configured in its runtime code.

Implemented validation consists of CLI integer conversion and scheduling feasibility checks; it is not a comprehensive input-validation/security framework. User-supplied Python code is not evaluated by the application. No security audit or claim of secure deployment can be established from the repository.

## Testing / Quality

### Current automated versus manual material

AST inspection of all eight `.py` files found **zero active `assert` statements**. `test_geneticAlgorithm.py` has two ordinary functions named `mutate` and `find_possible_slots`, not `test_*` functions. Its demonstration prints results under `if __name__ == "__main__"`.

Pytest collection was executed without cache writes or plugin autoload:

```sh
PYTHONDONTWRITEBYTECODE=1 PYTEST_DISABLE_PLUGIN_AUTOLOAD=1 python3 -B -m pytest -p no:cacheprovider --collect-only -q
```

Result: **no tests collected**, exit code 5. This is the current collected-test count, not a historical test count. The cache lists six node IDs (game/practice/no-slot candidate cases and three mutation cases); three mutation IDs occur in `lastfailed`. Those are stale artifacts because the corresponding definitions are absent now. They cannot establish six current tests or a current passing suite.

Five named manual test routines exist in `hardConstraints.py`: `test_div_practice_collision`, `test_assign_helper_evening`, `test_unwanted`, `test_incompatible`, `test_set_open_practice`. A separate `test(b)` prints PASS/FAIL. `main.py` contains `test_get_slot_with_get_slot_index`. Calls to these routines are commented out. Further commented blocks preserve contiguous/alignment/collision examples, evaluator experiments, and OR-tree example states. These are useful development evidence but not executed assertions.

The debug-only `test_geneticAlgorithm.py` differs materially from production enumeration: it prints extensively, unconditionally appends game candidates through `if True`, omits several rollback/restoration operations, and slices the selected mutation key. Its behavior should not be conflated with `geneticAlgorithm.py` or treated as an independent correctness oracle.

No lint/type-check configuration, CI checks, coverage report, property-based testing, golden-output verifier, or maintained integration-test runner was found.

### Investigation-time observations

These are newly performed read-only checks, not pre-existing project test results. Python was invoked with `-B`/`PYTHONDONTWRITEBYTECODE=1`; CLI subprocesses had a three-second safety timeout and output capture. No dependency installation, code changes, persistent test scripts, or generated project artifacts were used. All CLI checks supplied eight `1` values. Search randomness was not seeded, so these outcomes are observations of those runs, not guarantees about every run.

| Scenario | Observed result |
|---|---|
| Root `test1.txt`; `nathan_tests/test1.txt`, `test4.txt`, `test7.txt`, `test8.txt`, `test9.txt` | Reached search and failed in mutation with preference-list `.get` `AttributeError`; exit 1. |
| `nathan_tests/test2.txt`, `test3.txt` | Printed `No valid schedule found.`; exit 0. |
| `nathan_tests/test5.txt`, `test6.txt` | Parser `NameError` for `event_index` at partial-assignment registration; exit 1. |
| `ali_tests/hudson.txt` | Printed `No valid schedule found.`; exit 0. This is not proof that the problem itself is infeasible. |
| `ali_tests/Hard_Constraint_SpecialShowcaseTryouts.txt` | `IndexError` reading `lineCopy[3]` while parsing a game without DIV fields; exit 1. |
| Both `ali_tests/CPSC433F24-LargeInput*.txt` | Did not finish within the investigator's three-second limit; terminated. No completion-time benchmark or successful large schedule established. |

Additional in-memory probes confirmed:

- With empty registries, one ordinary unassigned game/practice, and permissive capacities, enumeration returned 21 game and 32 practice placements.
- For a game already assigned using a list, candidate enumeration returned 20 alternatives and left the complete input state equal to a deep copy captured before enumeration.
- Repeated unwanted registration produced `{0, (2,)}` and allowed `[2,3]`.
- Registering partial assignment `[0]` stored `(0,)` and rejected candidate `[0,1]`.
- Assigning one practice first to `[0,1]` and then `[2,3]` returned `True` both times; capacity remained consumed in both locations although the practice retained only the second assignment.
- Minimum-fill scoring on 78 empty rows initialized with maxima 2/minima 1 returned 0, despite the intended minimum occupancy being unmet. Assigning one game still returned 0. This demonstrates residual-capacity semantics; it is not an objective-correctness success.
- Passing the parser-shaped empty preference list to contribution evaluation with an assigned game raised `AttributeError`.
- Supplying dictionary preferences sufficient to select a tagged game in `mutate` raised `TypeError: list indices must be integers or slices, not str`.
- A direct `Model` with dictionary-shaped preference data, one game, one available MO slot, two population members, and depth limit 5 produced two initial schedules and returned `[[1, [0,1]]]` after one generation. This narrowly confirms constructive/model functionality; it does not validate the CLI or full requirements.

Parser-only inspection executed the AST prefix before model construction in memory. It found 49 games and 134 practices in each large input, but only 83 practice names; 51 open-practice registry entries occupied the last practice row. The Hudson input produced four practice assignments but three names. `nathan_tests/test7.txt`, whose Practices section is empty, produced an empty game lookup, empty tier map, and empty pair map despite containing two games and one Pair row. These directly support the integration findings above.

## Deployment / Infrastructure

The demonstrated execution target is a standalone local Python process. `.vscode/launch.json` has one configuration named “Python Debugger: Current File with Arguments,” `type: debugpy`, `request: launch`, `${file}` as program, `integratedTerminal`, and arguments `test1.txt` plus eight `1`s. Since it launches the current file, selecting `testing.py` is necessary to use the CLI parser. No explicit debugger working directory is set; relative fixture resolution depends on the launch working directory.

The course description asks for an application deployable on Linux lab/compute machines. That is a requirement, not evidence of an actual Linux deployment. Bytecode tags and `.DS_Store` demonstrate development artifacts, not supported OS/runtime guarantees. No Docker image, cloud hosting setup, reverse proxy, service unit, packaging/release workflow, executable distribution, CI/CD pipeline, or installed dependency specification is present.

## Performance / Scale

Verified structural parameters are 78 half-hour rows; 21 game and 32 practice placement patterns; default population target 10; default tree depth argument 1000; random leaf noise in the inclusive range 0–10; mutation trigger probability 20%; default API generation count 50; CLI generation count 100. These are code constants/defaults, not measured throughput, success rate, or convergence characteristics.

Both large fixtures contain 183 explicit event rows (49 games + 134 practices). Each has 441 incompatibility rows, of which 440 are unique after trimming the lines; the two fixtures have 77 and 647 preference rows respectively. This is supplied-input scale. It does not establish that all events were correctly scheduled, all references correctly resolved, or the workload processed in production.

Technical interpretation from code: recursive backtracking can explore many combinations because it enumerates each available next-event placement without memoization or an admissible branch-and-bound cutoff. Each expansion copies state for all feasible children before traversing them, so memory depends on retained children as well as recursion depth. Each generation repeatedly evaluates/sorts population members; no objective cache is maintained. These observations explain potential costs but do not constitute measured asymptotic performance improvements.

No recorded benchmark hardware, solver wall time, node count, memory peak, success rate, optimality gap, before/after performance, production concurrency, or user scale is available. The three-second investigation timeout is only a safety bound. The recursive depth guard does not change Python's interpreter recursion limit and is not a total-work bound.

## Technical Challenges / Complexity

- **Different event durations and recurrence groups:** 60-/90-/120-minute patterns share half-hour capacity state. Friday practice conflicts with recurring Monday games require translating day groups; the code handles this for associated events but not all incompatibility cases.
- **Feasibility-preserving search state:** candidate probing, backtracking, and crossover must keep placement and residual capacity synchronized. The assignment/unassignment architecture addresses this, while repeated practice assignments show why the invariant is delicate.
- **Hybrid constructive and evolutionary search:** initial individuals and crossover repairs are built through the same OR-tree mechanism. Parents influence inheritance, while costs/random noise influence child exploration. This is custom integration, not merely a call to an external solver.
- **Multiple event identifier representations:** textual names, encoded league/tier codes, game indices, practice index pairs, and mutation tags serve different purposes. Bugs arise where those representations are treated interchangeably.
- **Partial-state objective behavior:** search ranks incomplete schedules, so unassigned events, already decremented capacities, and disabled objective terms materially affect heuristic guidance. Final objective correctness cannot be assumed from the existence of an `eval_cost` function.
- **Parsing and cross-reference integrity:** sorting games changes index assignment; attaching practices and restrictions requires consistent lookups. Deferring finalization until a practice data row makes empty sections especially problematic.
- **Mixed implementation/design maturity:** readable proposal abstractions, commented experiments, standalone debugging variants, and active runtime logic coexist. Investigating executable paths is necessary to distinguish designed work from integrated behavior.

These are meaningful engineering concerns evidenced by the code, without implying novel research, distributed-systems complexity, or measured optimization results.

## Documentation / Operational Support

### Course documents

`CPSC433F24-ProjectDescription.pdf` describes a CSP search-system assignment, formal proposals, demonstration expectations, and standalone Linux compatibility. It mentions alternative languages/search paradigms, but those mentions are not implementation evidence.

`CPSC433F24-ProjectProblem.pdf` defines the fabricated field-booking domain, capacity constraints, associated-event overlap, explicit incompatibilities, fixed/unwanted placements, preferred occupancy, preferences, pairing, division separation, recurring weekdays, evening divisions, upper-level exclusions, Tuesday meetings, and showcase bookings.

`CPSC433F24-ProjectInput.pdf` specifies ten ordered headers, empty sections, comma-spacing tolerance, game/practice identifiers, eight numeric parameters, weighted evaluation, abstract weekday encoding, and alphabetic grouped output. Its example `Eval-value: 30` is illustrative and explicitly not a solution to the example input; it is not a project achievement metric.

### Proposal content and implementation differences

`Gengar (1).pdf`, pp. 1–11, documents shared slot/event/constraint/evaluation concepts; an OR-tree state/status/transition model; `Altern`, `fleaf`, and `ftrans`; parent A/B and random bound environment variables; population facts and genetic extension operators; mutation weighted by event penalty; and an example scheduling process.

The introductory text mentions an AND-tree approach and a comparison of two models, but the supplied 11-page document's substantive model is the OR-tree-augmented genetic approach. No separate executable AND-tree implementation was found. Do not infer a completed second solver or benchmark comparison.

Important design-to-code differences:

- Proposal discusses experimenting with population/randomness parameters; code fixes `r=10` in model construction and offers no adaptive schedule.
- Proposal describes biased-random parent choice and crossover/mutation ranking expressions; implementation selects the two lowest-cost parents and uses a fixed 0.2 mutation trigger.
- Proposal says partial assignments belong in the initial state; implementation stores a registry but leaves initial events unassigned.
- Proposal assumes hard-constraint verification; executable OR-tree `constr()` calls are commented out.
- Proposal says “lowest scoring” fact is deleted in one crossover paragraph despite describing cost minimization elsewhere; implementation retains the lowest scores and drops higher-cost entries.
- Proposal time-set notation includes different slot bounds/orderings from the implementation. The verified runtime representation is 26 intervals per abstract day and `(games, practices, slots)`.
- Proposal example scores and schedules are illustrations, not stored experimental results.

### Operational/debug support

`print_schedule` shows raw event rows and optionally all slot counters. `Model.print_population` prints per-individual scores; `find_best_schedule` prints the selected state or an empty-population message. `hardConstraints` has optional constraint-specific diagnostics. The debug harness emits selected events, penalties, probabilities, candidates, and states. Comments retain TODOs about staff meetings, open practices, evaluator corrections, and prior representation choices.

No runbook, release notes, API reference, administrative endpoint, recovery command, installation guide, or formal troubleshooting document is present. This analysis records the derived invocation and known failure modes but does not repair them.

## Quantifiable Evidence

Counts below describe the inspected snapshot and explicitly distinguish source/configuration, input data, and execution observations.

| Metric | Value | Evidence / counting method |
|---|---:|---|
| Python source files | 8 | Direct project `*.py` inventory. |
| Python source physical lines | 2,746 | Sum of `len(text.splitlines())` across eight files; includes comments/blank lines, not executable LOC. |
| Defined classes | 3 | AST: `StringToUniqueNumber`, `OrTreeNode`, `Model`. These are not database models. |
| PDF documents / total pages | 4 / 28 | Ghostscript page processing: 3 + 8 + 6 + 11. |
| Plain-text input scenarios | 22 | Root 1 + `ali_tests` 11 + `nathan_tests` 10; excludes illustrative output. |
| Illustrative output text files | 1 | `ali_tests/hudson_output.txt`. |
| Recognized input headers | 10 | `testing.py` `validHeader`. |
| Positional CLI parameters | 9 | One filename + four weights + four penalties. |
| Abstract day groups | 3 | `main.py` and slot-index conversion. |
| Half-hour rows per day / total | 26 / 78 | `HOURS_PER_DAY=13`, `SLOTS_PER_DAY=26`, `init_slots` multiplies by 3. |
| Structural placements per game / practice | 21 / 32 | Enumeration loops; confirmed with unrestricted in-memory probe. |
| Objective terms wired / constant-zero terms | 4 / 2 | `eval_cost`; `eval_pref` and `eval_secdiff`. |
| Default population target | 10 | `Model.__init__`; successful count can be smaller. |
| Default search-depth argument | 1,000 | `Model.max_iter` passed to `search(max_depth=...)`. |
| Default API / CLI generations | 50 / 100 | `Model.run_search`; `testing.py` `GENERATIONS`. |
| Mutation trigger probability | 0.2 | `Model.run_generation`; not an observed mutation-success rate. |
| Leaf noise | Integer 0–10 inclusive | `OrTreeNode.fleaf`; `Model` passes `r=10`. |
| Large-input games / practices | 49 / 134 each | Nonempty rows in `Games:` / `Practices:` in both large files. |
| Large-input explicit events | 183 each | 49 + 134; excludes any intended auto-created showcases. |
| Large-input game / practice slot definitions | 21 / 32 each | Corresponding sections, before expansion. |
| Large-input incompatibility rows / unique trimmed rows | 441 / 440 each | Full section parsing and set count. Not a count of independently enforced constraints. |
| Large-input preference rows | 77 and 647 | `LargeInput1` and `LargeInput2` Preferences sections. |
| Large-input DIV / tier-wide practices | 83 / 51 each | Practice-name rows with/without ` DIV `; all use PRC in these inputs. |
| Current pytest-collected tests | 0 | Cache-disabled collection, exit 5. |
| Active Python assertions | 0 | AST `Assert` count across all source files. |
| Named manual test routines | 6 | Five in `hardConstraints.py`, one in `main.py`; excludes generic `test(b)`. |
| Cached historical test node IDs / failure flags | 6 / 3 | `.pytest_cache/v/cache/nodeids` and `lastfailed`; stale, not current test results. |
| Editor debug configurations | 1 | `.vscode/launch.json`. |
| Application HTTP endpoints / external service clients | 0 observed | Complete application source/import inspection; no web/network service code. |

### Complete input-scenario inventory

Abbreviations: GS/PS = logical game/practice slot-definition rows; G/P = game/practice event rows; NC = not-compatible rows; U = unwanted rows; Pref = preference rows; Pair = pair rows; PA = partial-assignment rows. Counts are nonempty records under exact headers, not resolved-reference counts or independently validated test cases. A zero includes an absent/empty section where applicable.

| Input file | GS | PS | G | P | NC | U | Pref | Pair | PA |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `ali_tests/CPSC433F24-LargeInput1.txt` | 21 | 32 | 49 | 134 | 441 | 2 | 77 | 1 | 0 |
| `ali_tests/CPSC433F24-LargeInput2.txt` | 21 | 32 | 49 | 134 | 441 | 2 | 647 | 1 | 0 |
| `ali_tests/Hard_Constraint_MaxGamesPerSlot.txt` | 1 | 4 | 7 | 4 | 4 | 2 | 4 | 1 | 3 |
| `ali_tests/Hard_Constraint_NonOverlappingDivisions.txt` | 6 | 4 | 6 | 4 | 4 | 2 | 4 | 1 | 2 |
| `ali_tests/Hard_Constraint_SpecialShowcaseTryouts.txt` | 7 | 7 | 6 | 6 | 0 | 1 | 4 | 1 | 2 |
| `ali_tests/SmallerInput1.txt` | 5 | 5 | 5 | 5 | 5 | 2 | 5 | 1 | 0 |
| `ali_tests/SmallerInput2.txt` | 5 | 5 | 5 | 5 | 5 | 2 | 5 | 1 | 0 |
| `ali_tests/SmallerInput3.txt` | 5 | 5 | 5 | 5 | 5 | 2 | 5 | 1 | 0 |
| `ali_tests/Soft_Constraint_EveningDivisionPlacement.txt` | 5 | 5 | 5 | 4 | 4 | 1 | 4 | 1 | 1 |
| `ali_tests/Soft_Constraint_PreferencesPenalty.txt` | 6 | 4 | 5 | 4 | 4 | 2 | 5 | 1 | 0 |
| `ali_tests/hudson.txt` | 3 | 3 | 4 | 4 | 5 | 1 | 6 | 1 | 2 |
| `nathan_tests/ProjectInput.txt` | 3 | 3 | 4 | 4 | 5 | 1 | 6 | 1 | 2 |
| `nathan_tests/test1.txt` | 1 | 3 | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| `nathan_tests/test2.txt` | 3 | 3 | 4 | 3 | 0 | 0 | 0 | 0 | 0 |
| `nathan_tests/test3.txt` | 3 | 3 | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| `nathan_tests/test4.txt` | 1 | 1 | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| `nathan_tests/test5.txt` | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| `nathan_tests/test6.txt` | 5 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| `nathan_tests/test7.txt` | 5 | 0 | 2 | 0 | 0 | 0 | 0 | 1 | 0 |
| `nathan_tests/test8.txt` | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `nathan_tests/test9.txt` | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| `test1.txt` | 3 | 3 | 3 | 3 | 0 | 0 | 0 | 0 | 0 |

Scenario interpretation details:

- Root `test1.txt` differs from `nathan_tests/test1.txt`: the root input spreads game capacity across three logical slots; the numbered input offers three game places in one MO 09:00 slot.
- Numbered `test2` describes insufficient game capacity; `test3` forces a related game/practice collision; `test4` fixes the available game/practice windows through capacities, without PA records.
- `test5`/`test6` exercise partial assignments with no available slot / a required 10:00 slot, but fail earlier through empty-practice lookup finalization.
- `test7` intends paired games, but its pair is dropped by the empty game lookup.
- `test8` calls itself an upper-level failure scenario but uses U15, which the parser's age sign rule treats as under 16; the upper-level check is disconnected in any case.
- `test9` is explicitly a Tuesday meeting prohibition scenario, which is not enforced automatically.
- `SmallerInput2.txt` and `SmallerInput3.txt` have identical visible contents; `SmallerInput1` differs in its Name value. These are not three independently designed workload shapes.
- Several `ali_tests` files reference games/practices absent from their event sections; warnings/skips mean the scenario label alone is not evidence that its intended constraint was tested.
- `Hard_Constraint_NonOverlappingDivisions.txt` and `Soft_Constraint_PreferencesPenalty.txt` repeat MO 09:00 game-slot definitions; later rows overwrite the earlier capacity/minimum values.
- The “Soft_Constraint_EveningDivisionPlacement” name does not make evening enforcement a soft objective: the code handles encoded evening events as a hard check. Its U12T9 DIV 01 record has a tier ending in 9, not a division starting in 9.
- The showcase input contains TH day tokens and abbreviated game names; neither is a correctly supported ordinary parser shape.
- The large inputs share their non-preference workload structure apart from Name; the second adds 570 preference entries of value 10. Both contain 50 entries of value 25, 24 of value 100, and three of value 300. These are configured preference values, not attained cost improvements.

## Evidence Map

### Claim: the custom implementation combines OR-tree construction and genetic population search

Evidence: `model.py:33` `initialize_population`, `:79` `crossover`, `:102` `run_generation`, `:131` `run_search`; `alternateOrTree.py:169` `orTreeCrossover`, `:257` `runCrossoverSearch`, `:281` `search`; proposal pp. 3–8. The proposal establishes design intent; source establishes integration and its actual selection/termination rules.

### Claim: time/capacity representation is half-hour based with event-specific alignment

Evidence: `main.py:4` constants, `:30` `init_slots`, `:50` `get_slot_index`; `hardConstraints.py:115` contiguous validation, `:132` alignment, `:207` related-event recurrence collision; `geneticAlgorithm.py:52` candidate loops; problem specification “Time Slots.”

### Claim: input parsing and indexed cross-reference construction are custom, but incomplete

Evidence: `testing.py:16` argument setup, `:44` file parsing, `validHeader`, Games/Practices/Pair/Partial assignments branches; `main.py:129` identifier mapper. Parser-only observations and `test5`/`test6` exceptions establish concrete empty-section defects.

### Claim: legality checks preserve several local restrictions but not the entire assignment specification

Evidence: `hardConstraints.py:36` actual `assign` call chain; `:264` and `:274` uncalled open/upper-level helpers; `:386` unused slot-disabling helper; `testing.py` staff-meeting TODO; problem PDF's Calgary constraints. No global checker is invoked by OR-tree completion.

### Claim: objective wiring exists, but two categories are disabled and mutation has incompatible data contracts

Evidence: `softConstraints.py:15` minimum calculation, `:36` preference return, `:80` pair evaluation, `:118` section return, `:123` weighted objective, `:139` contribution calculator; `testing.py` list-based preference construction; `geneticAlgorithm.py:15` tagged event handling. Runtime probes and CLI traces described under Testing reproduce failures.

### Claim: supplied large workloads contain 183 explicit events each, not proven successful large solves

Evidence: `ali_tests/CPSC433F24-LargeInput1.txt` and `CPSC433F24-LargeInput2.txt`, Games/Practices/Not compatible/Preferences sections; row-count method in Quantifiable Evidence. The bounded runs did not complete; no benchmark/result file exists for them.

### Claim: development includes manual/debugging artifacts but no currently collected pytest tests

Evidence: `test_geneticAlgorithm.py` current functions and guarded demonstration; `hardConstraints.py:594` onward manual routines; `main.py:176`; `.pytest_cache/v/cache/nodeids`, `lastfailed`; cache-disabled collection result. Cached node IDs are explicitly separated from present definitions.

### Claim: output and documentation are local, with no deployment/service layer

Evidence: `testing.py:423` `print_output` and final search branch; `model.py:143` printing utilities; `.vscode/launch.json`; complete source imports and repository inventory; course description's Linux requirement. Absence is bounded to the inspected files, not a statement about systems outside this workspace.

## Git / Development History

Git metadata exists only in `CPSC-433-Gengar-Project/.git`, not at the workspace root. No commits, branches, diffs, reflogs, or author histories were analyzed; the current source, docs, and fixtures were sufficient to characterize the visible work. Read-only attempts to obtain `git status --short` and `git ls-files` did not finish within an eight-second subprocess timeout, so this report does not assert tracked/untracked status or a clean working tree.

The proposal's October 2024 date and F24 specification names identify document/course context. They do not establish exact implementation start/end dates, a release timeline, bug-fix chronology, or deployment history. Stale test cache entries and multi-version bytecode indicate retained artifacts, not a recoverable account of past test behavior. No history-based authorship investigation was performed.

## Uncertain / Not Verifiable

- Whether a separate later version fixes the observed defects or completed the original assignment requirements.
- Whether any full CLI schedule was historically produced successfully with this exact source snapshot and which parameters were used.
- Whether any generated schedule satisfies all hard constraints in the course specification or achieves an optimal objective.
- Successful processing time, memory demand, or completion for the two large inputs.
- Historical test pass counts, coverage, grading/demonstration outcomes, or bug fixes after a demonstration.
- Production users, real field allocations, municipal use, business value, customer impact, or measured labor savings.
- A real deployment environment, release/distribution process, supported Python versions, or operational maintenance history.
- Exact provenance of the large data files and some locally named scenarios; names alone do not prove custom authorship.
- Individual prose/data authorship beyond the user's stated original-implementation ownership; no further allocation is inferred from the proposal cover.
- Precise development chronology or reasons for every divergence between proposal and final source.
- Complete mathematical details obscured by PDF text extraction; no missing formula was invented to fill gaps.
- Tracked status and Git cleanliness, because bounded read-only Git commands timed out.

## Questions Requiring External Context

1. Is this the final submitted implementation, or is there a later corrected version or separate submission archive?
2. Are there saved successful runs, expected-output validators, benchmark logs, or demonstration results that can establish completed behavior beyond this snapshot?
3. Which inputs were supplied by the course and which were created as original scenarios, especially the two large workloads?
4. What decisions led to disabling preference/section scoring and leaving certain hard-constraint helpers disconnected?
5. Was the program actually run on the required Linux environment, and with which interpreter/runtime configuration?
6. Was the work used outside the course setting, and is there evidence of actual scheduling outcomes or impact?
7. Are missing proposal sections or separate design documents available for the mentioned AND-tree alternative?

These questions request context not recoverable from the inspected current files; they do not reopen ownership of original implementation.

## Additional Technical Details

- `assign` accepts a parameter named `set`, shadowing the built-in name locally; its meaning is whether to apply the assignment after validation.
- `check_no_overlap` and `check_slots_no_overlap` perform direct interval-membership scans. Covered durations are small, but this is not a sweep-line or indexed interval implementation.
- `set_partassign` returns a Boolean only on repeated registration; its first-insert path returns `None`. The parser ignores that return, so conflicting duplicate definitions are not explicitly rejected there.
- `set_open_practice` normalizes integer game references into singleton lists and accumulates sets. `set_upper_level` rejects nonnegative keys. Their existence does not imply active enforcement.
- `get_associated_game` in `testing.py` accesses `prac.subStr` and is unused; it is not the working practice-resolution routine.
- The hard-constraint module constructs a small sample schedule at import time, but commented test calls prevent its manual checks from running automatically.
- `main.py` contains commented output-format examples corresponding to the handout, plus old experiments around sorting and identifiers. These preserve development context without adding active features.
- There is no explicit seed management, so random ordering, parent fallback, and mutation decisions can vary across runs.
- There is no save/load of population members, deduplication of identical individuals, adaptive mutation rate, explicit best-ever archive beyond retained population, or restart/resume API.
- Failure messages and debug output go through `print`; ordinary parsing/runtime exceptions propagate. There is no structured error taxonomy or external observability stack.

### Preservation and final-review record

Only `PROJECT_ANALYSIS.md` was created for this investigation. No source, fixture, configuration, dependency, documentation PDF, or existing test file was edited; no formatter, installer, migration, build, or Git mutation was run. Python checks disabled bytecode writes, pytest cache writing and external plugin autoload were disabled, PDF extraction used stdout, and investigative scripts were supplied in memory. A source/document/fixture/configuration content-hash comparison and final inventory review were used to check preservation; generated caches and Git metadata were not treated as evidence of custom implementation.

The final review cross-checked major modules, all input scenarios, proposal/specification differences, counts, callable versus disconnected behavior, and framework/generated-file attribution. Observed failures, incomplete features, and unavailable external context remain explicit rather than being replaced by assumed success.
