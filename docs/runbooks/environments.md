# Environments: setup and checks

Staging and production each have their own API service, database, Google key and Sentry environment. See
[ADR 008](../decisions/008-staging-then-production.md) for why. Real values are pasted into dashboards, never into git.

| Piece        | Staging                                 | Production                       |
| ------------ | --------------------------------------- | -------------------------------- |
| Web (Vercel) | Preview deploys (one per PR)            | Production deploy from `main`    |
| API (Render) | `food-finder-api-staging`, auto-deploys | `food-finder-api`, manual deploy |
| Database     | Neon branch `staging`                   | Neon branch `production`         |
| Google key   | Its own key                             | Its own key                      |
| Sentry       | Environment `staging`                   | Environment `production`         |

## One-time setup

### 1. Sentry

1. Sign up on the free Developer plan.
2. Create two projects: `food-finder-api` (platform: NestJS) and `food-finder-web` (platform: Next.js). Don't run
   the setup wizard: the code is already in place.
3. Copy each project's DSN (Settings → Client Keys). Staging and production share a DSN and are told apart by the
   environment name.

### 2. Neon

1. Name the default branch `production`. It's the production database.
2. Create a branch `staging` from it, and copy its connection string.
3. Use the **direct** address for now, not `-pooler` (issue #21 decides that).

### 3. Google Cloud

1. Create two API keys, one for staging and one for production.
2. Restrict both to **Places API (New)**. Issue #3 confirms the budget alert and quota.
3. The variable is named `GOOGLE_PLACES_API_KEY`. The code starts reading it in issue #3.

### 4. Render

**Staging** (`food-finder-api-staging`) → Environment, add or change:

| Variable                | Value                       |
| ----------------------- | --------------------------- |
| `DATABASE_URL`          | Neon `staging` branch       |
| `DIRECT_URL`            | Neon `staging` branch       |
| `SENTRY_DSN`            | `food-finder-api` DSN       |
| `SENTRY_ENVIRONMENT`    | `staging`                   |
| `SENTRY_TEST_ROUTE`     | `true` (only for the check) |
| `GOOGLE_PLACES_API_KEY` | staging key                 |

**Production:** New → Web Service → same repo. Settings to copy from staging: Docker, Dockerfile path
`apps/api/Dockerfile`, Docker context `.`, health check path `/health`, region Ohio, free plan. Name it
`food-finder-api`, and set **Auto-Deploy to Off**. Environment: the same variables with production values,
`SENTRY_ENVIRONMENT=production`, and no `SENTRY_TEST_ROUTE`.

### 5. Vercel

Project → Settings → Environment Variables. Each variable can hold a different value for Preview and Production.

| Variable                         | Preview                                        | Production                                  |
| -------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| `API_URL`                        | `https://food-finder-api-staging.onrender.com` | `https://food-finder-api-8nj4.onrender.com` |
| `NEXT_PUBLIC_SENTRY_DSN`         | `food-finder-web` DSN                          | `food-finder-web` DSN                       |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` | `staging`                                      | `production`                                |
| `SENTRY_TEST_ROUTE`              | `true` (only for the check)                    | not set                                     |

Variables are read at build time, so redeploy after changing them.

## Check that errors reach Sentry

With `SENTRY_TEST_ROUTE=true` on staging:

1. **API:** `curl -X POST https://food-finder-api-staging.onrender.com/debug/sentry-error -H 'content-type: application/json' -d '{"lat":1,"lng":2}'`
   returns a 500. The event appears in `food-finder-api` under `staging`, and the body (`lat`, `lng`) isn't in it.
2. **Web server:** open `<preview URL>/debug/sentry-error?side=server`.
3. **Browser:** open `<preview URL>/debug/sentry-error` and press the button.
4. Both web errors appear in `food-finder-web` under `staging`.
5. Set `SENTRY_TEST_ROUTE` back to `false` (Render) and remove it (Vercel Preview), then redeploy both. The route
   is a 404 again.

## Shipping a change

1. Web changes: check the PR's Vercel preview before merging.
2. Merge. The staging API deploys by itself, and Vercel deploys production web.
3. Check staging: `/health`, plus whatever the change touched.
4. Render → `food-finder-api` → Manual Deploy → Deploy latest commit.
