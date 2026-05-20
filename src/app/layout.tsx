import type { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/lib/site";
import ConciergeFrame from "@/components/ConciergeFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ownly Web Studio — Custom AI-Guided Websites · From $1,500 · Free Mockup in 24 hrs",
  description:
    "Editorial-quality Next.js websites with AI agents, SEO, and conversion tracking baked in. From $1,500 lead pages to $25K+ bespoke builds. Free 24-hour mockup, no card.",
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: "Ownly Web Studio — Custom AI-Guided Websites",
    description:
      "From $1,500 lead pages to $25K+ bespoke builds. Free 24-hour mockup, no card.",
    type: "website",
    url: SITE.url,
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ownly Web Studio",
    description:
      "Editorial-quality Next.js sites with AI agents baked in. Free 24-hour mockup.",
    images: ["/og"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://ownly-examples.vercel.app" />
      </head>
      <body>
        {children}
        <ConciergeFrame />

        {/* Apollo visitor-ID tracker */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`(function(){try{var n=Math.random().toString(36).slice(2),s=document.createElement("script");
            s.async=!0;s.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
            s.onload=function(){window.trackingFunctions&&window.trackingFunctions.onLoad({appId:"${SITE.apolloId}"});};
            document.head.appendChild(s);}catch(e){}})();`}
        </Script>

        {/* JSON-LD Service */}
        <Script id="ld-service" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: SITE.name,
            url: SITE.url,
            telephone: SITE.phone,
            email: SITE.email,
            areaServed: "US",
            priceRange: "$$$",
            provider: {
              "@type": "Organization",
              name: SITE.org,
              url: "https://ownly1nce.com",
            },
            makesOffer: [
              {
                "@type": "Offer",
                name: "Lead Page",
                price: "1500",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Industry Site",
                price: "5000",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Bespoke Build",
                price: "15000",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "AI Agent Only",
                price: "2500",
                priceCurrency: "USD",
              },
            ],
          })}
        </Script>
      </body>
    </html>
  );
}
