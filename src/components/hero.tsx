"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROMPT_TEXT =
  "Build a premium site for a Sarasota HVAC company. Use navy + gold, custom 3D HVAC visuals, local SEO, click-to-call.";

const STATUS_PILLS = [
  "Logo loaded",
  "Competitors scanned",
  "SEO mapped",
  "Agent path ready",
];

const TRUST_CHIPS = ["CFEI", "PFSA", "Author of 5 books"];

export function Hero() {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(reduced ? PROMPT_TEXT : "");
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(reduced ? 3 : 0);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;

    const loop = async () => {
      while (!cancelled) {
        // type
        setTyped("");
        setStage(0);
        for (let i = 0; i <= PROMPT_TEXT.length; i++) {
          if (cancelled) return;
          setTyped(PROMPT_TEXT.slice(0, i));
          await wait(20 + Math.random() * 24);
        }
        await wait(450);
        // render stages: skeleton -> wireframe -> final
        for (const s of [1, 2, 3] as const) {
          if (cancelled) return;
          setStage(s);
          await wait(900);
        }
        await wait(1800);
      }
    };

    loop();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <header id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]"
        style={{
          background:
            "radial-gradient(800px 460px at 70% 0%, rgb(197 160 90 / 0.22), transparent 60%), radial-gradient(720px 460px at 8% 14%, rgb(27 60 115 / 0.18), transparent 64%)",
        }}
      />
      <div className="wrap relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.95fr)] lg:gap-14 lg:py-24">
        {/* Left */}
        <div>
          <Badge variant="default" className="mb-6">
            <Sparkles className="h-3 w-3" /> 6 Figure Sit Down Method · F.A.C.T.
          </Badge>
          <h1 className="font-display text-[clamp(48px,7.4vw,96px)] font-extrabold leading-[0.92] tracking-tight text-navy text-balance">
            Talk it out.{" "}
            <span className="bg-gradient-to-br from-gold-deep via-gold to-gold-light bg-clip-text text-transparent">
              Ship a site
            </span>{" "}
            that feels built by a team.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate text-balance">
            <strong className="text-navy">
              Ownly Web Studio turns plain English into premium custom websites,
              custom visuals, SEO structure, booking flows, and AI agent-ready
              launch systems.
            </strong>{" "}
            You bring the business. Princeton turns it into a market-aware site
            that looks established before the first sales call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href="#brief">
                Start the Free Mockup <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#system">See the Build System</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-6">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate">
              Built by Dave Ivery
            </span>
            {TRUST_CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--gold-line)] bg-white/70 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-gold-deep"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Live build workspace */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[28px] border border-[var(--gold-line)] bg-gradient-to-b from-white/95 via-white/85 to-cloud/90 p-4 shadow-[0_32px_90px_rgb(11_37_69_/_0.18)] backdrop-blur-xl sm:p-5"
            aria-label="Live build workspace"
          >
            <div className="grid-overlay grid-overlay-fade pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex items-center justify-between pb-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-silver" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-soft" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-green">
                <span className="relative h-2 w-2 rounded-full bg-green-soft">
                  <span className="absolute inset-0 animate-ping rounded-full bg-green-soft opacity-60" />
                </span>
                Princeton is building
              </div>
            </div>

            {/* Prompt */}
            <div className="relative rounded-3xl border border-[var(--line)] bg-white p-4 shadow-[0_22px_58px_rgb(11_37_69_/_0.08)]">
              <div className="mb-3 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.11em] text-slate">
                <span>Plain-English brief</span>
                <span className="rounded-full bg-cloud px-2 py-0.5 text-gold-deep">
                  Ownly Build OS
                </span>
              </div>
              <div className="relative min-h-[124px] rounded-2xl border border-[var(--line)] bg-gradient-to-b from-white to-cloud p-4 text-[15px] leading-relaxed text-navy">
                <span>{typed}</span>
                {!reduced && (
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-gold" />
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUS_PILLS.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={
                      reduced || stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                    }
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-navy"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {s} ✓
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Workspace render */}
            <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-3">
              <div className="relative rounded-2xl border border-[var(--line)] bg-gradient-to-b from-navy via-navy-deep to-navy p-3 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)]">
                <PreviewRender stage={stage} reduced={!!reduced} />
              </div>
              <div className="grid gap-3">
                <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-3 shadow-[0_16px_38px_rgb(11_37_69_/_0.08)]">
                  <h3 className="text-xs font-bold text-navy">Launch checklist</h3>
                  <ul className="mt-3 grid gap-2.5">
                    {["Offer + buyer hesitation mapped", "Custom media drafted", "Booking + follow-up wired"].map(
                      (l, i) => (
                        <li key={l} className="flex items-start gap-2 text-[11px] text-slate">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-gold text-[10px] font-extrabold text-navy">
                            {i + 1}
                          </span>
                          <span className="leading-snug">{l}</span>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cloud">
                    <motion.div
                      initial={{ width: "12%" }}
                      animate={{ width: stage >= 3 ? "92%" : stage >= 2 ? "68%" : stage >= 1 ? "40%" : "12%" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-gold via-gold-light to-green-soft"
                    />
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-3 shadow-[0_16px_38px_rgb(11_37_69_/_0.08)]">
                  <h3 className="text-xs font-bold text-navy">Category signal</h3>
                  <p className="mt-2 text-[11px] leading-snug text-slate">
                    Built like a product interface, not a brochure template. Visitor sees the system working before they read every word.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 hidden h-20 w-20 place-items-center rounded-2xl border border-[var(--gold-line)] bg-white p-2 shadow-[0_22px_58px_rgb(11_37_69_/_0.18)] md:grid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/ownly-logo.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function PreviewRender({ stage, reduced }: { stage: 0 | 1 | 2 | 3; reduced: boolean }) {
  const lvl = reduced ? 3 : stage;
  return (
    <div className="grid h-full min-h-[280px] gap-2 rounded-xl bg-white p-3">
      {/* nav */}
      <div className="flex items-center justify-between border-b border-cloud pb-2">
        <div className={skel("h-3 w-24", lvl >= 1)} />
        <div className="flex gap-1.5">
          <div className={skel("h-2 w-8", lvl >= 1)} />
          <div className={skel("h-2 w-8", lvl >= 1)} />
          <div className={skel("h-2 w-12", lvl >= 2, "gold")} />
        </div>
      </div>
      {/* hero */}
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-2">
        <div className="rounded-md bg-cloud p-3">
          <div className={skel("mb-2 h-1.5 w-16", lvl >= 1, "gold")} />
          <div className={skel("mb-2 h-7 w-full", lvl >= 1, "navy")} />
          <div className={skel("h-1.5 w-full", lvl >= 2)} />
          <div className={skel("mt-1.5 h-1.5 w-3/4", lvl >= 2)} />
        </div>
        <div
          className={`relative overflow-hidden rounded-md transition-all duration-700 ${
            lvl >= 3 ? "bg-gradient-to-br from-green to-green-soft" : "bg-cloud"
          }`}
        >
          {lvl >= 3 && (
            <div
              className="absolute inset-x-0 bottom-2 mx-auto h-2.5 w-3/5 rounded-full bg-white/70"
              aria-hidden
            />
          )}
        </div>
      </div>
      {/* cards */}
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-md border border-cloud p-2"
          >
            <div className={skel("mb-1.5 h-4 w-full", lvl >= 1)} />
            <div className={skel("h-1.5 w-2/3", lvl >= 2, "navy")} />
            <div className={skel("mt-1 h-1.5 w-1/2", lvl >= 2)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function skel(size: string, visible: boolean, tone: "default" | "gold" | "navy" = "default") {
  const bg =
    tone === "gold" ? "bg-gold" : tone === "navy" ? "bg-navy" : "bg-cloud";
  return `${size} rounded-full ${
    visible ? bg : "bg-[rgb(11_37_69_/_0.06)] animate-pulse"
  } transition-colors duration-500`;
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
