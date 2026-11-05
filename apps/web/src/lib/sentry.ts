import { scrubEvent } from "@app/shared";

// Shared by the browser and the server. Sentry stays off when NEXT_PUBLIC_SENTRY_DSN is unset,
// which is the normal state locally and in CI. A DSN is safe to expose: it can only send events.
// Errors only: no tracing, session replay or feedback widget. Replay would record the screen.
export const sentryOptions = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? "development",
  // Same rules as the API (apps/api/src/instrument.ts): no bodies, cookies, user info or IPs.
  dataCollection: {
    httpBodies: [],
    cookies: false,
    userInfo: false,
    httpHeaders: { allow: ["user-agent", "content-type"] },
  },
  beforeSend: scrubEvent,
};
