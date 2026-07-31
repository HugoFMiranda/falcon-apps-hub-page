# Project Screenshot Mockups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the eight hand-drawn SVG project mockups with real screenshots of the actual apps, captured by a committed script and rendered inside a small window frame in the existing tile.

**Architecture:** A standalone Playwright script (`scripts/capture-mockups.mjs`) holds one capture recipe per app id, drives each live site to the screen worth showing, and writes `public/mockups/<id>-<theme>.webp`. Yomu, an Android app, gets its frames pulled from its repo's `screens.gif` with ffmpeg. `components/app-mockup.tsx` is rewritten from 230 lines of inline SVG into a small presentational component that renders the captured image inside browser chrome. The project row layout does not change.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, TypeScript, Playwright (devDependency, manual runs only), ffmpeg (system binary, already present at `/usr/bin/ffmpeg`).

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-31-project-screenshot-mockups-design.md`. Read it before starting.
- **Read the Next.js docs before writing component code.** Per `AGENTS.md`, this is Next 16 and APIs differ from training data. Relevant file: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`.
- **Next 16 image specifics that apply here:** `priority` is deprecated in favour of `preload`. The `qualities` config defaults to `[75]`, so do not pass a `quality` prop with any other value unless you also add `images.qualities` to `next.config.ts`. Local images under `public/` need no `remotePatterns`.
- **No em dashes in user-facing copy.** Commit `08fdde` removed them deliberately.
- **No test framework exists in this repo.** Do not add one. Verification is by running the script, inspecting output images, and `npm run build`.
- **The capture script never runs during `next build`.** It is a manual `npm run mockups`.
- **Every generated image must be looked at before it is committed.** A capture showing a cookie banner, a loading skeleton, an empty state, or a login form is a failed capture.
- **Output naming is exact:** `public/mockups/<app.id>-light.webp` and `public/mockups/<app.id>-dark.webp`, where `<app.id>` is the `id` field in `lib/apps.ts`.

## Known blocker, already resolved

Broke But Optimistic cannot be captured logged in. The demo credentials published in `lib/apps.ts` (`demo@bbo.test` / `DemoPass123!`) fail against `bbo.hugofmiranda.com` with "Unable to sign in with that email and password." Cause is in `/var/www/bbo-demo/apps/web/lib/auth.ts:200`: the demo-user auto-provision branch is gated behind `process.env.NODE_ENV !== "production"`, and the deployed site runs in production, so the account is never created.

Fixing that is a separate job in a different repo and is **out of scope for this plan**. BBO therefore gets its marketing hero captured, same treatment as Agendex.

---

### Task 1: Capture script scaffold with the two zero-interaction apps

Casefile and AniCal already serve real product UI at their root URL, so they need no interaction. Getting them working proves the whole pipeline end to end.

**Files:**
- Create: `scripts/capture-mockups.mjs`
- Modify: `package.json` (add `playwright` devDependency, add `mockups` script)
- Create (generated, committed): `public/mockups/casefile-light.webp`, `public/mockups/anime-calendar-light.webp`

**Interfaces:**
- Consumes: `APPS` from `lib/apps.ts` (only the `id` field, read at runtime by parsing, see Step 3 note).
- Produces: a `RECIPES` array in `scripts/capture-mockups.mjs`. Each entry is
  `{ id: string, url: string, viewport: {width: number, height: number}, themes: string[], prepare?: (page, theme) => Promise<void>, clip?: {x,y,width,height} }`.
  Later tasks add entries to this array and rely on the runner calling `prepare` after navigation and before the screenshot.
- Produces: `npm run mockups` and `npm run mockups -- --only <id>` (comma-separated ids) for iterating on one app.

- [ ] **Step 1: Add the devDependency**

```bash
npm install --save-dev playwright@1.62.1
npx playwright install chromium
```

- [ ] **Step 2: Add the npm script**

In `package.json`, inside `"scripts"`, after `"start"`:

```json
"mockups": "node scripts/capture-mockups.mjs"
```

- [ ] **Step 3: Write the script**

Note on reading app ids: `lib/apps.ts` is TypeScript and this script is plain Node, so it cannot import it. The script instead regex-extracts the ids for its coverage check. That check exists so a new app added to `lib/apps.ts` without a recipe fails loudly rather than silently rendering a broken image.

Create `scripts/capture-mockups.mjs`:

```js
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
```

- [ ] **Step 4: Run it and confirm it fails the coverage check**

Run: `npm run mockups`
Expected: `casefile-light.webp` and `anime-calendar-light.webp` both print `ok`, then
`no mockup for: agendex, broke-but-optimistic, falcon-tools, algorithm-playground, food-twin, yomu`
and a non-zero exit. That failure is correct at this stage: it proves the coverage check works.

