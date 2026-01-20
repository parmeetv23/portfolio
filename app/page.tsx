import Link from 'next/link'
import Nav from './components/Nav'
import ProjectCard from './components/ProjectCard'
import { getFeaturedProjects } from '@/data/projects'

export default function Home() {
    const featuredProjects = getFeaturedProjects()

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Nav />

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="mb-16">
                    <h1 className="text-5xl font-bold mb-4 text-[#e5e5e5]">
                        Parmeet Singh Virdi
                    </h1>
                    <p className="text-2xl text-[#a3a3a3] mb-6">
                        Backend / Distributed Systems / Applied ML
                    </p>
                    <p className="text-lg text-[#a3a3a3] mb-8 max-w-2xl">
                        Building reliable backend systems with fault tolerance, distributed consensus, and pragmatic ML applications.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-12">
                        <Link
                            href="/projects"
                            className="px-6 py-3 bg-[#3b82f6] text-white rounded hover:bg-[#2563eb] transition-colors font-medium"
                        >
                            View Projects
                        </Link>
                        <a
                            href="/Parmeet_Virdi_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-[#262626] text-[#e5e5e5] rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors font-medium"
                        >
                            View Resume
                        </a>
                        <a
                            href="/Parmeet_Virdi_Resume.pdf"
                            download="Parmeet_Virdi_Resume.pdf"
                            className="px-6 py-3 border border-[#262626] text-[#e5e5e5] rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors font-medium"
                        >
                            Download Resume
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-[#262626] text-[#e5e5e5] rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors font-medium"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-[#262626] text-[#e5e5e5] rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors font-medium"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="prose prose-invert max-w-3xl">
                        <h2 className="text-3xl font-semibold mb-6 text-[#e5e5e5]">About</h2>
                        <p className="text-[#a3a3a3] mb-4 leading-relaxed">
                            I build backend systems that handle scale, failures, and constraints. My focus is on distributed systems
                            architecture, fault tolerance mechanisms, and applying machine learning to solve real problems with
                            hard constraints.
                        </p>
                        <p className="text-[#a3a3a3] mb-4 leading-relaxed">
                            I'm interested in problems involving reliability guarantees, consensus algorithms, optimization under
                            constraints, and systems that need to work correctly when components fail. I prefer building systems
                            that are correct first, then fast—not the other way around.
                        </p>
                        <p className="text-[#a3a3a3] leading-relaxed">
                            When working on ML projects, I focus on robustness, constraint satisfaction, and deployment considerations
                            rather than chasing metrics in isolation. The systems I build are designed to be maintainable, testable,
                            and reliable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-semibold mb-8 text-[#e5e5e5]">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} featured />
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#262626]">
                <h2 className="text-3xl font-semibold mb-6 text-[#e5e5e5]">Contact</h2>
                <div className="flex flex-wrap gap-6 mb-6">
                    <a
                        href="mailto:parmeet@example.com"
                        className="text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                    >
                        Email
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3b82f6] hover:text-[#2563eb] transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                    <a
                        href="/Parmeet_Virdi_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border border-[#262626] text-[#e5e5e5] rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors"
                    >
                        View Resume
                    </a>
                    <a
                        href="/Parmeet_Virdi_Resume.pdf"
                        download="Parmeet_Virdi_Resume.pdf"
                        className="px-6 py-2 border border-[#262626] text-[#e5e5e5] rounded hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors"
                    >
                        Download Resume
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-[#262626] mt-12">
                <p className="text-[#525252] text-sm text-center">
                    © {new Date().getFullYear()} Parmeet Singh Virdi
                </p>
            </footer>
        </div>
    )
}

