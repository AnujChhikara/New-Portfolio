import { ArrowUp, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, FOOTER_SOCIAL_LINKS } from "~/lib/constants";
import { PixelFooterScene } from "./pixel-footer-scene";

const BUILD_YEAR = new Date().getFullYear();

export function FooterSection() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-inner">
        <div className="footer-panel">
          <div className="footer-cta">
            <p className="footer-eyebrow">Get in touch</p>
            <h2 className="footer-invitation">
              Have something interesting to build?
            </h2>
            <p className="footer-note">
              Always up for a conversation about systems, side projects, or
              something entirely new.
            </p>
            <a
              className="footer-email-button"
              href={`mailto:${SITE_CONFIG.author.email}`}
            >
              {SITE_CONFIG.author.email}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="footer-side">
            <p className="footer-nav-title">Elsewhere</p>
            <ul className="footer-social-list" aria-label="Social links">
              {FOOTER_SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      className="footer-social-link"
                      href={link.url}
                      target={
                        link.url.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        link.url.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <small>
            © {BUILD_YEAR} {SITE_CONFIG.name}
          </small>
          <p className="footer-mischief">Mischief managed.</p>
          <a className="footer-top-link" href="#top">
            Back to top
            <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="footer-scene">
        <PixelFooterScene />
      </div>
    </footer>
  );
}
