# Falcon Hub — Portfolio Landing Redesign

**Date:** 2026-07-30
**Status:** Approved design, pending implementation plan

## Problem

`app/page.tsx` is a 643-line client component that renders a single-purpose app
directory: a header, a two-line hero, a grid of seven app cards, and a footer. It
says nothing about who built the apps.

The site should read as a personal portfolio landing page instead of an app index.
The visual language comes from `@shadcn-space/pages/landing-page-01` ("Portfolio
Landing Page"), which is now installed. Most of that page's sections — services,
pricing, testimonials, FAQ, CTA — are not wanted. Four content sections are:
GitHub, Projects, About, Contact.

## Constraints

- **Registry page is PRO and already installed.** `components.json` declares the
  `@shadcn-space` registry with `${SHADCN_SPACE_EMAIL}` /
  `${SHADCN_SPACE_LICENSE_KEY}` params; values live in `.env`, gitignored via
  `.env*`. `.env.example` is the committed template, un-ignored by an explicit
  `!.env.example` rule.
- **Do not recreate the registry page by hand.** The registry's agent rules forbid
  recreating, rewriting, or approximating it. We adapt the installed files.
- **Next.js 16.** Read `node_modules/next/dist/docs/` before writing code; this
  version's conventions differ from older Next.js.
- Style is `base-nova` (Base UI, not Radix).
- The install added two dependencies: `motion@^12.43.0` and
  `embla-carousel-react@^8.6.0`. It overwrote `components/ui/button.tsx` and added
  `separator`, `tabs`, `accordion`, `dropdown-menu`, `carousel`.

## Design language

Taken from the installed components; every new section must follow it.

- **Container:** `max-w-7xl mx-auto px-4 lg:px-8 xl:px-16`, with an inner
  `border-x border-border` so vertical rules run the height of the page.
- **Section bands:** separated by `border-y border-border`, full-bleed, with the
  container nested inside.
- **Section header:** an eyebrow (a `w-1.5 h-1.5 rounded-full bg-muted-foreground`
  dot plus a `text-base text-muted-foreground` label) above a
  `text-5xl sm:text-6xl md:text-7xl font-semibold` heading.
- **Motion:** `motion/react`. Sections use `initial="hidden" whileInView="show"
  viewport={{ once: true }}` with the shared fade-up
  (`opacity 0→1`, `y 20→0`, `duration 0.6`, `ease [0.22, 1, 0.36, 1]`) and
  stagger (`staggerChildren: 0.1`) variants.
- **Buttons:** `rounded-full h-auto px-5 py-2.5`, with an `ArrowUpRight` that
  rotates 45° on group hover.
- **Stats:** animated count-up via `useMotionValue` / `useTransform` / `animate`.

## Architecture

`app/page.tsx` becomes a server component so the GitHub section can fetch on the
server. It awaits the GitHub data and passes it as props into the client
composition component, which owns scroll-spy and section state.

```
app/page.tsx                                    server — fetches GitHub, renders composition
lib/apps.ts                                     AppDef / EnvLink types + APPS array (moved verbatim)
lib/github.ts                                   GitHub REST fetch + shaping
components/app-mockup.tsx                       the seven per-app SVG mockups
components/demo-modal.tsx                       client — credential modal
components/shadcn-space/pages/landing-page-01/
  index.tsx                                     client — composition, scroll-spy (edited)
  hero/hero.tsx, hero/index.tsx                 edited
  layout/navbar.tsx, layout/footer.tsx          edited
  portfolio/index.tsx                           edited → app carousel
  github/index.tsx                              new
  about/index.tsx                               new
  contact/index.tsx                             new
```

**Deleted after install:** `services/`, `pricing/`, `testimonial/`, `faq/`,
`cta/`, and the `app/landing-page-01/` demo route.

### Theme

The registry navbar has no theme toggle; the existing site does. The inline script
in `app/layout.tsx` stays as-is (sets `.dark` before paint, no flash). A toggle
button is added to the edited navbar, persisting to `localStorage` under
`falcon-hub-theme` exactly as today. The navbar also loses its hardcoded
"Based on New York, USA" in favour of Portugal.

## Sections

Order: Navbar → Hero → GitHub → Projects → About → Contact → Footer.

### Hero

Adapted from the registry hero. Left column: "I'm Hugo Miranda," / "Senior Full
Stack Developer" / positioning line from the summary / a "Check Projects" CTA
anchored to `#projects`. The inline CDN video is removed. The stat pair becomes
real numbers: years since 2018 and public repo count from the GitHub fetch,
keeping the count-up animation.

Right column: the GitHub avatar
(`https://avatars.githubusercontent.com/u/74903598?v=4`) replaces the CDN
portrait. This is a remote host, so `next.config.ts` needs an
`images.remotePatterns` entry if `next/image` is used; a plain `<img>` (what the
registry component already uses) avoids that.

### GitHub

Live data, unauthenticated GitHub REST, `next: { revalidate: 3600 }`.

| Endpoint | Yields |
|---|---|
| `/users/HugoFMiranda` | public repo count, followers, following, `created_at` |
| `/users/HugoFMiranda/repos?sort=pushed&per_page=100` | total stars, language breakdown, four most-recently-pushed repos |

Renders as stat tiles, a top-languages bar, and a recent-activity list, inside the
standard bordered band.

**Failure handling:** `lib/github.ts` catches fetch and parse errors and returns a
null-shaped result. The section renders its tiles with `—` placeholders and omits
the language bar and activity list. A rate-limit response (403 with
`x-ratelimit-remaining: 0`) is treated the same as a network failure. The page
never throws because GitHub is unreachable.

Unauthenticated requests are limited to 60/hr per IP. With hourly revalidation the
page makes at most two requests per hour, so the ceiling is not a practical risk.

### Projects

The registry's embla carousel, with the seven apps replacing the four stock
images. Each slide keeps the existing card's content and behaviour: fake browser
chrome showing the URL, per-app SVG mockup on a per-app gradient, live/local
status dot, tag badges, and the demo-credentials modal for Broke But Optimistic.
The carousel's progress bar and prev/next controls are kept as-is.

### About

- **Bio** — the professional summary: reliable, maintainable production web
  applications; Laravel, React, AureliaJS; backend, APIs, frontend, debugging,
  refactoring, deployment support, maintenance; ownership of feature planning,
  task coordination, code review, supporting other developers, production issues.
- **Experience** — Roboyo (Senior Full Stack Developer, Apr 2025–present; Full
  Stack Developer, Jul 2023–Apr 2025; intern, Apr–Jun 2023) and Capgemini (IT
  Technician Intern / Junior Developer, Jan–Jun 2018, Vila Nova de Gaia).
- **Education** — ISEP Master's, Computer Software Engineering (2023–2024,
  **not completed** — must be labelled as such); ISEP Bachelor's, Systems
  Engineering (2020–2023); ISLA CTeSP, Computer Networks and Systems (2018–2020);
  Escola Profissional de Gaia, IT Equipment Management (2015–2018).
- **Certifications** — grouped and collapsed by issuer: "Anthropic · 9
  certificates" and "Cisco Networking Academy · 4 certificates", each expandable
  to the full list with issue dates. Native `<details>`/`<summary>`, so no client
  component is needed.
- **Skills** — Laravel, React, AureliaJS, Network Security, Project Management,
  AI-Powered Development.

### Contact

Two cards only:

- `hugo.miranda.imp@gmail.com` as a `mailto:` link
- `github.com/HugoFMiranda`

No LinkedIn card, no contact form, no backend.

## Out of scope

- The registry page's services, pricing, testimonial, FAQ, and CTA sections are
  deleted.
- No contact form, no email-sending backend, no spam protection.
- No GitHub contribution heatmap — that needs the GraphQL API and a personal
  access token.
- No changes to the seven apps themselves, or to their URLs and demo credentials.

## Verification

- `npm run build` succeeds with no type errors.
- Page renders all six sections in order in both light and dark themes.
- Theme toggle persists across reload with no flash of the wrong theme.
- Demo modal still opens for Broke But Optimistic and copies both credentials.
- Carousel advances through all seven apps and the progress bar tracks.
- GitHub section renders with a live fetch, and degrades to `—` placeholders when
  the fetch is forced to fail.
