import {
  Github,
  Linkedin,
  Twitter,
  Package,
  MailIcon,
  Code2,
  type LucideIcon,
} from "lucide-react";

// ============================================================================
// Site Configuration
// ============================================================================

export const SITE_CONFIG = {
  name: "Anuj Chhikara",
  title: "Anuj Chhikara | Software Engineer",
  description:
    "Software engineer passionate about building end-to-end products that solve real-world problems. Crafting clean, scalable code and thoughtful user experiences.",
  url: "https://anujchhikara.com",
  locale: "en_US",
  author: {
    name: "Anuj Chhikara",
    email: "anuj.dev.in@gmail.com",
    role: "Software Engineer",
    location: "New Delhi, India",
    github: "anujchhikara",
  },
  keywords: [
    "Anuj Chhikara",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
} as const;

// ============================================================================
// Social Links
// ============================================================================

export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: LucideIcon;
  readonly ariaLabel: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/anujchhikara",
    icon: Github,
    ariaLabel: "View GitHub profile",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anujchhikara20/",
    icon: Linkedin,
    ariaLabel: "Connect on LinkedIn",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/anujchhikara07",
    icon: Twitter,
    ariaLabel: "Follow on Twitter",
  },
  {
    name: "Email",
    url: `mailto:${SITE_CONFIG.author.email}`,
    icon: MailIcon,
    ariaLabel: "Send an email",
  },
  {
    name: "NPM",
    url: "https://www.npmjs.com/~anujchhikara",
    icon: Package,
    ariaLabel: "View NPM packages",
  },
] as const;

// Footer-specific links (subset)
export const FOOTER_SOCIAL_LINKS: readonly SocialLink[] = SOCIAL_LINKS.filter(
  (link) => ["GitHub", "LinkedIn", "Twitter", "NPM"].includes(link.name)
);

export const QUICK_LINKS: readonly SocialLink[] = [
  {
    name: "Email",
    url: `mailto:${SITE_CONFIG.author.email}`,
    icon: MailIcon,
    ariaLabel: "Send an email",
  },
  {
    name: "Source Code",
    url: "https://github.com/AnujChhikara/New-Portfolio",
    icon: Code2,
    ariaLabel: "View source code on GitHub",
  },
] as const;

// ============================================================================
// Backend Stats
// ============================================================================

export interface BackendStat {
  readonly value: string;
  readonly label: string;
  readonly sublabel: string;
}

export const BACKEND_STATS: readonly BackendStat[] = [
  {
    value: "5M",
    label: "Requests / day",
    sublabel: "peak traffic served",
  },
  {
    value: "35K",
    label: "Concurrent",
    sublabel: "WebSocket connections",
  },
  {
    value: "135K",
    label: "Req / min",
    sublabel: "peak HTTP",
  },
  {
    value: "99.9%",
    label: "Uptime",
    sublabel: "SLA maintained",
  },
] as const;

// ============================================================================
// Projects
// ============================================================================

export type ProjectCategory = "web" | "mobile" | "backend";

export interface Project {
  readonly title: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly link: string;
  readonly github?: string;
  readonly category: ProjectCategory;
  readonly year: string;
  readonly status: "live" | "in-progress" | "coming-soon";
  readonly highlight?: string;
  readonly featured?: boolean;
  readonly playStoreLink?: string;
  readonly appStoreLink?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "dg",
    description:
      "Describe systems, sequences, schemas, and more in a small typed language. dg lays out each diagram automatically, then exports SVG, PDF, or Mermaid for docs and repos.",

    tech: [
      "Typed DSL",
      "Automatic layout",
      "Live editor",
      "CLI & MCP",
      "SVG/PNG/PDF/Mermaid",
    ],
    link: "https://diagrams.madebetter.dev",
    category: "web",
    year: "",
    status: "live",
    highlight: "Diagrams as text",
    featured: true,
  },
  {
    title: "Runloom",
    description:
      "Preview a startup plan, confirm it, then follow logs, readiness, and resource use in one terminal. Also monitor Docker Compose stacks.",

    tech: [
      "Rust",
      "Terminal UI",
      "Service runner",
      "Readiness",
      "Unified logs",
      "Docker/Compose",
    ],
    link: "https://runloom.madebetter.dev",
    github: "https://github.com/AnujChhikara/rescope",
    category: "web",
    year: "",
    status: "live",
    highlight: "Local service runner",
    featured: true,
  },
  {
    title: "Impact Player",
    description:
      "See where your GitHub contributions land: explore PRs, reviews, and collaboration through focused metrics, AI insights, and visual summaries.",

    tech: ["Next.js", "TypeScript", "GitHub API", "AI Analytics", "Tailwind"],
    link: "https://impact-player.vercel.app/",
    github: "https://github.com/AnujChhikara/impact-player",
    category: "web",
    year: "2024",
    status: "live",
    highlight: "AI-powered dev analytics",
  },
  {
    title: "Extensionhub",
    description:
      "Find a developer for a niche browser extension—or discover requests that match what you can build.",

    tech: ["Next.js", "Appwrite", "TypeScript"],
    link: "https://extensionhub-lilac.vercel.app/",
    github: "https://github.com/AnujChhikara/Extensionhub",
    category: "web",
    year: "2023",
    status: "live",
    highlight: "Extension marketplace",
  },
] as const;

// ============================================================================
// Toolbox
// ============================================================================

export interface Tool {
  readonly name: string;
  readonly link: string;
  readonly purpose?: string;
}

export const TOOLS: readonly Tool[] = [
  {
    name: "Codex",
    link: "https://chatgpt.com/codex",
    purpose: "Agentic coding, from the terminal to the cloud",
  },
  {
    name: "Claude",
    link: "https://claude.ai",
    purpose: "Long-form thinking and code review",
  },
  {
    name: "OpenCode",
    link: "https://opencode.ai",
    purpose: "Open-source coding agent",
  },
  {
    name: "ChatGPT",
    link: "https://chatgpt.com",
    purpose: "Research and learning",
  },
  {
    name: "cmux",
    link: "https://cmux.com",
    purpose: "Parallel agent workspaces",
  },
  { name: "Zed", link: "https://zed.dev", purpose: "Fast, focused editor" },
  {
    name: "Notion",
    link: "https://www.notion.so",
    purpose: "Notes, docs, and half-formed ideas",
  },
  {
    name: "Datadog",
    link: "https://datadog.com",
    purpose: "Metrics and production signals",
  },
  {
    name: "SigNoz",
    link: "https://signoz.io",
    purpose: "Open-source observability",
  },
] as const;

// ============================================================================
// External Links
// ============================================================================

export const EXTERNAL_LINKS = {
  reactRouter: "https://reactrouter.com",
  cloudflare: "https://cloudflare.com",
} as const;
