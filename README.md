# Natan Salvador — portfolio

A portfolio and app hub for Natan Salvador, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## Design

The site is one screen with no page scroll: a terminal window that "boots" when it opens. `fetch` types itself and prints the name on an LED dot-matrix board plus a fetch card (stack, status, contact links); then `ls ~/projects` types itself and lists the projects next to the selected project's README. A powerline-style status bar holds the current path, the language switch, and a clock. Everything is mouse-driven; nothing depends on typing.

- Colors come from the terminal theme in `my-terminal-codex-theme.txt` and live as tokens at the top of `src/styles.css`. Each project tints its row and README with its own accent.
- `src/Block.tsx` types each command, then reveals its output line by line; blocks run in order. Reduced-motion visitors get everything already finished.
- `src/LedName.tsx` draws the name in a 5×7 dot-matrix font. The dots light up column by column, and a green glow drifts across the board or follows the pointer.
- On large screens the window stops growing at 860px tall. Shorter screens drop secondary lines (last login, the `total` line, swatches); phones stack the list above the README and show the full project details only when there is room (900px tall or more). If a screen is smaller still, only the README scrolls.

## Update content

- Projects and contact links live in `src/content.ts`. Each project has its own accent color and icon in `public/assets/`.
- The name, tagline, and fetch card are in `src/App.tsx`.

## Languages

Français, English, and Español are switchable from the status bar. On the first visit, the first supported language in the browser's preferences is selected (including regional variants such as `fr-CA` and `es-MX`); unsupported preferences fall back to English. An explicit selection is saved in local storage and takes priority on future visits.

English copy is the lookup key in `src/translations.ts`. Text wrapped in `**` is emphasized, so keep the markers in translations. Commands and terminal labels (fetch keys, contact keys) stay in English.

Run `npm test` (Node 22.18+) to check language detection and that every displayed string has French and Spanish translations, with no stale entries.
