import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProjectBySlug, getProjectNavigation } from '@/data/projects';
import ProjectArtwork from '@/app/components/editorial/ProjectArtwork';

export const dynamic = 'force-static';
export const revalidate = false;
type Props = { params: { slug: string } };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  return project ? { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, type: 'website' } } : { title: 'Project not found' };
}
function List({ items }: { items: readonly string[] }) { return <ul className="reading-list">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const { prev, next } = getProjectNavigation(params.slug);
  const links = project.links ? Object.entries(project.links).filter(([,url]) => url) : [];
  const linkNames: Record<string,string> = {repo:'Repository',demo:'Demo',paper:'Paper',report:'Report'};
  return <main id="main-content" tabIndex={-1} className="v3-wrap">
    <header className="case-heading">
      <Link className="text-link" href="/projects"><span aria-hidden="true">←</span> All projects</Link>
      <p className="case-category">{project.category}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p>
      <ul className="technology-list" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      {links.length > 0 && <div className="resume-actions">{links.map(([key,url]) => <a className="text-link" key={key} href={url} target="_blank" rel="noopener noreferrer">{linkNames[key]} <span className="v3-sr-only">in a new tab</span><span aria-hidden="true">↗</span></a>)}</div>}
    </header>
    <section id="overview" className="case-feature" aria-labelledby="overview-title"><div><h2 id="overview-title">The project</h2><p>{project.overview.description}</p><p>{project.overview.purpose}</p></div><ProjectArtwork project={project}/></section>
    <div className="case-layout">
      <aside className="case-toc"><p>In this project</p><nav aria-label="Case study sections"><a href="#overview">Overview</a><a href="#contribution">My contribution</a><a href="#engineering">Engineering</a><a href="#technologies">Technologies</a><a href="#outcomes">Outcomes &amp; reflections</a></nav></aside>
      <div className="case-body">
        <section id="contribution" className="case-section"><h2>My contribution</h2><h3>What I built</h3><List items={project.role.built}/><h3>What I owned end-to-end</h3><List items={project.role.owned}/></section>
        <section id="engineering" className="case-section"><h2>Engineering the system</h2><h3>Architecture decisions</h3><List items={project.technicalHighlights.architecture}/><h3>Algorithms, protocols &amp; constraints</h3><List items={project.technicalHighlights.algorithms}/>{project.technicalHighlights.failureHandling && <><h3>Failure handling</h3><List items={project.technicalHighlights.failureHandling}/></>}{project.technicalHighlights.optimization && <><h3>Optimization strategies</h3><List items={project.technicalHighlights.optimization}/></>}</section>
        <section id="technologies" className="case-section"><h2>Tools &amp; technologies</h2><ul className="technology-list">{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul></section>
        <section id="outcomes" className="case-section"><h2>Outcomes &amp; reflections</h2><h3>What worked</h3><List items={project.results.achievements}/><h3>What I learned</h3><List items={project.results.learnings}/><div className="case-limits"><h3>Tradeoffs &amp; limitations</h3><List items={project.results.tradeoffs}/></div></section>
      </div>
    </div>
    <nav className="case-pagination" aria-label="Adjacent projects">{prev ? <Link href={`/projects/${prev.slug}`}><span>← Previous project</span>{prev.title}</Link> : <Link href="/projects"><span>← The collection</span>All projects</Link>}{next ? <Link href={`/projects/${next.slug}`}><span>Next project →</span>{next.title}</Link> : <Link href="/projects"><span>The collection →</span>All projects</Link>}</nav>
  </main>;
}
