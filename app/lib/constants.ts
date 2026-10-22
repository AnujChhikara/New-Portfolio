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
    url: "https://github.com/anujchhikara/portfolio",
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
  readonly github: string;
  readonly category: ProjectCategory;
  readonly year: string;
  readonly status: "live" | "in-progress" | "coming-soon";
  readonly highlight?: string;
  readonly playStoreLink?: string;
  readonly appStoreLink?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "Impact Player",
    description:
      "Engineering impact visualized. Analyze GitHub contributions with deep metrics, AI-powered insights, and detailed visualizations of PRs, reviews, and collaboration patterns.",
    tech: ["Next.js", "TypeScript", "GitHub API", "AI Analytics", "Tailwind"],
    link: "https://impact-player.vercel.app/",
    github: "https://github.com/AnujChhikara/impact-player",
    category: "web",
    year: "2024",
    status: "live",
    highlight: "AI-powered dev analytics",
  },
  {
    title: "Vidloom",
    description:
      "Full-stack video sharing platform with upload, transcoding, and playback. Built REST API from scratch with JWT auth, cloud storage, and paginated feeds.",
    tech: ["React", "Redux", "Express", "MongoDB", "Cloudinary"],
    link: "https://vidloom.vercel.app/",
    github: "https://github.com/AnujChhikara/frontend-yt",
    category: "web",
    year: "2023",
    status: "live",
    highlight: "Custom backend API",
  },
  {
    title: "DevVault",
    description:
      "Platform for storing and sharing reusable code snippets with syntax highlighting, tagging, and search. Backend handles multi-user access and versioning.",
    tech: ["Next.js", "Redux", "MongoDB", "Aceternity UI"],
    link: "https://devvault.vercel.app/",
    github: "https://github.com/AnujChhikara/Vault",
    category: "web",
    year: "2023",
    status: "live",
    highlight: "Snippet versioning",
  },
  {
    title: "Extensionhub",
    description:
      "Marketplace connecting users who need niche browser extensions with developers who can build them. Handles listings, requests, and developer matching.",
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
  { name: "Claude", link: "https://claude.ai" },
  { name: "Codex", link: "https://chatgpt.com/codex" },
  { name: "OpenCode", link: "https://opencode.ai" },
  {
    name: "ChatGPT",
    link: "https://chatgpt.com",
    purpose: "Research and learning",
  },
  { name: "cmux", link: "https://cmux.com" },
  { name: "Zed", link: "https://zed.dev" },
  { name: "Linear", link: "https://linear.app" },
  { name: "Notion", link: "https://www.notion.so" },
  { name: "Datadog", link: "https://datadog.com" },
  { name: "SigNoz", link: "https://signoz.io" },
  { name: "Figma", link: "https://figma.com" },
  { name: "Postman", link: "https://postman.com" },
] as const;

// ============================================================================
// External Links
// ============================================================================

export const EXTERNAL_LINKS = {
  reactRouter: "https://reactrouter.com",
  cloudflare: "https://cloudflare.com",
} as const;
