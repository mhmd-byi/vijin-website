import type { Metadata } from "next";
import Image from "next/image";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { Reveal } from "@/components/fx/Reveal";
import { Tilt } from "@/components/fx/Tilt";
import { CTABand } from "@/components/ui/CTABand";
import { catalogues } from "@/lib/data";

export const metadata: Metadata = {
  title: "Catalogues",
  description: "Download VIJIN and Viva catalogues: ACP, HPL, louvers, signage and more.",
};

export default function CataloguesPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="Catalogues"
        title="Choose your finish, then enquire"
        text={`${catalogues.length} downloadable catalogues.`}
        image="/images/projects/589.jpg"
        alt="Wood-finish canopy and louvers on a corner building"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
          {catalogues.map((c, i) => (
            <li key={c.pdf}>
              <Reveal delay={(i % 5) * 0.05} className="h-full">
                <Tilt className="rounded-2xl">
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-line"
                  >
                    <div className="relative aspect-[4/5] bg-surface-strong">
                      <Image src={c.cover} alt={`${c.title} catalogue cover`} fill sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <h2 className="font-display text-lg leading-snug">{c.title}</h2>
                      <span className="mt-auto text-sm font-medium text-accent-ink">Download PDF ↗</span>
                    </div>
                  </a>
                </Tilt>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <CTABand />
    </>
  );
}
