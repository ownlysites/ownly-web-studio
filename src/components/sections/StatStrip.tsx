const STATS = [
  { num: "8", label: "Industries shipped" },
  { num: "<14d", label: "Build cycle (lead pages)" },
  { num: "100%", label: "AI agent embedded" },
  { num: "95+", label: "Lighthouse target" },
  { num: "6", label: "Custom builds active" },
  { num: "24h", label: "Mockup turnaround" },
  { num: "$1.5K", label: "Entry tier" },
  { num: "25K+", label: "Bespoke ceiling" },
];

export default function StatStrip() {
  return (
    <section className="hairline-top hairline-bottom" style={{ background: "var(--paper-bone)" }}>
      <div className="container-page py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-left">
              <div
                className="font-display"
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: "var(--gold)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.num}
              </div>
              <div
                className="font-mono mt-2 uppercase"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--text-mute)",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
