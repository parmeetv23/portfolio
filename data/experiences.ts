export interface Experience {
    id: string
    company: string
    location?: string
    employmentType?: string
    dates?: string
    roles: {
        title: string
        dates: string
    }[]
    summary: string
    highlights: string[]
    contributions?: { title: string; description: string }[]
    supportingWork?: string
    caseStudy?: string
    technologies: string[]
}

// Sources and details awaiting confirmation: docs/PORTFOLIO-CONTENT-REVIEW.md.
// Contributions belong to each engagement as a whole, including role transitions.
export const experiences: Experience[] = [
    {
        id: 'snap-remedy',
        company: 'Snap Remedy',
        dates: 'Apr. 2026 – Present',
        roles: [
            { title: 'Software Developer', dates: 'Jul. 2026 – Present' },
            { title: 'Software Developer Intern', dates: 'Apr. 2026 – Jul. 2026' },
        ],
        summary: 'Developed an ERP-backed SKU-ranking application with a Django backend, relational data layer, and React frontend.',
        highlights: [],
        contributions: [
            {
                title: 'Relational modeling and ERP integration',
                description: 'Designed relational models and ETL adapters for nine ERP datasets. Mapping external records into consistent local structures made the data available for querying and analysis without calling the ERP for each ranking request.',
            },
            {
                title: 'Resumable synchronization',
                description: 'Built checkpointed synchronization with bounded retries and chunk-level transactions. Stable-key upserts let an interrupted page be replayed while retaining earlier committed work; status and recovery APIs make progress and failures inspectable.',
            },
            {
                title: 'Scoring, APIs, and the interface',
                description: 'Implemented configurable weighted scoring and Django JSON APIs, with normalization, filtering, and explicit missing-data handling. Built React controls and result views so users can configure a comparison and inspect the rankings.',
            },
        ],
        supportingWork: 'Supporting work included validated CSV imports, cached LLM explanations of existing rankings, and a separate external-data viewer. I wrote backend tests and documentation for the scoring and synchronization workflows.',
        caseStudy: '/experience/snap-remedy',
        technologies: ['Python', 'Django', 'SQL', 'React', 'JavaScript'],
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
