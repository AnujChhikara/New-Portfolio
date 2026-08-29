import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import posthog from "posthog-js";

/**
 * PostHog analytics for the React Router SPA.
 *
 * PostHog is browser-only, so init runs inside an effect (client-only) and we
 * disable automatic pageviews — React Router does client-side navigation, so we
 * capture `$pageview` manually on every location change instead.
 */

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const initialized = useRef(false);

  // Initialize once, on the client only.
  useEffect(() => {
    if (initialized.current || !POSTHOG_KEY) return;
    initialized.current = true;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // handled manually below for SPA navigation
      capture_pageleave: true,
      autocapture: true,
      person_profiles: "identified_only",
    });
  }, []);

  // Capture a pageview on every route change (including the first render).
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    posthog.capture("$pageview", {
      $current_url: window.location.href,
    });
  }, [location.pathname, location.search]);

  return <>{children}</>;
}
