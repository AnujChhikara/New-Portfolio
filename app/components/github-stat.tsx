import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { SITE_CONFIG } from "~/lib/constants";

// Calendar theme configuration - gray palette, same for both themes
const CALENDAR_THEME = {
  light: [
    "#f3f4f6", // No contributions - very light gray
    "#d1d5db", // Low - light gray
    "#9ca3af", // Medium - medium gray
    "#6b7280", // High - dark gray
    "#374151", // Very high - darkest gray
  ],
  dark: [
    "#f3f4f6", // No contributions - very light gray
    "#d1d5db", // Low - light gray
    "#9ca3af", // Medium - medium gray
    "#6b7280", // High - dark gray
    "#374151", // Very high - darkest gray
  ],
};

// Tooltip configuration
const TOOLTIP_CONFIG = {
  activity: {
    text: (activity: { level: number; date: string }) =>
      `${activity.level} activities on ${activity.date}`,
    placement: "top" as const,
    offset: 6,
    hoverRestMs: 300,
  },
  colorLegend: {
    text: (level: number) => `Level ${level}`,
    placement: "top" as const,
    offset: 6,
    hoverRestMs: 300,
  },
};

/**
 * GitHub contribution calendar component
 * Displays user's GitHub activity with accessible labels
 * Client-only rendering to avoid hydration mismatches
 */
export function GithubStats() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      className="w-full overflow-x-auto"
      aria-label="GitHub contribution activity"
    >
      <div className="min-w-[280px]">
        {isMounted ? (
          <div className="text-neutral-900 dark:text-neutral-100">
            <GitHubCalendar
              username={SITE_CONFIG.author.github}
              showTotalCount={true}
              fontSize={12}
              tooltips={TOOLTIP_CONFIG}
              theme={CALENDAR_THEME}
              colorScheme="light"
            />
          </div>
        ) : (
          <div className="h-[120px] flex items-center justify-center text-neutral-600 dark:text-neutral-400">
            Loading GitHub activity...
          </div>
        )}
      </div>
    </section>
  );
}
