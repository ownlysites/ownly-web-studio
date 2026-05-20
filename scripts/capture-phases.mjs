#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "qa", "phases");
const URL = "http://localhost:3478";

const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

async function shoot(page, file) {
  await page.screenshot({ path: file, fullPage: false });
  console.log("  ✓", path.basename(file));
}

async function captureAt(browser, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Scroll the build-pipeline section into view.
  await page.evaluate(() => {
    const el = document.getElementById("process");
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy(0, -88);
  });
  await page.waitForTimeout(700);
  await shoot(page, path.join(OUT, `${vp.name}-before.png`));

  // Mobile path: vertical stack. After-shot = scroll inside section to last card.
  // Desktop path: horizontally scroll the inner track to its end.
  await page.evaluate(() => {
    const track = document.querySelector('#process [aria-label="Build pipeline phases"]');
    if (!track) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      track.scrollTo({ left: track.scrollWidth, behavior: "instant" });
    } else {
      // mobile vertical — scroll to end of section
      const sec = document.getElementById("process");
      if (sec) window.scrollTo({ top: sec.offsetTop + sec.offsetHeight - window.innerHeight, behavior: "instant" });
    }
  });
  await page.waitForTimeout(700);
  await shoot(page, path.join(OUT, `${vp.name}-after.png`));

  await ctx.close();
}

async function run() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    console.log(`[${vp.name}px]`);
    await captureAt(browser, vp);
  }
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
