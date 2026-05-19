"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";
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
        "sticky top-0 z-50 border-b border-transparent transition-all",
        scrolled
          ? "border-[var(--line)] bg-white/85 backdrop-blur-xl"
          : "bg-white/55 backdrop-blur-md"
      )}
    >
      <div className="wrap flex h-[74px] items-center justify-between gap-5">
        <Link
          href="#top"
          aria-label={`${SITE.name} home`}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--gold-line)] bg-white p-1 shadow-[0_14px_36px_rgb(11_37_69_/_0.12)]">
            <Image
              src="/assets/ownly-logo.png"
              alt="Ownly ONCE logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[22px] font-semibold tracking-tight text-navy">
              Ownly Web Studio
            </span>
            <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-deep">
              A service of Ownly ONCE
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate transition-colors hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="default" className="hidden sm:inline-flex">
            <Link href="#brief">Free Mockup</Link>
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.1em] text-navy hover:bg-cloud"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="gold" className="mt-2">
              <Link href="#brief" onClick={() => setOpen(false)}>
                Start the Free Mockup
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
