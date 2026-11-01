# 004: Serve the API through the web app's address

**Context:** Web runs on Vercel and the API on Render, so they have different addresses. Sign-in cookies across
different sites are unreliable, especially on iPhone Safari (from memory, not tested).

**Options:** Buy a custom domain. Keep two addresses and use tokens. Have Next.js forward `/api/*` to NestJS.

**Decision:** Next.js rewrites `/api/*` to NestJS, so the browser only sees one address.

**Consequences:** No CORS setup, and sign-in cookies stay first-party. Every API call passes through Vercel, adding a
small delay. If sign-in fails here anyway, a custom domain is the fallback.
