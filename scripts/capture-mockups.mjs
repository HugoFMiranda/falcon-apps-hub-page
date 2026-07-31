// Captures a real screenshot of each project for the portfolio mockup tiles.
// Manual: `npm run mockups`, or `npm run mockups -- --only casefile,food-twin`.
// Yomu is not here: it is an Android app, captured by `npm run mockups:yomu`.
import { chromium } from "playwright";
import { readFile, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "mockups");

/**
 * One recipe per app id in lib/apps.ts, in the same order as APPS so the two
 * lists can be diffed by eye.
 * `prepare` runs after navigation, before the screenshot. `clip` is in CSS pixels.
 * `quality` overrides the default webp quality of 90 for captures that compress badly.
 */
const RECIPES = [
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
    // The hero's embedded card is itself drawn as a mock window, with its own
    // traffic lights and a "Today" title bar. The tile already puts real window
    // chrome around every screenshot, so the crop starts just below that title
    // bar: two rows of dots 30px apart looks like a mistake. What is left is the
    // appointment list edge to edge, from the first row down to the footer, with
    // the pale empty page margin above the card trimmed off as well.
    clip: { x: 733, y: 305, width: 399, height: 305 },
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
    // left into the mostly-empty Files panel instead. x sits about 15px clear of
    // the first card's left edge: any further right and card 1 loses its border
    // while cards 2 to 4 keep theirs, which reads as a rendering bug.
    clip: { x: 440, y: 205, width: 785, height: 460 },
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
    // The results column is centered in the viewport, so x and width drop the two
    // empty gutters and nothing else. y starts just above the page heading, below
    // the site header. The height is the part that matters: 700px is the searched
    // food's macro card plus the first ranked match underneath it, and that pair
    // is the whole product. Stopping short shows only the food you typed in, which
    // looks like a nutrition lookup rather than a comparison tool.
    clip: { x: 180, y: 90, width: 920, height: 700 },
  },
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
    // Starts below the "Today / <capture date>" header. That header rendered the
    // date in large type at the very top of the crop, and because the tile pins
    // the image with object-top it was always visible, so the tile advertised how
    // old the screenshot was. Below it is the populated card grid, which is the
    // more interesting content anyway: two columns and four complete rows, cut on
    // a gutter. Kept narrower than the tile's narrowest aspect (4:3) so
    // object-cover only ever trims the bottom, never the sides: a half-row reads
    // as a list, a half-word does not.
    clip: { x: 0, y: 150, width: 640, height: 512 },
  },
];

async function appIdsFromSource() {
  const src = await readFile(path.join(ROOT, "lib", "apps.ts"), "utf8");
  return [...src.matchAll(/^\s{4}id: "([^"]+)",$/gm)].map((m) => m[1]);
}

/** The ids the tile component will actually ask for a `-dark.webp` file for. */
async function darkCaptureIdsFromSource() {
  const src = await readFile(path.join(ROOT, "components", "app-mockup.tsx"), "utf8");
  const block = src.match(/const DARK_CAPTURES = new Set\(\[([^\]]*)\]\)/);
  if (!block) throw new Error("could not find DARK_CAPTURES in components/app-mockup.tsx");
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
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

const RECIPE_IDS = RECIPES.map((r) => r.id);
const USAGE = "usage: npm run mockups -- --only casefile,food-twin";

function parseOnly(argv) {
  const index = argv.findIndex((a) => a === "--only" || a.startsWith("--only="));
  if (index === -1) return null;
  const arg = argv[index];
  const raw = arg.startsWith("--only=") ? arg.slice("--only=".length) : argv[index + 1];
  const ids = (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!ids.length) {
    console.error(`--only needs at least one recipe id.\n${USAGE}`);
    process.exit(1);
  }
  // Without this a typo silently captures nothing, leaves the stale files in
  // place, finds no failures and exits 0, which reads as "refresh succeeded".
  const unknown = ids.filter((id) => !RECIPE_IDS.includes(id));
  if (unknown.length) {
    console.error(`unknown --only id: ${unknown.join(", ")}`);
    console.error(`known ids: ${RECIPE_IDS.join(", ")}`);
    process.exit(1);
  }
  return ids;
}

const only = parseOnly(process.argv);

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

// Coverage. Filenames are compared exactly, never by prefix: a prefix match would
// let food-twin-light.webp stand in for a future app id of "food".
const appIds = await appIdsFromSource();
const darkIds = await darkCaptureIdsFromSource();
const written = new Set(await readdir(OUT_DIR).catch(() => []));

// Every app falls back to its light file, and the component only ever reaches for
// a dark file for the ids it lists. Yomu's two files land here from the other script.
const expected = new Set(appIds.map((id) => `${id}-light.webp`));
for (const id of darkIds) expected.add(`${id}-dark.webp`);

const problems = [...expected]
  .sort()
  .filter((file) => !written.has(file))
  .map((file) => `missing ${file}`);

for (const id of darkIds) {
  if (!appIds.includes(id)) {
    problems.push(`DARK_CAPTURES lists "${id}", which is not an app id in lib/apps.ts`);
  }
}
// The mirror image of a missing dark file: a dark capture nothing will ever serve.
for (const recipe of RECIPES) {
  if (recipe.themes.includes("dark") && !darkIds.includes(recipe.id)) {
    problems.push(`${recipe.id} captures a dark theme but is not in DARK_CAPTURES, so its dark file is never served`);
  }
}

const stale = [...written].filter((f) => f.endsWith(".webp") && !expected.has(f));
if (stale.length) console.warn(`\nunused files in public/mockups: ${stale.join(", ")}`);

if (problems.length) {
  console.error("\ncoverage:");
  for (const problem of problems) console.error(`  ${problem}`);
  if (problems.some((p) => p.startsWith("missing yomu-"))) {
    console.error("  Yomu is captured separately: run `npm run mockups:yomu`, or");
    console.error("  `npm run mockups:all` to refresh everything in one go.");
  }
}
if (failures.length) console.error(`\nfailed captures: ${failures.join(", ")}`);
process.exit(failures.length || problems.length ? 1 : 0);
