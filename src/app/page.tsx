"use client";

import { ProjectCard } from "@/components/project-card";
import { InfiniteMovingPRCards } from "@/components/ui/infinite-moving-pr-cards";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Skills } from "@/components/skills";
import { GithubCalendar } from "@/components/github-calendar";
import { getRecentPRs, type GithubPR } from "@/lib/github";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

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
  {
    title: "Speedexx",
    description: "Engaging and user-friendly e-commerce website clone.",
    tech: ["React", "Redux", "Tailwind CSS"],
    link: "https://speedex-clone.vercel.app/",
    github: "https://github.com/AnujChhikara/speedexClone",
  },
];

const experience = [
  {
    company: "Real Dev Squad",
    role: "Full Stack Developer",
    period: "Sep 2024 — Present",
    description:
      "Building and maintaining full stack features for a large-scale open-source platform using React, Node.js, and MongoDB.",
  },
  {
    company: "SpeedexInd Private Limited",
    role: "UI/UX Designer & Developer",
    period: "Sep 2022 — Jul 2025",
    description:
      "Designed responsive interfaces and delivered high-fidelity screens using Figma and HTML/CSS.",
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/AnujChhikara", icon: Github },
  { name: "Twitter", href: "https://x.com/anujchhikara07", icon: Twitter },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anujchhikara20/",
    icon: Linkedin,
  },
  { name: "Email", href: "mailto:anujchhikara777@gmail.com", icon: Mail },
];

export default function Home() {
  const [prs, setPrs] = useState<GithubPR[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    getRecentPRs("AnujChhikara").then(setPrs);
  }, []);

  return (
    <div
      className="min-h-screen w-full py-32 font-sans selection:bg-primary/20"
      style={{
        backgroundImage: `url(${
          theme === "dark" ? "/noise-black.webp" : "white"
        })`,
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Anuj Chhikara
            </h1>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
          <ThemeToggle />
        </header>

        <main className="space-y-12">
          {/* Intro */}
          <section className="mb-16 space-y-6">
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              I&apos;m an engineer who enjoys building with modern web tools. I
              focus on solving real problems, keeping things simple and
              reliable, and improving a little with every project.
            </p>

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
          </section>

          {/* GitHub Contributions */}
          <GithubCalendar />

          {/* Skills */}
          <Skills />

          {/* Projects */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Selected Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Experience
              </h3>
            </div>

            <div className="space-y-8">
              {experience.map((job) => (
                <div
                  key={job.company}
                  className="flex flex-col space-y-2 md:flex-row md:justify-between md:gap-8 md:space-y-0"
                >
                  <div className="md:w-1/4">
                    <span className="font-mono text-sm text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <div className="space-y-2 md:w-3/4">
                    <h4 className="font-medium text-foreground">
                      {job.role}{" "}
                      <span className="text-muted-foreground">
                        @ {job.company}
                      </span>
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Open Source / PRs */}
          {prs.length > 0 && (
            <section className="space-y-8 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                  Recent Open Source Contributions
                </h3>
              </div>
              <div className="-mx-6 md:-mx-0">
                <InfiniteMovingPRCards
                  items={prs}
                  direction="left"
                  speed="slow"
                />
              </div>
            </section>
          )}

          {/* Contact */}
          <section className="space-y-8 pb-16">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                Get in Touch
              </h3>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="max-w-lg text-muted-foreground">
                I&apos;m always open to new opportunities and collaborations.
                Feel free to reach out if you want to build something together.
              </p>
              <a
                href="mailto:anujchhikara777@gmail.com"
                className="inline-flex items-center font-medium text-foreground transition-colors hover:text-primary/80"
              >
                Say Hello <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </section>
        </main>

        <footer className="flex items-center justify-between border-t border-border/50 pt-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Anuj Chhikara</p>
        </footer>
      </div>
    </div>
  );
}
