"use client";

import { SectionHead } from "./build-system";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Can I just explain what I want?",
    a: "Yes. Plain English is the starting point. Princeton converts it into the full prompt, page strategy, assets, copy, SEO structure, and launch checklist.",
  },
  {
    q: "Why not just use an AI builder myself?",
    a: "You can. Ownly exists when you want the speed of AI plus the judgment, QA, custom media, SEO, deployment, and conversion thinking handled for you.",
  },
  {
    q: "Where do the visuals come from?",
    a: "Visuals should be client-owned, generated, designed, coded, directed, or photographed for the project. They need to look intentional and industry-specific.",
  },
  {
    q: "Can you connect AI agents?",
    a: "Yes. We can plan chat or voice agents for lead capture, questions, routing, qualification, booking, and follow-up when it helps the business.",
  },
  {
    q: "Do I own the website code?",
    a: "Where possible, sites are delivered as portable code that lives in GitHub and deploys through Vercel. You own the repo, the data, and the launch path.",
  },
  {
    q: "Is SEO included?",
    a: "Yes. Each build includes SEO fundamentals: metadata, semantic structure, crawlable copy, alt text, social cards, local or service language, and schema where useful.",
  },
  {
    q: "What if I already have a site?",
    a: "We can preserve the SEO inertia. Most rebuilds keep the current URL, title structure, and high-performing content while replacing the visual system, copy, and conversion path.",
  },
  {
    q: "How fast is the free mockup?",
    a: "Princeton sends the first mockup direction back inside 48 hours. The full build window depends on scope — Lead Pages typically ship the same week.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-28"
    >
      <div className="wrap">
        <SectionHead
          kicker="FAQ"
          title={
            <>
              Questions before{" "}
              <em className="font-display italic text-gold-deep">
                the first build.
              </em>
            </>
          }
          subtitle="Ownly is built for business owners who want the leverage of AI without becoming the project manager, designer, SEO, copywriter, and launch tech."
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
