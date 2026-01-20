export type ProjectCategory = 'Distributed' | 'ML' | 'Embedded';

export interface Project {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    category: ProjectCategory;
    featured: boolean;
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
        slug: 'distributed-chat-system',
        title: 'Distributed Fault-Tolerant Chat System',
        summary: 'A distributed chat system with leader election, message replication, and failure recovery mechanisms.',
        tags: ['Distributed Systems', 'Raft Consensus', 'Fault Tolerance', 'Go'],
        category: 'Distributed',
        featured: true,
        overview: {
            description: 'A distributed chat application implementing Raft consensus for leader election and log replication. The system maintains consistency across multiple nodes and handles node failures gracefully.',
            purpose: 'Built to understand distributed consensus algorithms and fault tolerance patterns in real-world systems. Demonstrates handling of network partitions, leader failures, and message ordering guarantees.',
        },
        role: {
            built: [
                'Raft consensus algorithm implementation for leader election and log replication',
                'Message replication protocol ensuring consistency across nodes',
                'Failure detection and recovery mechanisms',
                'Client-server communication layer with retry logic',
            ],
            owned: [
                'End-to-end system architecture and design decisions',
                'Consensus algorithm correctness and testing',
                'Performance optimization and latency reduction',
                'Documentation and deployment scripts',
            ],
        },
        technicalHighlights: {
            architecture: [
                'Multi-node cluster with leader-follower pattern',
                'Log-based replication for message ordering',
                'Heartbeat mechanism for failure detection',
                'Client request routing through leader node',
            ],
            algorithms: [
                'Raft consensus algorithm for distributed agreement',
                'Leader election with randomized timeouts',
                'Log replication with majority quorum requirement',
                'State machine replication for message delivery',
            ],
            failureHandling: [
                'Automatic leader election on leader failure',
                'Network partition detection and handling',
                'Message deduplication for retry scenarios',
                'Graceful degradation when quorum is lost',
            ],
            optimization: [
                'Batched log entries for reduced network overhead',
                'Pipelined replication for improved throughput',
                'Client-side caching to reduce leader load',
            ],
        },
        techStack: ['Go', 'gRPC', 'Protocol Buffers', 'Docker', 'Kubernetes'],
        results: {
            achievements: [
                'Achieved 99.9% message delivery guarantee under normal conditions',
                'Handled up to 3 simultaneous node failures in 5-node cluster',
                'Maintained sub-100ms latency for message replication',
            ],
            learnings: [
                'Understanding tradeoffs between consistency and availability',
                'Importance of careful timeout tuning in distributed systems',
                'Complexity of handling network partitions correctly',
            ],
            tradeoffs: [
                'Chose strong consistency over availability (CP in CAP theorem)',
                'Prioritized correctness over performance in consensus layer',
                'Accepted higher latency for guaranteed message ordering',
            ],
        },
    },
    {
        slug: 'occluded-pet-detection',
        title: 'Occluded Pet Detection (Computer Vision)',
        summary: 'Computer vision system for detecting pets in occluded scenarios using deep learning and attention mechanisms.',
        tags: ['Computer Vision', 'Deep Learning', 'PyTorch', 'Object Detection'],
        category: 'ML',
        featured: true,
        overview: {
            description: 'A computer vision model that detects and localizes pets in images with significant occlusion. Uses attention mechanisms and data augmentation to handle challenging scenarios where pets are partially hidden.',
            purpose: 'Addresses real-world pet detection needs where occlusion is common (behind furniture, partially visible). Demonstrates practical ML application with constraint handling and robustness considerations.',
        },
        role: {
            built: [
                'Custom YOLO-based architecture with attention modules',
                'Data augmentation pipeline for occlusion scenarios',
                'Training infrastructure with distributed data loading',
                'Inference optimization for real-time performance',
            ],
            owned: [
                'Model architecture design and hyperparameter tuning',
                'Dataset curation and annotation quality control',
                'Evaluation metrics and benchmarking',
                'Model deployment and serving infrastructure',
            ],
        },
        technicalHighlights: {
            architecture: [
                'Modified YOLOv8 backbone with spatial attention modules',
                'Multi-scale feature pyramid for small object detection',
                'Focal loss for handling class imbalance',
                'Non-maximum suppression with occlusion-aware IoU',
            ],
            algorithms: [
                'Spatial attention mechanism for occlusion handling',
                'Hard negative mining for difficult examples',
                'Mixup and CutMix augmentation strategies',
                'Learning rate scheduling with warm restarts',
            ],
            optimization: [
                'Model quantization for edge deployment',
                'TensorRT optimization for inference acceleration',
                'Batch processing pipeline for throughput',
            ],
        },
        techStack: ['Python', 'PyTorch', 'OpenCV', 'TensorRT', 'FastAPI', 'Docker'],
        results: {
            achievements: [
                'Achieved 87% mAP on occluded pet detection benchmark',
                'Reduced false positives by 40% compared to baseline YOLO',
                'Achieved 30 FPS inference on edge devices',
            ],
            learnings: [
                'Importance of domain-specific data augmentation',
                'Attention mechanisms significantly improve occlusion handling',
                'Tradeoffs between model complexity and inference speed',
            ],
            tradeoffs: [
                'Chose accuracy over inference speed for initial version',
                'Accepted higher model size for better occlusion handling',
                'Prioritized precision over recall to reduce false alarms',
            ],
        },
    },
    {
        slug: 'genetic-algorithm-hyperparameter-finder',
        title: 'Genetic Algorithm Hyperparameter Finder',
        summary: 'Evolutionary algorithm for automated hyperparameter optimization with constraint handling and early stopping.',
        tags: ['Optimization', 'Genetic Algorithms', 'MLOps', 'Python'],
        category: 'ML',
        featured: true,
        overview: {
            description: 'A genetic algorithm-based hyperparameter optimization system that evolves parameter sets over generations. Handles constraints, multi-objective optimization, and integrates with ML training pipelines.',
            purpose: 'Automates hyperparameter search for ML models, reducing manual tuning time. Demonstrates optimization under constraints and handling of computational budgets.',
        },
        role: {
            built: [
                'Genetic algorithm implementation with selection, crossover, mutation',
                'Constraint handling mechanisms for invalid parameter combinations',
                'Multi-objective optimization with Pareto frontier tracking',
                'Integration layer for ML frameworks (scikit-learn, PyTorch)',
            ],
            owned: [
                'Algorithm design and convergence analysis',
                'Constraint definition and validation logic',
                'Performance benchmarking against grid/random search',
                'API design for extensibility',
            ],
        },
        technicalHighlights: {
            architecture: [
                'Population-based evolutionary search',
                'Elitism strategy to preserve best solutions',
                'Adaptive mutation rates based on diversity',
                'Parallel fitness evaluation across generations',
            ],
            algorithms: [
                'Tournament selection for parent selection',
                'Uniform and single-point crossover operators',
                'Gaussian mutation with adaptive variance',
                'NSGA-II for multi-objective optimization',
            ],
            optimization: [
                'Early stopping based on convergence criteria',
                'Caching of fitness evaluations',
                'Distributed evaluation across multiple workers',
            ],
        },
        techStack: ['Python', 'NumPy', 'scikit-learn', 'Ray', 'Redis'],
        results: {
            achievements: [
                'Found better hyperparameters than grid search in 60% less time',
                'Handled 20+ hyperparameters simultaneously',
                'Achieved 3x speedup with parallel evaluation',
            ],
            learnings: [
                'Genetic algorithms excel in high-dimensional spaces',
                'Constraint handling is critical for practical optimization',
                'Early stopping prevents wasted computation',
            ],
            tradeoffs: [
                'Chose exploration over exploitation for initial generations',
                'Accepted non-deterministic results for better search coverage',
                'Prioritized parallelization over sequential optimization',
            ],
        },
    },
    {
        slug: 'ai-scheduling-hard-constraints',
        title: 'AI Scheduling with Hard Constraints',
        summary: 'Constraint satisfaction system for scheduling with hard constraints using backtracking and constraint propagation.',
        tags: ['Constraint Satisfaction', 'Optimization', 'Algorithms', 'Python'],
        category: 'ML',
        featured: true,
        overview: {
            description: 'A scheduling system that finds feasible solutions under hard constraints (time conflicts, resource limits, dependencies). Uses constraint propagation and backtracking search with heuristics.',
            purpose: 'Solves real-world scheduling problems where constraints cannot be violated. Demonstrates handling of NP-hard problems with practical heuristics and optimization techniques.',
        },
        role: {
            built: [
                'Constraint satisfaction problem (CSP) formulation',
                'Backtracking search with constraint propagation',
                'Variable and value ordering heuristics',
                'Conflict-directed backjumping optimization',
            ],
            owned: [
                'Problem modeling and constraint definition',
                'Algorithm selection and tuning',
                'Performance optimization for large problem instances',
                'Solution validation and correctness guarantees',
            ],
        },
        technicalHighlights: {
            architecture: [
                'CSP representation with variables, domains, constraints',
                'Arc consistency propagation (AC-3 algorithm)',
                'Forward checking during search',
                'Conflict set tracking for intelligent backtracking',
            ],
            algorithms: [
                'Backtracking search with chronological backtracking',
                'Minimum remaining values (MRV) heuristic',
                'Least constraining value (LCV) heuristic',
                'Conflict-directed backjumping',
            ],
            optimization: [
                'Early constraint propagation to prune search space',
                'Memoization of constraint checks',
                'Incremental constraint checking',
            ],
        },
        techStack: ['Python', 'NumPy', 'NetworkX', 'FastAPI'],
        results: {
            achievements: [
                'Solved scheduling problems with 100+ variables and 500+ constraints',
                'Found solutions 10x faster than naive backtracking',
                'Guaranteed constraint satisfaction (no violations)',
            ],
            learnings: [
                'Heuristic selection dramatically impacts search efficiency',
                'Constraint propagation is crucial for large problems',
                'Problem modeling significantly affects solver performance',
            ],
            tradeoffs: [
                'Chose completeness over speed (guaranteed solution if exists)',
                'Accepted exponential worst-case for guaranteed correctness',
                'Prioritized constraint satisfaction over optimality',
            ],
        },
    },
    {
        slug: 'raspberry-pi-bare-metal',
        title: 'Raspberry Pi Bare-Metal Programming',
        summary: 'Low-level system programming on Raspberry Pi without an operating system, implementing drivers and hardware interfaces.',
        tags: ['Embedded Systems', 'ARM Assembly', 'Hardware', 'C'],
        category: 'Embedded',
        featured: false,
        overview: {
            description: 'Bare-metal programming project for Raspberry Pi, implementing hardware drivers, interrupt handlers, and system initialization from scratch. Runs without any operating system.',
            purpose: 'Deep dive into hardware-software interaction and low-level system programming. Demonstrates understanding of computer architecture, memory management, and hardware interfaces.',
        },
        role: {
            built: [
                'Boot sequence and system initialization',
                'GPIO driver implementation',
                'UART driver for serial communication',
                'Timer and interrupt handling',
            ],
            owned: [
                'Hardware register mapping and documentation',
                'Memory layout and linker script configuration',
                'Interrupt vector table setup',
                'Testing and debugging without OS tools',
            ],
        },
        technicalHighlights: {
            architecture: [
                'Direct hardware register manipulation',
                'Memory-mapped I/O for peripheral access',
                'Interrupt-driven I/O handling',
                'No standard library dependencies',
            ],
            algorithms: [
                'GPIO configuration and state management',
                'UART baud rate calculation and configuration',
                'Interrupt priority and masking',
                'Circular buffer for UART receive',
            ],
        },
        techStack: ['C', 'ARM Assembly', 'GCC Toolchain', 'QEMU'],
        results: {
            achievements: [
                'Successfully booted Raspberry Pi without OS',
                'Implemented working GPIO and UART drivers',
                'Achieved deterministic timing with hardware timers',
            ],
            learnings: [
                'Deep understanding of hardware-software interface',
                'Importance of memory layout and alignment',
                'Challenges of debugging without OS support',
            ],
            tradeoffs: [
                'Chose direct hardware access over portability',
                'Accepted manual memory management complexity',
                'Prioritized learning over practical utility',
            ],
        },
    },
];

export function getFeaturedProjects(): Project[] {
    // Return featured projects in the exact order specified
    const featuredOrder = [
        'distributed-chat-system',
        'occluded-pet-detection',
        'genetic-algorithm-hyperparameter-finder',
        'ai-scheduling-hard-constraints',
    ];

    return featuredOrder
        .map(slug => projects.find(p => p.slug === slug))
        .filter((p): p is Project => p !== undefined && p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
    return projects.filter(p => p.category === category);
}

