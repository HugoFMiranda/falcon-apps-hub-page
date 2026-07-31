// Yomu is an Android app, so its mockup comes from the real device screenshots
// in the repo's readme gif rather than from a browser capture.
//
// The gif's frames are a 4-phone montage (Library, manga detail, Recents, Reader)
// so each extraction also crops to just the leftmost "Library" phone, which is the
// app's grid-of-covers view and its most recognizable screen.
//
// The gif does not actually contain a separate dark-theme screenshot of the Library
// screen: its content is static across all 61 frames, and only a decorative
// brightness cycle (bright at the loop seam, darkest at the midpoint) plays over
// the single light-theme screenshot. LIGHT_FRAME and DARK_FRAME below are the
// brightest and darkest points of that cycle, picked as the closest available
// stand-ins for a light/dark pair.
//
// Manual: `npm run mockups:yomu`.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "mockups");
const GIF_URL =
  "https://raw.githubusercontent.com/HugoFMiranda/yomu/master/.github/readme-images/screens.gif";

const LIGHT_FRAME = 0; // library grid, brightest point of the gif's cycle
const DARK_FRAME = 30; // library grid, darkest point of the gif's cycle

// Crops the leftmost of the 4 phones (Library) out of the 825x425 montage frame,
// keeping its Pixel device frame intact.
const CROP = "crop=206:412:12:6";

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
      "-vf", `select=eq(n\\,${frame}),${CROP}`,
      "-frames:v", "1",
      "-quality", "90",
      out,
    ]);
    console.log(`  ok   yomu-${theme}.webp`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
