"use client";

// next/image loader for the static export. Photos under /photos/ are served
// from the copies scripts/images.mjs pre-sizes; anything else passes through.
// Keep WIDTHS in sync with that script and `deviceSizes` in next.config.ts.

const WIDTHS = [480, 800, 1200, 1600];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const w = WIDTHS.find((n) => n >= width) ?? WIDTHS[WIDTHS.length - 1];
  return src.replace(/\/photos\/([^/]+)\.jpe?g$/i, `/photos/_sized/$1-${w}.webp`);
}
