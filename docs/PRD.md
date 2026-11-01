# Food finder (working name) — PRD

Status: approved · Mode: full · Learning: high · Prep: on · Date: 2026-10-31

Decisions, research and data test details: [NOTES.md](NOTES.md).

## Why this project exists

A real app for Kareem, built the way an engineer at a company would build it, to a sensible extent. Going public is
not a goal for now.

## Problem

Google Maps shows what's popular or sponsored, a repeat of McDonald's, Wendy's and Tim Hortons, while Mississauga's
plazas are full of independents. Many close early, so night is the worst time to search. Today that means scrolling
Google Maps and checking places one by one.

## Primary user

Someone 18–30 in Mississauga deciding where to go at night. Kareem is the first and, for now, only real user. When
needs conflict, this person wins.

## Core loop

Open the app, see nearby places that are open now, filter by type, pick one, and open it in Google Maps for directions.

## v1 features

**Stage 1: find a place** (what proves the app is useful)

- Open-now results within a radius of you. Default 5 km, adjustable. No area limit in the code. Tuned in Mississauga.
- Location is used only for the search and never saved. If location is off, type an area.
- Type filter: food, coffee, boba, dessert.
- Rough cuisine filter that's easy to turn off.
- Chains hidden by default, with a toggle to show them.
- List plus a simple Google Map (required by Google's rules), and a button that opens the place in Google Maps.
- One responsive website for laptop and phone browsers.

**Stage 2: keep what you find**

- Accounts.
- Favourites and custom lists, synced between devices.
- A "wrong hours" button: a personal correction that shows "hours may be wrong" on that place in your own app. Nothing
  is sent to anyone. Corrections also measure how often hours are wrong.

## Non-goals (v1)

- Native app
- Our own ratings or reviews
- AI recommendations (revisit after the usage test, for requests filters can't express)
- Reservations, delivery, sponsored listings
- A user-submitted place directory
- Price filter, unless it turns out to be cheap to add
- Microservices, Kubernetes, scaling for traffic that doesn't exist, on-call (see Learning milestone)

## Success metrics

**Product:** over 4 weeks of real use, Kareem opens this app first at least half the time when looking for somewhere
to go, and it leads to at least 3 new places.

**Quality:**

- "Open now" answers are correct, or the app clearly says when it isn't sure.
- Business logic has tests, and CI is green before every merge.
- The app is really deployed and works well on a phone at night.
- Work runs through issues and reviewed PRs, with database migrations, a staging environment, error monitoring and
  short decision records.

## Build and learning

- **Stack:** Next.js, one NestJS API, a shared package, Postgres + Prisma. The API grows only when a feature needs it.
- **Pace:** about 6–8 weeks of evenings and weekends (a rough guess). The 4-week usage test starts once v1 works. If it
  runs over, cut the cuisine filter first, then custom lists, keeping favourites.
- **Learning focus:** NestJS and Prisma. Claude writes most of the code and leaves `TODO(human)` markers on the pieces
  that teach those two. Auth and deployment are used, not studied deeply.
- **Learning milestone after v1:** on this app where the work is real: load test and speeding up our own data
  (scaling), alerts and a runbook (on-call). Kubernetes is a small separate lab. Service-split practice is dropped from
  this app, because Google's rules rule out a refresh job, and is noted in `ideas/BACKLOG.md` for a later project.

## Data source

Google Places (New), subject to the terms check below. From the data test across three plazas: 52 of 60 Google results
had hours (87%), against 30 of 107 on OpenStreetMap (28%). The free datasets, FSQ OS Places and Overture, have no hours
field. Kareem checked the Ridgeway results and they looked right. The other two plazas' hours weren't checked.

## Risks and open questions

- **20-result limit (biggest risk).** Every test search hit it, even within one plaza, so a 5 km search would miss far
  more. Needs a design in `/plan`, such as several smaller searches.
- **Cost.** Search with hours has 1,000 free calls a month, then $35 per 1,000. A workaround for the limit uses calls
  faster, so it needs caching limits and a budget alert.
- **Google's rules (confirmed in `/plan`).** Only place IDs can be stored, Places content can't be cached or
  pre-fetched, and maps must be Google Maps. Saved lists fetch fresh details, so each place viewed uses a call.
- **Hours accuracy.** Hours can be wrong, especially for independents. The wrong hours button and "not sure" state
  handle this, and they'll show how often it happens.
- **Chains and junk entries.** The test showed no chain field, so hiding chains likely needs our own name list. Entries
  like "Mississauga Restaurants" need filtering.
- **Personal data.** Location is never saved. Accounts in Stage 2 store an email address and saved places.
- **Hosting.** From memory, Render's free tier sleeps when idle, so the first search of a night could be slow. Check in
  `/plan`.
