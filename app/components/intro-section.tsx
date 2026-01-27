import { SITE_CONFIG } from "~/lib/constants";

/**
 * Introduction section with bio
 * Uses semantic article element for better SEO
 */
export function IntroSection() {
  return (
    <section className="w-full" aria-label="About me">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {SITE_CONFIG.description} From architecture to deployment, I enjoy the
        full product lifecycle and bringing concepts to life.
      </p>
    </section>
  );
}
