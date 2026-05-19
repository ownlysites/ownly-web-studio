"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";
import { OwnlyMark } from "@/components/brand-icons";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--line)] bg-white/85 py-3 backdrop-blur-xl"
          : "py-5 bg-transparent"
      )}
    >
      <div className="wrap flex items-center justify-between gap-5">
        <Link
          href="#top"
          className="flex min-w-0 items-center gap-3"
          aria-label={`${SITE.name} home`}
        >
          <OwnlyMark className={cn("transition-all", scrolled ? "h-9 w-9" : "h-10 w-10")} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[18px] font-semibold tracking-tight text-navy">
              Ownly Web Studio
            </span>
            <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.2em] text-gold-deep">
              A service of {SITE.legalName}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-slate-text transition-colors hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="default" className="hidden sm:inline-flex">
            <Link href="#brief">Start a Build</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white/70 text-navy lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-white/95 backdrop-blur-xl lg:hidden"
        >
          <div className="wrap flex flex-col gap-1 py-3">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
                className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-cloud"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="gold" className="mt-2">
              <Link href="#brief" onClick={() => setOpen(false)}>
                Start a Build
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
