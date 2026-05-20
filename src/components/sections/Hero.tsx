import { SITE, CTAS } from "@/lib/site";
import HeroMacBook from "./HeroMacBook";

export default function Hero() {
  return (
    <section className="relative" style={{ background: "var(--paper-warm)" }}>
      <div className="container-page grid lg:grid-cols-12 gap-10 lg:gap-14 py-20 lg:py-28">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-dark)" }}>
            OWNLY WEB STUDIO · {SITE.issue}
          </p>

          <h1
            className="font-display mt-6"
            style={{
              fontWeight: 500,
              lineHeight: 1.02,
              fontSize: "clamp(48px, 7.5vw, 96px)",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Talk it out.
            <br />
            <em style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>
              Ship a site that feels built by a team.
            </em>
          </h1>

          <p className="mt-7 max-w-xl text-lg" style={{ color: "var(--ink)", lineHeight: 1.65, opacity: 0.86 }}>
            Custom Next.js sites with AI agents, SEO, and conversion tracking baked in.
            From $1,500 lead pages to $25K+ bespoke builds — for owners who refuse to buy
            another Squarespace.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#mockup" className="btn-primary">
              Get my free mockup <span aria-hidden>→</span>
            </a>
            <a href={CTAS.gallery} className="btn-secondary">
              See the gallery <span aria-hidden>→</span>
            </a>
          </div>

          <p className="mt-5 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--text-mute)" }}>
            24-hour mockup · no card · no obligation
          </p>
        </div>

        <div className="lg:col-span-5 flex items-center">
          <HeroMacBook />
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="container-page">
        <div style={{ height: 1, background: "var(--hairline)" }} />
      </div>
    </section>
  );
}
