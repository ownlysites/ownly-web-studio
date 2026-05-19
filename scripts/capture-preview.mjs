#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "qa", "v2-edits");

const URL =
  "https://ownly-web-studio-git-v2-cinematic-david-iverys-projects.vercel.app";

async function run() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  console.log("Loading", URL);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Shot 1: scroll to hero → gallery transition
  await page.evaluate(() => {
    const el = document.getElementById("studio");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4;
      window.scrollTo({ top, behavior: "instant" });
    }
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, "01-hero-to-gallery.png") });
  console.log("✓ 01-hero-to-gallery.png");

  // Shot 2: industry showcase pure
  await page.evaluate(() => {
    const el = document.getElementById("studio");
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
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
