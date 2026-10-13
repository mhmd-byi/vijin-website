import type { Metadata } from "next";
import { ParallaxImage } from "@/components/fx/ParallaxImage";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { Reveal } from "@/components/fx/Reveal";
import { Tilt } from "@/components/fx/Tilt";
import { CTABand } from "@/components/ui/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process, whyChoose } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "VIJIN provides high-quality materials for modern construction and design: WPC and PVC foam sheets, ACP, louvers and more.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="About"
        title="Hello and welcome to VIJIN"
        image="/images/projects/423.jpg"
        alt="Grey composite-panel building with a long ribbon window"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-8 md:py-36">
        <div className="space-y-6 text-lg leading-relaxed text-ink-muted">
          <Reveal>
            <p>
              Welcome to VIJIN, your trusted partner in providing high-quality materials for modern construction and design. We specialize in WPC (Wood Plastic Composite) and PVC foam sheets, ACP (Aluminium Composite Panels), WPC louvers, and GI (Galvanized Iron) louvers. Our diverse product range is designed to meet the demands of architects, builders, and designers seeking durability, sustainability, and aesthetic appeal.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Our WPC and PVC foam sheets offer excellent strength-to-weight ratios, water resistance, and eco-friendly properties, making them ideal for a variety of applications, from facades to furniture. We also supply top-tier ACP sheets, known for their superior weather resistance, lightweight nature, and ability to create sleek, modern finishes for both interior and exterior spaces.
            </p>
          </Reveal>
          <Reveal>
            <p>
              In addition, we offer WPC and GI louvers that provide practical solutions for ventilation, privacy, and shade while enhancing the overall look of any structure. Our WPC louvers bring natural elegance with the added benefits of low maintenance and high durability, while our GI louvers offer exceptional strength and corrosion resistance, making them perfect for industrial and commercial settings.
            </p>
          </Reveal>
          <Reveal>
            <p>
              At VIJIN, we are committed to providing products that combine innovation, quality, and sustainability. With our experienced team and dedication to customer satisfaction, we ensure timely delivery, personalized service, and expert guidance to help you select the best materials for your project.
            </p>
          </Reveal>
          <Reveal>
            <p className="font-medium text-ink">
              Partner with us for your next construction or design project, and experience the reliability and excellence that sets us apart in the industry.
            </p>
          </Reveal>
        </div>
        <ParallaxImage
          src="/images/projects/1000381753.jpg"
          alt="Residential facade with lotus-motif panels and brick-look cladding"
          sizes="(min-width:768px) 40vw, 100vw"
          className="aspect-[4/5] rounded-[2rem] shadow-lift md:sticky md:top-28 md:self-start"
        />
      </section>

      <section className="bg-surface py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Working process" title="Vijin's working process" className="mb-14" />
          <ol className="grid gap-6 md:grid-cols-3">
            {process.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.1} className="h-full">
                  <Tilt className="rounded-3xl">
                    <div className="h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line">
                      <span className="font-display text-6xl text-accent">0{i + 1}</span>
                      <h3 className="mt-3 font-display text-3xl">{s.title}</h3>
                      <p className="mt-3 text-ink-muted">{s.text}</p>
                    </div>
                  </Tilt>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <SectionHeading eyebrow="Why choose our products" title="Why choose our products" className="mb-14" />
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {[
            ...whyChoose,
            { title: "Exceptional Customer Service", text: "Our dedicated support team ensures a seamless buying experience from start to finish." },
            { title: "Wide Range of Options", text: "We cater to diverse needs and preferences with an extensive product lineup." },
            { title: "Innovation-Driven", text: "Our products incorporate the latest technology to meet evolving customer demands." },
            { title: "Positive Brand Reputation", text: "Backed by strong reviews and a loyal customer base, we are a name you can trust." },
          ].map((w, i) => (
            <li key={w.title}>
              <Reveal delay={(i % 2) * 0.08} className="flex gap-4 border-t border-line pt-6">
                <span className="mt-1 size-2.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <div>
                  <h3 className="font-display text-2xl">{w.title}</h3>
                  <p className="mt-1 text-ink-muted">{w.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CTABand />
    </>
  );
}
