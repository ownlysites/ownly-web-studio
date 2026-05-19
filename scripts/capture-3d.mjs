#!/usr/bin/env node
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "qa", "3d-demos");
const URL = "http://localhost:3479";

async function dragSpin(page, selector, dx, dy) {
  const box = await page.locator(selector).boundingBox();
  if (!box) return;
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) {
    await page.mouse.move(cx + (dx * i) / 12, cy + (dy * i) / 12, { steps: 4 });
  }
  await page.mouse.up();
}

async function run() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Scroll motion section into view, give canvases a beat to mount + render.
  await page.evaluate(() => {
    const el = document.getElementById("motion");
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy(0, -88);
  });
  await page.waitForTimeout(3500);

  // Full row, all 3 cards
  await page.screenshot({ path: path.join(OUT, "row-all-three.png") });
  console.log("✓ row-all-three.png");

  // Individual cards — capture each before + after a drag spin
  const cards = ["Luxury Auto", "Apparel", "Beverage"];
  for (let i = 0; i < cards.length; i++) {
    const slug = cards[i].toLowerCase().replace(/\s+/g, "-");
    const cardLoc = page.locator("#motion article").nth(i);
    const canvasLoc = cardLoc.locator("canvas");

    // Scroll the card into view for clean shot (use evaluate to bypass stability check)
    await page.evaluate((idx) => {
      const els = document.querySelectorAll("#motion article");
      if (els[idx]) els[idx].scrollIntoView({ block: "center" });
    }, i);
    await page.waitForTimeout(1000);
    await cardLoc.screenshot({ path: path.join(OUT, `${slug}-before.png`) });
    console.log(`✓ ${slug}-before.png`);

    // Drag to spin
    const box = await canvasLoc.boundingBox();
    if (box) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy);
      await page.mouse.down();
      for (let j = 1; j <= 12; j++) {
        await page.mouse.move(cx + (220 * j) / 12, cy, { steps: 4 });
      }
      await page.mouse.up();
    }
    await page.waitForTimeout(900);
    await cardLoc.screenshot({ path: path.join(OUT, `${slug}-spun.png`) });
    console.log(`✓ ${slug}-spun.png`);
  }

  // Mobile view
  await ctx.close();
  const m = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mp = await m.newPage();
  await mp.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await mp.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await mp.waitForTimeout(2500);
  await mp.evaluate(() => {
    const el = document.getElementById("motion");
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    window.scrollBy(0, -60);
  });
  await mp.waitForTimeout(2500);
  await mp.screenshot({ path: path.join(OUT, "mobile-top.png") });
  console.log("✓ mobile-top.png");

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
