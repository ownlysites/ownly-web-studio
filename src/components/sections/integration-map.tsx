"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "./section-header";

const NODES = [
  { x: 90, y: 80, label: "GitHub" },
  { x: 290, y: 30, label: "Vercel" },
  { x: 500, y: 80, label: "Supabase" },
  { x: 560, y: 250, label: "Calendly" },
  { x: 500, y: 420, label: "DREAMS BC" },
  { x: 290, y: 470, label: "Quo SMS" },
  { x: 90, y: 420, label: "Postiz" },
  { x: 30, y: 250, label: "Apollo" },
];
const CENTER = { x: 295, y: 250 };

const PROMISES = [
  "You own the code.",
  "You own the data.",
  "You own the launch path.",
];

export function IntegrationMap() {
  const reduced = useReducedMotion();
  return (
    <section
      id="launch"
      className="relative overflow-hidden border-b border-white/8 bg-navy py-24 text-white md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 440px at 78% 14%, rgb(197 160 90 / 0.22), transparent 60%), radial-gradient(760px 520px at 8% 86%, rgb(0 132 61 / 0.16), transparent 62%)",
        }}
      />
      <div className="wrap relative">
        <SectionHeader
          light
          kicker="Owned Launch"
          title={
            <>
              Every integration{" "}
              <em className="font-display italic text-gold-light">in one place.</em>
            </>
          }
          subtitle="Your site stays connected to the tools that move the business — without locking you into a black-box platform you don't control."
        />
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative mx-auto w-full max-w-xl">
            <svg viewBox="0 0 600 500" className="block h-auto w-full" role="img" aria-label="Ownly integration map">
              <defs>
                <radialGradient id="hubGrad" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#E8C97A" />
                  <stop offset="1" stopColor="#C5A05A" />
                </radialGradient>
              </defs>
              {NODES.map((n, i) => (
                <g key={n.label}>
                  <motion.line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={n.x}
                    y2={n.y}
                    stroke="rgba(232,201,122,0.36)"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.08 }}
                  />
                  {!reduced && (
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r="3"
                      fill="#E8C97A"
                      animate={{
                        cx: [CENTER.x, n.x],
                        cy: [CENTER.y, n.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        delay: 1 + i * 0.12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </g>
              ))}
              <circle cx={CENTER.x} cy={CENTER.y} r="68" fill="url(#hubGrad)" opacity="0.18" />
              <circle cx={CENTER.x} cy={CENTER.y} r="46" fill="url(#hubGrad)" />
              <text x={CENTER.x} y={CENTER.y - 4} textAnchor="middle" fill="#0B2545" fontFamily="Inter,system-ui,sans-serif" fontSize="11" fontWeight="900" letterSpacing="2">YOUR</text>
              <text x={CENTER.x} y={CENTER.y + 12} textAnchor="middle" fill="#0B2545" fontFamily="Inter,system-ui,sans-serif" fontSize="11" fontWeight="900" letterSpacing="2">SITE</text>
              {NODES.map((n) => (
                <g key={n.label}>
                  <circle cx={n.x} cy={n.y} r="24" fill="#FFFFFF" />
                  <circle cx={n.x} cy={n.y} r="24" fill="none" stroke="rgba(232,201,122,0.45)" />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#0B2545" fontFamily="Inter,system-ui,sans-serif" fontSize="11" fontWeight="900">{n.label.split(" ")[0].slice(0, 2).toUpperCase()}</text>
                  <text x={n.x} y={n.y + 42} textAnchor="middle" fill="#FFFFFF" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="800" letterSpacing="0.8">{n.label.toUpperCase()}</text>
                </g>
              ))}
            </svg>
          </div>
          <div>
            <ul className="space-y-4">
              {PROMISES.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-navy">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div className="font-display text-2xl font-bold leading-tight text-white">
                    {line}
                  </div>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-white/65">
              Most AI builders lock you into their dashboard. Ownly ships the code to your GitHub, deploys via Vercel, writes data into Supabase, and keeps every booking, SMS, social, and CRM path under your control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
