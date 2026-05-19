import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "custom web development",
    "AI website builder",
    "Three.js development",
    "premium web studio",
    "Lovable alternative",
    "Bolt alternative",
    "Base44 alternative",
    "Readdy alternative",
    "Next.js agency",
    "Vercel agency",
    "Sarasota web studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | World-Class Custom Web Development`,
    description: SITE.description,
    images: [{ url: "/og", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Custom Web Development & AI`,
    description: SITE.description,
    images: ["/og"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: { icon: "/favicon.ico" },
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
      logo: `${SITE.url}/og`,
      email: SITE.email,
      telephone: SITE.phone,
      address: { "@type": "PostalAddress", addressLocality: "Sarasota", addressRegion: "FL", addressCountry: "US" },
      sameAs: Object.values(SITE.socials),
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
      image: `${SITE.url}/og`,
      description: SITE.description,
      areaServed: ["United States", "Canada", "United Kingdom", "Australia"],
      telephone: SITE.phone,
      email: SITE.email,
      provider: { "@id": `${SITE.url}/#organization` },
      serviceType: [
        "Custom website development",
        "AI agent integration",
        "Three.js and WebGL",
        "Conversion-focused design",
        "Local + programmatic SEO",
        "Vercel + Supabase launch",
      ],
      offers: { "@type": "AggregateOffer", lowPrice: "750", highPrice: "5000", priceCurrency: "USD", offerCount: 3 },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/#breadcrumbs`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: [
        { "@type": "Question", name: "What if I have a site already?", acceptedAnswer: { "@type": "Answer", text: "We preserve the SEO inertia. Most rebuilds keep the URL, title structure, and high-performing content while replacing the visual system and conversion path." } },
        { "@type": "Question", name: "How fast is the first mockup?", acceptedAnswer: { "@type": "Answer", text: "Lead Pages typically ship the same week. Full custom builds: two to six weeks depending on scope." } },
        { "@type": "Question", name: "Do you build AI agents?", acceptedAnswer: { "@type": "Answer", text: "Yes. Chat, voice, and form agents for lead capture, qualification, booking, and follow-up." } },
        { "@type": "Question", name: "Custom or template?", acceptedAnswer: { "@type": "Answer", text: "Custom. Every site is hand-built. Templates are used as infrastructure accelerators only, never as final creative direction." } },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
