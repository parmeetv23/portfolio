import Link from 'next/link'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
    project: Project
    featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <article className="border border-[#262626] bg-[#171717] p-6 rounded-lg hover:border-[#3b82f6] transition-all group">
                <h3 className="text-xl font-semibold mb-2 text-[#e5e5e5] group-hover:text-[#3b82f6] transition-colors">
                    {project.title}
                </h3>
                <p className="text-[#a3a3a3] mb-4 text-sm leading-relaxed">
                    {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 text-xs bg-[#262626] text-[#a3a3a3] rounded border border-[#262626]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {featured && (
                    <div className="mt-4 text-xs text-[#3b82f6] font-medium">
                        Featured Project →
                    </div>
                )}
            </article>
        </Link>
    )
}

