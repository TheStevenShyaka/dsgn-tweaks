"use client";

import { getConfig, isDarkTheme, themeSelectors, writeTheme } from "./config";
import type { Step, StyleEdit, TextEdit, Tweaks } from "./store";

/**
 * Applies saved tweaks to the live DOM without touching React's structure: text edits only
 * rewrite existing text nodes, style edits are inline styles, sections use order/display.
 * Everything is re-applied when React re-renders (see useEngine).
 *
 * Sections are the children of [data-design-root] (falling back to <main>). A section's key is its
 * data-design-section, else its id, else its position; its label is data-design-label, else the
 * key in words, else its first heading.
 */

/** The header and footer outside the sections container get these fixed keys. */
const EDGE_LABELS: Record<string, string> = { header: "Header", footer: "Footer" };

let editing = false;
export const isEditing = () => editing;
export const setEditing = (on: boolean) => {
  editing = on;
};

export const norm = (s: string) => s.replace(/\s+/g, " ").trim();

export function isDesignUi(node: Node | null | undefined) {
  const el = node && (node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement);
  return !!el?.closest("[data-design-ui]");
}

/* ---------- scopes ---------- */

const designRoot = () => document.querySelector<HTMLElement>("[data-design-root]") ?? document.querySelector<HTMLElement>("main");

export function sectionKey(el: Element) {
  const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
  return el.getAttribute("data-design-section") || el.id || `section-${index + 1}`;
}

const words = (key: string) => key.replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());

function sectionLabelOf(el: Element, key: string) {
  const own = el.getAttribute("data-design-label");
  if (own) return own;
  if (el.getAttribute("data-design-section") || el.id) return words(key);
  const heading = el.querySelector("h1, h2, h3")?.textContent?.replace(/\s+/g, " ").trim();
  return heading ? heading.slice(0, 32) : words(key);
}

/** Header and footer sit outside the sections container: the first <header> and last <footer> not inside it. */
function edges(root: HTMLElement | null) {
  const outside = (el: Element) => !root?.contains(el);
  const header = Array.from(document.querySelectorAll<HTMLElement>("header")).find(outside) ?? null;
  const footer = Array.from(document.querySelectorAll<HTMLElement>("footer")).filter(outside).pop() ?? null;
  return { header, footer };
}

/** Page sections in document order, which is also their default order. */
export function listSections(): { key: string; label: string }[] {
  return Array.from(designRoot()?.children ?? [])
    .filter((el) => !el.closest("[data-design-ui]"))
    .map((el) => {
      const key = sectionKey(el);
      return { key, label: sectionLabelOf(el, key) };
    });
}

export function sectionLabel(key: string) {
  return EDGE_LABELS[key] ?? listSections().find((s) => s.key === key)?.label ?? key;
}

function scopes(): { key: string; root: HTMLElement }[] {
  const root = designRoot();
  const { header, footer } = edges(root);
  const out: { key: string; root: HTMLElement }[] = [];
  if (header) out.push({ key: "header", root: header });
  for (const el of Array.from(root?.children ?? [])) out.push({ key: sectionKey(el), root: el as HTMLElement });
  if (footer) out.push({ key: "footer", root: footer });
  return out;
}

export function scopeOf(node: Node) {
  return scopes().find((s) => s.root.contains(node)) ?? null;
}

const rootFor = (key: string) => scopes().find((s) => s.key === key)?.root ?? null;

/** The exploration a scoped edit belongs to, so a style made on one layout never lands on another. */
export function layoutFor(scope: string) {
  const exploration = getConfig().explorations?.find((e) => (e.section ?? e.param) === scope);
  if (!exploration) return undefined;
  const params = new URLSearchParams(window.location.search);
  return `${exploration.param}:${params.get(exploration.param) ?? exploration.options[0]?.id ?? ""}`;
}

/* ---------- text ---------- */

// The original and applied text live on the nodes themselves, so they survive a hot reload of this module.
type Marked = Text & { __designOrig?: string; __designApplied?: string };
const touched = new Set<Marked>();
let scanned = false;

const origOf = (n: Text) => (n as Marked).__designOrig ?? n.data;

function forget(n: Marked) {
  touched.delete(n);
  delete n.__designOrig;
  delete n.__designApplied;
}

/** After a module reload the set is empty: find the nodes a previous instance edited. */
function rescan() {
  scanned = true;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode as Marked;
    if (n.__designOrig !== undefined) touched.add(n);
  }
}

function textNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || p.closest("script, style, [data-design-ui], [data-design-editing]")) return NodeFilter.FILTER_REJECT;
      return origOf(n as Text).trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const out: Text[] = [];
  while (walker.nextNode()) out.push(walker.currentNode as Text);
  return out;
}

