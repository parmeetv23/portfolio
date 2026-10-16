export interface Experience {
    id: string
    company: string
    location?: string
    employmentType?: string
    roles: {
        title: string
        dates: string
    }[]
    summary: string
    highlights: string[]
    technologies: string[]
}

// Sources and details awaiting confirmation: docs/PORTFOLIO-CONTENT-REVIEW.md.
// Contributions belong to each engagement as a whole, including role transitions.
export const experiences: Experience[] = [
    {
        id: 'snap-remedy',
        company: 'Snap Remedy',
        roles: [
            { title: 'Software Developer / Intern', dates: 'Apr. 2026 – Present' },
        ],
        summary: 'Built a full-stack decision-support application with Python/Django ETL pipelines for Spire ERP data, rules-based SKU ranking, and React dashboards. Progressed from intern to developer in July 2026.',
        highlights: [
            'Built ETL (extract, transform, load) pipelines for nine Spire ERP datasets, mapping API payloads into relational models and normalizing pricing records.',
            'Implemented resumable batch processing with persistent checkpoints, bounded retries, chunked database transactions, and stable-key upserts to support replay after failures.',
            'Developed relational data models, Django ORM aggregations, and JSON APIs for configurable SKU scoring, filtering, and pricing, with React interfaces for exploring results.',
            'Integrated the Groq LLM API for structured explanations with context-based caching, and FRED APIs for commodity data displayed through Chart.js.',
            'Implemented CSV data validation, preview, and transactional imports, with automated Django tests for synchronization, scoring, APIs, caching, and rollback behavior.',
            'Wrote API documentation and recovery guides covering scoring rules, synchronization failures, and technical handoffs.',
        ],
        technologies: ['Python', 'Django', 'React', 'JavaScript', 'SQLite', 'Spire ERP', 'Groq', 'FRED', 'Chart.js'],
    },
    {
        id: 'pro-formance-intermodal',
        company: 'PRO-Formance Intermodal',
        location: 'Calgary, AB',
        roles: [{ title: 'Software Intern', dates: 'Jan. 2026 – Apr. 2026' }],
        summary: 'Sole developer of a full-stack internal system for workflow automation, training scheduling, grant processing, and operational analytics.',
        highlights: [
            'Integrated spreadsheets and operational data into centralized React dashboards backed by Python APIs and SQL.',
            'Automated grant application workflows and developed training scheduling and analytics for instructor performance and attendance patterns.',
            'Performed root-cause analysis and resolved data-integrity and workflow issues across scheduling, records management, and reporting.',
            'Handled account provisioning and access configuration, and authored onboarding documentation and knowledge-base articles for internal users.',
        ],
        technologies: ['React', 'SQL', 'Python APIs'],
    },
    {
        id: 'phillys',
        company: 'Phillys',
        location: 'Calgary, AB',
        employmentType: 'Contract',
        roles: [{ title: 'Web Developer', dates: 'Sep. 2025 – Nov. 2025' }],
        summary: 'Rebuilt a legacy website with PHP and JavaScript, delivering responsive layouts, web deployment, and post-launch production support.',
        highlights: [
            'Managed website deployment, domain setup, DNS configuration, SSL certificate installation, and cPanel hosting administration.',
            'Implemented an email-based contact form workflow that routed inquiries directly to the care team, replacing manual intake.',
            'Resolved cross-browser compatibility issues, integration failures, and hosting configuration problems; documented technical findings for vendor escalations.',
        ],
        technologies: ['PHP', 'JavaScript', 'DNS', 'SSL', 'cPanel'],
    },
]
