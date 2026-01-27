import { SITE_CONFIG } from "~/lib/constants";
import { ThemeToggle } from "./theme-toggle";

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

// Theme-aware styles - will be applied via CSS classes
const PROFILE_SHADOW_STYLE = {
  transform:
    "rotateY(-12deg) rotateX(6deg) translateZ(-8px) translateX(6px) translateY(6px)",
  filter: "blur(12px)",
};

const PROFILE_IMAGE_STYLE = {
  transform: "rotateY(-12deg) rotateX(6deg)",
};

const PROFILE_OVERLAY_STYLE = {
  transform: "rotateY(-12deg) rotateX(6deg)",
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

      <div className="flex flex-row items-end justify-between space-x-4 sm:space-x-6 -mt-2 w-full">
        <div className="flex flex-row items-end space-x-4 sm:space-x-6">
          {/* Profile image with 3D effect */}
          <figure
            className="relative group shrink-0"
            style={PROFILE_3D_STYLE}
            aria-label={`Profile photo of ${name}`}
          >
            <img
              src="https://api.dicebear.com/9.x/croodles/svg?seed=Aneka"
              alt={`${name} - ${role}`}
              width={96}
              height={96}
              className="relative 0 backdrop-blur-3xl w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 -mt-4 rounded-md border-2 border-neutral-900 dark:border-neutral-700 transition-all duration-300 ease-out group-hover:grayscale-0 shadow-lg"
              loading="eager"
              style={PROFILE_IMAGE_STYLE}
            />
          </figure>

          {/* Name and title */}
          <div className="flex flex-col items-start justify-start min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate w-full text-neutral-900 dark:text-neutral-100">
              {name}
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              {role}
            </p>
          </div>
        </div>

        {/* Theme toggle switch */}
        <div className="flex items-end pb-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
