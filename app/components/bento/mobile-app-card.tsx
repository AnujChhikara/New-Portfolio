import { ArrowUpRight, Smartphone, Zap } from "lucide-react";
import type { Project } from "~/lib/constants";

const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M3.18 23.76a2 2 0 001.94-.21l12.19-7.04-3.37-3.37L3.18 23.76zM.68 1.04A2 2 0 000 2.62v18.76a2 2 0 00.68 1.58l.08.07 10.51-10.51v-.24L.76.97.68 1.04zM21.26 10.06l-3.01-1.74-3.76 3.76 3.76 3.76 3.03-1.75a2.02 2.02 0 000-3.03zM5.12.45l12.13 7.01-3.37 3.37L5.12.45z" />
  </svg>
);

interface MobileAppCardProps {
  project: Project;
}

export function MobileAppCard({ project }: MobileAppCardProps) {
  const hasPlayStore = Boolean(project.playStoreLink);
  const hasAppStore = Boolean(project.appStoreLink);

  return (
    <article className="group relative rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-4 sm:p-5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:border-neutral-200 dark:hover:border-neutral-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <Smartphone className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-0">
              Mobile App
            </p>
            <span className="inline-flex items-center gap-1 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider rounded border bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label={`Visit ${project.title}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
          </a>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight mb-1">
        {project.title}
      </h3>

      {/* Highlight */}
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
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Store buttons */}
      <div className="flex gap-2 mt-auto">
        {hasPlayStore ? (
          <a
            href={project.playStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <PlayStoreIcon />
            Play Store
          </a>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 text-xs font-medium border border-dashed border-neutral-300 dark:border-neutral-700 cursor-not-allowed select-none">
            <PlayStoreIcon />
            <span>Play Store</span>
            <span className="text-[9px] uppercase tracking-wider">· soon</span>
          </div>
        )}
        {hasAppStore ? (
          <a
            href={project.appStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            App Store
          </a>
        ) : null}
      </div>
    </article>
  );
}
