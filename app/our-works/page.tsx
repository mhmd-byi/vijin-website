import type { Metadata } from "next";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { CTABand } from "@/components/ui/CTABand";
import { Gallery } from "@/components/ui/Gallery";

export const metadata: Metadata = {
  title: "Our Works",
  description: "Facades, gates, interiors and signage completed with VIJIN materials.",
};

export default function OurWorksPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="Our works"
        title="To imagine your future, take a look at our past"
        image="/images/projects/585.jpg"
        alt="Entrance facade with vertical fins and glass"
      />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Gallery />
      </section>
      <CTABand />
    </>
  );
}
