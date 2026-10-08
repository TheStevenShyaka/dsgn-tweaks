import {
  DEFAULT_BASE,
  clientTags,
  createNodeMiddleware
} from "./chunk-FOCFE4CL.js";

// src/vite.ts
function dsgnTweaks(config = {}, options = {}) {
  const base = config.endpoint ?? DEFAULT_BASE;
  return {
    name: "dsgn-tweaks",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(createNodeMiddleware({ ...options, enabled: true, base }));
    },
    transformIndexHtml(html) {
      return html.replace(/<\/body>/i, `${clientTags(config, base)}</body>`);
    }
  };
}
var vite_default = dsgnTweaks;
export {
  vite_default as default,
  dsgnTweaks
};
