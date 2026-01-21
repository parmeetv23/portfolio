export type ProjectCategory = "Distributed" | "ML" | "Embedded" | "Full-Stack";

export interface ProjectLinks {
  repo?: string;
  demo?: string;
  paper?: string;
  report?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category: ProjectCategory;
  featured: boolean;
  links?: ProjectLinks;
  overview: {
    description: string;
    purpose: string;
  };
  role: {
    built: string[];
    owned: string[];
  };
  technicalHighlights: {
    architecture: string[];
    algorithms: string[];
    failureHandling?: string[];
    optimization?: string[];
  };
  techStack: string[];
  results: {
    achievements: string[];
    learnings: string[];
    tradeoffs: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "distributed-chat-system",
    title: "Distributed Fault-Tolerant IRC-Style Chat System",
    summary:
      "Distributed IRC-style chat system with gossip-based replication, fault-tolerant client/server recovery, and load-aware routing via replicated Addressing Servers, built on an event-driven Java NIO architecture for scalable non-blocking concurrency.",
    tags: [
      "Distributed Systems",
      "Fault Tolerance",
      "Event-Driven Architecture",
      "Java NIO",
      "Non-Blocking I/O",
      "Gossip Replication",
      "Vector Timestamps",
      "P-RAM Consistency",
      "Deduplication",
      "Recovery Protocols",
      "Docker",
    ],

    category: "Distributed",
    featured: true,

    overview: {
      description:
        "A distributed IRC-style chat system designed around real distributed-systems concerns: membership/routing, replication, message ordering guarantees, and recovery under failure. Clients connect through an Addressing Server cluster to discover and register with Chat Servers. Chat Servers operate as peers (no central chat authority), persist chat logs to disk, and replicate new messages using configurable gossip fanout (forwarding to the N nearest peers). Servers recover state by requesting chat history from peers, ensuring missed messages are re-fetched after crashes/partitions. The networking layer is built with Java NIO (selectors/channels) to multiplex many client + peer connections without per-connection threads.",
      purpose:
        "Built to implement end-to-end distributed reliability: correct message propagation under reordering/duplication, robust reconnection flows for both clients and servers, and practical failure detection/recovery while staying scalable with an event-driven runtime.",
    },

    role: {
      built: [
        "Chat Server: peer-to-peer replication, disk-backed chat log, and non-blocking client + server networking",
        "Client: registration, chat UX/commands, reconnect + resend, and history synchronization",
        "Protocol foundation: message/data types and JSON schemas used across the system (including shared types used by the Addressing Server)",
        "Registration + reconnection handshake flows between Client↔Addressing Server and Chat Server↔Addressing Server",
      ],

      owned: [
        "Chat Server runtime (Java NIO selector loop, connection state, parsing, routing, and write-queue behavior)",
        "Client reliability: bootstrap/redirect, reconnect handshake, resend buffering, and history refresh after failover",
        "Chat Server registration + re-registration handshake (initial join + recovery) with Addressing Servers",
        "Core protocol/data model design (message envelopes, command/object types, payload shapes, and lifecycle semantics)",
        "Replication behavior: gossip fanout (configurable N-nearest) + state transfer via peer chat-log requests",
        "Deduplication strategy based on unique message IDs (ignore duplicates on retrieval/ingest)",
        "Ordering guarantee: P-RAM consistency using vector timestamps for partial ordering and convergence",
        "Heartbeat + zombie detection to avoid lingering dead peers and trigger recovery workflows",
        "Integration code connecting Addressing Server coordination with client/server networking flows",
      ],
    },

    technicalHighlights: {
      architecture: [
        "Two-layer system: Addressing Server cluster for routing/membership + peer Chat Server network for replicated message plane",
        "Event-driven, selector-based Java NIO architecture (non-blocking reads/writes; no per-connection threads)",
        "Disk-backed chat history on Chat Servers (append + reload), with recovery by requesting peer logs to re-fill gaps",
        "Explicit connection context/state machines for clients, peer servers, and addressing-server coordination",
        "Dockerized deployment: separate images for client, chat server, and addressing server with env-driven configuration",
      ],

      algorithms: [
        "Gossip-based replication with configurable fanout: forward each new message to the N nearest peers (tunable N)",
        "State transfer: REQUEST_CHATLOG / RESPONSE_CHATLOG to synchronize logs on join/rejoin and fill missed messages",
        "P-RAM consistency via vector timestamps (preserve per-sender order; allow concurrent interleavings)",
        "Unique message IDs + deduplication on ingest to tolerate redundant propagation paths",
        "Heartbeat PING/PONG between chat servers with missed-response thresholds for failure detection",
      ],

      failureHandling: [
        "Client failover: Addressing Server-assisted redirection to a healthy Chat Server after server failure",
        "Client-side buffering + resend to avoid message loss across disconnects",
        "Server recovery: re-register + request chat log from peers to reconstruct state after crash/partition",
        "Zombie detection: periodic health checks so clients/servers don’t remain attached to dead peers",
        "Peer isolation: stop sending to peers that miss heartbeats; reconnect workflows restore membership",
      ],

      optimization: [
        "Non-blocking multiplexed I/O (selectors) to scale with concurrent clients + peer connections",
        "Write-queue style non-blocking sends to avoid stalling the event loop on slow sockets",
        "Tunable gossip fanout to trade bandwidth for faster convergence",
        "Separation of protocol parsing/dispatch from low-level I/O readiness handling",
      ],
    },

    techStack: [
      "Java",
      "Java NIO (Selectors, SocketChannel)",
      "TCP + JSON Protocol",
      "Event-Driven Concurrency",
      "Vector Timestamps",
      "Gossip Replication",
      "Docker + Docker Compose",
      "Bash Scripts + Env-based Configuration",
    ],

    results: {
      achievements: [
        "Implemented disk-backed message persistence and peer-based log recovery to restore missed messages after failures",
        "Built robust registration + reconnection handshakes for both clients and chat servers via Addressing Server coordination",
        "Deployed and exercised the system across multiple networks using Docker: ~50 clients, 10 chat servers, and 5 addressing servers",
        "Maintained convergence under redundant propagation using unique IDs + deduplication and P-RAM ordering via vector timestamps",
      ],

      learnings: [
        "Correct recovery paths (re-register, resync logs, resend buffered messages) dominate overall system complexity",
        "Event-driven NIO scales well, but forces explicit state machines for partial reads/writes and connection lifecycle",
        "Replication correctness needs redundancy (gossip) plus guardrails (dedupe, ordering guarantees, and retry/recovery)",
      ],

      tradeoffs: [
        "Chose P-RAM (per-sender ordering) over total ordering to avoid heavy coordination and improve availability",
        "Accepted redundant gossip traffic to simplify convergence and improve fault tolerance",
        "Optimized for recovery + correctness rather than minimal bandwidth or lowest-latency delivery",
      ],
    },
  },

