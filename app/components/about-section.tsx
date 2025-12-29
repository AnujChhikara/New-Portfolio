import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { LocationMap } from "./bento/location-map";
import { ProjectCard } from "./bento/project-card";
import { TechStack } from "./bento/tech-stack";

const projects = [
  {
    title: "Vidloom",
    description:
      "A video sharing platform similar to YouTube with upload and playback capabilities.",
    tech: ["React", "Redux", "Shadcn Ui", "Express", "MongoDB"],
    link: "https://vidloom.vercel.app/",
    github: "https://github.com/AnujChhikara/frontend-yt",
  },
  {
    title: "DevVault",
    description:
      "Platform for accessing and sharing reusable code snippets effortlessly.",
    tech: ["NextJS", "Redux", "Aceternity UI", "MongoDB"],
    link: "https://devvault.vercel.app/",
    github: "https://github.com/AnujChhikara/Vault",
  },
  {
    title: "Extensionhub",
    description:
      "Marketplace for niche browser extension requests and development.",
    tech: ["NextJS", "Appwrite"],
    link: "https://extensionhub-lilac.vercel.app/",
    github: "https://github.com/AnujChhikara/Extensionhub",
  },
];

export function AboutSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
        {/* Location Map - Full width on mobile, 2 columns on desktop */}
        <div className="md:col-span-2 rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 dark:text-neutral-400 shrink-0" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Location
            </h3>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video min-h-[200px] sm:min-h-[250px]">
            <LocationMap />
          </div>
        </div>

        {/* Tech Stack - Full width on mobile, spans 2 rows on desktop */}
        <div className="md:row-span-2 bg-neutral-900 rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-3 sm:p-4 md:p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-0">
          <TechStack />
        </div>

        {/* Project Cards - Stack on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 sm:gap-3 md:gap-2">
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[1]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 sm:gap-3 md:gap-2">
          <ProjectCard project={projects[2]} />
          <Link
            to="/projects"
            className="rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 group flex items-center justify-center min-h-[90px] sm:min-h-[100px]"
          >
            <span className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors font-medium">
              View More
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
