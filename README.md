# Ownly Web Studio · v2 (cinematic)

Production rebuild of [ownly-web-studio.vercel.app](https://ownly-web-studio.vercel.app/) — a custom web-development agency landing site built to the Lovable / Bolt / Base44 / Readdy / Vercel / Linear / Apple product-grade bar.

## Stack

- Next.js 16 (App Router · Turbopack)
- TypeScript 5
- Tailwind CSS v4 (custom Notre Dame-adjacent token system, no black anywhere)
- Radix-backed shadcn-style primitives (Tabs, Accordion, Slot, Label)
- Framer Motion (page-level orchestration, scroll-into-view reveals)
- Three.js + @react-three/fiber + @react-three/drei (rotating globe + arcs + particles in the hero, live torus knot in motion proof)
- GSAP + ScrollTrigger (pinned + scrubbed 5-phase build pipeline)
- canvas-confetti (brief-form success state)
- Lucide React (icons) + custom inline brand marks (GitHub, LinkedIn, X, Vercel, Supabase, Next)
- Supabase (`/api/submit-brief` → `mockup_requests`)
- Playwright (mini-site screenshot pipeline)

## Real-asset rule (the hard one)

Every visual in the industry gallery is a real Playwright screenshot of a real Ownly-built mini-site under [`_mini_sites/`](./_mini_sites/). Eight verticals, eight real one-page sites, sixteen screenshots in [`public/examples/`](./public/examples/).

Re-capture any time:

```bash
node scripts/capture.mjs
```

The script:
1. Boots a static-file server against `_mini_sites/` on port 4477
2. Captures `<vertical>-hero.png` + `<vertical>-secondary.png` for all 8 sites at 1440×900 @ 2x DPR
3. Optionally captures CWA, itsownlymoney, Lovable, Bolt, Base44, Readdy, Vercel, Linear, Apple references (skipped silently if offline)
4. Outputs go to `public/examples/` (gallery) and `qa/reference/` (competitor study)

## Sections (`src/components/sections/`)

1. `nav.tsx` — fixed glass nav with scroll shrink + mobile overlay
2. `hero.tsx` — full-viewport Three.js globe + cinematic headline + capability marquee
3. `trust-strip.tsx` — real signals only (CFEI · PFSA · Author · F.A.C.T.)
4. `featured-work.tsx` — CWA + itsownlymoney with live-link cards
5. `industry-gallery.tsx` — 8 real Playwright screenshots, Tabs filter, mouse-parallax
6. `build-pipeline.tsx` — GSAP ScrollTrigger pinned 5-phase timeline with real artifacts
7. `capabilities.tsx` — 3×3 capability grid with hover-revealed outcomes
8. `motion-proof.tsx` — 3 inline live demos (R3F torus / GSAP-style magnetic card / SVG scroll-draw chart)
9. `integration-map.tsx` — animated SVG node graph (GitHub · Vercel · Supabase · Calendly · DREAMS BC · Quo · Postiz · Apollo)
10. `pricing.tsx` — 3 tiers + retainer footnote
11. `comparison.tsx` — Ownly vs DIY (honest column for Lovable/Bolt/Base44)
12. `founder.tsx` — Dave Ivery block with credentials
13. `faq.tsx` — 8-question Radix Accordion
14. `brief-form.tsx` — Supabase write + mailto + clipboard + canvas-confetti success
15. `footer.tsx` — 4-column with real socials and back-to-top

## Routes

- `/` — main landing
- `/privacy`, `/terms` — legal stubs
- `/api/submit-brief` — Supabase write
- `/og` — edge `ImageResponse` 1200×630 dynamic OG
- `/sitemap.xml`, `/robots.txt` — Next.js conventions

## SEO

- Organization · WebSite · ProfessionalService (AggregateOffer) · BreadcrumbList · FAQPage JSON-LD in `app/layout.tsx`
- Per-page metadata + canonical
- next/font (Inter + Playfair Display) with `display: swap`

## Brand enforcement

- `@source not "../../public"` + `not "../../_legacy"` + `not "../../_mini_sites"` keep Tailwind v4 from picking up SVG `id=` attributes
- Custom navy-tinted shadows replace every Tailwind default shadow
- Compiled CSS scrubbed of `#000000`, `#0a0a0a`, `#050b15`, `bg-black`, `text-black`, `border-black`
- No `Princeton` · `Harvard` · `Yale` references in any rendered output (verified via grep)

## Develop

```bash
npm install
npx playwright install chromium
node scripts/capture.mjs   # capture mini-site screenshots
npm run dev                 # http://localhost:3000
npm run build
npm run lint
```

## Environment

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Brief form gracefully falls through to mailto when Supabase is unconfigured.

## Database

```sql
create table public.mockup_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text, email text, phone text, business text,
  industry text, budget text, current_website text,
  goal text, style_direction text,
  source text, user_agent text
);
```

## License

© Ownly ONCE LLC.
