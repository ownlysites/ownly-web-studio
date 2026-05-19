import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { BuildSystemPipeline } from "@/components/build-system";
import { SpecialistBench } from "@/components/specialist-bench";
import { TemplateGallery } from "@/components/template-gallery";
import { DesignSystemBoard } from "@/components/design-system-board";
import { IntegrationMap } from "@/components/integration-map";
import { Pricing } from "@/components/pricing";
import { Process } from "@/components/process";
import { Comparison } from "@/components/comparison";
import { FAQ } from "@/components/faq";
import { BriefForm } from "@/components/brief-form";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="relative">
        <Hero />
        <TrustStrip />
        <BuildSystemPipeline />
        <SpecialistBench />
        <TemplateGallery />
        <DesignSystemBoard />
        <IntegrationMap />
        <Pricing />
        <Process />
        <Comparison />
        <FAQ />
        <BriefForm />
      </main>
      <SiteFooter />
    </>
  );
}
