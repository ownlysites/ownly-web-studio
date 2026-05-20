"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { INDUSTRIES } from "@/lib/industries";

function GoldParticles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
      sizes[i] = Math.random() * 0.05 + 0.015;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 1] += Math.sin(t * 0.4 + i) * 0.0006;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        color="#C9A767"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroMacBook() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    // 6s plain setInterval. Touch-safe — runs in foreground tabs on iOS Safari.
    // iOS will throttle when the tab is backgrounded, which is the desired
    // battery behavior. No rAF / mouse dependency.
    const t = setInterval(() => setIdx((i) => (i + 1) % INDUSTRIES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = INDUSTRIES[idx];

  return (
    <div className="relative w-full" style={{ minHeight: 540 }}>
      {/* Ambient gold field */}
      <div className="absolute inset-0 -z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <GoldParticles />
        </Canvas>
      </div>

      {/* Laptop */}
      <div
        className="relative mx-auto"
        style={{
          perspective: "1600px",
          width: "min(520px, 100%)",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            transform: "rotateX(8deg) rotateY(-10deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.7s ease",
          }}
        >
          {/* Bezel */}
          <div
            style={{
              borderRadius: 18,
              padding: 10,
              background: "linear-gradient(180deg, #1a2742 0%, #0F1F39 100%)",
              border: "1px solid var(--hairline)",
              boxShadow:
                "0 30px 60px -20px rgba(15,31,57,0.45), 0 0 0 1px rgba(184,150,90,0.25) inset",
            }}
          >
            {/* Camera notch */}
            <div className="flex justify-center" style={{ marginBottom: 6 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--gold)",
                  boxShadow: "0 0 8px rgba(184,150,90,0.7)",
                }}
              />
            </div>
            {/* Screen */}
            <div
              style={{
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                aspectRatio: "16 / 10",
                position: "relative",
              }}
            >
              <iframe
                key={current.slug}
                src={current.iframe}
                title={`Preview: ${current.label}`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  background: "#fff",
                  animation: "fadeIn .8s ease",
                }}
              />
              {/* Top bar */}
              <div
                className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2"
                style={{ background: "rgba(15,31,57,0.92)", color: "#FAF7EE" }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#E6735A" }} />
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#D4B87A" }} />
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#3F6F47" }} />
                <span className="font-mono text-[10px] ml-3 opacity-80">
                  ownly-examples.vercel.app/{current.slug}
                </span>
              </div>
            </div>
          </div>
          {/* Wedge / base */}
          <div
            style={{
              height: 12,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              background: "linear-gradient(180deg, #2a3a5f 0%, #1a2742 100%)",
              marginTop: -2,
              transform: "scaleX(1.05)",
              boxShadow: "0 30px 40px -20px rgba(15,31,57,0.35)",
            }}
          />
        </div>

        {/* Caption */}
        <div className="mt-6 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-dark)" }}>
            Now showing · {current.label} · {idx + 1} of {INDUSTRIES.length}
          </span>
          <p className="mt-2 text-sm" style={{ color: "var(--text-mute)" }}>
            {current.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
