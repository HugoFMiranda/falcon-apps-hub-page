# Portfolio Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape falcon-hub from a flat app-card index into a personal portfolio landing page with Hero, GitHub, Projects, About and Contact sections, using the installed `@shadcn-space/pages/landing-page-01` as the visual base.

**Architecture:** `app/page.tsx` becomes a server component that fetches GitHub data and passes it into a client composition component (`components/shadcn-space/pages/landing-page-01/index.tsx`) which owns scroll-spy. The existing 643-line client page is decomposed: app data into `lib/apps.ts`, SVG mockups into `components/app-mockup.tsx`, the credentials dialog into `components/demo-modal.tsx`. Unwanted registry sections are deleted; three new sections (GitHub, About, Contact) are written following the registry's established layout and motion conventions.

**Tech Stack:** Next.js 16.2.7 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4, Base UI (`base-nova` shadcn style), `motion@12` (Framer Motion), `embla-carousel-react@8`, `lucide-react`.

## Execution notes (added at execution time)

- **Task 2 runs BEFORE Task 1.** The `@shadcn-space` install shipped
  `cta/index.tsx` importing `@/components/ui/dialog` without installing that
  component, so `npm run build` fails on the base commit before any of our
  changes. Task 2 deletes `cta/`, which clears it. Running Task 2 first gives
  every later task a green baseline to verify against. Remaining order is
  unchanged: 2, 1, 3, 4, 5, 6, 7, 8.
- **The dev server runs on port 3100**, not 3000. Ports 3000–3004 are occupied
  by other apps on this machine (3000 is algorithm-playground, 3002 is the live
  falcon-hub). Always start it as `PORT=3100 npm run dev`.
- **Work happens in the `~/falcon-hub-redesign` worktree** on branch
  `redesign/portfolio-landing`. `/var/www/falcon-hub` is the live site — never
  edit or build there.

## Global Constraints

- **Read the Next.js 16 docs before writing code.** `node_modules/next/dist/docs/` — this version differs from older Next.js. Per the repo's `AGENTS.md`, this is mandatory, not optional.
- **This project has no test framework.** There is no `test` script, no jest/vitest, no testing-library. Adding one is out of scope. Every task is verified by `npm run build` plus assertions against the rendered HTML of a running dev server. Do not write test files that cannot run.
- **Do not recreate the registry page by hand.** The `@shadcn-space` registry's agent rules forbid recreating, rewriting, or approximating it. We adapt the files that were installed. Editing installed files is permitted and expected.
- **`cacheComponents` is NOT enabled** in `next.config.ts`. Classic caching semantics apply, so `fetch(url, { next: { revalidate: 3600 } })` works as documented. Do not add `"use cache"` directives.
- **Path alias:** `@/*` maps to `./*` from the repo root (`tsconfig.json`). `@/assets/logo/logo` resolves to `assets/logo/logo.tsx`.
- **Theme key is `falcon-hub-theme`** in `localStorage`, values `"dark"` / `"light"`. The pre-paint inline script in `app/layout.tsx` must not be changed — it is what prevents a flash of the wrong theme.
- **Copy rules, exact:** contact email is `hugo.miranda.imp@gmail.com` (NOT the git-config email). GitHub is `github.com/HugoFMiranda`. Location is Portugal. The ISEP Master's degree MUST be labelled as not completed. No LinkedIn link anywhere — the user explicitly restricted contact to email and GitHub.
- **No secrets in committed files.** `.env` holds the shadcn-space license key and is gitignored. Never read its values into any committed file.
- **TypeScript is `strict: true`.** No `any` in new code except where mirroring existing registry code.

---

### Task 1: Extract app data, mockups, and modal out of `app/page.tsx`

Behaviour-preserving refactor. The page must look and act identically when this task is done. This exists so later tasks work in small files rather than a 643-line one.

**Files:**
- Create: `lib/apps.ts`
- Create: `components/app-mockup.tsx`
- Create: `components/demo-modal.tsx`
- Modify: `app/page.tsx` (delete the moved code, add imports)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `lib/apps.ts` exports `interface EnvLink { label: string; href: string; url: string; demo?: { email: string; password: string } }`, `interface AppDef { id: string; name: string; url: string; href?: string; hosted: boolean; description: string; tags: string[]; colors: { bgLight: string; bgDark: string; accent: string }; environments?: EnvLink[] }`, and `const APPS: AppDef[]`.
  - `components/app-mockup.tsx` default-exports `AppMockup({ id, accent }: { id: string; accent: string })`.
  - `components/demo-modal.tsx` default-exports `DemoModal({ env, appName, onClose }: { env: EnvLink; appName: string; onClose: () => void })`.

- [ ] **Step 1: Capture the current rendered output as a baseline**

```bash
PORT=3100 npm run dev > /tmp/dev.log 2>&1 &
sleep 8
curl -s http://127.0.0.1:3100 > /tmp/baseline.html
grep -c "Agendex\|Casefile\|AniCal" /tmp/baseline.html
```

Expected: a non-zero count, proving the page renders the app cards. Keep `/tmp/baseline.html` for Step 6.

- [ ] **Step 2: Create `lib/apps.ts`**

Move lines 12–150 of `app/page.tsx` verbatim — the `EnvLink` and `AppDef` interfaces and the `APPS` array — into `lib/apps.ts`. Export all three. Do not change any URL, description, tag, colour, or demo credential. The file starts with:

```ts
export interface EnvLink {
  label: string;
  href: string;
  url: string;
  demo?: { email: string; password: string };
}

export interface AppDef {
  id: string;
  name: string;
  url: string;
  href?: string;
  hosted: boolean;
  description: string;
  tags: string[];
  colors: { bgLight: string; bgDark: string; accent: string };
  environments?: EnvLink[];
}

export const APPS: AppDef[] = [
  // ...all seven entries, moved verbatim from app/page.tsx
];
```

