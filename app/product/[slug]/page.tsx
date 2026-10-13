import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/fx/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProduct, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.brand === "Enox" ? `Enox ${p.name}` : p.name,
    description: p.intro ? p.intro.slice(0, 155) : `${p.name} from VIJIN's Enox hardware range. Contact us for specifications and the catalogue.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const related = products.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 3);
  const lead = p.applications?.length && p.applications[0].endsWith(":") ? p.applications[0] : null;
  const apps = lead ? p.applications!.slice(1) : p.applications;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-muted">
          <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/products" className="hover:text-ink">Products</Link> / <span className="text-ink">{p.name}</span>
        </nav>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface-strong shadow-lift md:sticky md:top-28 md:self-start">
            {p.image ? (
              <Image src={p.image} alt={p.alt ?? p.name} fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            ) : (
              <div className="flex size-full items-end bg-gradient-to-br from-surface-strong to-surface p-8">
                <span className="font-display text-8xl leading-none text-brand/20">{p.name.slice(0, 2)}</span>
              </div>
            )}
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink">{p.brand} · {p.group}</p>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">{p.name}</h1>
            {p.tagline ? <p className="mt-3 text-lg font-medium text-brand">{p.tagline}</p> : null}
            {p.intro ? (
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">{p.intro}</p>
            ) : (
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                Part of our Enox hardware range. Contact us for specifications, finishes and availability, or browse the catalogues.
              </p>
            )}

            {p.features?.length ? (
              <Reveal className="mt-10">
                <h2 className="mb-4 font-display text-2xl">Key features</h2>
                <ul className="grid gap-3">
                  {p.features.map((f) => (
                    <li key={f.t} className="rounded-2xl bg-white p-4 ring-1 ring-line">
                      <span className="font-semibold text-brand">{f.t}.</span> <span className="text-ink-muted">{f.d}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {apps?.length || lead ? (
              <Reveal className="mt-10">
                <h2 className="mb-4 font-display text-2xl">Applications</h2>
                {lead ? <p className="mb-3 text-ink-muted">{lead}</p> : null}
                {apps && apps.length === 1 && !lead ? (
                  <p className="text-ink-muted">{apps[0]}</p>
                ) : (
                  <ul className="grid gap-2 text-ink-muted">
                    {apps?.map((a) => (
                      <li key={a} className="flex gap-3"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{a}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ) : null}

            {p.specs?.length ? (
              <Reveal className="mt-10">
                <h2 className="mb-4 font-display text-2xl">Specifications</h2>
                <dl className="divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
                  {p.specs.map((s) => (
                    <div key={s.k} className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr]">
                      <dt className="font-semibold">{s.k}</dt>
                      <dd className="text-ink-muted">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            {p.closing ? <p className="mt-8 text-ink-muted">{p.closing}</p> : null}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact-us" className="rounded-full bg-brand px-7 py-3.5 font-medium text-white transition hover:bg-brand-deep">Enquire about this product</Link>
              <Link href="/catalogues" className="rounded-full border border-ink/25 px-7 py-3.5 font-medium transition hover:border-ink">View catalogues</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="mb-10 font-display text-3xl md:text-4xl">Related products</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}><ProductCard product={r} /></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTABand />
    </>
  );
}
