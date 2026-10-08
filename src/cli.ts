import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { DEFAULT_BASE, clientTags, createNodeMiddleware } from "./server/index";

const HELP = `dsgn-tweaks: design on a running page.

Usage
  dsgn-tweaks [folder]           Serve a static site (default: current folder) with the panel
  dsgn-tweaks --proxy <url>      Put the panel on any dev server (Django, Rails, PHP, Hugo, Jekyll…)

Options
  --port <n>     Port to listen on (default 4800)
  --dir <path>   Working folder for tweaks and the send outbox (default .design)
  --help         Show this help

Tweaks save to .design/tweaks.json; Send drops batches in .design/outbox/.`;

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};
if (args.includes("--help") || args.includes("-h")) {
  console.log(HELP);
  process.exit(0);
}
const port = Number(flag("port") ?? 4800);
const dir = flag("dir") ?? ".design";
const proxy = flag("proxy");
const folder = path.resolve(args[0] ?? ".");

const api = createNodeMiddleware({ enabled: true, dir, base: DEFAULT_BASE });
const TAGS = clientTags();
const inject = (html: string) => (/<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${TAGS}</body>`) : html + TAGS);

const TYPES: Record<string, string> = {
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
  ".txt": "text/plain; charset=utf-8",
};

async function serveStatic(req: http.IncomingMessage, res: http.ServerResponse) {
  const url = new URL(req.url ?? "/", "http://localhost");
  let file = path.join(folder, decodeURIComponent(url.pathname));
  if (!file.startsWith(folder)) return void res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    await stat(file);
  } catch {
    // Pretty URLs: /about → /about.html
    try {
      await stat(`${file}.html`);
      file = `${file}.html`;
    } catch {
      return void res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    }
  }
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  res.setHeader("cache-control", "no-store");
  if (!type.startsWith("text/html")) {
    res.writeHead(200, { "content-type": type });
    return void createReadStream(file).pipe(res);
  }
  const { readFile } = await import("node:fs/promises");
  res.writeHead(200, { "content-type": type }).end(inject(await readFile(file, "utf8")));
}

function serveProxy(req: http.IncomingMessage, res: http.ServerResponse) {
  const target = new URL(proxy as string);
  const upstream = http.request(
    {
      host: target.hostname,
      port: target.port || 80,
      method: req.method,
      path: req.url,
      // Ask for plain bodies so HTML can be rewritten.
      headers: { ...req.headers, host: target.host, "accept-encoding": "identity" },
    },
    (up) => {
      const isHtml = String(up.headers["content-type"] ?? "").includes("text/html");
      if (!isHtml) {
        res.writeHead(up.statusCode ?? 502, up.headers);
        return void up.pipe(res);
      }
      const chunks: Buffer[] = [];
      up.on("data", (c: Buffer) => chunks.push(c));
      up.on("end", () => {
        const body = inject(Buffer.concat(chunks).toString("utf8"));
        const headers: http.OutgoingHttpHeaders = { ...up.headers, "content-length": String(Buffer.byteLength(body)) };
        // A strict CSP on the proxied page would block the injected panel script.
        delete headers["content-security-policy"];
        res.writeHead(up.statusCode ?? 200, headers).end(body);
      });
    },
  );
  upstream.on("error", () => res.writeHead(502, { "content-type": "text/plain" }).end(`dsgn-tweaks: nothing answering at ${proxy}`));
  req.pipe(upstream);
}

const server = http.createServer((req, res) => {
  api(req, res, () => (proxy ? serveProxy(req, res) : serveStatic(req, res).catch(() => res.writeHead(500).end())));
});

// Keep the proxied dev server's live reload (websockets) working.
server.on("upgrade", (req, socket, head) => {
  if (!proxy) return socket.destroy();
  const target = new URL(proxy);
  const upstream = net.connect(Number(target.port || 80), target.hostname, () => {
    upstream.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for (let i = 0; i < req.rawHeaders.length; i += 2) upstream.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}\r\n`);
    upstream.write("\r\n");
    upstream.write(head);
    upstream.pipe(socket).pipe(upstream);
  });
  upstream.on("error", () => socket.destroy());
});

server.listen(port, () => {
  console.log(`dsgn-tweaks ${proxy ? `→ ${proxy}` : `serving ${folder}`}`);
  console.log(`  http://localhost:${port}   (⌥D opens the panel)`);
});
