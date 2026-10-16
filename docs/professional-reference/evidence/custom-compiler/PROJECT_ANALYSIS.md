# Project Name

> Transfer source: `Resume_Builder/evidence/custom-compiler/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. Privacy edits are listed in `catalog.json`. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

**CPSC 411 Term Project: J-- Compiler**

## Overview

This repository implements a command-line compiler for J--. It accepts a source file, uses ANTLR-generated lexer/parser code to obtain a concrete syntax tree, shapes that tree into an abstract syntax tree (AST), performs four semantic-analysis passes, and emits MIPS assembly to standard output. The README identifies it as a University of Calgary CPSC 411 Compiler Construction term project. The implementation supports integer and Boolean variables, functions, an entry-point declaration, structured control flow, expressions, and six predefined input/output/termination functions. [Evidence: `README.md`; `main.py:159–206`; both `.g4` grammars; `semantics.py:169–183`; `codegen.py:1097–1110`.]

The problem addressed is translating a small imperative programming language into executable-target assembly while enforcing its syntax, name-resolution, typing, and structural rules. This is an interpretation of the compiler pipeline, not a claim about adoption or production use. The repository contains an assembly generator, not an assembler, linker, MIPS emulator, web application, or deployed service.

### Investigation basis and evidence categories

- **Verified source facts** describe code, configuration, documentation, or artifacts inspected in this checkout. A statement that code emits a particular instruction does not imply that instruction was successfully executed in a simulator.
- **Investigation observations** describe read-only checks run for this report. These are distinguished from pre-existing project tests.
- **Technical interpretations** describe consequences or likely intent inferred from implementation. They are labeled where runtime verification or external context is missing.
- **Unknowns** are explicitly preserved rather than filled with assumptions.

The developer's stated sole ownership is the attribution basis for original project code. No Git authorship analysis was performed. ANTLR-generated code and the external ANTLR/course libraries are distinguished from custom implementation throughout.

The analysis covers the current working tree, including an existing modification to `main.py` visible before investigation. That modification was neither changed nor reverted. References use current working-tree paths and source line numbers; ranges are reading guides, not historical commit references. No dependency installation, build, cleanup, migration, or source edit was performed. Only this report was created.

## Repository Scope

### Original tracked files

`git ls-files` enumerated nine tracked files before this report was created:

| Path | Role and relationships |
| --- | --- |
| `JMinusMinusLexer.g4` | Custom lexer grammar: keywords, identifiers, literals, delimiters, operators, skipped input, and lexical error tokens. Supplies the parser's token vocabulary. |
| `JMinusMinusParser.g4` | Custom parser grammar: declarations, statements, calls, expression precedence, and assignment. Generated parser is imported by `main.py`. |
| `ShapeSpec.txt` | Declarative rules consumed by the external AST shaper. Converts grammar productions into the node names and child layouts expected by semantic analysis and code generation. |
| `main.py` | Dependency fallbacks, command-line handling, file loading, parser diagnostics, custom unary-minus shaping, retained lexer/AST debugging utilities, pipeline orchestration, output. |
| `semantics.py` | Runtime declarations, scope and symbol helpers, type rules, semantic context, and four analysis traversals. Annotates AST nodes consumed by code generation. |
| `codegen.py` | Assembly emitter, layout structures/traversal, statement/expression generation, stack calling convention, embedded runtime routines and runtime error paths. |
| `Makefile` | ANTLR Python-target generation and cleanup rules, with course-tool wrapper detection. |
| `README.md` | Project description, prerequisites, build/use instructions, pipeline summary, and generated-file notes. |
| `.gitignore` | Exclusions for Python caches, generated ANTLR outputs, anticipated test/output directories, editor files, OS metadata, logs, and build artifacts. |

### Present but ignored/local artifacts

The filesystem inventory was also checked outside tracked-file listings:

- `gen/` contains seven generated files: Python lexer, Python parser, Python parser listener, two `.tokens` files, and two `.interp` files. Python headers identify ANTLR **4.13.2**. The generated listener supplies empty enter/exit hooks and is not imported by the application. These are tool-generated infrastructure derived from the developer's grammar, not handwritten parsing algorithms.
- `.antlr/` contains six generated files: Java lexer/parser, two token files, and two interpreter-data files. Java headers identify ANTLR **4.13.1**. These demonstrate locally generated Java-target artifacts, not a separately implemented Java compiler or a Java production runtime. The Makefile's selected target is Python3.
- `__pycache__/` contains four existing CPython 3.11 bytecode files for `main`, `semantics`, `codegen`, and `generate_mips`. No `generate_mips.py` source exists in the present tree. The bytecode filename alone cannot establish what a past module implemented, when it existed, or whether it matches current source. Caches were inventoried, not treated as authoritative source or decompiled.
- `.DS_Store` is local OS metadata, not project functionality.
- `.git/` is repository metadata. Only read-only working-tree/index queries were needed; commits were not examined.

`.gitignore` names `test/`, `sem_test/`, and `mips/`, but none of those directories is present. Their names do not prove that a particular test suite existed or passed. There are no repository fixtures, sample J-- programs, checked-in assembly outputs, package lockfiles, dependency manifests, container files, CI workflows, database files, web assets, or deployment manifests in the inspected tree. These are bounded statements about this checkout, not about external course resources.

## Contributions

Under the supplied sole-developer ownership statement, the original implementation represented here includes the following work.

| Contribution area | Concrete implementation | Principal evidence |
| --- | --- | --- |
| Language lexing | Wrote lexical rules, valid string escapes, decimal literals, ASCII-style identifiers, keyword/operator tokens, whitespace/comment skipping, malformed-string/error-token handling. | `JMinusMinusLexer.g4` |
| Language parsing | Wrote declaration and statement syntax, function/main productions, argument lists, recursive expression hierarchy, precedence and associativity rules. | `JMinusMinusParser.g4` |
| AST design | Defined compact node names, list flattening, child positions, punctuation removal, empty list/block nodes, function and entry-point shapes. | `ShapeSpec.txt` |
| Literal normalization | Added shaper subclass that folds unary minus into unsigned numeric-literal text and otherwise constructs a unary operation node. | `main.py:60–76` |
| Compiler driver | Integrated parsing, shaping, semantic passes, code generation, input/output, and fail-fast diagnostics. | `main.py:159–210` |
| Semantic model | Implemented declaration metadata, signature strings, deterministic symbol IDs, dictionary scopes, lookup/declaration helpers, runtime symbol registration. | `semantics.py:13–225` |
| Declaration analysis | Implemented typed declarations, function signatures, global registration, and entry-point cardinality/parameter checks. | `Pass1Traversal` |
| Name resolution | Implemented function/nested-block scope management, identifier binding, unknown-name errors, and prohibition on calling the entry point. | `Pass2Traversal` |
| Type analysis | Implemented literal typing, expression type propagation, operand compatibility, function-argument checks, condition types, and return-value compatibility. | `Pass3Traversal` |
| Structural checks | Implemented local-declaration placement, loop/break rules, return-presence checks, valid expression-statement restrictions, and signed 32-bit literal validation. | `Pass4Traversal` |
| Target layout | Assigned global/string labels, formal/local offsets, frame sizes, function exit/error labels, and enforced a four-parameter target limit. | `CollectLayoutTraversal`; `FunctionInfo` |
| MIPS backend | Implemented statement/expression dispatch, loads/stores, calls, stack temporaries, prologue/epilogue code, comparisons, short-circuit logic, and branch helpers. | `CodeGenerator` |
| Embedded target runtime | Generated six predefined routines around simulator-style MIPS syscalls; emitted Boolean text, input buffer, and runtime-error data. | `codegen.py:385–509` |
| Arithmetic/runtime edge handling | Generated zero-divisor termination paths and special handling for minimum signed integer divided/modulo negative one; generated missing-return runtime errors. | `codegen.py:543–561,974–1060` |
| String handling | Interned raw literal spellings and translated supported escape spellings for assembly directives; implemented additional `\0` handling with limitations recorded below. | `codegen.py:149–159,318–383` |
| Debugging support | Preserved token listing and attributed AST printing utilities. Their existence is verified; actual debugging sessions/outcomes are not recorded. | `main.py:79–156` |
| Build/environment setup | Added local/course ANTLR command selection, generated-file dependencies, runtime import fallbacks, and cleanup/ignore rules. | `Makefile`; `.gitignore`; module imports |
| Documentation | Documented requirements, pipeline, build, CLI usage, stdout output, and generated directory expectations. | `README.md` |

### Boundaries of personal implementation

ANTLR supplies lexical/parser runtime machinery, generated recognizers, parse-tree context classes, prediction/automaton machinery, and listener boilerplate. The course `cpsc411` package supplies `ASTShaper`, `ASTTraversal`, and `ASTView`; the project configures/subclasses those abstractions but does not contain their implementations. Python supplies file handling, collections, exceptions, and dataclass generation. The eventual simulator supplies syscall services. Custom work includes the language rules, semantic passes, emitted assembly, and glue around those dependencies, not the dependency implementations themselves.

No separate uncertain-authorship bucket is needed for original project source under the stated ownership premise. The provenance and full source of the course dependency are outside the repository, and successful deployment, maintenance history, test authorship, and operational use cannot be inferred.

## Architecture

### Compiler data flow

```text
J-- source file (read as Latin-1)
  -> generated ANTLR lexer
  -> CommonTokenStream
  -> generated parser.start() / concrete syntax tree
  -> external ASTShaper + ShapeSpec.txt + FixUnaryMinusShaper
  -> annotated AST after four semantic passes
  -> layout collection (globals, strings, functions, stack offsets)
  -> recursive MIPS emission
  -> complete assembly string on stdout
