"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  /** Words (case-insensitive, punctuation ignored) rendered dimmed. */
  dim?: string[];
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

const clean = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

export function SplitText({ text, className, dim = [], inView = false, delay = 0, stagger = 0.06, as = "span" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  const dimSet = new Set(dim.map(clean));
  const trigger = inView
    ? { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" as const };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
          <motion.span
            className={`inline-block ${dimSet.has(clean(w)) ? "opacity-45" : ""}`}
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
