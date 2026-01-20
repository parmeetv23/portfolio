import Nav from '@/app/components/Nav'
import ProjectCard from '@/app/components/ProjectCard'
import Button from '@/app/components/Button'
import { getFeaturedProjects } from '@/data/projects'

export default function Home() {
    const featuredProjects = getFeaturedProjects()

    return (
        <div className="min-h-screen bg-background">
            <Nav />

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
                <div>
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
                        <Button href="/projects" variant="secondary">
                            Projects
                        </Button>
                        <Button href="/resume" variant="secondary">
                            Resume
                        </Button>
                        <Button href="https://github.com/parmeetv23" variant="secondary" external>
                            GitHub
                        </Button>
                        <Button href="https://www.linkedin.com/in/parmeet-virdi/" variant="secondary" external>
                            LinkedIn
                        </Button>
                    </div>

                    {/* About Section */}
                    <div className="border border-border bg-border/60 rounded-lg p-6 md:p-8">
                        <h2 className="text-3xl font-semibold mb-6 text-foreground">About</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    I build backend systems that handle scale, failures, and constraints. My focus is on distributed systems
                                    architecture, fault tolerance mechanisms, and applying machine learning to solve real problems with
                                    hard constraints.
                                </p>
                            </div>
                            <div>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        <span>Distributed systems with consensus algorithms and fault tolerance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        <span>Applied ML with constraint satisfaction and deployment considerations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        <span>Systems that prioritize correctness over performance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-accent">•</span>
                                        <span>Reliability guarantees and optimization under constraints</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
            <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
                <div className="border border-border bg-border/60 rounded-lg p-6 md:p-8">
                    <h2 className="text-3xl font-semibold mb-6 text-foreground">Contact</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button href="mailto:parmeetv1@gmail.com" variant="secondary" external>
                            Email
                        </Button>
                        <Button href="https://github.com/parmeetv23" variant="secondary" external>
                            GitHub
                        </Button>
                        <Button href="https://www.linkedin.com/in/parmeet-virdi/" variant="secondary" external>
                            LinkedIn
                        </Button>
                    </div>
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

