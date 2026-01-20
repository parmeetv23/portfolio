import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import { projects, getProjectBySlug, getProjectNavigation } from '@/data/projects'

export const dynamic = "force-static"
export const revalidate = false

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Parmeet Singh Virdi`,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            type: 'website',
        },
    }
}

function SectionHeader({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl font-semibold mb-4 text-foreground">{children}</h2>
    )
}

function SubSectionHeader({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-lg font-medium mb-2 text-foreground">{children}</h3>
    )
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            {items.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    const { prev, next } = getProjectNavigation(slug)

    return (
        <div className="min-h-screen bg-background">
            <Nav />

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Back Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center text-accent hover:text-accent-hover mb-8 transition-colors"
                >
                    ← Back to Projects
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-border text-muted-foreground rounded border border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-foreground">{project.title}</h1>
                    <p className="text-xl text-muted-foreground">{project.summary}</p>
                </header>

                {/* Links */}
                {project.links && (project.links.repo || project.links.demo || project.links.paper || project.links.report) && (
                    <section className="mb-12">
                        <SectionHeader>Links</SectionHeader>
                        <div className="flex flex-wrap gap-4">
                            {project.links.repo && (
                                <a
                                    href={project.links.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-hover transition-colors"
                                >
                                    Repository →
                                </a>
                            )}
                            {project.links.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-hover transition-colors"
                                >
                                    Demo →
                                </a>
                            )}
                            {project.links.paper && (
                                <a
                                    href={project.links.paper}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-hover transition-colors"
                                >
                                    Paper →
                                </a>
                            )}
                            {project.links.report && (
                                <a
                                    href={project.links.report}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent-hover transition-colors"
                                >
                                    Report →
                                </a>
                            )}
                        </div>
                    </section>
                )}

                {/* Overview */}
                <section className="mb-12">
                    <SectionHeader>Overview</SectionHeader>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>{project.overview.description}</p>
                        <p>{project.overview.purpose}</p>
                    </div>
                </section>

                {/* Your Role */}
                <section className="mb-12">
                    <SectionHeader>Your Role</SectionHeader>
                    <div className="space-y-6">
                        <div>
                            <SubSectionHeader>What I Built</SubSectionHeader>
                            <BulletList items={project.role.built} />
                        </div>
                        <div>
                            <SubSectionHeader>What I Owned End-to-End</SubSectionHeader>
                            <BulletList items={project.role.owned} />
                        </div>
                    </div>
                </section>

                {/* Technical Highlights */}
                <section className="mb-12">
                    <SectionHeader>Technical Highlights</SectionHeader>
                    <div className="space-y-6">
                        <div>
                            <SubSectionHeader>Architecture Decisions</SubSectionHeader>
                            <BulletList items={project.technicalHighlights.architecture} />
                        </div>
                        <div>
                            <SubSectionHeader>Algorithms / Protocols / Constraints</SubSectionHeader>
                            <BulletList items={project.technicalHighlights.algorithms} />
                        </div>
                        {project.technicalHighlights.failureHandling && (
                            <div>
                                <SubSectionHeader>Failure Handling</SubSectionHeader>
                                <BulletList items={project.technicalHighlights.failureHandling} />
                            </div>
                        )}
                        {project.technicalHighlights.optimization && (
                            <div>
                                <SubSectionHeader>Optimization Strategies</SubSectionHeader>
                                <BulletList items={project.technicalHighlights.optimization} />
                            </div>
                        )}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-12">
                    <SectionHeader>Tech Stack</SectionHeader>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 bg-border/60 border border-border text-muted-foreground rounded text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Results / Learnings */}
                <section className="mb-12">
                    <SectionHeader>Results / Learnings</SectionHeader>
                    <div className="space-y-6">
                        <div>
                            <SubSectionHeader>What Worked</SubSectionHeader>
                            <BulletList items={project.results.achievements} />
                        </div>
                        <div>
                            <SubSectionHeader>What I Learned</SubSectionHeader>
                            <BulletList items={project.results.learnings} />
                        </div>
                        <div>
                            <SubSectionHeader>Tradeoffs Considered</SubSectionHeader>
                            <BulletList items={project.results.tradeoffs} />
                        </div>
                    </div>
                </section>

                {/* Navigation */}
                <div className="pt-8 border-t border-border">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/projects"
                            className="text-accent hover:text-accent-hover transition-colors"
                        >
                            ← View All Projects
                        </Link>
                        <div className="flex gap-4">
                            {prev && (
                                <Link
                                    href={`/projects/${prev.slug}`}
                                    className="text-accent hover:text-accent-hover transition-colors"
                                >
                                    ← {prev.title}
                                </Link>
                            )}
                            {next && (
                                <Link
                                    href={`/projects/${next.slug}`}
                                    className="text-accent hover:text-accent-hover transition-colors"
                                >
                                    {next.title} →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
