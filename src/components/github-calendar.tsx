import { memo, useEffect, useState, useMemo } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import "react-github-calendar/tooltips.css";

// Static constants outside component to prevent recreation
const CALENDAR_USERNAME = "AnujChhikara";
const CALENDAR_YEAR = "last";
const CALENDAR_BLOCK_SIZE = 12;
const CALENDAR_BLOCK_MARGIN = 4;
const CALENDAR_BLOCK_RADIUS = 2;
const CALENDAR_FONT_SIZE = 14;
const CALENDAR_LABELS = {
  totalCount: "{{count}} contributions in {{year}}",
} as const;

// Memoize the tooltip text function outside to prevent recreation
const createTooltipText = (activity: { count: number; date: string }) =>
  `${activity.count} contribution${activity.count !== 1 ? "s" : ""} on ${activity.date}`;

const GithubCalendarComponent = memo(function GithubCalendarComponent({
  colorScheme,
  theme,
  tooltips,
}: {
  colorScheme: "light" | "dark";
  theme: {
    light: string[];
    dark: string[];
  };
  tooltips: {
    activity: {
      text: (activity: { count: number; date: string }) => string;
      placement: "top";
      offset: number;
      hoverRestMs: number;
      withArrow: boolean;
    };
  };
}) {
  return (
    <GitHubCalendar
      username={CALENDAR_USERNAME}
      year={CALENDAR_YEAR}
      colorScheme={colorScheme}
      theme={theme}
      blockSize={CALENDAR_BLOCK_SIZE}
      blockMargin={CALENDAR_BLOCK_MARGIN}
      blockRadius={CALENDAR_BLOCK_RADIUS}
      fontSize={CALENDAR_FONT_SIZE}
      showWeekdayLabels={false}
      showMonthLabels={true}
      showTotalCount={true}
      showColorLegend={true}
      labels={CALENDAR_LABELS}
      tooltips={tooltips}
    />
  );
});

// Static tooltip config - created once outside component
const STATIC_TOOLTIPS_CONFIG: {
  activity: {
    text: (activity: { count: number; date: string }) => string;
    placement: "top";
    offset: number;
    hoverRestMs: number;
    withArrow: boolean;
  };
} = {
  activity: {
    text: createTooltipText,
    placement: "top",
    offset: 8,
    hoverRestMs: 150,
    withArrow: true,
  },
};

// Static theme - created once outside component
const STATIC_CALENDAR_THEME = {
  light: ["#fafafa", "#e4e4e7", "#a1a1aa", "#71717a", "#3f3f46"],
  dark: ["#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a"],
};

export const GithubCalendar = memo(function GithubCalendar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize colorScheme to prevent unnecessary recalculations
  const colorScheme = useMemo(
    () => (theme === "dark" ? "dark" : "light"),
    [theme]
  );

  if (!mounted) {
    return (
      <section className="space-y-6">
        <div className="border-border flex items-center justify-between border-b pb-4">
          <h3 className="text-foreground text-sm font-medium tracking-wider uppercase">
            GitHub Contributions
          </h3>
        </div>
        <div className="flex justify-center py-4">
          <div className="w-full max-w-4xl overflow-x-auto">
            <div className="bg-muted h-32 animate-pulse rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <h3 className="text-foreground text-sm font-medium tracking-wider uppercase">
          GitHub Contributions
        </h3>
      </div>
      <div className="flex justify-center py-4">
        <div className="w-full max-w-4xl overflow-x-auto">
          <GithubCalendarComponent
            colorScheme={colorScheme}
            theme={STATIC_CALENDAR_THEME}
            tooltips={STATIC_TOOLTIPS_CONFIG}
          />
        </div>
      </div>
    </section>
  );
});
