import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "~/lib/constants";

interface ProjectCardProps {
  project: Project;
}

/**
 * Minimal, clean project card for bento grid
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative h-full rounded-xl bg-white dark:bg-neutral-900 p-4 sm:p-5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors leading-tight">
          {project.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label={`GitHub - ${project.title}`}
          >
            <Github className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label={`Live - ${project.title}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-3 grow">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-neutral-50/0 via-transparent to-neutral-100/0 dark:from-neutral-800/0 dark:to-neutral-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
    </article>
  );
}
