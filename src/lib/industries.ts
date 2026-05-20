export type Industry = {
  slug: string;
  label: string;
  short: string;
  description: string;
  iframe: string;
  loop: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "hotel",
    label: "HOTEL",
    short: "Boutique hospitality",
    description: "Reservation funnels and concierge AI for boutique stays.",
    iframe: "https://ownly-examples.vercel.app/hotel",
    loop: "/loops/hotel.mp4",
  },
  {
    slug: "restaurant",
    label: "RESTAURANT",
    short: "Reservations + menu",
    description: "Reservations, menu intelligence, and waitlist automation.",
    iframe: "https://ownly-examples.vercel.app/restaurant",
    loop: "/loops/restaurant.mp4",
  },
  {
    slug: "hvac",
    label: "HVAC",
    short: "Service trades",
    description: "Service tickets, dispatch AI, and call-deflection chat.",
    iframe: "https://ownly-examples.vercel.app/hvac",
    loop: "/loops/hvac.mp4",
  },
  {
    slug: "medspa",
    label: "MEDSPA",
    short: "Aesthetic medicine",
    description: "Treatment galleries, gated quotes, and a discreet intake agent.",
    iframe: "https://ownly-examples.vercel.app/medspa",
    loop: "/loops/medspa.mp4",
  },
  {
    slug: "wealth",
    label: "WEALTH",
    short: "RIA + planning",
    description: "Compliance-friendly wealth pages with quiet-money typography.",
    iframe: "https://ownly-examples.vercel.app/wealth",
    loop: "/loops/wealth.mp4",
  },
  {
    slug: "realestate",
    label: "REAL ESTATE",
    short: "Listings + agents",
    description: "Listing previews, neighborhood pages, and lead-route AI.",
    iframe: "https://ownly-examples.vercel.app/realestate",
    loop: "/loops/realestate.mp4",
  },
  {
    slug: "saas",
    label: "SAAS",
    short: "Product marketing",
    description: "Marketing site, docs, and a sales-floor agent for SaaS founders.",
    iframe: "https://ownly-examples.vercel.app/saas",
    loop: "/loops/saas.mp4",
  },
  {
    slug: "ai-agent",
    label: "AI AGENT",
    short: "Agent-first sites",
    description: "Agent-led pages — every section talks back and routes the lead.",
    iframe: "https://ownly-examples.vercel.app/ai-agent",
    loop: "/loops/ai-agent.mp4",
  },
];
