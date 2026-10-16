import Link from "next/link";
import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import ProjectStage from "./ProjectStage";

export const metadata: Metadata = { title: "Look Closer | Design exploration" };

export default function ExperimentalPrototype() {
  return (
    <div className="experimental">
      <a className="lab-skip" href="#experimental-main">Skip to content</a>
      <header className="ex-header"><Link className="ex-name" href="/design-lab/experimental">Parmeet Virdi<span aria-hidden="true">✳</span></Link><nav aria-label="Main navigation"><a href="#ex-projects">Projects</a><a href="#ex-experience">Experience</a><Link href="/resume">Resume</Link><a href="#ex-contact">Say hello</a></nav></header>
      <main id="experimental-main">
        <section className="ex-hero" aria-labelledby="ex-title"><div className="ex-hero-top"><p>Software developer.<br />Backend, systems &amp; applied ML.</p><p>Interested in the parts<br />you don’t always see.</p></div><div className="ex-title-layout"><h1 id="ex-title">Look<br />closer<span aria-hidden="true">.</span></h1><div className="ex-hero-object" aria-hidden="true"><div className="ex-object-back"><span>Under the surface</span><svg viewBox="0 0 300 300"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="150" cy="150" r="94"/><circle cx="150" cy="150" r="62"/><path d="M20 150 H280 M150 20 V280 M58 58 L242 242 M58 242 L242 58"/></g><circle cx="150" cy="150" r="13" fill="currentColor"/></svg></div><div className="ex-object-front"><span>There’s more<br />to the story.</span><span className="ex-object-mark">↙</span></div></div></div><div className="ex-hero-bottom"><p>I’m Parmeet. I build software that connects data, people, and the systems behind them.</p><a href="#ex-projects" className="ex-enter">Take a closer look <span aria-hidden="true">↓</span></a></div></section>
        <ProjectStage />
        <section id="ex-experience" className="ex-experience" aria-labelledby="ex-experience-heading"><div className="ex-experience-heading"><h2 id="ex-experience-heading">Real work.<br />Real constraints.</h2><p>Data integrations, internal tools,<br />and getting things into people’s hands.</p></div><div className="ex-jobs">{experiences.map(experience => <article className="ex-job" key={experience.id}><div className="ex-job-heading"><h3><Link href={`/experience#${experience.id}`}>{experience.company}</Link></h3><span>{experience.roles[0]?.dates}</span></div><div className="ex-job-body"><p>{experience.roles[0]?.title}</p><p>{experience.summary}</p><Link href={`/experience#${experience.id}`} aria-label={`Read experience at ${experience.company}`}><span aria-hidden="true">↗</span></Link></div></article>)}</div><Link className="ex-experience-link" href="/experience">More about my experience <span aria-hidden="true">↗</span></Link></section>
      </main>
      <footer id="ex-contact" className="ex-footer"><p>Have something in mind?</p><a className="ex-hello" href="mailto:parmeetv1@gmail.com">Let’s talk<span aria-hidden="true">↗</span></a><div className="ex-footer-bottom"><span>Parmeet Virdi</span><div><a href="https://github.com/parmeetv23">GitHub</a><a href="https://www.linkedin.com/in/parmeet-virdi/">LinkedIn</a><Link href="/resume">Resume</Link></div><span>Local design study / Look Closer</span></div></footer>
    </div>
  );
}
