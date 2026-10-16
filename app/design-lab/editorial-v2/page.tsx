import Link from "next/link";
import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import { NetworkStudy } from "./Diagrams";
import { CompilerStudy, ImportFigure, Motion, ProjectStrip, TechnicalNotes } from "./Interactions";

export const metadata: Metadata = {
  title: "Editorial V2 | Design exploration",
  description: "A private portfolio study for Parmeet Virdi. Backend systems, data tools, and applied machine learning.",
  openGraph: { title: "Parmeet Virdi | Editorial V2", description: "Private editorial portfolio study", images: [{ url: "/icon.png", width: 512, height: 512, alt: "Parmeet Virdi" }] },
};

// Recorded mAP@0.50 on 74 real-occlusion images, from data/projects.ts and
// docs/professional-reference/evidence/occluded-pet-detector/PROJECT_ANALYSIS.md.
// This is a new chart of historical values, not a rerun or inference capture.
const results = [
  { name: "YOLOv8n", clean: "0.471", augmented: "0.345", cleanClass: "v2-yolo-clean", augmentedClass: "v2-yolo-augmented" },
  { name: "EfficientDet-D0", clean: "0.098", augmented: "0.112", cleanClass: "v2-efficient-clean", augmentedClass: "v2-efficient-augmented" },
];

