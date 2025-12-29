import { tech } from "./tech";

function TechColumn({ items }: { items: typeof tech }) {
  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative flex flex-col overflow-hidden grayscale max-h-[560px]">
      <div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-neutral-700 dark:from-neutral-900 via  neutral-700/80 dark:via-neutral-900/80 to-transparent  z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-neutral-700 dark:from-neutral-900 via  neutral-700/80 dark:via-neutral-900/80 to-transparent  z-10 pointer-events-none" />
      <div className="flex flex-col shrink-0 animate-scroll-up">
        {duplicatedItems.map((item, index) => (
          <div
            key={`col-a-${index}`}
            className="flex items-center gap-4 py-2 px-3 group"
          >
            <div className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
              {item.svg}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col shrink-0 animate-scroll-up">
        {duplicatedItems.map((item, index) => (
          <div
            key={`col-b-${index}`}
            className="flex items-center gap-1.5 py-2 px-3 group"
          >
            <div className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
              {item.svg}
            </div>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      <div className="flex flex-col gap-1 sm:gap-2 px-2 pb-3 sm:pb-4">
        <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Tech Stack
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Technologies I've worked with and continue to use in my projects.
        </p>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <TechColumn items={tech} />
      </div>
    </div>
  );
}