  {
    slug: "occluded-pet-detection",
    title: "Occluded Pet Detection in Domestic Environments",
    summary:
      "Studied whether occlusion-aware training improves indoor cat/dog detection under partial visibility using synthetic ADE20K indoor-object occlusions and a real occluded test set; evaluated YOLOv8, EfficientDet-D0, and DETR with COCO-style mAP.",

    tags: [
      "Computer Vision",
      "Object Detection",
      "Occlusion Robustness",
      "YOLOv8",
      "EfficientDet",
      "DETR",
      "PyTorch",
      "COCO mAP",
      "Data Augmentation",
    ],

    category: "ML",
    featured: true,

    overview: {
      description:
        "Object detection study focused on domestic indoor settings where pets are frequently partially visible (occluded by furniture/household objects). Used Oxford-IIIT Pets (7,349 images, 37 breeds) with bounding boxes derived from segmentation masks, and compared clean training vs synthetic occlusion training. Training split: 3,312 images; validation: 368 images; clean test: 3,669 images. Evaluated transfer to a real occluded test set of 74 manually annotated images (personal + open-source), measuring COCO-style metrics.",
      purpose:
        "Evaluate whether synthetic occlusion augmentation transfers to real-world indoor occlusions, and how different detector families behave under partial visibility when hyperparameters/architectures are held constant.",
    },

    role: {
      built: [
        "End-to-end training + evaluation pipeline (data prep, training runs, metrics, and qualitative analysis)",
        "Synthetic occlusion generator: overlay ADE20K segmented indoor objects onto pet images with opacity blending",
        "Dataset engineering: derive bounding boxes from segmentation masks and unify cat/dog breeds into a single “Pet” class",
        "Real occluded indoor test set: collection + manual annotation + evaluation scripts",
      ],
      owned: [
        "Experiment design comparing clean vs occlusion-aware training under fixed training budgets",
        "Occlusion augmentation realism controls (object-category filtering, minimum size thresholds, random placement with guaranteed overlap %)",
        "Cross-model evaluation and analysis for YOLOv8, EfficientDet-D0, and DETR (including explaining failure modes)",
        "Reporting: quantitative mAP tables + qualitative examples on real occlusions",
      ],
    },

    technicalHighlights: {
      architecture: [
        "YOLOv8 trained with pretrained weights (single-stage detector via Ultralytics)",
        "EfficientDet-D0 with pretrained initialization (EfficientNet backbone + BiFPN multi-scale fusion)",
        "DETR explored (transformer-based set prediction); evaluated but excluded from further runs due to poor convergence under the project budget",
        "No architecture changes applied to isolate the effect of occlusion-aware training",
      ],
      algorithms: [
        "COCO-style evaluation on the real occluded set: mAP@0.50 and mAP@[0.50:0.95] (plus precision/recall where applicable)",
        "Synthetic occlusion augmentation: segmented ADE20K objects overlaid at random locations; ensured a minimum overlap percentage",
        "Indoor-object filtering with some leakage due to large category volume (pragmatic filtering)",
        "Annotation consistency: boxes derived directly from Oxford-IIIT segmentation masks",
      ],
      optimization: [
        "Pretrained initialization to stabilize convergence under limited compute budgets",
        "Kept hyperparameters fixed to focus conclusions on the augmentation effect, not tuning",
        "Selected checkpoints based on validation performance (clean validation set) to avoid test leakage",
      ],
    },

    techStack: [
      "Python",
      "PyTorch",
      "Ultralytics (YOLOv8)",
      "EfficientDet",
      "DETR",
      "COCO Evaluation Metrics",
      "Kaggle GPU",
    ],

    results: {
      achievements: [
        "Built and evaluated an occlusion-aware training pipeline combining Oxford-IIIT Pets + ADE20K synthetic occlusions",
        "Created a real occluded indoor test set (74 images) to measure transfer under realistic household occlusions",
        "YOLOv8 on real occluded set: Clean Training mAP@0.50=0.471, mAP@[0.50:0.95]=0.229; Occlusion-Aware Training mAP@0.50=0.345, mAP@[0.50:0.95]=0.152",
        "EfficientDet-D0 on real occluded set: Clean Training mAP@0.50=0.098, mAP@[0.50:0.95]=0.036; Occlusion-Aware Training mAP@0.50=0.112, mAP@[0.50:0.95]=0.043",
        "DETR on real occluded set: mAP@0.50=0.079, mAP@[0.50:0.95]=0.016 (poor convergence under the available training budget)",
      ],
      learnings: [
        "Synthetic occlusion augmentation can improve clean/validation metrics but may not transfer to real occlusion geometry/lighting",
        "YOLOv8 was more robust to partial cues (e.g., faces/ears) even without explicit occlusion-aware training",
        "EfficientDet improved slightly with occlusion-aware training on the real occluded set, but absolute localization quality remained low",
        "Transformer-based detectors can be impractical without longer training schedules and/or larger datasets",
      ],
      tradeoffs: [
        "Prioritized isolating augmentation effects (fixed architectures/hyperparams) over maximizing peak performance",
        "Used a small real occluded test set for realism, trading off statistical generalization",
        "Synthetic occlusions provide controlled coverage but introduce a domain gap vs real household occlusion patterns",
      ],
    },
  },

