#!/usr/bin/env node

// src/cli.ts
import { createReadStream } from "fs";
import { stat } from "fs/promises";
import http from "http";
import net from "net";
import path2 from "path";

// src/server/index.ts
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
var DEFAULT_BASE = "/api/dsgn-tweaks";
var json = (body) => new Response(body, { headers: { "content-type": "application/json" } });
function store({ dir: dir2 = ".design" }) {
  const root = path.resolve(process.cwd(), dir2);
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

// src/cli.ts
var HELP = `dsgn-tweaks: design on a running page.

Usage
  dsgn-tweaks [folder]           Serve a static site (default: current folder) with the panel
  dsgn-tweaks --proxy <url>      Put the panel on any dev server (Django, Rails, PHP, Hugo, Jekyll\u2026)

Options
  --port <n>     Port to listen on (default 4800)
  --dir <path>   Working folder for tweaks and the send outbox (default .design)
  --help         Show this help

Tweaks save to .design/tweaks.json; Send drops batches in .design/outbox/.`;
var args = process.argv.slice(2);
var flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : void 0;
};
if (args.includes("--help") || args.includes("-h")) {
  console.log(HELP);
  process.exit(0);
}
var port = Number(flag("port") ?? 4800);
var dir = flag("dir") ?? ".design";
var proxy = flag("proxy");
var folder = path2.resolve(args[0] ?? ".");
var api = createNodeMiddleware({ enabled: true, dir, base: DEFAULT_BASE });
var TAGS = clientTags();
var inject = (html) => /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${TAGS}</body>`) : html + TAGS;
var TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8"
};
async function serveStatic(req, res) {
  const url = new URL(req.url ?? "/", "http://localhost");
  let file = path2.join(folder, decodeURIComponent(url.pathname));
  if (!file.startsWith(folder)) return void res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = path2.join(file, "index.html");
    await stat(file);
  } catch {
    try {
      await stat(`${file}.html`);
      file = `${file}.html`;
    } catch {
      return void res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    }
  }
  const type = TYPES[path2.extname(file).toLowerCase()] ?? "application/octet-stream";
  res.setHeader("cache-control", "no-store");
  if (!type.startsWith("text/html")) {
    res.writeHead(200, { "content-type": type });
    return void createReadStream(file).pipe(res);
  }
  const { readFile: readFile2 } = await import("fs/promises");
  res.writeHead(200, { "content-type": type }).end(inject(await readFile2(file, "utf8")));
}
function serveProxy(req, res) {
  const target = new URL(proxy);
  const upstream = http.request(
    {
      host: target.hostname,
      port: target.port || 80,
      method: req.method,
      path: req.url,
      // Ask for plain bodies so HTML can be rewritten.
      headers: { ...req.headers, host: target.host, "accept-encoding": "identity" }
    },
    (up) => {
      const isHtml = String(up.headers["content-type"] ?? "").includes("text/html");
      if (!isHtml) {
        res.writeHead(up.statusCode ?? 502, up.headers);
        return void up.pipe(res);
      }
      const chunks = [];
      up.on("data", (c) => chunks.push(c));
      up.on("end", () => {
        const body = inject(Buffer.concat(chunks).toString("utf8"));
        const headers = { ...up.headers, "content-length": String(Buffer.byteLength(body)) };
        delete headers["content-security-policy"];
        res.writeHead(up.statusCode ?? 200, headers).end(body);
      });
    }
  );
  upstream.on("error", () => res.writeHead(502, { "content-type": "text/plain" }).end(`dsgn-tweaks: nothing answering at ${proxy}`));
  req.pipe(upstream);
}
var server = http.createServer((req, res) => {
  api(req, res, () => proxy ? serveProxy(req, res) : serveStatic(req, res).catch(() => res.writeHead(500).end()));
});
server.on("upgrade", (req, socket, head) => {
  if (!proxy) return socket.destroy();
  const target = new URL(proxy);
  const upstream = net.connect(Number(target.port || 80), target.hostname, () => {
    upstream.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r
`);
    for (let i = 0; i < req.rawHeaders.length; i += 2) upstream.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}\r
`);
    upstream.write("\r\n");
    upstream.write(head);
    upstream.pipe(socket).pipe(upstream);
  });
  upstream.on("error", () => socket.destroy());
});
server.listen(port, () => {
  console.log(`dsgn-tweaks ${proxy ? `\u2192 ${proxy}` : `serving ${folder}`}`);
  console.log(`  http://localhost:${port}   (\u2325D opens the panel)`);
});
