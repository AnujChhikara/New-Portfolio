/**
 * Introduction section with bio
 * Uses semantic article element for better SEO
 */
export function IntroSection() {
  return (
    <section className="w-full" aria-label="About me">
      <div className="px-5 py-4 bg-white dark:bg-neutral-800/50 rounded-lg shadow-sm transition-all duration-300 ease-out hover:shadow-lg">
        <p className="text-sm sm:text-base text-neutral-900 dark:text-neutral-300 leading-relaxed">
          I love building products, shipping fast, and learning through the
          process. Fast-paced startup environments excite me because they offer
          the chance to take ownership, experiment, and solve real problems.
        </p>
      </div>
    </section>
  );
}