export default function EditorialV2() {
  return <>
    <a className="lab-skip v2-skip" href="#v2-main">Skip to content</a>
    <header className="v2-header v2-wrap">
      <Link href="/design-lab/editorial-v2" className="v2-monogram" aria-label="Parmeet Virdi, Editorial V2 home">pv<span aria-hidden="true">.</span></Link>
      <p className="v2-header-role">Software developer<br/>Calgary, Alberta</p>
      <nav aria-label="Portfolio navigation"><a href="#v2-work">Projects</a><a href="#v2-experience">Experience</a><a href="#v2-contact">Contact</a><Link className="v2-resume" href="/resume">Resume <span aria-hidden="true">↗</span></Link></nav>
    </header>
    <Motion>
      <main id="v2-main" className="v2-main">
        <section className="v2-hero v2-wrap" aria-labelledby="v2-title">
          <div className="v2-hero-copy"><h1 id="v2-title">Parmeet<br/>Virdi</h1><p className="v2-introduction">I build backend systems,<br/>data tools, and interfaces.</p><p className="v2-hero-context">Currently a software developer at Snap Remedy, working with Django, React, and ERP data.</p><a href="#v2-work" className="v2-work-link">Selected projects <span aria-hidden="true">↓</span></a></div>
          <ImportFigure/>
        </section>
        <div className="v2-opening-foot v2-wrap"><span>Backend engineering &amp; applied machine learning</span><span>A selection of professional and project work</span></div>

        <section id="v2-work" className="v2-work v2-wrap" aria-labelledby="v2-work-title">
          <div className="v2-section-heading"><h2 id="v2-work-title">Selected projects</h2><Link href="/projects">View all projects <span aria-hidden="true">↗</span></Link></div>
          <div className="v2-project-grid">
            <article className="v2-chat-project">
              <Link href="/projects/distributed-chat-system" className="v2-network-link" aria-label="Read the IRC-HAT project"><figure className="v2-network"><div className="v2-visual-title"><span>IRC-HAT</span><span>Distributed chat system</span></div><NetworkStudy/><figcaption>Conceptual architecture study</figcaption></figure></Link>
              <div className="v2-project-description"><p className="v2-discipline">Distributed systems / Java NIO</p><h3><Link href="/projects/distributed-chat-system">A chat system across processes.</Link></h3><p>I implemented non-blocking networking, capacity-aware discovery, peer forwarding, and indexed message history in a Java course project.</p><div className="v2-project-bottom"><p>Selected recovery paths are implemented; complete failover is not established.</p><Link href="/projects/distributed-chat-system">Read project <span aria-hidden="true">↗</span></Link></div></div>
            </article>
            <article className="v2-pet-project">
              <figure className="v2-results"><div className="v2-chart-heading"><span>Real-occlusion evaluation</span><span>mAP@0.50</span></div><div className="v2-chart-legend" aria-hidden="true"><span><i className="v2-clean-key"/>Clean training</span><span><i className="v2-augmented-key"/>Occlusion-aware training</span></div><div className="v2-chart" aria-hidden="true">{results.map(result => <div className="v2-chart-group" key={result.name}><p>{result.name}</p><div className="v2-chart-row"><div className={`v2-bar v2-bar-clean ${result.cleanClass}`}/><span>{result.clean}</span></div><div className="v2-chart-row"><div className={`v2-bar v2-bar-augmented ${result.augmentedClass}`}/><span>{result.augmented}</span></div></div>)}<div className="v2-chart-axis"><span>0</span><span>0.2</span><span>0.4</span><span>0.6</span></div></div><div className="v2-sr-only"><table><caption>Recorded mAP at 0.50 on real-occlusion images</caption><thead><tr><th scope="col">Detector</th><th scope="col">Clean training</th><th scope="col">Occlusion-aware training</th></tr></thead><tbody>{results.map(result => <tr key={result.name}><th scope="row">{result.name}</th><td>{result.clean}</td><td>{result.augmented}</td></tr>)}</tbody></table></div><figcaption>Redrawn from recorded project results. 74 real-occlusion images; no new evaluation performed.</figcaption></figure>
              <div className="v2-project-description"><p className="v2-discipline">Computer vision / PyTorch</p><h3><Link href="/projects/occluded-pet-detection">Pet detection under occlusion.</Link></h3><p>I compared clean training with synthetic household-object occlusions. Transfer to real occlusions was mixed across the two detectors.</p><div className="v2-project-bottom"><p>A small evaluation set; repeated-seed studies and statistical significance are not established.</p><Link href="/projects/occluded-pet-detection">Read study <span aria-hidden="true">↗</span></Link></div></div>
            </article>
            <CompilerStudy/>
          </div>
          <ProjectStrip/>
        </section>

        <section id="v2-experience" className="v2-practice v2-wrap" aria-labelledby="v2-practice-title">
          <div className="v2-practice-heading"><h2 id="v2-practice-title">Professional<br/>experience</h2><p>Data integrations, internal tools, and work on live websites.</p><Link href="/experience">Full experience <span aria-hidden="true">↗</span></Link></div>
          <div className="v2-experience-content">
            <article className="v2-current-job"><div className="v2-job-top"><h3><Link href="/experience#snap-remedy">Snap Remedy</Link></h3><span>{experiences[0]!.roles[0]!.dates}</span></div><p className="v2-job-role">Software Developer / Intern</p><p className="v2-reading">{"I build data pipelines and interfaces for a decision-support application, from importing Spire ERP records to exploring SKU rankings in React.".split(" ").map((word, i) => <span key={i}>{word} </span>)}</p><p className="v2-job-context">I progressed from intern to developer in July 2026. My work includes resumable synchronization, Django APIs, rules-based scoring, and tests for import and rollback behavior.</p><TechnicalNotes/></article>
            {experiences.slice(1).map(experience => <article className="v2-past-job" key={experience.id}><div className="v2-job-top"><h3><Link href={`/experience#${experience.id}`}>{experience.company}</Link></h3><span>{experience.roles[0]!.dates}</span></div><p className="v2-job-role">{experience.roles[0]!.title}</p><p>{experience.summary}</p></article>)}
          </div>
        </section>
      </main>
    </Motion>
    <footer id="v2-contact" className="v2-footer"><div className="v2-wrap"><div className="v2-contact"><div><p>Have a role or project in mind?</p><h2>Let’s talk.</h2></div><div className="v2-contact-details"><a href="mailto:parmeetv1@gmail.com">parmeetv1@gmail.com <span aria-hidden="true">↗</span></a><p>Backend development, distributed systems,<br/>and applied machine learning.</p></div></div><div className="v2-footer-bottom"><span>Parmeet Virdi</span><nav aria-label="Social and resume links"><a href="https://github.com/parmeetv23">GitHub</a><a href="https://www.linkedin.com/in/parmeet-virdi/">LinkedIn</a><Link href="/resume">Resume</Link></nav><div className="v2-comparison"><Link href="/design-lab/editorial">Editorial V1</Link><Link href="/design-lab/experimental">Experimental</Link><span>Local prototype / V2</span></div></div></div></footer>
  </>;
}
