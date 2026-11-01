import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, QUICK_LINKS } from "~/lib/constants";

const BUILD_YEAR = new Date().getFullYear();

export function FooterSection() {
  const source = QUICK_LINKS.find((link) => link.name === "Source Code");

  return (
    <footer className="portfolio-footer">
      <div className="footer-panel">
        <div className="footer-contact">
          <p className="footer-invitation">
            Have something interesting to build?
          </p>
          <a
            className="footer-email"
            href={`mailto:${SITE_CONFIG.author.email}`}
          >
            {SITE_CONFIG.author.email}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        {source && (
          <div className="footer-source">
            <a
              className="footer-source-link"
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <small>
          © {BUILD_YEAR} {SITE_CONFIG.name}
        </small>
      </div>
    </footer>
  );
}
