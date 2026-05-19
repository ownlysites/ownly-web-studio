# Ownly Web Studio

Next.js 16 (App Router) rebuild of [ownly-web-studio.vercel.app](https://ownly-web-studio.vercel.app/) — turns plain-English business goals into premium custom websites, custom visuals, SEO foundations, AI agent paths, and GitHub/Vercel-ready launch systems.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5
- Tailwind CSS v4 (custom Notre Dame-adjacent token system, no black)
- shadcn-style primitives + Radix UI (Tabs, Accordion, Slot, Label)
- Framer Motion (hero typewriter, scroll-linked pipeline, AnimatePresence)
- Lucide React (icons; brand marks inlined to survive lucide's brand-icon removal)
- next/font/google: Inter + Playfair Display + Bebas Neue
- `@supabase/supabase-js` for `/api/submit-brief` writes to `mockup_requests`

## Brand

Palette tokens in `src/app/globals.css` `@theme`:

| Token | Hex | Role |
|---|---|---|
| navy | `#0B2545` | Primary surface |
| navy-deep | `#1B3C73` | Surface depth |
| gold | `#C5A05A` | Primary accent |
| gold-light | `#E8C97A` | Hover / glow |
| green | `#00843D` | Confirm · Irish (sparingly) |
| cloud | `#F5F7FA` | Light breathing room |
| silver | `#C0C7CF` | Borders, dividers |
| slate | `#6B7280` | Body text |

**No `#000`, `bg-black`, `text-black`, `border-black`, `#050b15`, or near-blacks in compiled CSS.** `@source not "../../public"` keeps Tailwind v4 from picking up `id="shadow"` in legacy SVGs.

## Sections (`src/components/`)

1. `site-nav.tsx` — sticky nav, mobile menu
2. `hero.tsx` — live build workspace with typewriter + line-by-line render
3. `trust-strip.tsx` — proof + Princeton/Harvard/Yale + client logos
4. `build-system.tsx` — 4-step scroll-linked pipeline (Plain English → Market Research → Visual System → Owned Launch)
5. `specialist-bench.tsx` — Princeton / Harvard / Yale agent cards
6. `template-gallery.tsx` — 9 industries, filter chips
7. `design-system-board.tsx` — color tokens (click-to-copy), type ramp, components
8. `integration-map.tsx` — node graph with pulse animations
9. `pricing.tsx` — Lead Page / Signature Build / Growth Build
10. `process.tsx` — Describe / Study / Build / Launch
11. `comparison.tsx` — Ownly vs Lovable/Bolt/Base44
12. `faq.tsx` — Radix Accordion (8 Qs)
13. `brief-form.tsx` — Supabase write + mailto fallback + clipboard
14. `site-footer.tsx` — 4-column + back-to-top

## SEO

- Title, description, canonical, OG, Twitter card in `app/layout.tsx`
- JSON-LD: `Organization` + `WebSite` + `ProfessionalService` (with AggregateOffer) + `BreadcrumbList`
- `app/sitemap.ts` + `app/robots.ts` (Next.js conventions)
- Open Graph image expected at `public/og.png` (1200×630) — to be generated

## Develop

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`:

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The brief form falls through to `mailto:` when Supabase is unconfigured.

## Database

```sql
create table public.mockup_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text,
  business text,
  phone text,
  industry text,
  budget text,
  current_website text,
  goal text,
  style_direction text,
  source text,
  user_agent text
);
```

## License

© Ownly ONCE LLC.
