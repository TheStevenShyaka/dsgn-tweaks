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
  /** How the host switches light/dark: an attribute on <html> ("dark" vs anything else) and its localStorage key. */
  theme?: { storageKey?: string; attribute?: string };
  /** Route created with createDesignRoute(). Default /api/design. */
  endpoint?: string;
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
