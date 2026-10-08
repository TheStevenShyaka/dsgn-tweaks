// src/server/index.ts
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
var DEFAULT_BASE = "/api/dsgn-tweaks";
var json = (body) => new Response(body, { headers: { "content-type": "application/json" } });
function store({ dir = ".design" }) {
  const root = path.resolve(process.cwd(), dir);
  const name = (params) => {
    const file = params.get("file");
    return file && /^[a-z0-9-]{1,40}$/.test(file) ? file : null;
  };
  const tweaksFile = (params) => path.join(root, name(params) ? `tweaks.${name(params)}.json` : "tweaks.json");
  const outbox = (params) => path.join(root, name(params) ? `outbox-${name(params)}` : "outbox");
  const replyFile = (params) => path.join(root, name(params) ? `reply.${name(params)}.json` : "reply.json");
  const readJson = async (file) => {
    try {
      return parse(await readFile(file, "utf8"));
    } catch {
      return null;
    }
  };
  return {
    async read(params) {
      const tweaks = await readJson(tweaksFile(params)) ?? {};
      let pending = 0;
      try {
        pending = (await readdir(outbox(params))).filter((f) => f.endsWith(".json")).length;
      } catch {
      }
      return JSON.stringify({ ...tweaks, _inbox: { pending, reply: await readJson(replyFile(params)) } });
    },
    async write(params, data) {
      const { _inbox: _ignored, reply: _old, ...rest } = data;
      await mkdir(root, { recursive: true });
      await writeFile(tweaksFile(params), `${JSON.stringify(rest, null, 2)}
`);
    },
    /** One file per send, so a second send while the agent is still working never overwrites the first. */
    async send(params, data) {
      const box = outbox(params);
      await mkdir(box, { recursive: true });
      await writeFile(path.join(box, `${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.json`), `${JSON.stringify(data, null, 2)}
`);
    }
  };
}
function parse(body) {
  if (body.length > 1e6) return null;
  try {
    const data = JSON.parse(body);
    return data && typeof data === "object" && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}
var isEnabled = (options) => options.enabled ?? process.env.NODE_ENV === "development";
async function handleRequest(request, options = {}) {
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
function createDesignRoute(options = {}) {
  const handler = (request) => handleRequest(request, options);
  return { GET: handler, PUT: handler, POST: handler };
}
var clientFile = () => fileURLToPath(new URL("./dsgn-tweaks.global.js", import.meta.url));
function createNodeMiddleware(options = {}) {
  const base = options.base ?? DEFAULT_BASE;
  return async (req, res, next) => {
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
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = req.method === "GET" || req.method === "HEAD" ? void 0 : Buffer.concat(chunks).toString("utf8");
    const response = await handleRequest(new Request(url, { method: req.method, body }), { enabled: true, ...options });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(response.body ? await response.text() : void 0);
  };
}
function clientTags(config = {}, base = DEFAULT_BASE) {
  const serializable = JSON.parse(JSON.stringify({ endpoint: base, ...config }));
  const defaults = JSON.stringify(serializable).replace(/</g, "\\u003c");
  return `<script>window.dsgnTweaks=Object.assign(${defaults},window.dsgnTweaks||{})</script><script src="${base}/client.js"></script>`;
}

export {
  DEFAULT_BASE,
  handleRequest,
  createDesignRoute,
  clientFile,
  createNodeMiddleware,
  clientTags
};
