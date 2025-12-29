import { useMemo } from "react";
import { tech, type TechItem } from "./tech";

// Fade overlay styles for the scrolling effect
const FADE_TOP_CLASSES =
  "absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-neutral-900 via-neutral-900/80 to-transparent z-10 pointer-events-none";
const FADE_BOTTOM_CLASSES =
  "absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-neutral-900 via-neutral-900/80 to-transparent z-10 pointer-events-none";

interface TechColumnProps {
  items: TechItem[];
}

/**
 * Animated scrolling column of tech items
 * Uses duplicated items for seamless infinite scroll effect
 */
function TechColumn({ items }: TechColumnProps) {
  // Memoize duplicated items to avoid recreation on each render
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className="relative flex flex-col overflow-hidden grayscale max-h-[560px]"
      aria-label="Technologies list"
    >
      {/* Fade overlays */}
      <div className={FADE_TOP_CLASSES} aria-hidden="true" />
      <div className={FADE_BOTTOM_CLASSES} aria-hidden="true" />

      {/* First animation loop */}
      <ul className="flex flex-col shrink-0 animate-scroll-up list-none p-0 m-0">
        {duplicatedItems.map((item, index) => (
          <li
            key={`col-a-${item.name}-${index}`}
            className="flex items-center gap-4 py-2 px-3 group"
          >
            <div
              className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              {item.svg}
            </div>
            <span className="text-sm text-neutral-400 font-medium whitespace-nowrap">
              {item.name}
            </span>
          </li>
        ))}
      </ul>

      {/* Second animation loop for seamless effect */}
      <ul
        className="flex flex-col shrink-0 animate-scroll-up list-none p-0 m-0"
        aria-hidden="true"
      >
        {duplicatedItems.map((item, index) => (
          <li
            key={`col-b-${item.name}-${index}`}
            className="flex items-center gap-1.5 py-2 px-3 group"
          >
            <div className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
              {item.svg}
            </div>
            <span className="text-[10px] text-neutral-400 font-medium whitespace-nowrap">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Tech stack section displaying technologies used
 * Features animated scrolling list with fade effects
 */
export function TechStack() {
  return (
    <section
      className="relative w-full h-full overflow-hidden flex flex-col"
      aria-labelledby="tech-stack-heading"
    >
      <header className="flex flex-col gap-1 sm:gap-2 px-2 pb-3 sm:pb-4">
        <h2
          id="tech-stack-heading"
          className="text-base sm:text-lg font-semibold text-neutral-100"
        >
          Tech Stack
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Technologies I've worked with and continue to use in my projects.
        </p>
      </header>
      <div className="flex-1 overflow-hidden relative">
        <TechColumn items={tech} />
      </div>
    </section>
  );
}
