@AGENTS.md

The conventions live in `AGENTS.md`, imported above, so humans and every agent read one copy. Keep
them there. What follows is only about working this repo through Claude Code.

## Before claiming a change is done

- `npm run build` is the whole check. There is no test suite and no linter, so a green build plus
  your own eyes on the page is the entire safety net. Run it, do not assume it.
- Anything visual is unverified until it has been looked at in both themes and at mobile width. The
  layout only diverges at `xl`, so a desktop screenshot proves very little.
- Say what you actually ran. A build that was not run, or a screenshot that was not opened, is not
  evidence.

## Screenshots

`public/mockups/` is generated and committed, and the capture scripts drive live production sites.
A run can silently produce a cookie banner, a skeleton, an empty state or a login screen, and
nothing in the tooling can tell that from a good capture. Open every image you regenerate before
staging it.

When checking a regenerated tile in the dev server, clear Next's optimized-image cache first
(`rm -rf .next/dev/cache/images`). It survives both the overwrite and a server restart, so without
it you are looking at the old crop.

The README's "Project mockups" section has the commands and the flags.

## Context

Design notes and plans for past changes are in `docs/superpowers/`. Worth reading before reworking
the landing page or the mockup pipeline, since some of the obvious refactors there were already
tried and reverted.
