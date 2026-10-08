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
    "Written by the dev-only Design panel. Nothing here touches the source until Send: Claude then implements the sent batch in code and Figma and removes it from this file.",
  layout: {},
  sections: { order: [], hidden: [] },
  tokens: { light: {}, dark: {} },
  text: [],
  styles: [],
  messages: [],
  updatedAt: "",
};

export type SaveStatus = "loading" | "saved" | "saving" | "error";

const CHANNEL = "dsgn-tweaks";
const POLL_MS = 2000;

/** ?designfile=name keeps a separate working file (used by automated checks). */
function endpoint() {
  const file = new URLSearchParams(window.location.search).get("designfile");
  return `${getConfig().endpoint ?? "/api/design"}${file ? `?file=${encodeURIComponent(file)}` : ""}`;
}

let state: Tweaks = EMPTY;
let status: SaveStatus = "loading";
const listeners = new Set<() => void>();
let channel: BroadcastChannel | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let started = false;
/** updatedAt of the version this window last loaded or saved; anything else on disk came from elsewhere. */
let synced = "";

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getTweaks = () => state;
export const getServerTweaks = () => EMPTY;
export const getStatus = () => status;
export const getServerStatus = (): SaveStatus => "loading";

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
        status = writer ? "error" : "saved";
        emit();
      });
  pull(true);
  // Pick up the file changing on disk: another tab, or Claude clearing it after applying the changes.
  if (!writer) return;
  setInterval(() => document.visibilityState === "visible" && pull(false), POLL_MS);
  document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && pull(false));
}

function save() {
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

/** Hands the whole batch to Claude: the dev server drops a snapshot in .design/outbox/, which Claude watches. */
export async function send() {
  const at = new Date().toISOString();
  const sent = { at, count: changeCount(state), fingerprint: fingerprint(state) };
  const snapshot = { ...state, sent };
  const r = await fetch(`${endpoint()}${endpoint().includes("?") ? "&" : "?"}send=1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(snapshot, null, 2),
  });
  if (!r.ok) throw new Error(`Send failed (${r.status})`);
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
