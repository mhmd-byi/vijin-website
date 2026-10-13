"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getLenis } from "@/components/fx/lenis-instance";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/products" && pathname.startsWith("/product/")));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open ? "bg-background/75 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="VIJIN home" className="relative z-[60] block h-11 w-[80px]" onClick={() => setOpen(false)}>
            <Image src="/images/brand/logo.png" alt="VIJIN" fill sizes="80px" className="object-contain object-left" priority />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.slice(1, -1).map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className="group relative py-2 text-[15px] font-medium text-ink">
                {l.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent-ink transition-transform duration-300 ${
                    isActive(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <Link href="/contact-us" className="rounded-full bg-brand px-5 py-2.5 text-[15px] font-medium text-white transition hover:bg-brand-deep">
              Contact us
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative z-[60] flex size-11 items-center justify-center rounded-full border border-ink/15 bg-background/70 backdrop-blur lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[10px] h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto bg-background lg:hidden"
            initial={{ clipPath: "circle(0px at calc(100% - 42px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 42px) 36px)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 42px) 36px)" }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex min-h-svh flex-col justify-center gap-1 px-6 pb-10 pt-24">
              {nav.map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.25 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`block py-1.5 font-display text-[clamp(2.25rem,11vw,3.5rem)] leading-tight ${isActive(l.href) ? "text-accent-ink" : "text-ink"}`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
