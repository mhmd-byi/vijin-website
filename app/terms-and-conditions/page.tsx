import type { Metadata } from "next";
import { termsParagraphs } from "@/lib/legal";

export const metadata: Metadata = { title: "Terms & Conditions", description: "Terms of Use for the VIJIN website." };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
      <h1 className="mb-12 font-display text-5xl md:text-6xl">Terms &amp; Conditions</h1>
      {termsParagraphs.map((p, i) => (
        <p key={i} className="mb-4 leading-relaxed text-ink-muted">{p}</p>
      ))}
    </article>
  );
}
