import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

export const DEFAULT_BASE = "/api/dsgn-tweaks";

export type ServerOptions = {
  /** Folder for the working file and the outbox, relative to the process cwd. Default ".design". */
  dir?: string;
  /** Answer at all. Default: only when NODE_ENV is "development". */
  enabled?: boolean;
};

const json = (body: string) => new Response(body, { headers: { "content-type": "application/json" } });

function store({ dir = ".design" }: ServerOptions) {
  const root = path.resolve(process.cwd(), dir);
  /** ?file=name keeps a separate working file and outbox, for automated checks. */
  const name = (params: URLSearchParams) => {
    const file = params.get("file");
    return file && /^[a-z0-9-]{1,40}$/.test(file) ? file : null;
  };
  const tweaksFile = (params: URLSearchParams) => path.join(root, name(params) ? `tweaks.${name(params)}.json` : "tweaks.json");
  const outbox = (params: URLSearchParams) => path.join(root, name(params) ? `outbox-${name(params)}` : "outbox");
  const replyFile = (params: URLSearchParams) => path.join(root, name(params) ? `reply.${name(params)}.json` : "reply.json");
  const readJson = async (file: string) => {
    try {
      return parse(await readFile(file, "utf8"));
    } catch {
      return null;
    }
  };
  return {
    async read(params: URLSearchParams) {
      const tweaks = (await readJson(tweaksFile(params))) ?? {};
      let pending = 0;
      try {
        pending = (await readdir(outbox(params))).filter((f) => f.endsWith(".json")).length;
      } catch {
        // No outbox yet: nothing pending.
      }
      return JSON.stringify({ ...tweaks, _inbox: { pending, reply: await readJson(replyFile(params)) } });
    },
    async write(params: URLSearchParams, data: object) {
      // The hand-off fields belong to the server and the agent, never to the browser's copy.
      const { _inbox: _ignored, reply: _old, ...rest } = data as Record<string, unknown>;
      await mkdir(root, { recursive: true });
      await writeFile(tweaksFile(params), `${JSON.stringify(rest, null, 2)}\n`);
    },
    /** One file per send, so a second send while the agent is still working never overwrites the first. */
    async send(params: URLSearchParams, data: object) {
      const box = outbox(params);
      await mkdir(box, { recursive: true });
      await writeFile(path.join(box, `${new Date().toISOString().replace(/[:.]/g, "-")}.json`), `${JSON.stringify(data, null, 2)}\n`);
    },
  };
}

function parse(body: string): object | null {
  if (body.length > 1_000_000) return null;
  try {
    const data: unknown = JSON.parse(body);
    return data && typeof data === "object" && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

const isEnabled = (options: ServerOptions) => options.enabled ?? process.env.NODE_ENV === "development";

/** Web-standard handler: pass any Request for the dsgn-tweaks endpoint, get the Response back. */
export async function handleRequest(request: Request, options: ServerOptions = {}): Promise<Response> {
  if (!isEnabled(options)) return new Response(null, { status: 404 });
  const files = store(options);
  const params = new URL(request.url).searchParams;
  if (request.method === "GET") return json(await files.read(params));
  if (request.method !== "PUT" && request.method !== "POST") return new Response(null, { status: 405 });
  const data = parse(await request.text());
  if (!data) return new Response("Expected a JSON object under 1 MB", { status: 400 });
  await (request.method === "PUT" ? files.write(params, data) : files.send(params, data));
  return new Response(null, { status: 204 });
}

/**
 * Next.js App Router:
 *   // app/api/dsgn-tweaks/route.ts
 *   export const dynamic = "force-dynamic";
 *   export const { GET, PUT, POST } = createDesignRoute();
 */
export function createDesignRoute(options: ServerOptions = {}) {
  const handler = (request: Request) => handleRequest(request, options);
  return { GET: handler, PUT: handler, POST: handler };
}

/** The script-tag build, shipped next to this file in dist/. */
export const clientFile = () => fileURLToPath(new URL("./dsgn-tweaks.global.js", import.meta.url));

/**
 * Connect-style middleware (Vite, Express, the CLI). Answers <base> (the store) and <base>/client.js
 * (the script-tag build); everything else goes to next().
 */
export function createNodeMiddleware(options: ServerOptions & { base?: string } = {}) {
  const base = options.base ?? DEFAULT_BASE;
  return async (req: IncomingMessage, res: ServerResponse, next?: () => void) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname === `${base}/client.js`) {
      try {
        res.writeHead(200, { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" });
        res.end(await readFile(clientFile()));
      } catch {
        res.writeHead(500).end("dsgn-tweaks: build missing, run pnpm build in the package");
      }
      return;
    }
    if (url.pathname !== base) return next ? next() : void res.writeHead(404).end();
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const body = req.method === "GET" || req.method === "HEAD" ? undefined : Buffer.concat(chunks).toString("utf8");
    const response = await handleRequest(new Request(url, { method: req.method, body }), { enabled: true, ...options });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(response.body ? await response.text() : undefined);
  };
}

/** The tags that load the panel on a page served through the middleware (used by the Vite plugin and the CLI). */
export function clientTags(config: Record<string, unknown> = {}, base = DEFAULT_BASE) {
  const serializable = JSON.parse(JSON.stringify({ endpoint: base, ...config }));
  // The page's own window.dsgnTweaks (set before this) wins over these defaults.
  const defaults = JSON.stringify(serializable).replace(/</g, "\\u003c");
  return `<script>window.dsgnTweaks=Object.assign(${defaults},window.dsgnTweaks||{})</script><script src="${base}/client.js"></script>`;
}
