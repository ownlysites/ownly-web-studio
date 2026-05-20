const QUOTES = [
  {
    quote: "We stopped second-guessing the brand the day Dave shipped the page. Bookings doubled in six weeks.",
    name: "Boutique hotelier",
    city: "Sarasota, FL",
    industry: "HOSPITALITY",
  },
  {
    quote: "Every prospect now lands on a page that does the talking for me. I close from a place of calm.",
    name: "RIA founder",
    city: "Tampa, FL",
    industry: "WEALTH",
  },
  {
    quote: "The AI agent answers our most-asked questions at 2 a.m. and routes the real ones to my pipeline before breakfast.",
    name: "HVAC owner",
    city: "Bradenton, FL",
    industry: "SERVICE TRADES",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: "var(--paper-warm)" }}>
      <div className="container-page">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow eyebrow-rule">THE CLIENT LEDGER</p>
          <h2 className="font-display mt-4" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
            What owners say <em style={{ color: "var(--gold)", fontStyle: "italic" }}>after launch.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {QUOTES.map((q) => (
            <figure
              key={q.industry}
              style={{
                background: "var(--paper-bone)",
                border: "1px solid var(--hairline)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <span
                aria-hidden
                className="font-display"
                style={{ fontSize: 48, lineHeight: 0.8, color: "var(--gold)", display: "block" }}
              >
                &ldquo;
              </span>
              <blockquote
                className="font-display italic mt-2"
                style={{ fontSize: 22, lineHeight: 1.35, color: "var(--ink)", fontWeight: 500 }}
              >
                {q.quote}
              </blockquote>
              <figcaption
                className="font-mono mt-6 uppercase"
                style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--gold-dark)" }}
              >
                — {q.name} · {q.city} · {q.industry}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