```

Evidence: `main.py:165–205`; `semantics.py:656–678`; `codegen.py:1097–1110`.

This is a single-process, synchronous pipeline. The code contains no worker pools, background services, network transport, database, or persistent compilation cache. The AST is the shared intermediate representation; there is no separate control-flow graph, SSA representation, machine-independent optimization IR, or object-file format in the source. Those absences follow from inspection of the complete driver and two implementation modules.

### AST and semantic state

The shaping specification establishes these principal forms:

| Node family | Shape / purpose |
| --- | --- |
| `program` | Root holding global declarations; empty source can shape to an empty program before semantic rejection. |
| `globVarDecl`, `varDecl`, `formal` | Type and identifier children. |
| `funcDecl`, `mainDecl` | Return-type, identifier, `formals`, and body `block`; main uses `void`. |
| `formals`, `actuals`, `block` | Ordered containers, explicitly present even when empty. |
| `funcCall` | Callee identifier and actual-argument container. |
| `ifStmt`, `ifElseStmt`, `whileStmt` | Condition followed by the applicable statement/body children. |
| `returnStmt`, `breakStmt`, `nullStmt`, `exprStmt` | Dedicated statement nodes with relevant expressions retained. |
| `ASSIGN`, arithmetic, comparison, logical nodes | Operator-specific nodes containing operands. |
| `id`, `number`, `string`, `true`, `false` | Leaf-like source values; identifiers/numeric/string literals carry attributes. |

`attach()` updates node dictionaries directly. Declarations receive `kind`, `name`, `sym`, `sig`, and either `sem_type` or function return/parameter information. Identifier references receive `decl` back-references and copied symbol/signature information. Expressions receive semantic types/signatures. Blocks record whether they open a scope. Functions later receive return-presence flags. [Evidence: `semantics.py:74–76,229–310,337–381,417–500,572–638`.]

`SemanticContext` holds the scope stack, entry-point count/list, current function, loop/block depth, and symbol counter. Runtime symbols occupy `sym1` through `sym6`; custom declarations start at `sym7`. Scope dictionaries also contain `__scope_kind__` and `__owner__` metadata. Name lookup scans from innermost to outermost scope. All global declarations are collected before reference resolution, supporting forward references at the source-code design level. Actual traversal scheduling is delegated to the unavailable course library. [Evidence: `semantics.py:79–114,147–183,195–225,656–678`.]

### Backend state

`FunctionInfo` is a dataclass for name, assembly label, function kind, return type, parameter/local offset maps, frame size, and exit/error labels. `CodegenContext` stores globally unique counter-based generated labels, a raw-string-to-label table, global-symbol-to-label mappings, function layout metadata, the active function, and a stack of loop break targets. `MIPSEmitter` accumulates lines and joins them at completion. `sem_ctx` is passed into `CodeGenerator` and retained, but the emitter's operational decisions use the annotated AST and code-generation context rather than reading it. [Evidence: `codegen.py:19–83,115–258,265–269,308–316`.]

## Technologies

| Category | Demonstrated technologies and qualification |
| --- | --- |
| Languages | Python 3 for custom implementation; ANTLR `.g4` grammar language; course AST-shaping specification syntax; Make syntax; generated MIPS assembly; Markdown documentation. |
| Compiler tooling | ANTLR4 generator and Python runtime (`antlr4` imports, `CommonTokenStream`, `FileStream`, generated recognizers). Locally present Python outputs identify generator 4.13.2; Java outputs identify 4.13.1. These are artifact versions, not a pinned dependency policy. |
| Support libraries | External `cpsc411.astshaper`, `cpsc411.asttraversal`, and `cpsc411.astview`. Their exact version and implementation are not included. |
| Python standard library | `sys`; `dataclasses.dataclass` and `field`; built-in collections, exceptions, file I/O; future annotations in semantic/backend modules. |
| Build/development tools | Make, shell executable detection, ANTLR CLI/course wrapper, Git working-tree tracking and ignore configuration. |
| Target conventions | MIPS assembly registers/instructions/directives, stack frames, branch delay-slot `nop`s, and numbered simulator-style `syscall` services. No named simulator is configured. |
| Incidental generated language | Java appears only in ignored ANTLR-generated local artifacts; no custom Java application is evidenced. |

No web framework, database engine, external HTTP API, Docker platform, cloud SDK, frontend framework, or networking protocol is used by the custom code. Modern Python annotations include `list[str]`, `dict[str, int]`, and union notation; the README says Python 3 without an exact supported-version matrix. Course import paths mention Python 3.13, while existing cache filenames mention CPython 3.11; neither alone establishes an exclusive runtime requirement.

## Features

### Lexical language surface

`JMinusMinusLexer.g4` defines **39 lexer rules**, including the two skipped categories and three error categories:

- Whitespace: space, tab, form feed, carriage return, newline.
- Line comments beginning `//`, ending before carriage return/newline. No block-comment rule.
- Ten keywords: `int`, `boolean`, `void`, `if`, `else`, `while`, `break`, `return`, `true`, `false`.
- Decimal nonnegative integer token spelling; a minus sign is a separate token normalized later for appropriate literals.
- Double-quoted string literals with eight escaped characters: `b`, `f`, `t`, `n`, `r`, single quote, double quote, and backslash. Unescaped quote/backslash/newlines are excluded from string bodies; other characters are not restricted to ASCII by this rule.
- Identifiers beginning with ASCII letter or underscore, followed by ASCII letters, digits, or underscore. Keywords precede the identifier rule.
- Six delimiter tokens: parentheses, braces, semicolon, comma.
- Fifteen operator tokens covering assignment, comparison, logical operators, arithmetic, remainder, and negation; unary and binary minus share one token.
- Dedicated `UNTERMINATED_STRING`, `INVALID_ESCAPE`, and catch-all `ERROR_CHAR` tokens.

