"use client";

import { motion } from "framer-motion";
import { ClipboardList, Microscope, Hammer, Rocket } from "lucide-react";
import { SectionHead } from "./build-system";

const STEPS = [
  {
    num: "1",
    title: "Describe the business",
    body: "Plain-English intake replaces the old web brief. Tell Princeton who you serve, what you sell, what a good lead is worth, and what visitors need to believe.",
    icon: ClipboardList,
    artifact: <Intake />,
  },
  {
    num: "2",
    title: "Study the market",
    body: "Princeton reviews competitors, layout patterns, buyer objections, proof, SEO language, and visual expectations before design starts.",
    icon: Microscope,
    artifact: <CompetitorList />,
  },
  {
    num: "3",
    title: "Build the visual system",
    body: "Harvard-style graphics, brand assets, website previews, 3D cues, and motion direction integrated as proof — not scattered decoration.",
    icon: Hammer,
    artifact: <WireframeArt />,
  },
  {
    num: "4",
    title: "Launch the path",
    body: "GitHub/Vercel-ready files, forms, booking, click-to-call, SEO metadata, social cards, schema, and AI agent options come together.",
    icon: Rocket,
    artifact: <LaunchTerm />,
  },
];

export function Process() {
  return (
    <section className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-28">
      <div className="wrap">
        <SectionHead
          kicker="Process"
          title={
            <>
              How a build happens{" "}
              <em className="font-display italic text-gold-deep">with Princeton.</em>
            </>
          }
          subtitle="The same four phases, every build. Each step ships with a visible artifact so you can see what's been done before the next phase begins."
        />
        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_18px_50px_rgb(11_37_69_/_0.07)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-navy">
                  <s.icon className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="font-display text-2xl font-bold text-gold-deep">
                  {s.num.padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-tight text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
              <div className="mt-4">{s.artifact}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Intake() {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-cloud/60 p-3 text-[11px] text-navy">
      <div className="mb-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
        Intake form
      </div>
      <div className="space-y-1.5">
        <div className="rounded bg-white px-2 py-1.5 shadow-[0_2px_6px_rgb(11_37_69_/_0.06)]">Industry · HVAC</div>
        <div className="rounded bg-white px-2 py-1.5 shadow-[0_2px_6px_rgb(11_37_69_/_0.06)]">Area · Sarasota, FL</div>
        <div className="rounded bg-white px-2 py-1.5 shadow-[0_2px_6px_rgb(11_37_69_/_0.06)]">Goal · 30 booked calls/mo</div>
      </div>
    </div>
  );
}

function CompetitorList() {
  return (
    <div className="grid gap-1.5">
      {["Competitor A · 4 weak CTAs", "Competitor B · slow LCP", "Competitor C · no schema"].map(
        (l) => (
          <div
            key={l}
            className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-white px-2.5 py-1.5 text-[10px] text-navy"
          >
            <span className="font-bold">{l.split("·")[0]}</span>
            <span className="text-gold-deep">{l.split("·")[1]}</span>
          </div>
        )
      )}
    </div>
  );
}

function WireframeArt() {
  return (
    <svg viewBox="0 0 200 100" className="block h-auto w-full" role="img" aria-label="Wireframe sample">
      <rect width="200" height="100" rx="8" fill="#F5F7FA" />
      <rect x="10" y="12" width="40" height="6" rx="3" fill="#0B2545" />
      <rect x="155" y="10" width="36" height="10" rx="5" fill="#C5A05A" />
      <rect x="10" y="30" width="120" height="14" rx="3" fill="#0B2545" />
      <rect x="10" y="50" width="170" height="4" rx="2" fill="#C0C7CF" />
      <rect x="10" y="58" width="140" height="4" rx="2" fill="#C0C7CF" />
      <rect x="10" y="72" width="60" height="16" rx="8" fill="#C5A05A" />
    </svg>
  );
}

function LaunchTerm() {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-navy p-3 font-mono text-[10px] leading-relaxed text-gold-light">
      <div className="text-white/60">$ git push origin princeton-rebuild</div>
      <div className="text-green-soft">✓ Vercel preview ready</div>
      <div className="text-gold-light">→ ownly-web-studio.vercel.app</div>
    </div>
  );
}
