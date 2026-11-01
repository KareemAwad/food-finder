# 003: Use a Google Map

**Context:** Google says Places results on a map must be shown on a Google Map, with attribution.

**Options:** Google Maps JavaScript. A free map like Leaflet (not allowed with Places data).

**Decision:** Google Maps JavaScript API, with its own browser key restricted to our web addresses.

**Consequences:** 10,000 free map loads a month, plenty for one user. A second key to manage. Browser keys are public by
nature, so restrictions are what protect it.
