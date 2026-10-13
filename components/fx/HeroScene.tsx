"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec2 uRes;
  uniform float uImgAspect;
  uniform vec2 uRipplePos;
  uniform float uRippleAge;

  void main() {
    // "object-fit: cover" with a little headroom for the parallax shift
    float screenAspect = uRes.x / uRes.y;
    vec2 uv = vUv - 0.5;
    if (screenAspect > uImgAspect) uv.y *= uImgAspect / screenAspect;
    else uv.x *= screenAspect / uImgAspect;
    uv *= 0.94;
    uv += uPointer * 0.025;

    // gentle shimmer
    uv += 0.0016 * vec2(
      sin(uv.y * 14.0 + uTime * 0.9),
      cos(uv.x * 12.0 + uTime * 0.7)
    );

    // ripple at the cursor
    vec2 rp = vUv - uRipplePos;
    rp.x *= screenAspect;
    float d = length(rp);
    float front = uRippleAge * 0.55;
    float ring = exp(-pow((d - front) * 9.0, 2.0)) * exp(-uRippleAge * 1.6);
    uv += normalize(rp + 1e-5) * ring * 0.012;

    vec3 col = texture2D(uMap, uv + 0.5).rgb;

    // soft moving highlight
    float sweep = smoothstep(0.0, 1.0, sin(vUv.x * 2.4 - vUv.y * 1.2 + uTime * 0.35) * 0.5 + 0.5);
    col += sweep * 0.018;
    col += ring * 0.05;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const makeUniforms = () => ({
  uMap: { value: null as THREE.Texture | null },
  uTime: { value: 0 },
  uPointer: { value: new THREE.Vector2(0, 0) },
  uRes: { value: new THREE.Vector2(1, 1) },
  uImgAspect: { value: 1.5 },
  uRipplePos: { value: new THREE.Vector2(0.5, 0.5) },
  uRippleAge: { value: 10 },
});

type Props = { src: string; active: boolean; onReady: () => void };

function Plane({ src, onReady, pointer }: { src: string; onReady: () => void; pointer: React.RefObject<{ x: number; y: number; moved: boolean }> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const [initialUniforms] = useState(makeUniforms);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const frames = useRef(0);
  const ready = useRef(false);
  const smooth = useRef(new THREE.Vector2());
  const lastRipple = useRef({ t: -10, x: 0, y: 0 });

  useEffect(() => {
    let cancelled = false;
    new THREE.TextureLoader().load(src, (t) => {
      if (cancelled) {
        t.dispose();
        return;
      }
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      setTexture(t);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => () => texture?.dispose(), [texture]);

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m || !texture) return;
    const u = m.uniforms;
    if (u.uMap.value !== texture) {
      u.uMap.value = texture;
      const img = texture.image as { width: number; height: number };
      u.uImgAspect.value = img.width / img.height;
    }
    const t = state.clock.elapsedTime;
    u.uTime.value = t;
    u.uRes.value.set(state.size.width, state.size.height);

    const p = pointer.current;
    smooth.current.lerp(new THREE.Vector2(p.x, p.y), 1 - Math.pow(0.001, delta));
    u.uPointer.value.copy(smooth.current);

    if (p.moved) {
      const lr = lastRipple.current;
      const dist = Math.hypot(p.x - lr.x, p.y - lr.y);
      if (t - lr.t > 0.35 && dist > 0.12) {
        lastRipple.current = { t, x: p.x, y: p.y };
        u.uRipplePos.value.set(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
      }
    }
    u.uRippleAge.value = t - lastRipple.current.t;

    frames.current += 1;
    if (!ready.current && frames.current > 2) {
      ready.current = true;
      onReady();
    }
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} uniforms={initialUniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

export default function HeroScene({ src, active, onReady }: Props) {
  const pointer = useRef({ x: 0, y: 0, moved: false });
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.current.moved = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1] }}
      >
        <Plane src={src} onReady={onReady} pointer={pointer} />
      </Canvas>
    </div>
  );
}
