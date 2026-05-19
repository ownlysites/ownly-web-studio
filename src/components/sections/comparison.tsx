"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHeader } from "./section-header";

const ROWS = [
  { label: "Speed of first draft", a: { w: true, n: "Minutes" }, b: { w: false, n: "Same week, briefed in" } },
  { label: "Custom strategy", a: { w: false, n: "Generic prompt output" }, b: { w: true, n: "Market + buyer mapped" } },
  { label: "Custom visuals", a: { w: false, n: "Stock or templated" }, b: { w: true, n: "Built for your industry" } },
  { label: "SEO foundation", a: { w: false, n: "Surface-level" }, b: { w: true, n: "Schema, semantic, local" } },
  { label: "Conversion path", a: { w: false, n: "Single CTA" }, b: { w: true, n: "Call · book · brief · agent" } },
  { label: "Accountability", a: { w: false, n: "You PM it" }, b: { w: true, n: "Named lead owns delivery" } },
  { label: "Hosting decisions", a: { w: false, n: "Builder platform lock-in" }, b: { w: true, n: "GitHub + Vercel, portable" } },
  { label: "Ongoing improvements", a: { w: false, n: "Manual UI edits" }, b: { w: true, n: "Versioned, planned cadence" } },
];

export function Comparison() {
  return (
    <section className="relative border-b border-[var(--line)] py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Ownly vs DIY AI builders"
          title={
            <>
              AI builders are fast.{" "}
              <em className="font-display italic text-gold-deep">Ownly is accountable.</em>
            </>
          }
          subtitle="Honest read: DIY tools win on first-draft speed. Ownly wins everywhere it matters once the site needs to convert, rank, and grow."
        />
        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--line)] bg-cloud/70">
            <div className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-text">
              Category
            </div>
            <div className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-text">
              Lovable · Bolt · Base44
            </div>
            <div className="bg-gold/10 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
              Ownly Web Studio
            </div>
          </div>
          {ROWS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.32, delay: i * 0.03 }}
              className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--line)] last:border-b-0"
            >
              <div className="px-5 py-4 text-sm font-bold text-navy">{r.label}</div>
              <Cell win={r.a.w} note={r.a.n} />
              <Cell win={r.b.w} note={r.b.n} highlight />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ win, note, highlight }: { win: boolean; note: string; highlight?: boolean }) {
  return (
    <div className={`flex items-start gap-2 px-5 py-4 text-sm ${highlight ? "bg-gold/5" : ""}`}>
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          win ? "bg-green-irish/10 text-green-irish" : "bg-cloud text-slate-text"
        }`}
      >
        {win ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className={highlight ? "text-navy" : "text-slate-text"}>{note}</span>
    </div>
  );
}
