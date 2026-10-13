import { site } from "@/lib/site";

const base =
  "flex size-12 items-center justify-center rounded-full shadow-lift transition hover:scale-105 focus-visible:scale-105";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 md:right-6">
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with VIJIN on WhatsApp"
        className={`${base} bg-[#1f8f4e] text-white`}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
          <path d="M12 3C7 3 3 6.6 3 11c0 2 .8 3.8 2.2 5.2L4 21l4.5-1.4c1 .3 2.3.4 3.5.4 5 0 9-3.6 9-8s-4-9-9-9Z" />
        </svg>
      </a>
      <a href={`tel:${site.phones[0].tel}`} aria-label={`Call VIJIN on ${site.phones[0].display}`} className={`${base} bg-brand text-white`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
          <path d="M6.600 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200c.3-.3.700-.4 1-.2 1.100.4 2.300.6 3.600.6.600 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.400-1 1-1h3.500c.6 0 1 .4 1 1 0 1.300.2 2.500.6 3.600.1.300 0 .7-.2 1l-2.300 2.200Z" />
        </svg>
      </a>
    </div>
  );
}
