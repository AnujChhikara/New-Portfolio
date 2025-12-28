"use client";

import { ProjectCard } from "@/components/project-card";
import { InfiniteMovingPRCards } from "@/components/ui/infinite-moving-pr-cards";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Skills } from "@/components/skills";
import { getRecentPRs, type GithubPR } from "@/lib/github";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [prs, setPrs] = useState<GithubPR[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    getRecentPRs("AnujChhikara").then(setPrs);
  }, []);

  return (
    <div
      className="min-h-screen w-full font-sans selection:bg-primary/20 py-32"
      style={{
        backgroundImage: `url(${
          theme === "dark" ? "/noise-black.webp" : "white"
        })`,
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col space-y-1">
            <motion.h1
              className={` text-2xl font-bold tracking-tight text-foreground`}
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Anuj Chhikara
            </motion.h1>
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Software Engineer
            </motion.p>
          </div>
          <ThemeToggle />
        </motion.header>

        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          {/* Intro */}
          <motion.section variants={item} className="space-y-6 mb-16">
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I&apos;m an engineer who enjoys building with modern web tools. I
              focus on solving real problems, keeping things simple and
              reliable, and improving a little with every project.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.section>

          {/* GitHub Contributions */}
          <motion.section variants={item} className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
                GitHub Contributions
              </h3>
            </div>
            <div className="flex justify-center py-4">
              <div className="w-full max-w-4xl overflow-x-auto">
                <GitHubCalendar
                  username="AnujChhikara"
                  year="last"
                  colorScheme={theme === "dark" ? "dark" : "light"}
                  theme={{
                    light: [
                      "#fafafa",
                      "#e4e4e7",
                      "#a1a1aa",
                      "#71717a",
                      "#3f3f46",
                    ],
                    dark: [
                      "#18181b",
                      "#27272a",
                      "#3f3f46",
                      "#52525b",
                      "#71717a",
                    ],
                  }}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={2}
                  fontSize={14}
                  showWeekdayLabels={false}
                  showMonthLabels={true}
                  showTotalCount={true}
                  showColorLegend={true}
                  labels={{
                    totalCount: "{{count}} contributions in {{year}}",
                  }}
                  tooltips={{
                    activity: {
                      text: (activity) =>
                        `${activity.count} contribution${
                          activity.count !== 1 ? "s" : ""
                        } on ${activity.date}`,
                      placement: "top",
                      offset: 8,
                      hoverRestMs: 150,
                      withArrow: true,
                    },
                  }}
                />
              </div>
            </div>
          </motion.section>

          {/* Skills */}
          <Skills />

          {/* Projects */}
          <motion.section variants={item} className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
                Selected Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section variants={item} className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
                Experience
              </h3>
            </div>

            <div className="space-y-8">
              {experience.map((job) => (
                <div
                  key={job.company}
                  className="flex flex-col md:flex-row md:justify-between md:gap-8 space-y-2 md:space-y-0"
                >
                  <div className="md:w-1/4">
                    <span className="text-sm text-muted-foreground font-mono">
                      {job.period}
                    </span>
                  </div>
                  <div className="md:w-3/4 space-y-2">
                    <h4 className="font-medium text-foreground">
                      {job.role}{" "}
                      <span className="text-muted-foreground">
                        @ {job.company}
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Open Source / PRs */}
          {prs.length > 0 && (
            <motion.section
              variants={item}
              className="space-y-8 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
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
            </motion.section>
          )}

          {/* Contact */}
          <motion.section variants={item} className="space-y-8 pb-16">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
                Get in Touch
              </h3>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-muted-foreground max-w-lg">
                I&apos;m always open to new opportunities and collaborations.
                Feel free to reach out if you want to build something together.
              </p>
              <a
                href="mailto:anujchhikara777@gmail.com"
                className="inline-flex items-center text-foreground font-medium hover:text-primary/80 transition-colors"
              >
                Say Hello <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </motion.section>
        </motion.main>

        <motion.footer
          variants={item}
          className="flex justify-between items-center pt-8 border-t border-border/50 text-xs text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Anuj Chhikara</p>
        </motion.footer>
      </div>
    </div>
  );
}
