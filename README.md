# Natan Salvador — portfolio

A portfolio and app hub for Natan Salvador, built with React, TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Build the production site with `npm run build`. The static output is in `dist/`.

## Update content

- Edit app descriptions, technologies, and links in `src/App.tsx` (`projects`).
- Edit the SCC workflow in `src/App.tsx` and the Cyberesist diagram in `src/ExperienceDiagram.tsx`.
- Replace artwork in `public/assets/` and CVs in `public/cv/`.
- Edit colors and layout in `src/styles.css`.
- The visual system uses a dark canvas, lime accents, colorful project artwork, and blueprint grids. The hero fills the viewport. Its square grid has half the previous cell spacing, giving it roughly four times as many pixels over the same area. `src/PixelModel.ts` renders rotating hollow 3D wireframes into an offscreen Three.js render target, shading front edges brighter than rear edges; `src/PixelGrid.tsx` samples that flat image to decide which squares light up. Squares without a projected edge fade quickly to off, while the unlit grid remains faintly outlined. A canvas projection keeps the effect visible without WebGL. `src/PillTunnel.tsx` draws capsule-shaped tunnel frames with narrow perspective and lines converging along its full perimeter. Frames and rails fade into the center without a visible end frame; the drawing updates only when the pill changes size. The bottom navigation morphs from an animated scroll cue into a centered icon dock with a glowing current-section tile, then returns to the cue at the top. Experience is a vertical timeline, with a React Flow diagram for the Cyberesist audit pipeline. Project artwork and the SCC diagram use pointer tilt; sections reveal as they enter the viewport. Motion respects reduced-motion preferences.
- The About section is a short first-person note about coding since age 12, problem solving, and building beyond work. A small margin marker responds to hover without hiding any of the story.

The public app cards link to known GitHub repositories. StageSwap also links to its release download. Partix offers an email walkthrough because its repository is private. Add live app URLs to the corresponding `links` arrays when ready.
