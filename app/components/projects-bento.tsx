import type { ReactElement } from "react";
import { useState, useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "~/lib/constants";

function DgDoodle() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M27 19 Q25 18 28 17.5 L54 17.5 Q57 17.5 57.5 20 L57 29 Q57 31.5 54 31.5 L28 31 Q25 31 25.5 28.5 Z" />
        <path d="M86 19 Q84 18 87 17.5 L113 17.5 Q116 17.5 116.5 20 L116 29 Q116 31.5 113 31.5 L87 31 Q84 31 84.5 28.5 Z" />
        <path d="M145 19 Q143 18 146 17.5 L172 17.5 Q175 17.5 175.5 20 L175 29 Q175 31.5 172 31.5 L146 31 Q143 31 143.5 28.5 Z" />
        <path d="M41 31 Q40.5 50 41.5 70 Q42 90 41 112" strokeDasharray="2 4" />
        <path
          d="M100 31 Q99.5 50 100.5 70 Q101 90 100 112"
          strokeDasharray="2 4"
        />
        <path
          d="M159 31 Q158.5 50 159.5 70 Q160 90 159 112"
          strokeDasharray="2 4"
        />
        <path d="M41 46 C68 44 86 44 100 46" />
        <path d="M94 42 L100 46 L94 50" />
        <path d="M100 62 C126 60 144 60 159 62" />
        <path d="M153 58 L159 62 L153 66" />
        <path d="M159 78 C133 80 115 80 100 78" />
        <path d="M106 74 L100 78 L106 82" />
        <path d="M100 96 C74 98 56 98 41 96" />
        <path d="M47 92 L41 96 L47 100" />
      </g>
    </svg>
  );
}

function RunloomDoodle() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M42 26 Q35 25 36 32 L35 98 Q34 106 42 106 L158 105 Q166 106 165 98 L166 32 Q166 25 158 26 Z" />
        <path d="M36 42 Q80 41 120 42.5 Q145 43 165 42" />
        <circle cx="46" cy="33" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="54" cy="33" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="62" cy="33" r="2.2" fill="currentColor" stroke="none" />
        <path d="M48 58 L56 62 L48 66" />
        <path d="M64 62 Q80 61.5 98 62" />
        <path d="M46 76 Q80 75.5 124 76" />
        <path d="M46 88 Q75 87.5 108 88" />
        <path d="M46 100 Q65 99.5 86 100" />
      </g>
    </svg>
  );
}

function ImpactPlayerDoodle() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M36 108 Q90 107.5 166 108" />
        <path d="M36 108 Q35.5 70 36 28" />
        <path d="M40 92 C58 86 72 74 90 66 S120 50 138 44 S152 40 162 36" />
        <circle cx="40" cy="92" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="90" cy="66" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="138" cy="44" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="162" cy="36" r="2.5" fill="currentColor" stroke="none" />
        <path d="M60 108 Q60 110 60 112" />
        <path d="M90 108 Q90 110 90 112" />
        <path d="M120 108 Q120 110 120 112" />
        <path d="M150 108 Q150 110 150 112" />
      </g>
    </svg>
  );
}

function ExtensionhubDoodle() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M38 28 Q31 27 32 34 L31 98 Q30 106 38 106 L162 105 Q170 106 169 98 L170 34 Q170 27 162 28 Z" />
        <path d="M32 44 Q80 43 120 44.5 Q150 45 169 44" />
        <circle cx="42" cy="35" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="50" cy="35" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="58" cy="35" r="2.2" fill="currentColor" stroke="none" />
        <path d="M70 31 Q68 30 70 30 L144 30 Q148 30 148 33 L148 37 Q148 40 144 40 L70 40 Q66 40 66 37 L66 33 Q66 30 70 31 Z" />
        <path d="M90 60 h8 a4 4 0 0 1 4 -4 v-4 h8 v4 a4 4 0 0 1 4 4 h8 v24 h-8 a4 4 0 0 1 -4 4 v4 h-8 v-4 a4 4 0 0 1 -4 -4 h-8 z" />
      </g>
    </svg>
  );
}

const PROJECT_VISUALS: Record<
  string,
  { tone: string; Doodle: () => ReactElement }
> = {
  dg: { tone: "mint-blue", Doodle: DgDoodle },
  Runloom: { tone: "butter-lavender", Doodle: RunloomDoodle },
  "Impact Player": { tone: "peach-rose", Doodle: ImpactPlayerDoodle },
  Extensionhub: { tone: "lilac-sky", Doodle: ExtensionhubDoodle },
};

function ProjectCard({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = useId();
  const visual = PROJECT_VISUALS[project.title];
  const Doodle = visual?.Doodle ?? (() => null);
  const hasTech = project.tech.length > 0;

  return (
    <li className="project-card">
      <div className="project-card-surface">
        <div
          className={`project-illustration project-illustration--${visual?.tone}`}
        >
          <Doodle />
          <h3 className="project-card-title">{project.title}</h3>
        </div>
        <div className="project-card-body">
          <p className="project-card-description">{project.description}</p>
          <div className="project-card-actions">
            <button
              type="button"
              className="project-card-button project-card-button--secondary"
              aria-expanded={detailsOpen}
              aria-controls={detailsId}
              onClick={() => setDetailsOpen((value) => !value)}
            >
              Details
            </button>
            <a
              className="project-card-button project-card-button--primary"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Try ${project.title} live`}
            >
              Try it live
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div
            id={detailsId}
            className="project-card-details"
            hidden={!detailsOpen}
          >
            {hasTech ? (
              <ul
                className="project-card-tech-list"
                aria-label={`${project.title} tech stack`}
              >
                {project.tech.map((item) => (
                  <li key={item} className="project-card-tech">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="project-card-details-note">
                No separate tech stack or capabilities are listed; the
                description above covers what this project does.
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProjectsBento() {
  return (
    <section
      className="portfolio-section projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="projects-heading">
        <h2 id="projects-heading" className="portfolio-section-title">
          Projects
        </h2>
      </div>
      <ul className="project-card-grid" aria-label="Projects">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </ul>
    </section>
  );
}
