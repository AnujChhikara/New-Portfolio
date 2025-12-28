import { Link, useParams } from "react-router-dom";
import { projects, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import NotFoundPage from "./NotFoundPage";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  // Get related projects (excluding current)
  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  // JSON-LD for the project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription || project.description,
    url: project.link,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="selection:bg-primary/20 min-h-screen w-full py-16 font-sans md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="text-muted-foreground flex items-center space-x-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{project.title}</li>
            </ol>
          </nav>

          <article>
            <header className="mb-8">
              <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {project.title}
              </h1>

              {/* Tech stack */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ring-1 ring-inset"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border bg-background text-foreground hover:bg-accent inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </header>

            {/* Project description */}
            <section className="prose prose-neutral dark:prose-invert mb-12 max-w-none">
              <h2 className="text-foreground text-xl font-semibold">
                About this Project
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </section>

            {/* Technologies section */}
            <section className="mb-12">
              <h2 className="text-foreground mb-4 text-xl font-semibold">
                Technologies Used
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {project.tech.map((tech) => (
                  <div
                    key={tech}
                    className="border-border/50 bg-card/40 text-foreground rounded-lg border p-4 text-center text-sm font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <section className="border-border/50 mt-16 border-t pt-12">
              <h2 className="text-foreground mb-6 text-xl font-semibold">
                Other Projects
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    to={`/projects/${relatedProject.slug}`}
                    className="group border-border/50 bg-card/40 hover:border-primary/20 hover:bg-card/60 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="text-foreground group-hover:text-primary mb-2 font-semibold transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {relatedProject.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link
              to="/projects"
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </div>

          <footer className="border-border/50 text-muted-foreground mt-16 flex items-center justify-between border-t pt-8 text-xs">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
