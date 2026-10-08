"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  CornerLeftUp,
  Eye,
  EyeOff,
  Grid3x3,
  Moon,
  MousePointer2,
  PanelLeft,
  PanelRight,
  PenTool,
  RotateCcw,
  SquareDashed,
  Sun,
  Type,
  X,
  Check,
  LoaderCircle,
  Send,
} from "lucide-react";
import { getConfig, setConfig, themeAttribute, type DesignTweaksConfig, type Exploration } from "./config";
import * as store from "./store";
import type { StyleEdit, TextEdit, Tweaks } from "./store";
import {
  applyAll,
  editInline,
  isDesignUi,
  isEditing,
  locateElement,
  locateText,
  norm,
  samePlace,
  scopeOf,
  setEditing,
  textNodeAt,
  textRect,
  withValue,
  writeText,
  setTheme as applyTheme,
  isDark,
  listSections,
  sectionLabel,
  type TextLocation,
} from "./engine";

/**
 * Design Tweaks (⌥D): a dev-only panel for trying design changes on a running Next.js page.
 * Layout explorations, inline text editing, an element inspector, colour tokens, grid/outline
 * overlays and viewport previews. Changes stay visual, saved to .design/tweaks.json, until Send
 * drops the batch in .design/outbox/ for an agent to implement in the source.
 */

type Mode = "text" | "inspect" | null;
type Tab = "layout" | "element" | "theme" | "changes";

const VIEWPORTS = [0, 390, 768, 1024, 1280, 1440];
const OPEN_KEY = "design-tweaks-open";
const BLUE = "#0d99ff";

const uid = () => Math.random().toString(36).slice(2, 10);
const subscribeNone = () => () => {};
const subscribeResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const subscribeTheme = (cb: () => void) => {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true, attributeFilter: [themeAttribute()] });
  return () => o.disconnect();
};

/** Class joiner (the panel never relies on conflicting utilities overriding each other). */
const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

const agent = () => getConfig().agentName ?? "Claude";

function breakpoint(w: number) {
  return w >= 1536 ? "2xl" : w >= 1280 ? "xl" : w >= 1024 ? "lg" : w >= 768 ? "md" : w >= 640 ? "sm" : "base";
}

function describe(el: Element) {
  const text = norm(el.textContent ?? "").slice(0, 36);
  return `${el.tagName.toLowerCase()}${text ? ` · “${text}${text.length === 36 ? "…" : ""}”` : ""}`;
}

/* ============================================================ entry */

export function DesignTweaks({ config = {} }: { config?: DesignTweaksConfig }) {
  const params = useSearchParams();
  const framed = params.get("design") === "frame";
  const tweaks = useSyncExternalStore(store.subscribe, store.getTweaks, store.getServerTweaks);
  const client = useSyncExternalStore(subscribeNone, () => true, () => false);
  useEffect(() => {
    setConfig(config);
  }, [config]);
  useEngine(tweaks, framed);
  if (framed || !client) return null;
  return createPortal(<DesignPanel tweaks={tweaks} />, document.body);
}

function useEngine(tweaks: Tweaks, framed: boolean) {
  const latest = useRef(tweaks);
  useEffect(() => {
    store.start(!framed);
  }, [framed]);
  useEffect(() => {
    latest.current = tweaks;
    applyAll(tweaks);
  }, [tweaks]);
  useEffect(() => {
    let frame = 0;
    // React re-renders (a layout switch, a toggle) replace DOM: put the tweaks back on top.
    const observer = new MutationObserver((records) => {
      if (isEditing() || records.every((r) => isDesignUi(r.target))) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyAll(latest.current));
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    // The preview iframe follows the theme picked in the main window.
    const onStorage = (e: StorageEvent) => {
      if (framed && e.key && e.key === getConfig().theme?.storageKey) applyTheme(e.newValue === "dark" ? "dark" : "light");
    };
    window.addEventListener("storage", onStorage);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
    };
  }, [framed]);
}

/* ============================================================ panel */

type SvgEdit = { node: Text; loc: TextLocation; raw: string; left: number; top: number };

