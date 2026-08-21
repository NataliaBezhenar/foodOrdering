---
name: new-component
description: Scaffold a new React component in this project following its established conventions. Use whenever adding a new component under src/components.
---

# Add a new component

Follow the pattern every existing component in `src/components` uses.
Don't deviate without a reason — consistency here matters more than
any individual stylistic preference.

## File layout

For a component named `Thing`:
```
src/components/<Feature>/Thing/
  Thing.tsx
  Thing.module.css
```
Flat components with no sub-parts (like `CartIcon.tsx`) can live
directly in their feature folder without their own subfolder — check
sibling components in the same feature directory before deciding.

## Component template

```tsx
import styles from "./Thing.module.css";

interface ThingProps {
  // primitives and callbacks first, children last if present
}

const Thing = (props: ThingProps) => {
  return <div className={styles.thing}>{/* ... */}</div>;
};

export default Thing;
```

Rules, all non-negotiable in this codebase (see CLAUDE.md):
- Props interface is named `<Name>Props`, declared locally above the
  component, not exported unless another file actually imports it.
- `import type { ... }` for type-only imports (verbatim module syntax
  is on in tsconfig).
- Default export of the component function.
- A sibling `.module.css` even if it starts nearly empty — don't
  reach for inline styles or a shared stylesheet.
- If the component needs a ref, use React 19's plain `ref` prop
  (`ref?: Ref<HTMLElement>` in the props interface), not
  `forwardRef` — see `src/components/UI/Input.tsx` for the pattern.
- If it needs cart state, `useContext(CartContext)` from
  `src/store/CartContext` — don't introduce a second state mechanism.

## After scaffolding

1. Wire it into its parent's JSX.
2. Add a test file (`Thing.test.tsx`) next to it — see the
   `test-writer` subagent or any existing `*.test.tsx` for the
   pattern (`renderWithCart` from `src/test-utils.tsx` if it touches
   cart context).
3. Run `npm run build` to confirm `tsc -b` stays clean under strict
   mode (`noUnusedLocals`, `noUnusedParameters`,
   `noFallthroughCasesInSwitch` are all on — they catch real
   mistakes, not just style nits).
