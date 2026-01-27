import { LinkPreview } from "./link-preview";
import { SOCIAL_LINKS, type SocialLink } from "~/lib/constants";

/**
 * Individual social link item component
 */
function SocialLinkItem({ link }: { link: SocialLink }) {
  const Icon = link.icon;

  return (
    <LinkPreview url={link.url} width={280} height={175}>
      <span
        className="inline-flex items-center gap-3 px-6 py-2.5 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800/50 rounded-xl shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:-translate-y-0.5 group backdrop-blur-sm"
        aria-label={link.ariaLabel}
      >
        <Icon
          size={18}
          aria-hidden="true"
          className="transition-all duration-300 ease-out group-hover:scale-110 shrink-0 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
        />
        <span className="whitespace-nowrap">{link.name}</span>
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
      <ul className="flex flex-row items-start justify-start gap-3 sm:gap-4 flex-wrap list-none p-0 m-0">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.name}>
            <SocialLinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
