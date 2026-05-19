"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { SectionHead } from "./build-system";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TOKENS = [
  { name: "navy", hex: "#0B2545", role: "Primary surface" },
  { name: "navy-deep", hex: "#1B3C73", role: "Surface depth" },
  { name: "gold", hex: "#C5A05A", role: "Primary accent" },
  { name: "gold-light", hex: "#E8C97A", role: "Hover / glow" },
  { name: "green", hex: "#00843D", role: "Confirm · Irish" },
  { name: "cloud", hex: "#F5F7FA", role: "Light breathing room" },
];

const RAMP = [
  { label: "Display", className: "font-display text-5xl font-extrabold", note: "Playfair 800" },
  { label: "H1", className: "font-display text-4xl font-bold", note: "Playfair 700" },
  { label: "H2", className: "font-display text-3xl font-bold", note: "Playfair 700" },
  { label: "Body", className: "text-base leading-relaxed", note: "Inter 400" },
  { label: "Caption", className: "text-xs uppercase tracking-[0.16em] font-extrabold", note: "Inter 800" },
];

export function DesignSystemBoard() {
  return (
    <section
      id="design-system"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] bg-gradient-to-b from-white via-cloud/60 to-white py-24 md:py-28"
    >
      <div className="wrap">
        <SectionHead
          kicker="The System"
          title={
            <>
              Every site we ship{" "}
              <em className="font-display italic text-gold-deep">
                inherits this system.
              </em>
            </>
          }
          subtitle="Tokens, type ramp, and components live in one place. The result: sites that feel coherent on the first screen and don't drift by section three."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <ColorTokens />
          <TypeRamp />
          <ComponentGrid />
        </div>
      </div>
    </section>
  );
}

function ColorTokens() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_18px_50px_rgb(11_37_69_/_0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-navy">
          Color Tokens
        </h3>
        <Badge variant="outline">Click to copy</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {TOKENS.map((t) => (
          <motion.button
            key={t.name}
            type="button"
            onClick={() => copy(t.hex)}
            whileHover={{ y: -2 }}
            className="group flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-2.5 text-left transition-shadow hover:shadow-[0_14px_34px_rgb(11_37_69_/_0.1)]"
          >
            <span
              className="h-10 w-10 shrink-0 rounded-lg border border-[var(--line)]"
              style={{ background: t.hex }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-extrabold uppercase tracking-[0.1em] text-navy">
                {t.name}
              </span>
              <span className="block truncate text-[10px] text-slate">
                {t.role}
              </span>
              <span className="mt-0.5 block font-mono text-[10px] text-gold-deep">
                {t.hex}
              </span>
            </span>
            <span className="shrink-0 text-slate group-hover:text-gold-deep">
              {copied === t.hex ? (
                <Check className="h-3.5 w-3.5 text-green" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function TypeRamp() {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_18px_50px_rgb(11_37_69_/_0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-navy">
          Type Ramp
        </h3>
        <Badge variant="outline">Playfair · Inter</Badge>
      </div>
      <div className="grid gap-4">
        {RAMP.map((r) => (
          <div key={r.label} className="rounded-xl border border-[var(--line)] bg-white p-3">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold-deep">
              {r.label} <span className="text-slate"> · {r.note}</span>
            </div>
            <div className={`mt-1.5 text-navy ${r.className}`}>
              {r.label === "Caption" ? "OWNLY WEB STUDIO" : "The quick brown fox"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComponentGrid() {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/85 p-6 shadow-[0_18px_50px_rgb(11_37_69_/_0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-navy">
          Components
        </h3>
        <Badge variant="outline">shadcn/ui</Badge>
      </div>
      <Tabs defaultValue="actions">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
        </TabsList>
        <TabsContent value="actions" className="grid gap-3">
          <Button variant="gold">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </TabsContent>
        <TabsContent value="badges" className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="navy">Navy</Badge>
          <Badge variant="gold">Gold</Badge>
          <Badge variant="green">Live</Badge>
          <Badge variant="outline">Outline</Badge>
        </TabsContent>
        <TabsContent value="form" className="grid gap-3">
          <Input placeholder="you@business.com" />
          <Input placeholder="Business name" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
