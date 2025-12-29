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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
        <div className="md:col-span-2 rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Location
            </h3>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <LocationMap />
          </div>
        </div>

        <div className="md:row-span-2 bg-neutral-900 rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden">
          <TechStack />
        </div>

        <div className="grid grid-rows-2 gap-2">
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[1]} />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <ProjectCard project={projects[2]} />
          <Link
            to="/projects"
            className="rounded-xl border-2 border-dotted border-neutral-200 dark:border-neutral-600 p-6 hover:shadow-lg transition-all duration-300 group flex items-center justify-center"
          >
            <span className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors font-medium">
              View More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
