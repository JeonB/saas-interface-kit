# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Turborepo monorepo (pnpm workspaces) with a shared React UI library (`@repo/ui`) and three consumer apps: `web` (Next.js, port 3001), `docs` (Next.js, port 3000), and `storybook` (Storybook, port 6006). Fully frontend — no databases, backend APIs, or Docker services.

### Key commands

All standard commands are in the root `package.json` and documented in `README.md`:

- `pnpm install` — install all workspace dependencies
- `pnpm build` — build all packages and apps (Turborepo orchestrated, `@repo/ui` builds first)
- `pnpm dev` — start all dev servers concurrently
- `pnpm lint` / `pnpm check-types` / `pnpm test` — quality gates

### Non-obvious caveats

- **Native build scripts**: pnpm 10 blocks postinstall scripts by default. The root `package.json` has `pnpm.onlyBuiltDependencies` allowing `@parcel/watcher`, `esbuild`, and `sharp`. If you see "Ignored build scripts" warnings after install, run `pnpm install --force` once to trigger them.
- **`@repo/ui` must be built before apps**: The `web`, `docs`, and `storybook` apps import from `@repo/ui`'s `dist/` directory. If `dist/` is missing (e.g. fresh clone), run `pnpm build` or `pnpm --filter @repo/ui build` before starting dev servers.
- **Turbo TUI mode**: `turbo.json` uses `"ui": "tui"`, which renders an interactive terminal UI. When running `pnpm dev` in CI or non-interactive contexts, this still works but logs may interleave. Individual app dev commands (`pnpm --filter web dev`) avoid this.
- **Docs redirect**: The docs app root (`localhost:3000`) returns a 307 redirect to `/docs`. This is expected Next.js behavior.
- **Environment variable**: The only env var is `NEXT_PUBLIC_DOCS_URL` (optional, defaults to `http://localhost:3000`). See `.env.example`.
