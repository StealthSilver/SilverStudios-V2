# Silver Studios — Project Conventions

Single source of truth for folder layout, templates, TypeScript rules, performance, naming, and git workflow.

---

## Folder & File Structure

```
src/
├── app/                    # Next.js App Router (routes, layouts, global styles)
│   ├── layout.tsx
│   ├── page.tsx            # Sections only — no logic
│   └── globals.css
├── sections/               # Page-level blocks (one folder per section)
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   └── index.ts
│   └── index.ts
├── components/
│   └── ui/                 # Reusable primitives (Button, Input, Card…)
│       ├── Button.tsx
│       └── index.ts
├── lib/
│   ├── utils.ts            # cn() and shared helpers
│   └── data/               # All copy / static content (never in JSX)
│       ├── site.ts
│       ├── hero.ts
│       └── index.ts
├── types/                  # Shared domain types
│   ├── site.ts
│   └── index.ts
└── hooks/                  # Client hooks ('use client' when needed)
    ├── use-media-query.ts
    └── index.ts
```

| Path | Purpose |
|------|---------|
| `sections/` | Full-width page blocks composed for `page.tsx` |
| `components/ui/` | Small, composable UI primitives |
| `lib/` | Utilities, helpers, non-React logic |
| `lib/data/` | Marketing copy, labels, CTA text, config objects |
| `types/` | Cross-cutting TypeScript interfaces and types |
| `hooks/` | Reusable client-side React hooks |

Import alias: `@/*` → `src/*` (see `tsconfig.json`).

---

## Section Template Pattern

Every section file follows this **top-to-bottom anatomy**:

1. **File header comment**
2. **Imports**
3. **Types** — props and local interfaces
4. **Local sub-components** — private to this section only
5. **Default export** — the section component

Reference: `src/sections/hero/HeroSection.tsx`

```tsx
/**
 * @file ExampleSection.tsx
 * @description One-line purpose of this section.
 */

// imports…

// ——— Types ———
interface ExampleProps { … }

// ——— Local sub-components ———
function ExampleCard({ … }: ExampleProps) { … }

// ——— Main section ———
export default function ExampleSection() {
  return <section>…</section>;
}
```

Rules:

- One section per folder; name the file `PascalCase` + `Section` suffix (e.g. `HeroSection.tsx`).
- Pull copy from `lib/data/`, not string literals in JSX.
- Prefer Server Components; add `'use client'` only when using hooks, events, or browser APIs.
- Use `next/image` for images, semantic HTML (`<section>`, headings, `aria-*`).

---

## UI Component Template

Reference: `src/components/ui/Button.tsx`

```tsx
/**
 * @file ComponentName.tsx
 * @description One-line purpose.
 */

import type { … } from "react";
import { cn } from "@/lib/utils";

// 1. Exported types / variants
export interface ComponentNameProps extends … {
  variant?: SomeVariant;
}

// 2. Style maps and defaults
const DEFAULT_VARIANT = "primary";

export function componentVariants(…) {
  return cn(…);
}

// 3. Named export (primitives are named, not default)
export function ComponentName({
  className,
  variant = DEFAULT_VARIANT,
  …rest
}: ComponentNameProps) {
  return <element className={cn(componentVariants(variant), className)} {...rest} />;
}
```

Rules:

- Export **interfaces** and **named** components (not default exports).
- Support `className` override via `cn()`.
- Spread `...rest` onto the root element for native HTML props.
- Define sensible **defaults** for optional props.
- Export a `*Variants()` helper when links or other elements need the same styles.

---

## `page.tsx` Rule

**Imports sections only. Zero logic.**

```tsx
import { HeroSection } from "@/sections";

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
```

Do **not** put in `page.tsx`:

- `useState`, `useEffect`, or other hooks
- Data fetching (unless a rare top-level loader pattern is agreed)
- Long JSX trees
- Hardcoded copy

Add new blocks by creating a section and adding one import + one JSX line.

---

## `cn()` Utility

