# 006: Layered limits on Google spending

**Context:** Stage 1 is deployed without accounts, so anyone with the link could use up Google calls. Fan-out searches
use calls quickly. There's no built-in limit, like Salesforce governor limits.

**Options:** Hide the app behind a login from day one. Rely on Google's budget alerts, which warn but don't stop spending.
Layer our own limits.

**Decision:** Three layers in our code: a per-IP rate limit, at most 6 calls per search, and a daily call budget stored
in `ApiUsageDay` (search stops with a clear message once it's reached). Plus a Google budget alert, which warns but
doesn't stop spending. The key stays server-side and is restricted to Places API (New).

Update 2026-11-01: the planned hard daily quota in Google Cloud Console isn't possible. On this trial account, `Edit
quota` is disabled for these quotas and they're marked not adjustable (measured on both quota pages).

**Consequences:** A stranger can use the app up to the limit, but not cost real money. With no hard cap at Google (75,000
Text Search calls a day), a bug in the budget code or a leaked key is the remaining risk, so the budget check needs
tests and the alert must stay on. The trial's $425 credit is a cushion until it ends. Recheck the quota after upgrading
the account. The usage table also gives the walking skeleton real database work.
