import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProjectText from '@/app/components/editorial/ProjectText';
import ProjectEvidence from '@/app/components/editorial/ProjectEvidence';
import { projects, getProjectBySlug, getProjectNavigation } from '@/data/projects';
import ProjectArtwork from '@/app/components/editorial/ProjectArtwork';
import DistributedChatCase from '@/app/components/editorial/DistributedChatCase';

export const dynamic = 'force-static';
export const revalidate = false;
type Props = { params: { slug: string } };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (project?.slug === 'distributed-chat-system') return {
    title: 'Distributed Chat System | IRC-HAT',
    description: project.summary,
    alternates: { canonical: '/projects/distributed-chat-system' },
    openGraph: { title: 'Distributed Chat System | IRC-HAT', description: project.summary, url: '/projects/distributed-chat-system', type: 'website' },
  };
  return project ? { title: project.title, description: project.summary, alternates: { canonical: `/projects/${project.slug}` }, openGraph: { title: project.title, description: project.summary, url: `/projects/${project.slug}`, type: 'website' } } : { title: 'Project not found' };
}
export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const { prev, next } = getProjectNavigation(params.slug);
  if (project.slug === 'distributed-chat-system') return <DistributedChatCase project={project} previous={prev} next={next}/>;
  const study = project.caseStudy;
  if (!study) notFound();
  const links = project.links ? Object.entries(project.links).filter(([,url]) => url) : [];
  const linkNames: Record<string,string> = {repo:'Repository',demo:'Demo',paper:'Paper',report:'Report'};
  return <main id="main-content" tabIndex={-1} className={`v3-wrap refined-project${project.slug === 'fullstack-restaurant-system' ? ' text-led-project' : ''}`}>
    <header className="case-heading">
      <Link className="text-link" href="/projects"><span aria-hidden="true">←</span> All projects</Link>
      <p className="case-category">{project.category}</p><h1><ProjectText text={project.title}/></h1><p className="case-summary"><ProjectText text={project.summary}/></p>
      <ul className="technology-list" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      {links.length > 0 && <div className="resume-actions">{links.map(([key,url]) => <a className="text-link" key={key} href={url} target="_blank" rel="noopener noreferrer">{linkNames[key]} <span className="v3-sr-only">in a new tab</span><span aria-hidden="true">↗</span></a>)}</div>}
    </header>
    <section id="overview" className="case-feature" aria-labelledby="overview-title"><div><h2 id="overview-title">{study.overviewTitle}</h2><p><ProjectText text={project.overview.description}/></p><p><ProjectText text={project.overview.purpose}/></p></div><ProjectArtwork project={project}/></section>
    <div className="case-layout">
      <aside className="case-toc"><p>In this project</p><nav aria-label="Case study sections"><a href="#overview">Overview</a>{study.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<a href="#technologies">Tools and technologies</a></nav></aside>
      <div className="case-body refined-case-body">
        {study.sections.map(section => <section key={section.id} id={section.id} className="case-section">
          <h2>{section.title}</h2>
          {section.paragraphs.map(paragraph => <p key={paragraph}><ProjectText text={paragraph}/></p>)}
          <ProjectEvidence slug={project.slug} section={section.id}/>
        </section>)}
        <section id="technologies" className="case-section"><h2>Tools and technologies</h2><ul className="technology-list" aria-label="Tools and technologies">{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul>{study.technologyNotes.map(note => <p key={note}>{note}</p>)}</section>
      </div>
    </div>
    <nav className="case-pagination" aria-label="Adjacent projects">{prev ? <Link href={`/projects/${prev.slug}`}><span>← Previous project</span>{prev.title}</Link> : <Link href="/projects"><span>← The collection</span>All projects</Link>}{next ? <Link href={`/projects/${next.slug}`}><span>Next project →</span>{next.title}</Link> : <Link href="/projects"><span>The collection →</span>All projects</Link>}</nav>
  </main>;
}
