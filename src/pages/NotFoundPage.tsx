import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-32 font-sans">
      <div className="text-center">
        <h1 className="text-foreground mb-2 text-6xl font-bold md:text-8xl">
          404
        </h1>
        <h2 className="text-foreground mb-4 text-2xl font-semibold md:text-3xl">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to="/projects"
            className="border-border bg-background text-foreground hover:bg-accent inline-flex items-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View Projects
          </Link>
        </div>
      </div>

      <footer className="text-muted-foreground absolute bottom-8 text-xs">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </footer>
    </div>
  );
}