function DesignPanel({ tweaks }: { tweaks: Tweaks }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const status = useSyncExternalStore(store.subscribe, store.getStatus, store.getServerStatus);
  const width = useSyncExternalStore(subscribeResize, () => window.innerWidth, () => 0);

  const [open, setOpenState] = useState(() => {
    try {
      return localStorage.getItem(OPEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tab, setTab] = useState<Tab>("layout");
  const [mode, setMode] = useState<Mode>(null);
  const [grid, setGrid] = useState(false);
  const [outline, setOutline] = useState(false);
  const [viewport, setViewport] = useState(0);
  const [side, setSide] = useState<"right" | "left">("right");
  const [selected, setSelectedState] = useState<{ el: Element; n: number } | null>(null);
  const [svgEdit, setSvgEdit] = useState<SvgEdit | null>(null);
  const hoverBox = useRef<HTMLDivElement>(null);
  const selBox = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next);
    if (!next) setMode(null);
    try {
      localStorage.setItem(OPEN_KEY, next ? "1" : "0");
    } catch {
      // Storage blocked: the panel just starts closed next time.
    }
  }, []);

  const select = useCallback((el: Element | null) => {
    setSelectedState((s) => (el ? { el, n: (s?.n ?? 0) + 1 } : null));
    if (el) setTab("element");
  }, []);

  /* ---- layout explorations (URL is what the server renders) ---- */

  const pickLayout = useCallback(
    (key: string, id: string, fallback: string) => {
      const next = new URLSearchParams(params.toString());
      if (id === fallback) next.delete(key);
      else next.set(key, id);
      const query = next.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}#${key}`, { scroll: false });
      document.getElementById(key)?.scrollIntoView({ block: "start" });
      store.update((t) => ({ ...t, layout: { ...t.layout, [key]: id } }));
    },
    [params, pathname, router],
  );

  // On load, an explicit search param wins; otherwise come back to the layout last picked here.
  const restored = useRef(false);
  useEffect(() => {
    if (status !== "saved" || restored.current) return;
    restored.current = true;
    const t = store.getTweaks();
    const next = new URLSearchParams(params.toString());
    let changed = false;
    for (const { param: key, options } of getConfig().explorations ?? []) {
      const fallback = options[0]?.id;
      if (!fallback) continue;
      const fromUrl = params.get(key);
      if (fromUrl && fromUrl !== t.layout[key]) store.update((s) => ({ ...s, layout: { ...s.layout, [key]: fromUrl } }));
      if (!fromUrl && t.layout[key] && t.layout[key] !== fallback) {
        next.set(key, t.layout[key]);
        changed = true;
      }
    }
    if (changed) router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [status, params, pathname, router]);

  /* ---- text editing ---- */

  const commitText = useCallback((loc: TextLocation, value: string | null) => {
    if (value === null) return;
    store.update((t) => {
      const same = (e: TextEdit) => e.scope === loc.scope && e.original === loc.original && e.nth === loc.nth && e.layout === loc.layout;
      const rest = t.text.filter((e) => !same(e));
      return { ...t, text: value === loc.original ? rest : [...rest, { id: uid(), ...loc, value }] };
    });
  }, []);

  const startTextEdit = useCallback(
    (node: Text) => {
      const loc = locateText(node);
      if (!loc) return;
      if (node.parentElement instanceof SVGElement) {
        const r = textRect(node);
        setEditing(true);
        setSvgEdit({ node, loc, raw: node.data, left: r.left, top: r.bottom + 6 });
        return;
      }
      editInline(node, (value) => commitText(loc, value));
    },
    [commitText],
  );

  const finishSvgEdit = (value: string | null) => {
    if (!svgEdit) return;
    writeText(svgEdit.node, svgEdit.raw);
    setEditing(false);
    setSvgEdit(null);
    commitText(svgEdit.loc, value ? norm(value) : null);
  };

  /* ---- pointer modes ---- */

  useEffect(() => {
    if (!mode) return;
    const root = document.documentElement;
    root.dataset.designMode = mode;
    const show = (r: DOMRect | null, label = "") => {
      const box = hoverBox.current;
      if (!box) return;
      box.style.display = r ? "block" : "none";
      if (!r) return;
      Object.assign(box.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      box.dataset.label = label;
    };
    const elementAt = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      return el && !isDesignUi(el) && scopeOf(el) ? el : null;
    };
    const onMove = (e: PointerEvent) => {
      if (isEditing()) return show(null);
      if (mode === "text") {
        const n = textNodeAt(e.clientX, e.clientY);
        show(n ? textRect(n) : null, "Click to edit");
      } else {
        const el = elementAt(e.clientX, e.clientY);
        show(el?.getBoundingClientRect() ?? null, el ? describe(el) : "");
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isDesignUi(target)) return;
      e.preventDefault();
      e.stopPropagation();
      if (isEditing() || target.closest?.("[data-design-editing]")) return;
      if (mode === "text") {
        const n = textNodeAt(e.clientX, e.clientY);
        if (n) {
          show(null);
          startTextEdit(n);
        }
      } else {
        const el = elementAt(e.clientX, e.clientY);
        if (el) select(el);
      }
    };
    const onScroll = () => show(null);
    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll, true);
      delete root.dataset.designMode;
      show(null);
    };
  }, [mode, select, startTextEdit]);

  // Keep the selection outline on the element while the page scrolls or re-renders.
  useEffect(() => {
    if (!selected) return;
    let frame = 0;
    const tick = () => {
      const box = selBox.current;
      if (!selected.el.isConnected) return select(null);
      if (box) {
        const r = selected.el.getBoundingClientRect();
        Object.assign(box.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [selected, select]);

  useEffect(() => {
    const root = document.documentElement;
    if (outline) root.dataset.designOutline = "";
    else delete root.dataset.designOutline;
  }, [outline]);

  /* ---- keyboard ---- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (isEditing() || target.closest?.("input, textarea, select, [contenteditable]")) return;
      if (e.altKey && e.code === "KeyD") {
        e.preventDefault();
        setOpen(!open);
        return;
      }
      if (!open || e.metaKey || e.ctrlKey || e.altKey) return;
      const toggles: Record<string, () => void> = {
        KeyT: () => setMode((m) => (m === "text" ? null : "text")),
        KeyI: () => setMode((m) => (m === "inspect" ? null : "inspect")),
        KeyG: () => setGrid((g) => !g),
        KeyO: () => setOutline((o) => !o),
        Escape: () => {
          if (viewport) setViewport(0);
          else if (mode) setMode(null);
          else select(null);
        },
      };
      const run = toggles[e.code] ?? (e.key === "Escape" ? toggles.Escape : undefined);
      if (run) {
        e.preventDefault();
        run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mode, viewport, setOpen, select]);

  const count = store.changeCount(tweaks);
  const previewQuery = new URLSearchParams(params.toString());
  previewQuery.set("design", "frame");
  const scale = viewport ? Math.min(1, (width - 48) / viewport) : 1;

  return (
    <div data-design-ui className="font-sans text-[12px] text-[#e6e6e6] antialiased">
      <style>{`
        html[data-design-outline] :is(header, main, footer) *{outline:1px solid ${BLUE}55!important;outline-offset:-1px}
        html[data-design-mode="text"] :is(header, main, footer) *{cursor:text!important}
        html[data-design-mode="inspect"] :is(header, main, footer) *{cursor:crosshair!important}
      `}</style>

      {/* hover + selection boxes */}
      <div
        ref={hoverBox}
        className="pointer-events-none fixed z-[2147483640] hidden rounded-[2px] border border-dashed border-[#0d99ff] bg-[#0d99ff]/[0.06] after:absolute after:-top-5 after:left-0 after:whitespace-nowrap after:rounded-[2px] after:bg-[#0d99ff] after:px-1.5 after:py-0.5 after:font-mono after:text-[10px] after:leading-none after:text-white after:content-[attr(data-label)]"
      />
      {selected && (
        <div ref={selBox} className="pointer-events-none fixed z-[2147483641] rounded-[2px] border-[1.5px] border-[#0d99ff]" />
      )}

      <datalist id="design-token-colors">
        {tokenSuggestions().map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>

      {grid && <GridOverlay />}

      {viewport > 0 && (
        <div className="fixed inset-0 z-[2147483630] flex flex-col items-center overflow-hidden bg-[#0b0b0b]/85 pt-6 backdrop-blur-sm">
          <p className="mb-3 font-mono text-[11px] text-white/60">
            {viewport}px{scale < 1 ? ` · shown at ${Math.round(scale * 100)}%` : ""} · edits sync live · Esc to close
          </p>
          <div style={{ width: viewport * scale, height: `calc(100vh - 64px)` }}>
            <iframe
              title={`Preview at ${viewport}px`}
              src={`${pathname}?${previewQuery.toString()}`}
              style={{ width: viewport, height: `calc((100vh - 64px) / ${scale})`, transform: `scale(${scale})`, transformOrigin: "0 0" }}
              className="rounded-[6px] bg-white shadow-[0_24px_80px_#000a]"
            />
          </div>
        </div>
      )}

      {svgEdit && (
        <input
          autoFocus
          defaultValue={norm(svgEdit.raw)}
          onChange={(e) => {
            writeText(svgEdit.node, withValue(svgEdit.raw, e.currentTarget.value));
          }}
          onBlur={(e) => finishSvgEdit(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") finishSvgEdit(null);
          }}
          style={{ left: svgEdit.left, top: svgEdit.top }}
          className="fixed z-[2147483645] h-8 w-64 rounded-[4px] border border-[#0d99ff] bg-[#1e1e1e] px-2 text-[13px] text-white shadow-lg outline-none"
        />
      )}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          title="Design panel (⌥D)"
          className={cn(
            "fixed bottom-4 z-[2147483646] flex h-9 items-center gap-2 rounded-full bg-[#1e1e1e] pl-3 pr-3.5 font-medium shadow-[0_8px_24px_#0005] ring-1 ring-white/10 hover:bg-[#2a2a2a]",
            side === "right" ? "right-4" : "left-4",
          )}
        >
          <PenTool className="size-3.5" style={{ color: BLUE }} aria-hidden />
          Design
          {count > 0 && <span className="rounded-full bg-[#0d99ff] px-1.5 text-[10px] font-semibold text-white">{count}</span>}
        </button>
      ) : (
        <aside
          aria-label="Design panel"
          className={cn(
            "fixed bottom-3 top-3 z-[2147483646] flex w-[320px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[8px] bg-[#1e1e1e] shadow-[0_16px_48px_#0007] ring-1 ring-white/10",
            side === "right" ? "right-3" : "left-3",
          )}
        >
          <header className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
            <PenTool className="size-3.5" style={{ color: BLUE }} aria-hidden />
            <span className="font-semibold">Design</span>
            <span className="font-mono text-[10px] text-white/40">
              {width}px · {breakpoint(width)}
            </span>
            <span className="ml-auto" />
            <IconButton label={side === "right" ? "Dock left" : "Dock right"} onClick={() => setSide(side === "right" ? "left" : "right")}>
              {side === "right" ? <PanelLeft /> : <PanelRight />}
            </IconButton>
            <IconButton label="Close (⌥D)" onClick={() => setOpen(false)}>
              <X />
            </IconButton>
          </header>

          <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
            <Toggle on={mode === "text"} label="Edit text (T)" onClick={() => setMode(mode === "text" ? null : "text")}>
              <Type />
            </Toggle>
            <Toggle on={mode === "inspect"} label="Inspect (I)" onClick={() => setMode(mode === "inspect" ? null : "inspect")}>
              <MousePointer2 />
            </Toggle>
            <span className="mx-1 h-4 w-px bg-white/10" />
            <Toggle on={grid} label="Column grid (G)" onClick={() => setGrid(!grid)}>
              <Grid3x3 />
            </Toggle>
            <Toggle on={outline} label="Outline boxes (O)" onClick={() => setOutline(!outline)}>
              <SquareDashed />
            </Toggle>
            <select
              aria-label="Preview width"
              value={viewport}
              onChange={(e) => setViewport(Number(e.currentTarget.value))}
              className="ml-auto h-7 rounded-[4px] bg-white/5 px-1.5 text-[11px] text-white/80 outline-none hover:bg-white/10"
            >
              {VIEWPORTS.map((v) => (
                <option key={v} value={v}>
                  {v ? `Preview ${v}` : "This window"}
                </option>
              ))}
            </select>
          </div>

          {mode && (
            <p className="border-b border-white/10 bg-[#0d99ff]/10 px-3 py-2 text-[11px] text-[#9fd3ff]">
              {mode === "text"
                ? "Click any text on the page to edit it. Enter saves, Esc cancels."
                : "Click anything on the page to inspect it. Esc stops."}
            </p>
          )}

          <nav className="grid grid-cols-4 border-b border-white/10 text-[11px]">
            {(["layout", "element", "theme", "changes"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn("h-8 capitalize transition-colors", tab === t ? "text-white shadow-[inset_0_-2px_0_#0d99ff]" : "text-white/50 hover:text-white/80")}
              >
                {t}
                {t === "changes" && count > 0 && <span className="ml-1 text-[#0d99ff]">{count}</span>}
              </button>
            ))}
          </nav>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {tab === "layout" && <LayoutTab tweaks={tweaks} params={params} onPick={pickLayout} />}
            {tab === "element" &&
              (selected ? (
                <ElementTab key={selected.n} el={selected.el} tweaks={tweaks} width={width} onSelect={select} />
              ) : (
                <Empty>
                  Turn on <b className="text-white">Inspect</b> (I) and click anything on the page to change its type, spacing,
                  size or colour.
                </Empty>
              ))}
            {tab === "theme" && <ThemeTab tweaks={tweaks} />}
            {tab === "changes" && <ChangesTab tweaks={tweaks} />}
          </div>

          <SendBar tweaks={tweaks} status={status} />
        </aside>
      )}
    </div>
  );
}

