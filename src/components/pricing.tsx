"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHead } from "./build-system";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const TIERS = [
  {
    tag: "Lead Page",
    name: "Fast Launch",
    price: "$750+",
    sub: "typical starting range",
    blurb: "For one clear offer, service, campaign, or local lead funnel.",
    bullets: [
      "Single premium landing page",
      "Mobile-first conversion copy",
      "Booking or lead form path",
      "Basic SEO and metadata",
    ],
    cta: { label: "Request Mockup", href: "#brief", variant: "secondary" as const },
    featured: false,
  },
  {
    tag: "Business Site",
    name: "Signature Build",
    price: "$2.5K+",
    sub: "most popular",
    blurb: "For businesses that need the site to become a serious trust and lead engine.",
    bullets: [
      "Homepage plus core service sections",
      "Proof, FAQs, process, and CTAs",
      "Call/text, booking, and intake flow",
      "AI chat or voice agent option",
    ],
    cta: { label: "Get Free Mockup", href: "#brief", variant: "gold" as const },
    featured: true,
  },
  {
    tag: "Custom System",
    name: "Growth Build",
    price: "$5K+",
    sub: "scope based",
    blurb: "For multi-page sites, e-commerce, automations, portals, dashboards, or bigger funnels.",
    bullets: [
      "Custom pages and integrations",
      "CRM, forms, payments, automations",
      "SEO expansion and content plan",
      "Ongoing improvement support",
    ],
    cta: { label: "Book Strategy Call", href: SITE.calendly, variant: "secondary" as const },
    featured: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-28"
    >
      <div className="wrap">
        <SectionHead
          kicker="Pricing"
          title={
            <>
              Start with the mockup.{" "}
              <em className="font-display italic text-gold-deep">
                Decide with your eyes.
              </em>
            </>
          }
          subtitle="The free mockup is the fastest way to see whether Ownly can beat the current direction before you commit to a full build."
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
                    ? "border-[rgb(197_160_90_/_0.55)] shadow-[0_30px_76px_rgb(197_160_90_/_0.18)]"
                    : ""
                }`}
              >
                {t.featured && (
                  <Badge variant="gold" className="absolute -top-3 left-7">
                    Most Popular
                  </Badge>
                )}
                <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
                  {t.tag}
                </div>
                <h3 className="mt-2 text-2xl font-bold text-navy">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {t.blurb}
                </p>
                <div className="mt-5 font-display text-5xl font-bold leading-none text-navy">
                  {t.price}
                  <span className="ml-2 align-middle font-sans text-xs font-bold text-slate">
                    {t.sub}
                  </span>
                </div>
                <ul className="my-6 grid flex-1 gap-3">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-navy">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/10 text-green">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="leading-snug text-slate">{b}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={t.cta.variant}
                  className="w-full"
                >
                  <Link href={t.cta.href} target={t.cta.href.startsWith("http") ? "_blank" : undefined} rel={t.cta.href.startsWith("http") ? "noopener" : undefined}>
                    {t.cta.label}
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
