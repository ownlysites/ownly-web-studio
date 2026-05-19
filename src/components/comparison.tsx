"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHead } from "./build-system";

type Row = {
  label: string;
  diy: { win: boolean; note: string };
  ownly: { win: boolean; note: string };
};

const ROWS: Row[] = [
  {
    label: "First Draft Speed",
    diy: { win: true, note: "Minutes" },
    ownly: { win: false, note: "Same week — once briefed" },
  },
  {
    label: "Custom Strategy",
    diy: { win: false, note: "Generic prompt response" },
    ownly: { win: true, note: "Market + buyer hesitation mapped" },
  },
  {
    label: "Custom Visuals",
    diy: { win: false, note: "Stock or templated" },
    ownly: { win: true, note: "Harvard-directed for your industry" },
  },
  {
    label: "SEO Foundation",
    diy: { win: false, note: "Surface-level" },
    ownly: { win: true, note: "Schema, semantic HTML, local signals" },
  },
  {
    label: "Conversion Path",
    diy: { win: false, note: "Single CTA, no thought to follow-up" },
    ownly: { win: true, note: "Call/text, book, brief, AI agent option" },
  },
  {
    label: "Accountability",
    diy: { win: false, note: "You're the project manager" },
    ownly: { win: true, note: "Named specialist owns each lane" },
  },
  {
    label: "Hosting Decisions",
    diy: { win: false, note: "Locked to builder platform" },
    ownly: { win: true, note: "GitHub + Vercel, fully portable" },
  },
  {
    label: "Ongoing Improvements",
    diy: { win: false, note: "Manual edits in their UI" },
    ownly: { win: true, note: "Versioned, code-native, planned cadence" },
  },
];

export function Comparison() {
  return (
    <section
      id="vs"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-28"
    >
      <div className="wrap">
        <SectionHead
          kicker="Ownly vs DIY AI Builders"
          title={
            <>
              AI builders are fast.{" "}
              <em className="font-display italic text-gold-deep">
                Ownly is accountable.
              </em>
            </>
          }
          subtitle="Honest: DIY tools win on first-draft speed. Ownly wins everywhere it matters once the site needs to convert, rank, and grow."
        />

        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--line)] bg-cloud/70">
            <div className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate">
              Category
            </div>
            <div className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate">
              Lovable · Bolt · Base44
            </div>
            <div className="bg-gold/8 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
              Ownly Web Studio
            </div>
          </div>
          {ROWS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--line)] last:border-b-0"
            >
              <div className="px-5 py-4 text-sm font-bold text-navy">
                {r.label}
              </div>
              <Cell win={r.diy.win} note={r.diy.note} muted />
              <Cell win={r.ownly.win} note={r.ownly.note} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ win, note, muted = false }: { win: boolean; note: string; muted?: boolean }) {
  return (
    <div
      className={`flex items-start gap-2 px-5 py-4 text-sm ${
        muted ? "" : "bg-gold/[0.04]"
      }`}
    >
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          win ? "bg-green/10 text-green" : "bg-cloud text-slate"
        }`}
      >
        {win ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className={muted ? "text-slate" : "text-navy"}>{note}</span>
    </div>
  );
}
