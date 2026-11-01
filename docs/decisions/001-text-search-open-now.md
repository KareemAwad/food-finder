# 001: Use Text Search with openNow for search

**Context:** Nearby Search returned 20 results at most and has no open-now filter. The core of the app is "what's open
now".

**Options:** Nearby Search with several small circles, filtering hours ourselves. Text Search with `openNow`. A
separate dataset (rejected, the free ones have no hours).

**Decision:** Text Search (New) with `openNow: true`, Pro fields only, and a per-type list of queries. Maximum 6 Google
calls per search. Exact hours come from Place Details when a place is opened.

**Consequences:** Up to 60 results per query, and 5,000 free calls a month. Measured at 3:22 AM: 88 of 89 results
marked open. A place with no hours may not appear, which we accept. Chains can fill the cap, so queries need tuning at
real evening hours. The Pro billing assumption must be confirmed in the billing report.
