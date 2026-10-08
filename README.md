# Design Tweaks

A dev-only design panel for Next.js pages. Open it on your local server and design directly on the real page:

- **Edit text** in place, including headings, nav and footer.
- **Inspect** any element to change its type, spacing, size, colour, radius and opacity.
- **Switch layout explorations** for sections you're still deciding on.
- **Reorder or hide** sections.
- **Retune colour tokens**, separately for the light and dark themes.
- **Check the layout** with a column grid, box outlines, and previews at 390–1440px.

Nothing touches your source while you play: changes are only visual and autosave to `.design/tweaks.json`. When you're happy, queue notes for anything the panel can't express and press **Send**. The whole batch lands in `.design/outbox/`, and your coding agent implements it in one go (see [AGENTS.md](AGENTS.md)).

The panel only renders in development, and its route returns 404 everywhere else.

## Requirements

Next.js 15+ (App Router), React 19, Tailwind CSS v4 and `lucide-react`.

## Install

```bash
npm i -D github:TheStevenShyaka/design-tweaks
```

### 1. Next config

The package ships TypeScript source:

```ts
// next.config.ts
const nextConfig = { transpilePackages: ["design-tweaks"] };
```

### 2. Tailwind

Tailwind needs to see the panel's classes. Add this to the CSS file that imports Tailwind (adjust the relative path):

```css
@source "../node_modules/design-tweaks/src";
```

### 3. Route

```ts
// app/api/design/route.ts
import { createDesignRoute } from "design-tweaks/server";

export const dynamic = "force-dynamic";
export const { GET, PUT, POST } = createDesignRoute();
```

### 4. Mount the panel

```tsx
// app/page.tsx (or a layout)
import { Suspense } from "react";
import { DesignTweaks } from "design-tweaks";

{process.env.NODE_ENV === "development" && (
  <Suspense>
    <DesignTweaks config={config} />
  </Suspense>
)}
```

### 5. Mark your sections

Put `data-design-root` on the element that wraps your page sections; without it the panel uses `<main>`. Each child is a section:

- **Key:** its `data-design-section`, else its `id`, else its position.
- **Label:** its `data-design-label`, else the key in words, else its first heading.

The first `<header>` and last `<footer>` outside the root are handled as Header and Footer.

### 6. Ignore the working folder

```gitignore
/.design/
```

Press **⌥D** (Option+D on a Mac, Alt+D elsewhere) to open the panel.

## Config

```ts
import type { DesignTweaksConfig } from "design-tweaks";

const config: DesignTweaksConfig = {
  // Sections with alternative layouts. Your page reads the search param (?projects=index) and renders that option.
  // The first option is the default.
  explorations: [
    {
      param: "projects",
      label: "Projects",
      options: [
        { id: "cards", label: "Cards" },
        { id: "index", label: "Index" },
      ],
    },
  ],
  // Colour tokens, exposed as --color-{key} (Tailwind v4 @theme names). `aliases` follow along.
  tokens: [
    { key: "paper", label: "Paper", light: "#fafaf9", dark: "#0a0a0a" },
    { key: "accent", label: "Accent", light: "#f65009", aliases: ["brand"] },
  ],
  // How your site switches themes: an attribute on <html> set to "dark", and its localStorage key.
  theme: { attribute: "data-theme", storageKey: "my-theme" },
  // Optional: more fonts for the inspector, besides var(--font-sans) and var(--font-mono).
  fonts: [{ value: "var(--font-serif)", label: "Serif" }],
  endpoint: "/api/design", // default
  agentName: "Claude", // who the Send button names
};
```

## Shortcuts

| Key | Action |
|---|---|
| ⌥D | Open or close the panel |
| T | Edit text (Enter saves, Esc cancels) |
| I | Inspect an element |
| G / O | Column grid / outlines |
| ↑ ↓ | Nudge a value (⇧ for ×10) |
| Esc | Leave a mode or preview |

## Working on the panel

```bash
npm install
npm run example   # http://localhost:3100, a small page wired to the local source
npm run typecheck
```

Source is in `src/`:

- `DesignTweaks.tsx`: the panel UI.
- `engine.ts`: applies tweaks to the live DOM without touching React's tree.
- `store.ts`: state, autosave, and sync between tabs and the preview iframe.
- `server.ts`: the route handlers.
- `config.ts`: the settings types.

Automated checks should add `?designfile=test` to the URL so they write `.design/tweaks.test.json` and `.design/outbox-test/`, never the real files.
