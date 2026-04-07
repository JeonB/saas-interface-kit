---
name: cloud-agent-runbook
description: Run, test, and environment setup for this Turborepo (web, docs, Storybook, @repo/ui). Use when a Cloud agent needs install commands, dev servers, CI-parity checks, or UI test workflows.
---

# Cloud agent runbook — run & test

Minimal instructions for **this** monorepo: Turborepo + pnpm, Next.js apps (`web`, `docs`), Storybook, shared package `@repo/ui`.

## Prerequisites

- **Node.js**: `>=18` per `package.json` engines; **CI uses Node `23.1.0`** (`.github/workflows/ci.yml`) — prefer matching CI when debugging CI-only failures.
- **pnpm**: **`10.19.0`** (enforced via `packageManager` in root `package.json`). Use Corepack: `corepack enable && corepack prepare pnpm@10.19.0 --activate` if needed.
- **Install** (from repo root `/workspace`):

```sh
pnpm install --frozen-lockfile
```

## Authentication / “logging in”

- **No app login or API keys are required** for local dev or automated lint/typecheck/tests in this repo.
- **Optional CI secrets**: Chromatic visual tests use `CHROMATIC_PROJECT_TOKEN` (see `.github/workflows/chromatic.yml`); skip unless you are explicitly running that workflow.

## Environment variables & feature flags

- **Documented env**: copy [`.env.example`](../../.env.example) to **`apps/web/.env.local`** when you need to override docs links from the web app.
  - **`NEXT_PUBLIC_DOCS_URL`**: base URL for docs linked from web (default local docs: `http://localhost:3000`; empty string `""` if docs are same-origin; production URL when deployed separately).
- **No centralized feature-flag service** is wired in this codebase (no LaunchDarkly/Flagsmith/etc.). Component docs mention “feature flags” only as **UX guidance** for controls like Switch.
- **Mocking toggles**: if you add or test flag-like behavior, prefer **`NEXT_PUBLIC_*`** vars read in server/client code and document them in `.env.example`, or stub values in Vitest/Storybook decorators — keep secrets out of the repo.

## Global commands (repo root)

These mirror **CI** (`pnpm lint`, `pnpm check-types`, `pnpm test`):

| Command | Purpose |
|--------|---------|
| `pnpm lint` | ESLint across packages/apps (Turbo) |
| `pnpm check-types` | Typecheck (depends on upstream `build` where Turbo defines it) |
| `pnpm test` | Runs **`@repo/ui`** Vitest suite (Turbo; other workspaces may have no `test` script) |
| `pnpm build` | Full Turbo build (packages + apps) — **heavy**; use when validating production builds |

**UI package size check** (also in CI after UI build):

```sh
pnpm --filter @repo/ui build
pnpm --filter @repo/ui size
```

---

## By codebase area

### Root / Turbo / shared config

- **Dev (all apps)**: `pnpm dev` — runs every package’s `dev` (long-running).
- **Quality gate (pre-merge style)**: `pnpm lint && pnpm check-types && pnpm test`.
- **Storybook static build** (CI step): `pnpm --filter storybook build` → output under `storybook-static` per Turbo.

### `packages/ui` (`@repo/ui`)

- **Build** (CSS + TS): `pnpm --filter @repo/ui build`
- **Watch build** (two terminals or background): `pnpm --filter @repo/ui dev:styles` and `pnpm --filter @repo/ui dev:components`
- **Tests**: Vitest + Testing Library + jsdom; config: `packages/ui/vitest.config.ts`, setup: `vitest.setup.ts`
  - **Once**: `pnpm --filter @repo/ui test` (same as `vitest run`)
  - **Watch** (local iteration): `pnpm --filter @repo/ui exec vitest`
  - **Scope**: `src/**/*.test.ts(x)` only
- **Parallel agent workflow**: follow `packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md` (file naming, no snapshots, assertion style); then run **`pnpm test`** at root to integrate.
- **Note**: Vitest may log jsdom limitations (`HTMLCanvasElement`, `getComputedStyle` pseudo-elements); if tests still **pass**, treat as noise unless you add canvas-heavy code.

### `apps/web` (Next.js, port **3001**)

- **Dev**: `pnpm --filter web dev` → http://localhost:3001
- **Production-style**: `pnpm --filter web build` then `pnpm --filter web start`
- **Lint / types**: `pnpm --filter web lint`, `pnpm --filter web check-types`
- **Testing**: no Jest/Playwright app tests in this repo; validate via **`@repo/ui`** tests + manual smoke in browser.
- **Env**: use `apps/web/.env.local` and `NEXT_PUBLIC_DOCS_URL` as above.

### `apps/docs` (Next.js, port **3000**)

- **Dev**: `pnpm --filter docs dev` → http://localhost:3000
- **Lint / types**: `pnpm --filter docs lint`, `pnpm --filter docs check-types`
- **Testing**: manual/content checks on routes such as `/docs/foundations`, `/docs/design-system`, `/docs/quality-gates`; no dedicated test script.

### `apps/storybook` (port **6006**)

- **Dev**: `pnpm --filter storybook dev` → http://localhost:6006
- **Static build**: `pnpm --filter storybook build` (validates Storybook compiles; used in CI)
- **Testing**: visual/interaction via Storybook UI; optional Chromatic in CI with token. Addon-a11y is available in dev for accessibility spot checks.

### Config-only packages (`eslint-config`, `tailwind-config`, `typescript-config`)

- **Consumed** by apps and `@repo/ui`; no standalone dev server.
- **Verify** indirectly via `pnpm lint` and `pnpm check-types` on dependents.

---

## Concrete testing workflows (quick picks)

1. **“I changed a shared component”**  
   Edit `packages/ui/src/…` → add/update `*.test.tsx` → `pnpm --filter @repo/ui test` → `pnpm lint && pnpm check-types` → optional `pnpm --filter storybook dev` to eyeball stories.

2. **“CI is red on types/lint”**  
   `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm check-types` (fix errors in reported package).

3. **“I only touched web app pages”**  
   `pnpm --filter web lint` → `pnpm --filter web check-types` → `pnpm --filter web dev` for manual verification; run **`pnpm test`** if your change could affect `@repo/ui` consumers.

4. **“Storybook build failed”**  
   `pnpm --filter @repo/ui build` → `pnpm --filter storybook build` (Storybook depends on built UI styles/artifacts as configured in the app).

5. **“Full release confidence”** (slow)  
   `pnpm lint && pnpm check-types && pnpm test && pnpm --filter @repo/ui build && pnpm --filter @repo/ui size && pnpm --filter storybook build`

---

## Updating this skill

When you discover a new command, env var, port, CI step, or testing trick:

1. **Change the real source of truth first** (e.g. `package.json` scripts, `.github/workflows/*.yml`, `.env.example`, `README.md`).
2. **Edit this file** (`.cursor/skills/cloud-agent-runbook.md`) in the same PR: add a row to the table or a bullet under the right **codebase area**, and keep examples copy-pasteable.
3. If the workflow is **UI-test-specific**, also align `packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md` so humans and agents stay consistent.
