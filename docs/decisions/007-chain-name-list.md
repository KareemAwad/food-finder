# 007: Identify chains with our own name list

**Context:** Hiding chains is a core feature. Google's results we tested had no chain field. OpenStreetMap's `brand` tag
doesn't match up with Google's IDs.

**Options:** Treat a name repeated in results as a chain (misses chains that appear once, and catches local places with
two locations). Maintain a list of names.

**Decision:** A reviewed list in `packages/shared`, with normalised matching, and tests.

**Consequences:** Simple and testable. The list needs adding to when chains slip through. Search can return fewer
places after filtering, because Google's cap applies before we remove chains.
