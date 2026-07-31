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
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 256px, 100vw"
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
