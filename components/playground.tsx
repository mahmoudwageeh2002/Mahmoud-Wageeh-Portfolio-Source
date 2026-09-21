"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roles = ["Student", "Teacher", "Parent", "Admin", "Owner", "Reviewer", "Support", "Super Admin"];

function Card({ title, label, description, children }: { title: string; label: string; description: string; children: React.ReactNode }) {
  return (
    <article className="experiment-card">
      <div className="experiment-preview">{children}</div>
      <div className="experiment-copy"><span className="mono-label">{label}</span><h3>{title}</h3><p>{description}</p></div>
    </article>
  );
}

export function Playground() {
  return (
    <Tabs defaultValue="architecture" className="playground-tabs">
      <TabsList aria-label="Playground categories">
        <TabsTrigger value="architecture">Architecture</TabsTrigger>
        <TabsTrigger value="interfaces">Interfaces</TabsTrigger>
      </TabsList>
      <TabsContent value="architecture">
        <div className="experiments-grid">
          <Card title="Provider Adapter" label="Design pattern" description="Different provider payloads converge into one stable contract, keeping the product surface independent from vendor changes.">
            <div className="adapter-demo" aria-label="Provider adapter flow"><span className="adapter-node">Nazeel</span><span className="adapter-line" /><span className="adapter-node active">Adapter</span><span className="adapter-line" /><span className="adapter-node">UI</span></div>
          </Card>
          <Card title="Performance Pulse" label="Profiling" description="A compact view of the measurable performance improvements delivered across recent products.">
            <div className="metric-demo" aria-label="Performance improvement bars">
              <span className="metric-bar" style={{ "--bar-height": "7rem" } as React.CSSProperties}>37% Startup</span>
              <span className="metric-bar" style={{ "--bar-height": "8.2rem" } as React.CSSProperties}>40% Runtime</span>
              <span className="metric-bar" style={{ "--bar-height": "10rem" } as React.CSSProperties}>50% Bundle</span>
            </div>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="interfaces">
        <div className="experiments-grid">
          <Card title="One Surface, Three Platforms" label="Cross-platform" description="A shared component language that respects platform behavior across iOS, Android, and the web.">
            <div className="platform-demo" aria-label="Three abstract device interfaces"><span className="device-card" /><span className="device-card" /><span className="device-card" /></div>
          </Card>
          <Card title="Role Matrix" label="Access control" description="Eight user roles presented through one consistent, accessible interaction system. Hover or focus each role.">
            <div className="role-demo">{roles.map((role) => <span className="role-chip" tabIndex={0} key={role}>{role}</span>)}</div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
