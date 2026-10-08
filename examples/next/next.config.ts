import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Only needed in this repo, where the package is linked from two folders up.
  turbopack: { root: path.join(import.meta.dirname, "../..") },
};

export default nextConfig;
