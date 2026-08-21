# foodOrdering

React + TypeScript food ordering app (Udemy "React Complete Guide" course project), built with Vite.

## Stack

- React 19, TypeScript 7 (strict mode), Vite 8
- CSS Modules (`*.module.css`) for component styling
- No test runner, router, or state management library configured

## Commands

- `npm run dev` / `npm start` — start Vite dev server
- `npm run build` — `tsc -b && vite build` (type-checks before bundling; build fails on type errors)
- `npm run preview` — preview the production build

## Project layout

- `src/index.tsx` — entry point, mounts to `#root`
- `src/App.tsx` — root component
- `src/components/` — feature folders (`Cart`, `Layout`, `Meals`, `UI`), each component paired with its `.module.css`
- `tsconfig.json` — root, references `tsconfig.app.json` (src) and `tsconfig.node.json` (vite.config.ts)
- `index.html` has fixed DOM anchors: `#root`, `#backdrop-root`, `#overlay-root` (used by `Modal.tsx` via `createPortal`)

## Conventions

- Type component props with a local `interface <Name>Props { ... }` above the component.
- Use `import type { ... }` for type-only imports (verbatim module syntax).
- Rely on Vite's built-in ambient types (`vite/client`, referenced in `src/vite-env.d.ts`) for CSS Modules and asset imports — don't add custom module declarations for these.
- Use `git mv` when renaming files to preserve history.