export type TextLocation = Omit<TextEdit, "id" | "value">;

export function locateText(node: Text): TextLocation | null {
  const scope = scopeOf(node);
  if (!scope) return null;
  const original = norm(origOf(node));
  let nth = 0;
  for (const n of textNodes(scope.root)) {
    if (n === node) break;
    if (norm(origOf(n)) === original) nth++;
  }
  return { scope: scope.key, original, nth, tag: node.parentElement?.tagName.toLowerCase() ?? "", layout: layoutFor(scope.key) };
}

export const withValue = (raw: string, value: string) => `${raw.match(/^\s*/)?.[0] ?? ""}${value}${raw.match(/\s*$/)?.[0] ?? ""}`;

function setRaw(n: Text, raw: string) {
  if (n.data !== raw) n.data = raw;
}

function applyText(edits: TextEdit[]) {
  if (!scanned) rescan();
  // React rewrote a node we had edited (a toggle label, say): its new text is the new original.
  for (const n of touched) if (!n.isConnected || n.data !== n.__designApplied) forget(n);

  const desired = new Map<Marked, string>();
  const byScope = new Map<string, TextEdit[]>();
  for (const e of edits) byScope.set(e.scope, [...(byScope.get(e.scope) ?? []), e]);
  for (const [scope, list] of byScope) {
    const root = rootFor(scope);
    if (!root) continue;
    const nodes = textNodes(root);
    const layout = layoutFor(scope);
    for (const e of list) {
      const matches = nodes.filter((n) => norm(origOf(n)) === e.original);
      // Same layout: trust the occurrence index. Another layout: only a string that is unique there.
      const target = !e.layout || e.layout === layout ? matches[e.nth] : matches.length === 1 ? matches[0] : undefined;
      if (target) desired.set(target, e.value);
    }
  }

  for (const n of touched) {
    if (desired.has(n)) continue;
    setRaw(n, origOf(n));
    forget(n);
  }
  for (const [n, value] of desired) {
    n.__designOrig ??= n.data;
    const raw = withValue(n.__designOrig, value);
    setRaw(n, raw);
    n.__designApplied = raw;
    touched.add(n);
  }
}

/** The text node under the pointer, only when the pointer is really over its glyphs. */
export function textNodeAt(x: number, y: number): Text | null {
  type CaretDoc = Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };
  const doc = document as CaretDoc;
  const node = doc.caretPositionFromPoint?.(x, y)?.offsetNode ?? doc.caretRangeFromPoint?.(x, y)?.startContainer;
  if (!node || node.nodeType !== Node.TEXT_NODE || !(node as Text).data.trim() || isDesignUi(node)) return null;
  if (!scopeOf(node)) return null;
  const range = document.createRange();
  range.selectNodeContents(node);
  const hit = Array.from(range.getClientRects()).some((r) => x >= r.left - 2 && x <= r.right + 2 && y >= r.top - 2 && y <= r.bottom + 2);
  return hit ? (node as Text) : null;
}

export function textRect(node: Text) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return range.getBoundingClientRect();
}

/**
 * Inline editing for HTML text. React's own text node stays where it is (emptied while editing)
 * and a contenteditable span sits in front of it, so the tree React knows about never changes.
 */
export function editInline(node: Text, done: (value: string | null) => void) {
  const parent = node.parentNode;
  if (!parent) return;
  const raw = node.data;
  const span = document.createElement("span");
  span.setAttribute("data-design-editing", "");
  span.textContent = raw;
  try {
    span.contentEditable = "plaintext-only";
  } catch {
    span.contentEditable = "true";
  }
  Object.assign(span.style, {
    outline: "1.5px solid #0d99ff",
    outlineOffset: "2px",
    borderRadius: "1px",
    userSelect: "text",
    webkitUserSelect: "text",
    cursor: "text",
    caretColor: "#0d99ff",
  });

  editing = true;
  node.data = "";
  parent.insertBefore(span, node);
  span.focus();
  const range = document.createRange();
  range.selectNodeContents(span);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);

  let finished = false;
  const finish = (commit: boolean) => {
    if (finished) return;
    finished = true;
    const value = norm(span.textContent ?? "");
    span.remove();
    node.data = raw;
    editing = false;
    done(commit && value ? value : null);
  };
  span.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      finish(true);
    } else if (e.key === "Escape") {
      e.preventDefault();
      finish(false);
    }
  });
  span.addEventListener("keyup", (e) => e.stopPropagation());
  span.addEventListener("blur", () => finish(true));
}

/* ---------- styles ---------- */

export function pathOf(root: Element, el: Element): Step[] {
  const steps: Step[] = [];
  let cur = el;
  while (cur !== root && cur.parentElement) {
    steps.unshift({ i: Array.from(cur.parentElement.children).indexOf(cur), tag: cur.tagName.toLowerCase() });
    cur = cur.parentElement;
  }
  return steps;
}

