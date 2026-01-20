import Link from 'next/link'
import Nav from '@/app/components/Nav'
import ProjectCard from '@/app/components/ProjectCard'
import { getFeaturedProjects } from '@/data/projects'

export default function Home() {
    const featuredProjects = getFeaturedProjects()

    return (
        <div className="min-h-screen bg-background">
            <Nav />

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="mb-16">
                    <h1 className="text-5xl font-bold mb-4 text-foreground">
                        Parmeet Singh Virdi
                    </h1>
                    <p className="text-2xl text-muted-foreground mb-6">
                        Backend / Distributed Systems / Applied ML
                    </p>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                        Building reliable backend systems with fault tolerance, distributed consensus, and pragmatic ML applications.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-12">
                        <Link
                            href="/projects"
                            className="px-6 py-3 bg-accent text-white rounded hover:bg-accent-hover transition-colors font-medium"
                        >
                            View Projects
                        </Link>
                        <Link
                            href="/resume"
                            className="px-6 py-3 border border-border text-foreground rounded hover:border-accent hover:text-accent transition-colors font-medium"
                        >
                            View Resume
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-border text-foreground rounded hover:border-accent hover:text-accent transition-colors font-medium"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-border text-foreground rounded hover:border-accent hover:text-accent transition-colors font-medium"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="prose prose-invert max-w-3xl">
                        <h2 className="text-3xl font-semibold mb-6 text-foreground">About</h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            I build backend systems that handle scale, failures, and constraints. My focus is on distributed systems
                            architecture, fault tolerance mechanisms, and applying machine learning to solve real problems with
                            hard constraints.
                        </p>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            I'm interested in problems involving reliability guarantees, consensus algorithms, optimization under
                            constraints, and systems that need to work correctly when components fail. I prefer building systems
                            that are correct first, then fast—not the other way around.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            When working on ML projects, I focus on robustness, constraint satisfaction, and deployment considerations
                            rather than chasing metrics in isolation. The systems I build are designed to be maintainable, testable,
                            and reliable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-semibold mb-8 text-foreground">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} featured />
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="max-w-6xl mx-auto px-6 py-12 border-t border-border">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Contact</h2>
                <div className="flex flex-wrap gap-6 mb-6">
                    <a
                        href="mailto:parmeet@example.com"
                        className="text-accent hover:text-accent-hover transition-colors"
                    >
                        Email
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                    <Link
                        href="/resume"
                        className="px-6 py-2 border border-border text-foreground rounded hover:border-accent hover:text-accent transition-colors"
                    >
                        View Resume
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-border mt-12">
                <p className="text-muted text-sm text-center">
                    © {new Date().getFullYear()} Parmeet Singh Virdi
                </p>
            </footer>
        </div>
    )
}

