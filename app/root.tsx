import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { SITE_CONFIG } from "./lib/constants";
import "./app.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

// Lazy load SphereLoader to avoid SSR issues with Three.js/Drei
const SphereLoader = lazy(() =>
  import("./components/SphereLoader").then((module) => ({
    default: module.SphereLoader,
  }))
);

/**
 * Root links function for preconnecting to external resources
 * Improves performance by establishing early connections
 */
export const links: Route.LinksFunction = () => [
  // Preconnect to Google Fonts for faster font loading
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  // Load Inter font with display swap for better perceived performance
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Canonical URL
  { rel: "canonical", href: SITE_CONFIG.url },
  // Favicon
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
];

/**
 * Root layout component that wraps all pages
 * Contains global SEO meta tags and styling
 */
export function Layout({ children }: { children: React.ReactNode }) {
  // Start false to match SSR (which can't render Three.js), set true on client mount
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    setShowPreloader(true);
  }, []);

  return (
    <html
      lang="en"
      className="scroll-smooth dark"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {/* Theme color for browser UI - always dark */}
        <meta name="theme-color" content="#030712" />
        {/* Author information */}
        <meta name="author" content={SITE_CONFIG.author.name} />
        {/* Robots directive */}
        <meta name="robots" content="index, follow" />
        <Meta />
        <Links />
      </head>
      <body
        className="antialiased"
        style={{
          backgroundImage: "url(/noise-black.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <AnimatePresence>
          {showPreloader && (
            <Suspense
              fallback={<div className="fixed inset-0 z-50 bg-black" />}
            >
              <SphereLoader onComplete={() => setShowPreloader(false)} />
            </Suspense>
          )}
        </AnimatePresence>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Force dark theme - prevent system theme interference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
