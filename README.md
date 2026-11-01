# Food Finder

One-line description of the app.

## Run it locally

```bash
mise install                               # Node + pnpm at the versions in mise.toml
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
pnpm db:up                                 # local Postgres in Docker
pnpm --filter api db:deploy                # apply migrations
pnpm dev                                   # web :3000, API :4000, API docs :4000/docs
```

## Checks

```bash
pnpm check            # lint, types, format, unit tests
pnpm e2e              # end-to-end tests
```

## Stack

pnpm monorepo · Next.js · NestJS · Prisma + Postgres · TypeScript · Tailwind CSS · shadcn/ui · Vitest · Playwright ·
GitHub Actions · Vercel · Render

## What I built and learned

<!-- Filled in by /milestone: the problem, the stack, 2–3 technical challenges and how they were solved. -->
