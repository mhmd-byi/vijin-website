import { MagneticLink } from "@/components/fx/MagneticLink";
import { SplitText } from "@/components/fx/SplitText";
import { site } from "@/lib/site";

type Props = { title?: string; text?: string };

export function CTABand({
  title = "Ready to start your project?",
  text = "Call us or visit our catalogues, choose your product and enquire with us.",
}: Props) {
  return (
    <section className="px-5 pb-20 pt-8 md:px-8 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-deep px-6 py-16 text-center text-white md:px-16 md:py-24">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Enquire</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight md:text-6xl">
          <SplitText text={title} inView />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">{text}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <MagneticLink href="/contact-us" className="inline-block rounded-full bg-accent px-9 py-4 text-lg font-semibold text-brand-deep transition hover:bg-white">
            Send an enquiry
          </MagneticLink>
          <a href={`tel:${site.phones[0].tel}`} className="rounded-full border border-white/30 px-7 py-4 font-medium transition hover:border-white">
            Call {site.phones[0].display}
          </a>
        </div>
      </div>
    </section>
  );
}
