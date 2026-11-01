# Food Finder

Mode: **full** (Next.js + NestJS) · Learning: **high** · Prep: **on** · Created from `~/dev/dev-setup/templates/full`

Global rules: `~/.claude/CLAUDE.md`. Standards: `~/dev/dev-setup/standards/` (typescript, react-next, nestjs, database, testing).

@AGENTS.md

## Docs

- `docs/PRD.md` — what we're building and why
- `docs/ARCHITECTURE.md` — data model, routes, screens
- `docs/ISSUES.md` — the approved issue list, mirrored on GitHub
- `docs/CONCEPTS.md` — concepts this project introduces
- `docs/decisions/` — decision records

## Commands

Run from the repo root.

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `pnpm db:up`      | Start local Postgres (needs Docker/Colima). `pnpm db:down` stops it   |
| `pnpm dev`        | Web at http://localhost:3000, API at http://localhost:4000            |
| `pnpm check`      | Lint + type-check + format check + unit tests (run before every push) |
| `pnpm db:migrate` | Create and apply a migration after changing `schema.prisma`           |
| `pnpm e2e`        | Playwright tests (needs Postgres; start the servers automatically)    |
| `pnpm build`      | Production build of everything                                        |
| `pnpm format`     | Auto-format everything                                                |

## Layout

- `apps/web/` — Next.js. Calls the API, never the database. `/api/*` is forwarded to NestJS.
- `apps/api/` — NestJS. One module per domain. `src/health/` is the example to copy.
- `apps/api/prisma/` — schema and migrations. `src/generated/` is generated, don't edit it.
- `packages/shared/` — Zod schemas and types used by both apps. Rebuild with
  `pnpm --filter @app/shared build` (`pnpm dev` watches it).
- `.claude/skills/` — Vercel's skills. Update with `npx skills update -p`.

## Project notes

Auth isn't in the template: when it's added, make routes protected by default (standards/nestjs.md).

## Project notes

<!-- /compound adds project-specific lessons here -->
