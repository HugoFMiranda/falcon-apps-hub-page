// Captures a real screenshot of each project for the portfolio mockup tiles.
// Manual: `npm run mockups`, or `npm run mockups -- --only casefile,food-twin`.
import { chromium } from "playwright";
import { readFile, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "mockups");

/**
 * One recipe per app id in lib/apps.ts.
 * `prepare` runs after navigation, before the screenshot. `clip` is in CSS pixels.
 * `quality` overrides the default webp quality of 90 for captures that compress badly.
 */
const RECIPES = [
  {
    id: "casefile",
    url: "https://casefile.hugofmiranda.com",
    viewport: { width: 1280, height: 800 },
    themes: ["light"],
    // Illustrated, full-bleed and noisy, so it costs about twice what the other
    // captures do at the default quality: 224 KB at 90, and still 159 KB at 80.
    // 72 brings it under the 150 KB budget, and the tile paints it at 288px wide
    // where the difference is not visible.
    quality: 72,
  },
  {
    id: "anime-calendar",
    url: "https://anime-calendar.net/today",
    viewport: { width: 1280, height: 800 },
    themes: ["light"],
    // Two card columns and three complete rows, cut on the gutter after column
    // two. The full viewport left a dead white band under the grid and shrank the
    // poster art past the point of being readable at 288px. Kept narrower than
    // the tile's narrowest aspect (4:3) so object-cover only ever trims the
    // bottom, never the sides: a half-row reads as a list, a half-word does not.
    clip: { x: 0, y: 0, width: 640, height: 512 },
  },
  {
    // Product is behind a login with no working demo account, so the marketing
    // hero (which embeds a realistic appointment list) is the best available frame.
    id: "agendex",
    url: "https://agendex.hugofmiranda.com",
    viewport: { width: 1280, height: 800 },
    themes: ["light"],
    prepare: async (page) => {
      await page.getByRole("button", { name: "Aceitar" }).click({ timeout: 5000 });
      await page.waitForTimeout(600);
    },
    clip: { x: 640, y: 200, width: 560, height: 420 },
  },
  {
    // Same situation as Agendex: see the "Known blocker" section of the plan.
    id: "broke-but-optimistic",
    url: "https://unbroke-finances.vercel.app/",
    // At 1280 the hero stretches into a 2:1 letterbox that the tile has to crop
    // through the headline. At 1024 the same hero is a 1.5:1 block, which is the
    // shape the tile actually wants, so nothing gets sliced.
    viewport: { width: 1024, height: 800 },
    themes: ["dark", "light"],
    prepare: async (page, theme) => {
      // The site loads dark. Its toggle button's accessible name is the action
      // ("Switch to light mode"), not the visible text ("Dark mode enabled").
      if (theme === "light") {
        await page.getByRole("button", { name: /light mode/i }).click({ timeout: 5000 });
        await page.waitForTimeout(800);
      }
    },
    // The hero card exactly: headline, both buttons, and the "Feels familiar?" panel.
    clip: { x: 36, y: 140, width: 952, height: 630 },
  },
  {
    id: "algorithm-playground",
    url: "https://playground.hugofmiranda.com/algorithms/a-star",
    // Taller than the brief's estimate so the full 6-row grid clears the fold;
    // the original 1000px viewport cut the grid off after 2 rows.
    viewport: { width: 1280, height: 1300 },
    themes: ["light"],
    prepare: async (page) => {
      // Run the visualizer so the grid shows an in-progress search, not a blank board.
      await page.getByRole("button", { name: "Play" }).click({ timeout: 8000 });
      // Playback steps one node at a time and starts from an all-"g=inf" board.
      // A fixed short wait leaves the grid nearly colorless, so wait until enough
      // cells carry a real score. Soft failure: a half-explored grid still beats
      // aborting the capture, but say so, because the tile will be washed out.
      await page
        .waitForFunction(() => (document.body.innerText.match(/g=\d/g) || []).length >= 24, null, {
          timeout: 60000,
        })
        .catch((error) => {
          console.warn("  warn algorithm-playground: grid never filled in, tile will look pale");
          console.warn(`       ${error.message.split("\n")[0]}`);
        });
    },
    // Tight crop on the stats row + colored grid; skips the page header and the
    // Parameters sidebar, which are static text with no visual density.
    clip: { x: 32, y: 560, width: 816, height: 670 },
  },
  {
    id: "food-twin",
    url: "https://food.hugofmiranda.com/search",
    viewport: { width: 1280, height: 900 },
    themes: ["light"],
    prepare: async (page) => {
      await page.getByPlaceholder("Enter a food name...").fill("chicken breast");
      await page.keyboard.press("Enter");
      // Results are fetched, so wait for the match badge rather than a fixed delay.
      await page.getByText(/% match/).first().waitFor({ timeout: 20000 });
    },
    clip: { x: 180, y: 90, width: 920, height: 700 },
  },
  {
    id: "falcon-tools",
    url: "https://tools.hugofmiranda.com/tools/pdf/reorder.php",
    viewport: { width: 1280, height: 900 },
    themes: ["light"],
    prepare: async (page) => {
      // Every tool page is an empty state until a file is loaded, so make one.
      // The sample has to carry color and layout: blank pages reading "Page 1"
      // turn the thumbnail grid into white cards on a white panel, which tells a
      // portfolio visitor nothing about what the tool does.
      const accents = ["#2563eb", "#0d9488", "#db2777", "#ea580c", "#7c3aed", "#0891b2"];
      const scratch = await page.context().newPage();
      await scratch.setContent(
        `<style>
          *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          body{margin:0;font-family:system-ui,sans-serif;color:#0f172a}
          .p{page-break-after:always;height:96vh;padding:52px 60px;display:flex;
             flex-direction:column;gap:26px}
          .band{height:16px;border-radius:8px}
          h1{font-size:44px;line-height:1.04;margin:0;letter-spacing:-0.02em}
          .sub{font-size:19px;color:#64748b;margin:0}
          .line{height:13px;border-radius:7px;background:#e2e8f0;margin-bottom:15px}
          .chart{display:flex;align-items:flex-end;gap:20px;height:240px;margin-top:auto}
          .chart span{flex:1;border-radius:9px 9px 0 0}
        </style>` +
        accents
          .map((accent, i) => {
            const bars = [58, 86, 42, 97, 71, 34]
              .map((h, j) => {
                const pct = ((h + i * 9) % 70) + 30;
                return `<span style="height:${pct}%;background:${accent};opacity:${0.35 + j * 0.13}"></span>`;
              })
              .join("");
            const lines = Array.from(
              { length: 5 },
              (_, j) => `<div class="line" style="width:${[100, 92, 97, 78, 88][j]}%"></div>`
            ).join("");
            return `<section class="p">
              <div class="band" style="background:${accent}"></div>
              <h1>Quarterly Report</h1>
              <p class="sub">Section ${i + 1} of ${accents.length}</p>
              <div>${lines}</div>
              <div class="chart">${bars}</div>
            </section>`;
          })
          .join("")
      );
      const pdf = await scratch.pdf({ format: "A4", printBackground: true });
      await scratch.close();

      await page.locator('input[type="file"]').setInputFiles({
        name: "sample.pdf",
        mimeType: "application/pdf",
        buffer: pdf,
      });
      // The counter reads files loaded, not pages: one PDF of 6 pages shows "1 loaded".
      await page.getByText("1 loaded").waitFor({ timeout: 20000 });
      await page.waitForTimeout(1500); // thumbnail rendering
    },
    // Tight on the Sequence panel's thumbnail grid; the brief's estimate leaned
    // left into the mostly-empty Files panel instead.
    clip: { x: 455, y: 205, width: 770, height: 460 },
  },
];

