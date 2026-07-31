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
 */
const RECIPES = [
  {
    id: "casefile",
    url: "https://casefile.hugofmiranda.com",
    viewport: { width: 1280, height: 800 },
    themes: ["light"],
  },
  {
    id: "anime-calendar",
    url: "https://anime-calendar.net/today",
    viewport: { width: 1280, height: 800 },
    themes: ["light"],
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
    viewport: { width: 1280, height: 800 },
    themes: ["dark", "light"],
    prepare: async (page, theme) => {
      // The site loads dark. Its toggle button's accessible name is the action
      // ("Switch to light mode"), not the visible text ("Dark mode enabled").
      if (theme === "light") {
        await page.getByRole("button", { name: /light mode/i }).click({ timeout: 5000 });
        await page.waitForTimeout(800);
      }
    },
    clip: { x: 40, y: 140, width: 1200, height: 580 },
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
      await page.waitForTimeout(1200);
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
      const scratch = await page.context().newPage();
      await scratch.setContent(
        Array.from({ length: 6 }, (_, i) =>
          `<section style="page-break-after:always;font:600 64px system-ui;` +
          `display:grid;place-items:center;height:96vh">Page ${i + 1}</section>`
        ).join("")
      );
      const pdf = await scratch.pdf({ format: "A4" });
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
    await page.screenshot({ path: file, type: "webp", quality: 90, clip: recipe.clip });
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
