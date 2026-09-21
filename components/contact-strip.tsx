import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";

export function ContactStrip() {
  return (
    <section className="contact-strip">
      <h2>Have a product worth making faster?</h2>
      <a className="button" href={`mailto:${profile.email}`}>Start a conversation <ArrowUpRight aria-hidden="true" /></a>
    </section>
  );
}
