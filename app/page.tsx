import type { Metadata } from "next";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal } from "@/components/fx/Reveal";
import { ScrollWords } from "@/components/fx/ScrollWords";
import { Tilt } from "@/components/fx/Tilt";
import { Hero } from "@/components/home/Hero";
import { HorizontalRail } from "@/components/home/HorizontalRail";
import { StackCards } from "@/components/home/StackCards";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABand } from "@/components/ui/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeRail, homeStack, pillars } from "@/lib/data";
import { stats } from "@/lib/site";

const marqueeItems = [
  "ACP Sheets",
  "HPL Sheets",
  "WPC & PVC Foam Sheets",
  "Door Skins",
  "Partition Panels",
  "WPC Louvers",
  "GI Louvers",
  "Copper Sheets",
  "ZCP Sheets",
  "Aluminium Windows",
  "Enox Hardware",
];

const statement =
  "At VIJIN, we are dedicated to providing high-quality materials for modern construction and design. Our products are designed for strength, weather resistance, and versatility, making them ideal for various applications, from facades to furniture.";

export const metadata: Metadata = {
  title: { absolute: "VIJIN | Veneers, ACP & Panel Sheets in Indore" },
  description:
    "VIJIN, Indore: WPC and PVC foam sheets, ACP, HPL, door skins, partition panels, louvers, copper and zinc sheets, aluminium windows and Enox hardware.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-label="What we supply" className="border-y border-line bg-surface py-6 font-display text-2xl text-brand md:text-4xl">
        <Marquee items={marqueeItems} />
      </section>

      <section className="mx-auto max-w-5xl px-5 py-28 md:px-8 md:py-44">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.22em] text-accent-ink">Who we are</p>
        <ScrollWords text={statement} className="font-display text-3xl leading-[1.25] md:text-5xl" />
      </section>

      <HorizontalRail items={homeRail} />

      <section className="pb-24 pt-28 md:pt-40">
        <div className="mx-auto mb-14 max-w-7xl px-5 md:mb-20 md:px-8">
          <SectionHeading eyebrow="Featured" title="Materials with a finish for every elevation" />
        </div>
        <StackCards items={homeStack} />
      </section>

      <section className="bg-surface py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Why choose our products" title="Built to last. Made to look right." className="mb-14" />
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="h-full">
                <Tilt className="rounded-3xl">
                  <div className="flex h-full flex-col gap-4 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line md:p-10">
                    <span className="font-display text-6xl text-accent">0{i + 1}</span>
                    <h3 className="font-display text-3xl">{p.title}</h3>
                    <p className="text-ink-muted">{p.text}</p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                      {p.points.map((pt) => (
                        <li key={pt} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-brand">{pt}</li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <div className="mt-20 md:mt-28">
            <Stats stats={stats} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Testimonials" title="Words from the people we build with" className="mb-14" />
        <Testimonials />
      </section>

      <CTABand />
    </>
  );
}
