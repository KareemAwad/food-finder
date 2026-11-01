# Food finder — issues

Status: approved · Numbers are placeholders until `/scaffold` creates them on GitHub.

`prep: on` for every issue: `/build` appends to `ENGINEERING_LOG.md`. The README gets a client-readable section.

## M1: Find a place (shippable alone)

### 1. Walking skeleton: home page shows live API and database status · M

**Why:** Proves web → API → database → deployed works before any features.

- [ ] Monorepo with `apps/web`, `apps/api`, `packages/shared`
- [ ] `ApiUsageDay` migration exists and runs on deploy
- [ ] `GET /health` checks the database, and the home page shows the result
- [ ] Next.js forwards `/api/*` to NestJS (ADR 004)
- [ ] Deployed on Vercel, Render and Neon, and checked on a real phone
- [ ] CI runs lint, type-check, unit tests and build

### 2. Failures are visible, and changes are tried on staging first · S

**Why:** Company habits are a project goal. Blocked by #1.

- [ ] Staging has its own services, database and Google key
- [ ] A deliberate test error appears in Sentry from both apps

### 3. See places open near me right now · M

**Why:** The core loop. Blocked by #1.

- [ ] The browser asks for location, then shows a list of open places
- [ ] Search uses Text Search, `openNow`, Pro fields and at most 6 calls (ADR 001)
- [ ] Location is in the POST body, and is not logged or saved (test covers it)
- [ ] Rate limit and daily budget enforced with a clear message (ADR 006)
- [ ] Budget check has tests proving search stops at the limit
- [ ] Google budget alert confirmed, and the quota rechecked if the account was upgraded
- [ ] Google is faked in unit tests
- [ ] Billing report confirms the calls bill as Pro

### 4. Chains are hidden unless I ask for them · S

**Why:** The main difference from Google Maps. Blocked by #3.

- [ ] Chains are hidden by default, with a toggle to show them
- [ ] Name matching is tested, including accents, spacing and suffixes

### 5. Filter by food, coffee, boba or dessert · S

Blocked by #3.

- [ ] Each type uses its own query list
- [ ] Junk entries are removed (vape shops, plazas, catering-only listings), and tests cover the rule

### 6. See the results on a map · M

Blocked by #3.

- [ ] Google Map with a pin per result, plus Google attribution
- [ ] Browser key restricted to our web addresses
- [ ] The map stays simple and works on a phone

### 7. Open a place and get directions · S

Blocked by #3.

- [ ] Shows name, type, today's hours, closing time, and distance
- [ ] Button opens the place in Google Maps
- [ ] Shows "hours not available" clearly when Google has none

### 8. Change the radius or type an area · M

Blocked by #3.

- [ ] Radius adjustable, default 5 km
- [ ] With location off, typing an area searches there

### 9. Tune search with real evening results · M

**Why:** The biggest open risk. 3 AM testing didn't test the 60-result cap. Blocked by #4, #5.

- [ ] Run at about 10 PM at all three plazas, and record the counts
- [ ] Each type shows independents, not just chains filling the cap
- [ ] If it can't, try smaller search areas and record the decision

### 10. Filter by cuisine · S

First cut if the project runs over. Blocked by #5.

- [ ] A rough cuisine filter, easy to turn off

### 11. The app is fast and usable on a phone at night · S

Blocked by #6.

- [ ] Scheduled ping is on for production (ADR 005)
- [ ] Loading, empty and error states are done for every screen
- [ ] Playwright covers open app → filter → open a place, on staging

## M2: Keep what you find

### 12. Sign in with a magic link · M

Blocked by M1.

- [ ] Better Auth with Resend, only Kareem's email can sign in
- [ ] Protected routes reject signed-out requests, and tests cover it
- [ ] Sign-in stays working on iPhone Safari

### 13. Save a place to favourites · M

Blocked by #12.

- [ ] Favourites sync between phone and laptop
- [ ] Only place IDs are stored (ADR 002)
- [ ] Shows fresh open or closed status, paginated
- [ ] A place Google no longer has is handled

### 14. Make custom lists · M

Second cut if the project runs over. Blocked by #13.

- [ ] Create, rename and delete lists, and add or remove places
- [ ] Tests prove one user can't reach another user's list

### 15. Flag wrong hours · S

Blocked by #12.

- [ ] Button adds a personal "hours may be wrong" warning, removable
- [ ] Shows a count of flagged places, to measure the hours risk

### 16. Start the 4-week usage test · S

Blocked by #13, #15.

- [ ] A simple way to track opens-first and new places
- [ ] Start date recorded

## M3: Learning milestone

### 17. Load test the API and fix what breaks · M

Fake Google so this costs nothing. Record before and after numbers.

### 18. Alerts and a runbook · S

Alerts for errors and budget use, plus a short guide for each failure.

### 19. Speed up our own data · S

Cache or index list queries, only if the load test shows a need. Never Google content (ADR 002).

Separate from this repo: a small Kubernetes lab. Decide on that at the M3 `/milestone`.

Dropped from this app: service-split practice, because Google's rules rule out a refresh job. Noted in `ideas/BACKLOG.md`.