/* ============================================================ tabs */

function LayoutTab({
  tweaks,
  params,
  onPick,
}: {
  tweaks: Tweaks;
  params: URLSearchParams;
  onPick: (key: string, id: string, fallback: string) => void;
}) {
  const rows: Exploration[] = [...(getConfig().explorations ?? [])];
  const SECTIONS = listSections().map((s) => s.key);
  const { order, hidden } = tweaks.sections;
  const current = order.length ? [...order.filter((k) => SECTIONS.includes(k as never)), ...SECTIONS.filter((k) => !order.includes(k))] : [...SECTIONS];

  const setSections = (next: Partial<Tweaks["sections"]>) =>
    store.update((t) => {
      const merged = { ...t.sections, ...next };
      if (merged.order.join() === SECTIONS.join()) merged.order = [];
      return { ...t, sections: merged };
    });
  const move = (i: number, by: number) => {
    const next = [...current];
    [next[i], next[i + by]] = [next[i + by], next[i]];
    setSections({ order: next });
  };
  const toggle = (key: string) => setSections({ hidden: hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key] });

  return (
    <>
      {rows.map((row) => {
        const active = params.get(row.param) ?? row.options[0]?.id;
        return (
          <Group key={row.param} title={`${row.label} layout`}>
            <div className="grid gap-0.5">
              {row.options.map((o, i) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => onPick(row.param, o.id, row.options[0].id)}
                  className={cn(
                    "flex h-7 items-center gap-2 rounded-[4px] px-2 text-left transition-colors",
                    active === o.id ? "bg-[#0d99ff]/15 text-white" : "text-white/70 hover:bg-white/5",
                  )}
                >
                  <span className={cn("font-mono text-[10px]", active === o.id ? "text-[#0d99ff]" : "text-white/35")}>{i + 1}</span>
                  {o.label}
                  {i === 0 && <span className="ml-auto text-[10px] text-white/35">on site</span>}
                </button>
              ))}
            </div>
          </Group>
        );
      })}

      <Group
        title="Sections"
        action={
          (order.length > 0 || hidden.length > 0) && (
            <IconButton label="Reset order and visibility" onClick={() => setSections({ order: [], hidden: [] })}>
              <RotateCcw />
            </IconButton>
          )
        }
      >
        <ul className="grid gap-0.5">
          {["header", ...current, "footer"].map((key) => {
            const i = current.indexOf(key);
            const fixed = i < 0;
            const off = hidden.includes(key);
            return (
              <li key={key} className="group flex h-7 items-center gap-1 rounded-[4px] px-2 hover:bg-white/5">
                <span className={cn("flex-1", off ? "text-white/30 line-through" : "text-white/80")}>{sectionLabel(key)}</span>
                {!fixed && (
                  <>
                    <IconButton label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                      <ChevronUp />
                    </IconButton>
                    <IconButton label="Move down" disabled={i === current.length - 1} onClick={() => move(i, 1)}>
                      <ChevronDown />
                    </IconButton>
                  </>
                )}
                <IconButton label={off ? "Show" : "Hide"} onClick={() => toggle(key)}>
                  {off ? <EyeOff /> : <Eye />}
                </IconButton>
              </li>
            );
          })}
        </ul>
      </Group>

      <Group title="Shortcuts">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-white/60">
          {[
            ["⌥D", "Open or close this panel"],
            ["T", "Edit text"],
            ["I", "Inspect an element"],
            ["G / O", "Column grid / outlines"],
            ["Esc", "Leave a mode or preview"],
            ["↑ ↓", "Nudge a value (⇧ for ×10)"],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-mono text-white/80">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Group>
    </>
  );
}

