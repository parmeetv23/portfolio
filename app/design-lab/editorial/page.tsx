import Link from "next/link";
import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import { getProjectBySlug } from "@/data/projects";
import { ChatIllustration, ImportIllustration, PetIllustration } from "../Illustrations";

export const metadata: Metadata = { title: "The Working Edition | Design exploration" };

export default function EditorialPrototype() {
  const chat = getProjectBySlug("distributed-chat-system");
  const pet = getProjectBySlug("occluded-pet-detection");
  const current = experiences[0];
  if (!chat || !pet || !current) return null;

  return (
    <div className="editorial">
      <a className="lab-skip" href="#editorial-main">Skip to content</a>
      <header className="ed-header ed-wrap">
        <Link href="/design-lab/editorial" className="ed-name" aria-label="Parmeet Virdi, prototype home">Parmeet<br />Virdi<span aria-hidden="true">.</span></Link>
        <p className="ed-header-note">A working portfolio<br />of software &amp; systems</p>
        <nav aria-label="Main navigation"><a href="#selected-work">Projects</a><a href="#working-history">Experience</a><Link href="/resume">Resume</Link><a href="#ed-contact">Contact</a></nav>
      </header>

      <main id="editorial-main">
        <section className="ed-hero ed-wrap" aria-labelledby="ed-title">
          <h1 id="ed-title">Software for<br />imperfect<br />conditions.</h1>
          <div className="ed-intro"><span className="ed-small-symbol" aria-hidden="true">✳</span><p>I’m Parmeet, a software developer working across backend systems, distributed computing, and applied machine learning.</p><p>I’m interested in what happens when the data is messy, the connection breaks, or the happy path ends.</p><a className="ed-text-link" href="#selected-work">Explore selected work <span aria-hidden="true">↘</span></a></div>
          <div className="ed-hero-foot"><span>Reliability. Practicality. Clear thinking.</span><span>Currently building at Snap Remedy</span></div>
        </section>

        <section className="ed-current ed-wrap" aria-labelledby="ed-current-heading">
          <div className="ed-current-copy"><p className="ed-kicker">In practice</p><h2 id="ed-current-heading">An interruption.<br />Not a fresh start.</h2><p>At Snap Remedy, I built resumable ETL pipelines for Spire ERP data, with persistent checkpoints, bounded retries, and transactional imports.</p><p className="ed-current-detail">Part of a decision-support application combining Django APIs, rules-based SKU ranking, and React dashboards.</p><Link href={`/experience#${current.id}`} className="ed-text-link">Read about my current work <span aria-hidden="true">↗</span></Link></div>
          <figure className="ed-import"><ImportIllustration /><figcaption>Conceptual illustration of checkpoint-based processing</figcaption></figure>
        </section>

        <section id="selected-work" className="ed-projects ed-wrap" aria-labelledby="ed-project-heading">
          <div className="ed-section-heading"><h2 id="ed-project-heading">Selected investigations</h2><Link className="ed-text-link" href="/projects">All nine projects <span aria-hidden="true">↗</span></Link></div>
          <div className="ed-project-grid">
            <article className="ed-project ed-project-chat"><Link href={`/projects/${chat.slug}`} className="ed-project-image ed-chat-image" aria-label={`Read ${chat.title}`}><span className="ed-art-title" aria-hidden="true">Hello,<br />elsewhere.</span><ChatIllustration /><span className="ed-art-caption">Conceptual illustration</span></Link><div className="ed-project-meta"><span>Distributed systems</span><span>Java NIO / TCP</span></div><h3><Link href={`/projects/${chat.slug}`}>IRC-HAT</Link></h3><p>{chat.summary}</p><p className="ed-project-note">A course project exploring networking, coordination, and persistence.</p></article>
            <article className="ed-project ed-project-pet"><Link href={`/projects/${pet.slug}`} className="ed-project-image ed-pet-image" aria-label={`Read ${pet.title}`}><PetIllustration /><span className="ed-art-caption">Conceptual illustration, not a detection result</span></Link><div className="ed-project-meta"><span>Applied machine learning</span><span>PyTorch</span></div><h3><Link href={`/projects/${pet.slug}`}>What remains visible?</Link></h3><p>A study of pet detection under partial visibility, comparing clean and synthetic-occlusion training.</p><p className="ed-project-note">Mixed real-occlusion results. Findings and limitations documented.</p></article>
          </div>
          <Link href="/projects/j-minus-minus-mips-compiler" className="ed-further"><span>Also in the collection</span><span>J-- to MIPS Compiler</span><span>Language, semantics, and code generation <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section id="working-history" className="ed-history ed-wrap" aria-labelledby="ed-history-heading"><div className="ed-section-heading"><h2 id="ed-history-heading">A working history</h2><Link className="ed-text-link" href="/experience">Full experience <span aria-hidden="true">↗</span></Link></div><div className="ed-jobs">{experiences.map(experience => <article key={experience.id} className="ed-job"><div><p className="ed-job-date">{experience.roles[0]?.dates}</p><h3><Link href={`/experience#${experience.id}`}>{experience.company}</Link></h3></div><div><p className="ed-job-role">{experience.roles[0]?.title}</p><p>{experience.summary}</p></div></article>)}</div></section>
      </main>

      <footer id="ed-contact" className="ed-footer"><div className="ed-wrap"><div className="ed-footer-main"><h2>Good work starts<br />with a conversation.</h2><div><p>Open to backend, distributed systems,<br />and applied ML opportunities.</p><a className="ed-email" href="mailto:parmeetv1@gmail.com">parmeetv1@gmail.com <span aria-hidden="true">↗</span></a></div></div><div className="ed-footer-bottom"><span>Parmeet Virdi</span><div><a href="https://github.com/parmeetv23">GitHub</a><a href="https://www.linkedin.com/in/parmeet-virdi/">LinkedIn</a><Link href="/resume">Resume</Link></div><span>Local design study / The Working Edition</span></div></div></footer>
    </div>
  );
}
