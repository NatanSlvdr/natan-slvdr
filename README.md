# Natan Salvador

A one-screen personal site with a terminal look, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## How it works

One screen, no text: a rounded 3D letter N drawn in ASCII fills the page, with GitHub, LinkedIn, and email icons below it. The N fades in, then starts tumbling and leans towards the pointer. Visitors who prefer reduced motion see a still letter. The name is still in the page title and in a heading kept for screen readers.

## Update content

- Links and platform icons live in `src/App.tsx`.
- The N is ray-marched on a canvas in `src/AsciiMonogram.tsx`, one ray per character. Its shape, rounding, character ramp, and colours are constants at the top of the file.
- Colours come from `my-terminal-codex-theme.txt` and are set as custom properties at the top of `src/styles.css`.

## Languages

There is no visible language switch. The first supported browser language (French, English, or Spanish) is used for the page description and the screen-reader labels; otherwise English. English copy is the lookup key in `src/translations.ts`. Update the matching entry when the English text changes.

Run language tests with `npm test` (Node 22.18+).
