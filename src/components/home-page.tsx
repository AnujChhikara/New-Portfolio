"use client";

import { memo, useEffect, useState, lazy, Suspense } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getRecentPRs, type GithubPR } from "@/lib/github";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/social";
import { siteConfig } from "@/data/site";

const GithubCalendar = lazy(() =>
  import("@/components/github-calendar").then((mod) => ({
    default: mod.GithubCalendar,
  }))
);
const Skills = lazy(() =>
  import("@/components/skills").then((mod) => ({ default: mod.Skills }))
);
const InfiniteMovingPRCards = lazy(() =>
  import("@/components/ui/infinite-moving-pr-cards").then((mod) => ({
    default: mod.InfiniteMovingPRCards,
  }))
);

const SectionSkeleton = memo(function SectionSkeleton({
  height = "h-32",
}: {
  height?: string;
}) {
  return <div className={`${height} animate-pulse rounded-lg bg-muted/50`} />;
});

const SocialLinks = memo(function SocialLinks() {
  return (
    <div className="flex items-center gap-4 pt-2">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors duration-200 hover:scale-110 hover:text-foreground"
          aria-label={link.name}
        >
          <link.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
});

const ProjectCardWithLink = memo(function ProjectCardWithLink({
  project,
}: {
  project: (typeof projects)[0];
}) {
  return (
    <div className="group relative">
      <ProjectCard project={project} />
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${project.title} details`}
      />
    </div>
  );
});

export function HomePage() {
  const [prs, setPrs] = useState<GithubPR[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getRecentPRs(siteConfig.author.github).then(setPrs);
  }, []);

  const featuredProjects = projects.slice(0, 4);

  return (
    <div
      className="min-h-screen w-full py-32 font-sans selection:bg-primary/20"
      style={{
        backgroundImage:
          mounted && theme === "dark" ? `url(/noise-black.webp)` : undefined,
      }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {siteConfig.name}
            </h1>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
          <ThemeToggle />
        </header>

        <main className="space-y-12">
          <section className="mb-16 space-y-6" aria-label="Introduction">
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              I&apos;m an engineer who enjoys building with modern web tools. I
              focus on solving real problems, keeping things simple and
              reliable, and improving a little with every project.
            </p>

            <SocialLinks />
          </section>

          <Suspense fallback={<SectionSkeleton height="h-40" />}>
            <GithubCalendar />
          </Suspense>

          <Suspense fallback={<SectionSkeleton height="h-24" />}>
            <Skills />
          </Suspense>

          <section className="space-y-8" aria-label="Selected Projects">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Selected Projects
              </h2>
              <Link
                href="/projects"
                className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCardWithLink key={project.slug} project={project} />
              ))}
            </div>
          </section>

          {prs.length > 0 && (
            <section
              className="space-y-8 overflow-hidden"
              aria-label="Open Source Contributions"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-foreground">
                  Recent Open Source Contributions
                </h2>
              </div>
              <div className="-mx-6 md:-mx-0">
                <Suspense fallback={<SectionSkeleton height="h-32" />}>
                  <InfiniteMovingPRCards
                    items={prs}
                    direction="left"
                    speed="slow"
                  />
                </Suspense>
              </div>
            </section>
          )}

          <section className="space-y-8 pb-16" aria-label="Contact">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Get in Touch
              </h2>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="max-w-lg text-muted-foreground">
                I&apos;m always open to new opportunities and collaborations.
                Feel free to reach out if you want to build something together.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center font-medium text-foreground transition-colors hover:text-primary/80"
              >
                Say Hello <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </section>
        </main>

        <footer className="flex items-center justify-between border-t border-border/50 pt-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <nav aria-label="Footer navigation">
            <Link
              href="/projects"
              className="transition-colors hover:text-foreground"
            >
              Projects
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
