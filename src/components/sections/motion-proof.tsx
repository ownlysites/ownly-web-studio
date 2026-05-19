"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { SceneFrame } from "./three-demos/scene-frame";

const Car = dynamic(() => import("./three-demos/car").then((m) => m.Car), { ssr: false });
const TShirt = dynamic(() => import("./three-demos/tshirt").then((m) => m.TShirt), { ssr: false });
const Can = dynamic(() => import("./three-demos/can").then((m) => m.Can), { ssr: false });

export function MotionProof() {
  return (
    <section
      id="motion"
      className="relative border-b border-[var(--line)] py-24 md:py-32"
    >
      <div className="wrap">
        <SectionHeader
          kicker="Live 3D · Drag to spin"
          title={
            <>
              Spin it. Drag it.{" "}
              <em className="font-display italic text-gold-deep">
                We made these in code.
              </em>
            </>
          }
          subtitle="Three real 3D products, rendering live on this page. No video, no GIF — full interactive models you control."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <SceneFrame
              label="Luxury Auto"
              caption="Wedge-profile supercar · champagne paint · drag to orbit"
              cameraPosition={[3.5, 1.8, 5.5]}
              cameraFov={36}
              background="radial-gradient(700px 500px at 70% 25%, rgb(232 201 122 / 0.22), transparent 60%), linear-gradient(180deg, #0B2545, #1B3C73)"
            >
              {(autoRotate) => <Car autoRotate={autoRotate} />}
            </SceneFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <SceneFrame
              label="Apparel"
              caption="Premium tee · canvas-printed mark · drag to see front + back"
              cameraPosition={[0, 0.4, 4.4]}
              cameraFov={32}
              background="radial-gradient(700px 500px at 50% 30%, rgb(244 237 224 / 0.6), transparent 60%), linear-gradient(180deg, #20354f, #0B2545)"
            >
              {(autoRotate) => <TShirt autoRotate={autoRotate} />}
            </SceneFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <SceneFrame
              label="Beverage"
              caption="12oz aluminum can · brand-tinted label · drag to inspect 360°"
              cameraPosition={[2, 0.6, 4.2]}
              cameraFov={30}
              background="radial-gradient(700px 500px at 80% 20%, rgb(0 133 200 / 0.22), transparent 60%), linear-gradient(180deg, #1B3C73, #0B2545)"
            >
              {(autoRotate) => <Can autoRotate={autoRotate} />}
            </SceneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
