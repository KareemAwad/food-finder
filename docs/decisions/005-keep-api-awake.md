# 005: Keep the production API awake in the evening

**Context:** Render's free tier sleeps after 15 minutes idle and takes about a minute to wake. This app is used at
night, in the moment, so a one-minute wait would make it feel broken.

**Options:** Pay for an always-on instance. Accept the wait. Ping the API during usual hours.

**Decision:** A scheduled ping every 10 minutes from 6 PM to 5 AM Toronto time, on production only. Staging sleeps.

**Consequences:** About 340 of the 750 free hours a month, measured against the shared allowance with staging. Scheduled
pings can run late, so a slow first load can still happen. If it annoys Kareem, a paid instance is the simple fix.
