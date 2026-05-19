#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "qa", "v2-edits");
const URL = "http://localhost:3477";

async function run() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);

  // Shot 1: hero → gallery transition. Scroll so hero bottom + gallery top are visible.
  await page.evaluate(() => {
    const el = document.getElementById("studio");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.55;
      window.scrollTo({ top, behavior: "instant" });
    }
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, "01-hero-to-gallery.png") });
  console.log("✓ 01-hero-to-gallery.png");

  // Shot 2: industry showcase pure (title + grid only)
  await page.evaluate(() => {
    const el = document.getElementById("studio");
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy(0, -90);
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, "02-industry-showcase.png") });
  console.log("✓ 02-industry-showcase.png");

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
