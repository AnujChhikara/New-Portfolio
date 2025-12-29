import { LinkPreview } from "./link-preview";
import {
  Github,
  Linkedin,
  Twitter,
  Package,
  MailIcon,
  File,
} from "lucide-react";

export function SocialLinks() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/anujchhikara",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anujchhikara20/",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/anujchhikara07",
      icon: Twitter,
    },
    // {
    //   name: "Resume",
    //   url: "https://drive.google.com/file/d/1-2-3-4-5-6-7-8-9-0/view?usp=sharing",
    //   icon: File,
    // },
    {
      name: "Email",
      url: "mailto:anuj.dev.in@gmail.com",
      icon: MailIcon,
    },
    {
      name: "Npm",
      url: "https://www.npmjs.com/~anujchhikara",
      icon: Package,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-row items-start justify-start gap-4 sm:gap-6 flex-wrap">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <LinkPreview
              key={link.name}
              url={link.url}
              width={280}
              height={175}
            >
              <span className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 group">
                <Icon
                  size={16}
                  className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shrink-0"
                />
                {link.name}
              </span>
            </LinkPreview>
          );
        })}
      </div>
    </div>
  );
}
