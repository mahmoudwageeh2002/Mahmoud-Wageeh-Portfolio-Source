import { Reveal } from "@/components/reveal";

export function PageShell({ kicker, title, description, children }: { kicker: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="page-shell">
      <div className="page-container">
        <Reveal className="page-heading">
          <div><p className="page-kicker">{kicker}</p><h1 className="page-title">{title}</h1></div>
          <p className="page-description">{description}</p>
        </Reveal>
        {children}
      </div>
    </main>
  );
}
