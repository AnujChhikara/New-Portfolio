export interface BlogPost {
  readonly slug: string;
  readonly path: `/blog/${string}/`;
  readonly title: string;
  readonly excerpt: string;
  readonly date: string;
  readonly readTime: string;
  readonly tags: readonly string[];
}

export const BLOG_POSTS = [
  {
    slug: "how-database-indexes-work",
    path: "/blog/how-database-indexes-work/",
    title: "Why Can't We Just Add an Index?",
    excerpt:
      "A slow API, a quick PR, and a lesson in how PostgreSQL indexes actually work.",
    date: "2025-06-24",
    readTime: "12 min",
    tags: ["PostgreSQL", "Backend", "Performance"],
  },
] as const satisfies readonly BlogPost[];

export type BlogPostSlug = (typeof BLOG_POSTS)[number]["slug"];

export const BLOG_POST_PATHS = BLOG_POSTS.map(({ path }) => path);
