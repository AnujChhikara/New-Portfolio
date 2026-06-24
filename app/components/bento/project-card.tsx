import { Github, ArrowUpRight, Zap } from "lucide-react";
import type { Project } from "~/lib/constants";

const STATUS_STYLES = {
  live: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  "in-progress":
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  "coming-soon":
    "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700",
};

const STATUS_LABELS = {
  live: "Live",
  "in-progress": "In Progress",
  "coming-soon": "Soon",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative h-full rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-4 sm:p-5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:border-neutral-200 dark:hover:border-neutral-700">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded border ${STATUS_STYLES[project.status]}`}
          >
            {project.status === "live" && (
              <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1 animate-pulse" />
            )}
            {STATUS_LABELS[project.status]}
          </span>
          <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">
            {project.year}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={`GitHub — ${project.title}`}
            >
              <Github className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={`Visit — ${project.title}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight mb-1">
        {project.title}
      </h3>

      {/* Highlight pill */}
      {project.highlight && (
        <div className="flex items-center gap-1 mb-2">
          <Zap className="w-2.5 h-2.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
            {project.highlight}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-3 grow">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500">
            +{project.tech.length - 4}
          </span>
        )}
      </div>
    </article>
  );
}
