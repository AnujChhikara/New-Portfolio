import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { BLOG_POSTS } from "~/lib/blog-posts";
import "./writing-section.css";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function BlogSection() {
  return (
    <section
      className="portfolio-section editorial-section writing-feature-root"
      aria-labelledby="writing-heading"
    >
      <div className="portfolio-heading editorial-heading">
        <h2 id="writing-heading" className="portfolio-section-title">
          Writing
        </h2>
      </div>
      <ul className="writing-feature-list">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug} className="writing-feature-item">
            <Link to={post.path} className="writing-feature-link">
              <div className="writing-feature-main">
                <div className="writing-feature-main-head">
                  <h3 className="writing-feature-title">{post.title}</h3>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="writing-feature-arrow"
                  />
                </div>
                <p className="writing-feature-excerpt">{post.excerpt}</p>
              </div>
              <aside
                className="writing-feature-details"
                aria-label="Article details"
              >
                <dl className="writing-feature-detail-list">
                  <div className="writing-feature-detail">
                    <dt className="writing-feature-detail-label">Date</dt>
                    <dd className="writing-feature-detail-value">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </dd>
                  </div>
                  <div className="writing-feature-detail">
                    <dt className="writing-feature-detail-label">
                      Reading time
                    </dt>
                    <dd className="writing-feature-detail-value">
                      {post.readTime}
                    </dd>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="writing-feature-detail">
                      <dt className="writing-feature-detail-label">Topics</dt>
                      <dd className="writing-feature-detail-value">
                        <ul className="writing-feature-tag-list">
                          {post.tags.map((tag) => (
                            <li key={tag} className="writing-feature-tag">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </aside>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
