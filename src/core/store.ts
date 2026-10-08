"use client";

import { getConfig } from "./config";

/**
 * Design panel state. One JSON document, saved by the dev server to .design/tweaks.json
 * so the changes can be read back and written into the real source (and Figma).
 */

export type TextEdit = {
  id: string;
  /** Section key ("pricing", "header", "footer", ...). */
  scope: string;
  /** Text as it shipped, whitespace collapsed. */
  original: string;
  /** Which occurrence of `original` inside the scope (0-based), for repeated strings like "Full name". */
  nth: number;
  value: string;
  tag: string;
  /** Layout the edit was made in, for sections with explorations ("projects:index"). */
  layout?: string;
};

export type Step = { i: number; tag: string };

export type StyleEdit = {
  id: string;
  scope: string;
  /** Child-index path from the scope root to the element. */
  path: Step[];
  tag: string;
  className: string;
  /** Short human label: tag plus a text snippet. */
  label: string;
  layout?: string;
  /** Viewport width when the edit was made, so it can land on the right breakpoint. */
  viewport: number;
  props: Record<string, string>;
};

export type Message = { id: string; text: string; at: string };

export type Tweaks = {
  readme: string;
  /** Exploration picked per search param, e.g. { projects: "index" }. */
  layout: Record<string, string>;
  sections: { order: string[]; hidden: string[] };
  tokens: { light: Record<string, string>; dark: Record<string, string> };
  text: TextEdit[];
  styles: StyleEdit[];
  /** Queued notes for Claude: anything the panel can't express. */
  messages: Message[];
  /** Set when the batch is sent to Claude; `reply` is Claude's answer once it is implemented. */
  sent?: { at: string; count: number; fingerprint?: string };
  reply?: { at: string; text: string };
  updatedAt: string;
};

export const EMPTY: Tweaks = {
  readme:
    "Written by dsgn-tweaks. Nothing here touches the source until Send: the agent then implements the sent batch and removes it from this file. See AGENTS.md in the dsgn-tweaks repo.",
  layout: {},
  sections: { order: [], hidden: [] },
  tokens: { light: {}, dark: {} },
  text: [],
  styles: [],
  messages: [],
  updatedAt: "",
};

/** "local" means no dev server answered: tweaks live in this browser and Send downloads the batch. */
export type SaveStatus = "loading" | "saved" | "saving" | "error" | "local";

const CHANNEL = "dsgn-tweaks";
const LOCAL_KEY = "dsgn-tweaks:state";
const POLL_MS = 2000;
export const DEFAULT_ENDPOINT = "/api/dsgn-tweaks";

/** ?designfile=name keeps a separate working file (used by automated checks). */
function endpoint(extra = "") {
  const file = new URLSearchParams(window.location.search).get("designfile");
  const query = [file ? `file=${encodeURIComponent(file)}` : "", extra].filter(Boolean).join("&");
  return `${getConfig().endpoint ?? DEFAULT_ENDPOINT}${query ? `?${query}` : ""}`;
}

let state: Tweaks = EMPTY;
let status: SaveStatus = "loading";
let local = false;
const listeners = new Set<() => void>();
let channel: BroadcastChannel | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let poll: ReturnType<typeof setInterval> | undefined;
let started = false;
/** updatedAt of the version this window last loaded or saved; anything else on disk came from elsewhere. */
let synced = "";

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const getTweaks = () => state;
export const getStatus = () => status;
export const isLocal = () => local;

function normalise(raw: unknown): Tweaks {
  const t = (raw && typeof raw === "object" ? raw : {}) as Partial<Tweaks> & { notes?: string };
  // Older files kept one free-text notes field: it becomes the first queued message.
  const legacy = typeof t.notes === "string" && t.notes.trim() ? [{ id: "notes", text: t.notes.trim(), at: t.updatedAt ?? "" }] : [];
  delete t.notes;
  return {
    ...EMPTY,
    ...t,
    readme: EMPTY.readme,
    layout: { ...EMPTY.layout, ...t.layout },
    sections: { ...EMPTY.sections, ...t.sections },
    tokens: { light: { ...t.tokens?.light }, dark: { ...t.tokens?.dark } },
    text: Array.isArray(t.text) ? t.text : [],
    styles: Array.isArray(t.styles) ? t.styles : [],
    messages: Array.isArray(t.messages) ? t.messages : legacy,
  };
}

