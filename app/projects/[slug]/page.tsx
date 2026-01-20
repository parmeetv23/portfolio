import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { getProjectBySlug, projects } from '@/data/projects'

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Parmeet Singh Virdi`,
        description: project.summary,
    }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug)

    if (!project) {
        notFound()
    }

    // TypeScript now knows project is defined after notFound() check
    // But we need to assert it for TypeScript
    const safeProject = project!

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Nav />

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Back Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] mb-8 transition-colors"
                >
                    ← Back to Projects
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {safeProject.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-[#262626] text-[#a3a3a3] rounded border border-[#262626]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-[#e5e5e5]">{safeProject.title}</h1>
                    <p className="text-xl text-[#a3a3a3]">{safeProject.summary}</p>
                </header>

                {/* Overview */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e5e5e5]">Overview</h2>
                    <div className="space-y-4 text-[#a3a3a3] leading-relaxed">
                        <p>{safeProject.overview.description}</p>
                        <p>{safeProject.overview.purpose}</p>
                    </div>
                </section>

                {/* Your Role */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e5e5e5]">Your Role</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">What I Built</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.role.built.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">What I Owned End-to-End</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.role.owned.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Technical Highlights */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e5e5e5]">Technical Highlights</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">Architecture Decisions</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.technicalHighlights.architecture.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">Algorithms / Protocols / Constraints</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.technicalHighlights.algorithms.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        {safeProject.technicalHighlights.failureHandling && (
                            <div>
                                <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">Failure Handling</h3>
                                <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                    {safeProject.technicalHighlights.failureHandling.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {safeProject.technicalHighlights.optimization && (
                            <div>
                                <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">Optimization Strategies</h3>
                                <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                    {safeProject.technicalHighlights.optimization.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e5e5e5]">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {safeProject.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 bg-[#171717] border border-[#262626] text-[#a3a3a3] rounded text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Results / Learnings */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e5e5e5]">Results / Learnings</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">What Worked</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.results.achievements.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">What I Learned</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.results.learnings.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-[#e5e5e5]">Tradeoffs Considered</h3>
                            <ul className="list-disc list-inside space-y-2 text-[#a3a3a3] ml-4">
                                {safeProject.results.tradeoffs.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Navigation */}
                <div className="pt-8 border-t border-[#262626]">
                    <Link
                        href="/projects"
                        className="text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                    >
                        ← View All Projects
                    </Link>
                </div>
            </div>
        </div>
    )
}

