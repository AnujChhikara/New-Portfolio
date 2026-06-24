import { Github, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "~/lib/constants";
import type { Project } from "~/lib/constants";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-sm">
      {/* Top row: number + status + year */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tabular-nums text-neutral-300 dark:text-neutral-700 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {project.status === "live" && (
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
          <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-medium">
            {project.year}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          {project.title}
        </h3>
        {project.highlight && (
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-medium">
            {project.highlight}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md text-neutral-400 dark:text-neutral-600">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-1 pt-1 border-t border-neutral-100 dark:border-neutral-800 -mx-1">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
            aria-label={`GitHub — ${project.title}`}
          >
            <Github className="w-3 h-3" />
            Code
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
            aria-label={`Visit — ${project.title}`}
          >
            <ArrowUpRight className="w-3 h-3" />
            Visit
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsBento() {
  const webProjects = PROJECTS.filter((p) => p.category === "web");

  return (
    <section className="w-full" aria-label="Projects">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Projects
        </h2>
        <span className="text-xs text-neutral-400 dark:text-neutral-600 font-medium">
          {webProjects.length} shipped
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {webProjects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* Mobile placeholder */}
      <div className="mt-3 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Mobile apps
          </p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-600 mt-0.5">
            iOS & Android — coming soon
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 dark:text-neutral-700 border border-neutral-200 dark:border-neutral-700 px-2 py-1 rounded-full">
          Soon
        </span>
      </div>
    </section>
  );
}
