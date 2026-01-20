export type ProjectTag =
  | "Distributed Systems"
  | "Backend"
  | "Networking"
  | "ML"
  | "Computer Vision"
  | "Optimization"
  | "Genetic Algorithms"
  | "Search"
  | "Embedded"
  | "Java"
  | "JavaScript"
  | "Python"
  | "Docker";

export type Project = {
  slug: string;
  title: string;
  short: string; // card blurb
  overview: string; // top of case study
  highlights: string[]; // bullet points
  stack: string[];
  tags: ProjectTag[];
  featuredRank?: number; // 1..4 for featured
  links?: { label: string; href: string }[]; // add later
};

export const projects: Project[] = [
  {
    slug: "distributed-chat-system",
    title: "Distributed Fault-Tolerant Chat System",
    short:
      "A resilient client–server chat system with replication, failure detection, and recovery. Built to run anywhere via Docker.",
    overview:
      "Designed and implemented a distributed chat system focused on reliability and portability. I worked on the full server and client; a teammate handled the load balancer.",
    highlights: [
      "Built core server + client architecture; emphasized correctness under failures and reconnects.",
      "Implemented replication/synchronization strategy and failure-handling behaviors (heartbeats, recovery flows).",
      "Containerized the system so it runs consistently on any machine (Docker).",
      "Load-tested with multiple clients and nodes to validate stability under churn.",
    ],
    stack: ["Java", "Docker", "Networking"],
    tags: ["Distributed Systems", "Backend", "Networking", "Docker", "Java"],
    featuredRank: 1,
  },
  {
    slug: "occluded-pet-detection",
    title: "Occluded Pet Detection (Computer Vision)",
    short:
      "Trained and compared multiple CV models to detect pets under occlusion, focusing on robustness and evaluation.",
    overview:
      "Explored model approaches for detecting pets even when partially hidden. Trained multiple models and evaluated tradeoffs between accuracy and robustness.",
    highlights: [
      "Trained multiple model variants and compared results using consistent evaluation metrics.",
      "Focused on occlusion robustness and analysis of common failure cases.",
      "Documented methodology and findings to support reproducibility.",
    ],
    stack: ["Python", "ML"],
    tags: ["ML", "Computer Vision", "Python"],
    featuredRank: 2,
  },
  {
    slug: "ga-parameter-finder",
    title: "Genetic Algorithm Hyperparameter Finder",
    short:
      "Genetic algorithm search for ML parameters—competitive with grid search while saving significant compute time.",
    overview:
      "Built a genetic algorithm approach for hyperparameter search. The goal was to match grid-search performance while reducing the amount of computation needed.",
    highlights: [
      "Designed a GA workflow (selection/crossover/mutation) tailored to hyperparameter spaces.",
      "Achieved comparable results to grid search with substantially less time spent exploring.",
      "Instrumented experiments to compare outcomes fairly across methods.",
    ],
    stack: ["Python", "ML"],
    tags: ["Optimization", "Genetic Algorithms", "ML", "Python"],
    featuredRank: 3,
  },
  {
    slug: "ai-scheduling-hard-constraints",
    title: "AI Scheduling with Hard Constraints",
    short:
      "Hybrid scheduling system using AND/OR trees plus a genetic algorithm to search valid schedules efficiently.",
    overview:
      "Built an AI scheduling system where hard constraints must always be satisfied. Combined structured search (AND/OR reasoning) with a genetic algorithm for efficient exploration.",
    highlights: [
      "Modeled scheduling as a constrained search problem with validity guarantees.",
      "Combined AND/OR reasoning with GA-based exploration to find feasible schedules faster.",
      "Evaluated behavior across constraint density and schedule size scenarios.",
    ],
    stack: ["Python", "Search"],
    tags: ["Search", "Optimization", "Genetic Algorithms", "Python"],
    featuredRank: 4,
  },
  {
    slug: "raspberry-pi-bare-metal",
    title: "Raspberry Pi Bare-Metal Projects",
    short:
      "Bare-metal Pi work (no OS): traffic light simulation and SNES controller input handling with low-level I/O.",
    overview:
      "Implemented low-level Raspberry Pi projects without an operating system, focusing on reliable I/O and deterministic behavior.",
    highlights: [
      "Built a traffic light simulation using low-level control loops and timing.",
      "Handled controller input (SNES) and transmitted/used signals reliably.",
      "Focused on understanding hardware interaction and constraints.",
    ],
    stack: ["C/C++", "Embedded"],
    tags: ["Embedded"],
  },
];

export const featuredProjects = projects
  .filter((p) => typeof p.featuredRank === "number")
  .sort((a, b) => (a.featuredRank! < b.featuredRank! ? -1 : 1));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
