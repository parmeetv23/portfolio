import Nav from "@/app/components/Nav";
import ProjectCard from "@/app/components/ProjectCard";
import Button from "@/app/components/Button";
import { getFeaturedProjects } from "@/data/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

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
            Backend / Distributed Systems / Applied ML
          </p>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Building reliable backend systems with fault tolerance, replication,
            recovery, and pragmatic ML applications.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Button href="/projects" variant="secondary">
              Projects
            </Button>
            <Button href="/resume" variant="secondary">
              Resume
            </Button>
            <Button
              href="https://github.com/parmeetv23"
              variant="secondary"
              external
            >
              GitHub
            </Button>
            <Button
              href="https://www.linkedin.com/in/parmeet-virdi/"
              variant="secondary"
              external
            >
              LinkedIn
            </Button>
          </div>

          {/* About Section */}
          <div className="border border-border/50 bg-border/40 rounded-lg p-5 md:p-6">
            <h2 className="text-3xl font-semibold mb-5 text-foreground">
              About
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  I build backend systems with a focus on reliability,
                  performance, and maintainability. I’m interested in service
                  design, data flow, and how systems evolve as complexity grows.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I enjoy working across APIs, scaling, and failure handling,
                  and thinking through practical tradeoffs. I also explore how
                  machine learning can be applied to problems with real
                  constraints, where practicality matters more than theory.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Areas of Focus
                </h3>

                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span>
                      Backend system design, reliability, and failure handling
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span>
                      APIs, data flow, and service-to-service communication
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span>
                      Scalability, tradeoffs, and operational considerations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span>
                      Applied machine learning under practical constraints
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-accent">•</span>
                    <span>
                      Clear system design and long-term maintainability
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-6 py-2">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              highlighted={index === 0}
            />
          ))}
        </div>
      </section>
      {/* Core Technical Stack */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">
          Core Technical Stack
        </h2>

        <div className="border border-border/50 bg-border/40 rounded-lg p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
            {/* Backend & Distributed Systems */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Backend & Distributed Systems
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed">
                <li>
                  Event-driven backend systems using Java NIO and non-blocking
                  I/O
                </li>
                <li>
                  Replication, failure detection, recovery, and reconnect
                  semantics
                </li>
                <li>
                  Concurrency control, message ordering (vector timestamps), and
                  deduplication
                </li>
              </ul>
            </div>

            {/* APIs & Data */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                APIs & Data Flow
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed">
                <li>
                  RESTful APIs, service-to-service communication, and protocol
                  design
                </li>
                <li>
                  Authentication and session handling (JWT, cookies, RBAC)
                </li>
                <li>Relational data modeling and querying with MySQL</li>
              </ul>
            </div>

            {/* Applied Machine Learning */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Applied Machine Learning
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed">
                <li>
                  PyTorch and scikit-learn for training and evaluation pipelines
                </li>
                <li>
                  Dataset construction, augmentation, and metric-driven analysis
                </li>
                <li>
                  Applying ML under real constraints (data quality, compute,
                  deployment tradeoffs)
                </li>
              </ul>
            </div>

            {/* Tooling & Infrastructure */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Tooling & Infrastructure
              </h3>
              <ul className="space-y-1 text-sm leading-relaxed">
                <li>
                  Docker and Docker Compose for reproducible local and
                  multi-service setups
                </li>
                <li>
                  Build and test workflows with Gradle/Maven and JUnit/Pytest
                </li>
                <li>
                  Linux-based development, scripting, and Git-based
                  collaboration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-8">
        <div className="border border-border/50 bg-border/40 rounded-lg p-5 md:p-6">
          <h2 className="text-3xl font-semibold mb-4 text-foreground">
            Contact
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button
              href="mailto:parmeetv1@gmail.com"
              variant="secondary"
              external
            >
              Email
            </Button>
            <Button
              href="https://github.com/parmeetv23"
              variant="secondary"
              external
            >
              GitHub
            </Button>
            <Button
              href="https://www.linkedin.com/in/parmeet-virdi/"
              variant="secondary"
              external
            >
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
        <p className="text-xs text-muted-foreground">
          Built with Next.js · TypeScript · Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
