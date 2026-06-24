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
  readonly description: string;
  readonly category: "AI" | "Dev" | "Infra" | "Design" | "Terminal" | "Planning";
  readonly link: string;
}

export const TOOLS: readonly Tool[] = [
  {
    name: "Claude Code",
    description: "My primary AI coding assistant. I live in it.",
    category: "AI",
    link: "https://claude.ai/code",
  },
  {
    name: "Linear",
    description: "Issues, projects, cycles — cleanest PM tool I've used.",
    category: "Planning",
    link: "https://linear.app",
  },
  {
    name: "Datadog",
    description: "APM, logs, dashboards. First thing I check when prod acts up.",
    category: "Infra",
    link: "https://datadog.com",
  },
  {
    name: "SigNoz",
    description: "Open-source observability. Traces and logs without the bill shock.",
    category: "Infra",
    link: "https://signoz.io",
  },
  {
    name: "Warp",
    description: "Terminal that doesn't make me want to cry. AI completions built in.",
    category: "Terminal",
    link: "https://warp.dev",
  },
  {
    name: "Figma",
    description: "For when I need to think in shapes, not words.",
    category: "Design",
    link: "https://figma.com",
  },
  {
    name: "Postman",
    description: "API testing, collections, mocking. Muscle memory at this point.",
    category: "Dev",
    link: "https://postman.com",
  },
  {
    name: "VS Code",
    description: "Still home base. Extensions make it what I need it to be.",
    category: "Dev",
    link: "https://code.visualstudio.com",
  },
] as const;

// ============================================================================
// Blog
// ============================================================================

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly date: string;
  readonly readTime: string;
  readonly tags: readonly string[];
}

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "how-database-indexes-work",
    title: "How Database Indexes Actually Work",
    excerpt:
      "You've added indexes to speed up queries. But do you know what happens the moment you hit CREATE INDEX? What's being built, where it lives, and why it sometimes makes things worse?",
    date: "2025-06-24",
    readTime: "12 min",
    tags: ["PostgreSQL", "Backend", "Performance"],
  },
] as const;

// ============================================================================
// External Links
// ============================================================================

export const EXTERNAL_LINKS = {
  reactRouter: "https://reactrouter.com",
  cloudflare: "https://cloudflare.com",
} as const;

// ============================================================================
// Location
// ============================================================================

export const LOCATION = {
  coordinates: [77.2065, 28.5245] as [number, number],
  name: "New Delhi, India",
} as const;
