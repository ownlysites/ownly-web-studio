"use client";

import { useEffect, useState } from "react";
import { SITE, CTAS } from "@/lib/site";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#examples", label: "Examples" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 transition-all"
      style={{
        background: scrolled ? "rgba(253,252,248,0.85)" : "transparent",
        backdropFilter: scrolled ? "saturate(150%) blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="container-page flex items-center justify-between py-4">
        <a href="/" className="flex items-baseline gap-3">
          <span
            className="font-display text-2xl"
            style={{ color: "var(--ink)", fontWeight: 500 }}
          >
            Ownly <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Web Studio</em>
          </span>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-mute)" }}>
            {SITE.issue}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--ink)" }}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:opacity-70 transition-opacity">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CTAS.sitDown}
            data-frame="modal"
            className="hidden md:inline-block text-sm font-semibold"
            style={{ color: "var(--ink-mid)" }}
          >
            Talk it out →
          </a>
          <a href="#mockup" className="btn-primary">
            Get my free mockup <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
