import { Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react";

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  username?: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/AnujChhikara",
    icon: Github,
    username: "AnujChhikara",
  },
  {
    name: "Twitter",
    href: "https://x.com/anujchhikara07",
    icon: Twitter,
    username: "@anujchhikara07",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anujchhikara20/",
    icon: Linkedin,
    username: "anujchhikara20",
  },
  {
    name: "Email",
    href: "mailto:anujchhikara777@gmail.com",
    icon: Mail,
    username: "anujchhikara777@gmail.com",
  },
];


