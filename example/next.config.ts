import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dsgn-tweaks ships TypeScript source.
  transpilePackages: ["dsgn-tweaks"],
  // The package source lives one folder up in this repo.
  turbopack: { root: path.join(import.meta.dirname, "..") },
};

export default nextConfig;
