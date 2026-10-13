import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1.2fr] md:px-8">
        <div>
          <div className="relative mb-6 h-14 w-28">
            <Image src="/images/brand/logo-white.png" alt="VIJIN" fill sizes="112px" className="object-contain object-left" />
          </div>
          <p className="max-w-md text-[15px] leading-relaxed">
            At VIJIN, we are dedicated to providing high-quality materials for modern construction and design, for architects, builders, and designers seeking durable, sustainable, and aesthetically appealing solutions.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Explore</h2>
          <ul className="grid gap-2 text-[15px]">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact us</h2>
          <p className="mb-3 text-[15px] leading-relaxed">{site.address}</p>
          <ul className="grid gap-1.5 text-[15px]">
            {site.phones.map((p) => (
              <li key={p.tel}><a href={`tel:${p.tel}`} className="transition hover:text-white">{p.display}</a></li>
            ))}
            <li><a href={`mailto:${site.email}`} className="transition hover:text-white">{site.email}</a></li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-white/60 md:px-8">
          <p>© {site.legalName}</p>
          <p className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
