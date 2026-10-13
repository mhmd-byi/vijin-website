"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { homeStack } from "@/lib/data";

type Item = (typeof homeStack)[number];

export function StackCards({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative mx-auto max-w-7xl px-5 md:px-8">
      {items.map((item, i) => (
        <StackCard key={item.title} item={item} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function StackCard({ item, index, total, progress }: { item: Item; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const last = index === total - 1;
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, 0.92]);
  const dim = useTransform(progress, [start, end], [0, 0.28]);
  const flip = index % 2 === 1;

  return (
    <div className="sticky h-[88svh] pb-6 md:h-[92svh]" style={{ top: `calc(5.5rem + ${index * 14}px)` }}>
      <motion.article
        style={reduce || last ? undefined : { scale, transformOrigin: "50% 0%" }}
        className={`relative grid h-[calc(100%-4rem)] min-h-[420px] overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-line md:grid-cols-2 ${flip ? "md:[&>div:first-child]:order-2" : ""}`}
      >
        <div className="relative min-h-[40%] bg-surface-strong">
          <Image src={item.image} alt={item.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-7 md:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-ink">0{index + 1} / 0{total}</p>
          <h3 className="font-display text-3xl md:text-5xl">{item.title}</h3>
          <p className="max-w-md text-ink-muted md:text-lg">{item.text}</p>
          <Link href={item.href} className="mt-2 w-fit rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-deep">
            View product
          </Link>
        </div>
        {!reduce && !last ? <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-deep" style={{ opacity: dim }} /> : null}
      </motion.article>
    </div>
  );
}