function resolvePath(root: Element, path: Step[]) {
  let cur: Element = root;
  for (const s of path) {
    const next = cur.children[s.i];
    if (!next || next.tagName.toLowerCase() !== s.tag) return null;
    cur = next;
  }
  return cur;
}

/** Where a style edit for this element lives. */
export function locateElement(el: Element) {
  const scope = scopeOf(el);
  if (!scope) return null;
  return { scope: scope.key, path: pathOf(scope.root, el), layout: layoutFor(scope.key) };
}

export const samePlace = (a: Pick<StyleEdit, "scope" | "path" | "layout">, b: Pick<StyleEdit, "scope" | "path" | "layout">) =>
  a.scope === b.scope && a.layout === b.layout && JSON.stringify(a.path) === JSON.stringify(b.path);

type Styled = Element & ElementCSSInlineStyle;
const styled = new Map<Styled, Set<string>>();
const prior = new WeakMap<Styled, Record<string, string>>();

function applyStyles(edits: StyleEdit[]) {
  const desired = new Map<Styled, Record<string, string>>();
  for (const e of edits) {
    if (e.layout && e.layout !== layoutFor(e.scope)) continue;
    const root = rootFor(e.scope);
    const el = root && (resolvePath(root, e.path) as Styled | null);
    if (el?.style) desired.set(el, { ...desired.get(el), ...e.props });
  }
  for (const [el, props] of styled) {
    const want = desired.get(el);
    for (const p of props) {
      if (want && p in want) continue;
      const before = prior.get(el)?.[p];
      if (before) el.style.setProperty(p, before);
      else el.style.removeProperty(p);
    }
    if (!want || !el.isConnected) styled.delete(el);
  }
  for (const [el, props] of desired) {
    const before = prior.get(el) ?? {};
    for (const [p, v] of Object.entries(props)) {
      if (!(p in before)) before[p] = el.style.getPropertyValue(p);
      el.style.setProperty(p, v);
    }
    prior.set(el, before);
    styled.set(el, new Set(Object.keys(props)));
  }
}

/* ---------- sections and tokens ---------- */

function applySections({ order, hidden }: Tweaks["sections"]) {
  const root = designRoot();
  if (root) {
    root.style.display = order.length ? "flex" : "";
    root.style.flexDirection = order.length ? "column" : "";
    for (const kid of Array.from(root.children) as HTMLElement[]) {
      if (kid.closest("[data-design-ui]")) continue;
      const key = sectionKey(kid);
      const at = order.indexOf(key);
      kid.style.order = order.length ? String(at < 0 ? 99 : at) : "";
      kid.style.display = hidden.includes(key) ? "none" : "";
    }
  }
  const { header, footer } = edges(root);
  if (header) header.style.display = hidden.includes("header") ? "none" : "";
  if (footer) footer.style.display = hidden.includes("footer") ? "none" : "";
}

const SAFE = /^[#\w\s(),.%-]+$/;

function applyTokens(tokens: Tweaks["tokens"]) {
  const block = (selector: string, values: Record<string, string>) => {
    const decls = Object.entries(values)
      .filter(([, v]) => SAFE.test(v))
      .flatMap(([k, v]) => {
        const aliases = getConfig().tokens?.find((t) => t.key === k)?.aliases ?? [];
        return [k, ...aliases].map((name) => `--color-${name}:${v};`);
      });
    return decls.length ? `${selector}{${decls.join("")}}` : "";
  };
  let el = document.getElementById("dsgn-tweaks-tokens");
  if (!el) {
    el = document.createElement("style");
    el.id = "dsgn-tweaks-tokens";
    document.head.appendChild(el);
  }
  const { light, dark } = themeSelectors();
  el.textContent = block(light, tokens.light) + block(dark, tokens.dark);
}

export function applyAll(t: Tweaks) {
  if (editing) return;
  applyTokens(t.tokens);
  applySections(t.sections);
  applyText(t.text);
  applyStyles(t.styles);
}

/* ---------- small DOM writes the panel needs (kept out of React components) ---------- */

export function writeText(node: Text, raw: string) {
  node.data = raw;
}

export const isDark = isDarkTheme;
export const setTheme = writeTheme;

/** Page-level CSS the panel needs (outline mode, pointer cursors). It lives outside the panel's shadow root. */
export function pageStyle(css: string) {
  let el = document.getElementById("dsgn-tweaks-page");
  if (!el) {
    el = document.createElement("style");
    el.id = "dsgn-tweaks-page";
    document.head.appendChild(el);
  }
  el.textContent = css;
  return () => el.remove();
}
