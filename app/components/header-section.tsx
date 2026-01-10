import { SITE_CONFIG } from "~/lib/constants";

// Styles extracted for maintainability
const MASK_STYLE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
  maskComposite: "intersect" as const,
  WebkitMaskComposite: "source-in" as const,
};

const PROFILE_3D_STYLE = {
  perspective: "800px",
  transformStyle: "preserve-3d" as const,
};

const PROFILE_SHADOW_STYLE = {
  transform:
    "rotateY(-12deg) rotateX(6deg) translateZ(-8px) translateX(6px) translateY(6px)",
  background: "rgba(0,0,0,0.8)",
  filter: "blur(12px)",
};

const PROFILE_IMAGE_STYLE = {
  transform: "rotateY(-12deg) rotateX(6deg)",
  boxShadow: `
                0 0 0 1px rgba(255,255,255,0.1),
                4px 4px 8px rgba(0,0,0,0.6),
                8px 8px 16px rgba(0,0,0,0.4),
                16px 16px 32px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.15)
              `,
};

const PROFILE_OVERLAY_STYLE = {
  transform: "rotateY(-12deg) rotateX(6deg)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)",
  borderTop: "1px solid rgba(255,255,255,0.15)",
  borderLeft: "1px solid rgba(255,255,255,0.1)",
};

/**
 * Header section with profile image and name
 * Uses semantic HTML for better accessibility and SEO
 */
export function HeaderSection() {
  const { name, role } = SITE_CONFIG.author;

  return (
    <header className="flex flex-col items-center justify-center w-full">
      {/* Decorative banner image */}
      <img
        src="/header.webp"
        alt=""
        aria-hidden="true"
        className="w-full grayscale"
        loading="eager"
        style={MASK_STYLE}
      />

      <div className="flex flex-row items-end justify-start space-x-4 sm:space-x-6 -mt-2 w-full">
        {/* Profile image with 3D effect */}
        <figure
          className="relative group shrink-0"
          style={PROFILE_3D_STYLE}
          aria-label={`Profile photo of ${name}`}
        >
          {/* Shadow layer */}
          <div
            className="absolute inset-0 rounded-md"
            aria-hidden="true"
            style={PROFILE_SHADOW_STYLE}
          />
          {/* Profile photo */}
          <img
            src="/profile.jpg"
            alt={`${name} - ${role}`}
            width={96}
            height={96}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md transition-transform duration-300 ease-out group-hover:scale-105"
            loading="eager"
            style={PROFILE_IMAGE_STYLE}
          />
          {/* Light overlay for 3D effect */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
            aria-hidden="true"
            style={PROFILE_OVERLAY_STYLE}
          />
        </figure>

        {/* Name and title */}
        <div className="flex flex-col items-start justify-start min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold truncate w-full text-neutral-100">
            {name}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400">{role}</p>
        </div>
      </div>
    </header>
  );
}
