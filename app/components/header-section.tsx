import { SITE_CONFIG } from "~/lib/constants";
import { ThemeToggle } from "./theme-toggle";
import { IntroSection } from "./intro-section";
import { SocialLinks } from "./social-links";
import { LocalTime } from "./local-time";

const MASK_STYLE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
  maskComposite: "intersect" as const,
  WebkitMaskComposite: "source-in" as const,
};

export function HeaderSection() {
  const { name, role } = SITE_CONFIG.author;

  return (
    <header className="profile-header">
      <img
        src="/header.webp"
        alt=""
        aria-hidden="true"
        className="w-full grayscale"
        loading="eager"
        style={MASK_STYLE}
      />
      <div className="profile-layout">
        <figure className="profile-portrait">
          <img
            src="/anuj-avatar.jpg"
            alt={name}
            width={400}
            height={400}
            loading="eager"
          />
        </figure>
        <div className="profile-identity">
          <div className="profile-name">
            <h1>{name}</h1>
            <p>{role}</p>
            <LocalTime />
          </div>
          <ThemeToggle />
        </div>
        <IntroSection />
        <SocialLinks />
      </div>
    </header>
  );
}
