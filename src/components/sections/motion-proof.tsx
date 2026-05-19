"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./section-header";

const TorusScene = dynamic(() => import("./motion-torus").then((m) => m.TorusScene), { ssr: false });

const DEMOS = [
  {
    title: "Three.js + R3F",
    label: "Used on: Quanta · WebGL hero",
    Demo: TorusDemo,
  },
  {
    title: "GSAP magnetic cursor",
    label: "Used on: Replywise · pricing cards",
    Demo: MagneticDemo,
  },
  {
    title: "SVG scroll-draw",
    label: "Used on: Meridian Wealth · projection chart",
    Demo: ChartDemo,
  },
];

export function MotionProof() {
  return (
    <section className="relative border-b border-[var(--line)] py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Motion + 3D Proof"
          title={
            <>
              Motion that{" "}
              <em className="font-display italic text-gold-deep">earns its weight.</em>
            </>
          }
          subtitle="Three live demos, running right here. Every motion choice ties back to a real client outcome — never decoration."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {DEMOS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 shadow-[0_18px_50px_rgb(11_37_69_/_0.08)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-navy">
                <d.Demo />
              </div>
              <div className="grid gap-1.5 p-5">
                <h3 className="text-base font-bold text-navy">{d.title}</h3>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-deep">
                  {d.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TorusDemo() {
  return <TorusScene />;
}

function MagneticDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setTx(((e.clientX - r.left) / r.width - 0.5) * 28);
        setTy(((e.clientY - r.top) / r.height - 0.5) * 28);
      }}
      onMouseLeave={() => {
        setTx(0);
        setTy(0);
      }}
      className="relative grid h-full place-items-center overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-navy text-white"
      style={{
        backgroundImage:
          "radial-gradient(700px 500px at 70% 30%, rgb(197 160 90 / 0.32), transparent 70%)",
      }}
    >
      <div
        className="rounded-2xl border border-gold/40 bg-white/8 px-9 py-7 text-center backdrop-blur-sm transition-transform duration-300"
        style={{ transform: `translate3d(${tx}px, ${ty}px, 0)` }}
      >
        <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-light">
          Move your cursor
        </div>
        <div className="mt-2 font-display text-2xl font-bold">Magnetic pull</div>
      </div>
    </div>
  );
}

function ChartDemo() {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(reduced ? 1 : 0);
  useEffect(() => {
    if (reduced) return;
    const el = pathRef.current;
    if (!el) return;
    let raf = 0;
    let observed = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !observed) {
          observed = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / 1600);
            setProgress(p);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  const path =
    "M 20 180 L 70 150 L 120 165 L 170 120 L 220 135 L 270 95 L 320 105 L 370 60 L 420 75 L 460 35";
  return (
    <div
      className="relative h-full overflow-hidden p-6"
      style={{
        background:
          "radial-gradient(600px 400px at 80% 10%, rgb(197 160 90 / 0.22), transparent 70%), #0B2545",
      }}
    >
      <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-light">
        Projected Growth · 20yr
      </div>
      <div className="font-display text-3xl font-bold text-white">$28.4M</div>
      <svg viewBox="0 0 480 220" className="mt-3 block h-[calc(100%-80px)] w-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8C97A" stopOpacity="0.5" />
            <stop offset="1" stopColor="#E8C97A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={path}
          stroke="#E8C97A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 900,
            strokeDashoffset: 900 * (1 - progress),
            transition: reduced ? "none" : undefined,
          }}
        />
        <path
          d={`${path} L 460 220 L 20 220 Z`}
          fill="url(#g1)"
          opacity={progress * 0.9}
        />
      </svg>
    </div>
  );
}