  {
    slug: "genetic-algorithm-hyperparameter-finder",
    title: "Genetic Algorithm Hyperparameter Tuning Framework",
    summary:
      "Reusable genetic algorithm framework for hyperparameter tuning across scikit-learn models using tournament selection, crossover/mutation, elitism, and constraint-aware handling of invalid configurations.",

    tags: [
      "Genetic Algorithms",
      "Hyperparameter Tuning",
      "Optimization",
      "scikit-learn",
      "Cross-Validation",
      "Python",
    ],

    category: "ML",
    featured: true,

    overview: {
      description:
        "A general-purpose genetic algorithm (GA) hyperparameter tuning framework implemented in Python. Evolves a population of candidate hyperparameter dictionaries over generations using tournament selection, uniform crossover, mutation, and elitism. Fitness is computed via 5-fold cross-validation with configurable scoring and parallelism (n_jobs). Includes a constraint-aware subclass for Logistic Regression to enforce compatible solver/penalty combinations.",
      purpose:
        "Explore GA as a practical alternative when grid search is too expensive, while keeping the tuner reusable across model families and robust to incompatible hyperparameter dependencies.",
    },

    role: {
      built: [
        "GA engine: initialization, fitness scoring, tournament selection, crossover, mutation, elitism, and history tracking",
        "Model-agnostic search spaces defined per estimator (tree / linear / kernel / ensemble)",
        "Fitness evaluation via cross_val_score with configurable CV folds and scoring metric",
        "Constraint-aware tuning for Logistic Regression (penalty→solver compatibility enforced during init/crossover/mutation)",
        "Experiment harness to compare GA vs GridSearchCV vs RandomizedSearchCV under similar evaluation budgets",
      ],
      owned: [
        "Core GA implementation + reusable API design (scikit-learn style class wrapper)",
        "Constraint-handling strategy for dependent hyperparameters (Logistic Regression)",
        "Fair-budget comparison methodology (iterations aligned across tuners)",
        "Results synthesis: accuracy/runtime impact and failure cases (where grid search became infeasible)",
      ],
    },

    technicalHighlights: {
      architecture: [
        "Reusable estimator-style GA tuner (parameter-space in, best_params_/best_estimator_ out)",
        "Fitness computed with 5-fold CV; optional parallelism via n_jobs",
        "History tracking per generation (best/avg fitness + best params) for analysis and debugging",
      ],
      algorithms: [
        "Tournament selection for parent choice",
        "Uniform crossover (per-parameter mixing)",
        "Mutation by resampling from the original search space",
        "Elitism to preserve the best individual across generations",
        "Constraint-aware GA variant for Logistic Regression to avoid invalid solver/penalty combos",
      ],
      optimization: [
        "Comparable-budget evaluation (random search iterations aligned with pop_size × generations)",
        "Parallel-capable fitness scoring (n_jobs) to reduce wall-clock time on multi-core machines",
      ],
    },

    techStack: ["Python", "scikit-learn", "NumPy", "pandas", "Jupyter"],

    results: {
      achievements: [
        "Decision Tree: GA reached 0.9569 accuracy in 9.39s vs Grid Search 0.9692 in 1585.29s",
        "SVM: GA reached 0.9789 accuracy in 1.78s vs Grid Search 0.9824 in 111.00s",
        "Logistic Regression: GA matched Grid Search at 0.9780 accuracy (9.94s vs 212.77s)",
        "Random Forest: GA achieved 0.9708 accuracy (grid search not completed after >2 days)",
      ],
      learnings: [
        "GA can be a strong tradeoff when grid search is prohibitively slow but you still want guided exploration",
        "Small accuracy differences often cost orders of magnitude more runtime; the right tuner depends on constraints",
        "Constraint handling is essential for reusable tuners (dependent hyperparameters otherwise waste most evaluations)",
      ],
      tradeoffs: [
        "GA runtime can exceed randomized search for similar accuracy, depending on population/generation settings",
        "GA introduces its own hyperparameters (population size, mutation rate, crossover probability) that influence outcomes",
        "Some model spaces remain expensive to evaluate because the fitness function is CV itself",
      ],
    },
  },

