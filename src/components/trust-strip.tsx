"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

const PROOF = [
  { kicker: "Free", label: "Custom mockup first" },
  { kicker: "SEO", label: "Built into structure" },
  { kicker: "AI", label: "Chat + voice ready" },
  { kicker: "Code", label: "Portable launch path" },
];

const TRUSTED_BY = [
  { name: "CWA", label: "Christian Wealth Advisors" },
  { name: "ITSOWNLYMONEY", label: "ItsOwnlyMoney" },
  { name: "Ownly ONCE", label: "Ownly ONCE LLC" },
  { name: "6 Figure Sit Down", label: "Six Figure Sit Down Method" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Trust strip"
      className="border-t border-[rgb(11_37_69_/_0.08)] bg-white/30 py-10"
    >
      <div className="wrap">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PROOF.map((p, i) => (
            <motion.div
              key={p.kicker}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-[var(--line)] bg-white/70 p-5 shadow-[0_14px_38px_rgb(11_37_69_/_0.06)]"
            >
              <strong className="block font-display text-3xl leading-none text-gold-deep">
                {p.kicker}
              </strong>
              <span className="mt-2 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-slate">
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-6 border-t border-[var(--line)] pt-7 md:grid-cols-[auto_1fr] md:gap-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate">
            <span>Built by</span>
            <span className="rounded-md bg-navy px-2.5 py-1 text-white">Ownly ONCE</span>
            <span className="hidden text-slate md:inline">·</span>
            <span>Powered by</span>
            <span className="rounded-md border border-[var(--gold-line)] bg-white px-2.5 py-1 text-gold-deep">
              Princeton · Harvard · Yale
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TRUSTED_BY.map((t) => (
              <div
                key={t.name}
                title={t.label}
                className="flex items-center justify-center rounded-xl border border-[var(--line)] bg-white/60 px-3 py-3 text-center transition-all hover:border-gold hover:bg-white"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate transition-colors hover:text-navy">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] text-slate sm:grid-cols-4">
          <Cred icon={<Award className="h-4 w-4" />}>CFEI Certified</Cred>
          <Cred icon={<ShieldCheck className="h-4 w-4" />}>PFSA Member</Cred>
          <Cred icon={<BookOpen className="h-4 w-4" />}>Author of 5 books</Cred>
          <Cred icon={<Sparkles className="h-4 w-4" />}>F.A.C.T. Method</Cred>
        </div>
      </div>
    </section>
  );
}

function Cred({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/60 px-3 py-2">
      <span className="text-gold-deep">{icon}</span>
      <span className="font-bold uppercase tracking-[0.1em]">{children}</span>
    </div>
  );
}
