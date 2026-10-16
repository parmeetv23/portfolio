# Project Name

> Transfer source: `Resume_Builder/evidence/genetic-hyperparameter-tuning/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

**CPSC 544 Project — Genetic-Algorithm Hyperparameter Tuning and Classification Experiments**

The descriptive subtitle summarizes the implementation; it is not a separately registered product name. The source directory is `CPSC544-Project/`, and the report title is **CPSC 544 Final Project Report** (`Project_Report/ProjectReport.tex`).

Investigation date: **8 October 2026**. This describes the supplied filesystem snapshot, not an inferred release or completion date.

## Overview

This workspace contains a Python machine-learning research prototype that searches classifier hyperparameters using a custom genetic algorithm (GA), compares that search with scikit-learn search methods, explores classification datasets, and records results in notebooks and a LaTeX report. The motivating problem, as described in the report, is the computational cost of hyperparameter search and the need to handle model-specific parameter dependencies. The code implements candidate initialization, cross-validation fitness evaluation, tournament selection, crossover, mutation, elitism, best-configuration tracking, and final model fitting.

The central reusable implementation is `CPSC544-Project/myModel/tryingStuff/genetic_algorithm.py`. Its clients and related prototypes cover decision trees, random forests, support vector classifiers, logistic regression, and a multilayer-perceptron classifier. Separate notebooks explore Titanic survival and drug classification. An additional air-quality training/test dataset pair is present without a visible processing workflow.

This is a local experiment and documentation workspace. No application server, web client, database service, hosted inference endpoint, model-serving deployment, or production job runner is present in the inspected project files. The evidence supports implemented research code and recorded experiments, not a production service or independently reproduced performance claims.

### Evidence conventions and investigation method

- **Verified implementation/artifact:** directly visible source, configuration, data, notebook output, or document content. A saved output verifies that the artifact contains that result; it does not establish that the current source reproduces it.
- **Technical interpretation:** a conclusion drawn from code structure or inconsistencies, explicitly identified as such. For example, preprocessing outside cross-validation creates a leakage risk; the size of any effect is not measured here.
- **Not established:** deployment, experiment provenance, results without matching run metadata, inaccessible file contents, or other facts unavailable from this snapshot.
- All paths below are relative to the supplied workspace root. Notebook cell numbers are **one-based physical positions in the JSON `cells` array**, counting both markdown and code cells, not Jupyter execution counters.
- Per the supplied ownership instruction, original project implementation is attributed to the repository owner. Authorship was not investigated through Git. Library algorithms, datasets, generated artifacts, course instructions, and document-template boilerplate are distinguished from custom work.
- Inspection covered the directory inventory, all Python source, all five notebook sources and their saved output structures, all eight CSV files, both PDFs, report source/build support files, and three report images. Python source was parsed with `ast.parse`; notebook JSON and CSV contents were read without executing experiments. CSV counts use `csv.DictReader`, excluding headers and correctly handling quoted commas.
- No dependencies were installed, notebooks executed, training launched, reports rebuilt, or project code imported. The only intentionally created/modified project file is this record. This avoids triggering notebook package installation, expensive searches, bytecode creation, or report build outputs.
- `.gitignore` is a 16-byte macOS **dataless** file in this snapshot; attempts to read it stalled. Several Git metadata files, including `HEAD`, are also dataless. Their unavailable contents are not inferred. Git history was not analyzed.

## Repository Scope

The supplied workspace is a parent folder, not itself the Git root. A `.git/` directory is present inside `CPSC544-Project/`; the proposal and report are siblings of that directory and are included because they were supplied with the project.

| Location | Contents and relationship |
|---|---|
| `CPSC544-Project/myModel/tryingStuff/genetic_algorithm.py` | Importable GA module; defines `GeneticAlgorithm` and logistic-regression specialization `logGA`; imported by the main benchmark notebook. |
| `CPSC544-Project/myModel/tryingStuff/model.py` | Standalone decision-tree tuning demonstration with its own duplicate GA implementation and top-level training code. |
| `CPSC544-Project/myModel/tryingStuff/models.py` | Larger experimental script with duplicate GA, `logGA`, `NNGABase`, and decision-tree/logistic/SVM/MLP experiments. |
| `CPSC544-Project/myModel/tryingStuff/GeneticAlgorithm.py` | Empty, zero-byte file; not an additional implementation. Case differs from the active underscored module. |
| `CPSC544-Project/myModel/tryingStuff/models.ipynb` | Four code cells: base optimizer, decision-tree example, generic logistic GA/grid comparison, and penalty-aware logistic GA/grid comparison. No saved cell outputs. |
| `CPSC544-Project/myModel/tryingStuff/testing.ipynb` | Main benchmark notebook, 62 cells; repeated searches, timing, metrics, generation plots, saved warnings and failures. Current data loader selects breast cancer, while some outputs and report describe diabetes. |
| `CPSC544-Project/titanicCleaned.ipynb` | Titanic cleaning, feature engineering, preprocessing/pipeline definitions, depth-limited decision-tree fit and visualization. |
| `CPSC544-Project/titanicTree.ipynb` | Titanic EDA, engineered columns, and an incomplete decision-tree workflow with saved errors. |
| `CPSC544-Project/drugTree.ipynb` | Drug-data EDA, categorical encoding, train/test split, decision-tree fit, metrics and visualization. |
| `CPSC544-Project/train.csv`, `test.csv` | Raw Titanic labeled/unlabeled data. |
| `CPSC544-Project/train_clean.csv`, `test_clean.csv` | Titanic-derived CSV artifacts; their schema differs from the final dataframe in `titanicCleaned.ipynb`. |
| `CPSC544-Project/submission.csv` | Two-column survival artifact for passenger IDs 1–891; producer and submission destination are not established. |
| `CPSC544-Project/Titanic/drug200.csv` | Drug classification data, despite being located in a directory named `Titanic`. |
| `CPSC544-Project/myModel/tryingStuff/train.csv`, `test.csv` | Air-quality data with generic predictors `A`–`I`; no references from inspected model code. These are not copies of the root Titanic CSVs. |
| `Project_Report/ProjectReport.tex`, `.pdf` | ACM-style research report source and a four-page compiled PDF. |
| `Project_Report/images/` | Three GA generation plots: `Decision Tree.png`, `SVM.png`, `logistic Regression.png`. |
| `Project_Report/ProjectReport.aux`, `.out`, `.log` | Generated LaTeX labels/bookmarks/build diagnostics; not handwritten application functionality. |
| `Project Proposal.pdf` | One-page assignment/proposal instructions, not a completed project-specific proposal. |
| `.DS_Store`, `__pycache__/`, `.git/` | Finder metadata, two Python bytecode caches, and Git metadata. Not custom features. |

No README, dependency manifest/lockfile, package metadata, dedicated test directory, CI workflow, Dockerfile, environment example, migration, API schema, or deployment script was found in the non-Git file inventory. No applicable `AGENTS.md` was found in the inspected workspace.

## Contributions

### Custom implementation and experimental work

Under the supplied sole-developer ownership premise, the following original project work is attributable to the owner:

1. **A configurable evolutionary optimizer for estimator hyperparameters.** Implemented dictionary-based candidates, population construction, fitness evaluation through scikit-learn, tournament selection, uniform per-parameter crossover, single-parameter mutation, global-best elitism, generation history, optional progress printing, and final estimator refitting. Evidence: `genetic_algorithm.py`, `GeneticAlgorithm`, especially `_initialize_individual`, `_evaluate_individual`, `_tournament_selection`, `_crossover`, `_mutate`, `run`.
2. **Constraint-aware logistic-regression search.** Implemented penalty-to-solver compatibility maps and specialized initialization/crossover/mutation, with invalid candidates and caught evaluation exceptions scored as negative infinity. Evidence: `genetic_algorithm.py:155`, `logGA`; `models.ipynb`, cell 4, `PenaltyAwareLogisticGA`; `models.py`, `logGA`.
3. **Neural-network parameter handling.** Implemented tuple-valued hidden-layer architecture selection and mutation through `NNGABase`, plus MLP GA/grid-search comparison code. Evidence: `models.py:507` and subsequent MLP workflow. Code exists, but no successful MLP result artifact is supplied.
4. **Model-specific search-space design.** Specified categorical, integer-range, logarithmically spaced and linearly spaced parameter options for decision trees, random forests, SVC, logistic regression and MLP. Evidence: `testing.ipynb`, cells 10, 24, 34, 49; `models.py`, `nn_param_space`; `models.ipynb`, cells 2–4.
5. **Benchmark orchestration.** Implemented repeated GA/random-search loops, wall-clock timing, mean cross-validation scores, weighted test metrics, model reconstruction from best parameters, and comparison with grid and halving-grid searches. Evidence: `testing.ipynb`, `get_analytics`, search cells; note the methodological limitations below.
6. **Experiment visualization and inspection.** Converted optimizer history to pandas dataframes; plotted best-so-far versus population-mean scores; inspected classifier feature importances and coefficients; saved classification outputs, confusion-matrix figures, and tree visualizations. Evidence: `testing.ipynb`, cells 12, 27, 37, 53; `model.py:216`; `models.ipynb`, cells 3–4; drug/Titanic notebooks; report PNGs.
7. **Dataset preparation and feature engineering.** Constructed holdout splits and standardization, converted diabetes regression targets to classification labels in prototypes, cleaned missing Titanic values, extracted passenger titles, engineered family/age/fare features, encoded categorical data, and prepared drug classification features. Evidence: dataset-specific sections below.
8. **Exploratory workflows and debugging artifacts.** Preserved experiments that expose incompatible parameter handling, interrupted searches, stale model feature dimensions, string-valued tree inputs, and notebook rerun problems. These demonstrate the problems encountered, not that every problem was resolved.
9. **Technical reporting.** Created the project report source with motivation, algorithm design, model-specific discussion, comparison tables, figures, limitations, and references. The report excludes neural-network results because of stated time constraints. Evidence: `ProjectReport.tex`, Materials and Methods, Results, Discussion and Conclusion.

### Boundaries of attribution

The GA search policy and the glue code are custom. `DecisionTreeClassifier`, `RandomForestClassifier`, `SVC`, `LogisticRegression`, `MLPClassifier`, their training algorithms, cross-validation, search baselines, preprocessing transformers, metrics, and plot renderers are library functionality configured/called by the project. The repository does not implement a decision-tree learner, SVM solver, neural-network backpropagation, random forest algorithm, or scikit-learn grid/random/halving search from scratch.

Datasets are inputs, not evidence of original data collection. No vendored library source is present outside Git metadata. Compiled `.pyc`, notebook-rendered HTML/images, LaTeX auxiliary files, PDF template boilerplate, and Finder files are generated artifacts. `Project Proposal.pdf` is instructional material. The report includes multiple author entries; that document metadata is not used to override the user's sole-developer instruction or infer contribution shares.

## Architecture

### Execution model and data flow

The system consists of local Python scripts and interactive notebooks with in-memory objects:

```text
Local CSVs / sklearn dataset loaders
    -> pandas / NumPy data inspection and preparation
    -> holdout split and feature transformation
    -> estimator + model-specific parameter space
    -> custom GA or sklearn search baseline
         -> candidate parameter assignment
         -> sklearn cross-validation fit/score
         -> selection / crossover / mutation / elite retention
    -> best parameters and refitted classifier
    -> holdout predictions and metrics
    -> notebook text/tables/plots
    -> separately maintained LaTeX report and PNG figures
