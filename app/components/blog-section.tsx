import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { BLOG_POSTS } from "~/lib/blog-posts";
import "./writing-section.css";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function BlogSection() {
  return (
    <section
      className="portfolio-section writing-feature-root"
      aria-labelledby="writing-heading"
    >
      <div className="portfolio-heading">
        <h2 id="writing-heading" className="portfolio-section-title">
          Writing
        </h2>
        <p className="section-meta">Notes on things I break and figure out</p>
      </div>

      <ul className="writing-feature-list">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug} className="writing-feature-item">
            <Link to={post.path} className="writing-feature-link">
              <div className="writing-feature-details">
                <time className="writing-feature-date" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <span className="writing-feature-readtime">
                  {post.readTime} read
                </span>
              </div>

              <div className="writing-feature-main">
                <div className="writing-feature-main-head">
                  <h3 className="writing-feature-title">{post.title}</h3>
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="writing-feature-arrow"
                  />
                </div>
                <p className="writing-feature-excerpt">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <ul className="writing-feature-tag-list">
                    {post.tags.map((tag) => (
                      <li key={tag} className="writing-feature-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
