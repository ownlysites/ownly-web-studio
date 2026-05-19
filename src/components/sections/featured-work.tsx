"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./section-header";

const WORK = [
  {
    title: "Campbell Wealth Advice",
    tag: "Wealth Advisory",
    blurb:
      "Comprehensive wealth platform with a client hub, six branded email signatures, an SEO-tuned content system, and Stuart-meeting-grade proof architecture.",
    url: "https://campbellwealthadvice.com",
    accent: "#0a2540",
    artifact: <CWAArtifact />,
  },
  {
    title: "itsownlymoney",
    tag: "AI-Guided Personal Finance",
    blurb:
      "194 wired functions, magic-link auth, live-market ticker, AI guide, multi-device sync. Built and shipped end-to-end on Next.js + Supabase + Vercel.",
    url: "https://itsownlymoney.vercel.app",
    accent: "#6d28d9",
    artifact: <OwnlyMoneyArtifact />,
  },
];

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative border-b border-[var(--line)] py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="Featured Work"
          title={
            <>
              Live work,{" "}
              <em className="font-display italic text-gold-deep">not lookbook.</em>
            </>
          }
          subtitle="Two real client builds, both shipped from Ownly. Every link below opens the deployed site."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {WORK.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_32px_84px_rgb(11_37_69_/_0.14)]"
            >
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: w.accent }}
              >
                {w.artifact}
              </div>
              <div className="flex flex-1 flex-col gap-5 p-7 md:p-8">
                <span className="inline-flex w-fit rounded-full border border-[var(--gold-line)] bg-gold/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-deep">
                  {w.tag}
                </span>
                <h3 className="font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
                  {w.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-text">
                  {w.blurb}
                </p>
                <Link
                  href={w.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-navy bg-navy px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.1em] text-white transition-all group-hover:bg-gold group-hover:text-navy group-hover:border-gold"
                >
                  View live
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CWAArtifact() {
  return (
    <div className="absolute inset-0 grid place-items-center p-10 text-white">
      <div className="grid w-full max-w-md gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#a98741] font-display text-2xl font-semibold text-[#0a2540]">
            C
          </div>
          <div>
            <div className="font-display text-xl font-semibold tracking-tight">
              Campbell Wealth
            </div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c5a76a]">
              Registered Investment Advisor
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#c5a76a]">
            Client Hub
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-white/10 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-white/60">AUM</div>
              <div className="mt-1 font-display text-lg font-bold">$2.4M</div>
            </div>
            <div className="rounded-lg bg-white/10 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-white/60">YTD</div>
              <div className="mt-1 font-display text-lg font-bold text-[#c5a76a]">+9.7%</div>
            </div>
            <div className="rounded-lg bg-white/10 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-white/60">Next Mtg</div>
              <div className="mt-1 font-display text-lg font-bold">Jun 14</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/65">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c5a76a]" /> 6 Branded signatures · SEO content · Supabase backend
        </div>
      </div>
    </div>
  );
}

function OwnlyMoneyArtifact() {
  return (
    <div
      className="absolute inset-0 p-10 text-white"
      style={{
        background:
          "radial-gradient(600px 400px at 80% 20%, rgb(167 139 250 / 0.4), transparent 60%), radial-gradient(700px 500px at 10% 80%, rgb(34 211 238 / 0.22), transparent 70%), #0c0625",
      }}
    >
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-extrabold text-white">
              $
            </div>
            <span className="font-bold tracking-tight">itsownlymoney</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-300">● Live · 194 functions</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Net worth", v: "$284,910", trend: "+2.4%" },
            { label: "Investments", v: "$162,847", trend: "+1.1%" },
            { label: "Cash", v: "$48,212", trend: "—" },
            { label: "Liabilities", v: "$72,400", trend: "-0.6%" },
          ].map((k) => (
            <div key={k.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-[9px] uppercase tracking-wider text-white/60">{k.label}</div>
              <div className="mt-1 font-display text-lg font-bold">{k.v}</div>
              <div className="text-[10px] font-mono text-emerald-300">{k.trend}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/60">
              AI Guide
            </span>
            <span className="text-[10px] font-mono text-cyan-300">● typing…</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/85">
            You have $1,840 unallocated this month. Want me to top up the emergency fund first?
          </p>
        </div>
      </div>
    </div>
  );
}
