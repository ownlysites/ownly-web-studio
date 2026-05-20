"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Form = {
  business: string;
  name: string;
  email: string;
  phone: string;
  oneline: string;
  tier: string;
  refs: string;
  budget: string;
  launch: string;
  urgent: string;
};

const TIERS = [
  { value: "lead", label: "Lead Page" },
  { value: "industry", label: "Industry Site" },
  { value: "bespoke", label: "Bespoke Build" },
  { value: "agent", label: "AI Agent Only" },
];

const BUDGETS = [
  { value: "small", label: "$1.5K – $5K" },
  { value: "mid", label: "$5K – $15K" },
  { value: "large", label: "$15K+" },
];

const initial: Form = {
  business: "", name: "", email: "", phone: "", oneline: "",
  tier: "lead", refs: "", budget: "small",
  launch: "", urgent: "",
};

export default function Intake() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof Form>(k: K, v: Form[K]) { setForm((f) => ({ ...f, [k]: v })); }

  function canAdvance(): boolean {
    if (step === 1) return form.business.trim().length > 1 && form.name.trim().length > 1 && /.+@.+\..+/.test(form.email);
    if (step === 2) return !!form.tier && !!form.budget;
    if (step === 3) return form.launch.length > 0;
    return false;
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Submit failed (${res.status})`);
      setDone(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section id="mockup" className="hairline-top py-24" style={{ background: "var(--paper-bone)" }}>
        <div className="container-page max-w-2xl">
          <p className="eyebrow eyebrow-rule">RECEIVED</p>
          <h2 className="font-display mt-4" style={{ fontSize: 48, lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
            We&apos;re <em style={{ color: "var(--gold)", fontStyle: "italic" }}>on it.</em>
          </h2>
          <p className="mt-6" style={{ color: "var(--ink)", fontSize: 18, lineHeight: 1.7 }}>
            Your mockup arrives within 24 hours, delivered to <strong>{form.email}</strong>.
            Watch your inbox — and your phone, if you left a number.
          </p>
          <div className="mt-8 inline-block" style={{ height: 1, width: 64, background: "var(--gold)" }} />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-dark)" }}>
            Ownly Web Studio · The Studio Desk
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="mockup" className="hairline-top py-24" style={{ background: "var(--paper-bone)" }}>
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow eyebrow-rule">THE INTAKE</p>
          <h2 className="font-display mt-4" style={{ fontSize: "clamp(34px, 4.2vw, 52px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 500 }}>
            Tell us what you&apos;re building. We&apos;ll send a <em style={{ color: "var(--gold)", fontStyle: "italic" }}>mockup in 24 hours.</em>
          </h2>
          <p className="mt-5" style={{ color: "var(--text-mute)", fontSize: 15, lineHeight: 1.7 }}>
            Three steps. No card. No sales call until you ask for one. We&apos;ll send the mockup as a real link — not a screenshot.
          </p>
          <ul className="mt-8 space-y-3 text-sm" style={{ color: "var(--ink)" }}>
            <li className="flex items-center gap-3"><span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} /> Live mockup link, not a JPEG</li>
            <li className="flex items-center gap-3"><span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} /> Pricing inside the email, no haggling</li>
            <li className="flex items-center gap-3"><span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--gold)" }} /> If we&apos;re not a fit, we&apos;ll say so</li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div
            style={{
              background: "var(--paper-cream)",
              border: "1px solid var(--hairline)",
              borderRadius: 18,
              padding: 32,
            }}
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--gold-dark)" }}>
                Step 0{step} of 03
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    style={{
                      width: 28,
                      height: 2,
                      background: n <= step ? "var(--gold)" : "var(--hairline)",
                    }}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <Heading>Who you are</Heading>
                  <Field label="Business name *" value={form.business} onChange={(v) => update("business", v)} />
                  <Field label="Your name *" value={form.name} onChange={(v) => update("name", v)} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
                    <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
                  </div>
                  <Field
                    label="What you do, in one line"
                    value={form.oneline}
                    onChange={(v) => update("oneline", v.slice(0, 140))}
                    textarea
                    hint={`${form.oneline.length}/140`}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <Heading>What you need</Heading>
                  <Radio label="Tier" value={form.tier} options={TIERS} onChange={(v) => update("tier", v)} />
                  <Field
                    label="Three example URLs you like"
                    value={form.refs}
                    onChange={(v) => update("refs", v)}
                    textarea
                    placeholder="https://…  https://…  https://…"
                  />
                  <Radio label="Budget window" value={form.budget} options={BUDGETS} onChange={(v) => update("budget", v)} />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <Heading>When you need it</Heading>
                  <Field label="Target launch date *" type="date" value={form.launch} onChange={(v) => update("launch", v)} />
                  <Field
                    label="Anything urgent we should know"
                    value={form.urgent}
                    onChange={(v) => update("urgent", v.slice(0, 280))}
                    textarea
                    hint={`${form.urgent.length}/280`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="mt-4 text-sm" style={{ color: "#b3261e" }}>
                {error}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="text-sm font-semibold"
                style={{ color: step === 1 ? "var(--text-mute)" : "var(--ink)", opacity: step === 1 ? 0.5 : 1 }}
              >
                ← Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  disabled={!canAdvance()}
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="btn-primary"
                  style={{ opacity: canAdvance() ? 1 : 0.5 }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canAdvance() || submitting}
                  onClick={submit}
                  className="btn-primary"
                  style={{ opacity: canAdvance() && !submitting ? 1 : 0.5 }}
                >
                  {submitting ? "Sending…" : "Send me my mockup in 24 hrs →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display mb-6" style={{ fontSize: 28, fontWeight: 500, color: "var(--ink)" }}>
      {children}
    </h3>
  );
}

function Field({
  label, value, onChange, type = "text", textarea, hint, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; textarea?: boolean; hint?: string; placeholder?: string;
}) {
  const baseStyle = {
    width: "100%",
    background: "var(--paper-bone)",
    border: "1px solid var(--hairline)",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 15,
    color: "var(--ink)",
    fontFamily: "var(--font-sans)",
    outline: "none",
  } as const;
  return (
    <label className="block mb-5">
      <span
        className="font-mono uppercase block mb-2"
        style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--gold-dark)" }}
      >
        {label}
      </span>
      {textarea ? (
        <textarea rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={baseStyle} />
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={baseStyle} />
      )}
      {hint && (
        <span className="font-mono text-[10px] mt-1.5 inline-block" style={{ color: "var(--text-mute)" }}>{hint}</span>
      )}
    </label>
  );
}

function Radio({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <span
        className="font-mono uppercase block mb-2"
        style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--gold-dark)" }}
      >
        {label}
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange(o.value)}
              className="text-sm font-semibold"
              style={{
                background: active ? "var(--ink)" : "var(--paper-bone)",
                color: active ? "var(--paper-cream)" : "var(--ink)",
                border: `1px solid ${active ? "var(--ink)" : "var(--hairline)"}`,
                padding: "12px 10px",
                borderRadius: 999,
                transition: "all .2s ease",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