The compiler reads source as Latin-1. This decoding choice and ASCII identifier rules must not be described as general Unicode-language support. The retained lexer-debugging helper distinguishes illegal ASCII and non-ASCII characters by the first character's ordinal, but the normal driver does not invoke that helper. [Evidence: `main.py:79–110,169–184`.]

### Declarations and expression syntax

The parser has **32 named grammar rules**. It accepts global `int`/`boolean` variable declarations; typed `int`/`boolean`/`void` functions; and an untyped function-like declaration treated as the main declaration. Variables and parameters cannot be declared as strings or void through the grammar. String literals exist primarily to supply the predefined `prints` argument type. Declarations have no inline initializer or comma-separated multi-variable form. Function definitions have bodies; no separate prototypes, overload syntax, nested function declarations, arrays, classes, fields, or pointer forms appear. [Evidence: `JMinusMinusParser.g4:18–78,95–158`; `semantics.py:173–179`.]

Functions have zero or more typed parameters in grammar, but target layout rejects more than four. The main-declaration grammar accepts a parameter list so semantic analysis can report that main cannot have parameters. It uses any identifier; it does **not** lexically reserve or explicitly require the spelling `main`. `mainDecl` is based on omission of a return type, and the backend labels that declaration `main`. A typed function named `main` does not by itself satisfy the semantic main-declaration count. [Evidence: parser rules `functionheader`, `mainfunctiondeclaration`; `semantics.py:292–310`; `codegen.py:165–176`.]

Precedence from strongest to weakest is primary/identifier expressions, unary minus/not, multiplication/division/remainder, addition/subtraction, relational comparisons, equality/inequality, logical AND, logical OR, and assignment. Binary levels are left-recursive; assignment's right operand is an `assignmentexpression`, permitting right-associative chained assignment to identifiers. Parentheses group expressions. Calls contain ordered comma-separated expressions. [Evidence: `JMinusMinusParser.g4:95–158`.]

### Statements and control flow

- Blocks and empty statements are supported.
- Assignment and function-call expression statements are supported.
- Literal statements are accepted by the parser specifically enough to reach later validation, where pass 4 rejects expressions other than assignments/calls.
- `if`, `if/else`, `while`, and `break` are supported; break validity is checked by active loop depth and emitted against the innermost break target.
- Return statements can carry a value or be empty; semantic rules depend on the declared return type.
- Local declarations are only accepted semantically in the outermost function body, even though nested blocks syntactically accept declarations.

Evidence: `JMinusMinusParser.g4:68–94`; `semantics.py:519–562,605–649`; `codegen.py:596–674`.

## Backend / APIs

There are no HTTP/API endpoints, request handlers, authentication services, background jobs, or RPC services. The relevant interface is the compiler CLI plus internal Python entry points and generated-language runtime functions.

### CLI and internal interfaces

| Interface | Behavior |
| --- | --- |
| `python3 main.py file.j--` | Requires exactly one argument; reads the named path and emits assembly to stdout. The `.j--` extension is documented, not checked in code. |
| `load_shape_spec()` | Reads `ShapeSpec.txt` as UTF-8 using a path relative to the process working directory; prints an error and exits 1 on file failure. |
| `ParserErrorListener.syntaxError(...)` | Prints `error: ... at or near line ...` to stderr and exits 1 on the first parser diagnostic. |
| `run_pass1/2/3/4(ast, ctx)` | Sequential semantic entry points; pass 1 calls `postorder()`, the other three call `preorder()` with entry/exit-named handlers. Each returns its traversal object. |
| `generate_mips(ast, sem_ctx)` | Constructs a fresh codegen context, collects layout in preorder, and returns the full assembly text. |
| `printLexer(lexer)` | Internal debugging utility; lists token names and line numbers, includes literal/identifier lexemes, returns 1 on its lexical-error categories. No command-line switch exposes it. |
| `LabelView.txt()` | Internal recursive attributed-AST printer; invocation in `main()` is commented out. |

Evidence: `main.py`; `semantics.py:656–678`; `codegen.py:1097–1110`.

### Four semantic passes

1. **Pass 1: declaration annotation and global collection.** Annotates all variable/formal declarations, function headers and declaration identifiers. Registers globals/functions/main in one global namespace already containing predefined runtime functions. Rejects same-scope redefinitions through `declare_symbol()`. Counts main declarations, rejects multiple declarations or any main parameters, and rejects a program with none. Function signatures encode argument types as `f(...)`; return types are separate attributes.
2. **Pass 2: scope construction and reference resolution.** Enters one scope per function. The outermost block shares the parameter/function scope; nested blocks add scopes. Inserts formals and local declarations while traversing, binds identifiers to declarations, copies symbol/signature attributes, rejects unknown names, and rejects direct calls whose resolved declaration kind is main. Global collection before this pass makes global/function declaration order less restrictive than local declaration order. The code does not implement overloading.
3. **Pass 3: type propagation and compatibility.** Assigns literal types; propagates variable types; matches call arity and argument types exactly; propagates declared call return type. Uses a **16-entry operator table**. Arithmetic/relational operators accept integers; logical operators accept Booleans; equality/inequality accept matching integers or matching Booleans; assignment accepts matching integers or matching Booleans. Conditions require Boolean type. Empty returns in non-void functions and incompatible returned values are rejected. Returning any value from main is rejected.
4. **Pass 4: structure and literal checks.** Restricts locals to function-block depth 1; validates break against loop nesting; checks that each non-void function contains a value-return statement somewhere; restricts expression statements; validates integer literal range `−2147483648` through `2147483647` inclusive.

Evidence: `semantics.py:13–31,227–678`. The return check is **presence-based**, not a proof that every control-flow path returns. The backend handles non-void fallthrough at runtime.

### MIPS code generation

