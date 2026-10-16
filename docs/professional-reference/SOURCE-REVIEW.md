# Source coverage and transfer decisions

Transfer date: **2026-10-15**. Source: sibling `Resume_Builder`, revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`. [catalog.json](catalog.json) records every imported file's source/destination and SHA-256, every privacy-edited source, and the disposition of every other inventoried source file. Paths are relative to the indicated repository, so the collection can be understood without the original absolute workspace path.

## Coverage

The source inventory contains **64 files**, excluding Git internals and `.DS_Store`. All professional record directories and all ten preserved analyses were included. Hidden local agent configuration and ignore rules were examined as repository configuration, not career evidence. No network lookup or external fact enrichment was performed.

| Source area | Finding and transfer treatment |
| --- | --- |
| `profile/` — four Markdown files | Education, original shared skills, certification status and public contact/profile links retained. Telephone/email omitted. |
| `experience/` — five Markdown files | Full responsibilities, role progression, dates, location/type qualifications, outcomes, operational examples, recognition, tools and uncertainty retained. One customer incident generalized to omit sensitive third-party circumstances. |
| `projects/` — six Markdown files | Full canonical architecture, implementation, contributions, metrics/conditions, test status, reliability, third-party attribution and limitations retained. |
| `evidence/` — ten project analyses plus index | All ten detailed analyses retained with privacy edits and transfer provenance. Existing index was navigation only; its ten entries are covered by the linked README and catalog. Three analyses have no canonical project record. |
| `applications/` — six application directories | Reviewed role/purpose briefs, generated analyses and LaTeX selections for alternate wording, claims, gaps and stale contradictions. Employer requirements were kept distinct from personal history. Generated artifacts were not copied or promoted into career facts. All six PDFs have paired LaTeX sources; see validation note below. |
| `base-resumes/software-base.tex` | Historical supplied seed reviewed. Its contact details, stale education `Present`, five-level RBAC, broad restaurant features, chat vector timestamps/seamless recovery and broader bare-metal assertions were not imported as new authority. Later canonical records preserve and qualify relevant history. |
| `templates/software-resume.tex` | Resume-format scaffold/placeholder content, not professional facts; excluded. |
| `README.md`, `AGENTS.md` | Read to understand canonical/evidence/output hierarchy, provenance, metric qualifiers, freshness and ingestion boundaries. Workflow instructions were not copied as portfolio instructions. |
| `tools/`, `tests/` | Resume-generation and PDF/layout tooling, including explicitly synthetic candidate fixtures. Excluded as professional content; their presence does not establish a separately owner-confirmed portfolio project. |
| `.codex/config.toml`, `.gitignore`, application `.gitkeep` | Configuration/housekeeping only; excluded. No Git database, credentials, environment file, build/cache artifact or dependency directory copied. |

## Completeness and duplication choices

- Career records were copied in full, with the documented privacy transformations and a source notice. They were not reduced to resume bullets. Existing metadata, exact metrics, historical assertions, clarification lists and evidence links remain available.
- Each canonical experience/project has one record. Each source analysis appears once. The source's duplicate notebooks, model variants, checkouts, archives and broad seed names are not separate imported projects. Snap Remedy's implementation is documented under employment with one backing analysis.
- Supporting analyses intentionally retain detail beyond canonical summaries: endpoint and schema inventories, code/function anchors, algorithm behavior, experiment tables, exact conditions, test inventories, deployment configuration, provenance and unresolved issues. They are labeled supporting material so repeated facts cannot be mistaken for independent corroboration.
- Generated resume variants, PDF/LaTeX duplicates, role-matching tables, employer postings and workflow timing reports were not copied. They contain no independent authority for expanding personal claims. The general-customer-service analysis includes older statements about Snap Remedy and certifications; the newer canonical records resolve those items.
- Project links absent from the canonical records were left absent. Public profile links are preserved; internal source paths in evidence are anchors into investigated code that was not supplied with this repository.
- Seventy-two Markdown links in two analyses originally targeted unavailable project files. Their targets are preserved as code path references so they do not appear to be working links in this collection. These reference-format changes are recorded in the catalog and do not alter implementation claims.

## Privacy transformations

Removed or generalized telephone/email, absolute local/course filesystem paths, private-network addresses, a database username, fixed demo credential values, and sensitive third-party circumstances from an Activate customer incident. Only the incident's professional actions, outcome and limitations remain. The catalog records categories/counts without retaining removed values. No raw project repositories, databases, customer/supplier records, photos, model weights, resumes or private configuration were imported.

The analyses already describe security/configuration defects without reproducing real secret values. Those factual qualifications remain relevant to avoiding unsupported security/deployment claims. A credential variable name or statement that a literal secret existed is not an imported secret value.

## Validation scope

Transfer validation checks file inventory, source-to-copy fidelity outside recorded privacy/provenance changes, JSON structure, local documentation links, privacy patterns, and content hashes. It verifies that every pre-existing portfolio file and every inventoried source file is unchanged and that new files exist only under this reference folder. Application builds, installs and frontend tests are unnecessary for added Markdown/JSON reference files and were not run. No existing content was connected to the new collection.

Historical test results in copied records are explicitly historical; they were not rerun or upgraded into new claims. All six generated PDFs were successfully reviewed through read-only native PDF text extraction; each contained one page and had a paired LaTeX source. No previews or output copies were written into either repository. Extraction supports source coverage; generated PDFs remain non-authoritative and were excluded to avoid duplicating selected content and personal contact information.
