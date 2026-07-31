# Real screenshots for project mockups

Date: 2026-07-31
Status: approved

## Problem

Each project row in `components/shadcn-space/pages/landing-page-01/portfolio/index.tsx` renders a
hand-drawn abstract SVG from `components/app-mockup.tsx` (230 lines, one branch per app id). The
SVGs are flat, invented, and read as placeholder art rather than as products. On a portfolio the
visual should be the thing that was actually built.

Seven of the eight apps are live and publicly reachable. The eighth (Yomu) is an Android app whose
repo already contains real device screenshots.

## Goal

Replace the invented SVGs with real screenshots of each app, rendered inside a small window frame,
in the tile the mockup already occupies. No layout change to the project row.

## What the live URLs actually show

Probed with Playwright at 1280x800 on 2026-07-31. None of the eight redirect to a login wall, but
four serve a marketing page rather than the product:

| App | Root URL renders | Capture target |
| --- | --- | --- |
| Casefile | The real game board (case board + manor blueprint) | Root, as-is |
| AniCal | The real Today grid, populated with cover art | Root (`/today`), as-is |
| Algorithm Playground | Algorithm catalog list | Navigate into a visualizer page |
| Falcon Tools | Four tool cards on a mostly empty page | Navigate into PDF Page Operations |
| Food Twin | Marketing hero + feature cards | Click through to search, enter a query |
| Broke But Optimistic | Marketing hero | Log in with the published demo credentials |
| Agendex | Marketing hero + cookie banner | Marketing hero, cookie banner dismissed |
| Yomu | n/a (Android) | Frame extracted from the repo's `screens.gif` |

Capturing every root URL blind would produce four screenshots of marketing copy. Each app therefore
needs its own capture recipe.

Agendex is the one app whose product UI is unreachable: it is behind a login and no demo account
exists. Its marketing hero embeds a realistic appointment-list card, which is the strongest
available frame, so the recipe dismisses the cookie banner and captures the hero.

## Design

### 1. Capture script

`scripts/capture-mockups.mjs`, run via `npm run mockups`. Playwright added as a devDependency. It is
a manual, occasional script, not part of `next build`.

The script holds a recipe per app id:

```js
{
  id: 'food-twin',
  url: 'https://food.hugofmiranda.com',
  viewport: { width: 1280, height: 800 },
  themes: ['light', 'dark'],       // omit or single-entry when the app has no dark mode
  prepare: async (page) => { ... }, // clicks, typing, cookie dismissal, login
  clip: { x, y, width, height },    // optional, to frame a specific region
}
```

Each app is captured at `deviceScaleFactor: 2` and written to
`public/mockups/<id>-light.webp` and `public/mockups/<id>-dark.webp`. Outputs are committed.

Theme selection per app is whatever that app supports: an in-app theme toggle where one exists,
otherwise `colorScheme` on the browser context. An app with no dark variant emits one file and the
component falls back to it for both themes.

BBO's login uses the demo credentials already published in `lib/apps.ts`
(`demo@bbo.test`), so the script exposes nothing new.

### 2. Yomu

The Yomu repo's `.github/readme-images/screens.gif` is a loop of real device screenshots already
inside a Pixel frame, and it contains both light and dark passes of the library grid. A step in the
same script (or a sibling one-shot, whichever is simpler) uses ffmpeg to pull the library-grid frame
in each theme and writes them to the same `public/mockups/` directory.

Because the gif frames already carry a device frame, Yomu's tile skips the browser chrome described
below.

### 3. Mockup component

`components/app-mockup.tsx` is rewritten. The per-app SVG branches are deleted. What remains:

- A window chrome: three traffic-light dots and a URL pill fed from `app.url`, styled against the
  app's accent and the existing tile gradient.
- The screenshot inside it, via `next/image`, choosing the light or dark asset from the `isDark`
  prop the portfolio component already threads through.
- A `framed: false` path for Yomu that renders the phone-framed image bare.

The component keeps its current props shape (`id`, `accent`) plus whatever it needs for the theme
and url; the portfolio component already has all of it.

### 4. Tile treatment

The tile keeps its current size and position (`lg:w-64 xl:w-80`, gradient background from
`app.colors`). A 1280x800 page shrunk into ~280px is unreadable, so the image is rendered
`object-cover object-top` and scaled roughly 1.4x inside the frame. The result reads as a crop of
real UI rather than a miniature of a whole page. The existing `group-hover:scale-105` transform
stays.

## Non-goals

- No change to the project row layout, ordering, or copy.
- No CI integration. Screenshots are refreshed by running the script by hand.
- No AI-generated imagery. Every visual is a real capture.

## Risks

- **Staleness.** A redesigned app leaves a stale screenshot until the script is re-run. Accepted;
  the script is the mitigation.
- **Repo weight.** Roughly sixteen webp files. Expected well under 1 MB total at these dimensions.
- **Recipe brittleness.** A changed selector breaks that app's `prepare` step. The script should
  fail loudly per app and continue with the others rather than aborting the whole run.
- **Third-party art.** AniCal and Yomu screenshots contain anime cover art. Same content the live
  sites already serve publicly.

## Verification

- `npm run mockups` produces a file for every app id in `APPS`, in both themes where declared.
- Every generated image is inspected before commit; none may show a cookie banner, a loading
  skeleton, an empty state, or a login form.
- The portfolio section renders correctly in light and dark, and toggling the navbar theme swaps
  every tile's asset.
- `npm run build` passes.
