import type { Route } from "./+types/home";
import { GithubStats } from "~/components/github-stat";
import { HeaderSection } from "~/components/header-section";
import { SocialLinks } from "~/components/social-links";
import { IntroSection } from "~/components/intro-section";
import { AboutSection } from "~/components/about-section";
import { FooterSection } from "~/components/footer-section";
import { SITE_CONFIG } from "~/lib/constants";

/**
 * Meta function for SEO optimization
 * Returns comprehensive meta tags for search engines and social sharing
 */
export function meta({}: Route.MetaArgs) {
  const title = SITE_CONFIG.title;
  const description = SITE_CONFIG.description;
  const url = SITE_CONFIG.url;

  return [
    // Primary Meta Tags
    { title },
    { name: "title", content: title },
    { name: "description", content: description },
    { name: "keywords", content: SITE_CONFIG.keywords.join(", ") },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${url}/og-image.png` },
    { property: "og:site_name", content: SITE_CONFIG.name },
    { property: "og:locale", content: SITE_CONFIG.locale },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: `${url}/og-image.png` },
    { name: "twitter:creator", content: "@anujchhikara07" },

    // Additional SEO
    { name: "geo.region", content: "IN-DL" },
    { name: "geo.placename", content: SITE_CONFIG.author.location },
  ];
}

/**
 * Home page component
 * Main landing page with semantic HTML structure for accessibility
 */
export default function Home() {
  return (
    <main
      className="min-h-screen px-4"
      role="main"
      aria-label="Personal portfolio of Anuj Chhikara"
    >
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <HeaderSection />
        <IntroSection />
        <SocialLinks />
        <GithubStats />
        <AboutSection />
        <FooterSection />
      </div>
    </main>
  );
}
