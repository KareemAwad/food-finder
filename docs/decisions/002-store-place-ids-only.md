# 002: Store Google place IDs only

**Context:** Google's policy says not to pre-fetch, cache or store Places content beyond the allowed exceptions. Place
IDs may be stored indefinitely.

**Options:** Keep names and hours in our database (not allowed). Store IDs and fetch fresh. Build our own place data
(out of scope).

**Decision:** The database holds only place IDs plus Kareem's own data. Saved places are fetched fresh when viewed.

**Consequences:** Hours are always current. Viewing a list costs one Place Details call per place shown, so lists
paginate. No server-side cache of Google content, so search speed depends on Google. A saved place can vanish, and the
app must handle that.
