import { Reveal } from "@/components/fx/Reveal";
import { Tilt } from "@/components/fx/Tilt";
import { testimonials } from "@/lib/data";

const spans = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];

export function Testimonials() {
  return (
    <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-12">
      {testimonials.map((t, i) => (
        <li key={t.name} className={`w-[85%] shrink-0 snap-center md:w-auto ${spans[i]}`}>
          <Reveal className="h-full" delay={(i % 3) * 0.08}>
            <Tilt className="rounded-3xl">
              <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line">
                <blockquote className="text-[16px] leading-relaxed text-ink">
                  <span aria-hidden className="mb-2 block font-display text-5xl leading-none text-accent">“</span>
                  {t.text}
                </blockquote>
                <figcaption className="text-sm font-semibold text-brand">{t.name}</figcaption>
              </figure>
            </Tilt>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
