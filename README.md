# falcon-hub

Personal portfolio site for Hugo Miranda. One page: hero, GitHub activity, a portfolio grid of the
projects in `lib/apps.ts`, an about section and contact details.

Next.js 16 (App Router) with React 19, Tailwind CSS 4, shadcn components on Base UI, Motion for
animation and Lucide for icons.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run build` produces the production build
and `npm run start` serves it on `127.0.0.1`.

## Layout

- `app/layout.tsx` holds the metadata, the Geist fonts and the inline script that applies the saved
  theme before first paint. The theme lives in `localStorage` under `falcon-hub-theme` and is toggled
  from the navbar; there is no theme provider.
- `app/page.tsx` renders a single component, `components/shadcn-space/pages/landing-page-01`. Each
  section of the page is a folder under it (`hero`, `portfolio`, `about`, `contact`, `layout`).
- `lib/apps.ts` is the source of truth for the portfolio. `APPS` describes every project: its name,
  URL, tags, tile colours, optional public repo, and optional `environments` with demo credentials
  that `components/demo-modal.tsx` shows.
- `components/ui/` is generated shadcn code. `app/globals.css` carries the design tokens for both
  themes.

## Project mockups

Everything in `public/mockups/` is generated, not hand-made. The images are real screenshots of the
projects listed in `lib/apps.ts`, rendered by `components/app-mockup.tsx` inside a small browser
frame. They are committed to the repo, so a normal `npm run dev` or `npm run build` needs nothing
extra.

Two scripts write them:

- `npm run mockups` drives the seven live web apps with Playwright. Each app has a recipe in
  `scripts/capture-mockups.mjs` holding its URL, viewport, an optional `prepare` step that clicks
  through cookie banners or types a search query, and the crop.
- `npm run mockups:yomu` pulls two frames out of the Yomu repo's readme gif with ffmpeg, because
  Yomu is an Android app and there is nothing to point a browser at. This one needs `curl` and
  `ffmpeg` on the PATH.

A full refresh is both, in this order:

```bash
npm run mockups:yomu
npm run mockups
# or, the same thing:
npm run mockups:all
```

To redo a single app, pass its id and leave the rest alone:

```bash
npm run mockups -- --only casefile,food-twin
```

**Look at every image you regenerate before committing it.** These are captures of live sites, so a
run can quietly produce a cookie banner, a loading skeleton, an empty state, or a login form, and
nothing in the script can tell that apart from a good screenshot. Open the file, and open the tile in
the running site at its real size in both themes.

When you check the tile in the running site, clear Next's optimized-image cache first:

```bash
rm -rf .next/dev/cache/images
```

That cache survives both the file being overwritten and a dev server restart, so without this you
can spend a while looking at the previous crop and wondering why nothing changed.

Adding a project means adding its entry to `APPS` in `lib/apps.ts` and a matching recipe in
`scripts/capture-mockups.mjs`. If the app gets a dedicated dark-theme capture, add its id to
`DARK_CAPTURES` in `components/app-mockup.tsx` too, otherwise the dark file is written and never
served. The capture script checks all of that at the end of a run and exits non-zero if it does not
line up.

## Working on this repo

`AGENTS.md` holds the conventions, and `CLAUDE.md` points at it, so both humans and agents read the
same file. Design notes and plans for past changes live in `docs/superpowers/`.

This runs a Next.js version newer than most published documentation and most model training data.
The bundled docs in `node_modules/next/dist/docs/` are the reference to check before writing code.
