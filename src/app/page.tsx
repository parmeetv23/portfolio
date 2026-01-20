import Link from "next/link";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects, projects } from "@/data/projects";

export default function Home() {
  const more = projects.filter((p) => !p.featuredRank);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16">
      {/* Nav */}
      <header className="sticky top-4 z-20 mt-4 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white/70">Parmeet Singh Virdi</p>
            <p className="text-base font-semibold tracking-tight">
              Backend • Distributed Systems • Applied ML
            </p>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm">
            <a className="rounded-full border border-white/10 px-3 py-1 text-white/70 hover:text-white" href="#projects">
              Projects
            </a>
            <a className="rounded-full border border-white/10 px-3 py-1 text-white/70 hover:text-white" href="#about">
              About
            </a>
            <a className="rounded-full border border-white/10 px-3 py-1 text-white/70 hover:text-white" href="#contact">
              Contact
            </a>
            <Link
              className="rounded-full border border-white/10 px-3 py-1 text-white/70 hover:text-white"
              href="/projects"
            >
              All Projects
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          I build reliable backend systems and practical AI —
          especially where failures and constraints matter.
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Computer Science @ University of Calgary. I like distributed systems, networking,
          and optimization-driven ML projects. My flagship work: a fault-tolerant distributed chat system.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold hover:bg-white/[0.08]"
          >
            View featured projects
          </a>
          {/* Replace these with real links */}
          <a
            href="#"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.05]"
          >
            GitHub
          </a>
          <a
            href="#"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.05]"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <Section id="projects" title="Featured Projects" hint="Top work first — case studies included">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-white/70">
            More projects (for diversity):{" "}
            {more.map((p, i) => (
              <span key={p.slug}>
                <Link className="font-semibold text-white/85 hover:underline" href={`/projects/${p.slug}`}>
                  {p.title}
                </Link>
                {i < more.length - 1 ? " • " : ""}
              </span>
            ))}
          </p>
        </div>
      </Section>

      {/* About */}
      <Section id="about" title="About" hint="Short, specific, backend-leaning">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold">What I enjoy</h3>
            <p className="mt-2 text-sm text-white/70">
              Systems that need to stay correct under stress: failures, latency, concurrency,
              scaling, and hard constraints. I like building the “invisible” parts that make products reliable.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold">How I build</h3>
            <p className="mt-2 text-sm text-white/70">
              Clear architecture, testable components, readable docs, and repeatable runs
              (Docker when it helps). I try to make projects easy for someone else to understand and run.
            </p>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" hint="Replace placeholders">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-white/70">
            Email: <a className="font-semibold text-white/85 hover:underline" href="mailto:youremail@example.com">youremail@example.com</a>
            <br />
            GitHub: <a className="font-semibold text-white/85 hover:underline" href="#">github.com/your-handle</a>
            {" • "}
            LinkedIn: <a className="font-semibold text-white/85 hover:underline" href="#">linkedin.com/in/your-handle</a>
          </p>
        </div>
      </Section>

      <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
        © {new Date().getFullYear()} Parmeet Singh Virdi • Built with Next.js • Hosted on Vercel
      </footer>
    </div>
  );
}
