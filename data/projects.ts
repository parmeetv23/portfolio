import { projectCaseStudies, type ProjectCaseStudy } from './project-case-studies';

export type ProjectCategory = "Distributed" | "ML" | "Embedded" | "Full-Stack" | "Systems" | "Frontend" | "Algorithms";

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
  caseStudy?: ProjectCaseStudy;
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
// Owner-selected first five; remaining application and systems projects follow.
export const projects: Project[] = [
  {
    slug: "distributed-chat-system",
    title: "Distributed Chat System",
    summary: "Java chat system with custom TCP networking, peer message replication, and a replicated discovery service that elects a new primary after failure.",
    tags: [
      "Distributed Systems",
      "Java NIO",
      "TCP",
      "Replication",
      "Leader Election"
    ],
    category: "Distributed",
    featured: true,
    overview: {
      description: "IRC-HAT separates peer-to-peer chat traffic from server discovery and coordination. Chat servers store and propagate messages; the addressing primary assigns clients to available servers and replicates membership records to addressing replicas.",
      purpose: "I implemented the TCP protocols, non-blocking connection handling, registry replication, and indexed message persistence across three process types."
    },
    role: {
      built: [
        "Java NIO selector loops, newline-delimited JSON framing, per-connection buffers, and queued partial writes for chat traffic.",
        "Replicated addressing registries with correlated acknowledgments, deferred registration replies, retries, and periodic refresh.",
        "Gossip-based peer forwarding, duplicate-ID tracking, and indexed file-backed chat history."
      ],
      owned: [
        "Application networking and distributed coordination across the client, chat server, addressing server, and shared protocol module.",
        "Peer heartbeat handling, Bully leader election, reconnection paths, and reproducible Docker/Compose builds and networking."
      ]
    },
    technicalHighlights: {
      architecture: [
        "Chat messages travel directly between clients and chat servers, then propagate among peers independently of addressing.",
        "The primary addressing server assigns process IDs and distributes membership records to chat servers and replicas.",
        "Selector-based I/O and worker dispatch separate socket readiness from message processing."
      ],
      algorithms: [
        "Capacity-aware assignment returns the first active, non-full server record and increments its advertised client count.",
        "Configurable gossip fan-out selects up to n available peers in cyclic PID order; unique message IDs identify repeats.",
        "Correlated replica acknowledgments coordinate tracked registrations; count broadcasts and replica refresh requests use separate paths.",
        "Bully leader election challenges higher-PID addressing processes and announces a new primary for reconnection and registry synchronization."
      ],
      failureHandling: [
        "Peer PING/PONG heartbeats support liveness checks and removal of unresponsive chat peers.",
        "Clients re-query addressing and re-register after a closed connection; initial registration requests history. Clients and chat servers discover the elected primary and reconnect; joining servers request peer logs."
      ]
    },
    techStack: [
      "Java", "Java NIO", "TCP", "JSON", "Jackson", "org.json",
      "JLine", "Gradle", "Docker", "Docker Compose"
    ],
    results: {
      achievements: [
        "Implemented three cooperating process types with custom networking, replicated registries, and peer message propagation.",
        "Built append-only chat logs with byte-offset and timestamp indexes, SHA-256 duplicate detection, and history retrieval."
      ],
      learnings: [
        "Peer propagation keeps live chat independent of registry synchronization; registration uses explicit acknowledgment coordination.",
        "Multiplexed I/O requires persistent framing state and explicit handling of partially written buffers."
      ],
      tradeoffs: [
        "Larger gossip fan-out adds propagation paths and network traffic; smaller values spread messages through more hops.",
        "File-backed history keeps storage local; rewriting its metadata index adds work to each append."
      ]
    }
  },

  {
    slug: "occluded-pet-detection",
    title: "Pet Detection Under Occlusion",
    summary: "A computer-vision pipeline that generates synthetic obstructions, trains pet detectors, and measures how their results transfer to naturally occluded animals.",

    tags: ["Computer Vision", "PyTorch", "Object Detection", "Data Augmentation", "COCO Evaluation"],

    category: "ML",
    featured: true,

    caseStudy: projectCaseStudies["occluded-pet-detection"],
    overview: {
      description: "I built an experiment around a practical detection problem: recognizing pets when furniture and other household objects hide part of the animal.",
      purpose: "My pipeline generates annotated training composites, integrates two detector architectures, and compares clean-image performance with a separately annotated real-occlusion collection.",
    },

    role: {
      "built": [
        "Trimap-to-box annotation conversion and ADE20K segmented-object synthesis.",
        "YOLO run configuration, EfficientDet data adapters, checkpoint diagnostics, and COCO evaluation.",
        "Two-checkpoint EfficientDet hard-NMS ensemble and recorded clean/real comparisons."
      ],
      "owned": [
        "Data preparation, synthesis, detector integration, and experiment reporting."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "Clean and combined training paths feed separate detector runs; held-out real images measure transfer.",
        "One pet class pools cats, dogs, and breeds; synthetic labels retain whole-pet extent."
      ],
      "algorithms": [
        "Object-mask filtering, area-guided placement, alpha compositing, and coordinate conversion.",
        "Hard NMS combines two EfficientDet checkpoints at IoU 0.55."
      ]
    },
    techStack: [
      "Python", "PyTorch", "Ultralytics YOLOv8n", "EfficientDet-D0", "effdet / timm",
      "Transformers / DETR", "NumPy", "OpenCV", "Pillow", "pycocotools", "Jupyter", "Matplotlib", "Kaggle GPU"
    ],

    results: {
      "achievements": [
        "Prepared 3,000 synthetic examples and a combined 6,312-image training manifest.",
        "Recorded mixed real-occlusion transfer on 74 images with 90 pet boxes."
      ],
      "learnings": [
        "Better clean-test AP did not imply better real-occlusion transfer."
      ],
      "tradeoffs": [
        "Requested occluder area does not measure covered foreground.",
        "DETR evaluation splits and full training lineage remain unresolved; final comparisons use YOLOv8n and EfficientDet-D0."
      ]
    }
  },

  {
    slug: "j-minus-minus-mips-compiler",
    title: "J-- to MIPS Compiler",
    summary: "A Python compiler that parses J-- programs, resolves names and types, and generates MIPS assembly with a custom stack calling convention.",
    tags: [
      "Python",
      "ANTLR4",
      "Compilers",
      "MIPS",
      "Semantic Analysis"
    ],
    category: "Systems",
    featured: true,
    caseStudy: projectCaseStudies["j-minus-minus-mips-compiler"],
    overview: {
      description: "I built the stages that turn a J-- source program into MIPS assembly: parsing, semantic analysis, storage layout, and code generation.",
      purpose: "The compiler carries resolved names and types into the backend, where they determine how variables, expressions, and function calls map to registers and stack storage."
    },
    role: {
      "built": [
        "ANTLR grammars, AST shaping, four semantic passes, and MIPS layout/emission.",
        "Custom stack calling convention, short-circuit control flow, and six generated runtime wrappers."
      ],
      "owned": [
        "Language rules, symbol/type analysis, target layout, emission, and compiler integration."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "Shaped AST annotations and declaration bindings feed storage layout and buffered assembly emission.",
        "ANTLR and cpsc411 supply recognizer/tree infrastructure."
      ],
      "algorithms": [
        "Global collection, scope/reference resolution, type propagation, and structural/literal validation.",
        "Stack temporaries preserve expression values across calls; labels and a break-target stack encode control flow."
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
      "achievements": [
        "Implemented source-to-assembly compiler stages and targeted diagnostics."
      ],
      "learnings": [
        "Semantic and storage annotations provide a stable contract between compiler stages."
      ],
      "tradeoffs": [
        "Return presence is supplemented by runtime fallthrough checks.",
        "The historical review lacked the external AST dependency for an end-to-end execution."
      ]
    }
  },

  {
    slug: "genetic-algorithm-hyperparameter-finder",
    title: "Genetic Algorithm Hyperparameter Search",
    summary: "A Python optimizer that evolves classifier settings through cross-validation, selection, crossover, and mutation while handling dependencies between parameters.",
    tags: [
      "Genetic Algorithms",
      "Hyperparameter Tuning",
      "scikit-learn",
      "Python",
      "Cross-Validation"
    ],
    category: "ML",
    featured: true,
    caseStudy: projectCaseStudies["genetic-algorithm-hyperparameter-finder"],
    overview: {
      description: "Exhaustive hyperparameter search grows expensive as options multiply. I implemented an evolutionary optimizer that scores a population of classifier settings and breeds candidates for the next generation.",
      purpose: "The search preserves its strongest candidate and handles model-specific dependencies, including logistic-regression penalties that restrict which solvers can be used."
    },
    role: {
      "built": [
        "Dictionary-based candidates, cross-validation fitness, tournament selection, uniform crossover, one-field mutation, and global-best elitism.",
        "Dependent logistic penalty/solver handling, generation history, and final estimator refit."
      ],
      "owned": [
        "Evolutionary policy, compatibility rules, and classifier experiment integration."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "Custom run(X, y) interface exposes selected parameters, fitness history, and a refitted estimator.",
        "scikit-learn supplies learners, cross-validation, metrics, and baseline searches."
      ],
      "algorithms": [
        "Uniform per-field crossover and single-field mutation; logistic mutations can also change a dependent solver.",
        "Invalid logistic candidates and selected evaluation failures receive negative-infinity fitness."
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
      "achievements": [
        "Implemented a configurable optimizer with model-specific parameter handling.",
        "Final-report SVC comparison records 0.7416 test accuracy for GA, grid, and randomized search."
      ],
      "learnings": [
        "Parameter dependencies belong in candidate generation and genetic operators."
      ],
      "tradeoffs": [
        "Unequal budgets and concurrency prevent a general speedup claim.",
        "Mixed notebook dataset state is separate from the identified final-report comparison."
      ]
    }
  },

  {
    slug: "ai-scheduling-hard-constraints",
    title: "Constraint-Based Soccer Scheduling",
    summary: "A Python scheduling prototype that combines backtracking and genetic search to assign recurring soccer games and practices under capacity and placement constraints.",
    tags: [
      "Constraint Satisfaction",
      "AI Search",
      "Scheduling",
      "Genetic Algorithms",
      "OR-Tree Search",
      "Python"
    ],
    category: "Algorithms",
    featured: true,
    caseStudy: projectCaseStudies["ai-scheduling-hard-constraints"],
    overview: {
      description: "The scheduler assigns recurring games and practices while tracking the capacity left in each time interval.",
      purpose: "I combined incremental backtracking with population search, using the same schedule-construction routine to create initial candidates and complete crossover children. The original project name is Gengar."
    },
    role: {
      "built": [
        "Sectioned input parsing, half-hour indexing, residual capacity state, and assignment/unassignment helpers.",
        "Recursive OR-tree construction, parent-guided crossover, population selection, and attempted penalty-guided mutation."
      ],
      "owned": [
        "Custom scheduling representation, constructive search, and genetic integration."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "In-memory partial schedules track game and practice capacities independently.",
        "Construction initializes populations and completes crossover children."
      ],
      "algorithms": [
        "Fixed next-event ordering, state copying, randomized child ordering, and recursive first-complete search.",
        "Pair/minimum scoring routines are wired; preference and section-difference terms are placeholders."
      ]
    },
    techStack: [
      "Python",
      "argparse",
      "Standard-library collections / copying / random"
    ],
    results: {
      "achievements": [
        "Implemented a hybrid constructive/genetic search prototype with diagnostic scenarios."
      ],
      "learnings": [
        "Shared event representation must remain consistent across parsing, constraints, scoring, and mutation."
      ],
      "tradeoffs": [
        "Parser, objective, and mutation defects prevent a validated final-schedule claim.",
        "The implementation uses OR-tree search; proposal AND-tree language is not an implemented alternative."
      ]
    }
  },

  {
    slug: "fullstack-restaurant-system",
    title: "Restaurant Reservation System",
    summary: "A React and Express application for customer accounts, reservation editing, and event inquiries, backed by a relational MySQL database.",
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
    caseStudy: projectCaseStudies["fullstack-restaurant-system"],
    overview: {
      description: "I connected customer and employee account screens, reservation editing, and event inquiries to a shared API and relational database.",
      purpose: "The main engineering work was modeling those relationships and keeping the interface and stored records in agreement, including edits that change a reservation’s identifying fields."
    },
    role: {
      "built": [
        "React booking/account screens, Axios services, Express controllers, and MySQL query modules.",
        "Specialized account relationships, composite-key reservation edits, and separate inquiry intake."
      ],
      "owned": [
        "Domain schema, application adaptation, and UI/API integration."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "React and shared credentialed Axios requests feed Express routers/controllers and direct mysql2 SQL.",
        "Customer and employee account records specialize a shared ACCOUNT model."
      ],
      "algorithms": [
        "Selected account handlers use self-access or employee clearance thresholds.",
        "Reservation updates preserve old key values alongside their replacements."
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
      "achievements": [
        "Integrated account, reservation, menu/location, and inquiry workflows."
      ],
      "learnings": [
        "Related writes need atomicity; date types must preserve the precision expected by the interface."
      ],
      "tradeoffs": [
        "Partial account checks are not comprehensive business-API RBAC.",
        "DATE/time-of-day and container wiring conflicts remain; broader order/reward/waitlist areas are schema-only."
      ]
    }
  },

  {
    slug: "raspberry-pi-bare-metal",
    title: "Bare-Metal SNES Controller Interface",
    summary: "C firmware that reads an SNES controller directly through Raspberry Pi GPIO and sends button states to a desktop game over serial.",
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
    caseStudy: projectCaseStudies["raspberry-pi-bare-metal"],
    overview: {
      description: "I connected an SNES controller to a desktop puzzle through custom Raspberry Pi firmware and a Python serial decoder.",
      purpose: "The Pi reads the controller’s electrical signals without an operating system. A separate desktop process turns the transmitted button mask into actions in an existing Pygame game."
    },
    role: {
      "built": [
        "Volatile GPIO SNES polling, active-low conversion, and changed-state hexadecimal UART messages.",
        "Python serial decoding and eight action mappings into an existing Pygame puzzle."
      ],
      "owned": [
        "Controller protocol handling, firmware state filtering, and host integration."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "Freestanding Raspberry Pi 4 firmware sends controller state to a separate desktop Python runtime.",
        "Supplied AArch64 startup and build support generate the firmware image."
      ],
      "algorithms": [
        "Sixteen sampled bits become an active-high pressed-button mask.",
        "Changed-state filtering suppresses repeated output while inputs remain unchanged."
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
      "achievements": [
        "Connected custom GPIO polling to serial input dispatch in the host game."
      ],
      "learnings": [
        "Firmware signaling, transport encoding, and host event dispatch form distinct protocol boundaries."
      ],
      "tradeoffs": [
        "The approximately 30 Hz polling target is configuration, not measured latency.",
        "Startup/debug support and Al Sweigart’s puzzle retain their separate attribution."
      ]
    }
  },

  {
    slug: "climate-control-simulation",
    title: "Greenhouse Climate Simulation",
    summary: "A Java desktop simulation with independently timed environmental controllers, live equipment states, and saved histories for reviewing each run.",
    tags: [
      "Java",
      "Swing",
      "Concurrency",
      "Simulation",
      "File I/O"
    ],
    category: "Systems",
    featured: false,
    caseStudy: projectCaseStudies["climate-control-simulation"],
    overview: {
      description: "I built a desktop application for exploring how a greenhouse responds to changing conditions and equipment settings.",
      purpose: "Users configure targets and sampling intervals for temperature, humidity, and soil moisture, then inspect the simulated readings and save a history of the run."
    },
    role: {
      "built": [
        "Swing configuration/live-result views, three controller workers, and four actuator classes.",
        "Temporary run logs, named saved copies, a path index, and previous-result viewing."
      ],
      "owned": [
        "Control logic, worker/UI composition, and local persistence."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "Independently sampled Runnable controllers feed a separate result-coordination loop.",
        "Constructor-injected view and actuator objects connect the desktop components."
      ],
      "algorithms": [
        "Three-unit temperature band selects heating, neutral, or cooling state.",
        "Humidity and soil-moisture controllers use a humidifier and sprinkler respectively."
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
      "achievements": [
        "Implemented configurable simulated environmental control and saved run histories."
      ],
      "learnings": [
        "Independent worker timing requires explicit shared-state visibility and lifecycle coordination."
      ],
      "tradeoffs": [
        "The retained implementation has shared-state and interruption-handling gaps.",
        "Software simulation only; no physical sensor or measured control-performance claim."
      ]
    }
  },

  {
    slug: "family-streaming-interface",
    title: "Family Streaming Interface",
    summary: "A React prototype for family viewing, with separate parent and child interfaces, personalized browsing, and settings saved per profile in the browser.",
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
    caseStudy: projectCaseStudies["family-streaming-interface"],
    overview: {
      description: "I built separate browsing and supervision interfaces around a shared set of child profiles.",
      purpose: "The prototype connects catalog search, show details, player controls, and parent settings. Favorites and restrictions persist per child in the browser; account operations are simulated."
    },
    role: {
      "built": [
        "Nested parent/child routes, catalog discovery, reusable MUI controls, and keyboard/player handlers.",
        "Profile-keyed favorites/restrictions/settings and browser-wide parent profile persistence."
      ],
      "owned": [
        "Screen composition, navigation state, storage integration, and prototype interaction logic."
      ]
    },
    technicalHighlights: {
      "architecture": [
        "Client-only React application uses local catalog fixtures and browser persistence.",
        "Profile parameters and route state carry selected child/show/episode context."
      ],
      "algorithms": [
        "JSON helpers suppress duplicate favorites/restrictions; FileReader provides profile-image previews.",
        "Logical focus state handles selected keyboard interactions; seeking converts finite video duration to a target time."
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
      "achievements": [
        "Implemented distinct parent/child interfaces with persisted personalization and reusable controls."
      ],
      "learnings": [
        "Persisted preferences, account mutation, and access enforcement require distinct implementations."
      ],
      "tradeoffs": [
        "Account dialogs and viewing usage include simulated behavior; no backend account service.",
        "Restriction checks are partial and the referenced sample video is missing."
      ]
    }
  },

];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
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
    prev: index > 0 ? projects[index - 1] ?? null : null,
    next: index < projects.length - 1 ? projects[index + 1] ?? null : null,
  };
}