function readLocal() {
  try {
    return normalise(JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "{}"));
  } catch {
    return normalise({});
  }
}

function writeLocal() {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: changes still apply for this visit.
  }
}

/** Without a dev server (a plain HTML page, say), everything lives in this browser. */
function goLocal() {
  local = true;
  state = readLocal();
  status = "local";
  emit();
}

/** Loads the saved tweaks once. `writer` is false inside the preview iframe, which only listens. */
export function start(writer: boolean) {
  if (started) return;
  started = true;
  if (typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CHANNEL);
    channel.onmessage = (e) => {
      state = normalise(e.data);
      emit();
    };
  }
  if (getConfig().storage === "browser") return goLocal();

  const pull = (first: boolean) =>
    fetch(endpoint(), { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        // Never clobber an edit that is still waiting to be written.
        // Only adopt a strictly newer version, so a slow poll can't roll back a save that just landed.
        if (!first && (status === "saving" || !(String(data?.updatedAt ?? "") > synced))) return;
        state = normalise(data);
        synced = state.updatedAt;
        status = "saved";
        emit();
      })
      .catch(() => {
        if (!first) return;
        if (getConfig().storage === "server") {
          status = writer ? "error" : "saved";
          emit();
        } else goLocal();
      });
  pull(true).then(() => {
    // Pick up the file changing on disk: another tab, or the agent clearing it after implementing a batch.
    if (!writer || local) return;
    poll = setInterval(() => document.visibilityState === "visible" && pull(false), POLL_MS);
    document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && pull(false));
  });
}

export function stop() {
  clearInterval(poll);
  clearTimeout(timer);
  channel?.close();
  channel = null;
  started = false;
}

function save() {
  if (local) return writeLocal();
  status = "saving";
  emit();
  clearTimeout(timer);
  timer = setTimeout(() => {
    const body = state;
    fetch(endpoint(), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body, null, 2),
    })
      .then((r) => {
        if (r.ok) synced = body.updatedAt;
        status = r.ok ? "saved" : "error";
        emit();
      })
      .catch(() => {
        status = "error";
        emit();
      });
  }, 350);
}

export function update(fn: (t: Tweaks) => Tweaks) {
  state = { ...fn(state), updatedAt: new Date().toISOString() };
  emit();
  channel?.postMessage(state);
  save();
}

/** Without a server, Send downloads the batch (and copies it) so it can be handed to an agent by hand. */
function download(snapshot: Tweaks) {
  const json = JSON.stringify(snapshot, null, 2);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  a.download = `dsgn-tweaks-${snapshot.sent?.at.replace(/[:.]/g, "-")}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  navigator.clipboard?.writeText(json).catch(() => {});
}

/** Hands the whole batch to the agent: the dev server drops a snapshot in .design/outbox/, which the agent watches. */
export async function send() {
  const at = new Date().toISOString();
  const sent = { at, count: changeCount(state), fingerprint: fingerprint(state) };
  const snapshot = { ...state, sent };
  if (local) download(snapshot);
  else {
    const r = await fetch(endpoint("send=1"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(snapshot, null, 2),
    });
    if (!r.ok) throw new Error(`Send failed (${r.status})`);
  }
  update((t) => ({ ...t, sent }));
}

/** Identifies the batch content, so the panel knows whether anything changed since the last send. */
export const fingerprint = (t: Tweaks) =>
  JSON.stringify([t.text, t.styles, t.tokens, t.sections, t.messages.map((m) => m.text)]);

/** True when the current changes are exactly what was last sent. */
export const alreadySent = (t: Tweaks) => !!t.sent?.fingerprint && t.sent.fingerprint === fingerprint(t);

/** Sent and not yet answered. */
export const isPending = (t: Tweaks) => !!t.sent && (!t.reply || t.reply.at < t.sent.at);

export function changeCount(t: Tweaks) {
  return (
    t.messages.length +
    t.text.length +
    t.styles.reduce((n, s) => n + Object.keys(s.props).length, 0) +
    Object.keys(t.tokens.light).length +
    Object.keys(t.tokens.dark).length +
    t.sections.hidden.length +
    (t.sections.order.length ? 1 : 0)
  );
}
