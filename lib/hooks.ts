"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

function useMedia(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)", false);

let glSupport: boolean | undefined;
function detectWebGL() {
  if (glSupport === undefined) {
    try {
      const c = document.createElement("canvas");
      glSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      glSupport = false;
    }
  }
  return glSupport;
}

export const useWebGL = () => useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