**Output organization.** Emits `.data`, alignment, fixed runtime strings/input buffer, zero-initialized global words, interned string directives, `.text`, `.globl main`, all six runtime routines, then user functions in AST order. Runtime routines are emitted even if unused. There is no separately linked runtime file. [Evidence: `codegen.py:308–316,385–488,511–516`.]

**Storage and frame layout.** Global variables use `g_<source-name>` labels and `.word 0`. Variable access uses resolved declaration symbol IDs to select global labels or stack offsets. Parameters occupy `0($fp)`, `4($fp)`, and successive four-byte offsets. Saved `$ra` and `$fp` occupy `-4($fp)` and `-8($fp)`; locals start at `-12($fp)` and extend downward by four bytes. Per-function fixed frame size is **8 + 4 × local-count bytes**; arguments and expression temporaries use additional caller/dynamic stack space. There is no explicit local-variable initialization. [Evidence: `codegen.py:143–147,204–258,399–400,568–594,607–608,757–846`.]

**Calls and returns.** Actual arguments are evaluated left-to-right, with each result pushed. For two through four arguments, `$a0`–`$a3` are used as scratch registers to reverse their stack order so formal zero is at the callee frame base. These registers are not the primary argument-passing interface. Calls emit `jal <callee-name>`; the caller removes `4 × argument-count` bytes afterward. Callees preserve return address/frame pointer, and values return in `$v0`. Explicit returns jump to a shared exit label; main exits through syscall 10. Ordinary functions restore stack/frame/return state. This provides the mechanics needed for nested calls and recursion, but recursive programs were not executed during this investigation. [Evidence: `codegen.py:490–509,518–594,660–671,868–903`.]

**Evaluation strategy.** All expression results are placed in `$v0`. General binary evaluation computes the left operand, pushes it, computes the right, then pops the left into `$t0`; this preserves intermediate values across nested expressions/calls. Assignment computes and saves the lvalue address before evaluating the right side, stores the result, and leaves the assigned value in `$v0`, which supports chained assignments. Only identifier lvalues are implemented. [Evidence: `codegen.py:676–755,799–866,945–960`.]

**Instruction choices.** Addition/subtraction use `addu`/`subu`; multiplication uses `mul`; normal division/remainder use `div` with `mflo`/`mfhi`; negation uses subtraction from zero. Signed ordering uses `slt` with operand reversal/inversion for the other comparisons. Equality uses `xor` plus `sltiu`; inequality uses `xor` plus `sltu`; Boolean not uses `sltiu`. No overflow exception/check is emitted for ordinary addition, subtraction, multiplication, or negation. [Evidence: `codegen.py:718–725,962–1092`.]

**Conditional flow.** `if` and `if/else` use generated labels. Loops place a condition at a start label, branch to the exit on false, generate the body, and jump back. A break-target stack ensures nested-loop breaks select the innermost loop. Logical AND/OR skip the right operand when the left determines the result and normalize results to 0 or 1. Jump/branch helpers add `nop` delay slots. General zero/nonzero tests use an inverted branch to a nearby continuation followed by an unconditional jump to the actual target; reducing dependence on a direct conditional branch's reach is a reasonable technical interpretation, not a documented benchmarked optimization. Division/modulo also emit their own local conditional branches with `nop`s. [Evidence: `codegen.py:271–306,614–657,905–943,974–1057`.]

### Predefined runtime functions

| Function | Semantic signature | Generated implementation |
| --- | --- | --- |
| `getchar` | `() -> int` | Clears a two-byte global buffer, calls read-string syscall 8 with capacity 2, loads its first byte with signed `lb`, maps zero to -1, returns the resulting value. The comment describes EOF detection; actual simulator EOF behavior is not independently verified. |
| `halt` | `() -> void` | Syscall 10; no return prologue/epilogue. |
| `printb` | `(bool) -> void` | Tests argument, selects fixed `true`/`false` string, invokes string-print syscall 4, clears `$v0`. |
| `printc` | `(int) -> void` | Loads first stack argument into `$a0`, syscall 11, clears `$v0`. |
| `printi` | `(int) -> void` | Loads first stack argument into `$a0`, syscall 1, clears `$v0`. |
| `prints` | `(string) -> void` | Loads literal address from first stack argument, syscall 4, clears `$v0`. |

Evidence: `semantics.py:169–183`; `codegen.py:414–509`. Runtime functions except `halt` use an eight-byte frame saving `$ra`/`$fp`. Print routines add no automatic newline. Error paths explicitly print a newline using character syscall 11. Syscall operations are provided by the execution environment, while the wrapper assembly is custom generated code.

## Frontend

The frontend is a **compiler frontend**, not a graphical/web frontend. It comprises lexing, parsing, AST shaping, semantic validation, and diagnostic/debug output. There are no pages, browser components, routing tables, forms, frontend state stores, or reusable UI system in the checkout.

`ShapeSpec.txt` removes grammar-only wrappers/punctuation, maps source types to `int`/`bool`/`void`, maps identifier and literal tokens to semantic node types, flattens recursively built lists, and explicitly constructs empty containers. Function headers become declarations that acquire their body through the enclosing production. `UNARY_MINUS` initially retains the minus token and operand; `FixUnaryMinusShaper` folds a nonnegative number's textual spelling into a negative number leaf using the number's line metadata, or replaces the shape with `UMINUS(operand)`. This makes the minimum signed integer literal representable before the later range check. [Evidence: `ShapeSpec.txt`; `main.py:60–76`; `semantics.py:61–63,651–653`.]

The shape specification also contains `mainfunctiondeclarator/3` and a two-child `mainfunctiondeclaration` mapping although the current parser has no `mainfunctiondeclarator` rule and its main production forms have four/five children. These are unmatched/legacy-looking specification entries by source comparison; their historical rationale and the external shaper's handling of unused rules are not established.

`LabelView` displays node attributes, line numbers, identifier symbols, and selected signatures with four-space recursive indentation. `printLexer` retains a milestone-1-oriented token display; comments identify milestone-2 shaping and reference-AST normalization. These comments preserve development context without establishing milestone completion dates or grading results. [Evidence: `main.py:61,79,113–156,186–202`.]

## Database / Data Engineering

There is no database, ORM, schema migration, ETL pipeline, dataset, record synchronization, index, transactional storage, or persistent application model. The relevant data transformations are source tokens → parse tree → shaped AST → annotated AST → layout maps → assembly text.

The internal data relationships are nevertheless explicit:

- Reference identifiers point to declaration objects through `decl`; declarations/uses share `sym` identifiers.
- Function declarations record ordered parameter types/names and a separate return type.
- Scope dictionaries map names to declarations and record owner/type metadata.
- `FunctionInfo` maps declaration symbol IDs to parameter/local offsets.
- Global label maps key on symbol IDs, function layout maps key on source names, and string pools key on **raw literal spelling**, not decoded string value.
- Duplicate raw literal spellings reuse one generated string label. Per-function missing-return messages are registered during layout so the data section can be emitted before code.

Evidence: `semantics.py:74–183,229–310,368–381`; `codegen.py:40–83,143–258`. These structures are compiler metadata, not database models or persistent caches.

## External Integrations

