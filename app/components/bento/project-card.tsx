import { Github, Globe } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors min-w-0 flex-1">
          {project.title}
        </h3>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors touch-manipulation"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 sm:w-4 sm:h-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors" />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors touch-manipulation"
            aria-label="Visit site"
          >
            <Globe className="w-4 h-4 sm:w-4 sm:h-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors" />
          </a>
        </div>
      </div>
      <p className="text-xs sm:text-xs text-neutral-600 dark:text-neutral-400 mb-2 sm:mb-4 line-clamp-2 grow">
        {project.description}
      </p>
    </div>
  );
}