```

This summarizes related workflows, not a single automated end-to-end pipeline. No code was found that exports the main notebook's results into the report tables or report PNG paths. No visible code writes the provided `*_clean.csv` or `submission.csv` files.

`testing.ipynb` imports the lowercase `genetic_algorithm` module from its sibling directory. `model.py`, `models.py`, and `models.ipynb` repeat rather than import the base optimizer, allowing implementations/defaults to diverge. The standalone scripts run training at module top level; there is no `if __name__ == '__main__'` guard. The reusable `genetic_algorithm.py` contains imports and class definitions, not a top-level experiment.

### Optimizer state and extension points

`GeneticAlgorithm` subclasses `BaseEstimator` and `MetaEstimatorMixin`, but exposes its own `run(X, y)` method, not a custom `fit`, `predict`, or `score` interface. Consumers access `bestModel` directly. This is partial use of scikit-learn's estimator conventions, not evidence that the wrapper satisfies every estimator or search-CV contract.

The reusable constructor accepts `modelToTune`, `param_space`, `population_size`, `generations`, `crossover_prob`, `mutation_prob`, `tournament_size`, `cv`, `scoring`, `n_jobs`, `verbose`, and `random_state`. Defaults are population **100**, generations **1,000**, crossover **0.8**, mutation **0.2**, tournament **15**, CV **5**, scoring **accuracy**, `n_jobs=None`, `verbose=0`, and `random_state=None` (`genetic_algorithm.py:12`).

State includes `best_params_` (initially an empty list, subsequently a dictionary), `best_score_` (initially `None`), `history_` (list), and `bestModel` assigned after search. Each history entry contains zero-based `generation`, global `best_score`, current population `avg_score`, and best-parameter dictionary. Subclasses override initialization, crossover, mutation, and fitness evaluation. There is no configuration file or plugin registry.

### Concurrency and infrastructure boundaries

Candidates and generations are evaluated serially in the custom loop. The base evaluator passes `n_jobs` to `cross_val_score`; worker management belongs to scikit-learn. `logGA` overrides evaluation without forwarding `n_jobs`. Benchmarks generally configure `n_jobs=-1` for baseline search objects but omit it for the GA. Thus the code does not establish equal parallel execution settings across methods. No asynchronous service, distributed worker pool, task queue, network protocol, or GPU configuration is implemented.

## Technologies

| Category | Demonstrated use | Qualification |
|---|---|---|
| Languages/formats | Python 3, Jupyter notebook JSON, CSV, LaTeX | Python algorithms/experiments; notebook saved state; tabular input/artifacts; research report. |
| Numerical/data libraries | NumPy, pandas | Random seeding, means/argmax/median, candidate ranges, arrays, CSV reading, transformations, tabulation. |
| Machine learning | scikit-learn | Classifiers, dataset loaders, train/test splitting, CV, grid/random/halving search, encoding/scaling/discretization, metrics and tree plotting. |
| Visualization | Matplotlib, seaborn | Generation curves, decision trees, pairplots, distribution plots, categorical/violin/count plots and notebook displays. |
| Python standard library | `random`, `time`, `warnings` | GA sampling, wall-clock timing, warning filtering. Dictionary `.copy()` is used; the report's mention of the standard-library `copy` module is not supported by an import/use in the inspected source. |
| Document tooling | `acmart` in `sigconf` mode, `url`, pdfLaTeX/TeX Live | `ProjectReport.tex`; saved log identifies pdfTeX 1.40.25, TeX Live 2023, `acmart` 1.88. These are historical build evidence, not current environment requirements. |
| Repository tooling | Git metadata | Nested `.git/` exists; branch, commit and remote details are not relied upon. |

Notebook metadata records Python **3.11.3** for the Titanic/drug notebooks and **3.12.9** for `testing.ipynb`. `models.ipynb` specifies Python without a version. Bytecode filenames include `cpython-310` and `cpython-312`; saved warnings also contain a Python 3.9 library path. These are heterogeneous environment traces, not a pinned compatibility matrix. `drugTree.ipynb` cell 1 records seaborn **0.13.2** already installed in that historical execution.

`XGBClassifier` is imported in `titanicCleaned.ipynb` but never instantiated or trained. Other broad imports, including several unused classifiers/feature selectors, do not establish additional implemented model workflows. `load_iris` is imported in the benchmark notebook but never called. Bayesian optimization, WEKA, KNN-related papers, Zotero/Mendeley and Overleaf are mentioned/imported in various contexts; no active implementations/integrations are established for them.

## Features

### General genetic search

1. `_initialize_individual` samples each parameter from a list, tuple, or range using `random.choice`, or invokes a callable to produce a value. In the reusable module, unsupported types raise `ValueError('Invalid parameter range for ...')`. Empty ranges/lists and invalid callable return values receive no custom validation.
2. `_initialize_population` constructs the configured number of candidate dictionaries, with no uniqueness requirement.
3. `_evaluate_individual` calls `modelToTune.set_params(**individual)`, then `cross_val_score(..., cv=self.cv, scoring=self.scoring, n_jobs=self.n_jobs)` and returns the NumPy mean. Estimator fitting/scoring/CV splitting are delegated to scikit-learn. The supplied estimator is mutated by parameter assignment; there is no explicit project-level estimator cloning.
4. `_tournament_selection` samples distinct population indices without replacement, ranks their fitness using `np.argmax`, and returns the winning candidate. Parents may be selected more than once across tournaments; the two parent tournaments are independent.
5. `_crossover` chooses each parameter value from either parent with probability 0.5. The `crossover_prob` gate controls whether crossover occurs at all. Otherwise one parent's dictionary is carried forward by reference, not explicitly copied.
6. `_mutate` makes a shallow dictionary copy, selects one parameter, and samples a different available value where possible. A one-option domain remains unchanged; callable domains are invoked again and may return the same value. The base implementation changes at most one parameter per mutation event, unlike the report's more general wording “one or more.”
7. `run` evaluates every candidate each generation, updates the global best only on a strict improvement, appends history, optionally prints best/average scores to four decimals, and seeds the new population with the global best before breeding remaining candidates.
8. After the loop, `bestModel` receives the supplied estimator with best parameters and is fitted on all provided search-training data. `run` returns `self`. Holdout evaluation is implemented by callers, not inside `run`.

The optimizer preserves the **best across all completed generations**, not merely the best of the most recent population. It does not deduplicate candidates, cache fitness, stop early, persist checkpoints, resume interrupted runs, return a full sklearn-style `cv_results_`, or record timing internally.

### Logistic parameter dependencies

The specialized domain maps L1 to `liblinear`/`saga` and L2 to `lbfgs`/`newton-cg`/`sag`/`saga`/`liblinear`. Initialization chooses a penalty first and then an allowed solver. Crossover chooses a penalty from a parent and a compatible parent solver, with an additional **0.2** probability of switching to another allowed solver. Other fields inherit independently.

Mutation of `penalty` also reselects `solver`; mutation of `solver` keeps the penalty and selects a compatible alternative. Other fields use ordinary alternative-value mutation. Evaluation rejects an incompatible pair with `-np.inf`, creates a new `LogisticRegression` with the candidate parameters and optimizer seed, and returns mean CV accuracy or `-np.inf` on a caught exception. This is explicit constraint handling for the supplied map, not a general constraint solver.

`models.ipynb` cell 4 also builds a **list of two grid dictionaries**, one per penalty, so the library grid search can use both penalties without generating incompatible pairs. This directly limits the validity of `testing.ipynb`'s markdown claim that L1 is incompatible with grid search: the restriction is in that benchmark's chosen parameter grid, not established as a general library limitation. The benchmark's actual GA uses the generic class with the L2-only space, even though `logGA` is imported.

### Model search spaces

These are configured search dimensions, not proof that every combination was evaluated or valid in every library version.

| Model/workflow | Parameter domain |
|---|---|
| Decision tree, `model.py` / `models.ipynb` cell 2 | `criterion`: gini/entropy; `max_depth`: 1–19; `min_samples_split`: 2–19; `min_samples_leaf`: 1–19; `max_features`: `None`, sqrt, log2, 0.5, 0.7. |
| Decision tree, `testing.ipynb` cell 10 | Above five fields plus `max_leaf_nodes`: `None`,10,20,30,40,50; `splitter`: best/random; `class_weight`: `None`/balanced. |
| Random forest, `testing.ipynb` cell 24 | Criterion, depth, split/leaf minimums, feature limit, leaf-node limit and class weight as above; `n_estimators`: 50,100,150; no `splitter` field. |
| SVC, `testing.ipynb` cell 34 | `C`: 15 log-spaced values from 10^-5 to 10^3; kernels linear/rbf/poly/sigmoid; gamma scale/auto; degree 2–9; `coef0`: 0,0.25,0.5,0.75,1; shrinking true/false; tolerance: 5 log-spaced values from 10^-5 to 10^-1. Lists are used for NumPy-generated values. |
| Logistic, main L2 benchmark | `C`: 20 log-spaced values from 10^-4 to 10^4; penalty L2; 5 mapped L2 solvers; `max_iter`: 100–2000 in steps of 100; `tol`: 10^-4,10^-5,10^-6; class weight `None`/balanced; intercept true/false. |
| Logistic, specialized version | Same scalar domains with both L1/L2 and their dependent solver map. |
| Logistic, `models.ipynb` cell 3 | Earlier comparison: `C` 20 values from 10^-3 to 10^3; penalties L1/L2; solvers liblinear/saga; iterations 1000–10000 in steps of 1000; tolerance 10^-4/10^-5; class weight `None`/balanced; no intercept search field. |
| MLP, `models.py` | Hidden layers `(50,)`, `(100,)`, `(50,50)`, `(100,50)`, `(50,30,10)`; activation relu/tanh/logistic; solver adam/sgd; alpha 20 log-spaced values from 10^-6 to 10^-1; learning rate constant/adaptive; initial learning rate 10 log-spaced values from 10^-4 to 10^-1; max iterations 200/500/1000; batch size 32/64/128; estimator early stopping true/false. |

The MLP's `early_stopping` is a scikit-learn model-training option. It is not a GA convergence/stagnation termination mechanism. `NNGABase` reads hidden-layer options from a nested `values` array; the accompanying `type: 'tuple'` metadata is not consulted by its logic. A flattened grid is constructed for the MLP baseline.

### Prototype configuration differences

| File / notebook cell | GA configuration and status |
|---|---|
| `model.py`, `models.ipynb` cell 2 | Decision tree: population 50, generations 10, crossover 0.85, mutation 0.4, tournament 10, CV 10, seed 42. Code prints best parameters, CV score, holdout accuracy and feature importances. |
| `models.py`, decision-tree block | Population 1, generation 1, CV 10; despite tournament 10, no tournament is reached because the elite alone fills the next population. This configuration samples/evaluates one candidate rather than conducting multi-candidate evolution. |
| `models.py`, logistic block | Specialized `logGA`, population 1, generation 1, CV 5, seed 42, `n_jobs=-1` supplied but not forwarded by its evaluation override. |
| `models.py`, SVC block | Population 100, generations 30, crossover 0.8, mutation 0.4, CV 5, seed 42. NumPy array domains are unsupported by this duplicate base initializer and are silently omitted rather than validated; see failure analysis. |
| `models.py`, MLP block | `NNGABase`, population 30, generations 20, CV 5, `n_jobs=-1`, seed 42, then MLP grid search. No saved execution results. |
| `models.ipynb` cell 3 | Generic logistic GA: population 100, generations 50, CV 5, seed 42; compares to a parallel grid search and prints coefficients. |
| `models.ipynb` cell 4 | Penalty-aware logistic GA: population 50, generations 30, CV 5, seed 42; conditional grid search uses `return_train_score=True`, prints combination count and best index. Final GA timing reference is undefined. |

`models.py`'s duplicate base defaults to tournament size **5**, whereas the reusable module, `model.py`, and the notebook base use **15**. Its initializer omits the reusable module's unsupported-domain `ValueError` branch. These are real implementation differences, not aliases for one identical class.

## Backend / APIs

There are **no HTTP API routes or backend services** in the supplied implementation. The programmatic surface is the Python optimizer constructor, `run(X, y)`, internal override methods, and public result attributes. Notebook helper functions include `get_analytics`, `prepare_data`, `family_size`, and `create_pipeline`.

No authentication, authorization, RBAC, background scheduler, webhook, pagination, remote data synchronization, or hosted inference business logic is present. Model fitting is local computation invoked by scripts/cells, not a background service.

## Frontend

The user-facing interaction is Jupyter cells, pandas displays, printed metrics, plots, and the report PDF. There are no application pages, routes, forms, client-side state stores, or reusable web UI components.

`titanicCleaned.ipynb` calls `set_config(display='diagram')` to request scikit-learn's estimator diagram display; that rendering is library-provided. Notebook JSON includes generated visual/HTML outputs, not a custom frontend framework. The experiment workflow is to configure data/parameters in code, run cells, inspect scores/plots, and compare results manually.

## Database / Data Engineering

### Storage and dataset inventory

No relational/document database, ORM model, migration, index, transaction or server-side persistence layer is present. Data is CSV plus scikit-learn dataset loaders; transformations operate on pandas/NumPy objects. The following counts were directly computed from the supplied CSVs:

| CSV path (under `CPSC544-Project/`) | Rows | Columns | Schema / role |
|---|---:|---:|---|
| `train.csv` | 891 | 12 | PassengerId, Survived, Pclass, Name, Sex, Age, SibSp, Parch, Ticket, Fare, Cabin, Embarked. Labeled Titanic data. |
| `test.csv` | 418 | 11 | Same raw fields except Survived. Passenger IDs 892–1309. |
| `train_clean.csv` | 891 | 14 | Age, Cabin, Embarked, Fare, Name, Parch, PassengerId, Pclass, Sex, SibSp, Survived, Ticket, Title, Family_Size. |
| `test_clean.csv` | 418 | 14 | Same clean schema; Survived is blank for every row. |
| `submission.csv` | 891 | 2 | PassengerId, Survived; IDs 1–891. |
| `Titanic/drug200.csv` | 200 | 6 | Age, Sex, BP, Cholesterol, Na_to_K, Drug; five predictors and target. |
| `myModel/tryingStuff/train.csv` | 3,500 | 11 | Id, A, B, C, D, E, F, G, H, I, Air Quality. |
| `myModel/tryingStuff/test.csv` | 1,500 | 10 | Id and A–I, no Air Quality label. |

These eight files represent related artifacts and multiple data families, not eight independent datasets or a count of unique people/records processed by one program. The source demonstrates five data families in different roles: Titanic, drug classification, air quality, loader-provided diabetes and loader-provided breast cancer. Air quality is stored but not visibly used; Iris is imported only and is not counted as an exercised dataset.

### Data integrity observations

| Data | Direct observations |
|---|---|
| Raw Titanic train | 177 missing Age, 687 missing Cabin, 2 missing Embarked; labels 549 zero / 342 one. IDs 1–891 are unique. |
| Raw Titanic test | 86 missing Age, 327 missing Cabin, 1 missing Fare; 418 unique IDs 892–1309. |
| Clean Titanic train | Only Cabin remains blank (687 rows); labels are stored as `0.0`/`1.0`, same counts as raw train. |
| Clean Titanic test | Cabin blank in 327 rows; all 418 Survived entries blank; other fields populated. |
| Clean family fields | Every `Family_Size` equals `SibSp + Parch`, excluding the passenger. This is directly checked against all clean rows. |
| Clean title fields | Train: Mr 525, Mrs 128, Miss 185, Master 40, Rev 6, Dr 7. Test: Mr 242, Mrs 73, Miss 79, Master 21, Rev 2, Dr 1. |
| Submission artifact | 599 zero / 292 one labels; 891 unique IDs matching the training ID range, not the 418-row test ID range. No producer or external submission evidence found. |
| Drug data | No blank fields; class counts drugY 91, drugX 54, drugA 23, drugB 16, drugC 16. Sex has 2 categories, BP 3, Cholesterol 2, target 5, as also shown in notebook output. |
| Air-quality train/test | No blank fields. Train labels: 0 → 352, 1 → 718, 2 → 1,048, 3 → 1,382. Column meanings/units for A–I are unavailable. |

No exact duplicate rows were found **within any individual CSV** by comparing complete parsed row tuples. This is an investigator's snapshot measurement, not an implemented deduplication feature. Missingness counts above mean empty CSV fields, not an exhaustive semantic validation of values.

### Titanic cleaning and feature engineering

`titanicCleaned.ipynb` cells 2–22 implement:

- Relative loading of root `train.csv` and `test.csv`, head/sample/info/missing-count inspection, and Cabin removal from both frames.
- Filling training Embarked with `S` and test Fare with the test-frame mean; concatenating train and test with sorted columns and reset index, creating a 1,309-row combined frame.
- Inspecting numeric Age correlations and median Age by Sex/Pclass. Saved group medians are female classes 1/2/3: 36/28/22; male classes 1/2/3: 42/29.5/25.
- Filling Age with the Sex/Pclass group median, extracting Title from Name, grouping Lady/the Countess/Capt/Col/Don/Dr/Major/Rev/Sir/Jonkheer/Dona into Rare, mapping Mlle/Ms to Miss and Mme to Mrs.
- Computing `Family_size = SibSp + Parch + 1`, then replacing numeric sizes with Alone for 1, Small for 2–4, and Large otherwise. Name/Parch/SibSp/Ticket are dropped.
- Casting Age to `int64`, discarding fractional values; displaying survival means grouped by Embarked/Pclass/Sex/Title/Family_size.
- Splitting the combined dataframe back at fixed indices 890/891; removing Survived from the test frame; casting training Survived to integer and removing training PassengerId. Seven model input fields remain: Age, Embarked, Fare, Pclass, Sex, Title, Family_size.

Cells 33–39 define a `ColumnTransformer` with MinMax scaling for positional columns 0/2, one-hot encoding for 1/3 and 5/6, ordinal encoding for 4, followed by a separate 15-quantile-bin ordinal `KBinsDiscretizer` on positions 0/2, and a `create_pipeline(algo)` factory. Three candidate objects are created: RandomForestClassifier, DecisionTreeClassifier, ExtraTreeClassifier. No supplied cell calls the factory or fits these pipelines. Because the second transform's positions refer to the **transformed** output, interpreting its column 2 as the original Fare would be incorrect; its correctness is not validated by an execution here.

The actual demonstrated final model is separate: an unseeded 80/20 holdout split, `pd.get_dummies` on Embarked/Sex/Title/Family_size with `drop_first=True` for `X_train`, and a `DecisionTreeClassifier(random_state=42, max_depth=3)`. It plots the tree and saves **training accuracy 0.8202**. No final holdout scoring or corresponding encoding of `X_test` is present. The notebook's cell 41 has leading indentation, another reason not to assume clean sequential script execution from the saved source.

The `*_clean.csv` artifacts retain Cabin/Name/Ticket and numeric Family_Size, unlike this notebook's final frame. They also preserve different title categories. Therefore their exact generating transformation cannot be attributed to the current cleaning notebook. No `to_csv` call was found in supplied source/notebook cells.

A row-aligned comparison by PassengerId verifies that all 177/86 originally blank train/test Ages, both blank training Embarked entries, and the one blank test Fare are populated in the corresponding clean artifacts. The clean train/test Ages still include **42/30 fractional values**, respectively, unlike the notebook's integer-cast final Age column. Textual differences such as `22` versus `22.0` are not counted here as substantive numeric changes or evidence of a particular imputation formula.

### Alternative Titanic EDA / incomplete classification

`titanicTree.ipynb` produces survival pie/count plots, Sex and Pclass survival comparisons, styled cross-tabulations, a Sex/Pclass categorical plot, Age violin plots and survivor/non-survivor histograms, and fare distributions by class. It prints age/fare statistics; saved raw-age minimum/maximum/mean are 0.42/80/29.69911764705882 and fare minimum/maximum/mean are 0/512.3292/32.204207968574636. These are dataset descriptive statistics, not application performance metrics.

Its engineering differs from the other Titanic notebook:

- Regex extraction of `Initial` from names, repeated unnecessarily inside a loop over dataframe columns; normalization to Mr/Mrs/Miss/Master/Other.
- Missing Age filled with hard-coded title-based values: Mr 33, Mrs 36, Master 5, Miss 22, Other 46; missing Embarked filled with S.
- Age bands 0–4 with boundaries 16,32,48,64; `Family_Size = Parch + SibSp` excludes self; `Alone=1` when that sum is zero.
- Fare quartiles via `pd.qcut(..., 4)`, plus Fare_cat thresholds 7.91,14.454,31,513.
- Integer mapping of Sex, Embarked and Initial, and two repeated LabelEncoder blocks for Name.
- Stratified 70/30 split with random state 0, then positional selection of the first column as target and all remaining columns as features.

The raw schema's first column is PassengerId, so that positional target selection does not implement the apparent Survived target correctly in a clean sequential execution. Survived would also remain in the feature slice. Non-numeric Ticket/Cabin/Fare_Range columns are not fully removed or encoded. Saved errors include a repeated Name drop `KeyError` (cell 34) and string-to-float conversion failure on a ticket value during fitting (cell 38). This is an incomplete attempted classifier workflow, not a verified Titanic accuracy result. Its hard-coded Windows dataset paths do not match the current workspace layout.

### Drug classification

`drugTree.ipynb` loads `drug200.csv` using a hard-coded Windows path, plots a seaborn pairplot colored by Drug, and inspects types/object-category summaries. One `LabelEncoder` is repeatedly fitted to each object-typed column, including the target; earlier per-column encoder mappings are not retained in a mapping collection. It then separates the five predictors from Drug, uses a 90/10 split with seed 42, and fits a default decision tree.

Saved results are train score **1.0**, test score **1.0**, and accuracy **1.0**. The classification report contains five encoded target classes with holdout supports **3,2,2,6,7**, totaling **20**. The remaining **180** training rows follow from the 200 rows and split. These are stored experimental results, not evidence of clinical suitability or general accuracy. A filled tree is rendered at 10×8 inches and 200 DPI. The plotting call passes `drugs.columns`, including the target column, rather than only the feature list.

### Loader data and target definitions

`model.py`, `models.py`, and `models.ipynb` call `load_diabetes`. The report states **442 samples and 10 numerical features**. This dataset size is report-supported, not independently counted from bundled diabetes raw files (none are present). Tree/MLP prototype blocks binarize the full target at its median before a seeded 70/30 split. Logistic prototypes instead split the continuous target and separately threshold training and test targets at their respective medians. Those are different label definitions; their effects are not measured here.

`testing.ipynb` currently calls `load_breast_cancer`, despite a “Load Diabetes Data” comment. `prepare_data` does an 80/20 split with seed 42, preserves original labels (median-conversion code is commented), fits `StandardScaler` on training features and transforms test features. No stratification is configured in that helper. A saved error explicitly contrasts **30 current input features** with an older **10-feature** decision tree. Several saved reports have test support **89**, unlike the apparent current breast-cancer state. The artifact therefore cannot be treated as one coherent clean run.

## External Integrations

The substantive integrations are **local library interfaces**: pandas CSV loading, scikit-learn datasets/estimators/search/metrics, and Matplotlib/seaborn visualization. The GA passes estimator parameters and arrays through these interfaces; it does not contact a custom API.

`drugTree.ipynb` includes `!pip install seaborn` with saved already-installed output. That is a notebook setup command, not a dependency lock or operational package-management integration. The report uses an installed LaTeX class and packages. No external API credentials, cloud SDK configuration, remote dataset fetcher, OAuth flow, webhook, Kaggle client call, or database connector is demonstrated. A file named `submission.csv` alone does not establish a competition/API submission.

## Reliability / Failure Handling

### Implemented mechanisms

- Unsupported parameter-domain types raise a descriptive `ValueError` in the reusable GA and two other base copies.
- Mutation avoids resampling the current value for supported finite domains and leaves singleton domains unchanged.
- Logistic initialization/crossover/mutation maintains the supplied solver-penalty map; fitness checks compatibility again and scores caught failures as negative infinity.
- Explicit train/test preprocessing uses a scaler fitted on the training portion in GA experiments.
- Optional seeds initialize both Python `random` and NumPy global RNGs; some estimators/splits also receive seed 42.
- The global best is carried forward, and in-memory history plus verbose prints support inspection of progress.
- Notebook artifacts retain convergence warnings, exceptions, output metrics and diagnostic plots.

### Limitations and observed failures

| Evidence | Verified behavior / technical implication |
|---|---|
| `genetic_algorithm.py`, `_tournament_selection` | No check that tournament size is positive or ≤ population size. `random.sample` can fail for an oversized tournament when breeding is reached. This is a static failure possibility, not a recorded failure of the provided population-1 examples. |
| Base `run` | No validation for zero/negative generations/population or invalid probabilities, no explicit NaN/inf fitness normalization, and no dedicated all-candidates-failed recovery. Base evaluation exceptions are not caught by project code. |
| Base `run` initialization | Best parameters, best score and history are initialized in `__init__`, not reset in `run`. Reusing one optimizer instance carries state into later runs; benchmark loops generally construct a new instance. |
| Base final fit | Uses the original estimator object, so caller-visible estimator parameters/state change. Final-fit failure is not wrapped in retry/recovery logic. |
| `logGA._evaluate_individual` | Bare `except` returns `-np.inf` without logging the exception. Failures can become opaque; NaN scores returned without an exception are not converted to a valid worst score. |
| Logistic crossover/mutation | Some alternative-choice branches assume there is another solver/penalty. Supplied maps have alternatives, but arbitrary singleton maps are not robustly handled in all branches. |
| `models.py`, base initializer and SVC space | NumPy arrays for C/coef0/tol are silently omitted by the unsupported-type fallthrough. Mutation also skips these unsupported domains, producing no change when one is selected. Those fields therefore remain outside the candidate dictionaries and retain the supplied estimator's settings, rather than being tuned over their declared arrays. The main benchmark converts these arrays to lists. |
| `models.py`, final timing; `models.ipynb` cell 4 | Reads `total_time_elapsed_`, which none of the GA implementations define. Reaching that statement would raise `AttributeError`. MLP grid `refit_time_` is only the library refit duration, not the complete search duration, so the printed comparison is also conceptually mismatched. |
| `testing.ipynb` cells 14–15 | Saved `KeyboardInterrupt` during grid fitting followed by a saved 30-versus-10-feature `ValueError` when predicting. |
| `titanicTree.ipynb` cells 34,38 | Saved Name-drop `KeyError` and string-valued input `ValueError`; no successful final decision-tree score. |
| Warning policies | Titanic notebooks ignore warnings broadly; logistic/MLP prototypes suppress convergence warnings. Main benchmark still retains repeated convergence-warning output. Warnings are not equivalent to automatic correction. |
| Data paths | Two notebooks use absolute Windows paths; relative CSV paths elsewhere depend on the working directory. No path/configuration abstraction or missing-file recovery is supplied. |

No retries, exponential backoff, checkpointing, resumability, persisted job states, stale-job detection, transactions, structured logs, alerting, or failure dashboards are implemented. The report suggests GA early stopping as future work; it is not implemented in the base loop. After the final evaluated generation, the code still breeds a new population that is never evaluated.

## Security

No user authentication, authorization, RBAC, permission enforcement, session mechanism, secrets loader, encryption setup, or network security policy is implemented in this local research code. The explicit GA domain/compatibility checks are correctness checks, not an access-control system.

The report contains author contact details, and notebooks preserve machine-specific filesystem paths in source/output. These are artifact contents; no conclusions about credential exposure, privacy compliance, or clinical data provenance are established. No environment/secrets example or service credential reference was found in the readable project source. `.gitignore` contents remain unavailable, so its exclusion rules cannot be evaluated.

## Testing / Quality

### Experimental evaluation versus automated software tests

`testing.ipynb` is a benchmark notebook, not an assertion-based automated test suite. No pytest/unittest suite, `test_` function, source assertion, test runner configuration, lint/static-analysis configuration or CI workflow was found in the inspected files. The defensible automated-test count is **0 discovered assertion-based tests**, not “all tests pass.”

The notebooks do exercise preprocessing, training and metrics through library calls and preserve some successful outputs. They do not include property checks for GA invariants, regression assertions, candidate-validation tests, or reproducibility tests. `models.ipynb` has no saved outputs; its implementation can be inspected, but successful execution is not demonstrated by that file.

This investigation parsed all four `.py` files (including the empty file) successfully using Python's AST parser, decoded all five notebook JSON documents, read eight CSV schemas/rows, inspected stored errors and evaluated static call/data relationships. These checks did not execute model training or establish end-to-end runtime correctness.

### Main benchmark configuration

`get_analytics` returns accuracy and **support-weighted** precision, recall and F1 using scikit-learn. Confusion-matrix/classification-report plotting code is commented out after its return in the current function, although older saved outputs still contain those reports/figures. The labels “Average score (train)” refer to mean selected **cross-validation scores**, not direct training-set prediction accuracy.

| Model | GA loop count | GA population × generations | Mutation / crossover / tournament | Random-search loop count / candidates per run | Baselines |
|---|---:|---|---|---|---|
| Decision tree | 10 | 100 × 10 | 0.2 / 0.75 / 20 | 10 / 400 | Grid, randomized, halving grid |
| Random forest | 5 | 100 × 10 | 0.2 / 0.8 / 20 | 25 / 400 | Grid code without saved output; randomized |
| SVC | 50 | 20 × 20 | 0.75 / 0.5 / default 15 | 50 / 400 | Grid, randomized, halving grid |
| Logistic, L2 | 50 | 20 × 20 | 0.75 / 0.5 / default 15 | 50 / 400 | Grid, randomized, halving grid |

All rows use CV 5 and accuracy scoring in current benchmark source. Loop counts are configured repetitions, not a claim that this investigation executed them or that every saved output was produced by exactly the current source. Grid and halving baseline cells are single searches rather than corresponding repeated-run loops. No random-forest halving cell is present.

### Methodological qualifications

1. **Mixed notebook state:** Current breast-cancer loading coexists with diabetes-sized reports, stale estimator dimensions, old printed `get_analytics` behavior and interrupted grid execution. Execution order/provenance is not recorded sufficiently to reconstruct one consistent benchmark from saved outputs.
2. **Preprocessing before CV:** `StandardScaler` is fitted on the entire search-training split before CV; it is not fitted separately inside each CV fold through a Pipeline. Technical interpretation: validation-fold feature statistics can influence scaled data and the reported CV estimate. The held-out test scaler still uses training-fitted statistics.
3. **Target-threshold differences:** Some diabetes blocks use whole-data median labels; others use separate train/test medians. These cannot be conflated as identical classification tasks. No stored analysis quantifies the impact.
4. **Unequal search budgets:** Report prose says randomized iterations equal population × generations. Current SVC/logistic configurations satisfy 400 = 20×20; current tree/forest configurations do not, using 400 versus 1,000 candidate evaluations. Evaluation count also does not imply equal unique configurations because GA candidates may repeat.
5. **Unequal concurrency:** Baselines use `n_jobs=-1`; benchmark GA uses its default `None`. Timing therefore compares configured workflows, not a controlled algorithm-only efficiency difference.
6. **Randomness:** Fixed split seed 42 is used in the main benchmark, but optimizer/classifier seeds are generally omitted there. Runs repeat stochastic searches over the same holdout rather than repeated randomized data splits. Mean metrics lack saved standard deviations/confidence intervals and per-run structured records.
7. **Fresh estimator evaluation:** GA cells often reconstruct and fit a new estimator from `best_params_` instead of evaluating `bestModel`; for unseeded stochastic estimators that may produce another fitted model.
8. **Incorrect diagnostic metric input:** `testing.ipynb` cell 19 computes `y_pred3` but passes `y_pred` to `get_analytics`, then repeats this without refitting. Its printed randomized-search averages do not measure ten new searches. Cell 18 contains the actual repeated randomized searches.
9. **No proven generic parameter compatibility:** SVC degree/coef0/gamma values are varied across kernels without conditional filtering, and MLP options are not constrained by solver. Some dimensions can be irrelevant for selected configurations. Declared grid size is not a count of semantically distinct models.
10. **Small holdout and limited evidence:** Drug perfect accuracy is over 20 saved test examples; Titanic cleaning ends at training accuracy; the report's comparative claims are limited to its documented experiment. No broader generalization, statistically significant superiority, or production improvement is established.

## Deployment / Infrastructure

There is no demonstrated service deployment, Docker image, container orchestration, reverse proxy, infrastructure-as-code, hosting manifest, CI/CD pipeline, build script, or published Python package. The files support local interactive/script execution with manually supplied dependencies.

`ProjectReport.log` records a pdfLaTeX build on **6 April 2025** and an output of **4 pages, 560,941 bytes**, matching the inspected report PDF size. This is a document-build record, not a project-development timeline or deployment event. It records overfull/underfull layout boxes, image-description warnings, missing ACM keyword/CCS metadata warnings, a `vspace` warning and a balance warning. `.aux` stores labels/table-of-contents information and `.out` stores PDF bookmarks.

The report claims a standard CPU machine without GPU acceleration; exact hardware, operating system, core count, RAM and timing environment are not documented sufficiently for benchmark reproduction. Windows and macOS paths in artifacts show different historical environments but do not establish a deployment topology.

## Performance / Scale

### Reported diabetes comparison

The following values are transcribed from `Project_Report/ProjectReport.tex` Results tables, also present in the PDF. They are **reported measurements**, not newly reproduced results. The report identifies diabetes as the dataset and an 80/20 split. “Train” is retained as the report column label; surrounding benchmark code uses selected CV scores for similarly labeled values.

| Model | Method | Test accuracy | Report “Train” accuracy | Precision | Recall | F1 | Time (s) |
|---|---|---:|---:|---:|---:|---:|---:|
| Decision tree | GA | 0.7303 | 0.7475 | 0.7382 | 0.7303 | 0.7310 | 74.71 |
| Decision tree | Grid | 0.6854 | 0.7677 | 0.6843 | 0.6854 | 0.6845 | 1220.16 |
| Decision tree | Randomized | 0.6854 | 0.7510 | 0.6898 | 0.6854 | 0.6862 | 5.73 |
| Decision tree | Halving grid | 0.7416 | 0.8259 | 0.7476 | 0.7416 | 0.7422 | 2153.46 |
| SVC | GA | 0.7416 | 0.7585 | 0.7409 | 0.7416 | 0.7404 | 160.09 |
| SVC | Grid | 0.7416 | 0.7591 | 0.7409 | 0.7416 | 0.7404 | 940.42 |
| SVC | Randomized | 0.7416 | 0.7591 | 0.7409 | 0.7416 | 0.7404 | 155.49 |
| SVC | Halving grid | 0.6854 | 0.7583 | 0.6843 | 0.6854 | 0.6845 | 194.74 |
| Logistic L2 | GA | 0.7528 | 0.7470 | 0.7522 | 0.7528 | 0.7521 | 31.22 |
| Logistic L2 | Grid | 0.7528 | 0.7562 | 0.7522 | 0.7528 | 0.7521 | 46.91 |
| Logistic L2 | Randomized | 0.7528 | 0.7562 | 0.7522 | 0.7528 | 0.7521 | 14.21 |
| Logistic L2 | Halving grid | 0.7528 | 0.7471 | 0.7522 | 0.7528 | 0.7521 | 45.89 |

This table does not show GA as universally fastest or most accurate. Randomized search has lower times in all three reported model comparisons; tree halving has higher test accuracy than GA. Runtime superiority on other datasets, hardware or workloads is not established. Some grid/halving timings and scores are also preserved in the notebook, but other notebook outputs have since diverged.

### Current notebook's stored repeated-search summaries

The main notebook also stores another set of aggregate outputs in cells 11,18,26,31,36,42,51,58. Current source selects breast cancer; these values must remain labeled **saved notebook summaries with mixed-state provenance**, not a verified complete breast-cancer benchmark. Values below are rounded to six decimals for readability; full stored text remains in the notebook.

| Cell | Model / method | Mean selected CV score | Mean time (s) | Mean test accuracy | Mean precision | Mean recall | Mean F1 |
|---:|---|---:|---:|---:|---:|---:|---:|
| 11 | Tree GA | 0.958901 | 25.978931 | 0.938596 | 0.939338 | 0.938596 | 0.938525 |
| 18 | Tree randomized | 0.948791 | 2.538980 | 0.957895 | 0.959000 | 0.957895 | 0.957720 |
| 26 | Forest GA | 0.973187 | 1143.476838 | 0.959649 | 0.959735 | 0.959649 | 0.959517 |
| 31 | Forest randomized | 0.964835 | 35.425988 | 0.964912 | 0.965205 | 0.964912 | 0.964738 |
| 36 | SVC GA | 0.978549 | 1.776172 | 0.980175 | 0.980572 | 0.980175 | 0.980098 |
| 42 | SVC randomized | 0.978769 | 0.599593 | 0.979123 | 0.979475 | 0.979123 | 0.979049 |
| 51 | Logistic GA | 0.978022 | 9.940803 | 0.979123 | 0.979227 | 0.979123 | 0.979129 |
| 58 | Logistic randomized | 0.978022 | 2.151096 | 0.979474 | 0.979542 | 0.979474 | 0.979471 |

The notebook calculates elapsed wall-clock time using `time.time()` around search fitting/running. It does not record CPU time, peak memory, fit throughput, hardware utilization or service latency. GA timing includes its final refit; caller-side fresh-model fit/predict and metrics generally occur outside that timer. The report images visually show approximately 100 generations, unlike current benchmark source's 10/20 generations. In particular, the logistic image's best curve is around 0.756, whereas the report's GA train/CV table entry is 0.7470. Exact plot-to-table run correspondence is unavailable.

### Preserved selected baseline configurations

The following exact selections remain in `testing.ipynb` stdout. They belong to those saved outputs; they are not newly recommended defaults or verified selections for the current dataset state. NumPy scalar wrappers in output are simplified to their numeric values below.

| Cell / baseline | Saved best parameters | Saved CV score |
|---|---|---:|
| 21 / tree halving | class_weight=None; criterion=entropy; max_depth=10; max_features=0.7; max_leaf_nodes=10; min_samples_leaf=6; min_samples_split=15; splitter=best | 0.825873015873016 |
| 39 / SVC grid | C=0.007196856730011514; coef0=0.0; degree=2; gamma=scale; kernel=linear; shrinking=True; tol=0.1 | 0.7590744466800805 |
| 45 / SVC halving | C=1.389495494373136; coef0=0.25; degree=6; gamma=auto; kernel=sigmoid; shrinking=True; tol=0.001 | 0.7582539682539682 |
| 55 / logistic grid | C=0.012742749857031334; class_weight=balanced; fit_intercept=True; max_iter=100; penalty=l2; solver=liblinear; tol=0.0001 | 0.7562173038229376 |
| 61 / logistic halving | C=0.03359818286283781; class_weight=None; fit_intercept=False; max_iter=1700; penalty=l2; solver=lbfgs; tol=0.00001 | 0.7471428571428571 |

The older classification reports in cells 22,40,43,46,52,56,59,62 each show class supports **49 and 40**, totaling 89. For the identical logistic reports, class 0 precision/recall/F1 are approximately **0.764706/0.795918/0.780000** and class 1 **0.736842/0.700000/0.717949**. This preserves their small-holdout context separately from the later aggregate summaries.

### Search-space size and computational work

The following counts are **derived from products of domain cardinalities**, not measured completed fits:

| Space | Nominal combinations | Evidence / formula |
|---|---:|---|
| Five-field prototype tree | 64,980 | `model.py` param_space: 2×19×18×19×5. |
| Eight-field benchmark tree | 1,559,520 | `testing.ipynb` cell 10: 2×19×18×19×5×6×2×2. |
| Eight-field benchmark forest | 2,339,280 | Cell 24: 2×19×3×18×19×5×6×2. |
| Seven-field benchmark SVC | 48,000 | Cell 34: 15×4×2×8×5×2×5. |
| Seven-field L2 logistic | 24,000 | Cell 49, flat space: 20×1×5×20×3×2×2. |
| Conditional L1/L2 logistic | 33,600 | `models.ipynb` cell 4: 20×(2+5)×20×3×2×2 valid mapped combinations. |
| Nine-field MLP | 216,000 | `models.py` nn space: 5×3×2×20×2×10×3×3×2. |

With population P, generations G and K folds, the successful base loop requests **P×G candidate evaluations**, approximately **P×G×K CV fits plus one final fit**, before any caller refit. This formula follows from `run` and `_evaluate_individual`; it does not count unique parameter sets or assert completed execution. Current tree/forest GA configurations request 1,000 evaluations/5,000 fold fits per run; SVC/logistic request 400/2,000. Default 100×1,000×5 corresponds to 100,000 evaluations/500,000 fold fits plus refit if completed. Final unused breeding, failed fits, and library behavior do not create a measured speed guarantee.

In-memory state retains the active population and generation history. There is no measured memory ceiling, streaming dataset reader, batching mechanism, cache, distributed scaling benchmark or demonstrated production throughput.

## Technical Challenges / Complexity

- **Conditional hyperparameter validity:** Penalty and solver cannot be chosen independently under the project's compatibility map. The subclass keeps them consistent through three evolutionary operations and adds a fitness guard. This is more involved than sampling a flat parameter dictionary, but is narrowly specialized rather than a generic constraint engine.
- **Nested search cost:** Each candidate triggers K model fits. The code combines custom evolutionary control with scikit-learn CV and parallel baseline searches; budget/concurrency choices materially affect comparisons. The explicit domain-product counts explain why exhaustive grids can be large without claiming all were completed.
- **Mixed data types and preprocessing:** Titanic workflows combine imputation, title normalization, categorical encoding, group statistics and family/age/fare feature construction. Positional transforms and manual split boundaries make schema/order important. The supplied cleaned CSVs are not identical to the current notebook's output representation.
- **Variable neural-network architectures:** Hidden-layer layouts are tuples stored in a nested configuration; their mutation needs different handling from scalar fields. The prototype implements that handling but lacks demonstrated successful end-to-end MLP results.
- **Experiment state management:** Multiple duplicate optimizer definitions, mutable notebook variables and preserved old outputs make provenance/reproduction non-trivial. Saved failures expose this directly; the workspace has no automated experiment-tracking or parameter/result manifest to resolve it.

These points describe implementation complexity visible in source, not inferred effort, difficulty rankings, team responsibilities or performance impact.

## Documentation / Operational Support

`ProjectReport.tex` contains Introduction (motivation and related work), Materials and Methods (GA design, tools, model-specific tuning, challenges), Results (three model comparison tables and three plots), Discussion and Conclusion (observations/limitations/future work), and References. It describes reusable tuning, compatibility handling and proposed early stopping. Some descriptions differ from code: `pop_size`/`cv_folds` versus actual `population_size`/`cv`; “superclass” where code uses a subclass; “linear regression” where the implementation is logistic classification; and preprocessing order/target-selection differences noted above.

The report lists four related-work entries: Krüger & Nabeel (2021), Mantovani et al. (2016), Damanik et al. (2019), and Liu & Fan (2014). Those are report references, not evidence that their methods or external implementations were incorporated. Citation accuracy and paper contents were not checked externally. The last entry ends with a literal “Link” without a usable bibliographic URL in the source. No bibliography database is supplied.

The compiled PDF includes ACM template conference/DOI/ISBN placeholders. These do not establish ACM publication, acceptance, an actual DOI, a conference presentation or a licensing determination for the repository. The original LaTeX prose and use of the template are distinguishable from generated template boilerplate.

`Project Proposal.pdf` is an assignment rubric requesting goals, importance, data sources, approach, sample-size/EDA justification, peer-reviewed articles, timeline/responsibilities and references. It supplies assessment percentages and suggests ACM templates. It does not supply a completed proposal, actual project timeline, data-collection approval, or project-specific responsibility allocation.

Notebook markdown/comments and the small dependency list in `testing.ipynb` are the main usage guidance. No README installation guide, stable package API reference, reproducible environment setup, operations runbook, admin tool, recovery endpoint or model-serving instructions are present. Inline comments document solver compatibility problems and contemplated alternative selection/constraint approaches; they are not implemented features merely because they are mentioned.

## Quantifiable Evidence

| Metric | Value | Evidence / counting method |
|---|---:|---|
| Non-Git files before this record | 34 | Recursive filesystem inventory, including metadata/cache/generated files and inaccessible `.gitignore`; excludes `.git/`. |
| Jupyter notebooks | 5 | File inventory; all JSON documents inspected. |
| Notebook cells | 162 total: 139 code, 23 markdown | Count JSON cell types: cleaned Titanic 41+1; Titanic EDA 37+1; drug 16+0; models 4+0; testing 41+21. |
| Python source files | 4, of which 3 nonempty | `model.py` 220 lines, `models.py` 600, `genetic_algorithm.py` 233, `GeneticAlgorithm.py` 0; `splitlines()` count. |
| CSV artifacts | 8 | Full inventory and header-aware parsing; detailed table above. |
| Titanic original row partition | 891 labeled + 418 unlabeled = 1,309 | Root train/test CSV counts and cleaned notebook combined dataframe output. |
| Air-quality stored partition | 3,500 labeled + 1,500 unlabeled = 5,000 | `tryingStuff/train.csv` and `test.csv`; not a verified processed-record count. |
| Drug rows / predictors / classes | 200 / 5 / 5 | CSV schema, rows and distinct Drug values. |
| Drug saved holdout support | 20 | `drugTree.ipynb` cell 15; supports 3+2+2+6+7. |
| Diabetes report size | 442 samples / 10 features | `ProjectReport.tex`, Tools and Frameworks Used; not a local raw-file count. |
| Classifier families with fit/tuning code | 5 | Decision tree, random forest, SVC, logistic regression, MLP across scripts/notebooks. MLP success not established; ExtraTree instantiated only is excluded. |
| Search methods implemented/called | 4 | Custom GA; sklearn GridSearchCV, RandomizedSearchCV, HalvingGridSearchCV. |
| Benchmark model-method code pairings | 15 | 4 each for tree/SVC/logistic, 3 for forest; not 15 completed validated experiments. |
| Final report comparisons | 12 rows | Three model tables × four methods. |
| Report figures | 3 PNGs | Report image references and inspected image directory. |
| Report / proposal PDF pages | 4 / 1 | PDF document inspection; report also corroborated by build log. |
| Saved notebook error objects | 4 | Two in Titanic EDA, two in main benchmark; counted `output_type == 'error'`. Warning streams excluded. |
| Automated assertion-based tests discovered | 0 | Source/notebook inspection; no assertions/test functions/test suite configuration found. |
| Custom HTTP endpoints / database models | 0 found / 0 found | Whole non-Git project inventory and source review. |
| Compiled Python caches | 2 | `genetic_algorithm.cpython-310.pyc`, `genetic_algorithm.cpython-312.pyc`; not two independent implementations. |
| GA retained elite count | 1 per replacement population | `run`: `new_population.append(self.best_params_)` before breeding. |
| Default GA / benchmark CV folds | 5 / 5 | Constructor and main benchmark calls; prototype tree overrides to 10. |

No count above establishes users, production traffic, economic impact, measured speedup, original collected subjects, or completed exhaustive search runs.

## Evidence Map

### Claim: A reusable custom evolutionary hyperparameter optimizer is implemented

Evidence:

- `CPSC544-Project/myModel/tryingStuff/genetic_algorithm.py:11` — class, constructor/state and sklearn base classes.
- Same file, `_initialize_individual`, `_initialize_population` — candidate-domain sampling.
- Same file, `_evaluate_individual`, `_tournament_selection`, `_crossover`, `_mutate` — fitness and evolutionary operations.
- Same file, `run` at line 95 — generations, global-best tracking, history, elitism and final fit.
- `CPSC544-Project/myModel/tryingStuff/testing.ipynb`, cells 2,11,26,36,51 — importing/configuring/calling this module.

### Claim: Logistic regression receives custom compatibility handling

Evidence:

- `genetic_algorithm.py:155` — `logGA` and four overridden methods.
- `models.ipynb`, cell 4 — `PenaltyAwareLogisticGA`, solver mapping and conditional two-grid baseline.
- `testing.ipynb`, cells 48–51 — imported specialization, both domains and actual generic L2-only benchmark call, delimiting what was exercised there.

### Claim: Five classifier families have experimental fit/tuning code

Evidence:

- `testing.ipynb`, cells 11,26,36,51 — tree, forest, SVC and logistic search/fresh-model fits.
- `models.py:507` and subsequent MLP block — `NNGABase` and MLP searches.
- `ProjectReport.tex`, Discussion and Conclusion — neural-network results omitted from the final report.

### Claim: Evaluation combines cross-validation, holdout metrics and recorded timings

Evidence:

- `testing.ipynb`, cells 4–5 — analytics and split/scaling helpers.
- Same notebook, repeated-search cells and grid/halving cells — timers and aggregation.
- `ProjectReport.tex`, three Results tables — reported diabetes metrics/times.
- `testing.ipynb`, cells 14–16,22,52 — failed/stale outputs limiting reproducibility.

### Claim: Titanic work includes substantial preprocessing and a separate unfinished EDA branch

Evidence:

- `titanicCleaned.ipynb`, cells 6–21 — imputation/title/family engineering and summaries.
- Same notebook, cells 25–42 — partitioning, transform definitions, actual tree training and training-only score.
- `titanicTree.ipynb`, cells 13–32 — alternative engineered fields/encodings.
- Same notebook, cells 34–38 — target slicing and saved failures.
- `train_clean.csv`, `test_clean.csv` — schema/values that differ from current cleaned-notebook output.

### Claim: Drug-data classification is demonstrated with a small saved holdout result

Evidence:

- `Titanic/drug200.csv` — 200-row, five-predictor source.
- `drugTree.ipynb`, cells 7–11 — encoding, 90/10 split and tree fit.
- Same notebook, cells 12–16 — scores, 20-example classification report and tree figure.

### Claim: Provided artifacts do not establish an automated export/deployment pipeline

Evidence:

- All `.py` and notebook source reviewed for I/O: CSV reads occur in exploratory notebooks, with no visible `to_csv`, result serializer, `savefig` to report paths, or model persistence call.
- `submission.csv` contains training-range IDs, not the provided test ID range.
- Whole-file inventory contains no deployment/configuration package, CI workflow or database/server source.

### Claim: Important reliability/reproducibility limitations are visible

Evidence:

- `genetic_algorithm.py`, `run` — retained instance state, no timing attribute, no checkpoint/early termination logic.
- `models.py`, SVC space/base initializer — unsupported NumPy domains.
- `models.py`, final timing block; `models.ipynb`, cell 4 — undefined `total_time_elapsed_`.
- `testing.ipynb`, cells 6,14,15,19 and 51/55/58/61 outputs — data mismatch, interrupted search, incorrect prediction variable and convergence warnings.
- `ProjectReport.log` — document compilation and warnings, distinct from application testing.

## Git / Development History

Git history was not analyzed: present source, notebooks and report sufficiently expose implementation variants, experiments and limitations, and history was not needed to assign ownership. An initial status check at the workspace root reported that it was not a Git repository; the nested project has `.git/`. A nested status attempt stalled because essential metadata is stored as macOS dataless placeholders. No successful status/branch/commit baseline is claimed, and no checkout/reset/rebase/merge/commit was performed.

Repeated implementations and comments support the existence of alternative experiments, but do not prove their chronological order. No development dates, commit counts, contribution percentages or maintenance history are inferred. The report build timestamp is retained only as build-artifact evidence.

## Uncertain / Not Verifiable

- Exact origin/license and collection process of the CSV datasets; the meaning/units of air-quality predictors A–I; whether the air-quality data was ever modeled elsewhere.
- Exact producer, parameters and time of creation for cleaned Titanic CSVs, `submission.csv`, or each report figure; no visible exporter or per-run manifest connects them.
- Whether `submission.csv` was submitted anywhere or how it performed; its filename is insufficient evidence.
- Whether the current scripts/notebooks execute successfully end to end in a clean environment; runtime experiments were intentionally not launched, and several static/saved issues exist.
- Exact dataset/kernel/code state for each saved benchmark output and the report's complete experiment configuration.
- Reproducible runtime comparisons, hardware characteristics, total actual model fits, statistical confidence, memory use or performance beyond the recorded values.
- Successful MLP search completion or accuracy; source exists, but no matching saved result is supplied and timing code is incomplete.
- Any actual production deployment, users, usage frequency, service availability, business impact, clinical application or external integration beyond local libraries.
- Package versions/compatible environment for the whole workspace; isolated notebook/build traces do not replace a manifest.
- `.gitignore` contents and inaccessible Git metadata; exact tracked/untracked status and history are unavailable from the unsuccessful status read.
- External publication or validated bibliographic details. ACM placeholders and literature discussion do not prove publication or implemented Bayesian/WEKA methods.
- Reasons for most parameter choices, data changes, duplicate implementations and report/code discrepancies. Comments establish specific concerns, not a complete design-decision history.

## Questions Requiring External Context

1. Which saved experiment state and dependency environment should be treated as the authoritative reproduction of the report's diabetes comparisons?
2. Are original per-run results, seeds, hardware details and command/execution logs available for the timing tables and generation plots?
3. What are the source, license and feature definitions of the air-quality data, and was any omitted workflow intended to use it?
4. What produced the Titanic cleaned CSVs and submission artifact, and was the submission used in any external evaluation?
5. Was the MLP experiment completed outside this snapshot, and are its outputs or corrected timing records available?
6. Was the prototype used beyond the course investigation, and are any deployment or user-impact records available?
7. What motivated the specific GA hyperparameters/search budgets and changes between diabetes and breast-cancer experiments?

Ownership and contribution shares are not asked: the user supplied the sole-developer premise.

## Additional Technical Details

- Scalar candidate values are stored in Python dictionaries; `.copy()` is shallow. Supplied ordinary values and hidden-layer tuples fit that model, but arbitrary mutable callable-returned values are not deeply isolated.
- Best-score ties do not replace the existing global best (`>` comparison). Tournament ties use NumPy argmax's selected index; no custom tie-breaking policy is implemented.
- Candidate duplicates and elite candidates are rescored in each generation; there is no memoization, and stochastic estimators may score the same parameters differently.
- Setting `random_state` seeds global Python/NumPy generators at construction, rather than an isolated per-instance generator. It does not automatically seed every caller-supplied estimator. The logistic specialization explicitly forwards it to its newly created estimator.
- Parameter-space dictionaries are supplied directly and retained; there is no immutable configuration snapshot or schema/version tag.
- History records global best and current mean, not all individual scores/parents/offspring or fold-level results. The plots cannot reconstruct every evaluated candidate.
- `bestModel` is camelCase, unlike underscore-suffixed `best_score_`/`best_params_`; no alias or serialization contract is supplied.
- The report's “server parameters” wording does not indicate an implemented server. Actual configuration is through Python constructor arguments.
- Graph titles and report captions contain minor inconsistencies, including “State Vector Machine” in the report caption for SVM. The instantiated class is `SVC`.
- The three report plots show a flat best-so-far curve after early improvements while population means continue to vary; they illustrate the recorded history concept but are not numerical source tables for exact convergence times.
- Notebook source contains exploratory imports that can still be runtime dependencies when executing those cells, even where their models are unused (for example XGBoost). They are not credited as implemented modeling features.
- Generated report files and notebook outputs preserve meaningful experimental/document evidence, while Finder files and bytecode caches have no attributed custom behavior.

### Final scope check

The record distinguishes original implementation from library behavior, stored results from reproduced measurements, configured work from completed runs, and current source from historical/stale notebook outputs. All five notebooks, all four Python source files, all eight CSVs, report source/PDF/figures/build support, the proposal instructions, and metadata-file limitations are represented. Existing source and artifacts were left unchanged; no bugs were fixed as part of this investigation.
