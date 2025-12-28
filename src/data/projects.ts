export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  link: string;
  github?: string;
  featured?: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "vidloom",
    title: "Vidloom",
    description:
      "A video sharing platform similar to YouTube with upload and playback capabilities.",
    longDescription:
      "Vidloom is a full-featured video sharing platform built with React and Express. Users can upload, share, and watch videos with features like likes, comments, and subscriptions. The platform includes user authentication, video transcoding, and responsive playback.",
    tech: ["React", "Redux", "Shadcn UI", "Express", "MongoDB"],
    link: "https://vidloom.vercel.app/",
    github: "https://github.com/AnujChhikara/frontend-yt",
    featured: true,
  },
  {
    slug: "devvault",
    title: "DevVault",
    description:
      "Platform for accessing and sharing reusable code snippets effortlessly.",
    longDescription:
      "DevVault is a developer productivity tool that allows developers to store, organize, and share code snippets. Features include syntax highlighting, tagging, search functionality, and public/private snippet options.",
    tech: ["Next.js", "Redux", "Aceternity UI", "MongoDB"],
    link: "https://devvault.vercel.app/",
    github: "https://github.com/AnujChhikara/Vault",
    featured: true,
  },
  {
    slug: "extensionhub",
    title: "Extensionhub",
    description:
      "Marketplace for niche browser extension requests and development.",
    longDescription:
      "Extensionhub connects users who need custom browser extensions with developers who can build them. Users can request extensions, vote on features, and developers can claim and fulfill requests.",
    tech: ["Next.js", "Appwrite"],
    link: "https://extensionhub-lilac.vercel.app/",
    github: "https://github.com/AnujChhikara/Extensionhub",
    featured: true,
  },
  {
    slug: "speedexx",
    title: "Speedexx",
    description: "Engaging and user-friendly e-commerce website clone.",
    longDescription:
      "Speedexx is a modern e-commerce website clone featuring product listings, cart functionality, user authentication, and a responsive design. Built as a learning project to explore Redux state management.",
    tech: ["React", "Redux", "Tailwind CSS"],
    link: "https://speedex-clone.vercel.app/",
    github: "https://github.com/AnujChhikara/speedexClone",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}


