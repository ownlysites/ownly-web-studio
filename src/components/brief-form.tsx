"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { SectionHead } from "./build-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE } from "@/lib/site";

const INDUSTRIES = [
  "Home Service",
  "Professional",
  "Hospitality",
  "Restaurant",
  "Med Spa / Beauty",
  "Real Estate",
  "SaaS",
  "AI Agent",
  "Other",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000+",
  "Not sure yet",
];

type FormState = "idle" | "submitting" | "success" | "error";

export function BriefForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const brief = [
      "Ownly Web Studio Mockup Request",
      "",
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Business: ${data.business || ""}`,
      `Phone: ${data.phone || ""}`,
      `Industry: ${data.industry || ""}`,
      `Budget lane: ${data.budget || ""}`,
      `Current website: ${data.current || ""}`,
      "",
      `Goal: ${data.goal || ""}`,
      "",
      `Style direction: ${data.style || ""}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(brief);
    } catch {
      // best-effort
    }

    let apiOk = false;
    try {
      const res = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      apiOk = res.ok;
    } catch {
      apiOk = false;
    }

    const subject = encodeURIComponent("Ownly Web Studio Mockup Request");
    const body = encodeURIComponent(brief);
    setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }, 400);

    if (apiOk) {
      setState("success");
    } else {
      setState("success");
      setError("Saved locally — email fallback opening.");
    }
  }

  return (
    <section
      id="brief"
      className="relative border-t border-[rgb(11_37_69_/_0.08)] bg-gradient-to-b from-cloud/40 via-white to-white py-24 md:py-28"
    >
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="lg:sticky lg:top-28">
          <SectionHead
            center={false}
            kicker="Free Custom Mockup"
            title={
              <>
                Tell Princeton{" "}
                <em className="font-display italic text-gold-deep">
                  what to build.
                </em>
              </>
            }
            subtitle="Use the form to create a brief. Princeton reviews it, maps the right direction, and sends back your custom mockup within 48 hours."
          />
          <div className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white/70 p-5 text-sm">
            <Row label="Call / Text" value={SITE.phoneDisplay} href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} />
            <Row label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
            <Row label="Book" value="calendly.com/daveivery" href={SITE.calendly} external />
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--line)] bg-white/90 p-6 shadow-[0_22px_62px_rgb(11_37_69_/_0.1)] md:p-8">
          {state === "success" ? (
            <SuccessState note={error} />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Business" name="business" />
              <Field label="Phone" name="phone" autoComplete="tel" />
              <SelectField label="Industry" name="industry" options={INDUSTRIES} />
              <SelectField label="Budget lane" name="budget" options={BUDGETS} />
              <Field label="Current website" name="current" full placeholder="Paste your current URL if you have one" />
              <TextField label="What should the site help you get?" name="goal" full placeholder="More calls, booked consults, quote requests, reservations, payments..." />
              <TextField label="Style direction" name="style" full placeholder="Premium AI builder feel, modern web studio, clean Notre Dame colors, cinematic, trustworthy..." />
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
                <p className="ml-auto text-[11px] text-slate">
                  Saves to your inbox, copies to your clipboard, opens your email.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate">
        {label}
      </span>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
        className="font-bold text-gold-deep transition-colors hover:text-navy"
      >
        {value}
      </Link>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  full,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  full?: boolean;
  placeholder?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-3 text-sm text-navy outline-none transition-all focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  label,
  name,
  full,
  placeholder,
}: {
  label: string;
  name: string;
  full?: boolean;
  placeholder?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} placeholder={placeholder} />
    </div>
  );
}

function SuccessState({ note }: { note: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid place-items-center gap-4 py-12 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-green/10 text-green"
      >
        <CheckCircle2 className="h-12 w-12" strokeWidth={2} />
      </motion.span>
      <h3 className="font-display text-3xl font-bold text-navy">
        Princeton has your brief.
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-slate">
        Mockup back in 48 hours. Check your inbox — we just opened a pre-filled
        message and saved a copy to your clipboard as backup.
      </p>
      {note && (
        <p className="text-[11px] text-slate/80">{note}</p>
      )}
    </motion.div>
  );
}
