#!/usr/bin/env node
// Lightweight still-only capture for the 3D demo section. Skips drag-spin
// because SwiftShader CPU-WebGL on this machine cannot sustain 3 concurrent
// scenes plus pointer events. Stills are enough to verify the build.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "qa", "3d-demos");
const URL = "http://localhost:3480";

async function run() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  // Desktop row of 3 cards
  const desk = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const dp = await desk.newPage();
  await dp.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await dp.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  await dp.waitForTimeout(3500);
  // Pre-walk the page to force lazy components + Framer whileInView to mount.
  for (const y of [600, 1400, 2400, 3400, 4400, 5400]) {
    await dp.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await dp.waitForTimeout(400);
  }
  // Now jump back to motion section explicitly.
  const motionTop = await dp.evaluate(() => {
    const el = document.getElementById("motion");
    return el ? el.getBoundingClientRect().top + window.scrollY - 88 : 0;
  });
  console.log("motion offsetTop:", motionTop);
  await dp.evaluate(
    (top) => window.scrollTo({ top, behavior: "instant" }),
    motionTop
  );
  await dp.waitForTimeout(9000); // R3F canvases on SwiftShader need a few seconds
  await dp.screenshot({ path: path.join(OUT, "row-all-three.png") });
  console.log("✓ row-all-three.png");

  // Individual card stills via clip rect (cards have running animation so
  // locator.screenshot's stability check would time out).
  const cards = ["Luxury Auto", "Apparel", "Beverage"];
  for (let i = 0; i < cards.length; i++) {
    const slug = cards[i].toLowerCase().replace(/\s+/g, "-");
    const cardTop = await dp.evaluate((idx) => {
      const els = document.querySelectorAll("#motion article");
      const el = els[idx];
      if (!el) return null;
      return el.getBoundingClientRect().top + window.scrollY - 80;
    }, i);
    if (cardTop !== null) {
      await dp.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        cardTop
      );
    }
    await dp.waitForTimeout(2500);
    const rect = await dp.evaluate((idx) => {
      const els = document.querySelectorAll("#motion article");
      const el = els[idx];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.floor(r.x));
      const y = Math.max(0, Math.floor(r.y));
      const w = Math.floor(Math.min(window.innerWidth - x, r.width));
      const h = Math.floor(Math.min(window.innerHeight - y, r.height));
      return w > 0 && h > 0 ? { x, y, width: w, height: h } : null;
    }, i);
    if (rect) {
      await dp.screenshot({
        path: path.join(OUT, `${slug}-still.png`),
        clip: rect,
      });
      console.log(`✓ ${slug}-still.png`);
    }
  }
  await desk.close();

  // Mobile
  const m = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mp = await m.newPage();
  await mp.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await mp.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await mp.waitForTimeout(3000);
  await mp.evaluate(() => {
    const el = document.getElementById("motion");
    if (el) el.scrollIntoView({ block: "start" });
    window.scrollBy(0, -60);
  });
  await mp.waitForTimeout(4000);
  await mp.screenshot({ path: path.join(OUT, "mobile-top.png") });
  console.log("✓ mobile-top.png");

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
