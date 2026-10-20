# Natan Salvador

A one-screen personal site with a terminal look, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## How it works

One screen, no scrolling. The name decodes from random glyphs, letter by letter, and scrambles again briefly under the pointer. Once it settles, a one-line tagline and the GitHub, LinkedIn, and email links fade in. A rounded 3D letter N drawn in ASCII tumbles on the right (above the text on narrow screens) and leans towards the pointer. Visitors who prefer reduced motion see everything at once, with a still letter.

## Update content

- Tagline, links, and platform icons live in `src/App.tsx`.
- The name and the decode effect live in `src/ScrambleName.tsx`.
- The N is ray-marched on a canvas in `src/AsciiMonogram.tsx`, one ray per character. Its shape, rounding, character ramp, and colours are constants at the top of the file.
- Colours come from `my-terminal-codex-theme.txt` and are set as custom properties at the top of `src/styles.css`.

## Languages

The fr · en · es switch sits in the top-right corner. On the first visit, the first supported browser language is selected; otherwise English. An explicit choice is saved in local storage. English copy is the lookup key in `src/translations.ts`. Update the matching entry when the English text changes.

Run language tests with `npm test` (Node 22.18+).
