"use client";

import { motion } from "framer-motion";
import { SectionHead } from "./build-system";

const AGENTS = [
  {
    name: "Princeton",
    role: "Strategy · Copy · SEO",
    description:
      "Owns site strategy, competitor research, conversion architecture, SEO, visual direction, implementation, browser QA, and deployment readiness.",
    artifact: <PrincetonWireframe />,
  },
  {
    name: "Harvard",
    role: "Visual System",
    description:
      "Custom images, graphics, 3D stills, brand lockups, icon systems, and industry-matched visual proof. No stock.",
    artifact: <HarvardBoard />,
  },
  {
    name: "Yale",
    role: "Motion · Video",
    description:
      "Cinematic media, scroll-linked sequences, launch clips, and animated proof. Motion with conversion intent, never decoration.",
    artifact: <YaleTimeline />,
  },
];

export function SpecialistBench() {
  return (
    <section
      id="bench"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-28"
    >
      <div className="wrap">
        <SectionHead
          kicker="The Specialist Bench"
          title={
            <>
              When work repeats,{" "}
              <em className="font-display italic text-gold-deep">
                we name the specialist.
              </em>
            </>
          }
          subtitle="Princeton, Harvard, and Yale are named agents — each with their own playbook, memory, and QA gate. You always know who&rsquo;s on the work."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {AGENTS.map((a, i) => (
            <motion.article
              key={a.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 p-7 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)] transition-all hover:-translate-y-1.5 hover:shadow-[0_32px_84px_rgb(11_37_69_/_0.14)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-3 inline-flex rounded-full border border-[var(--gold-line)] bg-gold/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
                    {a.role}
                  </div>
                  <h3 className="font-display text-4xl font-bold leading-none text-navy">
                    {a.name}
                  </h3>
                </div>
                <AgentMark name={a.name} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate">
                {a.description}
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--line)] bg-cloud/60">
                {a.artifact}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentMark({ name }: { name: string }) {
  const color = name === "Princeton" ? "#0B2545" : name === "Harvard" ? "#94741f" : "#00843D";
  return (
    <span
      className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--gold-line)] bg-white"
      aria-hidden
    >
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" />
        <path
          d="M14 26 L20 12 L26 26"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="22" r="2" fill={color} />
      </svg>
    </span>
  );
}

function PrincetonWireframe() {
  return (
    <svg viewBox="0 0 320 160" className="block h-auto w-full" role="img" aria-label="Princeton wireframe">
      <rect x="0" y="0" width="320" height="160" fill="#F5F7FA" />
      <rect x="14" y="14" width="60" height="8" rx="4" fill="#0B2545" />
      <rect x="232" y="14" width="74" height="8" rx="4" fill="#C5A05A" />
      <rect x="14" y="34" width="180" height="20" rx="3" fill="#0B2545" />
      <rect x="14" y="60" width="280" height="5" rx="2.5" fill="#C0C7CF" />
      <rect x="14" y="70" width="220" height="5" rx="2.5" fill="#C0C7CF" />
      <rect x="14" y="86" width="80" height="20" rx="10" fill="#C5A05A" />
      <rect x="100" y="86" width="80" height="20" rx="10" fill="#0B2545" />
      <rect x="14" y="118" width="92" height="32" rx="6" fill="#FFFFFF" stroke="#C0C7CF" />
      <rect x="114" y="118" width="92" height="32" rx="6" fill="#FFFFFF" stroke="#C0C7CF" />
      <rect x="214" y="118" width="92" height="32" rx="6" fill="#FFFFFF" stroke="#C0C7CF" />
    </svg>
  );
}

function HarvardBoard() {
  const swatches = ["#0B2545", "#1B3C73", "#C5A05A", "#E8C97A", "#00843D", "#F5F7FA"];
  return (
    <div className="p-4">
      <div className="grid grid-cols-6 gap-1.5">
        {swatches.map((s) => (
          <div
            key={s}
            className="aspect-square rounded-md border border-[var(--line)]"
            style={{ background: s }}
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="font-display text-2xl leading-none text-navy">Aa</div>
        <div className="text-sm font-bold text-navy">Display · Inter</div>
        <div className="text-xs text-slate">Display: Playfair · Body: Inter</div>
      </div>
    </div>
  );
}

function YaleTimeline() {
  return (
    <svg viewBox="0 0 320 140" className="block h-auto w-full" role="img" aria-label="Yale motion timeline">
      <rect x="0" y="0" width="320" height="140" fill="#0B2545" />
      <g fill="#FFFFFF" opacity="0.08">
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={i * 20 + 10} y="20" width="1" height="100" />
        ))}
      </g>
      <rect x="14" y="36" width="240" height="14" rx="7" fill="#C5A05A" />
      <rect x="14" y="60" width="180" height="10" rx="5" fill="#E8C97A" opacity="0.6" />
      <rect x="14" y="80" width="120" height="10" rx="5" fill="#00843D" opacity="0.7" />
      <circle cx="270" cy="100" r="22" fill="#C5A05A" />
      <path d="M264 92 L264 108 L278 100 Z" fill="#0B2545" />
    </svg>
  );
}
