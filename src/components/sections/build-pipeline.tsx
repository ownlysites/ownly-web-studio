"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import { GithubMark, VercelMark } from "@/components/brand-icons";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "Listen",
    body:
      "Plain-English intake replaces the old web brief. Tell us the offer, market, and what a good lead is worth — that’s the whole input.",
    Artifact: ListenArtifact,
  },
  {
    num: "02",
    title: "Research",
    body:
      "Competitor stacks, layout patterns, buyer objections, search-intent maps, and conversion friction. The site is built for the market, not just the prompt.",
    Artifact: ResearchArtifact,
  },
  {
    num: "03",
    title: "Design",
    body:
      "Custom visual system. Tokens, type ramp, motion direction, asset plan — every client gets their own system, built fresh.",
    Artifact: DesignArtifact,
  },
  {
    num: "04",
    title: "Build",
    body:
      "Hand-coded in Next.js with shadcn primitives, Three.js where it matters, GSAP for scroll, Supabase for the backend. Versioned in GitHub.",
    Artifact: BuildArtifact,
  },
  {
    num: "05",
    title: "Ship",
    body:
      "Deployed to Vercel. SEO, schema, sitemap, OG, analytics, and the brief form wired before launch. You own the repo from day one.",
    Artifact: ShipArtifact,
  },
];

export function BuildPipeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);

  // Track which card is most-in-view for dot pagination.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;

    // Only run observer on horizontal layout (md+ breakpoint = 768px).
    if (!window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        let best: { idx: number; ratio: number } | null = null;
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx ?? -1);
          if (idx < 0) return;
          if (!best || e.intersectionRatio > best.ratio) {
            best = { idx, ratio: e.intersectionRatio };
          }
        });
        if (best && (best as { idx: number; ratio: number }).ratio > 0.4) {
          setActive((best as { idx: number; ratio: number }).idx);
        }
      },
      { root: track, threshold: [0.25, 0.5, 0.75, 1] }
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollToIdx = useCallback((idx: number) => {
    const card = cardRefs.current[idx];
    const track = trackRef.current;
    if (!card || !track) return;
    const left =
      card.offsetLeft -
      (track.clientWidth - card.clientWidth) / 2 +
      // Nudge the first card to align left, last card to align right.
      (idx === 0 ? -24 : idx === STEPS.length - 1 ? 24 : 0);
    track.scrollTo({ left, behavior: "smooth" });
  }, []);

  const next = () => scrollToIdx(Math.min(active + 1, STEPS.length - 1));
  const prev = () => scrollToIdx(Math.max(active - 1, 0));

  return (
    <section
      id="process"
      className="relative border-b border-[var(--line)] bg-cloud/30 py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="The Build System"
          title={
            <>
              Five phases.{" "}
              <em className="font-display italic text-gold-deep">
                One accountable team.
              </em>
            </>
          }
          subtitle="Each phase ships with a real artifact you can review before the next one starts."
        />
      </div>

      {/* Desktop arrows + dot pagination */}
      <div className="wrap mb-4 hidden items-center justify-between md:flex">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.num}
              type="button"
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to phase ${i + 1}: ${s.title}`}
              aria-current={active === i ? "step" : undefined}
              className={cn(
                "h-2 rounded-full transition-all",
                active === i
                  ? "w-8 bg-gold"
                  : "w-2 bg-[var(--line)] hover:bg-gold/50"
              )}
            />
          ))}
          <span className="ml-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-text">
            Phase {String(active + 1).padStart(2, "0")} / 05 · {STEPS[active].title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous phase"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white/85 text-navy transition-all hover:border-gold hover:text-gold-deep disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={active === STEPS.length - 1}
            aria-label="Next phase"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white/85 text-navy transition-all hover:border-gold hover:text-gold-deep disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cards container.
          Mobile (< md): vertical stack, every card visible top-to-bottom.
          Desktop (>= md): native horizontal scroll-snap. Every card reachable.
      */}
      <div
        ref={trackRef}
        className={cn(
          "wrap grid gap-5 md:flex md:gap-6 md:overflow-x-auto md:px-7 md:pb-2",
          "md:[scroll-snap-type:x_mandatory] md:[scrollbar-width:none]"
        )}
        style={{
          // Hide WebKit scrollbar on desktop without affecting layout.
          // (mobile path is vertical grid and unaffected.)
        }}
        aria-label="Build pipeline phases"
      >
        {STEPS.map((s, i) => (
          <article
            key={s.num}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            data-idx={i}
            className={cn(
              "relative flex w-full shrink-0 flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 p-7 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)]",
              "md:min-h-[560px] md:w-[min(460px,80vw)] md:[scroll-snap-align:center]",
              i === 0 && "md:[scroll-snap-align:start]",
              i === STEPS.length - 1 && "md:[scroll-snap-align:end]"
            )}
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
              {s.body}
            </p>
            <div className="mt-6 grow rounded-2xl border border-[var(--line)] bg-cloud/60 p-4">
              <s.Artifact />
            </div>
          </article>
        ))}
      </div>

      {/* Mobile phase counter */}
      <div className="wrap mt-6 flex justify-center md:hidden">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-text">
          5 phases · scroll to read each
        </span>
      </div>

      <style jsx global>{`
        #process [aria-label="Build pipeline phases"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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

// Two brand-board mini-cards, side by side. Shows the SYSTEM is the constant,
// not the colors. Left = Ownly's own system. Right = a sample client system.
function DesignArtifact() {
  return (
    <div className="grid gap-3">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-gold-deep">
        Every client gets their own system
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <MiniBoard
          label="Ownly Web Studio"
          swatches={["#0B2545", "#C5A05A", "#F5F7FA", "#00843D"]}
          ramp="Aa"
          rampStyle={{ fontFamily: "var(--font-display)" }}
          fonts="Playfair · Inter"
        />
        <MiniBoard
          label="Sample · Coastal Hotel"
          swatches={["#134E4A", "#E7CFA9", "#FAF8F3", "#E76F51"]}
          ramp="Aa"
          rampStyle={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
          fonts="Cormorant · Lato"
        />
      </div>
      <p className="text-[10px] font-medium text-slate-text">
        Sample boards. Your system is built from scratch to match your brand.
      </p>
    </div>
  );
}

function MiniBoard({
  label,
  swatches,
  ramp,
  rampStyle,
  fonts,
}: {
  label: string;
  swatches: string[];
  ramp: string;
  rampStyle: React.CSSProperties;
  fonts: string;
}) {
  return (
    <div className="grid gap-2 rounded-lg border border-[var(--line)] bg-white p-3">
      <div className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-navy">
        {label}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {swatches.map((s) => (
          <div
            key={s}
            className="aspect-square rounded-sm border border-[var(--line)]"
            style={{ background: s }}
          />
        ))}
      </div>
      <div className="flex items-end justify-between gap-2 border-t border-[var(--line)] pt-2">
        <span className="text-2xl leading-none text-navy" style={rampStyle}>
          {ramp}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-text">
          {fonts}
        </span>
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
