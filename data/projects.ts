export type ProjectCategory = "Distributed" | "ML" | "Embedded" | "Full-Stack" | "Systems" | "Frontend";

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

// Sources, publication boundaries, and follow-up questions:
// docs/PORTFOLIO-CONTENT-REVIEW.md.
export const projects: Project[] = [
  {
    slug: "distributed-chat-system",
    title: "IRC-HAT — Distributed IRC-Style Chat System",
    summary: "Java NIO terminal chat system with capacity-aware server discovery, peer forwarding, file-backed message history, and addressing-replica coordination.",
    tags: [
      "Distributed Systems",
      "Java NIO",
      "TCP",
      "Replication",
      "File Persistence",
      "Docker"
    ],
    category: "Distributed",
    featured: true,
    overview: {
      description: "Course-project chat application with client, chat-server, and addressing-server processes communicating through custom newline-delimited JSON over TCP. Clients discover a server, register a display name, exchange messages, and request recent history.",
      purpose: "Explore non-blocking networking, replicated registries, concurrent message handling, and local persistence in a multi-process system."
    },
    role: {
      built: [
        "Selector-based networking with per-connection framing and queued chat output that retains partially written buffers.",
        "Typed chat/control messages, registration and discovery handlers, replica acknowledgment tracking, and retry watchdogs.",
        "Shared-room broadcast, cyclic successor peer forwarding, duplicate-ID tracking, and indexed file-backed history."
      ],
      owned: [
        "Application protocol and connection-state handling across the client, chat server, and addressing-server integration.",
        "Message persistence, history lookup, reconnect/requeue paths, manual diagnostic harnesses, and technical documentation."
      ]
    },
    technicalHighlights: {
      architecture: [
        "Three process types and a shared library, organized as four included Gradle modules.",
        "Chat-server selector loops cooperate with eight message workers; terminal clients use four workers.",
        "Append-only JSON-line logs use byte-offset metadata, SHA-256 hashes, and timestamp indexes."
      ],
      algorithms: [
        "Capacity-aware discovery selects an active non-full advertised server.",
        "Live messages forward to one successor peer in cyclic PID order.",
        "Addressing replicas implement tracked registration ACKs, periodic registry refresh, and Bully-style election logic."
      ],
      failureHandling: [
        "Queued partial writes, selected EOF cleanup/reconnect paths, and retry watchdogs handle specific transport failures.",
        "Primary adoption and full-log transfer have documented defects; election and reconnect mechanisms do not establish complete or lossless failover."
      ]
    },
    techStack: [
      "Java",
      "Java NIO",
      "TCP / JSON",
      "Jackson",
      "JLine",
      "Gradle",
      "Docker / Docker Compose"
    ],
    results: {
      achievements: [
        "Implemented custom networking, protocol handling, peer forwarding, and indexed local message persistence.",
        "Added client pending-send display, recent-history retrieval, and manual networking diagnostics."
      ],
      learnings: [
        "Non-blocking I/O requires explicit handling of framing, partial writes, and connection lifecycle.",
        "Registry acknowledgments and sender echoes provide different guarantees; neither proves recipient delivery."
      ],
      tradeoffs: [
        "History uses wall-clock timestamps and receipt order; vector-clock ordering is not implemented.",
        "Current build, container execution, stress-test scale, and automated test passes are unverified."
      ]
    }
  },

  {
    slug: "occluded-pet-detection",
    title: "Occluded Pet Detection in Domestic Environments",
    summary:
      "Studied pet detection under partial visibility using synthetic ADE20K household-object occlusions; evaluated YOLOv8n and EfficientDet-D0 on clean and real-occlusion images, with partial DETR integration.",

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
        "Evaluate whether synthetic occlusion augmentation transfers to real-world indoor occlusions, comparing retained detector results while documenting experiment and training-lineage limitations.",
    },

    role: {
      built: [
        "End-to-end training + evaluation pipeline (data prep, training runs, metrics, and qualitative analysis)",
        "Synthetic occlusion generator: overlay ADE20K segmented indoor objects onto pet images with opacity blending",
        "Dataset engineering: derive bounding boxes from segmentation masks and unify cat/dog breeds into a single “Pet” class",
        "Real occluded indoor test set: collection + manual annotation + evaluation scripts",
      ],
      owned: [
        "Clean versus synthetic-augmentation experiment design and analysis of retained training/evaluation artifacts",
        "Occlusion synthesis with object filtering, size/placement heuristics, and softened alpha compositing; requested occluder ratios are not measured coverage",
        "Cross-model evaluation and analysis for YOLOv8n and EfficientDet-D0, alongside partial DETR dataset/training integration",
        "Reporting: quantitative mAP tables + qualitative examples on real occlusions",
      ],
    },

    technicalHighlights: {
      architecture: [
        "YOLOv8 trained with pretrained weights (single-stage detector via Ultralytics)",
        "EfficientDet-D0 with pretrained initialization (EfficientNet backbone + BiFPN multi-scale fusion)",
        "Partial DETR integration with custom dataset/collation code; completed fine-tuning and evaluation provenance remain unestablished",
        "No architecture changes applied to isolate the effect of occlusion-aware training",
      ],
      algorithms: [
        "COCO-style evaluation on the real occluded set: mAP@0.50 and mAP@[0.50:0.95] (plus precision/recall where applicable)",
        "Synthetic occlusion augmentation: segmented ADE20K objects with heuristic scaling and placement; actual covered foreground was not measured",
        "Indoor-object filtering with some leakage due to large category volume (pragmatic filtering)",
        "Annotation consistency: boxes derived directly from Oxford-IIIT segmentation masks",
      ],
      optimization: [
        "Pretrained initialization to stabilize convergence under limited compute budgets",
        "Used clean and synthetic-augmented training comparisons to investigate transfer; full EfficientDet schedule provenance remains unresolved",
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
      ],
      learnings: [
        "Synthetic occlusion augmentation can improve clean/validation metrics but may not transfer to real occlusion geometry/lighting",
        "YOLOv8 was more robust to partial cues (e.g., faces/ears) even without explicit occlusion-aware training",
        "EfficientDet improved slightly with occlusion-aware training on the real occluded set, but absolute localization quality remained low",
        "Completed DETR results and full EfficientDet checkpoint training lineage remain unresolved",
      ],
      tradeoffs: [
        "Focused on synthetic-augmentation transfer; repeated-seed studies, severity sweeps, and statistical significance are not established",
        "Used a small real occluded test set for realism, trading off statistical generalization; recorded metrics were not rerun during the source investigation",
        "Synthetic occlusions provide controlled coverage but introduce a domain gap vs real household occlusion patterns",
      ],
    },
  },

  {
    slug: "genetic-algorithm-hyperparameter-finder",
    title: "Genetic Algorithm Hyperparameter Tuning Framework",
    summary: "Custom Python evolutionary optimizer for scikit-learn classifier hyperparameters, with cross-validation fitness, tournament selection, crossover, mutation, and logistic-regression compatibility checks.",
    tags: [
      "Genetic Algorithms",
      "Hyperparameter Tuning",
      "scikit-learn",
      "Python",
      "Cross-Validation"
    ],
    category: "ML",
    featured: true,
    overview: {
      description: "Research prototype for classifier hyperparameter search, with notebook experiments comparing a custom genetic algorithm against scikit-learn grid, randomized, and halving-grid searches.",
      purpose: "Explore reusable evolutionary search policies and dependent parameter constraints while examining accuracy and runtime tradeoffs."
    },
    role: {
      built: [
        "Dictionary-based candidate generation, cross-validation fitness, tournament selection, uniform crossover, single-parameter mutation, and global-best elitism.",
        "Logistic-regression specialization that maintains compatible penalty/solver pairs.",
        "Generation history, estimator refitting, timing orchestration, plots, and a technical comparison report."
      ],
      owned: [
        "Evolutionary search policy, parameter-space handling, compatibility logic, and experiment orchestration.",
        "Data preparation and result analysis using third-party estimators, cross-validation, and baseline search implementations."
      ]
    },
    technicalHighlights: {
      architecture: [
        "In-memory data preparation feeds an estimator and parameter space into the GA or library baseline.",
        "The reusable run(X, y) interface exposes best parameters, score, history, and a refitted model; it is not a complete sklearn search-CV implementation."
      ],
      algorithms: [
        "Tournament selection, uniform per-parameter crossover, one-field mutation, and preservation of the global-best elite.",
        "Logistic solver/penalty constraints are maintained during candidate initialization, crossover, mutation, and evaluation."
      ],
      failureHandling: [
        "Selected invalid configurations and caught logistic evaluation failures receive negative-infinity fitness.",
        "Candidate generation rejects unsupported domains and mutation handles singleton domains."
      ]
    },
    techStack: [
      "Python",
      "scikit-learn",
      "NumPy",
      "pandas",
      "Jupyter",
      "Matplotlib",
      "seaborn"
    ],
    results: {
      achievements: [
        "Implemented a configurable evolutionary optimizer and model-specific parameter spaces.",
        "Recorded classifier comparisons, generation curves, and a technical report."
      ],
      learnings: [
        "Dependent hyperparameters need explicit compatibility policies.",
        "Search budgets, parallelism, preprocessing, and run provenance affect the validity of runtime and accuracy comparisons."
      ],
      tradeoffs: [
        "Saved notebook output and current code have mixed dataset provenance; no clean sequential reproduction is established.",
        "Budgets and concurrency differ across methods, and preprocessing introduces leakage risk; no general GA speedup is claimed."
      ]
    }
  },

  {
    slug: "ai-scheduling-hard-constraints",
    title: "Gengar — Soccer Scheduling Search Prototype",
    summary: "Python course-project scheduler combining recursive OR-tree search with genetic crossover and mutation for a simulated soccer field-time allocation problem.",
    tags: [
      "Constraint Satisfaction",
      "AI Search",
      "Scheduling",
      "Genetic Algorithms",
      "OR-Tree Search",
      "Python"
    ],
    category: "ML",
    featured: true,
    overview: {
      description: "Command-line research prototype for a fabricated Calgary soccer scheduling scenario. Sectioned text inputs describe recurring games, practices, field-time capacities, restrictions, and preferences.",
      purpose: "Explore constructive backtracking and population-based search for constrained scheduling. The implementation is incomplete and is not an operational municipal scheduler."
    },
    role: {
      built: [
        "Scheduling input parsing, half-hour time encoding, mutable capacity state, and assignment/unassignment operations.",
        "Recursive OR-tree expansion, state copying, randomized ordering, and parent-guided schedule completion.",
        "Genetic population selection, crossover, mutation, weighted objective wiring, and diagnostic output."
      ],
      owned: [
        "Custom scheduling representation and search integration using Python standard-library primitives.",
        "Constraint checks, active pair/minimum-fill scoring, and debugging scenarios."
      ]
    },
    technicalHighlights: {
      architecture: [
        "Single-process CLI with in-memory schedules and recursive search states.",
        "Capacity rows track game and practice availability independently."
      ],
      algorithms: [
        "Constructive OR-tree backtracking initializes candidates and completes crossover children.",
        "Selection retains low-cost population members; mutation attempts penalty-proportional event reassignment.",
        "Pair and minimum-fill objective routines are active; preference and section-difference routines remain zero-return placeholders."
      ],
      failureHandling: [
        "Assignment helpers check selected capacity, incompatibility, and placement restrictions.",
        "Parser, mutation, and constraint-integration defects prevent a claim of complete feasibility or reliable full CLI solves."
      ]
    },
    techStack: [
      "Python",
      "argparse",
      "Standard-library collections / copying / random"
    ],
    results: {
      achievements: [
        "Implemented a custom hybrid search prototype, scheduling representation, and diagnostic harnesses.",
        "Integrated constructive search with population selection and parent-guided crossover."
      ],
      learnings: [
        "Representation consistency and complete objective functions are essential to meaningful schedule evaluation.",
        "Proposal algorithms and supplied input scale do not establish successful execution or optimality."
      ],
      tradeoffs: [
        "No validated final schedule, successful large solve, measured convergence improvement, or optimality result is established.",
        "AND-tree search appears in proposal context; the implementation uses OR-tree search."
      ]
    }
  },

  {
    slug: "raspberry-pi-bare-metal",
    title: "Bare-Metal Raspberry Pi SNES Controller Integration",
    summary: "C firmware polls an SNES controller through Raspberry Pi 4 GPIO and sends changed button states over Mini UART to a Python/Pygame slide-puzzle integration.",
    tags: [
      "Embedded Systems",
      "Bare-Metal Programming",
      "C",
      "GPIO",
      "UART",
      "Python"
    ],
    category: "Embedded",
    featured: false,
    overview: {
      description: "Freestanding Raspberry Pi 4 firmware reads a physical SNES controller without an OS. Host-side Python decodes serial button messages and dispatches actions in an existing Pygame slide puzzle.",
      purpose: "Connect register-level controller input with a desktop application through a small serial protocol."
    },
    role: {
      built: [
        "SNES latch/clock/data polling through volatile BCM2711 MMIO register access.",
        "Sixteen active-low samples converted into an active-high bitmask, with UART output on state changes.",
        "Python/pyserial message parsing, simultaneous-button decoding, and eight game-action mappings."
      ],
      owned: [
        "Project-specific controller polling and serial integration logic.",
        "Host input dispatch integrated with an existing keyboard/mouse game loop."
      ]
    },
    technicalHighlights: {
      architecture: [
        "SNES controller → GPIO polling → hexadecimal Mini UART messages → Python parser → Pygame actions.",
        "The supplied AArch64 environment provides startup, linker, UART, timer, and cross-compilation support; independent authorship of that scaffolding is unconfirmed."
      ],
      algorithms: [
        "Sixteen-bit controller sampling with latch and clock signaling.",
        "Changed-state filtering suppresses redundant serial messages.",
        "Controller and UART paths use polling and busy waits."
      ],
      failureHandling: [
        "Host scripts catch serial-open errors and reject selected malformed hexadecimal messages.",
        "Movement is checked before invoking existing puzzle behavior."
      ]
    },
    techStack: [
      "C",
      "Raspberry Pi 4 / BCM2711",
      "AArch64 assembly environment",
      "GPIO",
      "Mini UART",
      "Python",
      "pyserial",
      "Pygame",
      "Make"
    ],
    results: {
      achievements: [
        "Implemented project-specific SNES polling, button decoding, and serial-to-game action dispatch.",
        "Integrated controller input with an existing 4×4 slide puzzle."
      ],
      learnings: [
        "Register-level I/O and serial integration require explicit timing and data-format decisions."
      ],
      tradeoffs: [
        "Al Sweigart’s third-party puzzle provides board management, animations, reset, and solve behavior.",
        "Successful hardware demonstrations, QEMU/JTAG use, and measured input latency are unverified; no interrupt implementation is claimed."
      ]
    }
  },

  {
    slug: "fullstack-restaurant-system",
    title: "Full-Stack Restaurant Management System",
    summary: "React, Express, and MySQL restaurant application with customer/account workflows, reservations, menu/location views, and special-event inquiry intake.",
    tags: [
      "Full-Stack Development",
      "React",
      "Express",
      "MySQL",
      "JWT Cookies",
      "Docker"
    ],
    category: "Full-Stack",
    featured: false,
    overview: {
      description: "Restaurant-oriented web project integrating React screens, an Express API, and direct MySQL queries. Implemented areas include customer records, accounts, menu/location views, reservations, and special-event inquiries.",
      purpose: "Practice relational modeling and application integration through account and booking workflows, adapting tutorial patterns alongside custom domain logic."
    },
    role: {
      built: [
        "React routes, account forms, shared Axios services, authentication context, and booking interfaces.",
        "Express route/controller/query layers for customer CRUD, account lifecycle, reservations, and inquiries.",
        "Password hashing, JWT cookie login/logout, and selected account-handler clearance checks.",
        "Relational schema and Docker/Compose/Nginx configuration."
      ],
      owned: [
        "Application adaptation, UI/API integration, direct SQL queries, and domain schema.",
        "Reservation editing/deletion and customer/employee account orchestration."
      ]
    },
    technicalHighlights: {
      architecture: [
        "React/Router and shared Axios services communicate with Express routers, controllers, and mysql2 query modules.",
        "The schema uses account specialization, composite keys, and foreign-key cascades.",
        "JWTs use an HTTP-only cookie; browser account metadata is separate from server authorization."
      ],
      algorithms: [
        "Selected account handlers allow self-access or employee clearance thresholds.",
        "Six numeric clearance levels (0–5) are documented; authorization is partial across business APIs.",
        "Reservations use customer/location/date values to locate composite keys."
      ],
      failureHandling: [
        "Selected callback errors and not-found states map to API responses and frontend feedback.",
        "Multi-table writes lack transactions, and container wiring has unresolved defects."
      ]
    },
    techStack: [
      "JavaScript",
      "React",
      "React Router",
      "Node.js",
      "Express",
      "MySQL / mysql2",
      "Axios",
      "bcryptjs",
      "JWT",
      "Docker / Docker Compose",
      "Nginx"
    ],
    results: {
      achievements: [
        "Integrated customer/account, reservation, and inquiry workflows with a relational data layer.",
        "Added setup and permission documentation and container configuration."
      ],
      learnings: [
        "Account-level permission checks must be distinguished from authorization across every business API.",
        "Database date types, transactions, and deployment wiring directly affect workflow correctness."
      ],
      tradeoffs: [
        "Orders, rewards, waitlist, and availability are schema-only concepts; inventory and payment workflows are not established.",
        "Tutorial sources include BezKoder, Lama Dev, and freeCodeCamp. Current runtime success, production deployment, and secure-session guarantees are unverified."
      ]
    }
  },

  {
    slug: "j-minus-minus-mips-compiler",
    title: "J-- to MIPS Compiler",
    summary: "Python compiler for a small imperative language, with ANTLR4 grammars, AST shaping, four semantic passes, and MIPS code generation.",
    tags: [
      "Python",
      "ANTLR4",
      "Compilers",
      "MIPS",
      "Semantic Analysis"
    ],
    category: "Systems",
    featured: false,
    overview: {
      description: "University of Calgary CPSC 411 term project developed from January to April 2026. A command-line driver reads J-- source, shapes an abstract syntax tree, performs semantic analysis, and emits MIPS assembly.",
      purpose: "Implement the major stages of a compiler, from language grammar and name resolution to stack layout and target-code emission."
    },
    role: {
      built: [
        "Custom lexer/parser grammars for declarations, functions, expressions, calls, control flow, and returns.",
        "AST-shaping rules and unary-minus handling for signed integer literals.",
        "Four semantic passes for declarations, scope/reference resolution, types, and structural validation.",
        "MIPS layout and emission for globals, stack frames, calls/returns, short-circuit logic, and runtime-error paths."
      ],
      owned: [
        "Language rules, semantic policies, target layout, code emission, and compiler integration.",
        "Diagnostics, build selection/fallbacks, and usage documentation, using ANTLR and external course AST support."
      ]
    },
    technicalHighlights: {
      architecture: [
        "Source → ANTLR recognizers → configured course AST shaper → four semantic traversals → target layout → buffered MIPS output.",
        "Resolved declaration references connect semantic analysis to storage layout and code generation."
      ],
      algorithms: [
        "Scope stacks and type checks validate references, arguments, conditions, returns, and break nesting.",
        "A custom stack calling convention preserves frame/return registers and expression temporaries.",
        "Label generation supports short-circuit operators, nested loops, and break targets."
      ],
      failureHandling: [
        "Parser and semantic diagnostics stop selected invalid programs before output.",
        "Generated paths handle zero divisors and non-void function fallthrough; execution correctness remains unverified."
      ]
    },
    techStack: [
      "Python",
      "ANTLR4",
      "MIPS assembly",
      "Make",
      "cpsc411 AST support"
    ],
    results: {
      achievements: [
        "Implemented compiler stages including four semantic passes and six generated runtime wrappers.",
        "Connected semantic annotations to custom stack layout and recursive target emission."
      ],
      learnings: [
        "Compiler stages need consistent symbol, type, and storage annotations."
      ],
      tradeoffs: [
        "Missing external cpsc411 support blocked full pipeline execution during the source investigation; simulator and arithmetic execution are unverified.",
        "ANTLR supplies generated recognizers and the course library supplies AST infrastructure; no optimizer or general register allocator is implemented."
      ]
    }
  },

  {
    slug: "climate-control-simulation",
    title: "Climate Control Simulation",
    summary: "Java Swing desktop simulation of greenhouse temperature, humidity, and soil moisture, with independent controller loops, live status, and saved run histories.",
    tags: [
      "Java",
      "Swing",
      "Concurrency",
      "Simulation",
      "File I/O"
    ],
    category: "Systems",
    featured: false,
    overview: {
      description: "Local desktop simulation with configurable targets, current values, environmental/actuator rates, and sampling intervals for three environmental subsystems.",
      purpose: "Explore object-oriented control modeling, event-driven desktop interfaces, concurrent simulation loops, and local result persistence."
    },
    role: {
      built: [
        "Swing configuration forms, event handlers, and a live results view.",
        "Temperature, humidity, and soil-moisture controllers with heating, cooling, humidifier, and sprinkler domain objects.",
        "Text-file run logging, named saved histories, a saved-path index, and previous-result viewing."
      ],
      owned: [
        "Application composition, controller/domain logic, GUI integration, and local persistence using standard Java APIs.",
        "Numeric-input parsing and JavaDoc-style source documentation."
      ]
    },
    technicalHighlights: {
      architecture: [
        "Ten Java source files separate startup, view/persistence, orchestration, subsystem controllers, and actuators.",
        "Three Runnable controllers update environmental state independently; a coordinator loop presents results."
      ],
      algorithms: [
        "Target/deadband decisions activate or deactivate simulated actuators.",
        "Configurable sampling and minute/hour rate inputs drive environmental updates."
      ],
      failureHandling: [
        "Numeric parsing and selected file operations handle errors.",
        "Worker shutdown and shared-state synchronization have documented gaps; thread-safe execution is not established."
      ]
    },
    techStack: [
      "Java",
      "Swing",
      "AWT",
      "Runnable / Thread",
      "Java file I/O"
    ],
    results: {
      achievements: [
        "Implemented three simulated environmental subsystems with live status and file-based history.",
        "Separated UI events, control loops, and actuator state into dedicated classes."
      ],
      learnings: [
        "Independent simulation loops require explicit coordination of lifecycle, state visibility, and display updates."
      ],
      tradeoffs: [
        "This is a software simulation; physical sensors, greenhouse operation, and measured control performance are not established.",
        "Development dates, JDK version, and runtime test results are not supplied in the supporting analysis."
      ]
    }
  },

  {
    slug: "kiddoflix",
    title: "KiddoFlix — Parental-Control Interface Prototype",
    summary: "React interface prototype for parent/child profiles, catalog discovery, favorites, and parental-control settings, using MUI and browser-local persistence.",
    tags: [
      "React",
      "JavaScript",
      "MUI",
      "React Router",
      "localStorage",
      "UI Prototyping"
    ],
    category: "Frontend",
    featured: false,
    overview: {
      description: "Browser-based design concept with separate parent and child screens, a fixed show catalog, search, show details, profile personalization, and parental-control interactions.",
      purpose: "Explore entertainment discovery and parent-facing controls through an interactive frontend prototype."
    },
    role: {
      built: [
        "Nested React routes and parent/child layouts with MUI forms, cards, dialogs, and notifications.",
        "Catalog browsing, title/category search, favorites, profile-image previews, and keyboard interaction logic.",
        "Browser storage utilities for favorites, title restrictions, time-limit values, locks, and parent profile details."
      ],
      owned: [
        "Screen composition, route configuration, interaction handlers, and browser-storage integration.",
        "Prototype account-management dialogs and controls around the browser video element."
      ]
    },
    technicalHighlights: {
      architecture: [
        "Client-only React application with static catalog fixtures and localStorage persistence.",
        "Shared components and nested layouts organize profile selection, discovery, and parent settings."
      ],
      algorithms: [
        "Profile-keyed JSON storage suppresses duplicate favorites and restrictions.",
        "Custom focus state handles selected arrow-key, activation, and player interactions.",
        "Time controls convert hours/minutes into stored limits; actual usage accounting is not implemented."
      ],
      failureHandling: [
        "Forms implement selected format/confirmation checks and storage helpers log exceptions.",
        "Restriction filtering and lock checks are incomplete across entry points and do not establish access-control enforcement."
      ]
    },
    techStack: [
      "JavaScript / JSX",
      "React",
      "React Router",
      "MUI",
      "CSS",
      "localStorage",
      "FileReader",
      "HTML video"
    ],
    results: {
      achievements: [
        "Implemented parent/child discovery interfaces and browser-persisted personalization/settings.",
        "Composed reusable dialogs, profile controls, keyboard interactions, and custom video controls."
      ],
      learnings: [
        "Persisted settings, prototype feedback, and enforced account behavior have different implementation requirements."
      ],
      tradeoffs: [
        "No backend or real authentication/account service exists; account mutations and history include simulated behaviors.",
        "The referenced sample video is absent. Development dates, hosting, and successful build/browser playback are unverified."
      ]
    }
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
