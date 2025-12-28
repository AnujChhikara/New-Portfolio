import type { Route } from "./+types/home";
import { GithubStats } from "~/components/github-stat";
import { HeaderSection } from "~/components/header-section";
import { SocialLinks } from "~/components/social-links";
import { IntroSection } from "~/components/intro-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "My Portfolio" },
  ];
}

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url(/noise-black.webp)",
        width: "100vw",
        height: "100vw",
      }}
    >
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8">
        <HeaderSection />
        <IntroSection />
        <SocialLinks />
        <GithubStats />
      </div>
    </div>
  );
}
