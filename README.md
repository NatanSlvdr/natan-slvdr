# Natan Salvador — portfolio

A portfolio and app hub for Natan Salvador, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## Design

The site is one screen with no page scroll: a terminal window split into three bordered panes, each with its title set into the border — `[0] whoami` (name, one line, contact links), `[1] projects` (the list), and `[2] README.md` (the selected project). A status line holds the current path, the language switch, and a clock. Everything is mouse-driven; nothing depends on typing.

- Colors come from the terminal theme in `my-terminal-codex-theme.txt` and live as tokens at the top of `src/styles.css`. Each project tints the README pane with its own accent.
- On large screens the window stops growing at 1200×800 so the panes stay tight. Short screens hide the list descriptions; phones stack the panes and show the full project details only when there is room (900px tall or more). If a screen is smaller still, only the README pane scrolls.

## Update content

- Projects and contact links live in `src/content.ts`. Each project has its own accent color and icon in `public/assets/`.
- The name and one-line intro are in `src/App.tsx`.

## Languages

Français, English, and Español are switchable from the status bar. On the first visit, the first supported language in the browser's preferences is selected (including regional variants such as `fr-CA` and `es-MX`); unsupported preferences fall back to English. An explicit selection is saved in local storage and takes priority on future visits.

English copy is the lookup key in `src/translations.ts`. Terminal labels (pane titles, contact keys) stay in English.

Run `npm test` (Node 22.18+) to check language detection and that every displayed string has French and Spanish translations, with no stale entries.
