/**
 * Introduction section with bio
 * Uses semantic article element for better SEO
 */
export function IntroSection() {
  return (
    <section className="w-full" aria-label="About me">
      <div className="px-5 py-4 bg-white dark:bg-neutral-800/50 rounded-lg shadow-sm transition-all duration-300 ease-out hover:shadow-lg">
        <p className="text-sm sm:text-base text-neutral-900 dark:text-neutral-300 leading-relaxed">
          Product-minded software engineer focused on solving real problems
          through well-designed systems. I care about clean abstractions,
          thoughtful user experiences, and architecture that scales gracefully.
          I enjoy owning features end to end - from design decisions to
          deployment - and shipping code that's readable, reliable, and built to
          last.
        </p>
      </div>
    </section>
  );
}