/** Fonts offered in the inspector: the host's Tailwind font variables, plus any from config. */
const fontOptions = () => [
  { value: "var(--font-sans)", label: "Sans" },
  { value: "var(--font-mono)", label: "Mono" },
  ...(getConfig().fonts ?? []),
];
const WEIGHTS = ["300", "400", "500", "600", "700", "800"].map((w) => ({ value: w, label: w }));
const opts = (...v: string[]) => v.map((x) => ({ value: x, label: x }));

function ElementTab({ el, tweaks, width, onSelect }: { el: Element; tweaks: Tweaks; width: number; onSelect: (el: Element | null) => void }) {
  const place = locateElement(el);
  if (!place) return <Empty>This element is outside the landing page sections.</Empty>;
  const edit = tweaks.styles.find((s) => samePlace(s, place));
  const computed = getComputedStyle(el);
  const className = el.getAttribute("class") ?? "";

  const set = (prop: string, raw: string) => {
    const v = raw.trim();
    store.update((t) => {
      const existing = t.styles.find((s) => samePlace(s, place));
      const props = { ...existing?.props };
      if (v) props[prop] = v;
      else delete props[prop];
      const rest = t.styles.filter((s) => !samePlace(s, place));
      if (!Object.keys(props).length) return { ...t, styles: rest };
      const next: StyleEdit = {
        id: existing?.id ?? uid(),
        ...place,
        tag: el.tagName.toLowerCase(),
        className,
        label: describe(el),
        viewport: width,
        props,
      };
      return { ...t, styles: [...rest, next] };
    });
  };
  const field = (prop: string) => ({ prop, value: edit?.props[prop], computed: computed.getPropertyValue(prop), onSet: set });
  const parent = el.parentElement && scopeOf(el.parentElement) ? el.parentElement : null;

  return (
    <>
      <div className="border-b border-white/10 px-3 py-3">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-white">{describe(el)}</p>
            <p className="mt-0.5 text-[11px] text-white/45">
              {sectionLabel(place.scope)}
              {place.layout ? ` · ${place.layout.split(":")[1]} layout` : ""} · edits made at {width}px ({breakpoint(width)})
            </p>
          </div>
          <IconButton label="Select parent" disabled={!parent} onClick={() => parent && onSelect(parent)}>
            <CornerLeftUp />
          </IconButton>
          {edit && (
            <IconButton label="Clear this element's changes" onClick={() => store.update((t) => ({ ...t, styles: t.styles.filter((s) => s.id !== edit.id) }))}>
              <RotateCcw />
            </IconButton>
          )}
          <IconButton label="Deselect" onClick={() => onSelect(null)}>
            <X />
          </IconButton>
        </div>
        {className && (
          <p className="mt-2 line-clamp-3 break-all rounded-[4px] bg-black/30 px-2 py-1.5 font-mono text-[10px] leading-relaxed text-white/50" title={className}>
            {className}
          </p>
        )}
      </div>

      <Group title="Type">
        <div className="grid grid-cols-2 gap-1.5">
          <SelectField label="Font" {...field("font-family")} options={fontOptions()} wide />
          <TextField label="Size" {...field("font-size")} />
          <SelectField label="Weight" {...field("font-weight")} options={WEIGHTS} />
          <TextField label="Line height" {...field("line-height")} />
          <TextField label="Tracking" {...field("letter-spacing")} />
          <ColorField label="Colour" {...field("color")} />
          <SelectField label="Align" {...field("text-align")} options={opts("left", "center", "right", "justify")} />
          <SelectField label="Case" {...field("text-transform")} options={opts("none", "uppercase", "lowercase", "capitalize")} />
          <TextField label="Max width" {...field("max-width")} />
        </div>
      </Group>

      <Group title="Layout">
        <div className="grid grid-cols-2 gap-1.5">
          <SelectField label="Display" {...field("display")} options={opts("block", "flex", "grid", "inline", "inline-block", "inline-flex", "none")} />
          <SelectField label="Direction" {...field("flex-direction")} options={opts("row", "column", "row-reverse", "column-reverse")} />
          <SelectField label="Justify" {...field("justify-content")} options={opts("flex-start", "center", "flex-end", "space-between")} />
          <SelectField label="Align items" {...field("align-items")} options={opts("stretch", "flex-start", "center", "flex-end", "baseline")} />
          <TextField label="Gap" {...field("gap")} />
          <TextField label="Columns" {...field("grid-template-columns")} />
          <TextField label="Width" {...field("width")} />
          <TextField label="Height" {...field("height")} />
        </div>
      </Group>

      <Group title="Spacing">
        <Sides label="Padding" base="padding" field={field} />
        <div className="h-2" />
        <Sides label="Margin" base="margin" field={field} />
      </Group>

      <Group title="Fill and shape">
        <div className="grid grid-cols-2 gap-1.5">
          <ColorField label="Background" {...field("background-color")} wide />
          <ColorField label="Border colour" {...field("border-color")} wide />
          <TextField label="Border width" {...field("border-width")} />
          <TextField label="Radius" {...field("border-radius")} />
          <TextField label="Opacity" {...field("opacity")} />
        </div>
      </Group>
    </>
  );
}

