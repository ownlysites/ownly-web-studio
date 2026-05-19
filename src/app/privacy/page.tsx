import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy for ${SITE.name}, a service of ${SITE.legalName}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="wrap-tight pt-40 pb-24">
      <Link href="/" className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
        ← Back home
      </Link>
      <h1 className="mt-6 font-display text-5xl font-bold text-navy">Privacy</h1>
      <p className="mt-4 text-sm text-slate-text">Last updated: 2026-05-18</p>
      <div className="prose prose-slate mt-10 max-w-none text-base leading-relaxed text-slate-text">
        <p>
          {SITE.name} is operated by {SITE.legalName}. We collect the minimum information needed
          to respond to your build request: the data you enter in the brief form (name, email,
          phone, business, industry, budget, current site, goal, style direction) and standard
          server logs (IP, user-agent, timestamp).
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">What we store</h2>
        <p>
          Brief submissions are written to a Supabase Postgres database we operate. We do not
          sell or share this data. Server logs are retained for 30 days for security and abuse
          detection.
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">Cookies</h2>
        <p>
          This site does not use third-party tracking cookies. We use a small set of first-party
          functional cookies (theme, session) only as needed.
        </p>
        <h2 className="font-display text-2xl font-bold text-navy">Contact</h2>
        <p>
          Email <a className="text-gold-deep underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> for any
          privacy request, including data deletion. We respond within 7 days.
        </p>
      </div>
    </main>
  );
}
