import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectPreview from './editorial/ProjectPreview';
import ProjectFilter from './ProjectFilter';
import ProjectText from './editorial/ProjectText';
export default function ProjectCollection() {
  return <ProjectFilter items={projects.map(project => ({ slug: project.slug, category: project.category, content: <>
    <ProjectPreview project={project}/>
    <div className="collection-copy"><p className="collection-category">{project.category}</p><h2><Link href={`/projects/${project.slug}`}><ProjectText text={project.title}/></Link></h2><p className="collection-summary"><ProjectText text={project.summary}/></p><ul className="technology-list" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Explore project <span aria-hidden="true">↗</span></Link></div>
  </> }))}/>;
}
