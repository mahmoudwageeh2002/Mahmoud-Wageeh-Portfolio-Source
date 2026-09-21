import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { ContactStrip } from "@/components/contact-strip";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected mobile and web products built and optimized by Mahmoud Wageeh.",
};

export default function ProjectsPage() {
  return (
    <PageShell kicker="02 / Projects" title="Selected systems." description="Cross-platform products where architecture, performance, and user experience had to work together—not as separate concerns.">
      <Reveal>
        <div className="section-label"><span>Production work</span><span>{projects.length} selected</span></div>
        <section className="projects-grid" aria-label="Selected projects">
          {projects.map((project) => (
            <article className="project-card" key={project.title} style={{ "--project-accent": project.accent } as CSSProperties}>
              <div className="project-topline"><span>{project.index} · {project.type}</span><span>{project.year}</span></div>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
              <footer className="project-footer">
                <div className="project-tags">{project.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div>
                {project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a className="project-link" href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} <ArrowUpRight aria-hidden="true" /></a>
                    ))}
                  </div>
                )}
              </footer>
            </article>
          ))}
        </section>
      </Reveal>
      <ContactStrip />
    </PageShell>
  );
}