1. **ANTLR generator/build tool.** `Makefile` selects `antlr4` unless `[local path omitted]` is executable. It runs with `-Dlanguage=Python3`, writes into `gen/`, and generates the parser after the lexer output. Grammar changes are prerequisites of their generated Python outputs. No generator binary is vendored.
2. **ANTLR Python runtime.** The driver imports `FileStream`, `Token`, `CommonTokenStream`, and `ErrorListener`; generated recognizers import runtime machinery. A missing runtime import triggers a course fallback path `[local path omitted]`.
3. **Course AST support.** `ASTShaper`, `ASTTraversal`, and `ASTView` come from `cpsc411`; fallback lookup uses `[local path omitted]`. The shaping language and traversal callback conventions depend on this external package. Its source is not included.
4. **MIPS execution environment contract.** Generated assembly uses numeric syscalls 1, 4, 8, 10, 11, and 17. The repository does not launch a simulator or name/configure a specific one. Compatibility and exit/EOF behavior require an appropriate external runtime.

These are build/library/target integrations, not external web APIs. No credentials, API keys, network retries, authentication flow, or remote service client is present. Evidence: `Makefile`; imports in all three Python files; runtime and error code in `codegen.py`.

## Reliability / Failure Handling

### Implemented mechanisms

- CLI arity failure returns 1 with usage text; source-file I/O failures report the OS error to stderr and return 1.
- Shape-specification I/O failure prints a targeted error and exits 1.
- Parser diagnostics are replaced with a custom line-oriented fail-fast listener.
- Semantic validation raises a dedicated `SemanticError`, optionally appending a source line. The driver catches that exception around each pass, prints it to stderr, and stops before assembly generation.
- Same-scope declarations are rejected; unresolved identifier references and many type/structural violations have targeted messages.
- Integer literal range is checked explicitly using Python integer conversion and signed-32-bit bounds.
- The codegen layer validates required AST attributes, function-body shape, storage mappings, active function/loop context, and supported node kinds with `CodegenError` exceptions.
- More than four formals causes an explicit stderr diagnostic and `SystemExit(1)` during layout collection.
- Division and remainder test for a zero divisor and emit an error message, newline, and syscall 17 with requested status 1.
- `INT32_MIN / -1` emits `INT32_MIN`; `INT32_MIN % -1` emits zero, avoiding the ordinary `div` path for that pair.
- Non-void function fallthrough emits a function-specific error, newline, and requested status-1 exit. Explicit returns bypass that error path through the normal exit label.
- The driver obtains a complete assembly string before printing it, so its normal assembly stdout write occurs after layout and generation have completed.

Evidence: `main.py:43–57,159–205`; `semantics.py:53–71,106–114,186–192` and all passes; `codegen.py:86–112,165–176,518–564,652–674,974–1060`.

### Boundaries and source-observed limitations

These are part of the technical record, not fixes made during investigation:

1. **Full input consumption is not enforced.** The grammar's `start` rule has no `EOF`, and the driver does not check for leftover tokens after `parser.start()`. A parser-only probe of `main() {} @` produced zero syntax errors while leaving `@` as the next token. This demonstrates acceptance of a valid prefix at the parser stage, not a successful full compilation.
2. **Lexical debug diagnostics are not the main-path diagnostics.** Error tokens exist, but `main()` does not call `printLexer()` or pre-scan token categories. Lexical error tokens encountered during parsing generally become parser errors; trailing tokens can encounter the consumption issue above. The custom listener is attached to the parser only.
3. **No explicit callable-kind validation in pass 3.** Pass 2 only specially rejects `kind == 'main'`; pass 3 reads `param_types` with an empty default and then accesses `decl.return_type`. A zero-argument invocation of a resolved variable is therefore a source-based candidate for an uncaught attribute error rather than a normal semantic diagnostic. Function identifiers used as ordinary operands similarly lack ordinary variable `sem_type` metadata. These consequences were not exercised end-to-end because the course traversal library is unavailable.
4. **Scope metadata shares the user-name dictionary.** Names such as `__owner__` and `__scope_kind__` are legal under the lexer but already appear in scope dictionaries. Redefinition/lookup behavior can therefore interact with metadata. This is a verified representation choice and an inferred edge-case risk, not evidence of a tested exploit.
5. **Return validation is not complete path analysis.** A value-return anywhere satisfies pass 4 even if other paths fall through; runtime guards handle that case. There is no definite-assignment analysis or local initialization, and no unreachable-code elimination is evident.
6. **Entry-point spelling/assembly namespace are not fully constrained.** An untyped `foo() {}` parses as a main declaration and is emitted with label `main`. Conversely, typed functions retain their source names. There is no assembly-label collision pass for user names versus `main`, `g_<name>`, fixed `__jmm_*` labels, or generated labels such as `str0`. Duplicate-label scenarios are a source-derived risk, not simulator-validated failures.
7. **String edge handling differs from comments.** `_emit_string_directives` contains a `\0` branch, but `\0` is not a valid lexer escape. The branch appends text `<nul>` and emits separate `.asciiz` segments, rather than producing the raw embedded NUL described by its comment; its non-text `.byte 0` branch has no corresponding segment construction in the current implementation. Backslash escape processing appends a single backslash into assembly text, so faithful assembler interpretation of literal backslashes is not established. This should not be described as verified embedded-NUL support.
8. **Character input has a narrow implementation.** It uses read-string syscall 8 with a two-byte buffer and signed-byte load, then treats zero as EOF. Correct behavior for EOF, NUL input, non-ASCII bytes, and interactive buffering depends on simulator semantics and is not proven here.
9. **Error handling is selective.** Imports happen before CLI validation; missing dependencies can raise tracebacks. `CodegenError`, shaping exceptions, and unexpected Python exceptions are not caught by the driver's semantic-error handler. No broad recovery, multiple-diagnostic aggregation, retries, rollback, checkpointing, or resumable compilation exists.
10. **Large target programs have no verified bounds.** The backend does not validate stack displacement/immediate ranges, stack exhaustion, generated program size, or every assembler dialect constraint. Helper branch expansion is present, but no large-program execution evidence accompanies it.

## Security

Implemented validation concerns source-language correctness: restricted identifier syntax, parse/type checks, declaration rules, literal bounds, and selected generated runtime error checks. The driver uses ordinary file reads and does not execute source-language text as Python or invoke an assembler/shell during compilation. Those are observed implementation properties, not evidence of a hardened untrusted-code processing service. [Evidence: `main.py`; grammars; semantic/backend modules.]

No authentication, authorization, RBAC, session handling, encryption, secret management, permission policy, sandbox for generated programs, or security test suite is present. Imported support libraries and the working-directory-relative shape specification are trusted inputs to this pipeline. No claim of secure compilation for malicious inputs, memory safety of generated programs, or robust resource-limit enforcement can be made from the repository.

## Testing / Quality

### Repository testing assets

**Zero checked-in automated test files and zero present test-suite directories were found** in the nine-file tracked inventory and the complete non-`.git` filesystem inventory. There is no test runner configuration, CI check, coverage report, expected-output fixture, benchmark harness, lint configuration, or formatter configuration. Ignored directory names `test/` and `sem_test/` suggest possible local testing organization, but do not establish its contents, historical test count, or results. No grade, correctness percentage, or course test outcome is recorded.

