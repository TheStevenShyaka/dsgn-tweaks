import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // design-tweaks ships TypeScript source.
  transpilePackages: ["design-tweaks"],
  // The package source lives one folder up in this repo.
  turbopack: { root: path.join(import.meta.dirname, "..") },
};

export default nextConfig;
