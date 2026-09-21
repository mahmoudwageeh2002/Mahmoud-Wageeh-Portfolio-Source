import Link from "next/link";
import { ArrowUpRight, Code2, Mail } from "lucide-react";

import { HeroScene } from "@/components/hero-scene";
import { Reveal } from "@/components/reveal";
import { profile, stats } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="hero-shell">
      <HeroScene />
      <div className="hero-grain" aria-hidden="true" />
      <Reveal className="hero-content">
        <div className="eyebrow-row">
          <span className="status-dot" aria-hidden="true" />
          <span>Software Engineer · Cairo, Egypt</span>
        </div>
        <h1 className="hero-title">
          Mobile precision.<br /><em>Web scale.</em>
        </h1>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" /> Let&apos;s talk
          </a>
          <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">
            <Code2 aria-hidden="true" /> GitHub
            <ArrowUpRight className="button-arrow" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
      <Reveal className="hero-note" delay={0.25}>
        <span className="mono-label">Current focus</span>
        <p>Cross-platform products, resilient service architecture, and performance work users can feel.</p>
        <Link href="/projects" className="text-link">
          Explore selected work <ArrowUpRight aria-hidden="true" />
        </Link>
      </Reveal>
      <Reveal className="hero-stats" delay={0.4}>
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong><span>{stat.label}</span>
          </div>
        ))}
      </Reveal>
    </main>
  );
}
