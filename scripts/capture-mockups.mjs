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
