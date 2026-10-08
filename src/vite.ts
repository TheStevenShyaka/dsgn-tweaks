import type { Plugin } from "vite";
import type { DesignTweaksConfig } from "./core/config";
import { DEFAULT_BASE, clientTags, createNodeMiddleware, type ServerOptions } from "./server/index";

/**
 * Vite plugin (dev server only): stores tweaks through Vite's own server and adds the panel to
 * index.html. Works for any Vite app: vanilla, React, Vue, Svelte, Solid, Preact, Lit…
 *
 *   // vite.config.ts
 *   import { dsgnTweaks } from "dsgn-tweaks/vite";
 *   export default { plugins: [dsgnTweaks()] };
 *
 * SSR frameworks that don't serve index.html (SvelteKit, Astro, Nuxt…) keep the middleware;
 * add the panel with `import { init } from "dsgn-tweaks"` in client code instead.
 */
export function dsgnTweaks(config: Omit<DesignTweaksConfig, "navigate"> = {}, options: ServerOptions = {}): Plugin {
  const base = config.endpoint ?? DEFAULT_BASE;
  return {
    name: "dsgn-tweaks",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(createNodeMiddleware({ ...options, enabled: true, base }));
    },
    transformIndexHtml(html) {
      return html.replace(/<\/body>/i, `${clientTags(config, base)}</body>`);
    },
  };
}

export default dsgnTweaks;
