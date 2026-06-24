import { tech } from "./bento/tech";
import { useMemo } from "react";

export function SkillsMarquee() {
  const duplicatedSkills = useMemo(() => [...tech, ...tech], []);

  return (
    <div className="relative w-full overflow-hidden" aria-label="Skills">
      <div
        className="flex gap-6 sm:gap-8 whitespace-nowrap"
        style={{
          width: "max-content",
          animation: "marquee-scroll 50s linear infinite",
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`skill-${skill.name}-${index}`}
            className="flex items-center gap-2 sm:gap-3 shrink-0 px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors group"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
              {skill.svg}
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
