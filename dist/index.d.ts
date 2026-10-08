/** Everything project-specific lives here, passed in from the host app as <DesignTweaks config={...} />. */
type ExplorationOption = {
    id: string;
    label: string;
};
/** A section with alternative layouts, switched by a URL search param that your page reads. */
type Exploration = {
    /** Search param the page reads, e.g. "projects" for ?projects=index. */
    param: string;
    label: string;
    /** First option is the default (rendered when the param is absent). */
    options: readonly ExplorationOption[];
    /** Section key it belongs to, when it differs from `param` (see data-design-section). */
    section?: string;
};
/** A colour token exposed as --color-{key} (Tailwind v4 @theme naming). */
type Token = {
    key: string;
    label: string;
    light: string;
    dark?: string;
    /** Other CSS variables that should follow this one, without the --color- prefix. */
    aliases?: readonly string[];
};
type DesignTweaksConfig = {
    explorations?: readonly Exploration[];
    tokens?: readonly Token[];
    /**
     * How the site switches light/dark. `attribute` on <html> is set to `dark` (default "data-theme"),
     * or use attribute "class" to toggle a `dark` class (Tailwind's default). `storageKey` remembers the choice.
     */
    theme?: {
        attribute?: string;
        dark?: string;
        storageKey?: string;
    };
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
    fonts?: readonly {
        value: string;
        label: string;
    }[];
    /** Who the Send button hands the batch to. Default "Claude". */
    agentName?: string;
};

/**
 * Design panel state. One JSON document, saved by the dev server to .design/tweaks.json
 * so the changes can be read back and written into the real source (and Figma).
 */
type TextEdit = {
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
type Step = {
    i: number;
    tag: string;
};
type StyleEdit = {
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
type Message = {
    id: string;
    text: string;
    at: string;
};
type Tweaks = {
    readme: string;
    /** Exploration picked per search param, e.g. { projects: "index" }. */
    layout: Record<string, string>;
    sections: {
        order: string[];
        hidden: string[];
    };
    tokens: {
        light: Record<string, string>;
        dark: Record<string, string>;
    };
    text: TextEdit[];
    styles: StyleEdit[];
    /** Queued notes for Claude: anything the panel can't express. */
    messages: Message[];
    /** The last batch handed to the agent. Its edits stay applied (marked as sent) until the agent finishes it. */
    sent?: SentBatch;
    /** `at` of the agent reply the person closed. */
    dismissedReply?: string;
    updatedAt: string;
};
type SentBatch = {
    at: string;
    count: number;
    /** What went in the batch, so the panel can mark it and clean it up once implemented. */
    ids: {
        text: string[];
        styles: string[];
        messages: string[];
    };
    tokens: Tweaks["tokens"];
    sections: Tweaks["sections"];
    /** The agent finished it and the panel removed its edits. */
    done?: boolean;
};

type DsgnTweaks = {
    destroy: () => void;
};
/**
 * Mounts the panel on the current page (call it in development only). The panel lives in its own
 * shadow root, so the page's CSS never reaches it and its CSS never reaches the page.
 * Calling init again replaces the previous instance.
 */
declare function init(config?: DesignTweaksConfig): DsgnTweaks;

export { type DesignTweaksConfig, type DsgnTweaks, type Exploration, type ExplorationOption, type Message, type StyleEdit, type TextEdit, type Token, type Tweaks, init };
