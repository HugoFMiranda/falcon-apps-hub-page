This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
