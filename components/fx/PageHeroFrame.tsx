"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type Props = { eyebrow: string; title: string; text?: string; image: string; alt: string };

export function PageHeroFrame({ eyebrow, title, text, image, alt }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.8], [0, -90]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-[78svh] min-h-[480px] w-full overflow-hidden bg-surface-strong">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale, y: imgY }}>
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-brand-deep/85 via-brand-deep/40 to-transparent" />
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-5 pb-12 text-white md:px-8 md:pb-16"
        style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
        <h1 className="max-w-4xl font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">{title}</h1>
        {text ? <p className="mt-5 max-w-2xl text-lg text-white/85">{text}</p> : null}
      </motion.div>
    </section>
  );
}
