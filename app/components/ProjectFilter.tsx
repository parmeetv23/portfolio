'use client';
import { useState, type ReactNode } from 'react';
import type { ProjectCategory } from '@/data/projects';
type Item = { slug: string; category: ProjectCategory; content: ReactNode };
export default function ProjectFilter({ items }: { items: Item[] }) {
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All');
  const categories = Array.from(new Set(items.map(item => item.category)));
  const filtered = category === 'All' ? items : items.filter(item => item.category === category);
  return <>
    <div className="filter-bar" role="group" aria-label="Filter projects by category">
      {(['All', ...categories] as const).map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="project-collection" onClick={() => setCategory(item)}>{item}</button>)}
    </div>
    <p className="collection-status" role="status" aria-atomic="true">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} / {category === 'All' ? 'All disciplines' : category}</p>
    <div id="project-collection" className="project-collection" data-filtered={category !== 'All'}>{filtered.map(item => <article key={item.slug} className={`collection-project${item.slug === 'fullstack-restaurant-system' ? ' collection-restaurant' : ''}`}>{item.content}</article>)}</div>
  </>;
}
