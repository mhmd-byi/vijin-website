"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { homeRail } from "@/lib/data";

type Item = (typeof homeRail)[number];

export function HorizontalRail({ items }: { items: Item[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (reduce) {
    return (
      <section aria-labelledby="rail-title" className="py-20">
        <h2 id="rail-title" className="sr-only">Our core materials</h2>
        <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto px-5 pb-6 md:px-8">
          {items.map((it) => (
            <RailCard key={it.title} item={it} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} aria-labelledby="rail-title" style={{ height: `calc(${distance}px + 100svh)` }} className="relative min-h-[300svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 w-full max-w-7xl px-5 md:mb-10 md:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent-ink">Core materials</p>
          <h2 id="rail-title" className="font-display text-4xl md:text-6xl">Scroll through what we supply</h2>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 pr-[10vw] md:gap-10 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {items.map((it) => (
            <RailCard key={it.title} item={it} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RailCard({ item }: { item: Item }) {
  return (
    <div className="w-[76vw] shrink-0 snap-center [perspective:1100px] sm:w-[52vw] lg:w-[34vw] xl:w-[28vw]">
      <Link
        href={item.href}
        className="group block overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(-14deg)_rotateX(2deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] focus-visible:[transform:rotateY(0deg)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-strong">
          <Image src={item.image} alt={item.alt} fill sizes="(min-width:1280px) 28vw, (min-width:1024px) 34vw, (min-width:640px) 52vw, 76vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <h3 className="font-display text-2xl">{item.title}</h3>
          <p className="mt-2 line-clamp-3 text-[15px] text-ink-muted">{item.text}</p>
          <span className="mt-4 inline-block text-sm font-medium text-accent-ink">Learn more →</span>
        </div>
      </Link>
    </div>
  );
}
