<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# falcon-hub

Personal portfolio site for Hugo Miranda. Next.js 16 App Router, React 19, Tailwind CSS 4, shadcn
components on Base UI, Motion, Lucide. `README.md` has the wider tour; this file is the conventions.

## Where things live

- `app/page.tsx` renders one component. Every section of the page is a folder under
  `components/shadcn-space/pages/landing-page-01/`. Edit the section, not the page.
- `lib/apps.ts` is the source of truth for the portfolio grid. Project copy, tags, links, tile
  colours and demo credentials all come from `APPS`, never from JSX.
- `components/ui/` is generated shadcn code. Prefer adding a component over hand-editing what is
  there.
- `app/globals.css` holds the design tokens for both themes. Style with those tokens
  (`bg-background`, `text-muted-foreground`) rather than raw Tailwind colours, so dark mode keeps
  working.

## Conventions

- The page root (`landing-page-01/index.tsx`) is a client component because it tracks the scrolled
  section for the navbar. Splitting the static sections back out to the server was tried and
  reverted in `ed235d6`; do not redo it on general principle alone.
- Theme is a `dark` class on `<html>`, written by the inline script in `app/layout.tsx` and toggled
  from the navbar, persisted to `localStorage` under `falcon-hub-theme`. There is no theme provider
  and no context; do not add one without replacing that script.
- No em dashes in user-facing copy.
- Check work in both themes and at mobile width. Much of the layout only diverges at `xl`.
- `npm run build` is the check before calling a change done. There is no test suite and no linter
  configured.

## Screenshots

`public/mockups/` is generated and committed. Do not edit those files by hand, and do not add a
project to `APPS` without also adding its capture recipe. The README's "Project mockups" section has
the commands and the traps.