- [ ] **Step 5: Look at the two images**

Open `public/mockups/casefile-light.webp` and `public/mockups/anime-calendar-light.webp`.
Expected: Casefile shows the case board and manor blueprint. AniCal shows the Today grid with anime
cover art. Neither shows a loading skeleton or an empty state. If AniCal is empty, it is early in the
UTC day; add `?date=` or accept the current day's content.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json scripts/capture-mockups.mjs public/mockups
git commit -m "feat: add screenshot capture script for project mockups"
```

---

### Task 2: Recipes for the six remaining web apps

Every URL and selector below was verified live on 2026-07-31.

**Files:**
- Modify: `scripts/capture-mockups.mjs` (add six entries to `RECIPES`)
- Create (generated, committed): `public/mockups/` entries for `agendex`, `broke-but-optimistic`, `falcon-tools`, `algorithm-playground`, `food-twin`

**Interfaces:**
- Consumes: the `RECIPES` shape and the `capture` runner from Task 1.
- Produces: nothing new for later tasks beyond the image files.

- [ ] **Step 1: Add the four straightforward recipes**

Insert into `RECIPES` in `scripts/capture-mockups.mjs`:

```js
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
      // The site loads dark. Its toggle button is labelled with the current state.
      if (theme === "light") {
        await page.getByRole("button", { name: /dark mode/i }).click({ timeout: 5000 });
        await page.waitForTimeout(800);
      }
    },
    clip: { x: 40, y: 140, width: 1200, height: 580 },
  },
  {
    id: "algorithm-playground",
    url: "https://playground.hugofmiranda.com/algorithms/a-star",
    viewport: { width: 1280, height: 1000 },
    themes: ["light"],
    prepare: async (page) => {
      // Run the visualizer so the grid shows an in-progress search, not a blank board.
      await page.getByRole("button", { name: "Play" }).click({ timeout: 8000 });
      await page.waitForTimeout(2500);
    },
    clip: { x: 24, y: 440, width: 1240, height: 520 },
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
```

- [ ] **Step 2: Run those four and look at every image**

Run: `npm run mockups -- --only agendex,broke-but-optimistic,algorithm-playground,food-twin`
Expected: five `ok` lines (BBO produces two themes). Then open all five files.

The `clip` rectangles above are first estimates taken from 1280-wide probe captures. Adjust the
numbers until each image is a tight crop of the interesting region with no large empty margin, then
re-run. This is the step where you iterate.

Reject and re-crop if: Agendex still shows the cookie banner, the Playground grid is blank or the
run has already finished, or Food Twin shows the empty search form.

- [ ] **Step 3: Add the Falcon Tools recipe**

Falcon Tools is a file-in, file-out utility. Every page is an empty state until a PDF is loaded, so
the recipe generates one with Chromium's own PDF printer and uploads it. The reorder tool then renders
a real page-thumbnail grid.

```js
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
      await page.getByText("6 loaded").waitFor({ timeout: 20000 });
      await page.waitForTimeout(1500); // thumbnail rendering
    },
    clip: { x: 240, y: 150, width: 800, height: 620 },
  },
```

- [ ] **Step 4: Run Falcon Tools and look at the image**

Run: `npm run mockups -- --only falcon-tools`
Expected: `ok falcon-tools-light.webp`, showing a grid of six numbered page thumbnails.

If the file input is hidden behind a styled button, `setInputFiles` still works on the underlying
`input[type="file"]`; if the locator misses, run with `chromium.launch({ headless: false })`
temporarily to see the real markup. If the "6 loaded" counter text differs, match the actual string.

- [ ] **Step 5: Commit**

```bash
git add scripts/capture-mockups.mjs public/mockups
git commit -m "feat: capture recipes for the six remaining web apps"
```

---

### Task 3: Yomu frames from the repo gif

Yomu is an Android app with no URL to visit. Its repo's `.github/readme-images/screens.gif` is a loop
of real device screenshots already inside a Pixel frame, and it contains both a light and a dark pass
over the library grid.

**Files:**
- Create: `scripts/capture-yomu.mjs`
- Modify: `package.json` (add a `mockups:yomu` script)
- Create (generated, committed): `public/mockups/yomu-light.webp`, `public/mockups/yomu-dark.webp`

**Interfaces:**
- Consumes: nothing from earlier tasks. It writes into the same `public/mockups/` directory, which
  satisfies the Task 1 coverage check for the `yomu` id.
- Produces: nothing later tasks call.

- [ ] **Step 1: Find the two frame numbers**

```bash
cd /tmp && curl -sL -o screens.gif \
  "$(gh api repos/HugoFMiranda/yomu/contents/.github/readme-images/screens.gif --jq .download_url)"
