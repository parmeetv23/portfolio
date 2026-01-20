import Link from 'next/link'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  highlighted?: boolean
}

export default function ProjectCard({
  project,
  featured = false,
  highlighted = false,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article
        className={[
          'border',
          'bg-border/60',
          'p-6',
          'rounded-lg',
          'hover:border-accent',
          'transition-all',
          'group',
          'h-full',
          'flex',
          'flex-col',
          highlighted ? 'border-accent/80' : 'border-border/80',
        ].join(' ')}
      >

        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs bg-border text-muted-foreground rounded border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {featured && (
          <div className="mt-4 text-xs text-accent font-medium">
            Featured Project →
          </div>
        )}
      </article>
    </Link>
  )
}
