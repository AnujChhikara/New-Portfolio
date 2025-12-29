import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { LocationMap } from "./bento/location-map";
import { ProjectCard } from "./bento/project-card";
import { TechStack } from "./bento/tech-stack";
import { PROJECTS } from "~/lib/constants";

// Shared card styles for consistency
const CARD_BASE_CLASSES =
  "rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 hover:shadow-lg transition-all duration-300";

/**
 * About section with bento grid layout
 * Displays location, tech stack, and featured projects
 */
export function AboutSection() {
  return (
    <section className="w-full  pt-12" aria-label="About and projects">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
        {/* Location Card */}
        <article
          className={`md:col-span-2 ${CARD_BASE_CLASSES} p-3 sm:p-4 md:p-6 group`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <MapPin
              className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400 shrink-0"
              aria-hidden="true"
            />
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Location
            </h2>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video min-h-[200px] sm:min-h-[250px]">
            <LocationMap />
          </div>
        </article>

        {/* Tech Stack Card */}
        <article
          className={`md:row-span-2 bg-neutral-900 ${CARD_BASE_CLASSES} p-3 sm:p-4 md:p-6 group overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-0`}
        >
          <TechStack />
        </article>

        {/* Project Cards - First Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 sm:gap-3 md:gap-2">
          <ProjectCard project={PROJECTS[0]} />
          <ProjectCard project={PROJECTS[1]} />
        </div>

        {/* Project Cards - Second Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 sm:gap-3 md:gap-2">
          <ProjectCard project={PROJECTS[2]} />
          <Link
            to="/projects"
            className={`${CARD_BASE_CLASSES} p-4 sm:p-5 md:p-6 group flex items-center justify-center min-h-[90px] sm:min-h-[100px]`}
            aria-label="View all projects"
          >
            <span className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors font-medium">
              View More
              <ArrowRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
