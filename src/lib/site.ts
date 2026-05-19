export const SITE = {
  url: "https://ownly-web-studio.vercel.app",
  name: "Ownly Web Studio",
  legalName: "Ownly ONCE LLC",
  tagline: "World-Class Custom Web Development & AI Launch Systems",
  description:
    "Ownly Web Studio builds custom websites that feel like product. We design, ship, and support the kind of site your competitors will study for years.",
  email: "david@ownly1nce.com",
  phone: "+1-941-277-9876",
  phoneDisplay: "941-277-9876",
  city: "Sarasota, Florida",
  calendly: "https://calendly.com/daveivery",
  founder: "Dave Ivery",
  founderCreds: "CFEI · PFSA · Author of 5 books",
  socials: {
    linkedin: "https://www.linkedin.com/in/daveivery",
    x: "https://x.com/daveivery",
    github: "https://github.com/ownlysites",
    instagram: "https://www.instagram.com/daveivery",
  },
} as const;

export const NAV_LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#brief", label: "Contact" },
];

export const CAPABILITY_TAGS = [
  "Custom Code",
  "Three.js",
  "WebGL",
  "Lottie",
  "Framer Motion",
  "Next.js",
  "Vercel",
  "Supabase",
  "GSAP",
  "AI Agents",
  "Local SEO",
  "Programmatic SEO",
  "Conversion",
  "shadcn/ui",
  "Radix",
  "Tailwind v4",
] as const;

export const CITIES = [
  { name: "Sarasota", lat: 27.336, lon: -82.531 },
  { name: "Austin", lat: 30.267, lon: -97.743 },
  { name: "NYC", lat: 40.713, lon: -74.006 },
  { name: "Toronto", lat: 43.651, lon: -79.347 },
  { name: "London", lat: 51.507, lon: -0.128 },
  { name: "Tokyo", lat: 35.676, lon: 139.65 },
  { name: "Sydney", lat: -33.868, lon: 151.209 },
  { name: "Dubai", lat: 25.276, lon: 55.296 },
] as const;
