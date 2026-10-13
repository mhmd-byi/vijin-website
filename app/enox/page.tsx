import type { Metadata } from "next";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { Reveal } from "@/components/fx/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { ProductCard } from "@/components/ui/ProductCard";
import { enoxGroups, enoxProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Enox Hardware",
  description:
    "Enox door hardware, glass fittings, shower and sliding systems and furniture fittings, supplied by VIJIN in Indore. Specifications on request.",
  alternates: { canonical: "/enox" },
};

export default function EnoxPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="Enox"
        title="Hardware that finishes the job"
        text="Door hardware, glass fittings, shower and sliding systems, and furniture fittings."
        image="/images/products/automatic-sensor-door.jpg"
        alt="Automatic sliding glass doors in a bright lobby"
      />
      <div className="mx-auto max-w-7xl space-y-20 px-5 py-20 md:space-y-28 md:px-8 md:py-28">
        {enoxGroups.map((g) => {
          const items = enoxProducts.filter((p) => p.group === g);
          return (
            <section key={g} aria-labelledby={`g-${g}`}>
              <Reveal>
                <h2 id={`g-${g}`} className="mb-8 font-display text-3xl md:text-5xl">
                  {g} <span className="align-top text-base text-ink-muted">{items.length}</span>
                </h2>
              </Reveal>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <CTABand title="Need Enox specifications?" text="Specifications and finishes are shared on request. Call us or send an enquiry." />
    </>
  );
}
