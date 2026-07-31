// Yomu is an Android app, so its mockups come from the real device screenshots
// in the repo's readme gif rather than from a browser capture.
//
// The gif's frames are a 4-phone montage (Library, manga detail, Recents, Reader).
// Its Library panel does NOT contain a real light/dark UI swap: content is static
// across all 61 frames, and only a decorative brightness cycle (bright at the loop
// seam, darkest at the midpoint) plays over a single light-theme screenshot. So
// there is no dark-theme Library frame anywhere in this gif.
//
// Instead of faking a dark Library by using the dimmed end of that cycle, the two
// output images show two different screens of the app:
//   - yomu-light.webp: the Library grid (1st phone in the montage), light theme.
//   - yomu-dark.webp:  the manga-detail screen (2nd phone in the montage), which
//                       has genuinely dark UI (dark background, cover art, chapter
//                       list, pink action button) at this frame. It is a different
//                       screen from the light variant, not a re-theme of it, and
//                       that is intentional: both are real Yomu screenshots, and
//                       at tile size the pair reads as "the app, in both themes."
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

// Frame numbers into the gif's 61-frame decorative brightness cycle (0 = loop
// seam / brightest, 30 = cycle midpoint / darkest). Both phones are fully drawn
// and sharp at these frames, with no cross-fade or motion blur.
const LIBRARY_FRAME = 0; // library grid, brightest point of the cycle
const DETAIL_FRAME = 30; // manga-detail screen, darkest point of the cycle (genuinely dark UI, pink button)

// Each output crops one phone out of the 825x425 4-phone montage frame, keeping
// its Pixel device frame intact.
const CAPTURES = [
  { theme: "light", frame: LIBRARY_FRAME, crop: "crop=206:412:12:6" }, // 1st phone: Library
  { theme: "dark", frame: DETAIL_FRAME, crop: "crop=206:412:208:6" }, // 2nd phone: manga detail
];

const work = mkdtempSync(path.join(tmpdir(), "yomu-"));
const gif = path.join(work, "screens.gif");

try {
  mkdirSync(OUT_DIR, { recursive: true });
  execFileSync("curl", ["-sL", "-o", gif, GIF_URL]);

  for (const { theme, frame, crop } of CAPTURES) {
    const out = path.join(OUT_DIR, `yomu-${theme}.webp`);
    execFileSync("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", gif,
      "-vf", `select=eq(n\\,${frame}),${crop}`,
      "-frames:v", "1",
      "-quality", "90",
      out,
    ]);
    console.log(`  ok   yomu-${theme}.webp`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