  {
    slug: "ai-scheduling-hard-constraints",
    title: "AI Scheduling for City Soccer Field Allocation",
    summary:
      "Python scheduling system for city-wide soccer games/practices under dense constraints and weighted preferences using a hybrid Genetic Algorithm + AND/OR-tree search that minimizes penalty to reach feasible, high-quality schedules.",

    tags: [
      "Constraint Satisfaction",
      "AI Search",
      "Scheduling",
      "Genetic Algorithms",
      "AND/OR Trees",
      "Optimization",
      "Penalty Functions",
    ],

    category: "ML",
    featured: true,

    overview: {
      description:
        "AI scheduling system that assigns soccer games and practices across limited weekly field time slots. The problem includes capacity limits, incompatibilities, pre-assignments, multi-day linked slots, and division constraints, plus soft preferences like requested times, minimum slot usage, and paired-event requirements. The solver treats constraint violations as penalty and searches for schedules that minimize total cost (targeting 0 for feasibility) while improving preference satisfaction.",
      purpose:
        "Build a practical optimizer for a real-world scheduling CSP/optimization problem, combining evolutionary exploration with symbolic search to escape local minima and drive penalty toward feasible solutions.",
    },

    role: {
      built: [
        "Team-built parser and internal data structures to load structured scheduling inputs",
        "Hybrid solver combining Genetic Algorithm search with AND/OR-tree expansion to refine solutions",
        "Penalty function encoding hard constraints (as penalty terms) and weighted soft constraints",
        "Search operators to mutate/repair schedules while reducing penalty and improving preference fit",
      ],
      owned: [
        "Soft constraint modeling + weighting strategy (preference satisfaction, minimum slot use, paired events, etc.)",
        "GA design (representation, mutation, selection pressure) and AND/OR-tree integration for schedule refinement",
        "Scoring/optimization logic: penalty-driven objective and convergence behavior",
        "Most of the solver logic end-to-end (everything except the parser and the hard-constraint definitions)",
      ],
    },

    technicalHighlights: {
      architecture: [
        "Schedule represented as an assignment over games/practices → time slots across a weekly horizon",
        "Objective function built around penalty minimization (hard constraints drive feasibility; soft constraints improve quality)",
        "Hybrid pipeline: GA generates candidate schedules; AND/OR-tree search expands/repairs candidates to reduce penalty",
      ],
      algorithms: [
        "Genetic Algorithm operating over full schedule assignments",
        "AND/OR-tree search used to refine partial/poor assignments into lower-penalty schedules",
        "Penalty-based evaluation combining capacity, incompatibility, preassignment, linked-slot constraints + soft preferences",
      ],
      failureHandling: [
        "Penalty-driven validity: infeasible schedules receive large costs and are pushed out by selection pressure",
        "Repair-oriented mutations to recover from high-penalty local minima during GA evolution",
      ],
      optimization: [
        "Weighted penalties to prioritize feasibility first, then preference optimization",
        "Hybrid search to balance global exploration (GA) with structured refinement (AND/OR-tree)",
      ],
    },

    techStack: ["Python"],

    results: {
      achievements: [
        "Generated schedules that minimize constraint penalties toward feasible solutions while optimizing preference quality",
        "Handled dense real-world constraints (capacity, incompatibility, pre-assignments, multi-day links, division rules)",
        "Demonstrated that combining GA exploration with symbolic refinement improves convergence vs GA-only search",
      ],
      learnings: [
        "Penalty design and weighting dominate solver behavior; small weight changes can reshape convergence",
        "Pure evolutionary search can stall under dense constraints without a structured repair/refinement mechanism",
        "Hybridizing search methods is often worth the complexity when feasibility is hard to reach",
      ],
      tradeoffs: [
        "Penalty-based feasibility is flexible but requires careful tuning to avoid ‘almost-feasible’ plateaus",
        "Hybrid GA + AND/OR increases implementation complexity and runtime cost",
        "Optimization targets high-quality feasible schedules rather than provable global optimality",
      ],
    },
  },

