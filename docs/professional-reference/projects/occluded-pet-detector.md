---
project_id: occluded-pet-detector
name: "Occluded Pet Detector"
dates: "Aug. 2025 -- Apr. 2026"
categories: ["Computer vision", "Synthetic data augmentation", "Deep learning experiments", "Detection evaluation"]
technologies: ["Python", "PyTorch", "Ultralytics YOLOv8n", "EfficientDet-D0", "effdet", "timm", "Hugging Face Transformers", "DETR", "NumPy", "OpenCV", "Pillow", "pycocotools", "COCO JSON", "YOLO labels", "Jupyter", "Kaggle", "CUDA", "Matplotlib", "pandas"]
evidence:
  - evidence/occluded-pet-detector/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/projects/occluded-pet-detector.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Overview

Offline computer-vision experiment comparing clean pet detection with training augmented by synthetic household-object occlusion. Oxford-IIIT Pet trimaps are converted to boxes; segmented ADE20K objects become pasted occluders. A separate naturally occluded photograph collection evaluates transfer to real occlusion.

The delivered task is **one foreground class, pet**, pooling cats/dogs/breeds. YOLOv8n and EfficientDet-D0 have retained real-image results; DETR integration/code exists with incomplete training/evaluation provenance. This is a file-based notebook research workflow, not a camera-monitoring application or deployed inference API. Original implementation attribution follows the supplied ownership statement in the evidence.

# Core Contributions

- Oxford trimap-to-box conversion with bounded padding, normalized YOLO labels, seeded train/validation split, image copying, and dataset configuration.
- ADE indoor-scene indexing, object JSON/instance-mask extraction, structural-category exclusion, area/aspect filtering, size/placement selection, softened alpha compositing, and persistent synthetic image/label generation.
- Clean/combined YOLO training orchestration, independent clean/real evaluations, path/configuration correction, and retained runs/checkpoints/CSV/diagnostic artifacts.
- COCO conversion/ID-remapping code and retained annotation views; custom DETR processor/dataset/collation integration and experimental loops.
- EfficientDet data/target adapters, custom training/validation loop and best-loss weight selection, checkpoint diagnostics, original-resolution prediction conversion, and in-memory COCO evaluation.
- Custom two-checkpoint EfficientDet ensemble using greedy hard NMS, qualitative comparisons, research figures, report, poster, and presentation packaging.

# Architecture / Technical Design

Oxford images/trimaps/splits → clean YOLO data → ADE object synthesis → saved synthetic data and combined manifest → library detector training/custom adapters → clean and separately annotated real evaluation → metrics, plots, and deliverables.

Preparation selects trimap foreground **value 1 only**, adds **5%** bounded padding, and creates one box per prepared image. Official trainval IDs are shuffled with seed 42; 10% become validation. External Oxford XML head boxes are present but do not supply the project's whole-pet boxes.

ADE selection filters home_or_hotel paths and samples training objects through object JSON and instance masks. Heuristics exclude parts/structural categories, tiny objects, and extreme aspect ratios. Scaling uses pet-box/object-mask areas; random requested ratio **0.20–0.65** is a pre-placement target, not measured covered foreground. Clipped placement, dilation/blur, and **0.95** alpha soften composition. Original full-pet labels are copied unchanged, not recalculated as visible-region boxes.

Synthetic sources belong to clean training, with no filename overlap against clean validation/test. Combined YOLO configuration uses a persisted absolute image manifest; earlier augmented-named code incorrectly selected clean YAML. The later source and valid run archive corroborate combined training. Duplicate notebooks/archives and the incorrectly configured variant are not separate projects or valid additional augmented runs.

# Technical Depth

Geometry crosses trimap pixels, normalized YOLO boxes, COCO pixel XYWH, detector tensors, and original-resolution predictions. Retained COCO files include zero/one-based category variants; merging remaps image/annotation IDs. Export/merge code is currently commented; existing artifacts corroborate output structure rather than execution of those current comments.

DETR integration groups annotations by image, resolves filenames across roots, uses the pretrained ResNet-50 processor/model with one-class output adaptation, and pads variable-size inputs/masks. Training/evaluation sketches exist but the extended notebook has no executed outputs. Completed DETR fine-tuning/checkpoint provenance is unestablished.

EfficientDet adapters resize to **512×512**, normalize with ImageNet statistics, independently scale coordinates, and pad variable-length box/class targets. Retained loop configures **25 epochs**, **batch eight**, **two loader workers**, and AdamW learning rate/weight decay **1e-4**. Base detector weights save on improved validation loss; full saved-checkpoint training schedules are unresolved.

Real EfficientDet evaluation diagnoses checkpoint wrappers/head keys, reports missing/unexpected parameters, rescales/clamps boxes, and builds COCO ground truth/predictions. The ensemble concatenates clean/augmented detections by image and removes lower-score boxes with IoU **≥0.55**. It is two-model same-architecture hard NMS, not weighted fusion or a three-detector ensemble.

# Scale / Metrics

- Prepared Oxford splits: **3,312 train / 368 validation / 3,669 test**, totaling **7,349 images/boxes**. Raw 7,390 image files are a different population.
- ADE indoor index: **6,118 training / 523 validation entries**; validation is not the synthesis sampling pool.
- **3,000 synthetic images/labels**, with 3,000 distinct clean training source stems; combined training has **6,312 unique paths**. Report wording of 3,312 synthetic images conflicts with retained artifacts.
- Real evaluation: **74 images, 74 label files, 90 pet boxes**. Source labels do not encode species; reported even cat/dog balance is not independently verified.
- Both valid YOLO runs retain **50 epoch rows**, using **640-pixel input, batch 16, four workers, GPU device 0**. Saved training identifies one Tesla P100; real evaluation identifies local CPU execution. These are experiment conditions, not custom GPU/distributed infrastructure.

