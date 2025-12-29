import { GitHubCalendar } from "react-github-calendar";

export function GithubStats() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[280px]">
        <GitHubCalendar
          username="anujchhikara"
          showTotalCount={true}
          fontSize={12}
          tooltips={{
            activity: {
              text: (activity) =>
                `${activity.level} activities on ${activity.date}`,
              placement: "top",
              offset: 6,
              hoverRestMs: 300,
            },
            colorLegend: {
              text: (level) => `Level ${level}`,
              placement: "top",
              offset: 6,
              hoverRestMs: 300,
            },
          }}
          theme={{
            light: ["#f5f5f5", "#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373"],
            dark: ["#262626", "#404040", "#525252", "#737373", "#a3a3a3"],
          }}
        />
      </div>
    </div>
  );
}
