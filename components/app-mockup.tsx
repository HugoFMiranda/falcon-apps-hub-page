import Image from "next/image";
import type { CSSProperties } from "react";
import type { AppDef } from "@/lib/apps";

/** Apps with a captured dark screenshot. Everything else reuses its light one. */
const DARK_CAPTURES = new Set(["yomu"]);

/** Yomu's frames come out of an Android screenshot, so they carry their own device frame. */
const SELF_FRAMED = new Set(["yomu"]);

/** `#0d9488` -> `13 148 136`, for use inside rgb(... / <alpha>). */
function rgbChannels(hex: string) {
  const value = parseInt(hex.replace("#", ""), 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

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
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 256px, 100vw"
          className="object-contain object-center"
        />
      </div>
    );
  }

  // The chrome is tinted with the app's accent rather than plain grey, so the
  // frame carries the same per-app identity as the tile gradient behind it. The
  // alphas are deliberately low: at 20px tall this should read as a hint of
  // color, not as a colored bar. Set as custom properties because the accent is
  // per-app data, and consumed through `dark:` variants because the theme class
  // lands on <html> before `isDark` catches up on the client.
  const accent = rgbChannels(app.colors.accent);
  const chromeVars = {
    "--chrome-bg": `rgb(${accent} / 0.06)`,
    "--chrome-bg-dark": `rgb(${accent} / 0.14)`,
    "--chrome-line": `rgb(${accent} / 0.14)`,
    "--chrome-line-dark": `rgb(${accent} / 0.24)`,
    "--chrome-dot": `rgb(${accent} / 0.4)`,
    "--chrome-dot-dark": `rgb(${accent} / 0.55)`,
    "--chrome-pill": `rgb(${accent} / 0.1)`,
    "--chrome-pill-dark": `rgb(${accent} / 0.18)`,
    "--chrome-text": `rgb(${accent} / 0.85)`,
    "--chrome-text-dark": `rgb(${accent} / 0.95)`,
  } as CSSProperties;

  return (
    <div
      style={chromeVars}
      className="h-full w-full overflow-hidden rounded-md border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-900"
    >
      {/* Window chrome */}
      <div className="flex h-5 items-center gap-1.5 border-b border-[var(--chrome-line)] bg-[var(--chrome-bg)] px-2 dark:border-[var(--chrome-line-dark)] dark:bg-[var(--chrome-bg-dark)]">
        <span className="size-1.5 rounded-full bg-[var(--chrome-dot)] dark:bg-[var(--chrome-dot-dark)]" />
        <span className="size-1.5 rounded-full bg-[var(--chrome-dot)] dark:bg-[var(--chrome-dot-dark)]" />
        <span className="size-1.5 rounded-full bg-[var(--chrome-dot)] dark:bg-[var(--chrome-dot-dark)]" />
        <span className="ml-1 truncate rounded-full bg-[var(--chrome-pill)] px-2 text-[7px] leading-[11px] text-[var(--chrome-text)] dark:bg-[var(--chrome-pill-dark)] dark:text-[var(--chrome-text-dark)]">
          {app.url}
        </span>
      </div>
      {/* Screenshot at 1:1. Each capture's own clip does the framing, so an extra
          zoom here would only slice through content that was deliberately included. */}
      <div className="relative h-[calc(100%-1.25rem)] w-full overflow-hidden">
        <Image
          src={src}
          alt={`Screenshot of ${app.name}`}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 256px, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
