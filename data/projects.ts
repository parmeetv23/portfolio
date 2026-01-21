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
      "Distributed IRC-style chat system with persistent message history, gossip-based replication, and fault-tolerant client/server recovery using a non-blocking Java NIO architecture.",
    tags: [
      "Distributed Systems",
      "Java NIO",
      "Gossip Replication",
      "Fault Tolerance",
      "Vector Clocks",
      "Eventual Consistency",
      "Networking",
    ],
    category: "Distributed",
    featured: true,
    overview: {
      description:
        "A distributed chat application composed of multiple peer chat servers that maintain and replicate persistent chat logs using a gossip-based push–pull protocol. Clients can connect to any server, recover message history, and transparently reconnect after failures. The system is fully event-driven using Java NIO for scalability.",
      purpose:
        "Built to design and implement a real-world distributed system from scratch, focusing on replication, consistency, and failure recovery while maintaining responsiveness under concurrent client and server connections.",
    },
    role: {
      built: [
        "Complete IRC-style chat server supporting multiple concurrent clients",
        "Client application with reconnect, retry, and message resend behavior",
        "Peer-to-peer chat server communication for replication and recovery",
        "Custom TCP + JSON messaging protocol for clients and servers",
      ],
      owned: [
        "End-to-end design and implementation of the chat server",
        "End-to-end design and implementation of the chat client",
        "Non-blocking, selector-driven networking architecture using Java NIO",
        "Chat-log replication, synchronization, and merge logic between servers",
        "Failure handling for server crashes, network partitions, and rejoin scenarios",
        "Message ordering and deduplication using vector timestamps and unique IDs",
      ],
    },
    technicalHighlights: {
      architecture: [
        "Decentralized cluster of peer chat servers with no single point of failure",
        "Event-driven, non-blocking I/O using a single selector loop per server",
        "Persistent chat logs replicated across servers for fault tolerance",
        "Clients can reconnect to any server and recover recent message history",
      ],
      algorithms: [
        "Gossip-based push–pull replication for chat-log synchronization",
        "Vector timestamps (vector clocks) to maintain partial ordering of messages",
        "Deduplication using unique message identifiers during retries and merges",
        "Timeout-based failure detection for peers and clients",
      ],
      failureHandling: [
        "Automatic client reconnect and message resend after server failure",
        "Peer server failure detection and temporary isolation from replication paths",
        "Server rejoin protocol that synchronizes full chat history from peers",
        "Graceful handling of message duplication and out-of-order delivery",
      ],
      optimization: [
        "Non-blocking multiplexed I/O to avoid per-connection threads",
        "Asynchronous message processing to keep the selector loop responsive",
        "Gossip replication to limit network overhead as servers scale",
      ],
    },
    techStack: ["Java", "Java NIO", "TCP Sockets", "JSON", "Docker"],
    results: {
      achievements: [
        "Implemented a fully functional distributed chat system with persistent history",
        "Enabled seamless client reconnection and message recovery after failures",
        "Achieved eventual convergence of chat logs across all servers via gossip replication",
      ],
      learnings: [
        "Non-blocking I/O significantly improves scalability but requires careful state management",
        "Eventual consistency is often sufficient for real-time collaborative applications like chat",
        "Failure recovery depends more on safe rejoin and merge logic than strict global ordering",
      ],
      tradeoffs: [
        "Chose eventual consistency (P-RAM) over strong consistency to reduce coordination overhead",
        "Accepted temporary message reordering in favor of higher availability",
        "Prioritized robustness and correctness over minimal latency",
      ],
    },
  },
  {
    slug: "occluded-pet-detection",
    title: "Occluded Pet Detection in Domestic Environments",
    summary:
      "Evaluated whether occlusion-aware training improves indoor cat/dog detection under partial visibility using synthetic indoor-object occlusions and a real occluded test set.",
    tags: [
      "Computer Vision",
      "Object Detection",
      "Occlusion Robustness",
      "YOLOv8",
      "EfficientDet",
      "PyTorch",
    ],
    category: "ML",
    featured: true,
    overview: {
      description:
        "Object detection study focused on domestic indoor settings where pets are frequently partially visible (occluded by furniture/household objects). Trained detectors on (1) clean images and (2) the same images with synthetic indoor occlusions, then evaluated transfer to a real occluded indoor test set.",
      purpose:
        "Test whether occlusion-aware augmentation meaningfully improves real-world robustness under indoor occlusion, and compare how different detection architectures behave under partial visibility.",
    },
    role: {
      built: [
        "End-to-end training and evaluation pipeline for occlusion robustness experiments",
        "Synthetic occlusion generation pipeline using segmented indoor objects (ADE20K) overlaid onto pet images",
        "Dataset preparation: deriving bounding boxes from segmentation masks and unifying breeds into a single “Pet” class",
        "Real occluded indoor evaluation set collection + manual annotation and evaluation scripts",
      ],
      owned: [
        "Experimental design comparing clean vs occlusion-aware training under fixed hyperparameters",
        "Construction of synthetic occlusion dataset and realism controls (object filtering/size thresholds + blending)",
        "Creation and annotation of a real occluded indoor test set used only at evaluation time",
        "Quantitative + qualitative analysis explaining architecture-dependent outcomes under occlusion",
      ],
    },
    technicalHighlights: {
      architecture: [
        "YOLOv8 (single-stage, multi-scale convolutional detector) trained via Ultralytics with pretrained weights",
        "EfficientDet-D0 (EfficientNet backbone + BiFPN multi-scale fusion) trained with pretrained weights",
        "DETR explored (transformer-based set prediction) but excluded due to poor convergence within the training budget",
        "No architectural modifications applied to isolate the effect of occlusion-aware training",
      ],
      algorithms: [
        "COCO-style evaluation: mAP@0.50 and mAP@[0.50:0.95] on a real occluded indoor test set",
        "Synthetic occlusion augmentation: overlay segmented indoor objects from ADE20K at random locations",
        "Label generation: bounding boxes derived from Oxford-IIIT Pet segmentation masks for consistent supervision",
        "Best-checkpoint selection using clean validation performance (validation set contains only clean images)",
      ],
      optimization: [
        "Pretrained initialization for all models to improve convergence under limited compute",
        "Kept hyperparameters fixed to isolate the impact of occlusion-aware augmentation (not aggressive tuning)",
        "Model selection by validation performance rather than early stopping",
      ],
    },
    techStack: [
      "Python",
      "PyTorch",
      "Ultralytics (YOLOv8)",
      "Kaggle (NVIDIA Tesla P100)",
    ],
    results: {
      achievements: [
        "Built an occlusion-aware training setup using indoor-object occlusions and evaluated transfer to real indoor occlusions",
        "Collected and annotated a real occluded indoor test set (74 images) used only for testing (no train/val leakage)",
        "Empirically showed that occlusion-aware training effects are architecture-dependent and may not transfer to real occlusion patterns",
      ],
      learnings: [
        "Synthetic occlusion augmentation alone does not reliably transfer to real indoor occlusion geometry/lighting",
        "YOLOv8 performed best overall and could often detect pets from small visible cues (e.g., faces/ears) without explicit occlusion modeling",
        "EfficientDet-D0 benefited modestly from occlusion-aware training on real occluded images, but localization remained weaker",
        "Transformer-based detection (DETR) can be impractical in low-data / limited-budget training without longer schedules",
      ],
      tradeoffs: [
        "Prioritized isolating occlusion-aware training effects over maximizing peak performance (kept architectures and hyperparameters fixed)",
        "Used a small real occluded test set (74 images), enabling realism but limiting statistical generalization",
        "Synthetic occlusions increased controlled coverage, but introduced a domain gap vs real occlusions",
      ],
    },
  },
  {
    slug: "genetic-algorithm-hyperparameter-finder",
    title: "Genetic Algorithm Hyperparameter Tuning Framework",
    summary:
      "Reusable genetic algorithm framework for hyperparameter tuning across multiple scikit-learn models, with tournament selection, crossover/mutation, and constraint-aware handling for invalid configurations.",
    tags: [
      "Genetic Algorithms",
      "Hyperparameter Tuning",
      "Optimization",
      "scikit-learn",
      "Python",
    ],
    category: "ML",
    featured: true,
    overview: {
      description:
        "A general-purpose genetic algorithm (GA) hyperparameter tuning framework implemented in Python. It evolves a population of candidate hyperparameter dictionaries over generations using tournament selection, crossover, mutation, and elitism, and evaluates fitness via cross-validation. The framework was tested across Decision Tree, SVM, Logistic Regression, and Random Forest models.",
      purpose:
        "Built to explore when genetic algorithms are a practical replacement for grid search, and how they compare to randomized search in terms of accuracy vs. runtime for high-dimensional tuning problems.",
    },
    role: {
      built: [
        "GA framework with population initialization, tournament selection, uniform crossover, mutation, and elitism",
        "Fitness evaluation using cross-validation scoring (user-selectable metric; accuracy by default)",
        "Model-agnostic parameter space handling (search spaces defined per model)",
        "Constraint-aware extension for Logistic Regression to avoid invalid solver/penalty combinations",
        "Experiment harness to compare GA vs. GridSearchCV vs. RandomizedSearchCV",
      ],
      owned: [
        "Core GA implementation (selection/crossover/mutation loop + elitism)",
        "Parameter-space design and tuning setup across multiple model families (tree / linear / kernel / ensemble)",
        "Constraint handling strategy for incompatible hyperparameter dependencies (Logistic Regression)",
        "Results compilation and interpretation (accuracy/time comparisons across methods)",
      ],
    },
    technicalHighlights: {
      architecture: [
        "Population-based evolutionary search over hyperparameter dictionaries :contentReference[oaicite:0]{index=0}",
        "Fitness via scikit-learn cross_val_score with configurable CV folds :contentReference[oaicite:1]{index=1}",
        "Elitism: best individual carried into next generation :contentReference[oaicite:2]{index=2}",
        "Model-agnostic framework intended to be reused across model types :contentReference[oaicite:3]{index=3}",
      ],
      algorithms: [
        "Tournament selection for parent selection :contentReference[oaicite:4]{index=4}",
        "Uniform crossover (per-parameter mixing from two parents) :contentReference[oaicite:5]{index=5}",
        "Random mutation of selected hyperparameters sampled from the original search space :contentReference[oaicite:6]{index=6}",
        "Constraint-aware subclass for Logistic Regression to avoid invalid solver/penalty pairings :contentReference[oaicite:7]{index=7}",
      ],
      optimization: [
        "Comparable-budget evaluation: randomized search iterations matched to pop_size × generations for fairness :contentReference[oaicite:8]{index=8}",
        "Parallel-capable fitness evaluation via n_jobs in cross_val_score :contentReference[oaicite:9]{index=9}",
      ],
    },
    techStack: [
      "Python",
      "scikit-learn",
      "NumPy",
      "pandas",
      "Jupyter Notebook",
    ],
    results: {
      achievements: [
        "Decision Tree: GA reached 0.9569 accuracy in 9.39s vs Grid Search 0.9692 in 1585.29s :contentReference[oaicite:10]{index=10}",
        "SVM: GA reached 0.9789 accuracy in 1.78s vs Grid Search 0.9824 in 111.00s :contentReference[oaicite:11]{index=11}",
        "Logistic Regression: GA matched Grid Search at 0.9780 accuracy (9.94s vs 212.77s) :contentReference[oaicite:12]{index=12}",
        "Random Forest: GA achieved 0.9708 accuracy (grid search not completed after >2 days) :contentReference[oaicite:13]{index=13} :contentReference[oaicite:14]{index=14}",
      ],
      learnings: [
        "GA can be a “middle ground” when grid search is too slow but you want more structure than randomized search :contentReference[oaicite:15]{index=15}",
        "Small accuracy differences often come with large runtime differences, so the “best” tuner depends on priorities :contentReference[oaicite:16]{index=16}",
        "Handling incompatible hyperparameter dependencies is essential for a reusable tuner (e.g., Logistic Regression solver/penalty) :contentReference[oaicite:17]{index=17}",
      ],
      tradeoffs: [
        "GA slightly improved accuracy over randomized search in several cases, but took longer runtime :contentReference[oaicite:18]{index=18}",
        "Computing limits constrained wider parameter spaces (e.g., Random Forest grid search infeasible) :contentReference[oaicite:19]{index=19}",
        "GA performance is sensitive to its own hyperparameters (population size, mutation rate, crossover probability) :contentReference[oaicite:20]{index=20}",
      ],
    },
  },
  {
    slug: "ai-scheduling-hard-constraints",
    title: "AI Scheduling for City Soccer Field Allocation",
    summary:
      "AI search system for scheduling city-wide soccer games and practices under strict hard constraints and weighted soft preferences, using a hybrid genetic algorithm and AND/OR-tree search.",
    tags: [
      "Constraint Satisfaction",
      "AI Search",
      "Scheduling",
      "Genetic Algorithms",
      "AND/OR Trees",
      "Optimization",
    ],
    category: "ML",
    featured: true,
    overview: {
      description:
        "An AI scheduling system that assigns soccer games and practices across limited weekly field time slots for the City of Calgary. The system must satisfy numerous hard constraints (capacity limits, incompatibilities, pre-assignments, linked multi-day slots) while minimizing penalties from soft constraints such as preferences, minimum slot usage, and paired-event requirements.",
      purpose:
        "Built to implement and evaluate a hybrid AI search approach for a real-world constraint satisfaction and optimization problem where feasibility is mandatory and optimality is preference-driven.",
    },
    role: {
      built: [
        "Formal CSP representation of games, practices, and time slots with capacity limits",
        "Parser and internal data structures for structured scheduling input files",
        "Hard-constraint predicate enforcing feasibility during partial and full assignments",
        "Penalty-based evaluation function encoding multiple weighted soft constraints",
        "Hybrid search combining a set-based genetic algorithm with AND/OR-tree expansion",
      ],
      owned: [
        "Constraint modeling for scheduling games and practices under real-world city rules",
        "Design and implementation of the hard-constraint checking logic (capacity, overlap, incompatibility, pre-assignments)",
        "Penalty function design to guide optimization without violating feasibility",
        "Integration of AND/OR-tree search to complete, repair, and validate candidate schedules",
      ],
    },
    technicalHighlights: {
      architecture: [
        "State-space model representing complete weekly schedules reused across the season",
        "Slots modeled with independent game and practice capacities per time window",
        "Incremental environment-variable updates to track remaining slot capacity",
        "Population of full schedules evolved via genetic operators",
      ],
      algorithms: [
        "Set-based Genetic Algorithm operating over complete schedules",
        "AND/OR-tree search to expand partial assignments into valid complete schedules",
        "Constraint predicate (Constr) to immediately reject infeasible states",
        "Penalty-based evaluation function (Eval) combining multiple weighted soft constraints",
      ],
      failureHandling: [
        "Immediate pruning of invalid partial assignments that violate hard constraints",
        "Safe mutation rollback when no valid reassignment exists for a selected event",
        "Isolation of infeasible branches during AND/OR-tree expansion",
      ],
      optimization: [
        "Penalty-guided mutation biased toward high-cost events",
        "Randomized tie-breaking to avoid deterministic local minima",
        "Hybrid symbolic + evolutionary search to balance feasibility and exploration",
      ],
    },
    techStack: ["Python"],
    results: {
      achievements: [
        "Generated valid weekly schedules satisfying all hard constraints for games and practices",
        "Handled complex real-world constraints including multi-day slot linking and division incompatibilities",
        "Balanced soft constraints such as preferences, minimum slot usage, and paired-event scheduling",
      ],
      learnings: [
        "Pure genetic search struggles with hard constraints without symbolic guidance",
        "AND/OR-tree expansion is effective for enforcing feasibility while preserving search diversity",
        "Penalty weighting strongly influences convergence behavior and solution quality",
      ],
      tradeoffs: [
        "Hybrid GA + AND/OR-tree approach increases implementation complexity",
        "Search runtime grows with constraint density and number of events",
        "Optimization prioritizes feasible, high-quality solutions rather than guaranteed global optimality",
      ],
    },
  },
  {
    slug: "raspberry-pi-bare-metal",
    title: "Raspberry Pi Bare-Metal Systems Programming",
    summary:
      "Bare-metal Raspberry Pi programs written in C and ARM assembly to control GPIO, handle interrupts, and manage hardware timing without an operating system.",
    tags: [
      "Embedded Systems",
      "Bare-Metal Programming",
      "ARM Assembly",
      "GPIO",
      "Interrupts",
      "Low-Level Systems",
    ],
    category: "Embedded",
    featured: false,
    overview: {
      description:
        "A collection of bare-metal Raspberry Pi programs that boot directly on hardware without an operating system. The system configures GPIO pins, handles hardware interrupts, and controls LEDs and input devices using ARM assembly and C.",
      purpose:
        "Built to understand low-level computer architecture and hardware–software interaction by programming the Raspberry Pi directly at the register level.",
    },
    role: {
      built: [
        "Bare-metal boot and runtime environment for Raspberry Pi",
        "GPIO drivers for LED output and push-button input",
        "Interrupt handling logic using ARM exception vectors",
        "State-based control logic driven entirely by hardware interrupts",
      ],
      owned: [
        "All Raspberry Pi server-side logic and hardware interaction code",
        "ARM assembly initialization code and interrupt vector setup",
        "Direct memory-mapped I/O control of GPIO registers",
        "Interrupt service routines (ISRs) coordinating system state changes",
      ],
    },
    technicalHighlights: {
      architecture: [
        "Bare-metal execution with no operating system or standard library",
        "Direct memory-mapped access to Raspberry Pi GPIO registers",
        "Interrupt-driven control flow using hardware exception handling",
        "State machine controlling LED behavior based on external inputs",
      ],
      algorithms: [
        "Interrupt-based state transitions triggered by push-button events",
        "Busy-wait delay loops and hardware timer–based timing",
        "Deterministic state sequencing for LED patterns",
      ],
      failureHandling: [
        "Explicit interrupt masking and unmasking to prevent race conditions",
        "Controlled state transitions to avoid undefined hardware behavior",
      ],
      optimization: [
        "Interrupt-driven design to avoid continuous polling",
        "Minimal runtime footprint with no OS overhead",
      ],
    },
    techStack: [
      "C",
      "ARM Assembly (AArch64)",
      "Raspberry Pi",
      "Cross-Compilation Toolchain",
    ],
    results: {
      achievements: [
        "Successfully booted and ran custom programs directly on Raspberry Pi hardware",
        "Implemented GPIO control and interrupt-driven input handling without an OS",
        "Built deterministic LED control logic driven by real-time hardware events",
      ],
      learnings: [
        "Deep understanding of memory-mapped I/O and register-level hardware control",
        "How interrupt handling and exception vectors work at the CPU level",
        "Challenges of debugging and timing without OS-level tooling",
      ],
      tradeoffs: [
        "Chose direct hardware control over portability",
        "Accepted higher development complexity in exchange for full system control",
        "Used busy loops for simplicity where hardware timers increased complexity",
      ],
    },
  },

  {
    slug: "fullstack-restaurant-system",
    title: "Full-Stack Restaurant Management System",
    summary:
      "Full-stack web application for restaurant operations with secure authentication, role-based access control, and Dockerized deployment using React, Node.js, and MySQL.",
    tags: [
      "Full-Stack Development",
      "Backend APIs",
      "Authentication",
      "SQL Databases",
      "Docker",
      "React",
      "Node.js",
    ],
    category: "Full-Stack",
    featured: false,
    //   links: {
    //     // repo: 'https://github.com/barkgch/fullstack-restaurant-site',
    //   },
    overview: {
      description:
        "A full-stack restaurant management system supporting customer accounts, employee roles, menu management, and reservations. The system includes a React frontend, a Node.js/Express backend API, and a MySQL database with normalized relational schema and foreign-key constraints.",
      purpose:
        "Built to design and implement a complete web application end-to-end, focusing on backend API design, secure authentication, database modeling, and real-world deployment concerns.",
    },
    role: {
      built: [
        "RESTful backend API using Node.js and Express",
        "React frontend with form validation, routing, and state management",
        "Authentication and authorization system using hashed passwords and cookies",
        "Relational MySQL database schema for users, employees, menu items, and reservations",
        "Dockerized development and deployment environment",
      ],
      owned: [
        "Backend API design and implementation",
        "Database schema design and SQL queries with foreign-key relationships",
        "Authentication flow using bcrypt password hashing and cookie-based sessions",
        "Role-based access control for employee permission levels",
        "Integration between frontend, backend, and database layers",
      ],
    },
    technicalHighlights: {
      architecture: [
        "Client–server architecture with React frontend and Express REST API",
        "MySQL relational database with normalized tables and cascading relationships",
        "Nginx used to serve the production React build within Docker",
        "Docker Compose used to orchestrate frontend, backend, and database services",
      ],
      algorithms: [
        "Password hashing using bcrypt to prevent plaintext credential storage",
        "JWT-based authentication combined with HTTP cookies for session persistence",
        "Role-based authorization checks enforced at API route level",
      ],
      optimization: [
        "Separation of concerns between API, database, and frontend layers",
        "Reusable API endpoints and modular routing structure",
        "Input validation on both client and server to reduce invalid requests",
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
        "Implemented a fully functional full-stack application with secure user authentication",
        "Designed a relational database schema supporting multiple user and employee roles",
        "Successfully containerized the system for consistent local and deployment environments",
      ],
      learnings: [
        "Designing secure authentication flows requires careful handling of cookies and credentials",
        "Clear API boundaries simplify frontend–backend integration",
        "Relational schema design strongly influences application flexibility and maintainability",
      ],
      tradeoffs: [
        "Used cookie-based authentication for simplicity over more complex OAuth-based flows",
        "Prioritized correctness and clarity over advanced frontend performance optimizations",
        "Accepted some framework-level dependencies to accelerate development",
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