function ThemeTab({ tweaks }: { tweaks: Tweaks }) {
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);
  const theme = dark ? "dark" : "light";
  const values = tweaks.tokens[theme];

  const setTheme = (next: "light" | "dark") => applyTheme(next);
  const tokens = getConfig().tokens ?? [];
  const setToken = (key: string, v: string) =>
    store.update((t) => {
      const next = { ...t.tokens[theme] };
      if (v.trim()) next[key] = v.trim();
      else delete next[key];
      return { ...t, tokens: { ...t.tokens, [theme]: next } };
    });

  return (
    <>
      <Group title="Theme">
        <div className="grid grid-cols-2 gap-1 rounded-[6px] bg-black/30 p-1">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={cn("flex h-7 items-center justify-center gap-1.5 rounded-[4px] capitalize", theme === t ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80")}
            >
              {t === "light" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              {t}
            </button>
          ))}
        </div>
      </Group>
      <Group title={`Colour tokens · ${theme}`}>
        <div className="grid gap-1.5">
          {tokens.length === 0 && <p className="text-white/45">No tokens configured. Pass `tokens` in the DesignTweaks config.</p>}
          {tokens.map((tok) => (
            <ColorField
              key={`${theme}-${tok.key}`}
              label={tok.label}
              prop={tok.key}
              value={values[tok.key]}
              computed={(theme === "dark" ? tok.dark : undefined) ?? tok.light}
              onSet={setToken}
              wide
            />
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-white/45">
          Each theme keeps its own values. Hex with alpha works (#0a0a0a14). The isometric drawings keep their own palette.
        </p>
      </Group>
    </>
  );
}

function ChangesTab({ tweaks }: { tweaks: Tweaks }) {
  const [copied, setCopied] = useState(false);
  const tokenRows = (["light", "dark"] as const).flatMap((theme) =>
    Object.entries(tweaks.tokens[theme]).map(([key, value]) => ({ theme, key, value })),
  );
  const empty = store.changeCount(tweaks) - tweaks.messages.length === 0;

  return (
    <>
      <AgentStatus tweaks={tweaks} />
      <Messages tweaks={tweaks} />

      {empty && <Empty>No changes yet. Edit text, inspect an element or change a token and it shows up here.</Empty>}

      {tweaks.text.length > 0 && (
        <Group title={`Text · ${tweaks.text.length}`}>
          <ul className="grid gap-1">
            {tweaks.text.map((e) => (
              <Change
                key={e.id}
                meta={`${sectionLabel(e.scope)} · ${e.tag}${e.layout ? ` · ${e.layout.split(":")[1]}` : ""}`}
                onRevert={() => store.update((t) => ({ ...t, text: t.text.filter((x) => x.id !== e.id) }))}
              >
                <span className="text-white/40 line-through">{e.original}</span>
                <span className="text-white">{e.value}</span>
              </Change>
            ))}
          </ul>
        </Group>
      )}

      {tweaks.styles.length > 0 && (
        <Group title={`Styles · ${tweaks.styles.length}`}>
          <ul className="grid gap-1">
            {tweaks.styles.map((e) => (
              <Change
                key={e.id}
                meta={`${sectionLabel(e.scope)} · at ${e.viewport}px${e.layout ? ` · ${e.layout.split(":")[1]}` : ""}`}
                onRevert={() => store.update((t) => ({ ...t, styles: t.styles.filter((x) => x.id !== e.id) }))}
              >
                <span className="text-white">{e.label}</span>
                <span className="font-mono text-[10px] text-white/55">
                  {Object.entries(e.props)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join("; ")}
                </span>
              </Change>
            ))}
          </ul>
        </Group>
      )}

      {tokenRows.length > 0 && (
        <Group title={`Tokens · ${tokenRows.length}`}>
          <ul className="grid gap-1">
            {tokenRows.map(({ theme, key, value }) => (
              <Change
                key={`${theme}-${key}`}
                meta={`${theme} theme`}
                onRevert={() =>
                  store.update((t) => {
                    const next = { ...t.tokens[theme] };
                    delete next[key];
                    return { ...t, tokens: { ...t.tokens, [theme]: next } };
                  })
                }
              >
                <span className="flex items-center gap-2 text-white">
                  <span className="size-3 rounded-[2px] ring-1 ring-white/20" style={{ background: value }} />
                  {key}: <span className="font-mono">{value}</span>
                </span>
              </Change>
            ))}
          </ul>
        </Group>
      )}

      {(tweaks.sections.order.length > 0 || tweaks.sections.hidden.length > 0) && (
        <Group title="Sections">
          <ul className="grid gap-1">
            <Change meta="Order and visibility" onRevert={() => store.update((t) => ({ ...t, sections: { order: [], hidden: [] } }))}>
              {tweaks.sections.order.length > 0 && (
                <span className="text-white">Order: {tweaks.sections.order.map((k) => sectionLabel(k)).join(" → ")}</span>
              )}
              {tweaks.sections.hidden.length > 0 && (
                <span className="text-white">Hidden: {tweaks.sections.hidden.map((k) => sectionLabel(k)).join(", ")}</span>
              )}
            </Change>
          </ul>
        </Group>
      )}

      <Group title="Batch">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(tweaks, null, 2)).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              });
            }}
            className="flex h-7 items-center gap-1.5 rounded-[4px] bg-white/5 px-2.5 text-white/80 hover:bg-white/10"
          >
            <Copy className="size-3.5" />
            {copied ? "Copied" : "Copy JSON"}
          </button>
          <button
            type="button"
            disabled={empty}
            onClick={() => {
              if (window.confirm("Discard every design change and message?"))
                store.update((t) => ({ ...store.EMPTY, layout: t.layout, sent: t.sent, reply: t.reply }));
            }}
            className="ml-auto flex h-7 items-center gap-1.5 rounded-[4px] px-2.5 text-red-300/80 hover:bg-red-400/10 disabled:opacity-30"
          >
            <RotateCcw className="size-3.5" />
            Reset all
          </button>
        </div>
      </Group>
    </>
  );
}

