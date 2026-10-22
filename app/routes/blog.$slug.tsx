import { IndexBlogContent } from "~/components/index-blog-content";
import { Link } from "react-router";
import type { Route } from "./+types/blog.$slug";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "~/lib/blog-posts";
import type { BlogPostSlug } from "~/lib/blog-posts";
import { SITE_CONFIG } from "~/lib/constants";

const POST_CONTENT: Record<BlogPostSlug, React.ReactNode> = {
  "how-database-indexes-work": <IndexBlogContent />,
};

export function meta({ params }: Route.MetaArgs) {
  const post = BLOG_POSTS.find(({ slug }) => slug === params.slug);
  if (!post) {
    return [
      { title: `Post not found — ${SITE_CONFIG.name}` },
      { name: "robots", content: "noindex, nofollow" },
    ];
  }

  const url = `${SITE_CONFIG.url}${post.path}`;

  return [
    { title: `${post.title} — ${SITE_CONFIG.name}` },
    { name: "description", content: post.excerpt },
    { name: "robots", content: "index, follow" },
    { name: "keywords", content: post.tags.join(", ") },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.excerpt },
    { property: "og:image", content: `${SITE_CONFIG.url}/header.webp` },
    { property: "article:published_time", content: post.date },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.excerpt },
    { name: "twitter:image", content: `${SITE_CONFIG.url}/header.webp` },
  ];
}

export default function BlogPost({ params }: Route.ComponentProps) {
  const post = BLOG_POSTS.find(({ slug }) => slug === params.slug);
  const content = post ? POST_CONTENT[post.slug] : undefined;

  if (!post || !content) {
    return (
      <main className="min-h-screen px-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <div className="max-w-2xl mx-auto pt-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <h1 className="text-2xl font-bold">Post not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="max-w-2xl mx-auto pt-12 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug mb-4">
            {post.title}
          </h1>
          <p className="text-sm sm:text-base italic leading-relaxed text-neutral-500 dark:text-neutral-400 mb-5">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", {
                dateStyle: "long",
                timeZone: "UTC",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {post.readTime} read
            </span>
          </div>
        </header>

        <article className="prose-custom">{content}</article>
      </div>
    </main>
  );
}
