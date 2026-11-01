import {
  Activity,
  Braces,
  ChartColumn,
  MessageCircle,
  CodeXml,
  Sparkles,
  SquareTerminal,
  Terminal,
  NotebookPen,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { TOOLS, type Tool } from "~/lib/constants";

const TOOL_APPEARANCE: Record<string, { icon: LucideIcon; color: string }> = {
  Claude: { icon: Sparkles, color: "text-[#bc6246] dark:text-[#e49a7e]" },
  Codex: { icon: CodeXml, color: "text-teal-700 dark:text-teal-300" },
  OpenCode: { icon: Terminal, color: "text-indigo-600 dark:text-indigo-300" },
  ChatGPT: { icon: MessageCircle, color: "text-green-700 dark:text-green-400" },
  cmux: { icon: SquareTerminal, color: "text-purple-600 dark:text-purple-300" },
  Zed: { icon: Braces, color: "text-blue-600 dark:text-blue-400" },
  Notion: {
    icon: NotebookPen,
    color: "text-neutral-800 dark:text-neutral-200",
  },
  Datadog: { icon: Activity, color: "text-[#632ca6] dark:text-[#b88bea]" },
  SigNoz: { icon: ChartColumn, color: "text-amber-700 dark:text-amber-400" },
};

function ToolCard({ tool, featured }: { tool: Tool; featured?: boolean }) {
  const { icon: Icon, color } = TOOL_APPEARANCE[tool.name] ?? {
    icon: Braces,
    color: "text-neutral-500 dark:text-neutral-400",
  };

  return (
    <a
      className={`tool-card${featured ? " tool-card--featured" : ""}`}
      href={tool.link}
      title={tool.purpose}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="tool-card-icon" aria-hidden="true">
        <Icon size={featured ? 22 : 17} className={color} />
      </span>
      <span className="tool-card-body">
        <span className="tool-card-name">{tool.name}</span>
        {tool.purpose && (
          <span className="tool-card-purpose">{tool.purpose}</span>
        )}
      </span>
      <ArrowUpRight size={14} aria-hidden="true" className="tool-card-arrow" />
    </a>
  );
}

export function ToolboxSection() {
  const primary = TOOLS.find((tool) => tool.name === "Codex") ?? TOOLS[0];
  const remainingTools = TOOLS.filter((tool) => tool.name !== primary.name);

  return (
    <section
      className="portfolio-section toolbox-section"
      aria-labelledby="toolbox-title"
    >
      <div className="portfolio-heading">
        <h2 id="toolbox-title" className="portfolio-section-title">
          Daily drivers
        </h2>
        <p className="section-meta">The tools I reach for most</p>
      </div>
      <div className="toolbox-featured">
        <ToolCard tool={primary} featured />
      </div>
      <div className="toolbox-grid">
        {remainingTools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </section>
  );
}
