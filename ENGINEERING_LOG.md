# Engineering log

One entry per PR: what I asked the AI for, what it got wrong or over-built, what review caught, one trade-off.

## 2026-11-04 · #24 · Issue 1, walking skeleton (`ApiUsageDay`)

- **Asked of the AI:** review my `ApiUsageDay` model with hints only (I wrote it), then run the migration, checks,
  PR and reviews. It also fixed a font bug it found in the template (`--font-sans` pointed at itself).
- **What I got wrong first:** `Date` isn't a Prisma type, so I needed `DateTime @db.Date`. `id` had no default, `day` wasn't
  unique, and `googleCalls Int 0` isn't how you write a default (it's `@default(0)`).
- **What the AI got wrong:** the first migration attempt failed with `Connection url is empty`, because `apps/api/.env`
  didn't exist on this Mac. It had to be copied from `.env.example`. Its first browser check also tried Playwright's
  bundled Chromium, but this Mac uses installed Chrome (`channel: "chrome"`, as in `playwright.config.ts`).
  Small slips, both caught by running the command and reading the error.
- **Caught in review:** the `code-reviewer` agent pointed out that a `DATE` column has no time zone. Google's quota
  resets at midnight Pacific, so issue 3 has to pick that day boundary on purpose. Issue 3 also needs an atomic
  upsert with `{ increment: 1 }` (not read-then-write), and a test that fires several searches at once.
- **Trade-off:** I used an auto-increment `Int` id instead of `cuid()`. It's shorter and easier to read, and the
  standard only asks for string ids where they'd appear in a URL. This table never will. If it ever does, switching
  takes a migration.
