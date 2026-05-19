"use client";

import { SectionHeader } from "./section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "What if I already have a site?", a: "We preserve the SEO inertia. Most rebuilds keep the current URL, title structure, and high-performing content while we replace the visual system, copy, and conversion path." },
  { q: "How fast is the first mockup?", a: "Lead Pages typically ship the same week. Full custom builds take two to six weeks depending on scope. We send a first mockup direction within 48 hours of receiving the brief." },
  { q: "Do you do logos?", a: "Yes. Custom logo treatment, type lockup, and brand mark generation are part of every build over $2,500. Existing logos get a brand refresh pass." },
  { q: "What about SEO?", a: "Every build ships with schema markup, semantic HTML, OG cards, sitemap, robots, and crawlable copy. Local SEO and programmatic SEO are available as add-ons or core to Growth Build." },
  { q: "How does the AI fit in?", a: "Chat agents for inbound lead capture, voice agents for after-hours calls, form agents for qualification and routing. We integrate with your existing CRM, calendar, and SMS stack." },
  { q: "Custom or template?", a: "Custom. Every site is hand-built. Templates are used as infrastructure accelerators only — never as final creative direction. No two Ownly sites look alike." },
  { q: "Can I host it myself?", a: "Yes. The repo is yours from day one. Vercel is our default deployment because it's the best fit, but you can self-host on any Node-compatible platform." },
  { q: "How does support work?", a: "Lead Page and Signature builds include 30 days of post-launch support. Growth Build includes 90 days. After that, our $2,500/mo retainer gets you priority shipping and quarterly redesigns." },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative border-b border-[var(--line)] py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="FAQ"
          title={
            <>
              Questions{" "}
              <em className="font-display italic text-gold-deep">before the first build.</em>
            </>
          }
          subtitle="Built for business owners who want the leverage of AI without becoming the project manager, designer, SEO, copywriter, and launch tech."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="grid gap-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
