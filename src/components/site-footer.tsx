"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { InstagramMark, LinkedInMark, XMark } from "@/components/brand-icons";

const EXPLORE = [
  { label: "System", href: "#system" },
  { label: "Specialists", href: "#bench" },
  { label: "Examples", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const INFO = [
  { label: "About Ownly ONCE", href: "https://ownly1nce.com", external: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
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
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-white/10 p-1.5">
              <Image
                src="/assets/ownly-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </span>
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
            Plain English in, premium websites out. Custom strategy, visuals,
            SEO, agents, and a launch path you own.
          </p>
          <div className="mt-5 flex gap-2">
            <SocialIcon href={SITE.socials.linkedin} label="LinkedIn"><LinkedInMark className="h-4 w-4" /></SocialIcon>
            <SocialIcon href={SITE.socials.x} label="X"><XMark className="h-4 w-4" /></SocialIcon>
            <SocialIcon href={SITE.socials.instagram} label="Instagram"><InstagramMark className="h-4 w-4" /></SocialIcon>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-light">
            Explore
          </h4>
          <ul className="mt-4 grid gap-2.5">
            {EXPLORE.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-light">
            Information
          </h4>
          <ul className="mt-4 grid gap-2.5">
            {INFO.map((l) => (
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

        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold-light">
            Contact
          </h4>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li>
              <Link href={`mailto:${SITE.email}`} className="text-white/75 hover:text-white">
                {SITE.email}
              </Link>
            </li>
            <li>
              <Link href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="text-white/75 hover:text-white">
                {SITE.phoneDisplay}
              </Link>
            </li>
            <li>
              <Link
                href={SITE.calendly}
                target="_blank"
                rel="noopener"
                className="text-gold-light hover:text-white"
              >
                Book a call
              </Link>
            </li>
          </ul>
          <Button asChild variant="gold" className="mt-5">
            <Link href="#brief">Start the Free Mockup</Link>
          </Button>
        </div>
      </div>

      <div className="wrap mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[11px] text-white/55 md:flex-row">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} {SITE.legalName}. {SITE.ownerCreds}. Results
          depend on industry, market, offer, traffic, and follow-up. Specific outcomes vary.
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

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
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
