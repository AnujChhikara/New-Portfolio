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
// Projects
// ============================================================================

export interface Project {
  readonly title: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly link: string;
  readonly github: string;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "Vidloom",
    description:
      "A video sharing platform similar to YouTube with upload and playback capabilities.",
    tech: ["React", "Redux", "Shadcn UI", "Express", "MongoDB"],
    link: "https://vidloom.vercel.app/",
    github: "https://github.com/AnujChhikara/frontend-yt",
  },
  {
    title: "DevVault",
    description:
      "Platform for accessing and sharing reusable code snippets effortlessly.",
    tech: ["Next.js", "Redux", "Aceternity UI", "MongoDB"],
    link: "https://devvault.vercel.app/",
    github: "https://github.com/AnujChhikara/Vault",
  },
  {
    title: "Extensionhub",
    description:
      "Marketplace for niche browser extension requests and development.",
    tech: ["Next.js", "Appwrite"],
    link: "https://extensionhub-lilac.vercel.app/",
    github: "https://github.com/AnujChhikara/Extensionhub",
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
