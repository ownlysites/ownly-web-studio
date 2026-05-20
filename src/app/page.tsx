import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import StatStrip from "@/components/sections/StatStrip";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Process from "@/components/sections/Process";
import Intake from "@/components/sections/Intake";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatStrip />
        <Services />
        <Gallery />
        <Process />
        <Pricing />
        <Testimonials />
        <Intake />
      </main>
      <Footer />
    </>
  );
}
