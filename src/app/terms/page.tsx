import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of service for ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="wrap-tight pt-40 pb-24">
      <Link href="/" className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
        ← Back home
      </Link>
      <h1 className="mt-6 font-display text-5xl font-bold text-navy">Terms</h1>
      <p className="mt-4 text-sm text-slate-text">Last updated: 2026-05-18</p>
      <div className="prose prose-slate mt-10 max-w-none text-base leading-relaxed text-slate-text">
        <p>
          By engaging {SITE.name} (a service of {SITE.legalName}), you agree to the following
          standard terms. Custom engagements may add a signed Statement of Work; the SOW
          supersedes the public terms below for that engagement.
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">Scope of work</h2>
        <p>
          Each build ships as a working website at a tier defined on the Pricing section.
          Scope creep is handled by written change order. The free mockup is a sample only and
          does not obligate either party to a full engagement.
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">Code ownership</h2>
        <p>
          Upon final payment, all code, designs, and assets created specifically for your build
          are transferred to you. Reusable infrastructure components, design tokens, and
          internal tooling remain property of {SITE.legalName}.
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">Liability</h2>
        <p>
          Results depend on industry, market, offer, traffic, and follow-up. We do not guarantee
          specific business outcomes. Our liability is capped at the amount paid for the
          relevant engagement.
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">Contact</h2>
        <p>
          Questions:{" "}
          <a className="text-gold-deep underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    </main>
  );
}