const clock = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/** Queued notes for the agent. Enter queues, Shift+Enter starts a new line; nothing goes out until Send. */
function Messages({ tweaks }: { tweaks: Tweaks }) {
  const [draft, setDraft] = useState("");
  const queue = (value: string) => {
    const text = value.trim();
    if (!text) return;
    store.update((t) => ({ ...t, messages: [...t.messages, { id: uid(), text, at: new Date().toISOString() }] }));
    setDraft("");
  };
  return (
    <Group title={`Messages to ${agent()}${tweaks.messages.length ? ` · ${tweaks.messages.length}` : ""}`}>
      {tweaks.messages.length > 0 && (
        <ul className="mb-2 grid gap-1">
          {tweaks.messages.map((m) => (
            <li key={m.id} className="flex items-start gap-2 rounded-[4px] bg-[#0d99ff]/10 px-2 py-1.5">
              <p className="min-w-0 flex-1 whitespace-pre-wrap break-words text-white">{m.text}</p>
              <IconButton label="Remove message" onClick={() => store.update((t) => ({ ...t, messages: t.messages.filter((x) => x.id !== m.id) }))}>
                <X />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            queue(e.currentTarget.value);
          }
        }}
        rows={2}
        placeholder="Anything the panel can't express: swap this photo, rename a section…"
        className="w-full resize-y rounded-[4px] bg-black/30 px-2 py-1.5 text-[12px] leading-relaxed text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 focus:ring-[#0d99ff]"
      />
      <p className="mt-1 text-[10px] text-white/35">Enter adds it to the queue · Shift+Enter for a new line</p>
    </Group>
  );
}

/** What happened to the last batch: still with the agent, or its answer once it is in the code. */
function AgentStatus({ tweaks }: { tweaks: Tweaks }) {
  if (store.isPending(tweaks) && tweaks.sent)
    return (
      <div className="flex items-center gap-2 border-b border-white/10 bg-amber-300/10 px-3 py-2.5 text-[11px] text-amber-100">
        <LoaderCircle className="size-3.5 shrink-0 animate-spin" />
        Sent {tweaks.sent.count} change{tweaks.sent.count === 1 ? "" : "s"} at {clock(tweaks.sent.at)}. {agent()} is implementing them.
      </div>
    );
  if (!tweaks.reply) return null;
  return (
    <div className="flex items-start gap-2 border-b border-white/10 bg-emerald-400/10 px-3 py-2.5 text-[11px] text-emerald-50">
      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
      <p className="min-w-0 flex-1 whitespace-pre-wrap leading-relaxed">
        <span className="text-emerald-300">{agent()} · {clock(tweaks.reply.at)}</span>
        {"\n"}
        {tweaks.reply.text}
      </p>
      <IconButton label="Dismiss" onClick={() => store.update((t) => ({ ...t, reply: undefined }))}>
        <X />
      </IconButton>
    </div>
  );
}

/** The one way changes reach the code: everything queued goes to the agent in a single batch. */
function SendBar({ tweaks, status }: { tweaks: Tweaks; status: store.SaveStatus }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const count = store.changeCount(tweaks);
  const pending = store.isPending(tweaks);
  const waiting = pending && store.alreadySent(tweaks);

  const send = () => {
    setBusy(true);
    setFailed(false);
    store
      .send()
      .catch(() => setFailed(true))
      .finally(() => setBusy(false));
  };

  const line = failed
    ? "Couldn't send. Is the dev server running?"
    : status === "error"
      ? "Can't save. Is the dev server running?"
      : pending && tweaks.sent
        ? `Sent at ${clock(tweaks.sent.at)} · ${agent()} is on it`
        : status === "saving"
          ? "Saving…"
          : status === "loading"
            ? "Loading…"
            : "Changes show here only, until you send them";

  return (
    <footer className="grid gap-2 border-t border-white/10 px-3 py-2.5">
      <button
        type="button"
        disabled={!count || busy || waiting || status !== "saved"}
        onClick={send}
        className="flex h-8 items-center justify-center gap-2 rounded-[4px] bg-[#0d99ff] text-[12px] font-semibold text-white transition-colors hover:bg-[#0a85e0] disabled:bg-white/10 disabled:text-white/35"
      >
        {busy ? <LoaderCircle className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
        {busy
          ? "Sending…"
          : waiting
            ? `Sent, waiting for ${agent()}`
            : count
              ? `${pending ? "Send again with new changes" : `Send ${count} change${count === 1 ? "" : "s"} to ${agent()}`}`
              : "Nothing to send yet"}
      </button>
      <p className="flex items-center gap-2 text-[11px] text-white/50">
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            failed || status === "error" ? "bg-red-400" : pending || status !== "saved" ? "bg-amber-300" : "bg-emerald-400",
          )}
        />
        {line}
      </p>
    </footer>
  );
}

/* ============================================================ controls */

type FieldProps = {
  label: string;
  prop: string;
  value: string | undefined;
  computed: string;
  onSet: (prop: string, value: string) => void;
  wide?: boolean;
  list?: string;
};

function FieldShell({ label, set, wide, onReset, children }: { label: string; set: boolean; wide?: boolean; onReset: () => void; children: ReactNode }) {
  return (
    <div className={cn("grid gap-1", wide && "col-span-2")}>
      <span className="flex h-3.5 items-center gap-1 text-[10px] text-white/45">
        {set && <span className="size-1.5 rounded-full bg-[#0d99ff]" />}
        {label}
        {set && (
          <button type="button" onClick={onReset} className="ml-auto text-white/40 hover:text-white" title="Reset">
            reset
          </button>
        )}
      </span>
      {children}
    </div>
  );
}

const inputClass =
  "h-7 w-full min-w-0 rounded-[4px] bg-black/30 px-2 text-[12px] text-white placeholder:text-white/35 outline-none ring-1 ring-white/5 hover:ring-white/15 focus:ring-[#0d99ff]";

function nudge(value: string, dir: number, big: boolean) {
  const m = value.trim().match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  if (!m) return null;
  const unit = m[2];
  const step = unit === "em" || unit === "rem" ? 0.01 : unit === "" ? 0.05 : 1;
  const next = Number(m[1]) + dir * step * (big ? 10 : 1);
  return `${Math.round(next * 1000) / 1000}${unit}`;
}

function TextField({ label, prop, value, computed, onSet, wide, list }: FieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft !== null && draft !== (value ?? "")) onSet(prop, draft);
    setDraft(null);
  };
  return (
    <FieldShell label={label} set={value !== undefined} wide={wide} onReset={() => onSet(prop, "")}>
      <input
        value={draft ?? value ?? ""}
        placeholder={computed}
        list={list}
        onChange={(e) => setDraft(e.currentTarget.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setDraft(null);
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const next = nudge(draft ?? value ?? computed, e.key === "ArrowUp" ? 1 : -1, e.shiftKey);
            if (next) {
              e.preventDefault();
              setDraft(null);
              onSet(prop, next);
            }
          }
        }}
        className={inputClass}
      />
    </FieldShell>
  );
}

