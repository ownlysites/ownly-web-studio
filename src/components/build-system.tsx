"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquareText,
  Search,
  Palette,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { GithubMark } from "./brand-icons";

type Step = {
  num: string;
  title: string;
  caption: string;
  icon: LucideIcon;
  artifact: React.ReactNode;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Plain English",
    caption:
      "Tell Princeton the offer, market, competitors, and what a good lead is worth. No web brief required.",
    icon: MessageSquareText,
    artifact: (
      <div className="rounded-xl border border-[var(--line)] bg-white p-3 text-[11px] leading-snug text-navy shadow-[inset_0_2px_4px_rgb(11_37_69_/_0.08)]">
        <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-gold-deep">
          Brief
        </div>
        &quot;HVAC company in Sarasota. Premium feel, click-to-call, finance options, owner photo, 5-star reviews.&quot;
      </div>
    ),
  },
  {
    num: "02",
    title: "Market Research",
    caption:
      "Princeton reviews competitors, layout patterns, buyer objections, proof, SEO language, and visual expectations.",
    icon: Search,
    artifact: (
      <div className="grid gap-1.5">
        {["sarasotaair.com", "veteranair.com", "kobiecompletehvac.com"].map((c) => (
          <div
            key={c}
            className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-white px-2.5 py-1.5 text-[10px]"
          >
            <span className="font-bold text-navy">{c}</span>
            <span className="text-gold-deep">scanned</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Visual System",
    caption:
      "Harvard locks the brand board: tokens, type ramp, imagery system, motion language. Built as proof, not decoration.",
    icon: Palette,
    artifact: (
      <div className="grid grid-cols-4 gap-1.5">
        {["#0B2545", "#C5A05A", "#00843D", "#F5F7FA"].map((c) => (
          <div
            key={c}
            className="aspect-square rounded-lg border border-[var(--line)]"
            style={{ background: c }}
          />
        ))}
      </div>
    ),
  },
  {
    num: "04",
    title: "Owned Launch",
    caption:
      "GitHub, Vercel, SEO, schema, forms, booking, and AI agent paths shipped together. You own the code and the data.",
    icon: Rocket,
    artifact: (
      <div className="rounded-xl border border-[var(--line)] bg-navy p-3 font-mono text-[10px] leading-relaxed text-gold-light">
        <div className="flex items-center gap-2 text-white/60">
          <GithubMark className="h-3 w-3" /> princeton-rebuild → main
        </div>
        <div className="mt-1.5 text-green-soft">+ 142 files, 38 components</div>
        <div className="text-gold-light">~ vercel deploy ready</div>
      </div>
    ),
  },
];

export function BuildSystemPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="system"
      ref={ref}
      className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHead
          kicker="The Build System"
          title={
            <>
              From idea to launch,{" "}
              <em className="font-display italic text-gold-deep">
                without the template look.
              </em>
            </>
          }
          subtitle="Four phases, one accountable team. Borrows the prompt-to-app energy of Lovable, Bolt, Base44, and Readdy — adds the judgment, custom media, SEO, and conversion strategy that client sites need."
        />

        {/* progress rail */}
        <div className="relative mx-auto mb-10 hidden h-1 max-w-3xl overflow-hidden rounded-full bg-cloud md:block">
          <motion.div
            style={{ width: lineWidth }}
            className="h-full bg-gradient-to-r from-gold via-gold-light to-green-soft"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_18px_52px_rgb(11_37_69_/_0.07)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_72px_rgb(11_37_69_/_0.12)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-bold text-gold-deep">
                  {s.num}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-navy">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate">{s.caption}</p>
              <div className="mt-auto">{s.artifact}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  subtitle,
  center = true,
  light = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={`mx-auto max-w-3xl pb-12 ${center ? "text-center" : "text-left"}`}
    >
      {kicker && (
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] ${
            light
              ? "border-gold/40 bg-white/10 text-gold-light"
              : "border-[var(--gold-line)] bg-white/60 text-gold-deep"
          }`}
        >
          {kicker}
        </div>
      )}
      <h2
        className={`font-display text-[clamp(36px,5.4vw,68px)] font-extrabold leading-[0.95] tracking-tight text-balance ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed text-balance ${
            light ? "text-white/70" : "text-slate"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
