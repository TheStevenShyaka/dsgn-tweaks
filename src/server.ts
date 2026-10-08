import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Route handlers for the panel's working files. Only answers in development (404 otherwise).
 *
 *   // app/api/design/route.ts
 *   import { createDesignRoute } from "dsgn-tweaks/server";
 *   export const dynamic = "force-dynamic";
 *   export const { GET, PUT, POST } = createDesignRoute();
 *
 * GET/PUT read and write .design/tweaks.json (the live, visual-only state).
 * POST is Send: it drops a snapshot in .design/outbox/<timestamp>.json for the agent to implement.
 */
export function createDesignRoute({ dir = ".design", enabled = process.env.NODE_ENV === "development" } = {}) {
  const root = path.join(process.cwd(), dir);
  const named = (request: Request) => {
    const name = new URL(request.url).searchParams.get("file");
    return name && /^[a-z0-9-]{1,40}$/.test(name) ? name : null;
  };

  async function readObject(request: Request): Promise<object | Response> {
    const body = await request.text();
    if (body.length > 1_000_000) return new Response("Too large", { status: 413 });
    try {
      const data: unknown = JSON.parse(body);
      if (data && typeof data === "object" && !Array.isArray(data)) return data;
    } catch {}
    return new Response("Expected a JSON object", { status: 400 });
  }

  /** ?file=name keeps a separate working file and outbox, for automated checks. */
  const tweaksFile = (request: Request) => {
    const name = named(request);
    return path.join(root, name ? `tweaks.${name}.json` : "tweaks.json");
  };

  async function GET(request: Request) {
    if (!enabled) return new Response(null, { status: 404 });
    try {
      return new Response(await readFile(tweaksFile(request), "utf8"), { headers: { "content-type": "application/json" } });
    } catch {
      return Response.json({});
    }
  }

  async function PUT(request: Request) {
    if (!enabled) return new Response(null, { status: 404 });
    const data = await readObject(request);
    if (data instanceof Response) return data;
    await mkdir(root, { recursive: true });
    await writeFile(tweaksFile(request), `${JSON.stringify(data, null, 2)}\n`);
    return new Response(null, { status: 204 });
  }

  async function POST(request: Request) {
    if (!enabled) return new Response(null, { status: 404 });
    const data = await readObject(request);
    if (data instanceof Response) return data;
    // One file per send, so a second send while the agent is still working never overwrites the first.
    const name = named(request);
    const box = path.join(root, name ? `outbox-${name}` : "outbox");
    await mkdir(box, { recursive: true });
    await writeFile(path.join(box, `${new Date().toISOString().replace(/[:.]/g, "-")}.json`), `${JSON.stringify(data, null, 2)}\n`);
    return new Response(null, { status: 204 });
  }

  return { GET, PUT, POST };
}