  {
    slug: "raspberry-pi-bare-metal",
    title: "Raspberry Pi Bare-Metal Systems Programming (AArch64)",
    summary:
      "Bare-metal Raspberry Pi programs in C and AArch64 assembly: boot/runtime init, GPIO control, interrupts, timers, and serial UART debugging without an operating system.",

    tags: [
      "Embedded Systems",
      "Bare-Metal Programming",
      "AArch64",
      "ARM Assembly",
      "GPIO",
      "Interrupts",
      "UART",
      "Low-Level Systems",
    ],

    category: "Embedded",
    featured: false,

    overview: {
      description:
        "A collection of bare-metal Raspberry Pi programs that boot directly on hardware with no OS. Implemented (and extended) startup/runtime code, controlled GPIO, handled interrupts via exception vectors, and built small demos (LED patterns, input handling, timer-driven behaviors) with UART-based debugging.",
      purpose:
        "Build practical intuition for hardware–software interaction by programming the Pi at the register level: initialization, exception vectors, device I/O, timing, and debugging without OS tooling.",
    },

    role: {
      built: [
        "Bare-metal boot and runtime initialization (provided starter + custom extensions)",
        "GPIO control for LED output and input devices",
        "Interrupt handling via exception vector setup and ISRs",
        "Timer-driven and interrupt-driven demos (patterns, state changes, input response)",
        "Serial UART output for debugging and observability",
      ],
      owned: [
        "AArch64 + C integration for low-level runtime behavior and device control",
        "Memory-mapped I/O register configuration for GPIO/UART",
        "Interrupt service routines (ISRs) and state-machine style control flow",
        "UART-based debugging workflow for bare-metal development",
      ],
    },

    technicalHighlights: {
      architecture: [
        "Bare-metal execution: no OS, minimal runtime, direct hardware control",
        "Memory-mapped I/O for GPIO and UART",
        "Interrupt-driven control flow using exception vectors (plus timer-based behaviors)",
        "State-machine logic to coordinate LED/input behaviors deterministically",
      ],
      algorithms: [
        "Interrupt-driven state transitions from input events",
        "Timer-based scheduling for periodic behaviors",
        "Deterministic sequencing for patterns and timing",
      ],
      failureHandling: [
        "Interrupt masking/unmasking to avoid unsafe re-entrancy",
        "Careful state transitions to avoid undefined hardware behavior",
      ],
      optimization: [
        "Interrupt-driven design to avoid constant polling where appropriate",
        "Small footprint and low overhead by staying bare-metal",
      ],
    },

    techStack: [
      "C",
      "AArch64 Assembly",
      "Raspberry Pi",
      "Cross-Compilation Toolchain",
    ],

    results: {
      achievements: [
        "Booted and ran custom bare-metal code on Raspberry Pi hardware",
        "Implemented GPIO control and interrupt-driven input handling without an OS",
        "Used UART for practical debugging/visibility in a constrained bare-metal environment",
      ],
      learnings: [
        "How exception vectors, ISRs, and device registers interact at the CPU level",
        "Bare-metal timing/debugging requires building your own observability primitives",
        "Low-level work demands strict discipline around state, timing, and side effects",
      ],
      tradeoffs: [
        "Optimized for learning and control over portability",
        "Accepted higher development overhead in exchange for full-stack hardware visibility",
        "Kept demos small and deterministic rather than building complex drivers/abstractions",
      ],
    },
  },

