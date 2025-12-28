"use client";

import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/60 hover:shadow-xl hover:shadow-primary/5">
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h4>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 transition-colors hover:scale-110 hover:text-foreground"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 transition-colors hover:scale-110 hover:text-foreground"
              aria-label={`Visit ${project.title}`}
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-md bg-secondary/30 px-2.5 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border/50 transition-colors group-hover:bg-secondary/50 group-hover:ring-border"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
