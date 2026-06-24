import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { SITE_CONFIG } from "~/lib/constants";

const CALENDAR_THEME = {
  light: ["#f5f5f5", "#d4d4d4", "#a3a3a3", "#525252", "#262626"],
  dark:  ["#262626", "#404040", "#737373", "#d4d4d4", "#e5e5e5"],
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const docDark = () => document.documentElement.classList.contains("dark");
    setIsDark(docDark() || mq.matches);
    const observer = new MutationObserver(() => setIsDark(docDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
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
              colorScheme={isDark ? "dark" : "light"}
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
