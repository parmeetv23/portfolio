import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectArtwork from './editorial/ProjectArtwork';
import ProjectFilter from './ProjectFilter';
export default function ProjectCollection() {
  return <ProjectFilter items={projects.map(project => ({ slug: project.slug, category: project.category, content: <>
    <ProjectArtwork project={project}/>
    <div className="collection-copy"><p className="collection-category">{project.category}</p><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p className="collection-summary">{project.summary}</p><ul className="technology-list" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Explore project <span aria-hidden="true">↗</span></Link></div>
  </> }))}/>;
}
