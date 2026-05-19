"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  center = true,
  light = false,
}: {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={cn("mx-auto max-w-3xl pb-14", center && "text-center")}
    >
      {kicker && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em]",
            light
              ? "border-gold/40 bg-white/10 text-gold-light"
              : "border-[var(--gold-line)] bg-white/60 text-gold-deep"
          )}
        >
          {kicker}
        </div>
      )}
      <h2
        className={cn(
          "font-display text-[clamp(36px,5.6vw,72px)] font-extrabold leading-[0.96] tracking-tight text-balance",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-balance md:text-lg",
            light ? "text-white/70" : "text-slate-text"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
