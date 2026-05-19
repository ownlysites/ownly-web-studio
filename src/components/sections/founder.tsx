"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./section-header";
import { SITE } from "@/lib/site";

const CREDS = [
  { Icon: Award, label: "CFEI Certified" },
  { Icon: ShieldCheck, label: "PFSA Member" },
  { Icon: BookOpen, label: "Author of 5 books" },
];

export function Founder() {
  return (
    <section className="relative border-b border-[var(--line)] py-24 md:py-32">
      <div className="wrap">
        <SectionHeader
          kicker="The Founder"
          title={
            <>
              Built and signed{" "}
              <em className="font-display italic text-gold-deep">by {SITE.founder}.</em>
            </>
          }
          subtitle="Ownly Web Studio is run by one person — not an account manager, not a sales pod, not a junior on a Trello card."
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto grid max-w-4xl items-center gap-10 rounded-3xl border border-[var(--line)] bg-white/85 p-8 shadow-[0_22px_62px_rgb(11_37_69_/_0.08)] md:grid-cols-[280px_1fr] md:gap-12 md:p-10"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-deep to-navy">
            <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="dvring" cx="0.5" cy="0.35" r="0.6">
                  <stop offset="0" stopColor="#E8C97A" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#0B2545" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="200" height="250" fill="url(#dvring)" />
              <circle cx="100" cy="86" r="36" fill="#C5A05A" />
              <path d="M40 220 Q100 140 160 220 Z" fill="#1B3C73" />
              <text x="100" y="240" textAnchor="middle" fill="#E8C97A" fontFamily="Inter,system-ui" fontSize="11" fontWeight="800" letterSpacing="2.5">DAVE IVERY</text>
            </svg>
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
              {SITE.founder} runs every Ownly build.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-text">
              Twenty-plus years of teaching small business owners how money, marketing, and websites should actually work. Five books. Built Ownly ONCE LLC to ship the kind of website most agencies promise and almost none deliver.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-text">
              Dave personally signs off on every site Ownly Web Studio ships. There&rsquo;s no junior-on-an-account model. You talk to him, you get him.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {CREDS.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-gold/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold-deep"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-5 font-display text-2xl italic text-gold-deep">
              &ldquo;If we&rsquo;re wrong, I&rsquo;ll tell you. If we&rsquo;re right, you&rsquo;ll see it on the site within 48 hours.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
