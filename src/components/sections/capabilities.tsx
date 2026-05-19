"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Bot,
  Mic,
  MapPin,
  Search,
  CalendarCheck,
  ShoppingBag,
  Database,
  Cloud,
} from "lucide-react";
import { SectionHeader } from "./section-header";

const CAPS = [
  {
    icon: Code2,
    title: "Custom Sites",
    body: "Hand-coded Next.js. No drag-and-drop builders, no PageSpeed regrets.",
    outcomes: ["98 Lighthouse mobile · CWA", "LCP 1.2s · itsownlymoney", "Zero CMS lock-in"],
  },
  {
    icon: Bot,
    title: "AI Agents",
    body: "Chat agents wired to your CRM, calendar, and SMS. Real qualification, not canned replies.",
    outcomes: ["91s avg time-to-book", "Slack + PagerDuty escalation", "GPT-4o or Claude routing"],
  },
  {
    icon: Mic,
    title: "Voice Agents",
    body: "Inbound and outbound voice. Twilio + a model-of-choice. Books appointments while you sleep.",
    outcomes: ["After-hours capture", "Native call transfer", "SOC-2 hosted infrastructure"],
  },
  {
    icon: MapPin,
    title: "Local SEO",
    body: "Schema, GBP, citation cleanup, neighborhood pages. The fundamentals, done right.",
    outcomes: ["Local pack inside 60 days", "Service-area schema", "Review-loop automations"],
  },
  {
    icon: Search,
    title: "Programmatic SEO",
    body: "Hundreds of long-tail city/service pages generated from one template + Supabase data.",
    outcomes: ["1,400 pages, 1 template", "Per-page schema", "Auto-rebuilt on update"],
  },
  {
    icon: CalendarCheck,
    title: "Booking & Forms",
    body: "Calendly, Cal.com, native scheduling. Honeypot anti-spam. Brief written to Supabase + emailed.",
    outcomes: ["Two-way calendar sync", "SMS confirmations", "Brief auto-routed by industry"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    body: "Stripe + Shopify Hydrogen + Sanity. Fast, content-rich, conversion-tuned.",
    outcomes: ["3-step checkout", "Subscriptions + one-time", "Currency + locale switcher"],
  },
  {
    icon: Database,
    title: "Supabase Backends",
    body: "Auth, storage, RLS-protected tables, Edge Functions. Production-grade Postgres without the ops.",
    outcomes: ["Magic-link auth", "Per-row RLS", "Realtime sync"],
  },
  {
    icon: Cloud,
    title: "Vercel Infrastructure",
    body: "Edge runtime, ISR, image optimization, preview deploys on every PR. You own every config.",
    outcomes: ["GitHub-linked CI", "Branch deploys per feature", "Edge Config + KV"],
  },
];

export function Capabilities() {
  return (
    <section className="relative border-b border-[var(--line)] py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="Capability Matrix"
          title={
            <>
              We build product,{" "}
              <em className="font-display italic text-gold-deep">not pages.</em>
            </>
          }
          subtitle="Nine capabilities we ship in production today. Every one earns its place with a real outcome you can verify."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPS.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className="group flex flex-col gap-3 rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_14px_38px_rgb(11_37_69_/_0.06)] transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_58px_rgb(11_37_69_/_0.12)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-navy">
                <c.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="text-lg font-bold tracking-tight text-navy">{c.title}</h3>
              <p className="text-sm leading-relaxed text-slate-text">{c.body}</p>
              <ul className="mt-1 grid gap-1.5 border-t border-[var(--line)] pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {c.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2 text-[12px] text-slate-text"
                  >
                    <span className="mt-1 h-1 w-1 rounded-full bg-gold" />
                    {o}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
