import { h, render } from "preact";
import { setConfig, type DesignTweaksConfig } from "./core/config";
import * as store from "./core/store";
import { App } from "./panel/Panel";
import css from "./panel/panel.generated.css";

export type { DesignTweaksConfig, Exploration, ExplorationOption, Token } from "./core/config";
export type { Tweaks, TextEdit, StyleEdit, Message } from "./core/store";

export type DsgnTweaks = { destroy: () => void };

let current: DsgnTweaks | null = null;

/**
 * Tailwind registers its internal variables with @property, which only works at document level,
 * not inside a shadow root. Hoist those rules to <head> once.
 */
function registerProperties() {
  if (document.getElementById("dsgn-tweaks-properties")) return;
  const rules = css.match(/@property[^{]+\{[^}]*\}/g) ?? [];
  const style = document.createElement("style");
  style.id = "dsgn-tweaks-properties";
  style.textContent = rules.join("\n");
  document.head.appendChild(style);
}

/**
 * Mounts the panel on the current page (call it in development only). The panel lives in its own
 * shadow root, so the page's CSS never reaches it and its CSS never reaches the page.
 * Calling init again replaces the previous instance.
 */
export function init(config: DesignTweaksConfig = {}): DsgnTweaks {
  if (typeof window === "undefined") return { destroy() {} };
  current?.destroy();
  setConfig(config);

  // Inside the viewport preview the panel only applies tweaks; it draws nothing.
  const framed = new URLSearchParams(window.location.search).get("design") === "frame";
  const host = document.createElement("dsgn-tweaks-root");
  host.setAttribute("data-design-ui", "");
  host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2147483600;";
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = css;
  const mount = document.createElement("div");
  shadow.append(style, mount);
  registerProperties();
  document.body.appendChild(host);
  store.start(!framed);
  render(h(App, { framed }), mount);

  const instance: DsgnTweaks = {
    destroy() {
      render(null, mount);
      host.remove();
      store.stop();
      if (current === instance) current = null;
    },
  };
  current = instance;
  return instance;
}
