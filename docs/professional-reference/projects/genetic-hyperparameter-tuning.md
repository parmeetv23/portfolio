---
project_id: genetic-hyperparameter-tuning
name: "Genetic-Algorithm Hyperparameter Tuning and Classification Experiments"
dates: "Jan. 2025 -- Apr. 2025"
categories: ["Machine learning", "Evolutionary optimization", "Experimental evaluation", "Data preparation"]
technologies: ["Python", "scikit-learn", "NumPy", "pandas", "Jupyter", "Matplotlib", "seaborn"]
evidence:
  - evidence/genetic-hyperparameter-tuning/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/projects/genetic-hyperparameter-tuning.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Overview

Local CPSC 544 research prototype implementing a custom genetic algorithm for classifier hyperparameters, with notebook comparisons against scikit-learn grid, randomized, and halving-grid searches. Related experiments cover decision trees, random forests, SVC, logistic regression, and MLP, plus Titanic/drug data preparation and exploratory classification.

This is research code and recorded experiment material, not a deployed inference service. Source, saved notebook output, and report claims are distinguished; current code does not reliably reproduce every retained result. Original implementation attribution follows the ownership instruction in the evidence.

# Core Contributions

- Configurable dictionary-based candidate generation, cross-validation fitness, tournament selection, uniform per-parameter crossover, single-parameter mutation, global-best elitism, generation history, and final estimator refit.
- Logistic-regression specialization maintains penalty/solver compatibility through initialization, crossover, mutation, and evaluation; incompatible candidates/caught failures receive negative-infinity fitness.
- Tuple-valued MLP hidden-layer selection/mutation and model-specific parameter spaces; successful MLP completion/results are not established.
- Repeated search/timing orchestration, selected-CV scores and support-weighted holdout metrics, generation curves, parameter/feature inspection, and a technical comparison report.
- Titanic missing-data/title/family/age/fare engineering, categorical transforms, and drug-data encoding/tree evaluation. Related notebooks are branches within this record, not separate projects.

# Architecture / Technical Design

CSV/sklearn data → in-memory preparation and holdout split → estimator/parameter space → custom GA or library baseline → CV fitness/evolution → best parameters and refitted model → caller holdout metrics/plots → separately maintained report.

The reusable genetic_algorithm.py exposes run(X, y), best_params_, best_score_, history_, and bestModel. Although it subclasses sklearn estimator classes, it does not implement a complete fit/predict/search-CV contract. Duplicate prototypes differ and must not be treated as identical reusable implementations.

The base optimizer evaluates candidates/generations serially, delegating fold fitting/scoring and optional n_jobs parallelism to sklearn. It seeds Python/NumPy global RNGs when configured. A generation retains one global-best elite; mutation changes at most one field, avoiding the current finite-domain value where possible. History stores best-so-far/current mean, not every candidate or fold. Final fitting uses the supplied estimator; instance state is not reset between run calls.

The logistic map pairs L1 with liblinear/saga and L2 with five allowed solvers. Penalty mutations also change solver; crossover chooses compatible parent choices. Conditional grid dictionaries also appear: solver dependency handling is not a limitation inherent to sklearn grid search.

# Technical Depth

Search-space dimensions span categorical options, ranges, numeric lists/callables, and hidden-layer tuples. Current benchmark uses five-fold CV; GA and baseline budgets/concurrency differ. Tree/forest GA configurations request 100×10 = **1,000 candidate evaluations** per run, versus **400** randomized candidates; SVC/logistic request 20×20 = **400**. These are configured counts, may repeat candidates, and are not completed unique-model totals.

Titanic preparation includes group-median age imputation, title normalization, family grouping, categorical encoding, and separate scaler/transform experiments. One cleaned notebook ends with a depth-three tree and saved **0.8202 training accuracy**, not holdout accuracy. Another branch has target-selection and nonnumeric-input failures. The supplied clean CSVs differ from final notebook transformations and have no visible exporter; their lineage is unresolved.

# Scale / Metrics

