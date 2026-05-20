const ROWS = [
  {
    build: "Lead Page",
    includes: "1 page, AI chat, DBC tag, analytics",
    investment: "$1,500 – $2,500",
    cycle: "<14 days",
  },
  {
    build: "Industry Site",
    includes: "5–8 pages, AI agent, SEO sprint, intake",
    investment: "$5,000 – $10,000",
    cycle: "3–4 weeks",
  },
  {
    build: "Bespoke Build",
    includes: "Custom CMS, Stripe, member portal, dashboards",
    investment: "$15,000 – $25,000+",
    cycle: "6–10 weeks",
  },
  {
    build: "AI Agent Only",
    includes: "CustomGPT.ai training + embed + DBC routing",
    investment: "$2,500 + $497/mo",
    cycle: "10 days",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ background: "var(--paper-cream)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule">THE COUNTING ROOM</p>
          <h2 className="font-display mt-4" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
            Pricing, in <em style={{ color: "var(--gold)", fontStyle: "italic" }}>plain English.</em>
          </h2>
          <p className="mt-5" style={{ color: "var(--text-mute)", fontSize: 15, lineHeight: 1.7 }}>
            No tiered cards. No teaser asterisks. Read the row, decide if it fits, book the Sit Down.
          </p>
        </div>

        <div
          className="mt-12 overflow-hidden"
          style={{ border: "1px solid var(--hairline)", borderRadius: 16, background: "var(--paper-bone)" }}
        >
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--paper-warm)" }}>
                {["Build", "Includes", "Investment", "Cycle"].map((h) => (
                  <th
                    key={h}
                    className="font-mono text-left uppercase"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      color: "var(--gold-dark)",
                      padding: "16px 20px",
                      borderBottom: "1px solid var(--hairline)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.build} style={{ borderBottom: i === ROWS.length - 1 ? "none" : "1px solid var(--hairline)" }}>
                  <td className="font-display" style={{ fontSize: 22, fontWeight: 500, color: "var(--ink)", padding: "22px 20px" }}>
                    {r.build}
                  </td>
                  <td style={{ fontSize: 14, color: "var(--ink)", padding: "22px 20px", opacity: 0.85, lineHeight: 1.6 }}>
                    {r.includes}
                  </td>
                  <td className="font-mono" style={{ fontSize: 13, color: "var(--gold-dark)", padding: "22px 20px", letterSpacing: "0.05em" }}>
                    {r.investment}
                  </td>
                  <td className="font-mono" style={{ fontSize: 12, color: "var(--text-mute)", padding: "22px 20px", letterSpacing: "0.1em" }}>
                    {r.cycle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--text-mute)" }}>
          All builds include a 30-day post-launch shakedown · invoices via Stripe · 50% deposit
        </p>
      </div>
    </section>
  );
}
