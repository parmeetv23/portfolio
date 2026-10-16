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
            { title: 'Software Developer', dates: 'Jul. 2026 – Present' },
            { title: 'Software Developer Intern', dates: 'Apr. 2026 – Jul. 2026' },
        ],
        summary: 'Developed a Django and React decision-support application that combines Spire ERP data, configurable SKU ranking, and commodity visualization.',
        highlights: [
            'Built nine ERP dataset adapters and dependency-ordered synchronization with durable checkpoints, bounded retries, stable-key upserts, and transaction-chunk replay.',
            'Implemented deterministic, weighted SKU ranking with filtering, missing-data reporting, and React interfaces for pricing and SKU details.',
            'Integrated Groq-generated explanations with context-based caching, plus FRED commodity data and Chart.js visualizations.',
            'Built CSV preview, validation, and atomic import confirmation; implemented backend tests covering synchronization, scoring, APIs, caching, and imports.',
            'Documented scoring behavior, synchronization recovery, API usage, and technical handoffs.',
        ],
        technologies: ['Python', 'Django', 'React', 'JavaScript', 'SQLite', 'Spire ERP', 'Groq', 'FRED', 'Chart.js'],
    },
    {
        id: 'pro-formance-intermodal',
        company: 'PRO-Formance Intermodal',
        location: 'Calgary, AB',
        roles: [{ title: 'Software Intern', dates: 'Jan. 2026 – Apr. 2026' }],
        summary: 'Served as the sole developer of an internal system combining operational dashboards, training scheduling, grant workflows, and analytics.',
        highlights: [
            'Developed full-stack tools with React, SQL, and Python APIs, bringing spreadsheets and operational data into a centralized dashboard.',
            'Automated grant application workflows and built training scheduling and instructor/attendance analytics.',
            'Resolved data-integrity and workflow issues across scheduling, records management, and reporting, communicating fixes and workarounds to staff.',
            'Provisioned accounts, configured access, and documented onboarding steps and knowledge-base articles for consistent setup and support.',
        ],
        technologies: ['React', 'SQL', 'Python APIs'],
    },
    {
        id: 'phillys',
        company: 'Phillys',
        location: 'Calgary, AB',
        employmentType: 'Contract',
        roles: [{ title: 'Web Developer', dates: 'Sep. 2025 – Nov. 2025' }],
        summary: 'Rebuilt a legacy company website with PHP and JavaScript, delivering a mobile-friendly layout and post-launch maintenance.',
        highlights: [
            'Managed domain setup, DNS configuration, SSL certificate installation, and cPanel administration for the website launch.',
            'Connected contact form inquiries directly to the care team through email, replacing a manual intake workflow.',
            'Troubleshot cross-browser issues, broken integrations, and hosting configuration; escalated vendor-side issues with technical notes.',
        ],
        technologies: ['PHP', 'JavaScript', 'DNS', 'SSL', 'cPanel'],
    },
]
