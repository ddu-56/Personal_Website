import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>; the deploy workflow sets
// this. Locally it's empty so `npm run dev` stays at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages, which has no Node server.
  output: "export",
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
