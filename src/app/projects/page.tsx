import { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${siteConfig.name}'s portfolio of web development projects including full-stack applications, open-source contributions, and side projects built with React, Next.js, and Node.js.`,
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: `Explore ${siteConfig.name}'s portfolio of web development projects.`,
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen w-full py-16 font-sans selection:bg-primary/20 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Projects
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            A collection of projects I&apos;ve built, from full-stack web
            applications to open-source contributions. Each project represents a
            unique challenge and learning experience.
          </p>
        </header>

        <main>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/60 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <Link href={`/projects/${project.slug}`}>
                      <h2 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground/60 transition-colors hover:scale-110 hover:text-foreground"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 transition-colors hover:scale-110 hover:text-foreground"
                        aria-label={`Visit ${project.title} live demo`}
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

                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                >
                  View Details
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>
        </main>

        <footer className="mt-16 flex items-center justify-between border-t border-border/50 pt-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