The source includes validation passes, internal invariant checks, debug token/AST printers, and explanatory comments, but these are not automated tests.

### Read-only checks performed for this investigation

All Python checks used `python3 -B` to avoid creating/updating bytecode. No generated parser rebuild or simulator execution occurred.

| Check | Observed result | Scope / limitation |
| --- | --- | --- |
| In-memory Python syntax parsing with `ast.parse` | All three custom Python modules parsed successfully. | Syntax only; does not import dependencies or validate behavior. |
| Dependency availability via `importlib.util.find_spec` | `antlr4` available; `cpsc411` unavailable in the investigation environment. | Environment observation, not a dependency manifest or statement about course machines. |
| Driver launch with `python3 -B main.py` | Failed during `cpsc411.astshaper` import, including the configured fallback. | Occurred before CLI argument validation; does not test normal usage/error handling. |
| Generated lexer/parser import | Local generated Python lexer and parser imported successfully. | Does not prove reproducibility from grammar or full library version compatibility. |
| Parser input `main() {} @` | Zero syntax errors; next token remained `@`. | Demonstrates missing full-input enforcement at parser stage. |
| Parser input `foo() {}` | Zero syntax errors; tree contained `mainfunctiondeclaration`; next token EOF. | Demonstrates that entry-point syntax accepts identifiers other than `main`; no semantic/backend run. |
| Parser input `main() { 1; }` | Zero syntax errors; literal-statement tree present. | Semantic rejection is supported by pass-4 source, not execution here. |
| Parser input `main() { prints("a\0b"); }` | One parser syntax error. | Supports the grammar observation that backslash-zero is not an accepted escape; this probe used the generated parser's default listener/recovery, not the driver's fail-fast listener. |
| Grammar inventory | 39 lexer rules; 32 parser rules; local generated recognizer rule-name lists match those counts/names. | Does not certify byte-for-byte regeneration equivalence for all grammar details. |
| Shaping inventory | 78 nonblank specification lines. | Counts written shaping entries, including unmatched entries; not 78 distinct runtime features. |

These four parser examples are **investigative probes**, not four pre-existing project tests. No full source → AST → semantic analysis → MIPS compilation, assembly validation, runtime output comparison, recursion test, or arithmetic execution test is claimed. No substitute/mock course traversal was used to manufacture passing results.

## Deployment / Infrastructure

The repository provides local/course-machine build integration, not hosted infrastructure.

- `make` targets generated lexer/parser Python files in `gen/`; `mkdir -p` creates that directory during an actual build.
- Lexer generation depends on the lexer grammar. Parser generation depends on the parser grammar and generated lexer Python output.
- `ANTLRFLAGS ?= -Dlanguage=Python3` makes generator options overridable through Make configuration. `ANTLR` initially selects the local command and conditionally switches to the executable course wrapper.
- `make clean` removes generated `.tokens`, `.interp`, and `.py` files, the root/generated Python caches, and `.antlr`. It was inspected but **not run** during this investigation.
- Runtime imports attempt ordinary environment resolution first, then append course-specific locations at the front of `sys.path` following `ModuleNotFoundError`.
- `ShapeSpec.txt` is resolved relative to the current working directory, so the documented command assumes an appropriate launch directory or equivalent file placement.
- Compilation writes no assembly file itself; stdout redirection would be the caller's responsibility. There is no output-name flag, simulator-launch flag, pipeline-stage flag, or packaging/install command in `main.py`.
- Generated `gen/` is ignored and documented as uncommitted, although local artifacts are present in this checkout. The build is therefore needed after a clean clone along with externally supplied Python dependencies.
- There is no pinned requirements file, lockfile, container, reverse proxy, deployment topology, CI/CD workflow, cloud/hosting configuration, or published-package metadata.

Evidence: `Makefile`; `README.md`; `.gitignore`; `main.py:3–38,43–49,159–210`; imports in `semantics.py` and `codegen.py`. The provided code does not establish that the project was deployed or run on actual MIPS hardware.

## Performance / Scale

No measured compile time, execution time, memory usage, throughput, speedup, source-program size benchmark, user count, or production workload is recorded. The following are verified implementation characteristics, not measured performance claims:

- Four semantic traversals precede a layout traversal and recursive emission. Pass separation makes responsibilities inspectable; it is not evidence of a measured speed benefit.
- Assembly lines are accumulated in a Python list and joined into one string, so output is buffered rather than streamed instruction by instruction.
- Raw string-literal pooling emits one entry per distinct raw spelling encountered, including error strings registered during layout. No measured space saving is available.
- Short-circuit Boolean evaluation can skip a right-hand expression at runtime; it also preserves language-side-effect semantics.
- The code deliberately uses stack temporaries for binary operations and argument evaluation rather than implementing a general register allocator.
- Every compile emits all six runtime routines and fixed runtime data whether used or not; there is no runtime dead-code stripping pass.
- Compilation is synchronous, and generated routines use ordinary call stacks. There is no compiler thread/process concurrency mechanism.
- Formal count is capped at four by layout validation. Each variable/argument storage slot is four bytes; fixed frames are `8 + 4L` bytes for `L` locals. The caller adds four bytes per argument and expression evaluation adds temporary pushes.
- Input reads for generated `getchar` use a two-byte buffer. This is buffer capacity, not a throughput or concurrency metric.

Evidence: semantic runners; `MIPSEmitter`; layout collection; `_gen_binary_op`, `_gen_func_call`, `_gen_short_circuit_and`, `_gen_short_circuit_or`; `_emit_runtime_routines`.

## Technical Challenges / Complexity

1. **Consistent AST contracts across independent stages.** Grammar productions, declarative shaping rules, unary-minus customization, traversal dispatch names, and backend positional child accesses must agree. A function must consistently provide return type/name/formals/body at the expected positions. This coordination is visible in `ShapeSpec.txt`, declaration annotation, `_func_body_node`, and layout/emission code.
2. **Separating collection from resolution.** Global registration precedes name resolution while local scopes are traversed contextually. This supports forward function/global references while maintaining duplicate/unknown-name checks. Shared scope metadata and declaration back-references are concrete parts of the solution, with edge cases documented above.
3. **Preserving types and context across traversal events.** Operators use centralized compatibility tables, while returns/blocks/breaks depend on function and nesting state. Entry/exit handlers and shared contexts encode this state; correctness also depends on the external traversal library honoring that convention.
4. **Preserving values across nested calls.** The backend saves intermediate values/lvalue addresses on the stack, assigns fixed frame-relative slots, saves return/frame registers, and rearranges arguments after left-to-right evaluation. These interdependent choices support nested expressions without relying on temporary registers surviving calls.
5. **Correct control-flow emission.** Short-circuit expressions, nested breaks, shared function exits, branch-delay slots, and non-void fallthrough guards require coordinated labels and state. Generated labels use one context counter, while user-label collision prevention remains a limitation.
6. **Signed-integer boundary behavior.** Negative-literal shaping allows range validation to see the minimum signed value as a single literal. Division/remainder additionally special-case the minimum-value/negative-one pair and handle zero divisors. These are explicit boundary-case implementations, not claims of exhaustive arithmetic conformance.
7. **String representation across language boundaries.** Source escape syntax, raw literal pooling, and assembler directive escaping interact. The implementation performs translation but contains documented discrepancies; full fidelity is not established by tests.
8. **Reproducibility with external course tooling.** Local/course wrapper selection and import fallback paths facilitate environment integration, but exact dependencies and the course AST support are not bundled. This is a concrete reproducibility dependency, not evidence of deployment automation.

