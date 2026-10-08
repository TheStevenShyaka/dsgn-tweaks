# Implementing a dsgn-tweaks batch

For coding agents working in a project that uses dsgn-tweaks.

## The trigger

Only implement what the person explicitly **sent**. Each Send writes `.design/outbox/<timestamp>.json`. `.design/tweaks.json` is the live, visual-only state; never change source because of it alone.

While a session is open, watch the outbox, for example with a background loop:

```bash
until ls .design/outbox/*.json >/dev/null 2>&1; do sleep 3; done
```

At the start of a session, check the outbox for batches nobody has handled yet.

Pages without a dev server (the script tag on its own) can't write files: Send downloads the batch as `dsgn-tweaks-<time>.json` and copies it to the clipboard. When the person hands you that file or pastes the JSON, treat it exactly like an outbox batch; there is no `tweaks.json` to update afterwards.

## What a batch contains

| Field | Meaning |
|---|---|
| `layout` | The exploration picked per search param, e.g. `{ "projects": "index" }`. Usually means "make this the default". |
| `sections` | `order` (section keys top to bottom) and `hidden` (keys to remove, including `header`/`footer`). |
| `tokens.light` / `tokens.dark` | New values for `--color-{key}` in each theme. |
| `text[]` | `scope` (section key), `original` (text as it shipped), `nth` (which occurrence of that string in the section), `value` (new text), `tag`, and `layout` if it was made inside an exploration. |
| `styles[]` | `scope` and `path` (child-index steps from the section to the element), `tag`, `className` (its Tailwind classes, the best way to find it in source), `label` (a text snippet), `viewport` (window width when edited) and `props` (CSS properties to set). |
| `messages[]` | Free-text requests in the person's words. Treat each as a task. |
| `sent` | When it was sent and how many changes it holds. |

## Applying it

- **Text:** find `original` in source (copy files first, then components) and replace it. If one edit's `original` equals another edit's `value`, it was edited twice; apply only the final value.
- **Styles:** find the element by `className` (and `label`), then express `props` as Tailwind utilities.
  - Use `viewport` to choose the breakpoint: an edit made at 390px is the base style; one made at 1280px is probably `xl:`.
  - Prefer existing design tokens and steps over raw values.
- **Tokens:** update the theme CSS (`@theme` and the dark override).
- **Sections:** reorder or remove the components where the page composes them.

## Finishing

1. Move the snapshot to `.design/done/`.
2. In `.design/tweaks.json`, remove only the entries that were in the batch (match `text`/`styles` by `id`, messages by `id`), since the person may have kept editing while you worked.
3. Set `reply: { "at": <ISO now>, "text": <one or two sentences on what you did> }` and a fresh `updatedAt`. Open panels adopt only a strictly newer `updatedAt`, then show your reply.
4. Commit following the project's own conventions.
