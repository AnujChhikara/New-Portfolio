import type { Route } from "./+types/home";
import { GithubStats } from "~/components/github-stat";
import { HeaderSection } from "~/components/header-section";
import { SocialLinks } from "~/components/social-links";
import { IntroSection } from "~/components/intro-section";
import { AboutSection } from "~/components/about-section";
import { FooterSection } from "~/components/footer-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "My Portfolio" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen px-4">
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <HeaderSection />
        <IntroSection />
        <SocialLinks />
        <GithubStats />
        <AboutSection />
        <FooterSection />
      </div>
    </div>
  );
}
