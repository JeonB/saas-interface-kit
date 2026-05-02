# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Turborepo monorepo (pnpm workspaces) with a shared React UI library (`@repo/ui`) and three consumer apps: `web` (Next.js, port 3001), `docs` (Next.js, port 3000), and `storybook` (Storybook, port 6006). Fully frontend — no databases, backend APIs, or Docker services.

Recent module focus: iPaaS-friendly UI primitives and pages (`/console/integrations`, `/console/workflows`, `/console/runs`, `/console/runs/[id]`) are available as frontend demos backed by mock data or optional API wiring.

### Key commands

All standard commands are in the root `package.json` and documented in `README.md`:

- `pnpm install` — install all workspace dependencies
- `pnpm build` — build all packages and apps (Turborepo orchestrated, `@repo/ui` builds first)
- `pnpm dev` — start all dev servers concurrently
- `pnpm lint` / `pnpm check-types` / `pnpm test` — quality gates
- `pnpm test:coverage` — run Vitest coverage for tested packages (`@repo/ui`, `@repo/api-client`)

### Non-obvious caveats

- **Native build scripts**: pnpm 10 blocks postinstall scripts by default. The root `package.json` has `pnpm.onlyBuiltDependencies` allowing `@parcel/watcher`, `esbuild`, and `sharp`. If you see "Ignored build scripts" warnings after install, run `pnpm install --force` once to trigger them.
- **`@repo/ui` must be built before apps**: The `web`, `docs`, and `storybook` apps import from `@repo/ui`'s `dist/` directory. If `dist/` is missing (e.g. fresh clone), run `pnpm build` or `pnpm --filter @repo/ui build` before starting dev servers. The same applies if root `pnpm check-types` fails with missing `@repo/ui` modules.
- **Turbo TUI mode**: `turbo.json` uses `"ui": "tui"`, which renders an interactive terminal UI. When running `pnpm dev` in CI or non-interactive contexts, this still works but logs may interleave. Individual app dev commands (`pnpm --filter web dev`) avoid this.
- **Docs redirect**: The docs app root (`localhost:3000`) returns a 307 redirect to `/docs`. This is expected Next.js behavior.
- **Environment variables**: `NEXT_PUBLIC_DOCS_URL` (docs link target), `SESSION_SECRET` (signs the demo session cookie), `NEXT_PUBLIC_API_URL` (optional API base URL for `@repo/api-client`). In production, set `SESSION_SECRET` to a strong random value; if it is missing or still the development placeholder, `apps/web/instrumentation.ts` throws at server startup. See `.env.example`.
- **`web` liveness**: `GET /api/health` on `web` returns `{"status":"ok"}` with `Cache-Control: no-store` for probes; this is separate from optional backend `GET {NEXT_PUBLIC_API_URL}/health` used by `@repo/api-client`.
- **API client package**: `@repo/api-client` provides typed API calls (`/health`, `/v1/*`) with timeout/retry/request-id behavior; when `NEXT_PUBLIC_API_URL` is unset, web console falls back to mock data.
- **Coverage scope note**: coverage thresholds are enforced for `@repo/ui`; `@repo/api-client` coverage currently targets schema-validation paths to keep signal focused and stable in this frontend template.
