# Copilot Instructions — lease-app

## Project Overview

This is an Nx monorepo (pnpm workspaces) for a lease management platform.

### Structure

- `apps/client` — Main customer-facing Next.js app
- `apps/admin` — Admin dashboard (Next.js)
- `apps/api` — Backend API
- `apps/*-e2e` — Playwright/Cypress end-to-end tests
- `libs/shared/` — Shared libraries:
  - `data-access` — API clients, data fetching, repositories
  - `types` — Shared TypeScript types and interfaces
  - `ui` — Shared React UI components
  - `utils` — Pure utility functions

### Key Config Files

- `nx.json` — Nx configuration
- `tsconfig.base.json` — Shared TypeScript paths
- `pnpm-workspace.yaml` — Workspace packages
- `eslint.config.mjs`, `.prettierrc` — Linting & formatting

## Stack

- **Monorepo**: Nx + pnpm
- **Language**: TypeScript (strict mode)
- **Frontend**: Next.js (App Router preferred), React
- **Styling**: Prefer Tailwind CSS when adding styles
- **Testing**: Jest (unit), Playwright/Cypress (e2e)
- **Package Manager**: Always use `pnpm` (never npm or yarn)

## Commands

Use Nx for everything:

```bash
# Install
pnpm install

# Serve apps
pnpm nx dev client
pnpm nx dev admin
pnpm nx serve api

# Build
pnpm nx build client
pnpm nx run-many -t build

# Test
pnpm nx test <project>
pnpm nx affected -t test

# Lint & format
pnpm nx lint <project>
pnpm nx format:write
```

Prefer `nx affected` and `nx run-many` over running tasks on every project.

## Architecture Rules

- **Shared code belongs in `libs/shared/*`**. Do not duplicate types, UI, or utilities across apps.
- Apps should depend on libraries, not the other way around.
- Use path aliases from `tsconfig.base.json` (e.g. `@lease-app/ui`, `@lease-app/types`).
- Keep libraries focused:
  - `types` → only types/interfaces (no runtime code if possible)
  - `utils` → pure functions, no React or framework dependencies
  - `ui` → presentational components
  - `data-access` → API calls, React Query / data hooks

## Coding Conventions

- TypeScript strict mode. Avoid `any`. Prefer explicit types.
- Prefer named exports.
- Use functional React components + hooks.
- Prefer `async/await` over `.then()`.
- Keep components and functions small and focused.
- Use descriptive names. Avoid abbreviations unless they are domain-standard.
- Follow existing patterns in the nearest similar file.

## Imports

- Prefer workspace libraries over relative imports that cross project boundaries.
- Example:
  ```ts
  import { Button } from '@lease-app/ui';
  import { Lease } from '@lease-app/types';
  ```
- Do not import from `apps/*` into `libs/*`.

## Testing

- Unit tests live next to the code or in a co-located `__tests__` / `*.spec.ts` file.
- Use Jest for unit/integration tests.
- Use the existing e2e projects (`*-e2e`) for end-to-end tests.
- Prefer testing behavior over implementation details.

## Things to Avoid

- Do not add new top-level folders under `apps/` or `libs/` without good reason.
- Do not use `npm` or `yarn` — always `pnpm`.
- Do not put business logic in UI components when it belongs in `data-access` or `utils`.
- Do not create deep relative imports (`../../../`) across projects — use path aliases.
- Do not commit secrets, `.env` files with real values, or `node_modules`.
- Avoid introducing new major dependencies unless necessary. Prefer existing libraries in the workspace.

## When Generating Code

1. First look for an existing pattern in the same app or in `libs/shared`.
2. Prefer extending shared libraries over copying code into apps.
3. Match the existing file structure, naming, and import style of the target project.
4. After making changes, suggest the relevant Nx commands to verify (`lint`, `test`, `build`).
