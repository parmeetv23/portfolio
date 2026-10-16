import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import { experiences } from '@/data/experiences'

export const metadata: Metadata = {
    title: 'Experience',
    description: 'Software development experience spanning ERP integration, internal tools, and contract web development.',
}

export default function ExperiencePage() {
    return (
        <div className="min-h-screen bg-background">
            <Nav />

            <main className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-4 text-foreground">Experience</h1>
                <p className="text-muted-foreground mb-8">
                    Software development roles building data integrations, internal tools,
                    and web applications.
                </p>

                <div className="space-y-6">
                    {experiences.map((experience) => (
                        <article
                            key={experience.id}
                            aria-labelledby={experience.id}
                            className="border border-border/80 bg-border/60 p-6 rounded-lg"
                        >
                            <header className="mb-4">
                                <h2 id={experience.id} className="text-2xl font-semibold mb-2 text-foreground">
                                    {experience.company}
                                </h2>
                                {(experience.location || experience.employmentType) && (
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {[experience.location, experience.employmentType].filter(Boolean).join(' · ')}
                                    </p>
                                )}
                                <div className="space-y-2">
                                    {experience.roles.map((role) => (
                                        <div key={role.title} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                            <h3 className="text-lg font-medium text-foreground">{role.title}</h3>
                                            <p className="text-sm text-muted-foreground shrink-0">{role.dates}</p>
                                        </div>
                                    ))}
                                </div>
                            </header>

                            <p className="text-muted-foreground mb-4 leading-relaxed">{experience.summary}</p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                                {experience.highlights.map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                            <ul aria-label="Technologies" className="flex flex-wrap gap-2">
                                {experience.technologies.map((technology) => (
                                    <li key={technology} className="px-2.5 py-1 text-xs bg-border text-muted-foreground rounded border border-border">
                                        {technology}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    )
}
