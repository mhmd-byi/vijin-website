import type { Metadata } from "next";
import { PageHeroFrame } from "@/components/fx/PageHeroFrame";
import { Reveal } from "@/components/fx/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Contact VIJIN at ${site.address}. Call ${site.phones[0].display} or email ${site.email}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeroFrame
        eyebrow="Contact us"
        title="Feel free to get in touch"
        image="/images/projects/1000031982.jpg"
        alt="Hotel-style building with dark brown cladding above a glass podium"
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">VIJIN Global Private Limited</h2>
          <address className="mt-6 grid gap-6 not-italic">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">Address</p>
              <p className="mt-1 text-lg">{site.address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">Phone</p>
              <ul className="mt-1 text-lg">
                {site.phones.map((p) => (
                  <li key={p.tel}><a href={`tel:${p.tel}`} className="hover:underline">{p.display}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">Email</p>
              <p className="mt-1 text-lg"><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></p>
            </div>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#1f8f4e] px-6 py-3 font-medium text-white transition hover:brightness-110">
              WhatsApp us
            </a>
            <a href={`tel:${site.phones[0].tel}`} className="rounded-full bg-brand px-6 py-3 font-medium text-white transition hover:bg-brand-deep">
              Call now
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
