"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import "react-github-calendar/tooltips.css";

export function GithubCalendar() {
  const { theme } = useTheme();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
          GitHub Contributions
        </h3>
      </div>
      <div className="flex justify-center py-4">
        <div className="w-full max-w-4xl overflow-x-auto">
          <GitHubCalendar
            username="AnujChhikara"
            year="last"
            colorScheme={theme === "dark" ? "dark" : "light"}
            theme={{
              light: ["#fafafa", "#e4e4e7", "#a1a1aa", "#71717a", "#3f3f46"],
              dark: ["#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a"],
            }}
            blockSize={12}
            blockMargin={4}
            blockRadius={2}
            fontSize={14}
            showWeekdayLabels={false}
            showMonthLabels={true}
            showTotalCount={true}
            showColorLegend={true}
            labels={{
              totalCount: "{{count}} contributions in {{year}}",
            }}
            tooltips={{
              activity: {
                text: (activity) =>
                  `${activity.count} contribution${
                    activity.count !== 1 ? "s" : ""
                  } on ${activity.date}`,
                placement: "top",
                offset: 8,
                hoverRestMs: 150,
                withArrow: true,
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
