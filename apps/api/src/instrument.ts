// Loaded before the app with `node --import ./dist/instrument.js` (see the Dockerfile), because in
// ES modules every import runs before main.ts's own code, so Sentry has to start even earlier.
import { scrubEvent } from "@app/shared";
import * as Sentry from "@sentry/nestjs";

Sentry.init({
  // No DSN means Sentry stays off. That's the normal state locally and in CI.
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT ?? "development",
  // Errors only. No tracing or profiling: they aren't needed yet and they use up the free quota.
  // Sentry 11 collects everything by default. First guard: collect no bodies (the search body
  // holds the user's location), no cookies, no user info, and no headers except two harmless
  // ones (x-forwarded-for is the visitor's IP address, which is a rough location too).
  dataCollection: {
    httpBodies: [],
    cookies: false,
    userInfo: false,
    httpHeaders: { allow: ["user-agent", "content-type"] },
  },
  // Second guard: strip anything user-shaped that still got onto the event.
  beforeSend: (event) => scrubEvent(event),
});
