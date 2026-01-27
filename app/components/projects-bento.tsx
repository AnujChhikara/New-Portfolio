import { useEffect, useState } from "react";
import { RotatingSphereView } from "./rotating-sphere";
import { ProjectCard } from "./bento/project-card";
import { PROJECTS } from "~/lib/constants";

const CARD_BASE_CLASSES =
  "rounded-xl transition-all duration-300 bg-white dark:bg-neutral-900";

/**
 * Bento grid layout with rotating sphere at center and projects around it
 */
export function ProjectsBento() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="w-full pt-12" aria-label="Projects">
        <div className="h-64 flex items-center justify-center text-neutral-500">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-12" aria-label="Projects">
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
        Projects
      </h2>

      {/* 
        Bento Grid Layout (6 columns):
        ┌───────┬───────┬───────────────┬───────┬───────┐
        │  P1   │  P1   │    Sphere     │  P2   │  P2   │
        ├───────┼───────┤    (center)   ├───────┼───────┤
        │  P3   │  P3   │               │  P4   │  P4   │
        └───────┴───────┴───────────────┴───────┴───────┘
      */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4">
        {/* Project 1 - Top Left */}
        <div className="md:col-span-2">
          <ProjectCard project={PROJECTS[0]} />
        </div>

        {/* Rotating Sphere - Center (spans 2 rows on desktop) */}
        <div
          className={`md:col-span-2 md:row-span-2 ${CARD_BASE_CLASSES} p-2 sm:p-4 aspect-square flex items-center justify-center`}
        >
          <RotatingSphereView />
        </div>

        {/* Project 2 - Top Right */}
        <div className="md:col-span-2">
          <ProjectCard project={PROJECTS[1]} />
        </div>

        {/* Project 3 - Bottom Left */}
        <div className="md:col-span-2">
          <ProjectCard project={PROJECTS[2]} />
        </div>

        {/* Project 4 - Bottom Right */}
        <div className="md:col-span-2">
          <ProjectCard project={PROJECTS[3]} />
        </div>
      </div>
    </section>
  );
}
