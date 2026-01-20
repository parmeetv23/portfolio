import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight">{project.title}</h3>
      </div>

      <p className="mt-2 text-sm text-white/70">{project.short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-semibold text-white/90 hover:underline"
        >
          Read case study →
        </Link>
      </div>
    </article>
  );
}
