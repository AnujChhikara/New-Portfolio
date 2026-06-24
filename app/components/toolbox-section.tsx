import { TOOLS } from "~/lib/constants";
import type { Tool } from "~/lib/constants";

const CATEGORY_STYLES: Record<Tool["category"], string> = {
  AI: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  Dev: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Infra: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  Design: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  Terminal: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Planning: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
};

const TOOL_ICONS: Record<string, React.ReactNode> = {
  "Claude Code": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
    </svg>
  ),
  Linear: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3.493 9.624L14.376 20.507a9.01 9.01 0 01-10.883-10.883zM2.65 8.138A9.01 9.01 0 0115.862 21.35L2.65 8.138zM21.35 15.862a9.01 9.01 0 01-12.722 4.69L20.01 9.17a9.01 9.01 0 011.34 6.692zM19.448 7.62L7.62 19.448a9.01 9.01 0 01-3.068-3.068L16.38 4.552a9.01 9.01 0 013.068 3.068zM15.51 3.3L3.3 15.51a9.01 9.01 0 014.69-12.721L19.37 14.17A9.01 9.01 0 0115.51 3.3z" />
    </svg>
  ),
  Datadog: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6A3 3 0 0112 9z" />
    </svg>
  ),
  SigNoz: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3 3h4v18H3zm7 6h4v12h-4zm7-4h4v16h-4z" />
    </svg>
  ),
  Warp: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h7v2H4z" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zm0 8.5h3.5a3.5 3.5 0 110 7H12v-7zm-7 3.5A3.5 3.5 0 018.5 10.5H12v7H8.5A3.5 3.5 0 015 14zm3.5 3.5A3.5 3.5 0 1112 21.5V18H8.5z" />
    </svg>
  ),
  Postman: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11l5 3-5 3V9z" />
    </svg>
  ),
  "VS Code": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 19.986V4.014a1.5 1.5 0 00-.85-1.427zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  ),
};

export function ToolboxSection() {
  return (
    <section className="w-full" aria-label="Toolbox">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Daily Drivers
        </h2>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          Tools I actually use, not a LinkedIn flex list.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {TOOLS.map((tool) => (
          <a
            key={tool.name}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
              {TOOL_ICONS[tool.name]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {tool.name}
                </span>
                <span
                  className={`shrink-0 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${CATEGORY_STYLES[tool.category]}`}
                >
                  {tool.category}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