ffmpeg -hide_banner -loglevel error -i screens.gif -vf "scale=200:-1,tile=8x8" -frames:v 1 sheet.png
```

Open `sheet.png`. It is a contact sheet of every frame in reading order, left to right, top to bottom.
Count to the first frame showing the **library grid in light theme** and the first showing the
**library grid in dark theme**. Frame numbers are zero-indexed. Note both.

- [ ] **Step 2: Write the extraction script**

Create `scripts/capture-yomu.mjs`, substituting the two numbers you counted for `LIGHT_FRAME` and
`DARK_FRAME`:

```js
// Yomu is an Android app, so its mockup comes from the real device screenshots
// in the repo's readme gif rather than from a browser capture.
// Manual: `npm run mockups:yomu`.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "mockups");
const GIF_URL =
  "https://raw.githubusercontent.com/HugoFMiranda/yomu/main/.github/readme-images/screens.gif";

const LIGHT_FRAME = 0; // library grid, light theme
const DARK_FRAME = 0;  // library grid, dark theme

const work = mkdtempSync(path.join(tmpdir(), "yomu-"));
const gif = path.join(work, "screens.gif");

try {
  mkdirSync(OUT_DIR, { recursive: true });
  execFileSync("curl", ["-sL", "-o", gif, GIF_URL]);

  for (const [theme, frame] of [["light", LIGHT_FRAME], ["dark", DARK_FRAME]]) {
    const out = path.join(OUT_DIR, `yomu-${theme}.webp`);
    execFileSync("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", gif,
      "-vf", `select=eq(n\\,${frame})`,
      "-frames:v", "1",
      "-quality", "90",
      out,
    ]);
    console.log(`  ok   yomu-${theme}.webp`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
```

- [ ] **Step 3: Add the npm script**

In `package.json`, after the `mockups` entry:

```json
"mockups:yomu": "node scripts/capture-yomu.mjs"
```

- [ ] **Step 4: Run it and look at both images**

Run: `npm run mockups:yomu`
Expected: two `ok` lines. Open both files. Each must show the Yomu library grid inside the phone
frame, one light and one dark. If a frame landed on a transition or the wrong screen, adjust
`LIGHT_FRAME` / `DARK_FRAME` and re-run.

- [ ] **Step 5: Confirm the coverage check now passes**

Run: `npm run mockups`
Expected: every recipe prints `ok`, no `no mockup for:` line, exit code 0. Verify with
`npm run mockups; echo "exit=$?"`.

- [ ] **Step 6: Commit**

```bash
git add package.json scripts/capture-yomu.mjs public/mockups
git commit -m "feat: extract Yomu mockups from its repo screenshots"
```

---

### Task 4: Rewrite the mockup component

**Files:**
- Rewrite: `components/app-mockup.tsx` (all 230 lines of inline SVG are deleted)
- Modify: `components/shadcn-space/pages/landing-page-01/portfolio/index.tsx:113-121` (the mockup tile div)

**Interfaces:**
- Consumes: `AppDef` from `lib/apps.ts`, and the `isDark` boolean the portfolio component already
  derives from the `dark` class on `<html>`.
- Produces: `AppMockup`, default export, with props
  `{ app: AppDef; isDark: boolean }`. This replaces the old `{ id: string; accent: string }` props.
  Passing the whole `app` gives the frame its URL pill and accent without a second lookup.

- [ ] **Step 1: Read the Next 16 image docs**

Read `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, sections
"Responsive image with `fill`" and "Props". This repo is Next 16; do not write `next/image` code
from memory.

- [ ] **Step 2: Note which apps have a dark capture**

Run: `ls public/mockups`
Every app has a `-light.webp`. Only some have a `-dark.webp`. Write down which ones do. The component
falls back to the light asset when the dark file is absent, so the list of dark-capable ids has to be
accurate or the page will 404 on an image.

- [ ] **Step 3: Write the component**

Replace the entire contents of `components/app-mockup.tsx`, filling `DARK_CAPTURES` with the ids you
noted in Step 2:

```tsx
import Image from "next/image";
import type { AppDef } from "@/lib/apps";

/** Apps with a captured dark screenshot. Everything else reuses its light one. */
const DARK_CAPTURES = new Set(["broke-but-optimistic", "yomu"]);

/** Yomu's frames come out of an Android screenshot, so they carry their own device frame. */
const SELF_FRAMED = new Set(["yomu"]);

export default function AppMockup({ app, isDark }: { app: AppDef; isDark: boolean }) {
  const theme = isDark && DARK_CAPTURES.has(app.id) ? "dark" : "light";
  const src = `/mockups/${app.id}-${theme}.webp`;

  if (SELF_FRAMED.has(app.id)) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={`${app.name} running on a phone`}
          fill
          sizes="320px"
          className="object-contain object-center"
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-900">
      {/* Window chrome */}
      <div className="flex h-5 items-center gap-1.5 border-b border-black/5 bg-black/[0.03] px-2 dark:border-white/5 dark:bg-white/[0.04]">
        <span className="size-1.5 rounded-full bg-black/15 dark:bg-white/20" />
        <span className="size-1.5 rounded-full bg-black/15 dark:bg-white/20" />
        <span className="size-1.5 rounded-full bg-black/15 dark:bg-white/20" />
        <span className="ml-1 truncate rounded-full bg-black/[0.04] px-2 text-[7px] leading-[11px] text-black/40 dark:bg-white/[0.06] dark:text-white/40">
          {app.url}
        </span>
      </div>
      {/* Screenshot, scaled up so it reads as a crop of real UI rather than a shrunken page */}
      <div className="relative h-[calc(100%-1.25rem)] w-full overflow-hidden">
        <Image
          src={src}
          alt={`Screenshot of ${app.name}`}
          fill
          sizes="320px"
          className="scale-[1.4] object-cover object-top"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update the call site**

In `components/shadcn-space/pages/landing-page-01/portfolio/index.tsx`, the mockup tile currently reads:

```tsx
        <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-105">
          <AppMockup id={app.id} accent={app.colors.accent} />
        </div>
```

Change the `AppMockup` line to:

```tsx
          <AppMockup app={app} isDark={isDark} />
```

Leave the wrapping div, its hover transform, and the gradient background on the parent untouched.

- [ ] **Step 5: Typecheck and build**

Run: `npx tsc --noEmit && npm run build`
Expected: both pass. A type error on `AppMockup` props means Step 4 was missed.

- [ ] **Step 6: Look at the running page**

Run: `npm run dev`, open the projects section.
Expected: eight tiles, each showing real UI inside a window frame with the app's URL in the pill,
sitting on its gradient. Yomu shows a phone, no browser chrome. Hovering still scales the tile.
Toggle the navbar theme: gradients swap on all eight, and the BBO and Yomu screenshots swap too.

- [ ] **Step 7: Commit**

```bash
git add components/app-mockup.tsx components/shadcn-space/pages/landing-page-01/portfolio/index.tsx
git commit -m "feat: render real screenshots in the project mockup tiles"
```

---

### Task 5: Final pass

**Files:**
- Modify: `components/app-mockup.tsx` (crop and scale tuning only)
- Modify: `scripts/capture-mockups.mjs` (clip tuning only)

- [ ] **Step 1: Judge each tile at its real size**

With `npm run dev` running, look at the projects section at a desktop width (the tile is 256px at
`lg`, 320px at `xl`) and at mobile width (full-bleed, 160px tall).

For each of the eight, ask: can you tell what the app is? If a tile reads as grey mush, its capture
is cropped too wide. Tighten that recipe's `clip` and re-run `npm run mockups -- --only <id>`.
If a tile is cropped so tight it looks arbitrary, loosen it.

- [ ] **Step 2: Tune the scale if needed**

`scale-[1.4]` in `components/app-mockup.tsx` is a starting value applied to all framed tiles. If most
tiles read better at a different zoom, change it there. If a single app is the outlier, fix that
app's `clip` instead. Do not add per-app scale overrides.

- [ ] **Step 3: Check the weight**

Run: `du -sh public/mockups && ls -la public/mockups`
Expected: comfortably under 1 MB total. If any single file is over 150 KB, lower that capture's
`quality` from 90 to 80 in `scripts/capture-mockups.mjs` and re-run it.

- [ ] **Step 4: Full verification**

Run: `npx tsc --noEmit && npm run build && npm run mockups; echo "mockups exit=$?"`
Expected: typecheck clean, build clean, capture script exits 0 with no `FAIL` or `no mockup for:` lines.

Confirm no image shows a cookie banner, loading skeleton, empty state, or login form.

- [ ] **Step 5: Commit**

```bash
git add public/mockups scripts/capture-mockups.mjs components/app-mockup.tsx
git commit -m "chore: tune project mockup crops"
```

---

## Self-review notes

- Spec coverage: capture script (Task 1, 2), Yomu via ffmpeg (Task 3), component rewrite and window
  chrome (Task 4), tile treatment and `object-cover object-top` at ~1.4x (Task 4 Step 3, Task 5 Step 2),
  verification list (Task 5 Step 4). The spec's "log in with the published demo credentials" for BBO is
  contradicted by a live finding and is superseded by the "Known blocker" section above.
- Props are `{ app, isDark }` in both Task 4 Step 3 and Step 4.
- Output paths are `public/mockups/<id>-<theme>.webp` in every task.
