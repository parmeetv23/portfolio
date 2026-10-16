---
project_id: custom-compiler
name: "J-- to MIPS Compiler"
dates: "Jan. 2026 -- Apr. 2026"
categories: ["Compiler construction", "Programming languages", "Semantic analysis", "Code generation"]
technologies: ["Python", "ANTLR4", "MIPS assembly", "Make", "cpsc411 AST support"]
evidence:
  - evidence/custom-compiler/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/projects/custom-compiler.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Overview

University of Calgary CPSC 411 term-project compiler for J--, a small imperative language. A command-line driver reads source, uses generated ANTLR recognizers, shapes an AST, performs four semantic passes, and emits MIPS assembly to stdout. The repository implements compilation stages, not an assembler, linker, simulator, or hosted service.

Original implementation attribution follows the ownership statement in the evidence. The language rules, semantic analysis, backend, and integration are distinct from ANTLR-generated machinery and external course AST libraries.

# Core Contributions

- Custom lexer/parser grammars for integer/Boolean declarations, functions and entry-point syntax, expressions, calls, blocks, conditionals, while loops, break, and returns. Operator precedence and assignment associativity are explicit.
- Declarative AST-shaping rules remove grammar wrappers/punctuation and flatten lists. A custom unary-minus shaper folds signed numeric literals so the minimum signed integer is representable before range checking.
- Four-pass declaration, scope/reference, type, and structural validation, with annotated declarations/references feeding code generation.
- Target layout collection and MIPS emission for globals, strings, stack frames, calls/returns, expression temporaries, assignment, comparisons, short-circuit logic, nested loops, and runtime error paths.
- Six generated runtime wrappers, compiler diagnostics/debugging utilities, local/course ANTLR build selection, dependency fallbacks, and build/use documentation.

# Architecture / Technical Design

Latin-1 source → generated lexer/token stream/parser → external ASTShaper configured by ShapeSpec and unary-minus subclass → four semantic traversals → layout collection → recursive MIPS emission → buffered assembly text on stdout.

Semantic state includes a scope stack, deterministic symbol IDs, function/loop/block context, and declaration back-references. Global collection precedes resolution, supporting forward references at the source-design level. Functions and globals share a namespace with predefined routines; nested blocks have scopes, while locals are restricted to the outer function block. Operator compatibility, call arity/argument types, Boolean conditions, return types, break nesting, and signed-32-bit literals are checked.

Layout maps resolved symbols to global labels or frame offsets and interns raw string spellings. The custom stack calling convention evaluates arguments left-to-right, arranges formal slots, preserves frame/return registers, and returns values in $v0. Stack temporaries preserve intermediate expressions and assignment addresses across calls. This is not a claim of a standard ABI or executed recursion tests.

# Technical Depth

Short-circuit AND/OR can skip the right operand; generated loop labels and a break-target stack address nested loops. Branch/jump helpers emit delay-slot nops. Globals are zero-initialized; locals have no explicit initialization or definite-assignment analysis.

Generated getchar, halt, printb, printc, printi, and prints wrappers use simulator-style syscalls. The project emits wrappers and data; the external execution environment supplies syscall services. Division/modulo include zero-divisor termination and special handling for INT32_MIN divided/remainder by -1. Non-void fallthrough emits a function-specific runtime error because semantic return validation checks presence rather than all paths.

# Scale / Metrics

- **Four semantic passes**, **six predefined runtime functions**, **39 lexer rules**, and **32 parser rules** are implementation counts, not correctness or performance measures.
- Literal bounds: **−2,147,483,648 through 2,147,483,647**.
- Backend accepts at most **four function parameters**. Word slots are **four bytes**; fixed user frames are **8 + 4 × local-count bytes**, excluding caller arguments and temporary pushes.
- No measured compile/runtime speed, memory, program-size limit, user count, or adoption is recorded.

# Testing / Validation

No present automated suite, fixtures, expected assembly, coverage, or CI was found. Investigation syntax parsing passed for three custom Python modules; generated recognizers imported and four parser probes were run. These were investigation checks, not project tests.

The required cpsc411 package was unavailable, and driver launch failed during import. No full source-to-MIPS compilation, assembly validation, simulator execution, recursion test, or arithmetic execution was established. Source-implemented validation must not be described as a passing conformance suite.

# Reliability / Failure Handling

CLI arity/source/shape-file errors have targeted failures; parser diagnostics fail fast with line information; semantic errors stop before output. Code generation checks selected AST/storage/context invariants. More than four formals is explicitly rejected; emitted zero-divisor and non-void-fallthrough paths request error termination.

Handling is selective: missing imports, shaping errors, CodegenError, and other unexpected exceptions are not universally caught. Compilation is synchronous and buffers all assembly before its normal stdout write.

# Limitations / Attribution Boundaries

- ANTLR supplies recognizers/runtime/parse trees; cpsc411 supplies ASTShaper, traversal, and view abstractions. The custom contribution is grammars, shaping configuration/subclass, semantic passes, target layout/emission, and integration.
- The grammar lacks EOF enforcement. An investigation probe accepted a valid program prefix while leaving a trailing illegal token. Untyped entry declarations accept identifiers other than main; no complete assembly-label collision check exists.
- Callable-kind checks, string-escape emission, scope-metadata name collisions, large offsets, and input syscall edge cases have documented gaps or source-derived risks. Embedded-NUL correctness is not established; ordinary arithmetic overflow is not checked.
- Return presence is not control-flow completeness. No optimizer IR, SSA, general register allocator, definite-assignment analysis, or runtime sandbox is implemented.
- External course support, generated-parser rebuild, working-directory assumptions, and simulator conventions limit reproduction. Dependency versions and a compatible execution environment are not pinned; full compiler/runtime correctness remains unverified.

# Notes

Owner confirmation on 2026-10-09: development dates were **Jan. 2026 -- Apr. 2026**. These dates come from the owner, not investigation dates, file timestamps, or course identity.

Course identity does not establish development dates or grading results. Original source ownership follows the evidence's supplied statement, not generated-file counts. Project dates are owner-confirmed above; deployment and final tailored bullets are not inferred.

Evidence sections: Contributions; Architecture; Four semantic passes; MIPS code generation; Reliability / Failure Handling; Testing / Quality; Uncertain / Not Verifiable. Internal source paths refer to the investigated workspace.
