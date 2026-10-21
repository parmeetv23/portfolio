import { ChatPreview, CompilerPreview, PetPreview } from "@/app/components/editorial/ProjectPreview";
import '@/app/projects-gallery.css';
import Link from "next/link";
import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import {
  ProjectStrip,
} from "@/app/components/editorial/Interactions";
import { CompilerStudy } from "@/app/components/editorial/ProjectTechnicalFigure";
import PersonalNote from "@/app/components/editorial/PersonalNote";
import SnapRemedyArchitecture from "@/app/components/editorial/SnapRemedyArchitecture";

export const metadata: Metadata = {
  title: "Software developer",
  description:
    "Parmeet Virdi, software developer. Full-stack applications, React interfaces, backend services, and data integration.",
  openGraph: {
    title: "Parmeet Virdi | Software developer",
    description:
      "Full-stack applications, backend systems, and applied machine learning.",
    images: [{ url: "/icon.png", alt: "Parmeet Virdi" }],
  },
};

export default function EditorialPersonalSecondPhoto() {
  return (
    <>
      <main id="main-content" className="v3-main" tabIndex={-1}>
        <section
          id="v3-overview"
          className="v3-hero v3-wrap"
          aria-labelledby="v3-title"
        >
          <h1 id="v3-title">
            Parmeet
            <br />
            Virdi
          </h1>
          <div className="v3-hero-intro">
            <p className="v3-introduction">
              I build full-stack software and distributed systems.
            </p>
            <p className="v3-hero-context">
              My work spans backend systems, distributed computing, React
              interfaces, and data integration. My projects explore scalable
              services and applied machine learning.
            </p>
            <p className="v3-hero-current">
              Currently a software developer at{' '}
              <Link href="/experience/snap-remedy">Snap Remedy</Link>.
            </p>
            <a href="#v3-experience" className="v3-work-link">
              Professional experience <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <div className="v3-opening-foot v3-wrap">
          <span>
            Backend systems, data integration &amp; frontend development{" "}
          </span>
          <span>Based in Calgary, Alberta</span>
        </div>

        <section
          id="v3-experience"
          className="v3-experience v3-wrap"
          aria-labelledby="v3-experience-title"
        >
          <div className="v3-section-heading">
            <h2 id="v3-experience-title">Professional experience</h2>
            <Link href="/experience">
              Full experience <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <article className="v3-current-feature">
            <div className="v3-current-copy">
              <div className="v3-current-meta">
                <span>{experiences[0]!.dates}</span>
                <span>{experiences[0]!.roles[0]!.title}</span>
              </div>
              <h3>
                <Link href="/experience#snap-remedy">Snap Remedy</Link>
              </h3>
              <p className="v3-current-lead">
                ERP data pipelines and configurable SKU ranking
              </p>
              <p>
                I developed the Django backend and React frontend, including
                the relational data model and the interface for configuring
                comparisons and inspecting results.
              </p>
              <p className="v3-current-context">
                ETL pipelines map incoming records into local storage, with
                checkpoints supporting failed-page replay.
              </p>
              <p className="v3-current-stack">Python / Django / React / SQL</p>
              <Link className="v3-current-link" href="/experience#snap-remedy">
                More about my work <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <SnapRemedyArchitecture compact />
          </article>
          <div className="v3-previous-roles">
            {experiences.slice(1).map((experience) => (
              <article className="v3-past-job" key={experience.id}>
                <div className="v3-job-top">
                  <h3>
                    <Link href={`/experience#${experience.id}`}>
                      {experience.company}
                    </Link>
                  </h3>
                  <span>{experience.roles[0]!.dates}</span>
                </div>
                <p className="v3-job-role">{experience.roles[0]!.title}</p>
                <p>{experience.summary}</p>
                <Link
                  className="v3-role-link"
                  href={`/experience#${experience.id}`}
                >
                  View role <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="v3-work"
          className="v3-work v3-wrap"
          aria-labelledby="v3-work-title"
        >
          <div className="v3-section-heading">
            <h2 id="v3-work-title">Selected projects</h2>
            <Link href="/projects">
              View all projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="v3-project-grid">
            <article className="v3-chat-project">
              <ChatPreview />
              <div className="v3-project-description">
                <p className="v3-discipline">Distributed systems / Java NIO</p>
                <h3>
                  <Link href="/projects/distributed-chat-system">
                    Distributed Chat System
                  </Link>
                </h3>
                <p>
                  I built IRC-HAT with custom TCP networking, configurable gossip
                  replication, and primary-led server discovery
                  backed by replicated registries.
                </p>
                <div className="v3-project-bottom">
                  <p>
                    Java NIO / Replication / Bully leader election
                  </p>
                  <Link href="/projects/distributed-chat-system">
                    Read project <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
            <article className="v3-pet-project">
              <PetPreview />
              <div className="v3-project-description">
                <p className="v3-discipline">Computer vision / PyTorch</p>
                <h3>
                  <Link href="/projects/occluded-pet-detection">
                    Pet detection under occlusion
                  </Link>
                </h3>
                <p>
                  I built a synthetic occlusion pipeline and detector adapters
                  to test how training on household-object composites transfers
                  to naturally occluded pets.
                </p>
                <div className="v3-project-bottom">
                  <p>
                    74 real images / YOLOv8n and EfficientDet-D0
                  </p>
                  <Link href="/projects/occluded-pet-detection">
                    Read study <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
            <CompilerStudy><CompilerPreview /></CompilerStudy>
          </div>
          <ProjectStrip />
        </section>

        <PersonalNote />
      </main>
    </>
  );
}
