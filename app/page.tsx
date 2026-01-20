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
            <section className="max-w-6xl mx-auto px-6 pt-20 pb-8">
                <div>
                    <h1 className="text-5xl font-bold mb-2 text-foreground">
                        Parmeet Virdi
                    </h1>
                    <p className="text-2xl text-muted-foreground mb-3">
                        Backend / Distributed Systems / Applied ML / Full Stack
                    </p>
                    <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                        I work on distributed systems with failure recovery, and AI/ML tooling evaluated under real-world constraints and tradeoffs.</p>
                    <div className="flex flex-wrap gap-4 mb-10">
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
                    <div className="border border-border/50 bg-border/40 rounded-lg p-5 md:p-6">
                        <h2 className="text-3xl font-semibold mb-5 text-foreground">About</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <p className="text-muted-foreground leading-relaxed">
                                I build backend systems with a focus on reliability, performance, and maintainability. I’m interested in service design, data flow, and how systems evolve as complexity grows.
                                </p>

                                <p className="text-muted-foreground leading-relaxed">
                                I enjoy working across APIs, scaling, and failure handling, and thinking through practical tradeoffs. I also explore how machine learning can be applied to problems with real constraints, where practicality matters more than theory.
                            </p>
                            </div>
                            <div>
                                <ul className="space-y-1.5 text-muted-foreground">
                                <li className="flex items-start">
                                    <span className="mr-2 text-accent">•</span>
                                    <span>Backend system design, reliability, and failure handling</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-accent">•</span>
                                    <span>APIs, data flow, and service-to-service communication</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-accent">•</span>
                                    <span>Scalability, tradeoffs, and operational considerations</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-accent">•</span>
                                    <span>Applied machine learning under practical constraints</span>
                                </li>
                            </ul>                  
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} featured highlighted={index === 0} />
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="max-w-6xl mx-auto px-6 py-8">
                <div className="border border-border/50 bg-border/40 rounded-lg p-5 md:p-6">
                    <h2 className="text-3xl font-semibold mb-4 text-foreground">Contact</h2>
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
            <footer className="max-w-6xl mx-auto px-6 py-6 border-t border-border mt-8">
                <p className="text-muted text-sm text-center">
                    © {new Date().getFullYear()} Parmeet Virdi
                </p>
            </footer>
        </div>
    )
}

