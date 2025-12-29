import { LinkPreview } from "./link-preview";
import { SOCIAL_LINKS, type SocialLink } from "~/lib/constants";

/**
 * Individual social link item component
 * Memoizable for performance optimization
 */
function SocialLinkItem({ link }: { link: SocialLink }) {
  const Icon = link.icon;

  return (
    <LinkPreview url={link.url} width={280} height={175}>
      <span
        className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 group"
        aria-label={link.ariaLabel}
      >
        <Icon
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 shrink-0"
        />
        {link.name}
      </span>
    </LinkPreview>
  );
}

/**
 * Social links section displaying all contact links
 * Uses nav element for semantic HTML
 */
export function SocialLinks() {
  return (
    <nav className="w-full" aria-label="Social links">
      <ul className="flex flex-row items-start justify-start gap-4 sm:gap-6 flex-wrap list-none p-0 m-0">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.name}>
            <SocialLinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
