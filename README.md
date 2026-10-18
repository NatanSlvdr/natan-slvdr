# Natan Salvador — portfolio

A portfolio and app hub for Natan Salvador, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## Design

The site is a single terminal window: a title bar with section tabs and the live terminal size, a scrolling session of command blocks, and a powerline-style status bar with the current path, the language switch, and a clock. Everything is mouse-driven (tabs, project rows, copy button, language switch); nothing depends on typing.

- Colors come from the terminal theme in `my-terminal-codex-theme.txt` and live as tokens at the top of `src/styles.css`.
- `src/Block.tsx` types each command when its block scrolls into view, then reveals the output line by line. Reduced-motion visitors get every block already finished.
- `src/AsciiName.tsx` draws the "ANSI Shadow" lettering as SVG so it lines up regardless of fonts; a soft light follows the pointer.
- `src/Projects.tsx` is an `ls` listing with a README pane on wide screens and an accordion on narrow ones.

## Update content

- Projects, contact links, and the short fetch card live in `src/content.ts`. Each project has its own accent color and icon in `public/assets/`.
- The about text is in `src/App.tsx` (`bat about.md` block).

## Languages

Français, English, and Español are switchable from the status bar. On the first visit, the first supported language in the browser's preferences is selected (including regional variants such as `fr-CA` and `es-MX`); unsupported preferences fall back to English. An explicit selection is saved in local storage and takes priority on future visits.

English copy is the lookup key in `src/translations.ts`. Text wrapped in `**` renders as markdown emphasis, so keep the markers in translations. Commands and terminal labels stay in English.

Run `npm test` (Node 22.18+) to check language detection and that every displayed string has French and Spanish translations.
