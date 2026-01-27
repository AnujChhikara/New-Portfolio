import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { SITE_CONFIG } from "~/lib/constants";

// Calendar theme configuration
const CALENDAR_THEME = {
  light: ["#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#374151"],
  dark: ["#262626", "#404040", "#525252", "#737373", "#a3a3a3"],
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
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="w-full overflow-x-auto"
      aria-label="GitHub contribution activity"
    >
      <div className="min-w-[280px]">
        {isMounted ? (
          <GitHubCalendar
            key={`calendar-${isDark ? "dark" : "light"}`}
            username={SITE_CONFIG.author.github}
            showTotalCount={true}
            fontSize={12}
            tooltips={TOOLTIP_CONFIG}
            theme={CALENDAR_THEME}
            colorScheme={isDark ? "dark" : "light"}
          />
        ) : (
          <div className="h-[120px] flex items-center justify-center text-neutral-600 dark:text-neutral-400">
            Loading GitHub activity...
          </div>
        )}
      </div>
    </section>
  );
}