- [ ] **Step 3: Create `components/app-mockup.tsx`**

Move the `AppMockup` function (lines 152–346 of `app/page.tsx`) verbatim. It has no hooks and no event handlers, so it does NOT need `"use client"`. Add a default export:

```tsx
export default function AppMockup({ id, accent }: { id: string; accent: string }) {
  // ...all seven `if (id === "...")` branches, moved verbatim
  return null;
}
```

- [ ] **Step 4: Create `components/demo-modal.tsx`**

Move the `DemoModal` function (lines 348–463 of `app/page.tsx`) verbatim. It uses `useState`/`useEffect`, so it MUST start with `"use client"`. Import `EnvLink` from `@/lib/apps`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, Eye, EyeOff, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EnvLink } from "@/lib/apps";

export default function DemoModal({
  env,
  appName,
  onClose,
}: {
  env: EnvLink;
  appName: string;
  onClose: () => void;
}) {
  // ...body moved verbatim
}
```

- [ ] **Step 5: Rewrite `app/page.tsx` to import the extracted pieces**

Delete the moved definitions. The file keeps `"use client"`, the `THEME_KEY` constant, and the `HubPage` component exactly as it was, with these imports at the top:

```tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { APPS, type EnvLink } from "@/lib/apps";
import AppMockup from "@/components/app-mockup";
import DemoModal from "@/components/demo-modal";

const THEME_KEY = "falcon-hub-theme";
```

Note `useRef` and the `Copy`/`Check`/`Eye`/`EyeOff`/`X` icons are no longer used here — remove them from the imports or the build will warn.

- [ ] **Step 6: Verify the page is byte-identical to the baseline**

```bash
curl -s http://127.0.0.1:3100 > /tmp/after.html
diff <(grep -o 'Agendex\|Casefile\|AniCal\|Food Twin\|Falcon Tools\|Algorithm Playground\|Broke But Optimistic' /tmp/baseline.html | sort) \
     <(grep -o 'Agendex\|Casefile\|AniCal\|Food Twin\|Falcon Tools\|Algorithm Playground\|Broke But Optimistic' /tmp/after.html | sort)
```

Expected: no output from `diff` — all seven apps still render. If `diff` prints anything, a card was lost in the move.

- [ ] **Step 7: Verify the build**

```bash
npm run build
```

Expected: build succeeds with no type errors.

- [ ] **Step 8: Commit**

```bash
git add lib/apps.ts components/app-mockup.tsx components/demo-modal.tsx app/page.tsx
git commit -m "refactor: extract app data, mockups and demo modal from page"
```

---

### Task 2: Rebrand the registry chrome and delete unused sections

The installed page ships shadcnspace's own logo, copyright, and five sections we do not want. Strip them before building on top.

**Files:**
- Modify: `assets/logo/logo.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/layout/footer.tsx`
- Delete: `components/shadcn-space/pages/landing-page-01/services/`, `pricing/`, `testimonial/`, `faq/`, `cta/`
- Delete: `app/landing-page-01/` (the registry's demo route)
- Modify: `components/shadcn-space/pages/landing-page-01/index.tsx` (drop the deleted imports)

**Interfaces:**
- Consumes: nothing.
- Produces: `assets/logo/logo.tsx` still default-exports `Logo(props: SVGAttributes<SVGElement>)`, so `navbar.tsx` and `footer.tsx` keep working unchanged.

- [ ] **Step 1: Replace the logo wordmark**

The current `assets/logo/logo.tsx` is a 147×40 SVG spelling "shadcnspace" as vector paths. Replace the whole file with a mark plus real text, keeping the same export signature:

```tsx
import type { SVGAttributes } from "react";

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        {...props}
      >
        <circle
          cx="20"
          cy="20"
          r="20"
          fill="#030712"
          className="dark:fill-[#FFFFFF]"
        />
        <path
          d="M13 27V13h13v3h-9.5v2.8H25v3h-8.5V27H13z"
          fill="white"
          className="dark:fill-[#030712]"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-foreground">
        Falcon Apps
      </span>
    </div>
  );
};

