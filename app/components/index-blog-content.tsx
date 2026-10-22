export function IndexBlogContent() {
  return (
    <div className="space-y-6 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
      <p>
        {
          "A while back, I shipped a feature that included a few new APIs. Nothing particularly unusual."
        }
      </p>
      <p>
        {
          "Some time after the release, I was going through our performance monitoring dashboard when I noticed something interesting. One of those APIs had started showing up near the top of our execution-time charts."
        }
      </p>
      <p>
        {
          "The weird part? It wasn't even a heavily used endpoint. By daily request count, it wasn't anywhere near our top 30 APIs."
        }
      </p>
      <p>{"So why was it showing up in our performance charts?"}</p>
      <p>{"I started digging."}</p>
      <p>
        {
          "The API was running a PostgreSQL query that filtered on a column without an index. Depending on how much data the query needed to examine, that could mean scanning a large part of the table just to find a handful of rows."
        }
      </p>
      <p>{"Well, that seemed like an easy fix."}</p>
      <p>{"Add an index. Query becomes faster. Problem solved."}</p>
      <p>
        {"I made the change, raised a PR, and sent it to my senior for review."}
      </p>
      <p>{"That's when the interesting part started."}</p>
      <p>
        {
          "Instead of simply approving the PR, he explained why we couldn't keep adding indexes every time we found a slow query."
        }
      </p>
      <p>
        {
          "And that got me thinking. If an index makes a query faster, why wouldn't we want one on every column? What's the actual downside?"
        }
      </p>
      <p>
        {"I knew "}
        <em>{"how to create an index"}</em>
        {". I didn't really understand what I was asking PostgreSQL to do."}
      </p>
      <p>
        {
          "So I went down the rabbit hole. PostgreSQL docs, B-trees, query planners, disk pages, and eventually "
        }
        <a
          href={"https://www.youtube.com/watch?v=3G293is403I"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-current"
        >
          {"this video by Arpit Bhayani"}
        </a>
        {", which helped a lot of things click."}
      </p>
      <p>{"Here's what I learned."}</p>
      <Heading>{"First, what even is an index?"}</Heading>
      <p>{"Imagine you have a table containing a few million orders."}</p>
      <CodeBlock language="sql">
        {"SELECT *\nFROM orders\nWHERE user_id = 12345;"}
      </CodeBlock>
      <p>
        {
          "Without a useful index, PostgreSQL might have to scan the table, checking rows to find the ones belonging to that user."
        }
      </p>
      <p>{"That's a sequential scan."}</p>
      <p>
        {
          "Now imagine you had a separate, organized structure telling PostgreSQL where to find records for each "
        }
        <Code>{"user_id"}</Code>
        {"."}
      </p>
      <p>
        {
          "Instead of checking rows one by one, it could look up the ID and jump to the matching records."
        }
      </p>
      <p>{"That's essentially what an index does."}</p>
      <p>
        {"The important detail is that "}
        <strong>{"the index is a separate data structure"}</strong>
        {
          ". It's not some magical property that makes your existing table faster."
        }
      </p>
      <p>
        {
          "PostgreSQL maintains it alongside your table, and maintaining it has a cost."
        }
      </p>
      <p>
        {
          "The default index type in PostgreSQL is a B-tree, so let's start there."
        }
      </p>
      <Heading>{"What happens when you create an index?"}</Heading>
      <p>{"Say we run:"}</p>
      <CodeBlock language="sql">
        {"CREATE INDEX idx_orders_user_id\nON orders(user_id);"}
      </CodeBlock>
      <p>
        {
          "I originally thought PostgreSQL just created some lookup mapping internally."
        }
      </p>
      <p>{"It's a little more involved than that."}</p>
      <p>{"For a typical B-tree index build, PostgreSQL needs to:"}</p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          {
            "Read the table and collect the indexed values along with references to their corresponding rows."
          }
        </li>
        <li>{"Sort those entries into the order required by the index."}</li>
        <li>{"Build the B-tree pages from the sorted entries."}</li>
        <li>{"Write the resulting index structure to storage."}</li>
      </ol>
      <p>
        {
          "Those row references are called TIDs (tuple identifiers). You'll also see the term "
        }
        <Code>{"ctid"}</Code>
        {" in PostgreSQL, which identifies a tuple's physical location."}
      </p>
      <p>
        {
          "And PostgreSQL stores these structures in pages, typically 8 KB each."
        }
      </p>
      <p>
        {
          "Think about the amount of work involved when the table has millions of rows. PostgreSQL has to read a lot of data, sort it, and write a whole new structure."
        }
      </p>
      <p>{"That means CPU, memory, disk I/O, and additional storage."}</p>
      <p>
        {"There's another detail I hadn't considered: "}
        <strong>{"creating an index can affect a running application."}</strong>
      </p>
      <p>
        {"A regular "}
        <Code>{"CREATE INDEX"}</Code>
        {
          " allows reads but blocks writes to the table while the index is being built."
        }
      </p>
      <p>
        {
          "Imagine adding an index to a busy production table and suddenly having INSERTs and UPDATEs waiting behind the operation."
        }
      </p>
      <p>{"Not ideal."}</p>
      <p>{"PostgreSQL gives us another option:"}</p>
      <CodeBlock language="sql">
        {"CREATE INDEX CONCURRENTLY idx_orders_user_id\nON orders(user_id);"}
      </CodeBlock>
      <p>
        {
          "This allows normal reads and writes to continue during most of the index build."
        }
      </p>
      <p>
        {
          "But it isn't free either. A concurrent build requires more work, multiple scans, and waiting for certain transactions. It can also fail and leave an invalid index that needs cleanup."
        }
      </p>
      <p>{"So even the act of adding an index needs some thought."}</p>
      <Heading>{"Okay, but why are B-trees fast?"}</Heading>
      <p>{"This was probably my favorite part to learn."}</p>
      <p>
        {
          "A B-tree is a balanced search tree. Instead of searching through every value, it helps narrow down where the value could be."
        }
      </p>
      <p>{"It consists of root, internal, and leaf pages."}</p>
      <p>{"A simplified version looks like this:"}</p>
      <CodeBlock language="text">
        {
          "                    [ 50 ]\n                   /      \\\n              [20, 35]   [70, 90]\n              /  |   \\    /  |   \\\n             ... ... ... ... ... ..."
        }
      </CodeBlock>
      <p>
        <em>{"Illustrative tree, not an exact PostgreSQL page layout."}</em>
      </p>
      <p>
        {"Say we're searching for "}
        <Code>{"user_id = 72"}</Code>
        {"."}
      </p>
      <p>{"We start at the root."}</p>
      <p>{"72 is greater than 50, so we go right."}</p>
      <p>
        {
          "Then we use the separator keys in that branch to narrow the search further."
        }
      </p>
      <p>
        {
          "We keep doing that until we reach the leaf page containing the relevant index entries."
        }
      </p>
      <p>
        {
          "The nice thing about a balanced tree is that it stays relatively shallow, even when the number of entries grows significantly."
        }
      </p>
      <p>
        {
          "That's why a B-tree lookup generally has logarithmic search complexity: "
        }
        <Code>{"O(log n)"}</Code>
        {"."}
      </p>
      <p>
        {
          "And because each page contains many entries and PostgreSQL can cache frequently accessed pages, a lookup often requires visiting surprisingly few levels."
        }
      </p>
      <p>{"There's also something clever about leaf pages."}</p>
      <p>{"They're linked in key order, which makes range scans efficient."}</p>
      <p>{"For example:"}</p>
      <CodeBlock language="sql">
        {"SELECT *\nFROM orders\nWHERE user_id BETWEEN 1000 AND 2000;"}
      </CodeBlock>
      <p>
        {
          "PostgreSQL can locate the start of the range and then scan forward through the relevant leaf entries."
        }
      </p>
      <p>
        {
          "You don't need to perform a completely separate tree search for every matching value."
        }
      </p>
      <p>
        {
          "This is one reason B-trees work well for equality lookups, ranges, and certain sorting operations."
        }
      </p>
      <p>{"But there's a catch."}</p>
      <Heading>{"Having an index doesn't mean PostgreSQL will use it"}</Heading>
      <p>{"This was another thing that surprised me."}</p>
      <p>
        {
          "You can create a perfectly valid index, run your query, and PostgreSQL might completely ignore it."
        }
      </p>
      <p>{"Why?"}</p>
      <p>{"Because PostgreSQL has a query planner."}</p>
      <p>
        {
          "Before executing a query, the planner estimates the cost of different approaches and tries to choose the cheapest one."
        }
      </p>
      <p>{"Consider:"}</p>
      <CodeBlock language="sql">
        {"SELECT *\nFROM users\nWHERE is_active = true;"}
      </CodeBlock>
      <p>{"Suppose 90% of your users are active."}</p>
      <p>
        {"You create an index on "}
        <Code>{"is_active"}</Code>
        {"."}
      </p>
      <p>{"Would using that index make sense?"}</p>
      <p>{"Probably not for a query returning almost the entire table."}</p>
      <p>
        {
          "PostgreSQL could end up reading a large number of index entries and then fetching most of the table rows anyway."
        }
      </p>
      <p>{"At that point, simply scanning the table could be cheaper."}</p>
      <p>{"But consider:"}</p>
      <CodeBlock language="sql">
        {"SELECT *\nFROM users\nWHERE email = 'hello@example.com';"}
      </CodeBlock>
      <p>{"If the email is unique, PostgreSQL only needs to find one row."}</p>
      <p>{"An index is likely to be very useful."}</p>
      <p>
        {
          "The difference is how much data the query is expected to retrieve, along with the cost of accessing it."
        }
      </p>
      <p>{"You can inspect what PostgreSQL actually does with:"}</p>
      <CodeBlock language="sql">
        {
          "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM orders\nWHERE user_id = 12345;"
        }
      </CodeBlock>
      <p>
        {
          "You might see a sequential scan, an index scan, or a bitmap heap scan."
        }
      </p>
      <p>
        <Code>{"EXPLAIN ANALYZE"}</Code>
        {" executes the query and reports what happened. "}
        <Code>{"BUFFERS"}</Code>
        {
          " adds information about buffer usage, which helps you understand the I/O behavior."
        }
      </p>
      <p>{"This is far more useful than guessing."}</p>
      <p>
        {
          "One thing worth remembering: the planner relies on statistics. If those statistics are stale, its estimates can be wrong."
        }
      </p>
      <p>
        {"Sometimes running "}
        <Code>{"ANALYZE"}</Code>
        {
          " and inspecting the execution plan is more useful than immediately creating another index."
        }
      </p>
      <Heading>{"Composite indexes are interesting too"}</Heading>
      <p>
        {
          "Let's say our application frequently asks for a user's recent orders."
        }
      </p>
      <CodeBlock language="sql">
        {
          "SELECT *\nFROM orders\nWHERE user_id = 12345\nORDER BY created_at DESC\nLIMIT 20;"
        }
      </CodeBlock>
      <p>{"We could create:"}</p>
      <CodeBlock language="sql">
        {
          "CREATE INDEX idx_orders_user_created\nON orders(user_id, created_at DESC);"
        }
      </CodeBlock>
      <p>
        {"Now the index contains entries ordered first by "}
        <Code>{"user_id"}</Code>
        {" and then by "}
        <Code>{"created_at"}</Code>
        {" within each user."}
      </p>
      <p>
        {
          "That's useful because PostgreSQL may be able to find the user's orders in the required order without separately sorting all the matching rows."
        }
      </p>
      <p>{"But the order of columns matters."}</p>
      <p>
        {"An index on "}
        <Code>{"(user_id, created_at)"}</Code>
        {" is generally most effective when our query constrains "}
        <Code>{"user_id"}</Code>
        {"."}
      </p>
      <p>
        {"If we only filter by "}
        <Code>{"created_at"}</Code>
        {", that same index may be much less useful."}
      </p>
      <p>
        {
          "There are exceptions, including PostgreSQL's skip-scan optimization in applicable versions and situations, so the leftmost-column rule isn't absolute."
        }
      </p>
      <p>
        {"The main thing I took away was that "}
        <strong>
          {"an index should be designed around the queries you actually run"}
        </strong>
        {", not just the columns that happen to exist."}
      </p>
      <Heading>{"There's also something called a covering index"}</Heading>
      <p>
        {
          "Normally, an index helps PostgreSQL find the row, but the database may still need to visit the table to retrieve additional columns."
        }
      </p>
      <p>{"For example:"}</p>
      <CodeBlock language="sql">
        {"SELECT status, created_at\nFROM orders\nWHERE user_id = 12345;"}
      </CodeBlock>
      <p>
        {"If our index only contains "}
        <Code>{"user_id"}</Code>
        {", PostgreSQL may need to fetch the corresponding table rows to get "}
        <Code>{"status"}</Code>
        {" and "}
        <Code>{"created_at"}</Code>
        {"."}
      </p>
      <p>{"We can include those additional columns:"}</p>
      <CodeBlock language="sql">
        {
          "CREATE INDEX idx_orders_covering\nON orders(user_id)\nINCLUDE (status, created_at);"
        }
      </CodeBlock>
      <p>{"Now the index contains all the columns needed by that query."}</p>
      <p>
        {"PostgreSQL may be able to perform an "}
        <em>{"index-only scan"}</em>
        {", avoiding some of the work of fetching rows from the main table."}
      </p>
      <p>
        {"I say "}
        <em>{"may"}</em>
        {
          " because PostgreSQL still has to check row visibility under MVCC. Depending on its visibility map, it might need to visit heap pages anyway."
        }
      </p>
      <p>
        {"Still, it's a useful optimization for certain read-heavy queries."}
      </p>
      <p>{"Of course, the included columns take up more index space."}</p>
      <p>{"There's that trade-off again."}</p>
      <Heading>{"So why not just index every column?"}</Heading>
      <p>{"We're finally back to the question that started all of this."}</p>
      <p>{"An index makes certain reads faster. Great."}</p>
      <p>
        {
          "But every index has to be stored, maintained, and kept consistent as the underlying data changes."
        }
      </p>
      <p>{"Let's talk about what that means."}</p>
      <SubHeading>{"1. Your writes become more expensive"}</SubHeading>
      <p>
        {"Imagine an "}
        <Code>{"orders"}</Code>
        {" table with six indexes."}
      </p>
      <p>{"Now you insert 100,000 new orders."}</p>
      <p>
        {
          "PostgreSQL doesn't just write those rows into the table. It also has to maintain the relevant entries in all six indexes."
        }
      </p>
      <p>{"That's additional work for every insert."}</p>
      <p>{"Updates can be expensive too."}</p>
      <p>
        {
          "If an indexed value changes, PostgreSQL needs to reflect that change in the index. Under the right conditions, PostgreSQL can use HOT updates to avoid creating new index entries, but unnecessary indexes can reduce those opportunities."
        }
      </p>
      <p>
        {
          "For a system handling a large volume of writes, this starts to matter."
        }
      </p>
      <p>{"One index probably won't destroy your performance."}</p>
      <p>
        {
          "But adding indexes without considering the workload can gradually make writes more expensive."
        }
      </p>
      <SubHeading>{"2. Indexes consume real storage"}</SubHeading>
      <p>{"Indexes live on disk."}</p>
      <p>
        {
          "A large table can have indexes taking hundreds of megabytes or several gigabytes, depending on the columns, number of rows, and index design."
        }
      </p>
      <p>
        {
          "If you have multiple indexes across multiple large tables, the storage adds up."
        }
      </p>
      <p>{"You can check an index's size:"}</p>
      <CodeBlock language="sql">
        {
          "SELECT pg_size_pretty(\n    pg_relation_size('idx_orders_user_id')\n);"
        }
      </CodeBlock>
      <p>
        {
          "And disk space isn't the only consideration. Index pages also compete for memory in PostgreSQL's buffer cache."
        }
      </p>
      <SubHeading>{"3. Indexes need maintenance"}</SubHeading>
      <p>
        {
          "PostgreSQL uses MVCC, which means updating or deleting rows can leave old tuple versions and index entries that need cleanup."
        }
      </p>
      <p>
        <Code>{"VACUUM"}</Code>
        {" helps reclaim reusable space and clean up dead entries."}
      </p>
      <p>
        {
          "But an index can still become bloated over time, particularly under certain write-heavy workloads."
        }
      </p>
      <p>{"More pages can mean more storage and I/O."}</p>
      <p>
        {"Sometimes "}
        <Code>{"REINDEX"}</Code>
        {
          " is useful, but you shouldn't automatically rebuild every index just because a table has a lot of updates."
        }
      </p>
      <SubHeading>{"4. More indexes give the planner more choices"}</SubHeading>
      <p>
        {
          "The query planner has to consider possible ways of executing a query."
        }
      </p>
      <p>{"Adding indexes introduces additional access paths."}</p>
      <p>
        {
          "For most ordinary queries, the extra planning cost isn't something I'd worry much about."
        }
      </p>
      <p>
        {
          "But on complex workloads with lots of joins and candidate indexes, it can become relevant."
        }
      </p>
      <p>
        {
          "More importantly, every extra index is another thing you need to understand, monitor, and justify."
        }
      </p>
      <Heading>{"Back to that slow API"}</Heading>
      <p>
        {
          "After learning all of this, I started looking at my original PR differently."
        }
      </p>
      <p>{"My reasoning had been pretty simple:"}</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>{"The query filters on a non-indexed column."}</li>
        <li>{"The API is slow."}</li>
        <li>{"An index should help."}</li>
      </ul>
      <p>{"And honestly, the index might have been the right solution."}</p>
      <p>{"My mistake wasn't necessarily proposing an index."}</p>
      <p>{"It was proposing one without properly considering the cost."}</p>
      <p>
        {
          "The endpoint wasn't even among our most frequently called APIs. That didn't mean its performance was irrelevant, but it did mean I needed to understand how much benefit the change would provide."
        }
      </p>
      <p>
        {
          "Was the execution time actually a problem for users? Was the query examining a large number of rows? How often was it running? How frequently did that table receive writes?"
        }
      </p>
      <p>{"Would the proposed index help other queries too?"}</p>
      <p>
        {"And was there a better way to write the query in the first place?"}
      </p>
      <p>
        {
          "Those were the questions I should have been asking before opening the PR."
        }
      </p>
      <p>
        {"An index isn't inherently good or bad. It depends on the workload."}
      </p>
      <Heading>{"What I check now"}</Heading>
      <p>
        {
          "These days, when I see a slow database query, I try to understand the problem before jumping to a fix."
        }
      </p>
      <p>{"First, I look at the query's execution plan:"}</p>
      <CodeBlock language="sql">
        {
          "EXPLAIN (ANALYZE, BUFFERS)\nSELECT *\nFROM orders\nWHERE user_id = 12345;"
        }
      </CodeBlock>
      <p>
        {
          "I want to know whether PostgreSQL is doing a sequential scan, how many rows it's examining, and where the execution time is going."
        }
      </p>
      <p>{"Then I look at the workload."}</p>
      <p>
        {"For example, "}
        <Code>{"pg_stat_statements"}</Code>
        {
          " can help identify queries consuming significant total execution time across repeated calls."
        }
      </p>
      <p>{"And I can inspect index usage with:"}</p>
      <CodeBlock language="sql">
        {
          "SELECT\n    indexrelname,\n    idx_scan,\n    idx_tup_read,\n    idx_tup_fetch\nFROM pg_stat_user_indexes\nORDER BY idx_scan DESC;"
        }
      </CodeBlock>
      <p>
        {
          "An index with a low scan count isn't automatically useless. It might support a rare but critical query, or enforce a constraint. The statistics also depend on when they were last reset."
        }
      </p>
      <p>{"But it gives me something concrete to investigate."}</p>
      <p>
        {
          "If an index still looks like the right solution, I can test it against realistic data and compare the plan before and after the change."
        }
      </p>
      <p>
        {
          "That's a much better process than adding an index and hoping for the best."
        }
      </p>
      <Heading>{"One last thing"}</Heading>
      <p>{"Looking back, I'm glad my senior didn't just approve that PR."}</p>
      <p>
        {
          "It would have been a small performance optimization, and I probably would have moved on to the next task without thinking about it again."
        }
      </p>
      <p>
        {
          "Instead, I ended up learning about B-trees, PostgreSQL storage, query planning, MVCC, and a bunch of things I hadn't really paid attention to before."
        }
      </p>
      <p>{"The funny thing is, the original problem was just one slow API."}</p>
      <p>
        {"But understanding "}
        <em>{"why"}</em>
        {
          " an index helps, and what it costs, turned out to be far more useful than the fix itself."
        }
      </p>
      <p>
        {
          "Now, whenever I'm tempted to add an index, I still think about that PR."
        }
      </p>
      <p>{"Sometimes the answer really is to add one."}</p>
      <p>{"I just want to know why first."}</p>
      <hr className="border-neutral-200 dark:border-neutral-800" />
      <p>
        <strong>{"Further reading"}</strong>
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a
            href={"https://www.postgresql.org/docs/current/indexes.html"}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-current"
          >
            {"PostgreSQL documentation: Indexes"}
          </a>
        </li>
        <li>
          <a
            href={"https://www.postgresql.org/docs/current/using-explain.html"}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-current"
          >
            {"PostgreSQL documentation: Using EXPLAIN"}
          </a>
        </li>
        <li>
          <a
            href={"https://www.youtube.com/watch?v=3G293is403I"}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-current"
          >
            {"Arpit Bhayani's video on database indexes"}
          </a>
        </li>
      </ul>
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

function CodeBlock({
  children,
  language,
}: {
  children: React.ReactNode;
  language?: string;
}) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 p-4 text-[13px] font-mono text-neutral-700 dark:text-neutral-300 leading-relaxed my-4">
      <code className={language ? `language-${language}` : undefined}>
        {children}
      </code>
    </pre>
  );
}
