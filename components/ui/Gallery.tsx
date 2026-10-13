"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLenis } from "@/components/fx/lenis-instance";
import { workCategories, works } from "@/lib/data";

const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-[3/5]", "aspect-[5/4]"];
const filters = ["All", ...workCategories] as const;

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();

  const shown = works.filter((w) => filter === "All" || w.category === filter);

  const open = (i: number) => {
    setCurrent(i);
    dialog.current?.showModal();
    getLenis()?.stop();
  };
  const close = useCallback(() => {
    dialog.current?.close();
  }, []);
  const step = useCallback(
    (d: number) => setCurrent((c) => (c === null ? c : (c + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setCurrent(null);
      getLenis()?.start();
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  const item = current === null ? null : shown[current];

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === f ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((w, i) => (
            <motion.li
              key={w.src}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="mb-3 break-inside-avoid md:mb-5"
            >
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`View larger: ${w.alt}`}
                className={`group relative block w-full overflow-hidden rounded-2xl bg-surface-strong shadow-soft ${ratios[i % ratios.length]}`}
              >
                <Image src={w.src} alt={w.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-deep/80 to-transparent px-3 pb-3 pt-10 text-left text-xs font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  {w.category}
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Project photo"
        data-lenis-prevent
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {item ? (
          <div className="relative size-full" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="pointer-events-none object-contain p-4 pb-20 md:p-12 md:pb-24" />
            <p className="absolute inset-x-0 bottom-6 px-16 text-center text-sm text-white/85">
              {item.alt} <span className="text-white/50">· {item.category}</span>
            </p>
            <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur hover:bg-white/25">
              ×
            </button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur hover:bg-white/25">
              ←
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur hover:bg-white/25">
              →
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
