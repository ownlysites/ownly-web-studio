import type { Metadata } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI website builder service",
    "custom website design",
    "premium web studio",
    "local SEO websites",
    "AI agents for websites",
    "GitHub Vercel websites",
    "website mockup service",
    "Lovable alternative",
    "Bolt alternative",
    "Base44 alternative",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | AI-Guided Custom Websites`,
    description:
      "A premium web studio that turns plain English into custom websites, visuals, SEO, booking paths, and AI agent-ready launch systems.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ownly Web Studio — AI-guided custom websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | AI-Guided Custom Websites`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
  },
};

export const viewport = {
  themeColor: "#0B2545",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/assets/ownly-logo.png`,
      email: SITE.email,
      telephone: SITE.phone,
      brand: { "@type": "Brand", name: "Ownly ONCE" },
      sameAs: [SITE.socials.linkedin, SITE.socials.x, SITE.socials.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/assets/ownly-logo.png`,
      description:
        "AI-guided custom website strategy, visual direction, local SEO, booking flows, AI chat and voice agent planning, and Vercel launch support for business owners.",
      areaServed: "United States",
      telephone: SITE.phone,
      email: SITE.email,
      provider: { "@id": `${SITE.url}/#organization` },
      serviceType: [
        "Custom website design",
        "AI website planning",
        "Local SEO",
        "AI chat and voice agents",
        "Conversion copywriting",
        "Booking and lead capture",
      ],
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "750",
        highPrice: "5000",
        priceCurrency: "USD",
        offerCount: 3,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE.url,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${bebas.variable}`}
    >
      <body className="min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
