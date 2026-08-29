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
    title: "How Database Indexes Actually Work",
    excerpt:
      "You've added indexes to speed up queries. But do you know what happens the moment you hit CREATE INDEX? What's being built, where it lives, and why it sometimes makes things worse?",
    date: "2025-06-24",
    readTime: "12 min",
    tags: ["PostgreSQL", "Backend", "Performance"],
  },
] as const satisfies readonly BlogPost[];

export type BlogPostSlug = (typeof BLOG_POSTS)[number]["slug"];

export const BLOG_POST_PATHS = BLOG_POSTS.map(({ path }) => path);
