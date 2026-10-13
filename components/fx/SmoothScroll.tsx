"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { setLenis } from "./lenis-instance";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true });
    setLenis(lenis);

    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
