"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useWebGL } from "@/lib/hooks";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Props = { src: string; alt: string };

/** Static photo first; the WebGL scene fades in over it when supported. */
export function HeroBackdrop({ src, alt }: Props) {
  const reduce = usePrefersReducedMotion();
  const gl = useWebGL();
  const showScene = gl && !reduce;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-surface-strong">
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      {showScene ? (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene src={src} active={visible} onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
