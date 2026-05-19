"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHead } from "./build-system";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Industry =
  | "all"
  | "home"
  | "professional"
  | "hospitality"
  | "commerce"
  | "ai";

type Card = {
  title: string;
  blurb: string;
  industry: Exclude<Industry, "all">;
  tags: string[];
  visual: React.ReactNode;
};

const CARDS: Card[] = [
  {
    title: "HVAC Lead Engine",
    blurb: "Emergency call paths, city-service SEO, quote forms, click-to-call mobile-first.",
    industry: "home",
    tags: ["Local SEO", "Quote CTA", "Call Flow"],
    visual: (
      <Image
        src="/assets/home-services-preview.svg"
        alt="HVAC website preview with Sarasota service area, click-to-call, and finance options"
        width={520}
        height={320}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Plumber",
    blurb: "Trust-first booking, before/after photos, schema for emergency callouts.",
    industry: "home",
    tags: ["Schema", "Booking", "Reviews"],
    visual: <PreviewSVG variant="plumber" />,
  },
  {
    title: "Wealth Advisor",
    blurb: "Authority-led page where credentials, clarity, compliance, and booking matter.",
    industry: "professional",
    tags: ["Authority", "Schema", "Compliance"],
    visual: (
      <Image
        src="/assets/professional-services-preview.svg"
        alt="Wealth advisor website preview with credentials, compliance, and booking path"
        width={520}
        height={320}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Med Spa",
    blurb: "Visual-first desire build, treatment menus, financing, before/after gallery.",
    industry: "professional",
    tags: ["Visual", "Booking", "Financing"],
    visual: <PreviewSVG variant="medspa" />,
  },
  {
    title: "Restaurant",
    blurb: "Reservation engine, menu schema, OpenTable handoff, photo-first hero.",
    industry: "hospitality",
    tags: ["Reservations", "Menu Schema", "Photo Hero"],
    visual: (
      <Image
        src="/assets/hospitality-commerce-preview.svg"
        alt="Hospitality and commerce website preview with reservations and menu flow"
        width={520}
        height={320}
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Boutique Hotel",
    blurb: "Cinematic media, room inventory, package upsells, direct-book over OTA.",
    industry: "hospitality",
    tags: ["Media", "Direct Book", "Packages"],
    visual: <PreviewSVG variant="hotel" />,
  },
  {
    title: "Real Estate",
    blurb: "Listing IDX hooks, neighborhood pages, lead capture without the noise.",
    industry: "commerce",
    tags: ["IDX", "Neighborhood SEO", "Capture"],
    visual: <PreviewSVG variant="realestate" />,
  },
  {
    title: "SaaS Landing",
    blurb: "Product-grade hero, in-context demo loops, pricing logic, trust strip.",
    industry: "commerce",
    tags: ["Demo", "Pricing", "Trust"],
    visual: <PreviewSVG variant="saas" />,
  },
  {
    title: "AI Agent Landing",
    blurb: "Chat/voice agent preview, integration map, agent path, capture-to-call flow.",
    industry: "ai",
    tags: ["Agent Preview", "Integrations", "Voice"],
    visual: <PreviewSVG variant="agent" />,
  },
];

const FILTERS: { value: Industry; label: string }[] = [
  { value: "all", label: "All" },
  { value: "home", label: "Home Service" },
  { value: "professional", label: "Professional" },
  { value: "hospitality", label: "Hospitality" },
  { value: "commerce", label: "Commerce" },
  { value: "ai", label: "AI Agent" },
];

export function TemplateGallery() {
  const [filter, setFilter] = useState<Industry>("all");
  const cards = useMemo(
    () => (filter === "all" ? CARDS : CARDS.filter((c) => c.industry === filter)),
    [filter]
  );

  return (
    <section
      id="work"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] py-24 md:py-28"
    >
      <div className="wrap">
        <SectionHead
          kicker="Template Gallery"
          title={
            <>
              Every industry gets its own{" "}
              <em className="font-display italic text-gold-deep">visual proof.</em>
            </>
          }
          subtitle="Industry-matched website preview systems show the kind of page Ownly can ship for your lane. None of them are pasted on — every visual is built for the audience and the conversion path."
        />

        <div className="mb-8 flex justify-center">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Industry)}>
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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c, i) => (
            <motion.article
              layout
              key={c.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white/85 p-4 shadow-[0_18px_50px_rgb(11_37_69_/_0.07)] transition-all hover:-translate-y-1.5 hover:shadow-[0_28px_72px_rgb(11_37_69_/_0.14)]"
            >
              <div className="relative aspect-[1.62/1] overflow-hidden rounded-2xl border border-[var(--line)] bg-cloud">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                  {c.visual}
                </div>
                <div className="absolute right-3 top-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Badge variant="gold">Built with Ownly</Badge>
                </div>
              </div>
              <h3 className="mt-4 px-1 text-xl font-bold leading-tight text-navy">
                {c.title}
              </h3>
              <p className="mt-2 px-1 text-sm leading-relaxed text-slate">
                {c.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 px-1">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--gold-line)] bg-gold/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-gold-deep"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PreviewSVG({
  variant,
}: {
  variant: "plumber" | "medspa" | "hotel" | "realestate" | "saas" | "agent";
}) {
  switch (variant) {
    case "plumber":
      return <PlumberPreview />;
    case "medspa":
      return <MedSpaPreview />;
    case "hotel":
      return <HotelPreview />;
    case "realestate":
      return <RealEstatePreview />;
    case "saas":
      return <SaasPreview />;
    case "agent":
      return <AgentPreview />;
  }
}

function Frame({ children, bg = "#F5F7FA" }: { children: React.ReactNode; bg?: string }) {
  return (
    <svg viewBox="0 0 520 320" className="block h-full w-full">
      <rect width="520" height="320" fill={bg} />
      {children}
    </svg>
  );
}

function PlumberPreview() {
  return (
    <Frame>
      <rect x="0" y="0" width="520" height="44" fill="#0B2545" />
      <rect x="16" y="14" width="80" height="14" rx="4" fill="#FFFFFF" />
      <rect x="380" y="12" width="120" height="20" rx="10" fill="#C5A05A" />
      <rect x="20" y="64" width="260" height="34" rx="6" fill="#0B2545" />
      <rect x="20" y="108" width="320" height="6" rx="3" fill="#C0C7CF" />
      <rect x="20" y="120" width="240" height="6" rx="3" fill="#C0C7CF" />
      <rect x="20" y="148" width="120" height="34" rx="17" fill="#C5A05A" />
      <rect x="150" y="148" width="120" height="34" rx="17" fill="#FFFFFF" stroke="#C0C7CF" />
      <g transform="translate(330,60)">
        <rect width="170" height="220" rx="14" fill="#1B3C73" />
        <path d="M40 60 L130 60 L130 130 L100 160 L70 130 L40 130 Z" fill="#C5A05A" />
        <circle cx="85" cy="80" r="8" fill="#FFFFFF" />
        <rect x="40" y="180" width="90" height="6" rx="3" fill="#E8C97A" />
        <rect x="40" y="194" width="60" height="6" rx="3" fill="#C0C7CF" />
      </g>
    </Frame>
  );
}

function MedSpaPreview() {
  return (
    <Frame bg="#FBF7F2">
      <rect x="0" y="0" width="520" height="40" fill="#0B2545" />
      <rect x="16" y="12" width="80" height="14" rx="4" fill="#E8C97A" />
      <rect x="20" y="64" width="220" height="32" rx="4" fill="#0B2545" />
      <rect x="20" y="106" width="280" height="6" rx="3" fill="#C0C7CF" />
      <rect x="20" y="118" width="240" height="6" rx="3" fill="#C0C7CF" />
      <rect x="20" y="146" width="130" height="32" rx="16" fill="#C5A05A" />
      <g transform="translate(310,60)">
        <circle cx="100" cy="120" r="100" fill="#E8C97A" opacity="0.5" />
        <circle cx="100" cy="120" r="64" fill="#FFFFFF" />
        <path d="M70 120 Q100 80 130 120 Q100 160 70 120 Z" fill="#C5A05A" />
      </g>
      <g transform="translate(20,200)">
        <rect width="120" height="80" rx="10" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect width="120" height="80" rx="10" x="135" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect width="120" height="80" rx="10" x="270" fill="#FFFFFF" stroke="#C0C7CF" />
      </g>
    </Frame>
  );
}

function HotelPreview() {
  return (
    <Frame bg="#0B2545">
      <rect x="0" y="0" width="520" height="320" fill="#0B2545" />
      <rect x="0" y="0" width="520" height="220" fill="url(#hotelGrad)" />
      <defs>
        <linearGradient id="hotelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B3C73" />
          <stop offset="1" stopColor="#0B2545" />
        </linearGradient>
      </defs>
      <rect x="16" y="14" width="100" height="14" rx="4" fill="#E8C97A" />
      <rect x="20" y="70" width="280" height="20" rx="4" fill="#FFFFFF" />
      <rect x="20" y="98" width="220" height="20" rx="4" fill="#E8C97A" />
      <rect x="20" y="130" width="320" height="6" rx="3" fill="#FFFFFF" opacity="0.6" />
      <rect x="20" y="142" width="280" height="6" rx="3" fill="#FFFFFF" opacity="0.5" />
      <rect x="20" y="170" width="160" height="34" rx="17" fill="#C5A05A" />
      <g transform="translate(20,240)">
        <rect width="155" height="68" rx="10" fill="#FFFFFF" />
        <rect width="155" height="68" rx="10" x="170" fill="#FFFFFF" />
        <rect width="155" height="68" rx="10" x="340" fill="#FFFFFF" />
      </g>
    </Frame>
  );
}

function RealEstatePreview() {
  return (
    <Frame>
      <rect x="0" y="0" width="520" height="46" fill="#FFFFFF" />
      <rect x="16" y="14" width="80" height="14" rx="4" fill="#0B2545" />
      <rect x="380" y="12" width="120" height="20" rx="10" fill="#C5A05A" />
      <rect x="20" y="66" width="480" height="120" rx="14" fill="#1B3C73" />
      <rect x="40" y="82" width="220" height="22" rx="4" fill="#FFFFFF" />
      <rect x="40" y="112" width="160" height="22" rx="4" fill="#E8C97A" />
      <rect x="40" y="146" width="120" height="28" rx="14" fill="#C5A05A" />
      <g transform="translate(20,200)">
        <rect width="155" height="100" rx="10" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect x="14" y="14" width="127" height="50" rx="6" fill="#C0C7CF" />
        <rect x="14" y="70" width="80" height="6" rx="3" fill="#0B2545" />
        <rect x="14" y="82" width="120" height="5" rx="2.5" fill="#C0C7CF" />
      </g>
      <g transform="translate(190,200)">
        <rect width="155" height="100" rx="10" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect x="14" y="14" width="127" height="50" rx="6" fill="#E8C97A" />
        <rect x="14" y="70" width="80" height="6" rx="3" fill="#0B2545" />
        <rect x="14" y="82" width="120" height="5" rx="2.5" fill="#C0C7CF" />
      </g>
      <g transform="translate(360,200)">
        <rect width="140" height="100" rx="10" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect x="14" y="14" width="112" height="50" rx="6" fill="#0B2545" />
        <rect x="14" y="70" width="80" height="6" rx="3" fill="#0B2545" />
        <rect x="14" y="82" width="100" height="5" rx="2.5" fill="#C0C7CF" />
      </g>
    </Frame>
  );
}

function SaasPreview() {
  return (
    <Frame>
      <rect x="0" y="0" width="520" height="44" fill="#0B2545" />
      <rect x="16" y="14" width="60" height="14" rx="4" fill="#C5A05A" />
      <rect x="200" y="14" width="40" height="14" rx="4" fill="#FFFFFF" />
      <rect x="250" y="14" width="40" height="14" rx="4" fill="#FFFFFF" />
      <rect x="20" y="70" width="280" height="36" rx="6" fill="#0B2545" />
      <rect x="20" y="112" width="320" height="6" rx="3" fill="#C0C7CF" />
      <rect x="20" y="124" width="240" height="6" rx="3" fill="#C0C7CF" />
      <rect x="20" y="148" width="130" height="34" rx="17" fill="#C5A05A" />
      <g transform="translate(330,68)">
        <rect width="170" height="160" rx="14" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect x="14" y="14" width="142" height="20" rx="4" fill="#0B2545" />
        <rect x="14" y="44" width="100" height="6" rx="3" fill="#C0C7CF" />
        <rect x="14" y="56" width="120" height="6" rx="3" fill="#C0C7CF" />
        <polyline points="14,140 50,110 86,124 122,90 156,104" stroke="#00843D" strokeWidth="3" fill="none" />
        <circle cx="156" cy="104" r="4" fill="#C5A05A" />
      </g>
      <g transform="translate(20,210)">
        <rect width="155" height="90" rx="10" fill="#FFFFFF" stroke="#C0C7CF" />
        <rect width="155" height="90" rx="10" x="170" fill="#FFFFFF" stroke="#C5A05A" />
        <rect width="155" height="90" rx="10" x="340" fill="#FFFFFF" stroke="#C0C7CF" />
      </g>
    </Frame>
  );
}

function AgentPreview() {
  return (
    <Frame bg="#0B2545">
      <rect x="0" y="0" width="520" height="44" fill="#1B3C73" />
      <rect x="16" y="14" width="80" height="14" rx="4" fill="#E8C97A" />
      <g transform="translate(20,68)">
        <rect width="280" height="40" rx="20" fill="#FFFFFF" />
        <circle cx="22" cy="20" r="8" fill="#C5A05A" />
        <rect x="40" y="16" width="180" height="8" rx="4" fill="#0B2545" />
        <rect y="56" width="240" height="40" rx="20" fill="#1B3C73" stroke="#C5A05A" />
        <circle cx="22" cy="76" r="8" fill="#E8C97A" />
        <rect x="40" y="72" width="170" height="8" rx="4" fill="#FFFFFF" />
        <rect y="112" width="200" height="40" rx="20" fill="#FFFFFF" />
        <circle cx="22" cy="132" r="8" fill="#C5A05A" />
        <rect x="40" y="128" width="140" height="8" rx="4" fill="#0B2545" />
      </g>
      <g transform="translate(330,68)">
        <rect width="170" height="220" rx="14" fill="#FFFFFF" />
        <circle cx="85" cy="60" r="32" fill="#C5A05A" />
        <path d="M75 60 Q85 50 95 60 Q85 70 75 60 Z" fill="#0B2545" />
        <rect x="20" y="110" width="130" height="6" rx="3" fill="#0B2545" />
        <rect x="20" y="122" width="100" height="5" rx="2.5" fill="#C0C7CF" />
        <rect x="20" y="150" width="130" height="30" rx="15" fill="#0B2545" />
        <rect x="20" y="186" width="130" height="20" rx="10" fill="#F5F7FA" />
      </g>
    </Frame>
  );
}
