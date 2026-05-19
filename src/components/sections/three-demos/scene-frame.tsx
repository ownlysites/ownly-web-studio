"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

type Props = {
  label: string;
  caption: string;
  altImage?: string;
  background?: CSSProperties["background"];
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  /** Render children only after the frame has been seen + interactive. */
  children: (autoRotate: boolean) => ReactNode;
};

export function SceneFrame({
  label,
  caption,
  altImage,
  background = "radial-gradient(800px 600px at 70% 20%, rgb(232 201 122 / 0.18), transparent 60%), linear-gradient(180deg, #0B2545, #1B3C73)",
  cameraPosition = [0, 0.8, 5.5],
  cameraFov = 35,
  children,
}: Props) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimer = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(!reduced);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function handleInteractStart() {
    setInteracted(true);
    setAutoRotate(false);
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
  }

  function handleInteractEnd() {
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setAutoRotate(true), 3000);
  }

  return (
    <article
      ref={wrapRef}
      className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-cloud/70 shadow-[0_16px_44px_rgb(11_37_69_/_0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_72px_rgb(11_37_69_/_0.2)] hover:ring-1 hover:ring-gold/60"
    >
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{ background }}
        onPointerDown={handleInteractStart}
        onPointerUp={handleInteractEnd}
        onPointerCancel={handleInteractEnd}
      >
        {enabled && inView ? (
          <Canvas
            camera={{ position: cameraPosition, fov: cameraFov }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            shadows
          >
            <ambientLight intensity={0.85} />
            <hemisphereLight args={["#E8C97A", "#1B3C73", 0.6]} />
            <directionalLight
              position={[4, 6, 4]}
              intensity={1.4}
              color="#FFF6E6"
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-4, 3, -3]} intensity={0.7} color="#9BB7FF" />
            <directionalLight position={[0, 2, -5]} intensity={0.45} color="#E8C97A" />
            <ContactShadows
              position={[0, -1.05, 0]}
              opacity={0.5}
              scale={8}
              blur={2.4}
              far={3}
            />
            {children(autoRotate && !interacted)}
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2 - 0.6}
              maxPolarAngle={Math.PI / 2 + 0.4}
              autoRotate={autoRotate}
              autoRotateSpeed={0.8}
              onStart={handleInteractStart}
              onEnd={handleInteractEnd}
            />
          </Canvas>
        ) : (
          <button
            type="button"
            onClick={() => setEnabled(true)}
            className="grid h-full w-full place-items-center text-center text-white/85"
            style={{
              background: altImage
                ? `url(${altImage}) center/cover`
                : undefined,
            }}
            aria-label={`Activate interactive 3D ${label}`}
          >
            <span className="rounded-full border border-gold/40 bg-navy/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-light backdrop-blur-sm">
              Click to activate
            </span>
          </button>
        )}

        {/* Hint pill — fades on first interaction. */}
        {enabled && inView && (
          <div
            aria-hidden
            className={`pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-navy/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light backdrop-blur-sm transition-opacity duration-500 ${
              interacted ? "opacity-0" : "opacity-100"
            }`}
          >
            <DragGlyph /> Click + drag
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-deep">
            {label}
          </div>
          <div className="text-[11px] text-slate-text">{caption}</div>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-text">
          Live · interactive
        </span>
      </div>
    </article>
  );
}

function DragGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 2v2M8 12v2M2 8h2M12 8h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
