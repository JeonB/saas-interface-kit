# Parallel agents: UI test writing brief

Use this as the **shared preamble** when spawning multiple Cursor agents to add tests in parallel. Keeps style consistent and avoids merge conflicts.

## Scope rules

- **Tests only**: add or edit `*.test.ts` / `*.test.tsx` under `packages/ui/src/`. Do **not** change component implementation unless the ticket explicitly says so.
- **No snapshots** for markup: prefer explicit assertions (`toHaveTextContent`, `toHaveAttribute`, `toBeDisabled`, `toHaveClass`, role queries).

## File patterns

- Component tests: `packages/ui/src/<Component>.test.tsx` (same basename as the component).
- Pure utilities: `packages/ui/src/<module>.test.ts` (included by Vitest; excluded from `tsc` build via `tsconfig.json`).

## Imports and style

- Import the component under test with a **relative** path: `import { Badge } from "./badge";` (matches existing `button.test.tsx`).
- Use `@testing-library/react` + `vitest` globals pattern:

```ts
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
```

- Query priority: **role + accessible name** > label text > `data-testid` (avoid `testid` unless necessary).

## What each agent should receive

1. **Target file(s)**: e.g. `badge.tsx` → `badge.test.tsx`.
2. **Verification checklist** (bullets): concrete behaviors to assert, not implementation details.
3. **Out of scope**: other components, refactors, dependency bumps.

## Splitting work (example)

| Agent | Deliverable |
|-------|-------------|
| A | `badge.test.tsx` — variants + className |
| B | `avatar.test.tsx` — image vs fallback + a11y |
| C | `card.test.tsx` — internal vs external `href` |

**Integrator (you or one agent)**: unify naming, remove duplicate cases, run `pnpm test` from repo root.

## Commands

```sh
pnpm test              # all packages (turbo)
pnpm --filter @repo/ui test
```

## Prompt template (copy-paste)

```
Repo: turbo-repo-ex, package @repo/ui.
Read packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md and follow it exactly.

Task: Add packages/ui/src/<NAME>.test.tsx only.
Component: packages/ui/src/<name>.tsx

Verify (bullets):
- ...

Do not modify the component file. No snapshot tests.
```

## Example verification checklists (for parallel prompts)

**Badge**

- Renders `children` text.
- Root is a `span` with shared layout classes (e.g. `ui:inline-flex`).
- `variant="success"` applies success background class.
- `className` is merged with variant classes (layout override).

**Avatar**

- With `src`: `img` with correct `src`, `alt`, and `referrerpolicy="no-referrer"`.
- Without `src`: `span` with `role="img"` and sensible `aria-label` (from `alt`, `fallback`, or default).
- `className` applies on the `img` branch when `src` is set.

**Card**

- Internal `href` (not http(s)): no `target` / `rel`, `href` unchanged.
- External `href`: `target="_blank"`, `rel` includes `noopener`, UTM query appended (`?` or `&` as appropriate).
- `className` merged on the anchor.
