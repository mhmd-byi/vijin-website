import type { Metadata } from "next";
import { privacySections } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How VIJIN GLOBAL PRIVATE LIMITED collects, uses and protects your personal data." };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
      <h1 className="mb-12 font-display text-5xl md:text-6xl">Privacy Policy</h1>
      {privacySections.map((s) => (
        <section key={s.h} className="mb-10">
          <h2 className="mb-3 font-display text-2xl">{s.h}</h2>
          {s.p.map((p, i) => (
            <p key={i} className="mb-3 leading-relaxed text-ink-muted">{p}</p>
          ))}
        </section>
      ))}
      <p className="text-ink-muted">
        Contact: {site.legalName}, {site.address}. {site.phones[0].display}, <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </article>
  );
}
