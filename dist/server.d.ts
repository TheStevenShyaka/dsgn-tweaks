import { IncomingMessage, ServerResponse } from 'node:http';

/**
 * dsgn-tweaks storage for any server. Three ways in:
 *
 *   handleRequest(request)        Web Request → Response (Astro, SvelteKit, Remix, Hono, Bun, Deno…)
 *   createDesignRoute()           { GET, PUT, POST } for Next.js route handlers
 *   createNodeMiddleware()        (req, res, next) for Vite, Express, Connect and the CLI
 *
 * GET/PUT read and write .design/tweaks.json (the live, visual-only state). GET also reports the
 * hand-off: how many sent batches still wait in .design/outbox/, and the agent's .design/reply.json.
 * POST is Send: it drops a snapshot in .design/outbox/<timestamp>.json for the agent to implement.
 * The agent finishes a batch by moving it out of the outbox (to .design/done/) and writing reply.json.
 * The Node middleware also serves the script-tag build at <base>/client.js.
 */
declare const DEFAULT_BASE = "/api/dsgn-tweaks";
type ServerOptions = {
    /** Folder for the working file and the outbox, relative to the process cwd. Default ".design". */
    dir?: string;
    /** Answer at all. Default: only when NODE_ENV is "development". */
    enabled?: boolean;
};
/** Web-standard handler: pass any Request for the dsgn-tweaks endpoint, get the Response back. */
declare function handleRequest(request: Request, options?: ServerOptions): Promise<Response>;
/**
 * Next.js App Router:
 *   // app/api/dsgn-tweaks/route.ts
 *   export const dynamic = "force-dynamic";
 *   export const { GET, PUT, POST } = createDesignRoute();
 */
declare function createDesignRoute(options?: ServerOptions): {
    GET: (request: Request) => Promise<Response>;
    PUT: (request: Request) => Promise<Response>;
    POST: (request: Request) => Promise<Response>;
};
/** The script-tag build, shipped next to this file in dist/. */
declare const clientFile: () => string;
/**
 * Connect-style middleware (Vite, Express, the CLI). Answers <base> (the store) and <base>/client.js
 * (the script-tag build); everything else goes to next().
 */
declare function createNodeMiddleware(options?: ServerOptions & {
    base?: string;
}): (req: IncomingMessage, res: ServerResponse, next?: () => void) => Promise<void>;
/** The tags that load the panel on a page served through the middleware (used by the Vite plugin and the CLI). */
declare function clientTags(config?: Record<string, unknown>, base?: string): string;

export { DEFAULT_BASE, type ServerOptions, clientFile, clientTags, createDesignRoute, createNodeMiddleware, handleRequest };
