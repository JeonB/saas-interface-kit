# Turborepo — Monorepo with shared UI

This Turborepo includes a shared design system (`@repo/ui`), a main web app, a documentation site, and Storybook for component development. The UI kit is oriented toward **B2B SaaS** surfaces (dashboards, settings, alerts).

## What's inside?

### Apps

| App           | Description                                                                                                       | Dev port |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| **web**       | Next.js app. Uses `@repo/ui` for a SaaS-style dashboard demo.                                                    | 3001     |
| **docs**      | Documentation: introduction, foundations, design system, components, quality gates.                               | 3000     |
| **storybook** | UI stories: Button, Field, Input, StatCard, EmptyState, Alert, Badge, Card, Avatar, etc.                          | 6006     |

### Packages

- **@repo/ui** — Shared React components and styles (Tailwind with `ui:` prefix). Used by web and docs.
- **@repo/tailwind-config** — Shared Tailwind theme (semantic tokens + palette).
- **@repo/typescript-config** — Shared `tsconfig` presets.
- **@repo/eslint-config** — Shared ESLint config.

## Quick start

```sh
pnpm install
pnpm build   # build packages then apps
pnpm dev     # run all apps in dev (or run per app, see below)
```

### Run apps individually

```sh
# Web (main app)
pnpm --filter web dev          # http://localhost:3001

# Docs
pnpm --filter docs dev         # http://localhost:3000

# Storybook
pnpm --filter storybook dev    # http://localhost:6006
```

From the **web** app, the "Docs" and "Get started" links point to the docs app. By default they use `http://localhost:3000`. To use a different docs URL (e.g. same host or production), set the environment variable in the web app:

```sh
# apps/web
NEXT_PUBLIC_DOCS_URL=https://docs.example.com   # or "" for same-origin /docs
```

See [.env.example](.env.example) for a template.

## Using @repo/ui

In any app that depends on `@repo/ui`:

```ts
import "@repo/ui/styles.css";
import { Button, Card } from "@repo/ui"; // barrel import
// or
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
```

Components support an optional `className` prop for layout/spacing. Build the UI package from the repo root or from `packages/ui`:

```sh
pnpm --filter @repo/ui build
```

## Adding a new UI component

1. Add the component in `packages/ui/src/` and export it from `packages/ui/src/index.ts`.
2. Add a story in `apps/storybook/stories/<Name>.stories.tsx`.
3. Add docs in `apps/docs/app/docs/components/page.tsx` and update design-system guidance when needed.
4. Run quality gates:

```sh
pnpm lint
pnpm check-types
pnpm test
```

## Parallel agents for tests

To split test work across multiple Cursor agents without style drift, share the brief in `packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md`. It defines file naming, Testing Library rules, and a copy-paste prompt template. Run `pnpm test` once after merging agent output.

## Design system operating model

- **API contract**: components expose stable `variant`, `size`, and `className` patterns.
- **Documentation first**: every change updates Storybook and Docs together.
- **Quality gates**: type-check, lint, and UI tests are mandatory before merge.

See docs routes:

- `/docs/foundations` for tokens and semantic roles
- `/docs/design-system` for contract and Do/Don't guidance
- `/docs/quality-gates` for release checklist

## How to understand this quickly

Suggested order for newcomers:

1. `README.md` — repo layout and commands
2. `/docs/foundations` — where tokens live and how they map to UI
3. `/docs/design-system` — component API contract
4. `/docs/quality-gates` — reliability workflow
5. `packages/ui/src/button.tsx` and `apps/storybook/stories/Button.stories.tsx` — contract in code + Storybook

## Why this structure

- **Problem**: component styles drift across apps and docs lag behind implementation.
- **Solution**: centralized `@repo/ui` contract with Storybook, docs, and quality gates on one path.
- **Impact**: predictable behavior, clearer reviews, and safer iteration on shared UI.

## Tech stack

- [Turborepo](https://turbo.build/)
- [Next.js](https://nextjs.org/) (web, docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/) (React + Vite)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
