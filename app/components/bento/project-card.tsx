import { Github, Globe } from "lucide-react";
import type { Project } from "~/lib/constants";

interface ProjectCardProps {
  project: Project;
}

// Shared button styles for consistency
const LINK_BUTTON_CLASSES =
  "p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors touch-manipulation";

const ICON_CLASSES =
  "w-4 h-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors";

/**
 * Project card component displaying project info with links
 * Uses semantic article element for better SEO
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-xl border-2 border-dotted border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <header className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors min-w-0 flex-1">
          {project.title}
        </h3>
        <nav
          className="flex items-center gap-1 sm:gap-2 shrink-0"
          aria-label="Project links"
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_BUTTON_CLASSES}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github className={ICON_CLASSES} aria-hidden="true" />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_BUTTON_CLASSES}
            aria-label={`Visit ${project.title} live site`}
          >
            <Globe className={ICON_CLASSES} aria-hidden="true" />
          </a>
        </nav>
      </header>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 sm:mb-4 line-clamp-2 grow">
        {project.description}
      </p>
    </article>
  );
}