export default Logo;
```

- [ ] **Step 2: Fix the footer copy**

In `components/shadcn-space/pages/landing-page-01/layout/footer.tsx`:

Replace the `defaultFooternavItems` array with our four sections:

```tsx
const defaultFooternavItems: FooterNavItem[] = [
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
```

Replace the two hardcoded copy lines:

```tsx
<p className="text-base text-muted-foreground">
  © 2026 Hugo Miranda. All Rights Reserved.
</p>
<p className="text-base transition-colors text-muted-foreground">
  Built with Next.js, self-hosted.
</p>
```

- [ ] **Step 3: Delete the unwanted sections and demo route**

```bash
rm -rf components/shadcn-space/pages/landing-page-01/services \
       components/shadcn-space/pages/landing-page-01/pricing \
       components/shadcn-space/pages/landing-page-01/testimonial \
       components/shadcn-space/pages/landing-page-01/faq \
       components/shadcn-space/pages/landing-page-01/cta \
       app/landing-page-01
```

- [ ] **Step 4: Drop the dead imports from the composition**

In `components/shadcn-space/pages/landing-page-01/index.tsx`, delete the `Services`, `Portfolio`, `Pricing`, `Testimonial`, `Faq`, `Cta` imports and their JSX usages, leaving only `Navbar`, `HeroPage` and `Footer`. Also trim `navigationData` and `footerNavItems` to our four sections and update the scroll-spy `sections` array:

```tsx
const navigationData: NavigationSection[] = [
  { name: "GitHub", href: "#github" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const footerNavItems: FooterNavItem[] = [
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
```

and inside the effect:

```tsx
const sections = ["github", "projects", "about", "contact"];
```

- [ ] **Step 5: Verify no dangling references remain**

```bash
grep -rn "shadcnspace\|landing-page-01/services\|landing-page-01/pricing\|landing-page-01/testimonial\|landing-page-01/faq\|landing-page-01/cta" \
  app components assets lib | grep -v "images.shadcnspace.com"
```

Expected: no output. (The `images.shadcnspace.com` hero asset is still referenced at this point; Task 4 removes it.)

- [ ] **Step 6: Verify the build**

```bash
npm run build
```

Expected: build succeeds. `app/page.tsx` is still the old design at this point — that is correct, the new composition is not wired up until Task 3.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: rebrand registry chrome, remove unused landing sections"
```

---

### Task 3: Wire up the new page composition

Swap `app/page.tsx` from the old card grid to the registry composition. Projects moves into a section component but keeps the existing grid for now — the carousel conversion is Task 6. This keeps the site working end-to-end at every step.

**Files:**
- Modify: `app/page.tsx` (becomes a server component)
- Modify: `components/shadcn-space/pages/landing-page-01/index.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/layout/navbar.tsx`
- Replace: `components/shadcn-space/pages/landing-page-01/portfolio/index.tsx`

**Interfaces:**
- Consumes: `APPS`, `EnvLink` from `@/lib/apps`; `AppMockup` from `@/components/app-mockup`; `DemoModal` from `@/components/demo-modal`; `Logo` from `@/assets/logo/logo`.
- Produces:
  - `components/shadcn-space/pages/landing-page-01/index.tsx` default-exports `PortfolioLandingPage()` — no props yet; Task 5 adds a `stats` prop.
  - `portfolio/index.tsx` default-exports `Projects()`.

**Step order matters here:** the card markup is copied out of `app/page.tsx` before that file is replaced. Do not reorder these steps.

- [ ] **Step 1: Add the theme toggle and fix the location in the navbar**

In `components/shadcn-space/pages/landing-page-01/layout/navbar.tsx`, add to the existing imports:

```tsx
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
```

Inside the `Navbar` component, above the `return`, add theme state that reads what the pre-paint script already applied to `<html>`:

```tsx
const [isDark, setIsDark] = useState(false);

useEffect(() => {
  setIsDark(document.documentElement.classList.contains("dark"));
}, []);

const toggleTheme = () => {
  const next = !isDark;
  setIsDark(next);
  document.documentElement.classList.toggle("dark", next);
  document.documentElement.style.colorScheme = next ? "dark" : "light";
  localStorage.setItem("falcon-hub-theme", next ? "dark" : "light");
};
```

Reading from the DOM rather than from `localStorage` keeps the button icon in sync with what the pre-paint script decided, including the `prefers-color-scheme` fallback.

Replace the hardcoded location line:

```tsx
<a href="#" className="max-lg:hidden flex items-center gap-2 px-5 py-2.5">
  <MapPin size={16} />
  <span>Based in Portugal</span>
</a>
```

Add the toggle button immediately before the `DropdownMenuTrigger`, matching its styling:

```tsx
<button
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className="rounded-full bg-background hover:bg-muted h-auto p-2.5 border border-border cursor-pointer"
>
  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
</button>
```

- [ ] **Step 2: Replace `portfolio/index.tsx` with a Projects section wrapping the existing grid**

Delete the stock carousel and image data entirely. The new file keeps the registry's section-header pattern and renders the seven real apps as the grid they are today:

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { APPS, type EnvLink } from "@/lib/apps";
import AppMockup from "@/components/app-mockup";
import DemoModal from "@/components/demo-modal";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STAGGER_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Projects = () => {
  const [isDark, setIsDark] = useState(false);
  const [demoModal, setDemoModal] = useState<{ env: EnvLink; appName: string } | null>(null);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={STAGGER_ANIMATION_VARIANTS}
            className="flex flex-col gap-4"
          >
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
              <span className="text-base font-normal text-muted-foreground">Projects</span>
            </motion.div>
            <motion.h2
              variants={FADE_UP_ANIMATION_VARIANTS}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground"
            >
              My work.
            </motion.h2>
          </motion.div>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {APPS.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  isDark={isDark}
                  onOpenDemo={(env) => setDemoModal({ env, appName: app.name })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {demoModal && (
        <DemoModal
          env={demoModal.env}
          appName={demoModal.appName}
          onClose={() => setDemoModal(null)}
        />
      )}
    </section>
  );
};

export default Projects;
```

The `MutationObserver` is what keeps the card gradients in sync when the navbar toggle flips the theme — the two components have no shared state, and polling or prop-drilling would be worse.

- [ ] **Step 3: Add the `AppCard` component to the same file**

Below `Projects`, port the card markup from `app/page.tsx` — it is the `<Card>` block inside the `APPS.map(...)` call, currently at lines 525–614, still present because Step 5 has not run yet. Parameterise it:

```tsx
function AppCard({
  app,
  isDark,
  onOpenDemo,
}: {
  app: (typeof APPS)[number];
  isDark: boolean;
  onOpenDemo: (env: EnvLink) => void;
}) {
  return (
    <Card className="overflow-hidden flex flex-col p-0 gap-0">
      {/* browser chrome bar: traffic lights, app.url, live/local dot */}
      {/* mockup panel: style={{ background: isDark ? app.colors.bgDark : app.colors.bgLight }} */}
      {/* <AppMockup id={app.id} accent={app.colors.accent} /> */}
      {/* name, description, tag badges */}
      {/* environments buttons — demo envs call onOpenDemo(env) instead of the old openDemo */}
    </Card>
  );
}
```

Copy the real JSX across from `app/page.tsx` rather than writing it fresh — the traffic-light dots, the animated `Live` ping, the tag badges and the environment-button branching all need to survive intact. The only behavioural change is that the demo button calls `onOpenDemo(env)` instead of the old page-level `openDemo(env, app.name)`.

- [ ] **Step 4: Add Projects to the composition**

In `components/shadcn-space/pages/landing-page-01/index.tsx`, import the section and render it after the hero:

```tsx
import Projects from "@/components/shadcn-space/pages/landing-page-01/portfolio";
```

```tsx
<main>
  <HeroPage />
  <Projects />
</main>
```

Also rename the default export from `Portfoliolandingpage` to `PortfolioLandingPage`.

- [ ] **Step 5: Replace `app/page.tsx` with a server component**

Only now, with the card markup safely copied into `portfolio/index.tsx`, does the old design get deleted. The whole file becomes:

```tsx
import PortfolioLandingPage from "@/components/shadcn-space/pages/landing-page-01";

export default function Page() {
  return <PortfolioLandingPage />;
}
```

Note there is no `"use client"` here — this is a server component, which is what lets Task 5 fetch GitHub data. `lib/apps.ts`, `components/app-mockup.tsx` and `components/demo-modal.tsx` are now consumed by `portfolio/index.tsx` instead of by this file.

- [ ] **Step 6: Verify all seven apps still render and the theme toggle works**

```bash
PORT=3100 npm run dev > /tmp/dev.log 2>&1 &
sleep 8
curl -s http://127.0.0.1:3100 | grep -o 'Agendex\|Casefile\|AniCal\|Food Twin\|Falcon Tools\|Algorithm Playground\|Broke But Optimistic' | sort -u | wc -l
```

Expected: `7`.

```bash
curl -s http://127.0.0.1:3100 | grep -c "Based in Portugal"
```

Expected: `1`.

- [ ] **Step 7: Verify the build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: wire portfolio landing composition with projects section"
```

---

### Task 4: Adapt the hero

Strip shadcnspace's placeholder identity, CDN video and CDN portrait; put in real content and the GitHub avatar. Stats stay hardcoded here — Task 5 makes them live.

**Files:**
- Modify: `components/shadcn-space/pages/landing-page-01/hero/hero.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `hero.tsx` default-exports `HeroSection()`. Task 5 changes this signature to accept `{ stats }`, so keep the component's props object shape in mind.

- [ ] **Step 1: Replace the stats data and identity copy**

In `hero.tsx`, replace `statsData`:

```tsx
const statsData = [
  { title: "Years writing code", count: 8 },
  { title: "Public repositories", count: 59 },
];
```

Replace the name line and the heading, deleting the `<video>` element and its `<span className="inline-flex align-middle">` wrapper entirely:

```tsx
<motion.p variants={itemVariants} className="text-2xl font-medium text-foreground">
  I&apos;m Hugo Miranda,
</motion.p>
<motion.h1
  variants={itemVariants}
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium"
>
  Senior Full Stack Developer
</motion.h1>
```

Replace the positioning paragraph:

```tsx
<p className="text-lg text-muted-foreground">
  I build reliable, maintainable production web applications — mostly Laravel,
  React and AureliaJS. Backend, APIs, frontend, and the deployments that keep
  them running.
</p>
```

- [ ] **Step 2: Anchor the CTA to the projects section**

The `Button` is not currently wrapped in a link. Wrap it so it scrolls to Projects:

```tsx
<a href="#projects">
  <Button className="group w-fit h-auto px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary/80 transition-all duration-500 ease-[0.23,1,0.32,1]">
    {/* existing ArrowUpRight motion.span, unchanged */}
    <span className="relative z-10 flex items-center gap-2 font-medium">Check Projects</span>
  </Button>
</a>
```

- [ ] **Step 3: Swap the portrait for the GitHub avatar**

Replace the `<img>` in the right column:

```tsx
<motion.div variants={imageVariants} className="md:col-span-5 w-full p-4 sm:p-6 lg:p-10">
  <img
    src="https://avatars.githubusercontent.com/u/74903598?v=4"
    alt="Hugo Miranda"
    width={410}
    height={529}
    className="w-full h-full object-cover rounded-2xl"
  />
</motion.div>
```

This stays a plain `<img>`, not `next/image`. Using `next/image` for a remote host would require an `images.remotePatterns` entry in `next.config.ts`; the registry component already uses a plain tag, and one avatar does not justify the config surface.

- [ ] **Step 4: Verify no shadcnspace CDN assets remain**

```bash
grep -rn "images.shadcnspace.com" app components assets lib
```

Expected: no output.

- [ ] **Step 5: Verify the hero renders the real copy**

```bash
curl -s http://127.0.0.1:3100 | grep -c "Senior Full Stack Developer"
```

Expected: at least `1`.

- [ ] **Step 6: Verify the build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: adapt hero with real identity and github avatar"
```

---

### Task 5: GitHub data layer and GitHub section

**Files:**
- Create: `lib/github.ts`
- Create: `components/shadcn-space/pages/landing-page-01/github/index.tsx`
- Modify: `app/page.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/index.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/hero/hero.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/hero/index.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `lib/github.ts` exports `interface LanguageSlice { name: string; count: number; percent: number }`, `interface RecentRepo { name: string; description: string | null; url: string; language: string | null; stars: number; pushedAt: string }`, `interface GitHubStats { ok: boolean; publicRepos: number | null; followers: number | null; memberSince: number | null; totalStars: number | null; languages: LanguageSlice[]; recentRepos: RecentRepo[] }`, `const EMPTY_STATS: GitHubStats`, and `async function getGitHubStats(): Promise<GitHubStats>`.
  - `github/index.tsx` default-exports `GitHubSection({ stats }: { stats: GitHubStats })`.
  - `hero.tsx` and `hero/index.tsx` both now accept `{ stats }: { stats: GitHubStats }`.
  - `index.tsx` (composition) now accepts `{ stats }: { stats: GitHubStats }`.

- [ ] **Step 1: Write `lib/github.ts`**

```ts
const USERNAME = "HugoFMiranda";
const API = "https://api.github.com";

export interface LanguageSlice {
  name: string;
  count: number;
  percent: number;
}

export interface RecentRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
}

export interface GitHubStats {
  ok: boolean;
  publicRepos: number | null;
  followers: number | null;
  memberSince: number | null;
  totalStars: number | null;
  languages: LanguageSlice[];
  recentRepos: RecentRepo[];
}

export const EMPTY_STATS: GitHubStats = {
  ok: false,
  publicRepos: null,
  followers: null,
  memberSince: null,
  totalStars: null,
  languages: [],
  recentRepos: [],
};

interface RawRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "falcon-hub",
  };
  const options = { headers, next: { revalidate: 3600 } } as const;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${USERNAME}`, options),
      fetch(`${API}/users/${USERNAME}/repos?sort=pushed&per_page=100`, options),
    ]);

    if (!userRes.ok || !reposRes.ok) return EMPTY_STATS;

    const user = await userRes.json();
    const repos: unknown = await reposRes.json();
    if (!Array.isArray(repos)) return EMPTY_STATS;

    const list = repos as RawRepo[];
    const owned = list.filter((r) => !r.fork);

    const counts = new Map<string, number>();
    for (const repo of owned) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const totalTagged = [...counts.values()].reduce((a, b) => a + b, 0);
    const languages: LanguageSlice[] = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percent: totalTagged ? Math.round((count / totalTagged) * 100) : 0,
      }));

    const recentRepos: RecentRepo[] = owned.slice(0, 4).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));

    return {
      ok: true,
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : null,
      followers: typeof user.followers === "number" ? user.followers : null,
      memberSince: user.created_at ? new Date(user.created_at).getFullYear() : null,
      totalStars: owned.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
      languages,
      recentRepos,
    };
  } catch {
    return EMPTY_STATS;
  }
}
```

Every failure path — network error, non-200, rate limit (a 403 fails the `.ok` check), malformed JSON — returns `EMPTY_STATS` rather than throwing. The page must never 500 because GitHub is unreachable.

The repos list is already sorted by `pushed` descending from the API, so `slice(0, 4)` gives the four most recently pushed. Forks are excluded from language stats, star totals and the recent list, because they describe other people's code.

- [ ] **Step 2: Verify the fetch and shaping against the live API**

Before wiring any UI, confirm the endpoints return what the code assumes:

```bash
curl -s "https://api.github.com/users/HugoFMiranda" | grep -o '"public_repos":[0-9]*'
curl -s "https://api.github.com/users/HugoFMiranda/repos?sort=pushed&per_page=100" | head -c 200
```

Expected: `"public_repos":59` (or current value), and a JSON array opening with `[{`.

- [ ] **Step 3: Write the GitHub section**

```tsx
import { Github, Star, Users, BookMarked } from "lucide-react";
import type { GitHubStats } from "@/lib/github";

const dash = (v: number | null) => (v === null ? "—" : v.toLocaleString());

export default function GitHubSection({ stats }: { stats: GitHubStats }) {
  const tiles = [
    { label: "Public repos", value: dash(stats.publicRepos), icon: BookMarked },
    { label: "Followers", value: dash(stats.followers), icon: Users },
    { label: "Stars earned", value: dash(stats.totalStars), icon: Star },
    { label: "On GitHub since", value: dash(stats.memberSince), icon: Github },
  ];

  return (
    <section id="github">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
            <span className="text-base font-normal text-muted-foreground">GitHub</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
            What I ship.
          </h2>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border grid grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => (
              <div
                key={tile.label}
                className="flex flex-col gap-2 p-6 lg:p-10 border-b lg:border-b-0 border-r last:border-r-0 border-border [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <tile.icon size={16} className="text-muted-foreground" />
                <p className="text-4xl md:text-5xl font-medium text-foreground">{tile.value}</p>
                <p className="text-base text-muted-foreground">{tile.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.languages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-6 lg:p-10 flex flex-col gap-4">
            <p className="text-base text-muted-foreground">Most used languages</p>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              {stats.languages.map((lang, i) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percent}%`, opacity: 1 - i * 0.15 }}
                  className="bg-foreground"
                  title={`${lang.name} — ${lang.percent}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {stats.languages.map((lang) => (
                <span key={lang.name} className="text-sm text-muted-foreground">
                  {lang.name} <span className="text-foreground">{lang.percent}%</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {stats.recentRepos.length > 0 && (
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
            <div className="border-x border-border grid grid-cols-1 md:grid-cols-2">
              {stats.recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 p-6 lg:p-8 border-b md:odd:border-r border-border hover:bg-muted/40 transition-colors"
                >
                  <span className="text-lg font-medium text-foreground group-hover:underline">
                    {repo.name}
                  </span>
                  <span className="text-sm text-muted-foreground line-clamp-2">
                    {repo.description ?? "No description."}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {repo.language ?? "—"} · updated{" "}
                    {new Date(repo.pushedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
```

No `"use client"` — this is pure presentational markup rendered on the server.

- [ ] **Step 4: Thread `stats` from the server page through the composition**

`app/page.tsx`:

```tsx
import PortfolioLandingPage from "@/components/shadcn-space/pages/landing-page-01";
import { getGitHubStats } from "@/lib/github";

export default async function Page() {
  const stats = await getGitHubStats();
  return <PortfolioLandingPage stats={stats} />;
}
```

`components/shadcn-space/pages/landing-page-01/index.tsx` — accept and forward:

```tsx
import type { GitHubStats } from "@/lib/github";
import GitHubSection from "@/components/shadcn-space/pages/landing-page-01/github";

export default function PortfolioLandingPage({ stats }: { stats: GitHubStats }) {
  // ...existing scroll-spy state and effect, unchanged
  return (
    <>
      <Navbar navigationData={dynamicNavigationData} />
      <main>
        <HeroPage stats={stats} />
        <GitHubSection stats={stats} />
        <Projects />
      </main>
      <Footer footernavItems={footerNavItems} />
    </>
  );
}
```

A client component may render a server component passed as a child, but `GitHubSection` is imported and rendered directly inside a `"use client"` module, which makes it a client component too. That is fine — it has no server-only dependencies, and `stats` is already-serialised plain data.

`hero/index.tsx` — forward the prop:

```tsx
import HeroSection from "@/components/shadcn-space/pages/landing-page-01/hero/hero";
import type { GitHubStats } from "@/lib/github";

export default function HeroPage({ stats }: { stats: GitHubStats }) {
  return <HeroSection stats={stats} />;
}
```

Check the file's actual existing contents before editing — if it wraps `HeroSection` in extra markup, keep that markup and only add the prop.

- [ ] **Step 5: Make the hero stats live**

In `hero.tsx`, delete the module-level `statsData` const and build it from props inside the component:

```tsx
const HeroSection = ({ stats }: { stats: GitHubStats }) => {
  const statsData = [
    { title: "Years writing code", count: new Date().getFullYear() - 2018 },
    { title: "Public repositories", count: stats.publicRepos ?? 0 },
  ];
  // ...rest unchanged
```

Add `import type { GitHubStats } from "@/lib/github";` at the top. The existing `CountUp` component animates to whatever number it is given, so it needs no change.

- [ ] **Step 6: Verify the section renders live data**

```bash
PORT=3100 npm run dev > /tmp/dev.log 2>&1 &
sleep 8
curl -s http://127.0.0.1:3100 | grep -o "Public repos\|Followers\|Stars earned\|Most used languages"
```

Expected: all four labels present.

- [ ] **Step 7: Verify graceful degradation**

Temporarily change `API` in `lib/github.ts` to `https://api.github.invalid`, restart dev, and check the page still returns 200 with placeholders:

```bash
curl -s -o /tmp/degraded.html -w "%{http_code}\n" http://127.0.0.1:3100
grep -c "—" /tmp/degraded.html
grep -c "Most used languages" /tmp/degraded.html
```

Expected: `200`, a non-zero count of `—`, and `0` for the languages block. **Revert the `API` constant afterwards** and confirm the real value is back with `grep -n "const API" lib/github.ts`.

- [ ] **Step 8: Verify the build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add live github stats section"
```

---

### Task 6: Convert Projects to the carousel

**Files:**
- Modify: `components/shadcn-space/pages/landing-page-01/portfolio/index.tsx`

**Interfaces:**
- Consumes: `AppCard` and the animation variants defined in Task 3, in this same file.
- Produces: no signature change — still default-exports `Projects()`.

- [ ] **Step 1: Restore the carousel scaffolding**

Add the embla wiring to the current file. Everything needed is given below — no git archaeology required.

```tsx
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
```

Inside `Projects`, alongside the existing `isDark` and `demoModal` state:

```tsx
const [api, setApi] = React.useState<CarouselApi>();
const [progress, setProgress] = React.useState(0);

React.useEffect(() => {
  if (!api) return;
  const updateProgress = () => {
    const scrollProgress = api.scrollProgress();
    setProgress(Math.max(0, Math.min(1, scrollProgress)) * 100);
  };
  updateProgress();
  api.on("scroll", updateProgress);
  api.on("reInit", updateProgress);
  api.on("select", updateProgress);
  return () => {
    api.off("scroll", updateProgress);
    api.off("reInit", updateProgress);
    api.off("select", updateProgress);
  };
}, [api]);
```

- [ ] **Step 2: Swap the grid for carousel slides**

Replace the `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">` block with:

```tsx
<Carousel setApi={setApi} opts={{ align: "start", loop: false, slidesToScroll: 1 }}>
  <CarouselContent className="-ml-6">
    {APPS.map((app, index) => (
      <CarouselItem key={app.id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
        <motion.div
          variants={FADE_UP_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="h-full"
        >
          <AppCard
            app={app}
            isDark={isDark}
            onOpenDemo={(env) => setDemoModal({ env, appName: app.name })}
          />
        </motion.div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

`AppCard` keeps `flex flex-col` on its root, and the wrapper carries `h-full`, so slides in a row match height regardless of description length.

- [ ] **Step 3: Add the prev/next controls and progress bar**

Below the carousel band, matching the registry's original footer controls:

```tsx
<div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
  <div className="border-x border-border p-5 md:p-8 lg:p-12 overflow-hidden">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous project"
          className="rounded-full w-10 h-10 border-border hover:bg-muted/50 transition-colors hover:cursor-pointer"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-normal text-foreground hidden sm:inline">Previous</span>
      </div>
      <div className="flex-1 max-w-24 sm:max-w-52 h-0.5 bg-border relative rounded-full">
        <div
          className="absolute left-0 bg-foreground h-1 top-1/2 -translate-y-1/2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-sm font-normal text-foreground hidden sm:inline">Next</span>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next project"
          className="rounded-full w-10 h-10 border-border hover:bg-muted/50 transition-colors hover:cursor-pointer"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</div>
```

The `aria-label`s are additions — the registry's icon-only buttons had no accessible name.

- [ ] **Step 4: Verify all seven apps are in the DOM**

Embla renders every slide in the DOM regardless of what is visible, so all seven must still be present:

```bash
curl -s http://127.0.0.1:3100 | grep -o 'Agendex\|Casefile\|AniCal\|Food Twin\|Falcon Tools\|Algorithm Playground\|Broke But Optimistic' | sort -u | wc -l
```

Expected: `7`.

- [ ] **Step 5: Verify the build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 6: Manually verify the carousel and modal**

Open `http://127.0.0.1:3100` in a browser. Confirm: prev/next move the carousel, the progress bar tracks, and clicking "Demo" on Broke But Optimistic opens the modal with a working copy button for both credentials.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: convert projects section to carousel"
```

---

### Task 7: About section

**Files:**
- Create: `components/shadcn-space/pages/landing-page-01/about/index.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/index.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `about/index.tsx` default-exports `About()` — no props.

- [ ] **Step 1: Write the section with the real data**

All content below is the user's own; do not invent, embellish, or reword the factual claims. Note `completed: false` on the Master's.

```tsx
const experience = [
  { role: "Senior Full Stack Developer", org: "Roboyo", period: "Apr 2025 — Present" },
  { role: "Full Stack Developer", org: "Roboyo", period: "Jul 2023 — Apr 2025" },
  { role: "Full Stack Developer (intern)", org: "Roboyo", period: "Apr 2023 — Jun 2023" },
  { role: "IT Technician Intern / Junior Developer", org: "Capgemini", period: "Jan 2018 — Jun 2018" },
];

const education = [
  {
    degree: "Master's, Computer Software Engineering",
    school: "Instituto Superior de Engenharia do Porto",
    period: "2023 — 2024",
    completed: false,
  },
  {
    degree: "Bachelor's, Systems Engineering",
    school: "Instituto Superior de Engenharia do Porto",
    period: "2020 — 2023",
    completed: true,
  },
  {
    degree: "CTeSP, Computer Networks and Systems",
    school: "ISLA — Instituto Politécnico de Gestão e Tecnologia",
    period: "2018 — 2020",
    completed: true,
  },
  {
    degree: "Vocational Secondary, IT Equipment Management",
    school: "Escola Profissional de Gaia",
    period: "2015 — 2018",
    completed: true,
  },
];

const certifications = [
  {
    issuer: "Anthropic",
    items: [
      { name: "Model Context Protocol: Advanced Topics", date: "Jun 2026" },
      { name: "Introduction to Model Context Protocol", date: "Jun 2026" },
      { name: "Certificate of completion: Introduction to subagents", date: "Jun 2026" },
      { name: "Certificate of completion: Introduction to agent skills", date: "Apr 2026" },
      { name: "Certificate of completion: Claude Platform 101", date: "Jun 2026" },
      { name: "Claude Code in Action", date: "Jun 2026" },
      { name: "Certificate of completion: Claude Code 101", date: "Jun 2026" },
      { name: "Certificate of completion: Claude 101", date: "Jun 2026" },
      { name: "Building with the Claude API", date: "Jun 2026" },
    ],
  },
  {
    issuer: "Cisco Networking Academy",
    items: [
      { name: "CCNA Routing and Switching: Connecting Networks", date: "Feb 2020" },
      { name: "CCNA Routing and Switching: Routing and Switching Essentials", date: "Jul 2019" },
      { name: "CCNA Routing and Switching: Scaling Networks", date: "Jan 2019" },
      { name: "CCNA Routing and Switching: Introduction to Networks", date: "Jan 2019" },
    ],
  },
];

const skills = [
  "Laravel",
  "React",
  "AureliaJS",
  "TypeScript",
  "PHP",
  "Next.js",
  "Network Security",
  "Project Management",
  "AI-Powered Development",
];
```

- [ ] **Step 2: Write the markup**

Follow the established section pattern — eyebrow, big heading, then bordered bands:

```tsx
export default function About() {
  return (
    <section id="about">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
            <span className="text-base font-normal text-muted-foreground">About</span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
            Who I am.
          </h2>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border p-6 lg:p-10 flex flex-col gap-6 max-w-3xl">
            <p className="text-lg text-muted-foreground">
              Senior Full Stack Developer focused on building reliable, maintainable
              production web applications. I work mainly with Laravel, React and
              AureliaJS across backend development, APIs, frontend implementation,
              debugging, refactoring, deployment support and system maintenance.
            </p>
            <p className="text-lg text-muted-foreground">
              I&apos;m trusted with work that needs ownership: planning features,
              coordinating tasks, reviewing code, supporting other developers, solving
              production issues, and delivering clean, practical solutions without
              unnecessary technical debt. I care about software that works in the real
              world — secure, understandable, maintainable, and easy for teams to improve.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 lg:p-10 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-border">
              <p className="text-base text-muted-foreground">Experience</p>
              {experience.map((job) => (
                <div key={`${job.org}-${job.period}`} className="flex flex-col gap-0.5">
                  <p className="text-lg font-medium text-foreground">{job.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.org} · {job.period}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-6 lg:p-10 flex flex-col gap-6">
              <p className="text-base text-muted-foreground">Education</p>
              {education.map((edu) => (
                <div key={edu.degree} className="flex flex-col gap-0.5">
                  <p className="text-lg font-medium text-foreground">
                    {edu.degree}
                    {!edu.completed && (
                      <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs font-normal text-muted-foreground align-middle">
                        not completed
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.school} · {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border p-6 lg:p-10 flex flex-col gap-4">
          <p className="text-base text-muted-foreground">Certifications</p>
          {certifications.map((group) => (
            <details key={group.issuer} className="group border-b border-border pb-3 last:border-b-0">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-foreground marker:content-['']">
                <span>
                  {group.issuer}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {group.items.length} certificates
                  </span>
                </span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items.map((cert) => (
                  <li
                    key={cert.name}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                  >
                    <span className="text-base text-foreground">{cert.name}</span>
                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Native `<details>`/`<summary>` means no client component and no JavaScript for the expand behaviour.

- [ ] **Step 3: Add About to the composition**

In `index.tsx`, import and render after `Projects`:

```tsx
<HeroPage stats={stats} />
<GitHubSection stats={stats} />
<Projects />
<About />
```

- [ ] **Step 4: Verify the content renders, including the incomplete-degree label**

```bash
curl -s http://127.0.0.1:3100 | grep -c "not completed"
curl -s http://127.0.0.1:3100 | grep -o "9 certificates\|4 certificates"
curl -s http://127.0.0.1:3100 | grep -c "AureliaJS"
```

Expected: `1` for "not completed"; both certificate counts present; non-zero for AureliaJS.

- [ ] **Step 5: Confirm no LinkedIn reference leaked in**

```bash
grep -rni "linkedin" app components lib assets
```

Expected: no output. The user restricted contact to email and GitHub.

- [ ] **Step 6: Verify the build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add about section"
```

---

### Task 8: Contact section and final polish

**Files:**
- Create: `components/shadcn-space/pages/landing-page-01/contact/index.tsx`
- Modify: `components/shadcn-space/pages/landing-page-01/index.tsx`
- Modify: `app/layout.tsx` (metadata only)

**Interfaces:**
- Consumes: nothing.
- Produces: `contact/index.tsx` default-exports `Contact()` — no props.

- [ ] **Step 1: Write the contact section**

Two cards only — email and GitHub. No form, no backend, no third channel.

```tsx
import { ArrowUpRight } from "lucide-react";

const channels = [
  {
    label: "Email",
    value: "hugo.miranda.imp@gmail.com",
    href: "mailto:hugo.miranda.imp@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/HugoFMiranda",
    href: "https://github.com/HugoFMiranda",
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border px-5 md:px-8 py-8 lg:py-16 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground m-1.5" />
              <span className="text-base font-normal text-muted-foreground">Contact</span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground">
              Get in touch.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Open to interesting problems and good engineering conversations.
            </p>
          </div>
        </div>
      </div>

      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border grid grid-cols-1 md:grid-cols-2">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between gap-4 p-6 lg:p-10 border-b md:border-b-0 md:border-r md:last:border-r-0 border-border hover:bg-muted/40 transition-colors"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-base text-muted-foreground">{channel.label}</span>
                  <span className="text-lg md:text-xl font-medium text-foreground truncate">
                    {channel.value}
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:rotate-45"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

The shared `ArrowUpRight` carries the affordance for both cards, so no per-channel icon is needed.

- [ ] **Step 2: Add Contact to the composition**

```tsx
<HeroPage stats={stats} />
<GitHubSection stats={stats} />
<Projects />
<About />
<Contact />
```

- [ ] **Step 3: Update the page metadata**

In `app/layout.tsx`, replace the `metadata` export — the description still describes the old app index:

```tsx
export const metadata: Metadata = {
  title: "Hugo Miranda — Senior Full Stack Developer",
  description:
    "Senior Full Stack Developer building reliable, maintainable production web applications with Laravel, React and Next.js. Personal projects, GitHub activity and contact.",
};
```

Change nothing else in this file — in particular, leave the pre-paint theme script alone.

- [ ] **Step 4: Verify the full section order**

```bash
curl -s http://127.0.0.1:3100 > /tmp/final.html
for id in github projects about contact; do
  printf "%s: " "$id"
  grep -o "id=\"$id\"" /tmp/final.html | wc -l
done
grep -c "hugo.miranda.imp@gmail.com" /tmp/final.html
```

Expected: `1` for each of the four section ids, and at least `1` for the email.

Confirm they appear in the right order:

```bash
grep -o 'id="github"\|id="projects"\|id="about"\|id="contact"' /tmp/final.html
```

Expected, in this order: `id="github"`, `id="projects"`, `id="about"`, `id="contact"`.

- [ ] **Step 5: Verify the wrong email did not leak in**

```bash
grep -rn "hugoeu10@gmail.com" app components lib assets
```

Expected: no output. That address is the git-config address, not the published contact address.

- [ ] **Step 6: Verify the build**

```bash
npm run build
```

Expected: build succeeds with no type errors and no unused-import warnings.

- [ ] **Step 7: Full manual verification**

Open `http://127.0.0.1:3100` and confirm every item:

1. All six sections render in order: Hero, GitHub, Projects, About, Contact, Footer.
2. Theme toggle flips light/dark; reload preserves the choice with no flash of the wrong theme.
3. App card gradients switch with the theme (the `MutationObserver` from Task 3).
4. Carousel prev/next work and the progress bar tracks.
5. The Broke But Optimistic demo modal opens; both copy buttons work; Escape closes it.
6. Certification groups expand and collapse.
7. Navbar links scroll to the right sections and the active-section indicator follows.
8. The layout holds at 375px wide with no horizontal scroll.

- [ ] **Step 8: Confirm the license key is still not committed**

```bash
git ls-files | grep -i "^\.env"
```

Expected: only `.env.example`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add contact section and update metadata"
```

---

## Notes for the implementer

- **`app/globals.css` is untouched by this plan.** The registry components use the existing `--border`, `--foreground`, `--muted-foreground` tokens, which are already defined.
- **`components/ui/button.tsx` was overwritten by the registry install.** If a pre-existing button somewhere looks wrong, that is why — the fix is to adjust the call site, not to restore the old file.
- **The seven apps' URLs, descriptions, tags, colours, and demo credentials are load-bearing user data.** Move them, never rewrite them.
- **If a step's verification fails, stop and report it.** Do not proceed to the next task with a broken build or a missing section.
