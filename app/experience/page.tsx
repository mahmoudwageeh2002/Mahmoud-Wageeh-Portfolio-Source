import type { Metadata } from "next";

import { ContactStrip } from "@/components/contact-strip";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { experiences, skillGroups } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Experience",
  description: "Mahmoud Wageeh's engineering experience, impact, education, and technical toolkit.",
};

export default function ExperiencePage() {
  return (
    <PageShell kicker="01 / Experience" title="Built in production." description="Two years of turning ambitious product requirements into reliable interfaces, scalable service integrations, and measurable performance gains.">
      <Reveal>
        <div className="section-label"><span>Journey</span><span>{experiences.length} roles</span></div>
        <section className="timeline" aria-label="Work experience">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.company}>
              <div>
                <span className="experience-period">{experience.period}</span>
                <h2 className="experience-role">{experience.role}</h2>
                <p className="experience-company">{experience.company}</p>
              </div>
              <div className="experience-copy">
                <h3>{experience.project}</h3>
                <ul className="impact-list">
                  {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="section-label"><span>Toolkit</span><span>Always evolving</span></div>
        <section className="skills-grid" aria-label="Technical skills">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-pills">{group.skills.map((skill) => <span className="pill" key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="section-label"><span>Education</span><span>Foundation</span></div>
        <section className="education-row">
          <div><h3>Cairo University</h3><p>B.S. in Computer Science · Faculty of Science</p></div>
          <span className="education-year">2020 — 2024</span>
        </section>
      </Reveal>
      <ContactStrip />
    </PageShell>
  );
}
