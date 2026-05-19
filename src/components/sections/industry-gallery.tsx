"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "./section-header";

type Filter = "all" | "home" | "hospitality" | "professional" | "commerce" | "ai";

type Vertical = {
  slug: string;
  title: string;
  industry: string;
  outcome: string;
  category: Exclude<Filter, "all">;
  height: number;
  width: number;
};

const SITES: Vertical[] = [
  { slug: "hotel", title: "La Marée", industry: "Coastal Boutique Hotel", outcome: "Reservation engine, suite gallery, on-property concierge.", category: "hospitality", width: 1600, height: 1000 },
  { slug: "restaurant", title: "Maker & Hearth", industry: "Modern American Bistro", outcome: "Chef-led menu system, OpenTable handoff, press wall, six-course tasting.", category: "hospitality", width: 1600, height: 1000 },
  { slug: "hvac", title: "Tidewater HVAC", industry: "Emergency HVAC", outcome: "Sticky call-bar, service-area map, financing widget, 24/7 dispatch ticker.", category: "home", width: 1600, height: 1000 },
  { slug: "medspa", title: "Luminé", industry: "Aesthetic Medicine", outcome: "Treatment menu, three-tier membership, provider profiles, consultation booking.", category: "professional", width: 1600, height: 1000 },
  { slug: "wealth", title: "Meridian Wealth", industry: "Private Wealth Advisory", outcome: "Compliance bar, advisor bio, AUM trust signal, projection calculator.", category: "professional", width: 1600, height: 1000 },
  { slug: "realestate", title: "The Hartley Group", industry: "Luxury Real Estate", outcome: "Listings carousel, neighborhood tabs, off-market network, broker profile.", category: "commerce", width: 1600, height: 1000 },
  { slug: "saas", title: "Quanta", industry: "Ops Analytics SaaS", outcome: "Live dashboard hero, integration wall, ROI calculator, free-trial flow.", category: "commerce", width: 1600, height: 1000 },
  { slug: "ai-agent", title: "Replywise", industry: "Inbound AI Agent", outcome: "Chat preview, voice/chat/form channels, 3-tier pricing, talk-to-agent demo.", category: "ai", width: 1600, height: 1000 },
];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "home", label: "Home Services" },
  { value: "hospitality", label: "Hospitality" },
  { value: "professional", label: "Professional" },
  { value: "commerce", label: "Commerce" },
  { value: "ai", label: "AI Agent" },
];

export function IndustryGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () => (filter === "all" ? SITES : SITES.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <section
      id="studio"
      className="relative border-b border-[var(--line)] py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="Industry Showcase"
          title={
            <>
              Eight industries.{" "}
              <em className="font-display italic text-gold-deep">Eight real sites.</em>{" "}
              Built by us last week.
            </>
          }
          subtitle="Every card below is a working Ownly build, captured by Playwright from the actual rendered page — not a mockup."
        />

        <div className="mb-10 flex justify-center">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              {FILTERS.map((f) => (
                <TabsTrigger key={f.value} value={f.value}>
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          layout
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((v, i) => (
            <GalleryCard key={v.slug} v={v} index={i} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-slate-text">
          Every site above is a working Ownly build. View the source on{" "}
          <a
            href="https://github.com/ownlysites/ownly-web-studio"
            target="_blank"
            rel="noopener"
            className="font-bold text-gold-deep underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function GalleryCard({ v, index }: { v: Vertical; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  return (
    <motion.article
      layout
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setTx(x * 6);
        setTy(y * 6);
      }}
      onMouseLeave={() => {
        setTx(0);
        setTy(0);
      }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white/85 shadow-[0_18px_50px_rgb(11_37_69_/_0.07)] transition-all hover:-translate-y-1.5 hover:shadow-[0_30px_72px_rgb(11_37_69_/_0.16)]"
    >
      <div className="relative aspect-[1.6/1] overflow-hidden bg-cloud">
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `translate3d(${tx}px, ${ty}px, 0) scale(1.04)` }}
        >
          <Image
            src={`/examples/${v.slug}-hero.jpg`}
            alt={`Hero screenshot of ${v.title}, a ${v.industry} site built by Ownly Web Studio`}
            width={v.width}
            height={v.height}
            className="h-full w-full object-cover object-top"
            sizes="(min-width: 1280px) 320px, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="absolute right-2.5 top-2.5 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full border border-gold bg-gold/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-navy">
            Built with Ownly
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pt-4 pb-5">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-deep">
          {v.industry}
        </span>
        <h3 className="font-display text-xl font-bold leading-tight text-navy">{v.title}</h3>
        <p className="text-sm leading-relaxed text-slate-text">{v.outcome}</p>
        <a
          href={`/examples/${v.slug}-hero.jpg`}
          target="_blank"
          rel="noopener"
          className="mt-2 inline-flex w-fit items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-deep"
        >
          View capture
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  );
}
