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

function IndexBlogContent() {
  return (
    <div className="space-y-8 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
      <p>
        I once asked my senior a question that seemed obvious to me at the time:
        if indexes make queries faster, why don't we just put an index on every
        column?
      </p>

      <p>
        He smiled, didn't answer, and asked me to figure it out myself. So I
        did. I dug into docs, read through Postgres internals, and found{" "}
        <a
          href="https://www.youtube.com/watch?v=3G293is403I"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 dark:text-neutral-100 underline underline-offset-2 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-600 dark:hover:decoration-neutral-300 transition-colors"
        >
          this video by Arpit Bhayani
        </a>{" "}
        that clicked everything into place. This post is my attempt to write
        down what I learned in a way that would have helped past me.
      </p>

      <Heading>What is an index, really?</Heading>

      <p>
        At its core, an index is a separate data structure that your database
        maintains alongside your table. It stores a sorted copy of one or more
        columns, along with pointers back to where the actual rows live on disk.
      </p>

      <p>
        Think of it like the index at the back of a textbook. The book's pages
        are your table rows — stored in the order they were written. The index
        is that sorted list at the end: "Concurrency — pages 142, 231, 408."
        Without it, you'd have to read every page. With it, you jump straight to
        what you need.
      </p>

      <p>
        PostgreSQL's most common index type is a <strong>B-tree</strong>{" "}
        (balanced tree). That's what you get when you run{" "}
        <Code>CREATE INDEX</Code> without specifying a type.
      </p>

      <Heading>What actually happens when you run CREATE INDEX?</Heading>

      <p>This is the part most tutorials skip. Let's say you do:</p>

      <CodeBlock>{`CREATE INDEX idx_orders_user_id ON orders(user_id);`}</CodeBlock>

      <p>Here's what PostgreSQL actually does:</p>

      <ol className="list-none space-y-4 pl-0">
        <Li num="1">
          <strong>Full sequential scan of the table.</strong> Postgres reads
          every row in <Code>orders</Code> to extract the <Code>user_id</Code>{" "}
          values and their corresponding row addresses (called <em>ctid</em> —
          the physical location on disk).
        </Li>
        <Li num="2">
          <strong>Sort the extracted values.</strong> It sorts all those{" "}
          <Code>(user_id, ctid)</Code> pairs. This is potentially a large sort —
          if the table is big, it might spill to disk.
        </Li>
        <Li num="3">
          <strong>Build the B-tree bottom-up.</strong> Sorted data is perfect
          for building a B-tree efficiently. Postgres fills leaf pages left to
          right, then builds internal pages up from those. This is much faster
          than inserting one value at a time.
        </Li>
        <Li num="4">
          <strong>Write index pages to disk.</strong> The finished B-tree gets
          written as a set of 8KB pages — same page size as the table itself.
        </Li>
        <Li num="5">
          <strong>Lock the table (briefly, or not at all).</strong> A regular{" "}
          <Code>CREATE INDEX</Code> locks writes for the entire duration.{" "}
          <Code>CREATE INDEX CONCURRENTLY</Code> does multiple passes and only
          takes short locks — but it takes longer and can fail if there are
          conflicts.
        </Li>
      </ol>

      <p>
        The whole thing can take minutes on a large table. During that time,
        your database is doing real work — reading, sorting, writing. It's not
        free.
      </p>

      <Heading>The B-tree structure</Heading>

      <p>
        A B-tree has three kinds of nodes: the root, internal nodes, and leaf
        nodes.
      </p>

      <p>
        <strong>Leaf nodes</strong> are where the actual index entries live.
        Each entry contains the indexed value and a pointer to the row (ctid).
        Leaf nodes are linked together in a doubly-linked list — this is what
        makes range queries fast. You find the start of the range, then just
        walk forward.
      </p>

      <p>
        <strong>Internal nodes</strong> are the routing layer. They store
        separator keys that tell you "go left for values less than X, go right
        for values greater than X." A B-tree stays balanced — every leaf node is
        at the same depth from the root.
      </p>

      <p>
        When you query <Code>WHERE user_id = 12345</Code>, Postgres starts at
        the root, follows the right pointers at each level, and arrives at a
        leaf node in <Code>O(log n)</Code> time. For 8 million rows, that's
        roughly 23 comparisons instead of 8,000,000.
      </p>

      <Heading>
        When the query planner uses your index (and when it doesn't)
      </Heading>

      <p>
        Here's something that surprises people: adding an index doesn't mean
        Postgres will use it.
      </p>

      <p>
        The query planner estimates the cost of each possible plan and picks the
        cheapest one. For very selective queries — "find me this one user" — an
        index scan is almost always cheaper. But for low-selectivity queries —
        "find all users where status = 'active'" where 70% of rows are active —
        a sequential scan might actually be faster. Reading 70% of a table via
        random index seeks is worse than just scanning the whole thing in order.
      </p>

      <p>You can see exactly what Postgres decides with:</p>

      <CodeBlock>{`EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 12345;`}</CodeBlock>

      <p>
        Look for <Code>Index Scan</Code> vs <Code>Seq Scan</Code>. If Postgres
        is ignoring your index on a query where you think it should use it,
        check the selectivity — and make sure your table statistics are up to
        date with <Code>ANALYZE</Code>.
      </p>

      <Heading>Composite indexes: order matters more than you think</Heading>

      <p>
        If you index on <Code>(user_id, created_at)</Code>, that index is useful
        for:
      </p>

      <ul className="list-none space-y-1.5 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700">
        <li className="text-neutral-600 dark:text-neutral-400">
          Queries filtering on <Code>user_id</Code> alone
        </li>
        <li className="text-neutral-600 dark:text-neutral-400">
          Queries filtering on <Code>user_id</Code> AND <Code>created_at</Code>
        </li>
        <li className="text-neutral-600 dark:text-neutral-400">
          Queries ordering by <Code>user_id, created_at</Code>
        </li>
      </ul>

      <p className="mt-4">
        But it's <em>not</em> useful for queries filtering on{" "}
        <Code>created_at</Code> alone. The leftmost column rule: a composite
        index can only be used if you include the leading columns in your query
        predicates.
      </p>

      <p>
        This is why index design matters. The order you specify columns in your
        index should match the most common access patterns — most selective
        column first is a common heuristic, but it's not always right.
      </p>

      <Heading>Covering indexes: the hidden win</Heading>

      <p>
        After finding the right rows in an index, Postgres usually has to go
        back to the actual table to fetch the columns you selected. This is
        called a "heap fetch" and it involves random disk reads — slow.
      </p>

      <p>
        A <strong>covering index</strong> includes all the columns your query
        needs, so Postgres never has to touch the table at all:
      </p>

      <CodeBlock>{`-- If you always query these three columns together:
CREATE INDEX idx_covering ON orders(user_id) INCLUDE (status, created_at);`}</CodeBlock>

      <p>
        Now a query for{" "}
        <Code>SELECT status, created_at FROM orders WHERE user_id = 12345</Code>{" "}
        can be answered entirely from the index. Postgres calls this an{" "}
        <em>index-only scan</em>. It shows up in <Code>EXPLAIN</Code> and it's
        noticeably faster for read-heavy workloads.
      </p>

      <Heading>The real cost of indexes</Heading>

      <p>
        Nobody talks enough about the downsides. Here's what you're paying for
        every index you add:
      </p>

      <SubHeading>Write overhead</SubHeading>
      <p>
        Every INSERT, UPDATE, and DELETE has to update all relevant indexes. An
        UPDATE on an indexed column is basically a delete + insert in the index.
        If you have 6 indexes on a table and you do a bulk insert of 100,000
        rows, you're maintaining 6 additional data structures in real time. This
        compounds under high write load.
      </p>

      <SubHeading>Storage</SubHeading>
      <p>
        Indexes take space. A B-tree index on a UUID column in a table with 10
        million rows can easily be 500MB+. Multiply by multiple indexes and
        you're looking at a significant storage bill, especially in cloud
        environments. Run{" "}
        <Code>SELECT pg_size_pretty(pg_relation_size('your_index_name'))</Code>{" "}
        to check.
      </p>

      <SubHeading>Index bloat</SubHeading>
      <p>
        When rows get updated or deleted, Postgres marks old index entries as
        dead but doesn't immediately reclaim the space. Over time, your indexes
        grow and have gaps — "bloat." This makes them slower because more pages
        need to be read. <Code>REINDEX</Code> or <Code>VACUUM</Code> helps, but
        bloat in write-heavy tables is a real operational concern.
      </p>

      <SubHeading>Planning time</SubHeading>
      <p>
        The more indexes you have, the more plans the query planner has to
        evaluate. For simple queries this is negligible. For complex queries
        with many joins and many indexes, planning time can become measurable.
      </p>

      <Heading>When NOT to add an index</Heading>

      <p>Indexes are not always the answer. Skip them when:</p>

      <ul className="list-none space-y-2 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700">
        <li className="text-neutral-600 dark:text-neutral-400">
          <strong>The table is small.</strong> Sequential scans on small tables
          are often faster because everything fits in memory anyway.
        </li>
        <li className="text-neutral-600 dark:text-neutral-400">
          <strong>The column has very low cardinality.</strong> Indexing a
          boolean <Code>is_deleted</Code> column where 95% of rows are{" "}
          <Code>false</Code> often won't help — Postgres will just scan the
          table.
        </li>
        <li className="text-neutral-600 dark:text-neutral-400">
          <strong>You're write-heavy and read-light.</strong> A table that gets
          millions of inserts per hour and is rarely queried will suffer more
          from index maintenance than it will gain from lookup speed.
        </li>
        <li className="text-neutral-600 dark:text-neutral-400">
          <strong>You're running analytics on the whole table.</strong> Full
          table scans for aggregations are expected. Adding an index won't help
          a <Code>SELECT COUNT(*) FROM events</Code> that has to touch every
          row.
        </li>
      </ul>

      <Heading>What I do now</Heading>

      <p>
        After going through this, my process has changed. I don't add indexes
        upfront based on intuition. I:
      </p>

      <ol className="list-decimal pl-6 space-y-2 text-neutral-600 dark:text-neutral-400">
        <li>Ship the feature, let it run</li>
        <li>
          Check slow query logs and <Code>pg_stat_statements</Code> to find
          actual slow queries
        </li>
        <li>
          Run <Code>EXPLAIN ANALYZE</Code> on the offenders
        </li>
        <li>Add targeted indexes only where the data shows I need them</li>
        <li>
          Monitor index usage with <Code>pg_stat_user_indexes</Code> — unused
          indexes are pure overhead
        </li>
      </ol>

      <p className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
        The answer to my original question — why not index every column — should
        be obvious by now. Every index you add is a promise you're making to
        maintain a separate data structure on every write, forever. That cost
        compounds. Index what your queries actually need, verify with{" "}
        <Code>EXPLAIN ANALYZE</Code>, and drop what isn't being used. That's the
        whole game.
      </p>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-10 mb-3">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-5 mb-2">
      {children}
    </h3>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
      {children}
    </code>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 p-4 text-[13px] font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed my-4">
      <code>{children}</code>
    </pre>
  );
}

function Li({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
        {num}
      </span>
      <span className="text-neutral-600 dark:text-neutral-400">{children}</span>
    </li>
  );
}
