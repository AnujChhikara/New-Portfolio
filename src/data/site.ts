export const siteConfig = {
  name: "Anuj Chhikara",
  title: "Anuj Chhikara - Software Engineer & Full Stack Developer",
  description:
    "Anuj Chhikara is a software engineer and open source contributor specializing in React, Next.js, Node.js, and modern web development. Building scalable web applications and contributing to open source.",
  url: "https://www.anujchhikara.com",
  ogImage:
    "https://pbs.twimg.com/profile_images/1921460669129363456/MefH_yDv_400x400.jpg",
  email: "anujchhikara777@gmail.com",
  location: "India",
  author: {
    name: "Anuj Chhikara",
    twitter: "@anujchhikara07",
    github: "AnujChhikara",
    linkedin: "anujchhikara20",
  },
  keywords: [
    "Anuj Chhikara",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Open Source Contributor",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

