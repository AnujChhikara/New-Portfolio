import {
  Activity,
  Braces,
  ChartColumn,
  CircleDashed,
  Figma,
  MessageCircle,
  CodeXml,
  Send,
  Sparkles,
  SquareTerminal,
  Terminal,
  NotebookPen,
  type LucideIcon,
} from "lucide-react";
import { TOOLS } from "~/lib/constants";

const TOOL_APPEARANCE: Record<string, { icon: LucideIcon; color: string }> = {
  Claude: { icon: Sparkles, color: "text-[#bc6246] dark:text-[#e49a7e]" },
  Codex: { icon: CodeXml, color: "text-teal-700 dark:text-teal-300" },
  OpenCode: { icon: Terminal, color: "text-indigo-600 dark:text-indigo-300" },
  ChatGPT: { icon: MessageCircle, color: "text-green-700 dark:text-green-400" },
  cmux: { icon: SquareTerminal, color: "text-purple-600 dark:text-purple-300" },
  Zed: { icon: Braces, color: "text-blue-600 dark:text-blue-400" },
  Linear: { icon: CircleDashed, color: "text-[#5e6ad2] dark:text-[#a0a7f4]" },
  Notion: {
    icon: NotebookPen,
    color: "text-neutral-800 dark:text-neutral-200",
  },
  Datadog: { icon: Activity, color: "text-[#632ca6] dark:text-[#b88bea]" },
  SigNoz: { icon: ChartColumn, color: "text-amber-700 dark:text-amber-400" },
  Figma: { icon: Figma, color: "text-pink-600 dark:text-pink-400" },
  Postman: { icon: Send, color: "text-orange-700 dark:text-orange-400" },
};

export function ToolboxSection() {
  const codexTool = TOOLS.find((tool) => tool.name === "Codex");
  const remainingTools = TOOLS.filter((tool) => tool.name !== "Codex");
  const codexAppearance = codexTool
    ? (TOOL_APPEARANCE[codexTool.name] ?? {
        icon: Braces,
        color: "text-neutral-500 dark:text-neutral-400",
      })
    : null;
  const CodexIcon = codexAppearance?.icon;

  return (
    <section className="portfolio-section" aria-labelledby="toolbox-title">
      <div className="portfolio-heading">
        <h2 id="toolbox-title" className="portfolio-section-title">
          Daily drivers
        </h2>
      </div>
      <div className="tool-feature-layout">
        {codexTool && CodexIcon ? (
          <a
            className="tools-primary-card"
            href={codexTool.link}
            title={codexTool.purpose}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={codexTool.name}
          >
            <CodexIcon
              size={28}
              className={codexAppearance.color}
              aria-hidden="true"
            />
            <span className="tools-primary-name">{codexTool.name}</span>
          </a>
        ) : null}
        <ul
          className="tool-links tool-feature-secondary-grid"
          aria-label="Other daily drivers"
        >
          {remainingTools.map((tool) => {
            const { icon: Icon, color } = TOOL_APPEARANCE[tool.name] ?? {
              icon: Braces,
              color: "text-neutral-500 dark:text-neutral-400",
            };
            return (
              <li key={tool.name}>
                <a
                  className="tool-link"
                  href={tool.link}
                  title={tool.purpose}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={17} className={color} aria-hidden="true" />
                  <span>{tool.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
