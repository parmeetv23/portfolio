import Link from "next/link";
import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import { ApplicationFigure, CompilerStudy, Motion, Navigation, NetworkFigure, ProjectStrip } from "../editorial-v3/Interactions";
import PersonalNote from "./PersonalNote";

export const metadata: Metadata = {
  title: "Editorial personal | Design exploration",
  description: "Parmeet Virdi, software developer. Full-stack applications, React interfaces, backend services, and data integration.",
  openGraph: { title: "Parmeet Virdi | Editorial personal", description: "Private full-stack portfolio study", images: [{ url: "/icon.png", alt: "Parmeet Virdi" }] },
};

// Recorded mAP@0.50 on 74 real-occlusion images, from data/projects.ts and
// docs/professional-reference/evidence/occluded-pet-detector/PROJECT_ANALYSIS.md.
// This is a new chart of historical values, not a rerun or inference capture.
const results = [
  { name: "YOLOv8n", clean: "0.471", augmented: "0.345", cleanClass: "v3-yolo-clean", augmentedClass: "v3-yolo-augmented" },
  { name: "EfficientDet-D0", clean: "0.098", augmented: "0.112", cleanClass: "v3-efficient-clean", augmentedClass: "v3-efficient-augmented" },
];

export default function EditorialPersonal() {
  return <>
    <a className="lab-skip v3-skip" href="#v3-main">Skip to content</a>
    <Navigation/>
    <Motion>
      <main id="v3-main" className="v3-main" tabIndex={-1}>
        <section id="v3-overview" className="v3-hero v3-wrap" aria-labelledby="v3-title">
          <h1 id="v3-title">Parmeet<br/>Virdi</h1>
          <div className="v3-hero-intro">
            <p className="v3-introduction">I build full-stack<br/>web applications.</p>
            <p className="v3-hero-context">My work spans React interfaces, Python and Django services, and the data integrations that connect them.</p>
            <p className="v3-hero-current">Currently a software developer at Snap Remedy.</p>
            <a href="#v3-experience" className="v3-work-link">Professional experience <span aria-hidden="true">↓</span></a>
          </div>
        </section>
        <div className="v3-opening-foot v3-wrap"><span>Frontend development, backend systems &amp; data integration</span><span>Based in Calgary, Alberta</span></div>

        <section id="v3-experience" className="v3-experience v3-wrap" aria-labelledby="v3-experience-title">
          <div className="v3-section-heading"><h2 id="v3-experience-title">Professional experience</h2><Link href="/experience">Full experience <span aria-hidden="true">↗</span></Link></div>
          <article className="v3-current-feature">
            <div className="v3-current-copy">
              <div className="v3-current-meta"><span>{experiences[0]!.roles[0]!.dates}</span><span>Software Developer / Intern</span></div>
              <h3><Link href="/experience#snap-remedy">Snap Remedy</Link></h3>
              <p className="v3-current-lead">A decision-support application, from ERP data to React dashboards.</p>
              <p>I work across the application: Django APIs, rules-based SKU scoring, React interfaces, and ETL pipelines for Spire ERP data.</p>
              <p className="v3-current-context">The data work includes synchronization, pricing normalization, and validated CSV imports. I progressed from intern to developer in July 2026.</p>
              <p className="v3-current-stack">React / Django / Python / SQL</p>
              <Link className="v3-current-link" href="/experience#snap-remedy">More about my work <span aria-hidden="true">↗</span></Link>
            </div>
            <ApplicationFigure/>
          </article>
          <div className="v3-previous-roles">{experiences.slice(1).map(experience => <article className="v3-past-job" key={experience.id}><div className="v3-job-top"><h3><Link href={`/experience#${experience.id}`}>{experience.company}</Link></h3><span>{experience.roles[0]!.dates}</span></div><p className="v3-job-role">{experience.roles[0]!.title}</p><p>{experience.summary}</p><Link className="v3-role-link" href={`/experience#${experience.id}`}>View role <span aria-hidden="true">↗</span></Link></article>)}</div>
        </section>

        <section id="v3-work" className="v3-work v3-wrap" aria-labelledby="v3-work-title">
          <div className="v3-section-heading"><h2 id="v3-work-title">Selected projects</h2><Link href="/projects">View all projects <span aria-hidden="true">↗</span></Link></div>
          <div className="v3-project-grid">
            <article className="v3-chat-project">
              <NetworkFigure/>
              <div className="v3-project-description"><p className="v3-discipline">Distributed systems / Java NIO</p><h3><Link href="/projects/distributed-chat-system">A chat system across processes.</Link></h3><p>I implemented non-blocking networking, capacity-aware discovery, peer forwarding, and indexed message history in a Java course project.</p><div className="v3-project-bottom"><p>Selected recovery paths are implemented; complete failover is not established.</p><Link href="/projects/distributed-chat-system">Read project <span aria-hidden="true">↗</span></Link></div></div>
            </article>
            <article className="v3-pet-project">
              <figure className="v3-results"><div className="v3-chart-heading"><span>Real-occlusion evaluation</span><span>mAP@0.50</span></div><div className="v3-chart-legend" aria-hidden="true"><span><i className="v3-clean-key"/>Clean training</span><span><i className="v3-augmented-key"/>Occlusion-aware training</span></div><div className="v3-chart" aria-hidden="true">{results.map(result => <div className="v3-chart-group" key={result.name}><p>{result.name}</p><div className="v3-chart-row"><div className={`v3-bar v3-bar-clean ${result.cleanClass}`}/><span>{result.clean}</span></div><div className="v3-chart-row"><div className={`v3-bar v3-bar-augmented ${result.augmentedClass}`}/><span>{result.augmented}</span></div></div>)}<div className="v3-chart-axis"><span>0</span><span>0.2</span><span>0.4</span><span>0.6</span></div></div><div className="v3-sr-only"><table><caption>Recorded mAP at 0.50 on real-occlusion images</caption><thead><tr><th scope="col">Detector</th><th scope="col">Clean training</th><th scope="col">Occlusion-aware training</th></tr></thead><tbody>{results.map(result => <tr key={result.name}><th scope="row">{result.name}</th><td>{result.clean}</td><td>{result.augmented}</td></tr>)}</tbody></table></div><figcaption>Redrawn from recorded project results. 74 real-occlusion images; no new evaluation performed.</figcaption></figure>
              <div className="v3-project-description"><p className="v3-discipline">Computer vision / PyTorch</p><h3><Link href="/projects/occluded-pet-detection">Pet detection under occlusion.</Link></h3><p>I compared clean training with synthetic household-object occlusions. Transfer to real occlusions was mixed across the two detectors.</p><div className="v3-project-bottom"><p>A small evaluation set; repeated-seed studies and statistical significance are not established.</p><Link href="/projects/occluded-pet-detection">Read study <span aria-hidden="true">↗</span></Link></div></div>
            </article>
            <CompilerStudy/>
          </div>
          <ProjectStrip/>
        </section>

        <PersonalNote/>
      </main>
    </Motion>
    <footer id="v3-contact" className="v3-footer">
      <div className="v3-wrap">
        <div className="v3-contact">
          <div><p>Have a role or project in mind?</p><h2>Let’s talk.</h2></div>
          <div className="v3-contact-details"><a href="mailto:parmeetv1@gmail.com">parmeetv1@gmail.com <span aria-hidden="true">↗</span></a><p>Full-stack applications, web interfaces,<br/>backend systems, and data integration.</p></div>
        </div>
        <div className="v3-footer-bottom"><span>Parmeet Virdi</span><nav aria-label="Social and resume links"><a href="https://github.com/parmeetv23">GitHub</a><a href="https://www.linkedin.com/in/parmeet-virdi/">LinkedIn</a><Link href="/resume">Resume</Link><a href="#v3-overview">Back to top <span aria-hidden="true">↑</span></a></nav></div>
        <div className="v3-comparison"><span>Local prototype / Editorial personal</span><nav aria-label="Compare prototypes"><Link href="/design-lab/editorial-v3">Editorial V3</Link><Link href="/design-lab/editorial">Editorial V1</Link><Link href="/design-lab/experimental">Experimental</Link></nav></div>
      </div>
    </footer>
  </>;
}