## Documentation / Operational Support

`README.md` documents the course/project identity, Python/ANTLR/course-library requirements, main repository files, `make`, `python3 main.py file.j--`, stdout assembly output, the four broad pipeline stages, cleanup, and the uncommitted generated directory. It does not provide a complete language manual, dependency installation/pinning procedure, sample program, simulator invocation, test instructions, benchmark, or troubleshooting runbook.

`ShapeSpec.txt` acts as an executable AST contract. `codegen.py` docstrings explain calling convention, frame layout, expression-result registers, layout collection, and code-emission helpers. `semantics.py` comments identify pass responsibilities and type/scope helpers. `main.py` retains lexer and attributed-tree debugging support. The Makefile and fallback imports document concrete course-machine paths. There are no administrative endpoints, recovery scripts, hosted operational dashboards, or service monitoring facilities.

## Quantifiable Evidence

Counts describe this inspected checkout before adding this report unless otherwise stated. Source line counts use Python `str.splitlines()` so a final line without a trailing newline is counted; they include comments and blank lines and are **not executable lines of code**.

| Metric | Value | Evidence / counting method |
| --- | --- | --- |
| Original tracked files | 9 | `git ls-files`; file inventory above. |
| Custom Python source modules | 3 | `main.py`, `semantics.py`, `codegen.py`. |
| Custom Python physical lines | 1,998 | `splitlines()`: 210 + 678 + 1,110. Current working tree, including pre-existing `main.py` modification. |
| Custom Python class definitions | 17 | In-memory `ast.ClassDef` count: 3 driver + 8 semantics + 6 backend. These include exceptions, contexts, traversals, and support classes, not 17 domain/database models. |
| Custom Python function/method definitions | 157 | In-memory `ast.FunctionDef`/`AsyncFunctionDef` count: 8 + 98 + 51; includes methods and small traversal callbacks. |
| ANTLR grammar files | 2 | Lexer and parser `.g4` files. |
| Lexer rules | 39 | Named rule declarations; includes WS/COMMENT skip rules and three error categories. |
| Parser rules | 32 | Named lowercase rule declarations, cross-checked against local generated `ruleNames`. |
| Written AST-shaping entries | 78 | Nonblank lines in `ShapeSpec.txt`; includes unmatched legacy-looking entries. |
| Semantic passes | 4 | Driver tuple and `run_pass1` through `run_pass4`. |
| Semantic operator categories | 16 | Keys in `_legal`; unary and binary minus have separate AST categories. |
| Predefined source runtime functions | 6 | `predefined_functions` and six emitted routines. |
| Reserved runtime symbol IDs | 6 | `sym1`–`sym6`; next custom symbol starts at 7. |
| Required entry-point declarations | Exactly 1; 0 parameters | `check_main`, `Pass1Traversal.n_mainDecl`. This refers to `mainDecl` shape, not name spelling. |
| Maximum function formals accepted by backend | 4 | `CollectLayoutTraversal._enter_function`: `len(formals) > 4` rejection. |
| Integer literal interval | −2,147,483,648 to 2,147,483,647 | `INT32_MIN`, `INT32_MAX`, pass-4 literal check. |
| Variable/parameter stack slot size | 4 bytes | Layout offset increments/decrements and word load/store operations. |
| Fixed saved-register frame portion | 8 bytes | Saved `$ra` and `$fp`; runtime and user prologue/epilogue. |
| Fixed user frame formula | 8 + 4 × number of locals bytes | `CollectLayoutTraversal._exit_function`; excludes caller arguments and temporary pushes. |
| First parameter / first local offset | 0 / −12 bytes relative to `$fp` | Layout initialization. |
| Generated input buffer capacity | 2 bytes | `__jmm_gc_buf: .byte 0, 0`; syscall length 2. |
| Distinct emitted syscall numbers | 6: 1, 4, 8, 10, 11, 17 | Runtime printing/input/halt and generated error exits. |
| Local generated ANTLR artifacts | 13 files | Seven under `gen/`, six under `.antlr/`; excludes Python caches. |
| Existing Python cache artifacts | 4 files | Complete non-`.git` filesystem inventory. Not test evidence. |
| Checked-in/present automated test files found | 0 | Tracked and full non-`.git` inventory; no test directories present. Does not quantify external/historical testing. |
| Investigation parser inputs | 4 | Four in-memory inputs documented in Testing / Quality. Not repository test-suite size. |

No API endpoint, database-model, dataset, processed-record, deployed-instance, customer, or performance-outcome counts are inferred for this compiler.

## Evidence Map

The detailed sections above give narrower references. These entries consolidate the evidence behind substantial claims.

### Claim: The repository implements an integrated J-- to MIPS compiler pipeline

Evidence:

- `main.py:159–206` — source loading, ANTLR parse, shaping, sequential semantic calls, assembly generation/output.
- `README.md` — documented purpose and usage.
- `codegen.py:1097–1110` — layout plus emission entry point.

Qualification: The full pipeline could not be executed here without `cpsc411`.

### Claim: Language syntax and AST structure are custom project work built on generated parsing machinery

Evidence:

- `JMinusMinusLexer.g4` and `JMinusMinusParser.g4` — written language rules.
- `ShapeSpec.txt` — AST mapping rules.
- `main.py:60–76` — custom unary-minus shaping.
- `gen/JMinusMinusLexer.py:1`, `gen/JMinusMinusParser.py:1`, generated listener header — ANTLR provenance of generated Python.
- `.antlr/JMinusMinusLexer.java:1`, `.antlr/JMinusMinusParser.java:1` — generated Java provenance.

### Claim: Four passes perform declaration, scope, type, and structural validation

Evidence:

- `semantics.py:227–310` — pass 1 declarations/main rules.
- `semantics.py:313–390` — pass 2 scopes/references.
- `semantics.py:393–562` — pass 3 typing/calls/returns.
- `semantics.py:565–653` — pass 4 context/range rules.
- `semantics.py:656–678` — traversal execution entry points.

Qualification: Callability and some malformed-operand error cases lack explicit checks; return analysis is presence-based.

### Claim: Generated function calls use a custom stack-based convention and preserve intermediate expression values

Evidence:

- `codegen.py:40–53,161–258` — frame metadata and offsets.
- `codegen.py:568–594` — user prologue/epilogue.
- `codegen.py:745–755,848–903,945–960` — temporary saves, assignment-address preservation, argument order/rearrangement, cleanup.

Qualification: This is not evidence of a standard platform ABI or simulator-tested recursion.

