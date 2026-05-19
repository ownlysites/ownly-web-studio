"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { SectionHeader } from "./section-header";

const TIERS = [
  {
    tag: "Lead Page",
    name: "Fast Launch",
    price: "$750+",
    sub: "Typical starting range",
    blurb: "For one clear offer, service, campaign, or local lead funnel.",
    bullets: [
      "Single premium landing page",
      "Mobile-first conversion copy",
      "Booking or lead form path",
      "Local SEO + schema",
      "Vercel + GitHub handoff",
    ],
    cta: { label: "Request Mockup", href: "#brief", variant: "secondary" as const },
    featured: false,
  },
  {
    tag: "Signature Build",
    name: "Most Chosen",
    price: "$2,500+",
    sub: "Most chosen tier",
    blurb: "For businesses that need the site to become a serious trust and lead engine.",
    bullets: [
      "Homepage + core service sections",
      "Proof, FAQs, process, and CTAs",
      "Call/text, booking, and intake flow",
      "AI chat or voice agent option",
      "Per-page SEO + schema",
    ],
    cta: { label: "Request Mockup", href: "#brief", variant: "gold" as const },
    featured: true,
  },
  {
    tag: "Growth Build",
    name: "Custom System",
    price: "$5,000+",
    sub: "Scope based",
    blurb: "For multi-page sites, e-commerce, automations, portals, or bigger funnels.",
    bullets: [
      "Custom pages and integrations",
      "CRM, forms, payments, automations",
      "Programmatic SEO + content plan",
      "Quarterly improvement cadence",
      "Direct repo + Vercel ownership",
    ],
    cta: { label: "Book Strategy Call", href: SITE.calendly, variant: "secondary" as const },
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-b border-[var(--line)] py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="Pricing"
          title={
            <>
              Three tiers.{" "}
              <em className="font-display italic text-gold-deep">No hidden retainers.</em>
            </>
          }
          subtitle="Start with the mockup. Decide with your eyes. Below the cards: a retainer option if you want us on-call."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={t.featured ? "lg:-mt-3 lg:mb-3" : ""}
            >
              <Card
                className={`relative flex h-full flex-col p-7 ${
                  t.featured
                    ? "border-[rgb(197_160_90_/_0.55)] shadow-[0_30px_76px_rgb(197_160_90_/_0.2)]"
                    : ""
                }`}
              >
                {t.featured && (
                  <Badge variant="gold" className="absolute -top-3 left-7">
                    Most Chosen
                  </Badge>
                )}
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
                  {t.tag}
                </div>
                <h3 className="mt-2 text-2xl font-bold text-navy">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-text">
                  {t.blurb}
                </p>
                <div className="mt-5 font-display text-5xl font-bold leading-none text-navy">
                  {t.price}
                </div>
                <div className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.1em] text-slate-text">
                  {t.sub}
                </div>
                <ul className="my-6 grid flex-1 gap-3">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-irish/10 text-green-irish">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="leading-snug text-slate-text">{b}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={t.cta.variant} className="w-full">
                  <Link
                    href={t.cta.href}
                    target={t.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={t.cta.href.startsWith("http") ? "noopener" : undefined}
                  >
                    {t.cta.label}
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 rounded-3xl border border-[var(--line)] bg-cloud/70 p-6 text-center text-sm leading-relaxed text-slate-text md:p-7">
          <span className="font-bold text-navy">Custom retainer · $2,500/mo.</span>{" "}
          Includes priority shipping, A/B tests, content updates, and quarterly redesigns. Pause or cancel any month.
        </div>
      </div>
    </section>
  );
}
