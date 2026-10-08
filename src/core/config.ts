/** Everything project-specific lives here, passed in from the host app as <DesignTweaks config={...} />. */

export type ExplorationOption = { id: string; label: string };

/** A section with alternative layouts, switched by a URL search param that your page reads. */
export type Exploration = {
  /** Search param the page reads, e.g. "projects" for ?projects=index. */
  param: string;
  label: string;
  /** First option is the default (rendered when the param is absent). */
  options: readonly ExplorationOption[];
  /** Section key it belongs to, when it differs from `param` (see data-design-section). */
  section?: string;
};

/** A colour token exposed as --color-{key} (Tailwind v4 @theme naming). */
export type Token = {
  key: string;
  label: string;
  light: string;
  dark?: string;
  /** Other CSS variables that should follow this one, without the --color- prefix. */
  aliases?: readonly string[];
};

export type DesignTweaksConfig = {
  explorations?: readonly Exploration[];
  tokens?: readonly Token[];
  /**
   * How the site switches light/dark. `attribute` on <html> is set to `dark` (default "data-theme"),
   * or use attribute "class" to toggle a `dark` class (Tailwind's default). `storageKey` remembers the choice.
   */
  theme?: { attribute?: string; dark?: string; storageKey?: string };
  /** Where the dev server answers (see dsgn-tweaks/server). Default /api/dsgn-tweaks. */
  endpoint?: string;
  /**
   * "auto" (default) saves through the dev server and falls back to this browser when none answers.
   * "browser" never calls a server; "server" never falls back.
   */
  storage?: "auto" | "server" | "browser";
  /** How to open a new URL when a layout exploration changes. Default: a normal page load. */
  navigate?: (url: string) => void;
  /** Extra fonts for the inspector's font picker, besides var(--font-sans) and var(--font-mono). */
  fonts?: readonly { value: string; label: string }[];
  /** Who the Send button hands the batch to. Default "Claude". */
  agentName?: string;
};

let config: DesignTweaksConfig = {};

export const setConfig = (next: DesignTweaksConfig) => {
  config = next;
};
export const getConfig = () => config;
export const themeAttribute = () => config.theme?.attribute ?? "data-theme";
const darkValue = () => config.theme?.dark ?? "dark";

/** Reads the site's theme, by attribute value or (attribute "class") by class name. */
export function isDarkTheme() {
  const html = document.documentElement;
  return themeAttribute() === "class" ? html.classList.contains(darkValue()) : html.getAttribute(themeAttribute()) === darkValue();
}

export function writeTheme(next: "light" | "dark") {
  const html = document.documentElement;
  if (themeAttribute() === "class") html.classList.toggle(darkValue(), next === "dark");
  else html.setAttribute(themeAttribute(), next === "dark" ? darkValue() : "light");
  const key = config.theme?.storageKey;
  if (!key) return;
  try {
    localStorage.setItem(key, next);
  } catch {
    // Storage blocked: the switch still works for this visit.
  }
}

/** CSS selectors that match the light and dark theme, for token overrides. */
export function themeSelectors() {
  const attr = themeAttribute();
  const dark = darkValue();
  return attr === "class"
    ? { light: `:root:not(.${dark})`, dark: `:root.${dark}` }
    : { light: `:root:not([${attr}="${dark}"])`, dark: `:root[${attr}="${dark}"]` };
}