Recorded best-checkpoint metrics below were not rerun during ingestion or source investigation. All clean-test results use 3,669 images/instances; real results use 74 images/90 boxes.

| Evaluation | Training | Precision | Recall | mAP50 | mAP50–95 |
| --- | --- | ---: | ---: | ---: | ---: |
| Clean Oxford, YOLOv8n | Clean | 0.9852995321 | 0.9864683930 | 0.9930764218 | 0.8845164144 |
| Clean Oxford, YOLOv8n | Clean + synthetic | 0.9869758326 | 0.9901880621 | 0.9935463781 | 0.8931432035 |
| Real occlusion, YOLOv8n | Clean | 0.4830208844 | 0.4983163628 | 0.4710500175 | 0.2288516369 |
| Real occlusion, YOLOv8n | Clean + synthetic | 0.4803664703 | 0.4314218856 | 0.3448546560 | 0.1523538045 |

Real EfficientDet results use prediction-score cutoff **0.05** and ensemble NMS IoU **0.55**:

| Condition | mAP50–95 | mAP50 | mAP75 | Candidate detections |
| --- | ---: | ---: | ---: | ---: |
| Clean D0 | 0.0356984441 | 0.0984077726 | 0.0332842195 | 341 |
| Clean + synthetic D0 | 0.0431645785 | 0.1115656619 | 0.0373393722 | 314 |
| Clean + augmented D0 ensemble | 0.0402779449 | 0.0971077368 | 0.0371287129 | 507 |

Candidate counts are filtered outputs, not correct detections. Synthetic training lowered all reported real YOLO metrics and modestly raised EfficientDet AP; ensemble AP remained below augmented D0. No uniform robustness improvement or statistical significance is established.

Historical generation output records **3,000 images in 04:09**, displayed **12.00 images/second**. Valid YOLO epoch-50 CSV cumulative times are **2,087.17 seconds clean / 3,593.38 seconds augmented**. These are particular runs with different training populations, not speedup benchmarks or deployment latency.

# Testing / Validation

Project validation includes path/label checks, mask/box visual inspection, training validation, best-checkpoint clean/real evaluations, and ensemble evaluation. No dedicated software regression suite, CI, coverage, or end-to-end deployment testing was identified.

Read-only investigation found unique COCO IDs/no orphan annotation references, disjoint clean split filenames, combined-manifest union, and valid class-zero normalized label shapes/ranges. These are investigator checks, not authored test-case counts. Evaluated YOLO weights byte-match valid training archives; EfficientDet checkpoints are distinct and saved loading reports **zero missing/unexpected keys**, but complete training lineage is weaker. No models/evaluations were rerun.

# Reliability / Failure Handling

Preparation checks missing paths, skips absent/empty foreground pairs, and clamps geometry. Occluder sampling filters invalid/missing masks and returns None after eighty image-selection attempts. Compositing clips valid intersections; generation increments success only after image/label output. YOLO real evaluation checks label coverage; EfficientDet detects incompatible checkpoint structures and clamps/discards degenerate predictions.

The outer generation loop has no global failure bound, atomic image/label write, or checkpoint/resume journal. Synthesis has no independently fixed seed or per-image occluder/ratio/placement manifest; deterministic filenames can overwrite outputs. EfficientDet saves weights without optimizer/epoch/RNG state. Its ground-truth builder silently skips missing labels, unlike stricter YOLO checks. Checkpoint strict=False behavior can tolerate mismatches outside the saved successful loads.

# Limitations / Attribution Boundaries

- Ultralytics, Transformers, effdet/timm, PyTorch, and pycocotools supply detector architectures, training/loss/autograd/evaluation machinery, decoding, and automatic outputs. Custom work is preparation/synthesis, adapters, loop/orchestration, checkpoint diagnostics, ensemble NMS, and analysis—not custom detector backbones, automatic AMP, JPEG repair, or COCO metrics.
- Public datasets and photographs are external assets; derived boxes/indices/composites/manual labels are distinguishable work. Exact real-image source/species/license coverage is incomplete. The report describes manual visible-region boxes, while synthetic supervision retains full-pet extent; possible effects were not isolated.
- Requested occluder area is not measured occlusion severity. No repeated-seed study, confidence interval, severity sweep, causal ablation, held-out real validation set, or measured false-negative reduction is supplied.
- DETR epoch count/evaluation split and complete trained output are ambiguous. EfficientDet configured 25 epochs conflicts with report/40-point plotting material; its approximate clean-validation AP lacks a complete supporting log. Do not turn these into verified completed schedules/metrics.
- Report augmented validation 0.9057 is mislabeled mAP50; CSV places it under mAP50–95. Final-epoch validation values differ from best-checkpoint test metrics and must not be mixed.
- Hardcoded local/Kaggle paths, unpinned notebook installations, IPython exports, and manual choices limit portability/reproduction. No inference service, camera pipeline, users, deployment, business outcome, or publication acceptance is evidenced.

# Notes

Owner confirmation on 2026-10-09: development dates were **Aug. 2025 -- Apr. 2026**. These dates come from the owner, not investigation dates, file timestamps, or course identity.

Investigation date 2026-10-09 is not a project timeline. Keep model variants, augmentation, evaluation, and deliverables together as one project; duplicated template/archive materials are not additional implementations. Proposal cat/dog classes, TTA, and three-architecture ensemble remain plans rather than delivered features.

Evidence sections: Contributions; Architecture; Synthetic generation algorithm and supervision; Training, Evaluation, and Internal Processing Interfaces; Performance / Scale; Uncertain / Not Verifiable. Internal notebook/archive paths refer to the investigated workspace.
