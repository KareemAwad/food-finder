// Loaded before the app with `node --import ./dist/instrument.js` (see the Dockerfile), because in
// ES modules every import runs before main.ts's own code, so Sentry has to start even earlier.
import { scrubEvent, sentryDataCollection } from "@app/shared";
import * as Sentry from "@sentry/nestjs";

Sentry.init({
  // No DSN means Sentry stays off. That's the normal state locally and in CI.
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT ?? "development",
  // Errors only. No tracing or profiling: they aren't needed yet and they use up the free quota.
  dataCollection: sentryDataCollection,
  // Second guard: strip anything user-shaped that still got onto the event.
  beforeSend: (event) => scrubEvent(event),
});
