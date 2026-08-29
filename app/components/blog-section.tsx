import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { BLOG_POSTS } from "~/lib/blog-posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogSection() {
  return (
    <section className="w-full" aria-label="Blog">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Writing
          </h2>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Things I figure out and write down.
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-medium text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
          <BookOpen className="w-3 h-3" />
          {BLOG_POSTS.length} post{BLOG_POSTS.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={post.path}
            className="group flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-2.5">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-[10px] text-neutral-400 dark:text-neutral-500">
                  <Clock className="w-2.5 h-2.5" />
                  {post.readTime} read
                </span>
                <span className="text-[10px] text-neutral-300 dark:text-neutral-600">
                  {formatDate(post.date)}
                </span>
                <div className="flex gap-1 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
