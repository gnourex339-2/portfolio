/**
 * Dev screenshot helper — drives the installed Edge to scroll to a section and capture it.
 * Usage: node scripts/shoot.mjs <selector|y> <outfile>
 * Example: node scripts/shoot.mjs "#experience" exp.png
 */
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const target = process.argv[2] ?? "#experience";
const out = `scripts/${process.argv[3] ?? "_shot.png"}`;
const extra = Number(process.argv[4] ?? 0); // extra px to scroll after reaching target

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,1000"],
  defaultViewport: { width: 1440, height: 1000 },
});
const page = await browser.newPage();
await page.goto("http://localhost:5174/", { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 1200)); // let the SPA mount

// Scroll the target into view (or to an absolute Y if a number was passed).
if (/^\d+$/.test(target)) {
  await page.evaluate((y) => window.scrollTo(0, Number(y)), target);
} else {
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, target);
}

if (extra) await page.evaluate((dy) => window.scrollBy(0, dy), extra);

// Let reveal + cloud animations settle.
await new Promise((r) => setTimeout(r, 2600));
await page.screenshot({ path: out });
await browser.close();
console.log("✓", out);
