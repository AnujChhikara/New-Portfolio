import type { Route } from "./+types/home";
import { GithubStats } from "~/components/github-stat";

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
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-12">
        {/* header section */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="/header.webp"
            alt="logo"
            className="w-full grayscale"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div className="flex flex-row items-end justify-start space-x-4 -mt-2 w-full">
            <img
              src="/profile.jpg"
              alt="logo"
              className="w-24 h-24 rounded-md border border-neutral-300 p-0.5 dark:border-neutral-700 shadow"
            />
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-2xl font-bold">Anuj Chhikara</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Software Engineer
              </p>
            </div>
          </div>
        </div>
        <GithubStats />
      </div>
    </div>
  );
}
