import { GitHubCalendar } from "react-github-calendar";
import { SITE_CONFIG } from "~/lib/constants";

// Calendar theme configuration
const CALENDAR_THEME = {
  light: ["#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373"],
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
 */
export function GithubStats() {
  return (
    <section
      className="w-full overflow-x-auto"
      aria-label="GitHub contribution activity"
    >
      <div className="min-w-[280px]">
        <GitHubCalendar
          username={SITE_CONFIG.author.github}
          showTotalCount={true}
          fontSize={12}
          tooltips={TOOLTIP_CONFIG}
          theme={CALENDAR_THEME}
        />
      </div>
    </section>
  );
}
