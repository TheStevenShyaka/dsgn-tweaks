import { defineConfig } from "tsup";

const browser = {
  loader: { ".css": "text" } as const,
  // The panel's UI library and icons are bundled in, so host pages need nothing.
  noExternal: [/^preact/, /^lucide-preact/],
  platform: "browser" as const,
  target: "es2022",
};

export default defineConfig([
  // import { init } from "dsgn-tweaks"
  { ...browser, entry: { index: "src/index.ts" }, format: ["esm"], dts: true, clean: true },
  // <script src=".../dsgn-tweaks.global.js">: mounts itself
  { ...browser, entry: { "dsgn-tweaks.global": "src/auto.ts" }, format: ["iife"], minify: true, outExtension: () => ({ js: ".js" }) },
  // React and Next.js components (client components, panel imported from the main entry)
  {
    entry: { react: "src/react.ts", next: "src/next.ts" },
    format: ["esm"],
    dts: true,
    external: ["react", "next", "dsgn-tweaks"],
    banner: { js: '"use client";' },
  },
  // Server, Vite plugin and CLI (Node)
  { entry: { server: "src/server/index.ts", vite: "src/vite.ts" }, format: ["esm"], dts: true, platform: "node", target: "node18", external: ["vite"] },
  { entry: { cli: "src/cli.ts" }, format: ["esm"], platform: "node", target: "node18", banner: { js: "#!/usr/bin/env node" } },
]);
