# 008: Staging deploys on merge, production deploys by hand

**Context:** Until issue 2 there was one Render service, named staging, deploying every merge to `main`. A change had
nowhere to be tried before it reached the real app. The PRD asks for company habits, and trying changes on staging
first is one of them.

**Options:** Keep one environment. Deploy production from a separate branch or tag. Keep one branch, with staging
deploying automatically and production deploying by hand.

**Decision:** One branch. A merge to `main` deploys the staging API on Render automatically. After checking it,
Kareem deploys the production Render service by hand ("Manual Deploy" in its dashboard). Vercel previews use the
staging API, and Vercel production uses the production API. Each environment has its own Neon branch, Google key
and Sentry environment name.

**Consequences:** Web changes are tried on the PR preview before merge. API changes are tried on staging after merge,
before production gets them. Vercel deploys production web on every merge, so for a short time the new web can talk
to the old production API. API changes therefore have to keep working with the previous web build, which is the
normal rule for a deployed API anyway. If that gets in the way, the next step is to make Vercel production deploys
manual too.
