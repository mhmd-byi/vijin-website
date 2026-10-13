"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { HeroBackdrop } from "@/components/fx/HeroBackdrop";
import { SplitText } from "@/components/fx/SplitText";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section ref={ref} className="relative min-h-svh w-full overflow-hidden">
      <HeroBackdrop src="/images/products/zcp-facade.jpg" alt="Modern building facade with dark vertical panels and glass" />
      {/* light scrim only behind the text column, plus a top fade for the header */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent md:via-background/35 md:to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background/70 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-24 pt-32 md:px-8"
        style={reduce ? undefined : { opacity, scale, y }}
      >
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-brand">Indore, Madhya Pradesh</p>
        <h1 className="font-display text-[clamp(2.2rem,8.5vw,7.5rem)] leading-[0.98] tracking-tight text-ink">
          <span className="block"><SplitText text="We are VIJIN" delay={0.1} /></span>
          <span className="block"><SplitText text="We like what we do" delay={0.3} /></span>
          <span className="block text-accent-ink"><SplitText text="with love & passion" delay={0.5} /></span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink-muted md:text-xl">
          Veneers, panel sheets, ACP sheets and related products for architects, builders and designers.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/our-works" className="rounded-full bg-brand px-7 py-3.5 font-medium text-white shadow-soft transition hover:bg-brand-deep">
            Check out our works
          </Link>
          <Link href="/products" className="rounded-full border border-ink/25 bg-background/60 px-7 py-3.5 font-medium text-ink backdrop-blur transition hover:border-ink hover:bg-background">
            Browse products
          </Link>
        </div>
      </motion.div>

      <div aria-hidden className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-muted md:flex">
        Scroll
        <span className="block h-10 w-px origin-top animate-pulse bg-ink/50" />
      </div>
    </section>
  );
}
