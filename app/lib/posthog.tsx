import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { BLOG_POST_PATHS } from "./blog-posts";

const ALLOWED_PATHS: readonly string[] = ["/", ...BLOG_POST_PATHS];

const ALLOWED_ORIGINS = new Set([
  "https://anujchhikara.com",
  "https://www.anujchhikara.com",
]);

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!ALLOWED_ORIGINS.has(window.location.origin)) return;

    const nav = navigator as unknown as {
      doNotTrack?: string;
      globalPrivacyControl?: boolean;
    };
    if (nav.doNotTrack === "1" || nav.globalPrivacyControl === true) return;

    const path = location.pathname;
    if (lastPathRef.current === path) return;
    lastPathRef.current = path;

    if (!ALLOWED_PATHS.includes(path)) return;

    fetch("/api/pageview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path }),
      credentials: "omit",
      referrerPolicy: "no-referrer",
    }).catch(() => {});
  }, [location.pathname]);

  return <>{children}</>;
}
