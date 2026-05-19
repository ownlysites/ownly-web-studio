"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAPABILITY_TAGS } from "@/lib/site";

const ThreeGlobe = dynamic(
  () => import("@/components/three-globe").then((m) => m.ThreeGlobe),
  { ssr: false, loading: () => <HeroFallback /> }
);

function HeroFallback() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(700px 600px at 50% 60%, rgb(197 160 90 / 0.32), transparent 70%), radial-gradient(800px 600px at 50% 40%, rgb(27 60 115 / 0.4), transparent 70%)",
      }}
      aria-hidden
    />
  );
}

export function Hero() {
  return (
    <header id="top" className="relative isolate overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ThreeGlobe />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 540px at 50% 110%, rgb(11 37 69 / 0.92), transparent 70%), linear-gradient(180deg, rgb(11 37 69 / 0.4), rgb(11 37 69 / 0.6) 60%, rgb(11 37 69 / 0.9))",
        }}
        aria-hidden
      />

      <div className="wrap relative grid min-h-[100svh] items-center pt-32 pb-20 md:min-h-[100svh] md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge variant="light" className="mb-7">
              <Sparkles className="h-3 w-3 text-gold-light" /> F.A.C.T. Method · World-Class Web Development
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-[clamp(44px,7.4vw,108px)] font-extrabold leading-[0.96] tracking-tight text-balance"
          >
            Custom websites built like product.{" "}
            <span className="grad-gold">Shipped</span> like agencies wish they could.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 text-balance md:text-xl"
          >
            We build, design, ship, and support the kind of website your competitors will study for years.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="#brief">
                Start a Build <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href="#work">See our work</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/55"
          >
            <span>Sarasota · Austin · NYC · London · Tokyo · Sydney</span>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip — capability tags */}
      <div className="pause-on-hover relative overflow-hidden border-y border-white/10 bg-white/[0.03] py-5 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap pl-12 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/65">
          {[...CAPABILITY_TAGS, ...CAPABILITY_TAGS].map((t, i) => (
            <span key={i} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
