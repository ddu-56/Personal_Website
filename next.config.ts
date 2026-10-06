import path from "node:path";
import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>; the deploy workflow sets
// this. Locally it's empty so `npm run dev` stays at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages, which has no Node server.
  output: "export",
  // Pin the project root. A stray package-lock.json in the home folder made
  // Next guess the whole home directory as the root, which left the dev
  // server watching the wrong tree and serving stale CSS.
  turbopack: { root: path.resolve(__dirname) },
  basePath,
  // A static host can't resize on request, so scripts/images.mjs pre-sizes
  // every photo and this loader points each srcset entry at the right copy.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 800, 1200, 1600],
    imageSizes: [],
  },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
