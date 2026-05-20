"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    n: "01",
    label: "The Sit Down",
    body: "30-minute Calendly. We listen. We surface F.A.C.T. gaps in your current presence.",
    badge: "$0",
    img: "/illustrations/step_1_sitdown.png",
  },
  {
    n: "02",
    label: "The Mockup",
    body: "Editorial mockup in 24 hours. Free. No card. We send it back as a real link, not a screenshot.",
    badge: "$0",
    img: "/illustrations/step_2_mockup.png",
  },
  {
    n: "03",
    label: "The Build",
    body: "Next.js + Tailwind + shadcn + AI agent + DBC pipeline. 7 to 14 days for lead pages, 3 to 4 weeks for full sites.",
    badge: "7–28 days",
    img: "/illustrations/step_3_build.png",
  },
  {
    n: "04",
    label: "The Launch",
    body: "Vercel deploy. Analytics on. SEO sprint complete. Apollo tracker live. We hand you the keys and walk you through.",
    badge: "Day one live",
    img: "/illustrations/step_4_launch.png",
  },
  {
    n: "05",
    label: "The Engine",
    body: "Monthly performance review, agent retraining, content velocity. Optional — most owners take it.",
    badge: "$497/mo",
    img: "/illustrations/step_5_engine.png",
  },
];

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !wrapRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    const wrap = wrapRef.current;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const scrollLen = () => track.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track, {
        x: () => -scrollLen(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + scrollLen(),
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" style={{ background: "var(--paper-bone)" }} className="hairline-top">
      <div className="container-page pt-24 pb-10">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule">THE WORKBENCH</p>
          <h2 className="font-display mt-4" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
            From a 30-minute Sit Down to <em style={{ color: "var(--gold)", fontStyle: "italic" }}>a site that runs the room.</em>
          </h2>
          <p className="mt-5" style={{ color: "var(--text-mute)", fontSize: 16, lineHeight: 1.7 }}>
            Five steps. No agency theater. Scroll the bench →
          </p>
        </div>
      </div>

      <div ref={wrapRef} style={{ position: "relative", overflow: "hidden" }}>
        <div
          ref={trackRef}
          className="flex gap-8 px-6 lg:px-10 pb-24"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="shrink-0"
              style={{
                width: "min(560px, 85vw)",
                background: "var(--paper-cream)",
                border: "1px solid var(--hairline)",
                borderRadius: 18,
                padding: 28,
              }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="shrink-0 overflow-hidden"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 12,
                    border: "1px solid var(--hairline)",
                    background: "var(--paper-warm)",
                  }}
                >
                  <Image
                    src={s.img}
                    alt=""
                    width={240}
                    height={240}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className="font-mono uppercase"
                      style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--gold-dark)" }}
                    >
                      Step {s.n}
                    </p>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        padding: "4px 10px",
                        border: "1px solid var(--hairline)",
                        borderRadius: 999,
                        color: "var(--gold-dark)",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <h3
                    className="font-display mt-3"
                    style={{ fontSize: 32, lineHeight: 1.1, color: "var(--ink)", fontWeight: 500 }}
                  >
                    {s.label}
                  </h3>
                </div>
              </div>
              <p
                className="mt-6"
                style={{ color: "var(--ink)", fontSize: 15, lineHeight: 1.7, opacity: 0.85 }}
              >
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