function SelectField({ label, prop, value, computed, onSet, options, wide }: FieldProps & { options: { value: string; label: string }[] }) {
  const shown = prop === "font-family" ? computed.split(",")[0].replace(/["']/g, "").trim() : computed;
  return (
    <FieldShell label={label} set={value !== undefined} wide={wide} onReset={() => onSet(prop, "")}>
      <select value={value ?? ""} onChange={(e) => onSet(prop, e.currentTarget.value)} className={cn(inputClass, "px-1.5")}>
        <option value="">{shown || "auto"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Colour suggestions for the inspector: the configured tokens as CSS variables. */
const tokenSuggestions = () => [...(getConfig().tokens ?? []).map((t) => `var(--color-${t.key})`), "currentColor", "transparent"];

let canvas: CanvasRenderingContext2D | null = null;
function toHex(color: string) {
  canvas ??= document.createElement("canvas").getContext("2d");
  if (!canvas) return "#000000";
  canvas.fillStyle = "#000000";
  canvas.fillStyle = color;
  const out = canvas.fillStyle;
  if (out.startsWith("#")) return out;
  const m = out.match(/\d+(\.\d+)?/g);
  return m ? `#${m.slice(0, 3).map((n) => Math.round(Number(n)).toString(16).padStart(2, "0")).join("")}` : "#000000";
}

function ColorField(props: FieldProps) {
  const { prop, value, computed, onSet } = props;
  const resolved = value?.startsWith("#") ? value : computed;
  return (
    <div className={cn("flex items-end gap-1.5", props.wide && "col-span-2")}>
      <label className="relative mb-0 size-7 shrink-0 cursor-pointer overflow-hidden rounded-[4px] ring-1 ring-white/15" style={{ background: value ?? computed }}>
        <span className="sr-only">Pick {props.label}</span>
        <input type="color" value={toHex(resolved)} onChange={(e) => onSet(prop, e.currentTarget.value)} className="absolute inset-0 cursor-pointer opacity-0" />
      </label>
      <div className="min-w-0 flex-1">
        <TextField {...props} wide={false} list="design-token-colors" />
      </div>
    </div>
  );
}

function Sides({ label, base, field }: { label: string; base: string; field: (prop: string) => Omit<FieldProps, "label"> }) {
  return (
    <div>
      <p className="mb-1 text-[10px] text-white/45">{label}</p>
      <div className="grid grid-cols-4 gap-1.5">
        {(["top", "right", "bottom", "left"] as const).map((s) => (
          <TextField key={s} label={s[0].toUpperCase() + s.slice(1)} {...field(`${base}-${s}`)} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================ bits */

function Group({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="border-b border-white/10 px-3 py-3">
      <div className="mb-2 flex h-5 items-center">
        <h3 className="text-[11px] font-semibold text-white/90">{title}</h3>
        <span className="ml-auto">{action}</span>
      </div>
      {children}
    </section>
  );
}

function Change({ meta, onRevert, children }: { meta: string; onRevert: () => void; children: ReactNode }) {
  return (
    <li className="group flex items-start gap-2 rounded-[4px] bg-black/20 px-2 py-1.5">
      <div className="grid min-w-0 flex-1 gap-0.5 break-words">
        <span className="text-[10px] text-white/40">{meta}</span>
        {children}
      </div>
      <IconButton label="Revert" onClick={onRevert}>
        <RotateCcw />
      </IconButton>
    </li>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <p className="px-3 py-6 text-center text-[12px] leading-relaxed text-white/50">{children}</p>;
}

function IconButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-6 shrink-0 place-items-center rounded-[4px] text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25 [&_svg]:size-3.5"
    >
      {children}
    </button>
  );
}

function Toggle({ on, label, onClick, children }: { on: boolean; label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "grid size-7 place-items-center rounded-[4px] transition-colors [&_svg]:size-4",
        on ? "bg-[#0d99ff] text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function GridOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2147483620]">
      <div className="mx-auto grid h-full max-w-[1200px] grid-cols-4 gap-4 border-x border-[#ff3b30]/30 px-6 sm:grid-cols-8 sm:px-8 lg:grid-cols-12 lg:gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={cn("bg-[#ff3b30]/[0.06] ring-1 ring-inset ring-[#ff3b30]/15", i >= 4 && "hidden sm:block", i >= 8 && "sm:hidden lg:block")} />
        ))}
      </div>
    </div>
  );
}
