"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionHeader } from "./section-header";
import { GithubMark, VercelMark } from "@/components/brand-icons";

const STEPS = [
  {
    num: "01",
    title: "Listen",
    body: "Plain-English intake replaces the old web brief. Tell us the offer, market, and what a good lead is worth — that&rsquo;s the whole input.",
    Artifact: ListenArtifact,
  },
  {
    num: "02",
    title: "Research",
    body: "Competitor stacks, layout patterns, buyer objections, search-intent maps, and conversion friction. The site is built for the market, not just the prompt.",
    Artifact: ResearchArtifact,
  },
  {
    num: "03",
    title: "Design",
    body: "Custom visual system. Tokens, type ramp, motion direction, asset plan — integrated as proof, not scattered decoration.",
    Artifact: DesignArtifact,
  },
  {
    num: "04",
    title: "Build",
    body: "Hand-coded in Next.js with shadcn primitives, Three.js where it matters, GSAP for scroll, Supabase for the backend. Versioned in GitHub.",
    Artifact: BuildArtifact,
  },
  {
    num: "05",
    title: "Ship",
    body: "Deployed to Vercel. SEO, schema, sitemap, OG, analytics, and the brief form wired before launch. You own the repo from day one.",
    Artifact: ShipArtifact,
  },
];

export function BuildPipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const distance = track.scrollWidth - track.clientWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative border-b border-[var(--line)] bg-cloud/30 py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="The Build System"
          title={
            <>
              Five phases.{" "}
              <em className="font-display italic text-gold-deep">One accountable team.</em>
            </>
          }
          subtitle="Watch the timeline scrub. Each phase ships with a real artifact you can review before the next one starts."
        />
      </div>

      <div className="relative overflow-hidden" aria-label="Build pipeline timeline">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-7 will-change-transform md:gap-8"
          style={{ paddingLeft: "max(28px, calc((100vw - 1280px) / 2 + 28px))" }}
        >
          {STEPS.map((s, i) => (
            <article
              key={s.num}
              className="relative flex h-[520px] w-[420px] shrink-0 flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 p-7 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)] md:w-[460px]"
            >
              <header className="flex items-center justify-between">
                <span className="font-display text-4xl font-bold text-gold-deep">
                  {s.num}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-text">
                  Phase {i + 1} of 5
                </span>
              </header>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-text">
                {s.body.replace(/&rsquo;/g, "’")}
              </p>
              <div className="mt-6 grow rounded-2xl border border-[var(--line)] bg-cloud/60 p-4">
                <s.Artifact />
              </div>
            </article>
          ))}
          <div className="w-[20vw] shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function ListenArtifact() {
  return (
    <div className="grid gap-2 text-[12px]">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-gold-deep">
        Intake · sample
      </div>
      <Field label="Industry" value="HVAC · Sarasota, FL" />
      <Field label="Audience" value="Homeowners · 35–65 · service-call ready" />
      <Field label="Lead worth" value="$640 avg ticket" />
      <Field label="Style" value="Premium, trust-first, click-to-call mobile" />
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white px-3 py-2">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-text">
        {label}
      </div>
      <div className="text-[13px] font-bold text-navy">{value}</div>
    </div>
  );
}

function ResearchArtifact() {
  const rows = [
    { url: "competitor-a.com", note: "4 weak CTAs · no schema" },
    { url: "competitor-b.com", note: "LCP 4.8s · slow images" },
    { url: "competitor-c.com", note: "no booking flow" },
    { url: "competitor-d.com", note: "missing local schema" },
  ];
  return (
    <div className="grid gap-2 text-[12px]">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-gold-deep">
        Competitor scan
      </div>
      {rows.map((r) => (
        <div
          key={r.url}
          className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-white px-3 py-2"
        >
          <span className="font-mono text-[11px] font-bold text-navy">{r.url}</span>
          <span className="text-[10px] text-slate-text">{r.note}</span>
        </div>
      ))}
    </div>
  );
}

function DesignArtifact() {
  const swatches = ["#0B2545", "#1B3C73", "#C5A05A", "#E8C97A", "#F5F7FA", "#00843D"];
  return (
    <div className="grid gap-3">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-gold-deep">
        Brand board · tokens
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {swatches.map((s) => (
          <div
            key={s}
            className="aspect-square rounded-md border border-[var(--line)]"
            style={{ background: s }}
          />
        ))}
      </div>
      <div className="rounded-lg border border-[var(--line)] bg-white p-3">
        <div className="font-display text-2xl leading-none text-navy">Aa</div>
        <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-text">
          Playfair · Inter · v4
        </div>
      </div>
    </div>
  );
}

function BuildArtifact() {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-navy p-3 font-mono text-[10.5px] leading-relaxed text-gold-light">
      <div className="flex items-center gap-2 text-white/55">
        <GithubMark className="h-3 w-3" /> v2-cinematic
      </div>
      <div className="mt-1.5 text-green-soft">+ 142 files, 38 components</div>
      <div className="text-white/55">$ pnpm install</div>
      <div className="text-white/40">added 318 packages in 12s</div>
      <div className="text-white/55">$ pnpm build</div>
      <div className="text-gold-light">✓ Compiled in 7.7s</div>
    </div>
  );
}

function ShipArtifact() {
  return (
    <div className="grid gap-2">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-gold-deep">
        Deploy log
      </div>
      <div className="rounded-lg border border-[var(--line)] bg-white p-3 font-mono text-[10px]">
        <div className="flex items-center gap-2 text-navy">
          <VercelMark className="h-3 w-3" />{" "}
          <span className="font-bold">vercel · production</span>
        </div>
        <div className="mt-1.5 text-slate-text">→ deploying ...</div>
        <div className="text-green-irish">✓ Build completed</div>
        <div className="text-green-irish">✓ Assigned to ownly-web-studio.vercel.app</div>
        <div className="mt-2 text-navy">Live in 47s</div>
      </div>
    </div>
  );
}
