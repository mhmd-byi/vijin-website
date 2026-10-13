import type { Metadata } from "next";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { Reveal } from "@/components/fx/Reveal";
import { Tilt } from "@/components/fx/Tilt";
import { CTABand } from "@/components/ui/CTABand";
import { dealers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Dealers & Distributors",
  description: "Find VIJIN dealers and distributors across Madhya Pradesh.",
};

export default function DealersPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="Dealers & distributors"
        title="Find us across Madhya Pradesh"
        image="/images/projects/652.jpg"
        alt="Hospital building with brown panels and blue glass"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dealers.map((d, i) => (
            <li key={d.name}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <Tilt className="rounded-3xl" max={4}>
                  <div className="flex h-full flex-col gap-3 rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">{d.city}</p>
                    <h2 className="font-display text-2xl leading-snug">{d.name}</h2>
                    <p className="text-[15px] text-ink-muted">{d.address}</p>
                    <a href={`tel:${d.phone.replace(/\D/g, "").replace(/^0/, "")}`} className="mt-auto pt-2 font-medium text-brand underline-offset-4 hover:underline">
                      {d.phone}
                    </a>
                  </div>
                </Tilt>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <CTABand title="Want to become a dealer?" text="Get in touch and we will share the details." />
    </>
  );
}
