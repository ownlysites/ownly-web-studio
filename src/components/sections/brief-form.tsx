"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "./section-header";
import { SITE } from "@/lib/site";

const INDUSTRIES = ["Home Service", "Hospitality", "Restaurant", "Professional", "Med Spa", "Wealth", "Real Estate", "SaaS", "AI Agent", "Other"];
const BUDGETS = ["750", "2500", "5000", "5000+"];
const BUDGET_LABEL: Record<string, string> = {
  "750": "$750 – Lead Page",
  "2500": "$2,500 – Signature",
  "5000": "$5,000 – Growth",
  "5000+": "$5,000+ – Custom Scope",
};

type State = "idle" | "submitting" | "success" | "error";

export function BriefForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    if ((data.honeypot || "").trim().length > 0) {
      setState("error");
      setErr("Spam detected.");
      return;
    }
    if (startedAt.current > 0 && Date.now() - startedAt.current < 3000) {
      setState("error");
      setErr("Please slow down a moment, then resubmit.");
      return;
    }

    const brief = [
      "Ownly Web Studio · Mockup Request",
      "",
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Business: ${data.business || ""}`,
      `Industry: ${data.industry || ""}`,
      `Budget: ${BUDGET_LABEL[data.budget] || data.budget || ""}`,
      `Current site: ${data.current || ""}`,
      "",
      `Goal: ${data.goal || ""}`,
      "",
      `Style: ${data.style || ""}`,
    ].join("\n");

    try { await navigator.clipboard.writeText(brief); } catch {}

    try {
      await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}

    setState("success");
    fireConfetti();
    setTimeout(() => {
      const subject = encodeURIComponent("Ownly Web Studio Mockup Request");
      const body = encodeURIComponent(brief);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }, 800);
  }

  return (
    <section
      id="brief"
      className="relative border-b border-[var(--line)] bg-gradient-to-b from-cloud/40 via-white to-white py-24 md:py-32"
    >
      <div className="wrap-tight">
        <SectionHeader
          kicker="Free Custom Mockup"
          title={
            <>
              Tell us{" "}
              <em className="font-display italic text-gold-deep">what to build.</em>
            </>
          }
          subtitle="One brief. Three concept directions back within 24 hours. No sales call required."
        />

        <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--line)] bg-white/95 p-7 shadow-[0_30px_84px_rgb(11_37_69_/_0.1)] md:p-10">
          {state === "success" ? (
            <Success />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" autoComplete="tel" />
              <Field label="Business" name="business" />
              <Select label="Industry" name="industry" options={INDUSTRIES} />
              <Select label="Budget Lane" name="budget" options={BUDGETS} labels={BUDGET_LABEL} />
              <Field label="Current Website" name="current" full placeholder="https://" />
              <Area label="One-line goal" name="goal" full placeholder="More booked calls · qualified leads · reservations · monthly retainers..." />
              <Area label="Style direction" name="style" full placeholder="Premium AI builder feel · cinematic · trustworthy · navy and gold..." />
              <div className="col-span-full mt-2 flex flex-wrap items-center gap-3">
                <Button type="submit" variant="gold" size="lg" disabled={state === "submitting"}>
                  <Send className="h-4 w-4" />
                  {state === "submitting" ? "Sending…" : "Send My Brief"}
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={SITE.calendly} target="_blank" rel="noopener">
                    Book Instead
                  </Link>
                </Button>
                <p className="ml-auto text-[11px] text-slate-text">
                  Writes to Supabase · opens your email · copies to clipboard.
                </p>
                {err && <p className="col-span-full text-[12px] text-red-700">{err}</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, autoComplete, full, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; full?: boolean; placeholder?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} />
    </div>
  );
}

function Area({ label, name, full, placeholder }: { label: string; name: string; full?: boolean; placeholder?: string }) {
  return (
    <div className={`grid gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} placeholder={placeholder} />
    </div>
  );
}

function Select({ label, name, options, labels }: { label: string; name: string; options: string[]; labels?: Record<string, string> }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-[var(--line)] bg-white/85 px-4 py-3 text-sm text-navy outline-none transition-all focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {labels?.[o] ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

function fireConfetti() {
  const colors = ["#C5A05A", "#E8C97A", "#0B2545", "#00843D"];
  const end = Date.now() + 800;
  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function Success() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="grid place-items-center gap-4 py-10 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-green-irish/10 text-green-irish"
      >
        <CheckCircle2 className="h-12 w-12" strokeWidth={2} />
      </motion.span>
      <h3 className="font-display text-3xl font-bold text-navy">
        Brief received.
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-slate-text">
        We&rsquo;ll respond within 24 hours with three concept directions. Your email just opened — that&rsquo;s a backup copy.
      </p>
    </motion.div>
  );
}
