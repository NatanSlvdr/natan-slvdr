# Natan Salvador — portfolio

A portfolio and app hub for Natan Salvador, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## Languages

The styled language menu in the bottom navbar offers Français, English, and Español, with a highlighted current choice. It supports arrow keys, Home/End, typing a language’s first letter, Escape, and outside-click dismissal. On the first visit, the first supported language in the browser’s preferences is selected (including regional variants such as `fr-CA` and `es-MX`); unsupported preferences fall back to English. An explicit selection is saved in local storage and takes priority on future visits. If storage is blocked, switching still works for the current visit.

English copy lives in the components and acts as the lookup key in `src/translations.ts`, which contains the French and Spanish translations. Update the corresponding dictionary key whenever English copy changes. Brand and technology names remain unchanged. Page language, title, descriptions, and accessibility labels update with the selection. Static HTML metadata remains English for crawlers that do not run JavaScript.

Run language behavior tests with `npm test` (Node 22.18+).

## Update content

- Edit app descriptions, technologies, links, and icons in `src/App.tsx` (`projects`). Each row's accent colour comes from its `.project-<name>` theme in `src/styles.css`.
- Edit the experience copy and "what I built" lists in `src/App.tsx` (`cyberesistWork`, `sccWork`) and the Cyberesist audit pipeline in `src/ExperienceDiagram.tsx`.
- Replace artwork in `public/assets/` and CVs in `public/cv/`.
- Technology marks in `public/assets/tech/` come from the Iconify Logos and Devicon collections, the Huey and Django Ninja project repositories, and Wikimedia Commons for Microsoft 365 and Exchange. Active Directory uses the Microsoft mark; Windows Server services share the Windows mark.
- Edit colors and layout in `src/styles.css`.
- The visual system uses a dark canvas, lime accents, colorful project artwork, and blueprint grids. The hero fills the viewport. Its square grid has half the previous cell spacing, giving it roughly four times as many pixels over the same area. `src/PixelModel.ts` renders rotating hollow 3D wireframes into an offscreen Three.js render target, shading front edges brighter than rear edges; `src/PixelGrid.tsx` samples that flat image to decide which squares light up. Squares without a projected edge fade quickly to off, while the unlit grid remains faintly outlined. A canvas projection keeps the effect visible without WebGL. `src/PillTunnel.tsx` draws capsule-shaped tunnel frames with narrow perspective and lines converging along its full perimeter. Frames and rails fade into the center without a visible end frame; the drawing updates only when the pill changes size. The bottom navigation morphs from an animated scroll cue into a centered icon dock with a glowing current-section tile, then returns to the cue at the top. Experience is a vertical timeline; each role has a project narrative, a list of what was built or maintained, and technology icons. Cyberesist also has a full-width pipeline diagram showing how an example audit moves from scope to report. Projects are a compact list: each row shows the app icon, a one-line summary, a short explanation, technologies, and links; sections reveal as they enter the viewport. Motion respects reduced-motion preferences.
- The About section is a short first-person note about coding since age 12, problem solving, and building beyond work. A small margin marker responds to hover without hiding any of the story.

The public app cards link to known GitHub repositories. StageSwap also links to its release download. Partix offers an email walkthrough because its repository is private. Add live app URLs to the corresponding `links` arrays when ready.
