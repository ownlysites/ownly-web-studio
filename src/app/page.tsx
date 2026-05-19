import { SiteNav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { IndustryGallery } from "@/components/sections/industry-gallery";
import { BuildPipeline } from "@/components/sections/build-pipeline";
import { Capabilities } from "@/components/sections/capabilities";
import { MotionProof } from "@/components/sections/motion-proof";
import { IntegrationMap } from "@/components/sections/integration-map";
import { Pricing } from "@/components/sections/pricing";
import { Comparison } from "@/components/sections/comparison";
import { Founder } from "@/components/sections/founder";
import { FAQ } from "@/components/sections/faq";
import { BriefForm } from "@/components/sections/brief-form";
import { SiteFooter } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="relative">
        <Hero />
        <IndustryGallery />
        <BuildPipeline />
        <Capabilities />
        <MotionProof />
        <IntegrationMap />
        <Pricing />
        <Comparison />
        <Founder />
        <FAQ />
        <BriefForm />
      </main>
      <SiteFooter />
    </>
  );
}
