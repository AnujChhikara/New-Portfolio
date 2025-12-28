import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectPageProps {
  params: { slug: string };
}

// Generate static paths for all projects
export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for each project
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} - ${project.tech.slice(0, 3).join(", ")} Project`;
  const description = project.longDescription || project.description;

  return {
    title,
    description,
    keywords: [
      project.title,
      ...project.tech,
      "web development",
      "portfolio project",
      siteConfig.name,
    ],
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: "article",
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description,
      creator: siteConfig.author.twitter,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
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
      <div className="min-h-screen w-full py-16 font-sans selection:bg-primary/20 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-foreground"
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
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {project.title}
              </h1>

              {/* Tech stack */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
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
                  className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </header>

            {/* Project description */}
            <section className="prose prose-neutral dark:prose-invert mb-12 max-w-none">
              <h2 className="text-xl font-semibold text-foreground">
                About this Project
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {project.longDescription || project.description}
              </p>
            </section>

            {/* Technologies section */}
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Technologies Used
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {project.tech.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-lg border border-border/50 bg-card/40 p-4 text-center text-sm font-medium text-foreground"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <section className="mt-16 border-t border-border/50 pt-12">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                Other Projects
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/projects/${relatedProject.slug}`}
                    className="group rounded-xl border border-border/50 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/60"
                  >
                    <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                      {relatedProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
              href="/projects"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </div>

          <footer className="mt-16 flex items-center justify-between border-t border-border/50 pt-8 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
