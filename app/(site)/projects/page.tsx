import type { Metadata } from 'next';
import ProjectCollection from '@/app/components/ProjectCollection';
import '@/app/projects-gallery.css';
export const metadata: Metadata = { title: 'Projects', description: 'Engineering projects across distributed systems, applied machine learning, embedded programming, and full-stack applications.' };
export default function ProjectsPage() {
  return <main id="main-content" tabIndex={-1} className="v3-wrap">
    <header className="page-heading"><h1>Projects</h1><div><p>Systems, applications, and experiments. A closer look at what I built, how it works, and what I learned.</p><p className="heading-note">Distributed systems / Applied ML / Web / Embedded</p></div></header>
    <ProjectCollection/>
  </main>;
}