async function appIdsFromSource() {
  const src = await readFile(path.join(ROOT, "lib", "apps.ts"), "utf8");
  return [...src.matchAll(/^\s{4}id: "([^"]+)",$/gm)].map((m) => m[1]);
}

async function capture(browser, recipe, theme) {
  const context = await browser.newContext({
    viewport: recipe.viewport,
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  const page = await context.newPage();
  try {
    await page.goto(recipe.url, { waitUntil: "networkidle", timeout: 45000 });
    if (recipe.prepare) await recipe.prepare(page, theme);
    // Let fonts settle and any entrance animation finish.
    await page.waitForTimeout(1200);
    const file = path.join(OUT_DIR, `${recipe.id}-${theme}.webp`);
    await page.screenshot({
      path: file,
      type: "webp",
      quality: recipe.quality ?? 90,
      clip: recipe.clip,
    });
    console.log(`  ok   ${recipe.id}-${theme}.webp`);
  } finally {
    await context.close();
  }
}

const onlyArg = process.argv.find((a) => a.startsWith("--only"));
const only = onlyArg
  ? (onlyArg.includes("=") ? onlyArg.split("=")[1] : process.argv[process.argv.indexOf(onlyArg) + 1])
      .split(",")
      .map((s) => s.trim())
  : null;

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const failures = [];

for (const recipe of RECIPES) {
  if (only && !only.includes(recipe.id)) continue;
  for (const theme of recipe.themes) {
    console.log(`capturing ${recipe.id} (${theme})`);
    try {
      await capture(browser, recipe, theme);
    } catch (error) {
      // One broken selector must not abort the other seven apps.
      console.error(`  FAIL ${recipe.id}-${theme}: ${error.message}`);
      failures.push(`${recipe.id}-${theme}`);
    }
  }
}
await browser.close();

// Coverage: every app in lib/apps.ts needs at least one captured file.
const written = await readdir(OUT_DIR).catch(() => []);
const missing = (await appIdsFromSource()).filter(
  (id) => !written.some((f) => f.startsWith(`${id}-`))
);
if (missing.length) console.error(`\nno mockup for: ${missing.join(", ")}`);
if (failures.length) console.error(`failed captures: ${failures.join(", ")}`);
process.exit(failures.length || missing.length ? 1 : 0);
