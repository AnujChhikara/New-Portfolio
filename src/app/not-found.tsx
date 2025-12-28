import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-32 font-sans">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-foreground md:text-8xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View Projects
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-8 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </footer>
    </div>
  );
}