  {
    slug: "fullstack-restaurant-system",
    title: "Full-Stack Restaurant Management System",
    summary:
      "Full-stack restaurant operations platform with JWT auth (stored in cookies), 5-level role-based permissions, and a MySQL-backed backend. Dockerized deployment with React + Node/Express + Nginx.",

    tags: [
      "Full-Stack Development",
      "Backend APIs",
      "Authentication",
      "RBAC",
      "MySQL",
      "Docker",
      "React",
      "Node.js",
      "Express",
      "Nginx",
    ],

    category: "Full-Stack",
    featured: false,

    overview: {
      description:
        "A full-stack restaurant management system supporting customer accounts and internal staff operations. Built with a React frontend, Node.js/Express REST API, and a real MySQL database. Implements secure authentication with JWT stored in cookies and role-based access control across five permission levels (customer, employee, admin, manager + one additional internal level). Includes full CRUD workflows across core entities and SQL usage beyond basics (joins/unions, inserts/updates/deletes).",
      purpose:
        "Practice end-to-end web engineering: API design, secure auth, database-backed state, permission boundaries, and reproducible deployment with Docker.",
    },

    role: {
      built: [
        "React frontend with routed views, forms, and role-aware UI behaviors",
        "Express REST API with protected routes and permission checks",
        "JWT authentication stored in cookies + password hashing (bcrypt)",
        "MySQL-backed data layer with CRUD operations and more advanced SQL queries (joins/unions)",
        "Dockerized deployment (frontend served by Nginx; backend + DB orchestrated via Compose)",
      ],
      owned: [
        "End-to-end full stack integration (React ↔ API ↔ MySQL) including auth and role gating",
        "RBAC implementation for 5 permission levels with route-level enforcement",
        "SQL query implementation covering required operations (create/insert, update, delete, joins/unions)",
        "Deployment workflow using Docker images + env-driven config",
      ],
    },

    technicalHighlights: {
      architecture: [
        "Client–server architecture: React frontend + Express REST API",
        "MySQL database as system of record for restaurant entities and workflows",
        "JWT stored in cookies for session persistence and protected API access",
        "Docker Compose orchestration; Nginx serves production frontend build",
      ],
      algorithms: [
        "RBAC checks enforced per route (permission-level gating)",
        "Password hashing via bcrypt; token verification on protected endpoints",
      ],
      optimization: [
        "Clear separation of concerns: UI, API routing, and database access",
        "Reusable endpoints and modular backend structure",
        "Validation on both client and server to reduce invalid requests",
      ],
    },

    techStack: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Docker",
      "Nginx",
    ],

    results: {
      achievements: [
        "Implemented a complete restaurant management app with secure auth + role-based permissions",
        "Connected to a real MySQL database and implemented full CRUD plus joins/unions as part of required operations",
        "Containerized frontend/backend/DB for consistent local setup and deployment-style execution",
      ],
      learnings: [
        "Auth correctness is mostly about edge cases: cookie handling, token expiry, and route protection consistency",
        "RBAC becomes much easier to maintain when permissions are centralized and enforced at the API boundary",
        "Schema/query choices directly shape feature velocity and complexity",
      ],
      tradeoffs: [
        "Used cookie-stored JWTs for straightforward session handling instead of OAuth or a full identity provider",
        "Prioritized end-to-end correctness and feature completeness over advanced frontend performance optimization",
        "Kept DB constraints pragmatic rather than exhaustively modeling every invariant at the schema layer",
      ],
    },
  },
];

export function getFeaturedProjects(): Project[] {
  // Return featured projects in the exact order specified
  const featuredOrder = [
    "distributed-chat-system",
    "occluded-pet-detection",
    "genetic-algorithm-hyperparameter-finder",
    "ai-scheduling-hard-constraints",
  ];

  return featuredOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined && p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectNavigation(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
