// Builds the web-sized copies of every photo in public/photos, so the static
// host (which can't resize on request) still serves each device only what it
// needs. Runs before `dev` and `build`; skips anything already up to date.
//
//   public/photos/_sized/<name>-<w>.webp   responsive widths, for next/image
//   public/photos/_sized/thumbs/<name>.webp  small grayscale strip frames
//
// The widths must match `deviceSizes` in next.config.ts and src/lib/image-loader.ts.

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [480, 800, 1200, 1600];
const THUMB_HEIGHT = 360;

const src = path.join(process.cwd(), "public/photos");
const out = path.join(src, "_sized");
await mkdir(path.join(out, "thumbs"), { recursive: true });

const fresh = async (input, output) => {
  try {
    return (await stat(output)).mtimeMs >= (await stat(input)).mtimeMs;
  } catch {
    return false;
  }
};

let made = 0;
for (const file of await readdir(src)) {
  if (!/\.jpe?g$/i.test(file)) continue;
  const input = path.join(src, file);
  const name = file.replace(/\.jpe?g$/i, "");

  for (const w of WIDTHS) {
    const output = path.join(out, `${name}-${w}.webp`);
    if (await fresh(input, output)) continue;
    await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(output);
    made++;
  }

  // Strip frames are always shown gray and faint, so bake the gray in rather
  // than filtering a hundred moving images in the browser.
  const thumb = path.join(out, "thumbs", `${name}.webp`);
  if (!(await fresh(input, thumb))) {
    await sharp(input)
      .rotate()
      .resize({ height: THUMB_HEIGHT })
      .grayscale()
      .webp({ quality: 70 })
      .toFile(thumb);
    made++;
  }
}

console.log(`images: ${made ? `${made} written` : "up to date"}`);
