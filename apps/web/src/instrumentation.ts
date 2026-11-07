import * as Sentry from "@sentry/nextjs";

import { sentryOptions } from "@/lib/sentry";

// Next.js calls register() once when the server starts.
export function register(): void {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init(sentryOptions);
  }
}

// Reports errors thrown while rendering pages on the server.
export const onRequestError = Sentry.captureRequestError;
