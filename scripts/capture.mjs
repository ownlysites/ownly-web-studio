#!/usr/bin/env node
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MINI_ROOT = path.join(ROOT, "_mini_sites");
const OUT_DIR = path.join(ROOT, "public", "examples");
const REF_DIR = path.join(ROOT, "qa", "reference");

const VERTICALS = [
  "hotel",
  "restaurant",
  "hvac",
  "medspa",
  "wealth",
  "realestate",
  "saas",
  "ai-agent",
];

const REFS = [
  { name: "lovable", url: "https://lovable.dev" },
  { name: "bolt", url: "https://bolt.new" },
  { name: "base44", url: "https://base44.com" },
  { name: "readdy", url: "https://readdy.ai" },
  { name: "vercel", url: "https://vercel.com" },
  { name: "linear", url: "https://linear.app" },
  { name: "apple-iphone", url: "https://www.apple.com/iphone-15-pro/" },
];

const LIVE_REFS = [
  { name: "cwa", url: "https://campbellwealthadvice.com" },
  { name: "itsownlymoney", url: "https://itsownlymoney.vercel.app" },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

async function serveMiniSites(port = 4477) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://localhost:${port}`);
      let p = decodeURIComponent(url.pathname);
      if (p.endsWith("/")) p = path.join(p, "index.html");
      const full = path.join(MINI_ROOT, p);
      if (!full.startsWith(MINI_ROOT)) {
        res.writeHead(403).end("forbidden");
        return;
      }
      const s = await stat(full).catch(() => null);
      if (!s || !s.isFile()) {
        res.writeHead(404).end("not found");
        return;
      }
      const ext = path.extname(full).toLowerCase();
      res.writeHead(200, { "content-type": MIME[ext] || "application/octet-stream" });
      res.end(await readFile(full));
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  });
  await new Promise((r) => server.listen(port, r));
  return server;
}

async function ensureDirs() {
  for (const d of [OUT_DIR, REF_DIR]) {
    if (!existsSync(d)) await mkdir(d, { recursive: true });
  }
}

async function captureSiteAt(page, url, outPath) {
  console.log(`  → ${url}`);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(800);
  } catch (err) {
    console.warn(`    ✗ load failed: ${err.message}`);
    return false;
  }
  try {
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`    ✓ ${path.basename(outPath)}`);
    return true;
  } catch (err) {
    console.warn(`    ✗ screenshot failed: ${err.message}`);
    return false;
  }
}

async function captureSecondary(page, url, outPath) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.4, behavior: "instant" }));
  await page.waitForTimeout(700);
  try {
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`    ✓ ${path.basename(outPath)}`);
    return true;
  } catch (err) {
    console.warn(`    ✗ secondary failed: ${err.message}`);
    return false;
  }
}

async function run() {
  await ensureDirs();
  console.log("Starting local server on :4477...");
  const server = await serveMiniSites();
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();

  console.log("\n=== Mini-site captures ===");
  for (const v of VERTICALS) {
    console.log(`\n[${v}]`);
    await captureSiteAt(page, `http://localhost:4477/${v}/`, path.join(OUT_DIR, `${v}-hero.png`));
    await captureSecondary(page, `http://localhost:4477/${v}/`, path.join(OUT_DIR, `${v}-secondary.png`));
  }

  console.log("\n=== Live-site captures (real Ownly work) ===");
  for (const r of LIVE_REFS) {
    console.log(`\n[${r.name}] ${r.url}`);
    await captureSiteAt(page, r.url, path.join(OUT_DIR, `${r.name}-hero.png`));
  }

  console.log("\n=== Competitor reference frames ===");
  for (const r of REFS) {
    console.log(`\n[${r.name}] ${r.url}`);
    await captureSiteAt(page, r.url, path.join(REF_DIR, `${r.name}-hero.png`));
  }

  await browser.close();
  server.close();
  console.log("\n✓ Captures complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
