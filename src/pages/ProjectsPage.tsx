import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="selection:bg-primary/20 min-h-screen w-full py-16 font-sans md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back link */}
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Projects
          </h1>
          <p className="text-muted-foreground max-w-2xl">
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
                className="group border-border/50 bg-card/40 hover:border-primary/20 hover:bg-card/60 hover:shadow-primary/5 relative flex flex-col justify-between rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="from-primary/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <Link to={`/projects/${project.slug}`}>
                      <h2 className="text-foreground group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
                        {project.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground/60 hover:text-foreground transition-colors hover:scale-110"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 hover:text-foreground transition-colors hover:scale-110"
                        aria-label={`Visit ${project.title} live demo`}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-secondary/30 text-secondary-foreground ring-border/50 group-hover:bg-secondary/50 group-hover:ring-border inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 transition-colors ring-inset"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="text-primary mt-4 inline-flex items-center text-sm font-medium transition-colors hover:underline"
                >
                  View Details
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </article>
            ))}
          </div>
        </main>

        <footer className="border-border/50 text-muted-foreground mt-16 flex items-center justify-between border-t pt-8 text-xs">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