- Raw Titanic partition: **891 labeled + 418 unlabeled rows**. Drug data: **200 rows, five predictors, five classes**. Stored air-quality files contain 3,500/1,500 rows but no visible modeling path; those counts are not processed GA workload.
- Drug notebook records **1.0 train/test accuracy**, with **20 holdout examples** and supports 3/2/2/6/7. This is a small saved experiment, not general accuracy or clinical suitability.
- Report describes diabetes as **442 samples / ten features** with an 80/20 split. Selected comparisons below preserve report values, not reproduced controlled benchmarks. “Train” columns elsewhere in the report/benchmark may mean selected CV score.

| Model | Method | Reported test accuracy | Reported time (s) |
| --- | --- | ---: | ---: |
| Decision tree | GA | 0.7303 | 74.71 |
| Decision tree | Grid | 0.6854 | 1220.16 |
| Decision tree | Randomized | 0.6854 | 5.73 |
| Decision tree | Halving grid | 0.7416 | 2153.46 |
| SVC | GA | 0.7416 | 160.09 |
| SVC | Grid | 0.7416 | 940.42 |
| SVC | Randomized | 0.7416 | 155.49 |
| SVC | Halving grid | 0.6854 | 194.74 |
| Logistic L2 | GA | 0.7528 | 31.22 |
| Logistic L2 | Grid | 0.7528 | 46.91 |
| Logistic L2 | Randomized | 0.7528 | 14.21 |
| Logistic L2 | Halving grid | 0.7528 | 45.89 |

The report does not show universal GA superiority: randomized search is faster in these comparisons and tree halving has higher accuracy. Do not derive an algorithm speedup without equal budgets/concurrency and coherent run provenance. Full precision/recall/F1/CV tables remain in the evidence.

# Testing / Validation

No assertion-based software suite, CI, coverage, or reproducibility test was found. Investigation parsed four Python files (one empty), five notebook JSON files, and eight CSVs without importing/training code. Saved outputs document experimental evaluation and failures, not current passing tests.

Current benchmark loading selects breast cancer while older outputs/report identify diabetes; saved errors include interrupted grid search and 30-versus-ten feature mismatch. No clean sequential reproduction was performed. MLP has code without successful result artifacts.

# Reliability / Failure Handling

Reusable candidate generation rejects unsupported domains; mutation handles singleton domains; logistic specialization guards compatibility/catches evaluation errors. Seed options, best/history retention, warnings, and plots support inspection.

The base loop lacks robust population/tournament/probability validation and all-failed/NaN handling. Duplicate script code silently omits NumPy-array domains, unlike the reusable module. Timing code references an undefined attribute; some warning policies hide convergence warnings. No fitness cache, early-stop criterion, persisted checkpoints, resumability, or experiment manifest is implemented.

# Limitations / Attribution Boundaries

- Custom work is evolutionary policy, compatibility logic, preparation, orchestration, and reporting. sklearn supplies learners, CV, baseline searches, preprocessing, and metrics; numerical/plot libraries supply their primitives. No custom SVM solver, tree learner, forest algorithm, or backpropagation is implemented.
- Scaling is fitted before CV rather than inside each fold, creating leakage risk. Diabetes target thresholds differ across branches; seeds, budgets, concurrency, refits, and fixed-split repetitions limit timing/generalization comparisons. Statistical uncertainty is unrecorded.
- Mixed notebook state/duplicate code prevents treating saved summaries as a verified breast-cancer benchmark. Per-run hardware/configuration/seed records and plot-table correspondence are incomplete.
- Submission filenames do not establish competition submission; the saved submission uses training-range IDs. Stored/unused datasets and imports do not establish additional implementations.
- No deployment/users, business outcome, ACM publication, general optimization superiority, or clinically validated classifier is established. ACM report placeholders and build timestamps are not publication/development dates.

# Notes

Owner confirmation on 2026-10-09: development dates were **Jan. 2025 -- Apr. 2025**. These dates come from the owner, not investigation dates, file timestamps, or course identity.

The source investigation is dated 2026-10-08; that is not a project completion date. Retain this as one optimizer/experiment record rather than records for duplicate GA classes, each classifier, or the associated notebooks.

Evidence sections: Contributions; Architecture; Features; Database / Data Engineering; Testing / Quality; Performance / Scale; Uncertain / Not Verifiable. Original workspace paths and notebook cell indices are investigation anchors, not additional artifacts stored in this repository.
