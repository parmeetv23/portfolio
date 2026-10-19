import type { Metadata } from 'next';
import Link from 'next/link';
import { experiences } from '@/data/experiences';
import RoleProgression from '@/app/components/RoleProgression';
export const metadata: Metadata = { title: 'Experience', description: 'Software development experience spanning full-stack applications, ERP integration, internal tools, and contract web development.' };
export default function ExperiencePage() {
  return <main id="main-content" tabIndex={-1} className="v3-wrap">
    <header className="page-heading"><h1>Experience</h1><div><p>Building software for the people who use it. Full-stack applications, data integration, and internal tools.</p><Link className="text-link" href="/resume">View my résumé <span aria-hidden="true">↗</span></Link></div></header>
    <nav className="experience-index" aria-label="Jump to employer">{experiences.map(experience => <a href={`#${experience.id}`} key={experience.id}>{experience.company} <span aria-hidden="true">&nbsp;↓</span></a>)}</nav>
    {experiences.map(experience => <article className="experience-story" id={experience.id} key={experience.id} aria-labelledby={`${experience.id}-title`}>
      <header className="experience-meta"><p>{experience.dates ?? experience.roles[0]!.dates}</p><h2 id={`${experience.id}-title`}>{experience.company}</h2>{(experience.location || experience.employmentType) && <p>{[experience.location,experience.employmentType].filter(Boolean).join(' / ')}</p>}
        <RoleProgression roles={experience.roles}/>
      </header>
      <div className="experience-content">
        <p>{experience.summary}</p>
        {experience.contributions ? <div className="experience-contributions">{experience.contributions.map(contribution => <section key={contribution.title}>
          <h3>{contribution.title}</h3><p>{contribution.description}</p>
        </section>)}</div> : <ul className="reading-list">{experience.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>}
        {experience.supportingWork && <div className="experience-supporting"><p>{experience.supportingWork}</p></div>}
        {experience.caseStudy && <Link className="text-link experience-case-link" href={experience.caseStudy}>Read the engineering case study <span aria-hidden="true">↗</span></Link>}
        <ul className="technology-list" aria-label="Technologies">{experience.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      </div>
    </article>)}
  </main>;
}
