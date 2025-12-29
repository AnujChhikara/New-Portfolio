import {
  Heart,
  MailIcon,
  Github,
  Linkedin,
  Twitter,
  Package,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { LinkPreview } from "./link-preview";

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
  {
    name: "NPM",
    url: "https://www.npmjs.com/~anujchhikara",
    icon: Package,
  },
];

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      name: "Email",
      url: "mailto:anuj.dev.in@gmail.com",
      icon: MailIcon,
    },
    {
      name: "Source Code",
      url: "https://github.com/anujchhikara/portfolio",
      icon: Code2,
    },
  ];

  return (
    <footer className="w-full pb-6 sm:pb-8 md:pb-12 mt-8 sm:mt-12 md:mt-20">
      <div className="relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

        <div className="pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 md:mb-12">
            {/* Brand section */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center md:text-left">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 sm:mb-2">
                  Anuj Chhikara
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0">
                  Software engineer crafting digital experiences and building
                  impactful products.
                </p>
              </div>
            </div>

            {/* Social links section */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-center md:text-left">
                Connect
              </h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <LinkPreview
                      key={link.name}
                      url={link.url}
                      width={280}
                      height={175}
                    >
                      <div className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group touch-manipulation active:scale-95">
                        <Icon
                          size={18}
                          className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors"
                        />
                      </div>
                    </LinkPreview>
                  );
                })}
              </div>
            </div>

            {/* Quick links section */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-center md:text-left">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 items-center md:items-start">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <LinkPreview
                      key={link.name}
                      url={link.url}
                      width={280}
                      height={175}
                    >
                      <span className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group py-1.5 px-2 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900/50 touch-manipulation">
                        <Icon size={14} className="shrink-0" />
                        {link.name}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                        />
                      </span>
                    </LinkPreview>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 text-center">
              <p className="flex items-center gap-1.5">
                Built with
                <Heart
                  size={14}
                  className="fill-neutral-900 dark:fill-neutral-100 animate-pulse shrink-0"
                />
                by Anuj Chhikara
              </p>
              <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                •
              </span>
              <p>© {currentYear} All rights reserved.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-500 text-center">
              <a
                href="https://reactrouter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors underline-offset-2 hover:underline"
              >
                Made with React Router
              </a>
              <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                •
              </span>
              <a
                href="https://cloudflare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors underline-offset-2 hover:underline"
              >
                Deployed on Cloudflare
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