```ts
import { cn } from "@/lib/utils";

cn("px-4 py-2", isActive && "bg-foreground", className);
```

Uses `clsx` + `tailwind-merge` so conditional classes merge without Tailwind conflicts.

---

## Data Files Convention

All user-facing strings live in `src/lib/data/`:

```ts
// lib/data/hero.ts
import type { HeroContent } from "@/types";

export const heroContent: HeroContent = {
  title: "…",
  // …
};
```

Sections import data; they do not define copy inline.

---

## TypeScript Rules

| Rule | Practice |
|------|----------|
| No `any` | Use `unknown`, generics, or proper interfaces — enforced by ESLint |
| Strict mode | `strict: true` in `tsconfig.json` |
| Prop interfaces | Co-locate with the component; export when reused |
| Domain types | Shared shapes in `src/types/` |
| Data typing | Content objects satisfy types from `@/types` |

---

## Performance Rules

| Concern | Rule |
|---------|------|
| Components | Server Components by default |
| Client | `'use client'` only when necessary |
| Images | Always `next/image` with `width`, `height`, and meaningful `alt` |
| Fonts | `next/font` in root `layout.tsx` only |
| Fonts/CSS | No `@import` of external fonts in CSS — use `next/font` |
| Heavy UI | Dynamic `import()` for below-the-fold or rare client widgets |

---

## Naming Conventions

| Kind | Convention | Example |
|------|------------|---------|
| Section folders | `kebab-case` | `hero/`, `case-studies/` |
| Section files | `PascalCase` + `Section` | `HeroSection.tsx` |
| UI components | `PascalCase` | `Button.tsx` |
| Hooks | `use-` + `kebab-case` | `use-media-query.ts` |
| Data modules | `kebab-case` | `hero.ts`, `site.ts` |
| Types files | domain name | `site.ts` |
| Props interfaces | `ComponentNameProps` | `ButtonProps` |
| Constants | `SCREAMING_SNAKE` or camelCase objects | `heroContent`, `MAX_ITEMS` |
| Barrel files | `index.ts` | Re-export public API only |

---

## Git Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short description>

[optional body]
```

| Type | When |
|------|------|
| `feat` | New section, component, or capability |
| `fix` | Bug fix |
| `refactor` | Code change without behavior change |
| `style` | Formatting, Tailwind-only tweaks |
| `docs` | CONVENTIONS, README, comments |
| `chore` | Tooling, deps, config |

Examples:

- `feat(hero): add landing hero section`
- `fix(ui): correct button focus ring contrast`
- `docs: document section template pattern`

---

## File Header Comments

Every `.ts` / `.tsx` file starts with:

```ts
/**
 * @file FileName.tsx
 * @description One-line purpose of this file.
 */
```

---

## What NOT to Do

- Do **not** put SVG content in a `.ico` file — use `icon.svg` or a real ICO binary.
- Do **not** hardcode marketing copy in JSX — use `lib/data/`.
- Do **not** add business logic to `page.tsx`.
- Do **not** use `any` — model the shape or use `unknown` + narrowing.
- Do **not** use `<img>` — use `next/image`.
- Do **not** sprinkle `'use client'` at the page root — push it to the smallest leaf.
- Do **not** import sections from UI primitives (dependency flows **ui → sections → page**).
- Do **not** create default exports for UI primitives (use named exports for tree-shaking and clarity).
- Do **not** skip `className` / `...rest` on reusable UI — consumers must be able to extend.
- Do **not** add one-off helpers in random files — use `lib/utils.ts` or a dedicated module.
- Do **not** commit `.env` or secrets.

---

## Quick Reference

| Task | Where |
|------|--------|
| New landing block | `src/sections/<name>/` + wire in `page.tsx` |
| New button/input/card | `src/components/ui/` |
| New copy / labels | `src/lib/data/` |
| Shared type | `src/types/` |
| Client-only behavior | `src/hooks/` + `'use client'` |
| Class merging | `cn()` from `@/lib/utils` |
