"use client";

import { useEffect, useRef, useState } from "react";
import { INDUSTRIES } from "@/lib/industries";

function Tile({
  industry,
  index,
}: {
  industry: typeof INDUSTRIES[number];
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.05 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Touch devices: don't autoplay loops. Instead, play once when the tile is
  // in the viewport, then pause. Avoids battery drain from concurrent loops
  // and respects iOS Safari autoplay-with-sound restrictions.
  useEffect(() => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) return;

    // Pause when ended (we removed loop attribute on touch via render below)
    const onEnded = () => v.pause();
    v.addEventListener("ended", onEnded);

    const playObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // Best-effort; ignore promise rejections (e.g. user-gesture required)
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.05 }
    );
    playObs.observe(v);
    return () => {
      playObs.disconnect();
      v.removeEventListener("ended", onEnded);
    };
  }, [inView]);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    <article
      ref={ref}
      className="tile-frame"
      style={{
        background: "var(--paper-bone)",
        border: "1px solid var(--hairline)",
        borderRadius: 14,
        padding: 14,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid var(--hairline)",
        }}
      >
        {/* iframe always present so it can load lazily */}
        {inView && (
          <iframe
            src={industry.iframe}
            title={`Live preview: ${industry.label}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
              opacity: hover ? 0 : 1,
              transition: "opacity .35s ease",
              pointerEvents: hover ? "none" : "auto",
              background: "#fff",
            }}
          />
        )}
        {/* Hover loop (desktop). Touch devices: play-once via IO above. */}
        {inView && (
          <video
            ref={videoRef}
            src={industry.loop}
            muted
            loop={!isTouch}
            playsInline
            preload="none"
            autoPlay={!isTouch}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isTouch ? 1 : hover ? 1 : 0,
              transition: "opacity .35s ease",
              pointerEvents: "none",
              background: "#0F1F39",
            }}
          />
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p
            className="font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--gold-dark)" }}
          >
            {String(index + 1).padStart(2, "0")} · {industry.label}
          </p>
          <p
            className="mt-1"
            style={{
              fontSize: 13,
              color: "var(--ink)",
              maxHeight: hover ? 60 : 18,
              overflow: "hidden",
              transition: "max-height .35s ease",
            }}
          >
            {hover ? industry.description : industry.short}
          </p>
        </div>
        <a
          href={industry.iframe}
          target="_blank"
          rel="noopener"
          className="text-xs font-semibold whitespace-nowrap"
          style={{ color: "var(--ink-mid)" }}
        >
          See the build →
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 78,
          height: 1,
          background: "var(--hairline)",
        }}
      />
    </article>
  );
}

export default function Gallery() {
  return (
    <section id="examples" className="py-24" style={{ background: "var(--paper-warm)" }}>
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-rule">THE GALLERY</p>
            <h2 className="font-display mt-4" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
              Any industry. <em style={{ color: "var(--gold)", fontStyle: "italic" }}>One standard.</em>
            </h2>
            <p className="mt-5" style={{ color: "var(--text-mute)", fontSize: 16, lineHeight: 1.7 }}>
              Every page below is a real Next.js build, deployed live, fully responsive, AI-agent ready.
              Hover any tile to play a five-second preview.
            </p>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-dark)" }}>
            01 — 08 · Live deploys
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <Tile key={ind.slug} industry={ind} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
