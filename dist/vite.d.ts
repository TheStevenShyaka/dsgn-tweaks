import { Plugin } from 'vite';
import { ServerOptions } from './server.js';
import 'node:http';

/** Everything project-specific lives here, passed in from the host app as <DesignTweaks config={...} />. */
type ExplorationOption = {
    id: string;
    label: string;
};
/** A section with alternative layouts, switched by a URL search param that your page reads. */
type Exploration = {
    /** Search param the page reads, e.g. "projects" for ?projects=index. */
    param: string;
    label: string;
    /** First option is the default (rendered when the param is absent). */
    options: readonly ExplorationOption[];
    /** Section key it belongs to, when it differs from `param` (see data-design-section). */
    section?: string;
};
/** A colour token exposed as --color-{key} (Tailwind v4 @theme naming). */
type Token = {
    key: string;
    label: string;
    light: string;
    dark?: string;
    /** Other CSS variables that should follow this one, without the --color- prefix. */
    aliases?: readonly string[];
};
type DesignTweaksConfig = {
    explorations?: readonly Exploration[];
    tokens?: readonly Token[];
    /**
     * How the site switches light/dark. `attribute` on <html> is set to `dark` (default "data-theme"),
     * or use attribute "class" to toggle a `dark` class (Tailwind's default). `storageKey` remembers the choice.
     */
    theme?: {
        attribute?: string;
        dark?: string;
        storageKey?: string;
    };
    /** Where the dev server answers (see dsgn-tweaks/server). Default /api/dsgn-tweaks. */
    endpoint?: string;
    /**
     * "auto" (default) saves through the dev server and falls back to this browser when none answers.
     * "browser" never calls a server; "server" never falls back.
     */
    storage?: "auto" | "server" | "browser";
    /** How to open a new URL when a layout exploration changes. Default: a normal page load. */
    navigate?: (url: string) => void;
    /** Extra fonts for the inspector's font picker, besides var(--font-sans) and var(--font-mono). */
    fonts?: readonly {
        value: string;
        label: string;
    }[];
    /** Who the Send button hands the batch to. Default "Claude". */
    agentName?: string;
};

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
declare function dsgnTweaks(config?: Omit<DesignTweaksConfig, "navigate">, options?: ServerOptions): Plugin;

export { dsgnTweaks as default, dsgnTweaks };
