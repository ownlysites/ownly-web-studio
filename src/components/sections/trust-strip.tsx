"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { NextMark, VercelMark, SupabaseMark } from "@/components/brand-icons";
import { SITE } from "@/lib/site";

const CREDS = [
  { icon: Award, label: "CFEI Certified" },
  { icon: ShieldCheck, label: "PFSA Member" },
  { icon: BookOpen, label: "Author of 5 books" },
  { icon: Sparkles, label: "F.A.C.T. Method" },
];

const STACK = [
  { name: "Next.js", Icon: NextMark },
  { name: "Vercel", Icon: VercelMark },
  { name: "Supabase", Icon: SupabaseMark },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Real signals"
      className="relative border-b border-[var(--line)] bg-cloud/40 py-12"
    >
      <div className="wrap grid items-center gap-10 md:grid-cols-[auto_1fr_auto] md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-text"
        >
          Built by Ownly ONCE LLC
          <div className="mt-1 font-display text-base font-semibold tracking-tight text-navy normal-case">
            {SITE.city}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {CREDS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-white/70 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-gold-deep"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-end gap-2"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-text">
            Featured stack
          </span>
          <div className="flex items-center gap-5 text-navy">
            {STACK.map(({ name, Icon }) => (
              <span key={name} className="flex items-center gap-2" title={name}>
                <Icon className="h-5 w-5" />
                <span className="text-xs font-bold tracking-tight">{name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="wrap mt-10 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-8 text-sm text-slate-text md:grid-cols-4">
        <Stat number="194" label="Functions wired on itsownlymoney" />
        <Stat number="8" label="Industry sites built last week" />
        <Stat number="92+" label="Lighthouse mobile target" />
        <Stat number="≤ 48h" label="First mockup turnaround" />
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl font-bold leading-none text-navy">{number}</span>
      <span className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-slate-text">
        {label}
      </span>
    </div>
  );
}
