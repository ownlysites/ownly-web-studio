"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { OwnlyMark, LinkedInMark, XMark, GithubMark } from "@/components/brand-icons";

const COLS = [
  {
    title: "Work",
    links: [
      { label: "Industry showcase", href: "#studio" },
      { label: "Featured clients", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Brief form", href: "#brief" },
      { label: "GitHub", href: SITE.socials.github, external: true },
      { label: "About Ownly ONCE", href: "https://ownly1nce.com", external: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: SITE.email, href: `mailto:${SITE.email}` },
      { label: SITE.phoneDisplay, href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}` },
      { label: "Book a call", href: SITE.calendly, external: true },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-navy pt-16 pb-8 text-white/75">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="#top" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
            <OwnlyMark className="h-11 w-11" />
            <span className="flex flex-col">
              <span className="font-display text-xl font-bold leading-none text-white">
                Ownly Web Studio
              </span>
              <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-light">
                A service of {SITE.legalName}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Custom websites built like product. Built, shipped, and supported in {SITE.city}.
          </p>
          <div className="mt-5 flex gap-2">
            <Social href={SITE.socials.linkedin} label="LinkedIn"><LinkedInMark className="h-4 w-4" /></Social>
            <Social href={SITE.socials.x} label="X"><XMark className="h-4 w-4" /></Social>
            <Social href={SITE.socials.github} label="GitHub"><GithubMark className="h-4 w-4" /></Social>
          </div>
          <Button asChild variant="gold" className="mt-5">
            <Link href="#brief">Start a Build</Link>
          </Button>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-light">
              {col.title}
            </h4>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener" : undefined}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wrap mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-white/55 md:flex-row">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} {SITE.legalName}. {SITE.founder}, {SITE.founderCreds}. Built with Next.js + Vercel + Supabase. Results depend on industry, market, offer, traffic, and follow-up.
        </p>
        <Link
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/85 transition-colors hover:border-gold hover:text-gold-light"
        >
          <ArrowUp className="h-3 w-3" />
          Back to top
        </Link>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener"
      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-light"
    >
      {children}
    </Link>
  );
}
