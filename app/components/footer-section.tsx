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

export function FooterSection() {
  const currentYear = new Date().getFullYear();

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
    <footer className="w-full pb-16 mt-20">
      <div className="relative">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

        <div className="pt-12 pb-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand section */}
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Anuj Chhikara
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Software engineer crafting digital experiences and building
                  impactful products.
                </p>
              </div>
            </div>

            {/* Social links section */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <LinkPreview
                      key={link.name}
                      url={link.url}
                      width={280}
                      height={175}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group">
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
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <LinkPreview
                      key={link.name}
                      url={link.url}
                      width={280}
                      height={175}
                    >
                      <span className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group">
                        <Icon size={14} />
                        {link.name}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </span>
                    </LinkPreview>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <p className="flex items-center gap-1.5">
                Built with
                <Heart size={14} className=" fill-neutral-900 animate-pulse" />
                by Anuj Chhikara
              </p>
              <span className="hidden md:inline text-neutral-400 dark:text-neutral-600">
                •
              </span>
              <p>© {currentYear} All rights reserved.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
              <span>Made with React Router</span>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <span>Deployed on Cloudflare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
