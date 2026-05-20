import Image from "next/image";

type Service = {
  eyebrow: string;
  emoji: string;
  title: React.ReactNode;
  body: string;
  from: string;
  illustration: string;
  id: string;
};

const SERVICES: Service[] = [
  {
    id: "lead",
    eyebrow: "LANDING + LEAD",
    emoji: "⚡",
    title: <>Lead Page that <em style={{ color: "var(--gold)", fontStyle: "italic" }}>converts.</em></>,
    body: "Single-purpose, fast load, A/B-ready, AI chat agent embedded, DBC pipeline tag wired.",
    from: "From $1,500",
    illustration: "/illustrations/svc_lead.png",
  },
  {
    id: "industry",
    eyebrow: "INDUSTRY SITE",
    emoji: "📐",
    title: <>Full <em style={{ color: "var(--gold)", fontStyle: "italic" }}>industry</em> site.</>,
    body: "5–8 pages, services, gallery, intake, AI agent trained on your business, SEO sprint, analytics.",
    from: "From $5,000",
    illustration: "/illustrations/svc_industry.png",
  },
  {
    id: "bespoke",
    eyebrow: "BESPOKE BUILD",
    emoji: "✦",
    title: <>A site built <em style={{ color: "var(--gold)", fontStyle: "italic" }}>like a product.</em></>,
    body: "Next.js + Supabase + custom CMS, advanced AI agent, Stripe, member portal, dashboards.",
    from: "From $15,000",
    illustration: "/illustrations/svc_bespoke.png",
  },
  {
    id: "agent",
    eyebrow: "AI AGENT ONLY",
    emoji: "🤖",
    title: <>An <em style={{ color: "var(--gold)", fontStyle: "italic" }}>agent</em> for your existing site.</>,
    body: "Train CustomGPT.ai on your docs, embed widget, route hot leads to DBC, no rebuild needed.",
    from: "From $2,500 + $497/mo",
    illustration: "/illustrations/svc_agent.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ background: "var(--paper-cream)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule">THE SERVICE LINE</p>
          <h2 className="font-display mt-4" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
            Four ways to ship something that <em style={{ color: "var(--gold)", fontStyle: "italic" }}>looks like you mean it.</em>
          </h2>
          <p className="mt-5 text-base" style={{ color: "var(--text-mute)", lineHeight: 1.7 }}>
            One studio. Four build tiers. Pick by outcome — Lead Page closes one offer, Industry Site replaces your entire web presence,
            Bespoke acts like a product, and AI Agent grafts the brain onto whatever you already have.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7 mt-14">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              className="relative tile-frame"
              style={{
                background: "var(--paper-bone)",
                border: "1px solid var(--hairline)",
                borderRadius: 16,
                padding: 28,
                paddingTop: 24,
              }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="shrink-0 overflow-hidden"
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 12,
                    background: "var(--paper-warm)",
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <Image
                    src={s.illustration}
                    alt=""
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="eyebrow">
                    <span style={{ marginRight: 6 }}>{s.emoji}</span>
                    {s.eyebrow}
                  </p>
                  <h3
                    className="font-display mt-3"
                    style={{ fontSize: 30, lineHeight: 1.1, color: "var(--ink)", fontWeight: 500 }}
                  >
                    {s.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-[15px]" style={{ color: "var(--ink)", lineHeight: 1.7, opacity: 0.85 }}>
                {s.body}
              </p>

              <div className="mt-6 flex items-center justify-between pt-5" style={{ borderTop: "1px solid var(--hairline)" }}>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-dark)" }}>
                  {s.from}
                </span>
                <a href="#mockup" className="text-sm font-semibold" style={{ color: "var(--ink-mid)" }}>
                  Get this built →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
