import { SITE, CTAS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="dark-grain mt-24" style={{ background: "var(--ink-deep)", color: "#FAF7EE" }}>
      <div className="container-page py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow eyebrow-rule" style={{ color: "var(--gold-soft)" }}>
              The Colophon
            </p>
            <h3 className="font-display mt-3" style={{ fontSize: 36, lineHeight: 1.1, color: "#FAF7EE" }}>
              Ownly <em style={{ color: "var(--gold-soft)" }}>Web Studio</em>
            </h3>
            <p className="mt-4 text-sm" style={{ color: "rgba(250,247,238,0.7)", lineHeight: 1.65 }}>
              A studio of <em style={{ color: "var(--gold-soft)" }}>{SITE.org}</em>. We build editorial-grade websites with AI agents,
              SEO, and conversion tracking baked in — for owners who refuse to buy another Squarespace.
            </p>
            <p className="font-mono mt-6 text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-soft)" }}>
              {SITE.issue}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>The Studio</p>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "rgba(250,247,238,0.85)" }}>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#examples" className="hover:text-white">Examples</a></li>
              <li><a href="#process" className="hover:text-white">Process</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#mockup" className="hover:text-white">Free mockup</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>Reach the desk</p>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "rgba(250,247,238,0.85)" }}>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone.replace(/\D/g,"")}`} className="hover:text-white">{SITE.phone}</a></li>
              <li className="pt-2">
                <a href={CTAS.sitDown} data-frame="modal" className="btn-secondary inline-flex" style={{ color: "#FAF7EE", borderColor: "rgba(201,168,76,0.45)" }}>
                  Book a 6 Figure Sit Down
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-xs" style={{ borderTop: "1px solid rgba(201,168,76,0.25)", color: "rgba(250,247,238,0.55)" }}>
          <p>© {new Date().getFullYear()} {SITE.org}. {SITE.founder}.</p>
          <p className="mt-2 md:mt-0">Florida · United States · Editorial-grade web for owners who can tell.</p>
        </div>
      </div>
    </footer>
  );
}
