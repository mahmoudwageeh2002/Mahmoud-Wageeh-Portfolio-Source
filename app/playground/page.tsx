import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { Playground } from "@/components/playground";

export const metadata: Metadata = {
  title: "Playground",
  description: "Interactive frontend experiments inspired by Mahmoud Wageeh's production engineering work.",
};

export default function PlaygroundPage() {
  return (
    <PageShell kicker="03 / Playground" title="Ideas in motion." description="Small interactive studies drawn from real engineering problems: provider normalization, performance budgets, cross-platform surfaces, and complex permissions.">
      <Playground />
    </PageShell>
  );
}