### Claim: Control-flow generation includes nested-loop breaks and short-circuit evaluation

Evidence:

- `semantics.py:620–628` — break-context validation.
- `codegen.py:636–657` — loop labels and break-target stack.
- `codegen.py:905–943` — right-operand skipping and normalized Boolean results.
- `codegen.py:271–306` — branch/jump helpers and delay slots.

### Claim: Six predefined functions and selected runtime failures are implemented through generated assembly

Evidence:

- `semantics.py:169–183` — predefined signatures/symbols.
- `codegen.py:385–509` — runtime data and routines.
- `codegen.py:543–561` — non-void fallthrough error.
- `codegen.py:974–1060` — zero-divisor error and signed minimum-value special cases.

Qualification: Syscalls require an external execution environment; no simulator results are present.

### Claim: Build/environment integration is course-aware but dependencies are not self-contained

Evidence:

- `Makefile` — local/course ANTLR selection, prerequisites, generation/cleanup.
- `main.py:3–35`; `semantics.py:5–10`; `codegen.py:6–11` — dependency imports/fallback paths.
- `README.md` — requirements and generated-directory note.
- `.gitignore` — generated and local artifact exclusions.

Investigation observation: `cpsc411` was unavailable and the driver import failed in this environment.

### Claim: Test completeness, deployment, and performance outcomes cannot be asserted

Evidence:

- Nine-file tracked inventory and full non-`.git` file inventory — no test suite, CI configuration, benchmarks, or deployment manifests found.
- `README.md` — build/use documentation without test/performance/deployment results.
- `.gitignore` — test-related names are exclusions only.

Qualification: This does not claim that the developer never tested or ran the compiler externally.

### Claim: Several edge conditions require qualification instead of broad correctness claims

Evidence:

- Parser `start` and `mainfunctiondeclaration` rules; driver after `parser.start()` — no EOF enforcement or main-name check.
- Investigation parser probes — trailing token and arbitrary entry identifier behavior.
- `semantics.py:79–114,455–473` — shared scope metadata namespace and missing general callable-kind guard.
- Lexer string rule and `codegen.py:318–383` — escape handling discrepancy.
- `codegen.py:147,167,79–83,389–396` — label naming without a user/generated namespace collision check.

Qualification: Parser observations are directly exercised; downstream edge failures identified only from source are technical interpretations.

## Git / Development History

Git history was not analyzed because current source, comments, configuration, and generated-artifact provenance adequately expose the present project architecture. Git was used only to identify tracked files and the existing working-tree modification to `main.py`; no authorship, commit chronology, branch manipulation, or historical feature reconstruction was performed.

Comments identify milestone-1 lexer debugging, milestone-2 shaping, and matching a reference AST, but do not establish dates, completion claims, or evaluation results. The orphaned `generate_mips` cache is insufficient reason to reconstruct an unsupported development narrative. This report documents current code and visible retained artifacts rather than every possible historical version.

## Uncertain / Not Verifiable

- Full compiler execution/correctness in this environment, because the required `cpsc411` package is unavailable.
- Exact support-library implementation, traversal semantics, version, licensing, distribution, and installation procedure.
- Complete language conformance against an external course specification/reference compiler, which is not included.
- Whether generated artifacts are exactly current for every grammar detail; rule lists match and probes are reported, but no regeneration was performed.
- Simulator/assembler identity, compatibility, delay-slot settings, syscall EOF/exit semantics, and generated-program execution results.
- Actual tests performed outside this checkout, test counts/results, course grading outcomes, and ignored test-directory contents.
- Measured speed, memory use, maximum accepted source/program size, recursion depth, runtime stack limits, and throughput.
- User count, production adoption, business outcomes, deployment environment, availability, or operational maintenance history.
- Historical rationale for unmatched shape rules, label naming choices, string behavior, argument limits, and branch expansion.
- Whether code-derived edge cases in semantic handling, string emission, label collisions, and large displacements were previously observed or debugged.
- The contents/history of source corresponding to the orphaned `generate_mips` bytecode cache.
- Any claimed security hardening, portability matrix, exhaustive arithmetic correctness, or production readiness.

## Questions Requiring External Context

1. What authoritative J-- language and diagnostic specifications were used, and are reference compiler/test materials available outside the repository?
2. What version/distribution of the course `cpsc411` package is required, and how can an equivalent environment obtain it?
3. Which assembler/simulator and runtime settings were used to validate the emitted MIPS?
4. What external or ignored tests were run, including arithmetic boundaries, nested/recursive calls, short-circuit side effects, error diagnostics, and string escaping, and are their results available?
5. Were the apparent edge cases documented above intentional specification choices, known limitations, or unobserved defects?
6. Are there recorded compilation/runtime benchmarks or size-limit experiments outside this checkout?
7. Was the compiler used beyond the course environment, and if so what actual usage/deployment context is documented?

No ownership/team question is needed: sole development was explicitly supplied as context.

## Additional Technical Details

- The driver imports `ASTTraversal` even though it does not directly instantiate it; traversal functionality is used in the semantic/layout modules. `ASTView` remains an import-time dependency even though its debug invocation is disabled.
- `main.py` contains a duplicated AST-shape-specification comment, but only one `SHAPE_SPEC_FILE` setting. This has no separate feature implication.
- The semantic helpers `same_type`, `is_numeric_type`, `is_boolean_type`, and `is_void_type` are defined but not called elsewhere in the inspected source. The compatibility table and direct normalization checks perform the operative validation.
- Function signature strings contain parameter types only; return type is stored separately. Runtime `prints` introduces an internal `string` semantic type even though user declaration types remain int/Boolean.
- Globals, ordinary functions, main declarations, and runtime functions share a global symbol namespace, so top-level reuse of predefined function names is rejected by ordinary duplicate declaration checks. Local scope shadowing is not generally prohibited.
- Normal `void` function fallthrough emits the normal epilogue without explicitly clearing `$v0`; explicit empty return statements and print-runtime routines clear it. The language does not provide a usable void return value through the type rules.
- Generated Boolean values normally use 0 and 1; emitted tests treat zero as false. Both integer and Boolean variable slots are word-sized.
- Runtime `getchar` has one shared global buffer, not per-call allocated storage. The repository supplies no concurrent generated-language execution model.
- Runtime error messages are printed using ordinary target output syscalls; compiler diagnostics use Python stderr. These are separate channels/mechanisms.
- The emitter has no source-to-assembly line map or emitted debug-symbol format. Labels and instruction text are the produced artifact.
- The Makefile's declared generated Python targets do not list the shaping file, semantic code, or backend as prerequisites because those are interpreted at compiler runtime rather than generated by ANTLR.
- The investigation preserved the existing local artifacts and working-tree modification. No bugs or configurations described here were changed as part of producing this record.

### Final preservation check

A final filesystem re-scan found no additional original source/configuration components omitted from the inventory. SHA-256 comparison of all 27 pre-existing non-`.git` files against the pre-report snapshot found no changed, removed, or additional files in that set. Final Git status retained the original `main.py` modification and showed only `PROJECT_ANALYSIS.md` as a new untracked file. The existing repository contents were preserved.
