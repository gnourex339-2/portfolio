/**
 * Generates public/og-image.png (1200×630) — the social-share card.
 * Text is vectorized from the real fonts (Space Grotesk / JetBrains Mono) so the
 * output needs no system fonts and renders identically everywhere.
 *
 * Each unique glyph is converted to a path ONCE at the origin (avoids an
 * opentype.js cache bug that produces NaN when the same glyph is re-rendered at
 * a new x) and placed via an SVG translate. Run: node scripts/generate-og.mjs
 */
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const fontsDir = resolve(root, "node_modules/@fontsource");

const W = 1200;
const H = 630;
const PAD = 90;

const COL = {
  bg: "#0F1B2D",
  bgTop: "#16273f",
  ink: "#F4F7FB",
  muted: "#8aa0bd",
  accent: "#3B82F6",
  line: "#23344d",
};

function loadFont(rel) {
  const b = readFileSync(resolve(fontsDir, rel));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}

const FONTS = {
  display: loadFont("space-grotesk/files/space-grotesk-latin-700-normal.woff"),
  displayMed: loadFont("space-grotesk/files/space-grotesk-latin-500-normal.woff"),
  mono: loadFont("jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff"),
};

// Cache: one path string per (font, size, char), generated at the origin.
const glyphCache = new Map();
function glyphAtOrigin(fontKey, ch, size) {
  const key = `${fontKey}|${size}|${ch}`;
  if (!glyphCache.has(key)) {
    const d = FONTS[fontKey].getPath(ch, 0, 0, size, { kerning: false }).toPathData(2);
    glyphCache.set(key, d);
  }
  return glyphCache.get(key);
}

/** Render `text` starting at baseline (x, y). Returns { svg, width }. */
function text(fontKey, str, x, y, size, fill) {
  const font = FONTS[fontKey];
  let cursor = x;
  let svg = "";
  for (const ch of str) {
    const d = glyphAtOrigin(fontKey, ch, size);
    if (d) svg += `<path d="${d}" fill="${fill}" transform="translate(${cursor.toFixed(2)} ${y})" />`;
    cursor += font.getAdvanceWidth(ch, size, { kerning: false });
  }
  return { svg, width: cursor - x };
}

/** Several coloured runs laid out left-to-right from x. */
function runs(fontKey, segments, x, y, size) {
  let cursor = x;
  let svg = "";
  for (const [str, fill] of segments) {
    const r = text(fontKey, str, cursor, y, size, fill);
    svg += r.svg;
    cursor += r.width;
  }
  return { svg, width: cursor - x };
}

function widthOf(fontKey, str, size) {
  const font = FONTS[fontKey];
  let w = 0;
  for (const ch of str) w += font.getAdvanceWidth(ch, size, { kerning: false });
  return w;
}

// ---- Compose ----
const name = text("display", "Amine Benzerga", PAD, 360, 118, COL.ink).svg;

const subtitle = runs(
  "displayMed",
  [
    ["Cloud", COL.ink],
    ["  ·  ", COL.accent],
    ["Infrastructure", COL.ink],
    ["  ·  ", COL.accent],
    ["Data", COL.ink],
  ],
  PAD,
  430,
  44,
).svg;

const status = text(
  "mono",
  "En recherche d'alternance · Rentrée 2026",
  PAD + 44,
  548,
  24,
  COL.muted,
).svg;

const handleStr = "github.com/gnourex339-2";
const handle = text(
  "mono",
  handleStr,
  W - PAD - widthOf("mono", handleStr, 22),
  548,
  22,
  COL.muted,
).svg;

const mark = `
  <g transform="translate(${PAD}, 96) scale(1.7)" fill="none" stroke="${COL.accent}"
     stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 14 L6 24 L16 34" />
    <path d="M28 12 L20 36" />
    <path d="M32 14 L42 24 L32 34" />
  </g>`;

const gridlines = Array.from({ length: 9 }, (_, i) => {
  const x = PAD + i * ((W - PAD * 2) / 8);
  return `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${COL.line}" stroke-width="1" opacity="0.25" />`;
}).join("");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="28%" cy="0%" r="120%">
      <stop offset="0%" stop-color="${COL.bgTop}" />
      <stop offset="65%" stop-color="${COL.bg}" />
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)" />
  ${gridlines}
  <line x1="${PAD}" y1="541" x2="${PAD + 28}" y2="541" stroke="${COL.accent}" stroke-width="3" stroke-linecap="round" />
  ${mark}
  ${name}
  ${subtitle}
  ${status}
  ${handle}
</svg>`;

mkdirSync(resolve(root, "public"), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(resolve(root, "public/og-image.png"));
console.log("✓ public/og-image.png (1200×630) generated");
